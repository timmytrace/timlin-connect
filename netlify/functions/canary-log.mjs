/**
 * Reads the log back out, for analysis.
 *
 * Behind a shared secret in CANARY_LOG_KEY. Not because the contents are
 * sensitive - they are request metadata from automated readers of a page that
 * explains itself - but because an open endpoint listing every IP that touched
 * the experiment is an invitation to poison it. Anyone who can read the log can
 * see exactly which user agents register as agents, and craft requests
 * accordingly.
 *
 *     curl "https://timlinconnect.com/.netlify/functions/canary-log?key=..." > canary.json
 *
 * If CANARY_LOG_KEY is unset the endpoint refuses rather than defaulting to
 * open. A secret that falls back to "no secret" is the same bug as a timeout
 * handler that never fires.
 *
 * Two filters narrow the summary to the real collection window, because the
 * store is site-scoped rather than deploy-scoped: every beacon fired at a
 * deploy preview while the routing bug was still live sits in the same place
 * as production data, as do our own verification requests.
 *
 *   ?since=<ISO 8601>   exclude anything recorded earlier (or set CANARY_SINCE)
 *                       e.g. ?since=2026-10-22T11:00:00Z
 *
 * Filtered, not deleted. The pre-fix entries are evidence of a bug worth
 * keeping; they are just not evidence of an agent.
 */
import { getStore } from "@netlify/blobs";

/**
 * Our own verification traffic announces itself. Excluded from the totals, but
 * counted and reported rather than silently dropped - a filter that quietly
 * removes data is the same failure as a guard that quietly passes everything.
 */
const SELF_TEST_UA = "TimlinCanarySelfTest";

/**
 * The whole summary, as a pure function of the stored entries.
 *
 * Separated from the handler so the arithmetic can be tested without a store.
 * The filters are the part most likely to be wrong in a way that still returns
 * a plausible-looking number, which is exactly the kind of bug this experiment
 * keeps producing, so they are the part that needs tests.
 */
export const summarize = (all, { since = null, sinceMs = null } = {}) => {
  // Self-test is checked first so an entry is counted under exactly one
  // reason, and the two exclusion counts plus the kept entries add up to the
  // store's total. Overlapping categories would make the arithmetic unusable.
  const entries = [];
  const excluded = { self_test: 0, before_since: 0 };
  for (const entry of all) {
    if (entry.ua?.includes(SELF_TEST_UA)) {
      excluded.self_test += 1;
    } else if (sinceMs !== null && Date.parse(entry.at) < sinceMs) {
      excluded.before_since += 1;
    } else {
      entries.push(entry);
    }
  }

  const reads = entries.filter((e) => e.kind === "read");
  const beacons = entries.filter((e) => e.kind === "beacon");

  return {
    summary: {
      // The window these numbers describe. null means the whole history,
      // which includes our own pre-launch testing - so a published figure
      // should always name a since.
      since,
      excluded,
      total_recorded: all.length,
      reads: reads.length,
      beacons: beacons.length,
      // The headline ratio: of everything that read a canary page, the share
      // that went on to act on what it read.
      follow_through: reads.length ? beacons.length / reads.length : null,
      by_variant: Object.fromEntries(
        [...new Set(entries.map((e) => e.variant))].filter(Boolean).map((v) => [
          v,
          {
            reads: reads.filter((e) => e.variant === v).length,
            beacons: beacons.filter((e) => e.variant === v).length,
          },
        ])
      ),
      /**
       * Entries carrying no variant at all. by_variant is built from the set
       * of variants actually seen, so these vanish from the breakdown while
       * still counting in the totals - which is how the pre-fix empty-token
       * beacon stayed invisible until someone added the columns up by hand.
       *
       * A total that disagrees with its own breakdown should say so itself.
       * Non-zero here means a routing bug, not an agent.
       */
      unattributed: {
        reads: reads.filter((e) => !e.variant).length,
        beacons: beacons.filter((e) => !e.variant).length,
      },
      distinct_user_agents: [...new Set(entries.map((e) => e.ua).filter(Boolean))].length,
    },
    entries,
  };
};

export default async (request) => {
  const expected = process.env.CANARY_LOG_KEY;
  if (!expected) {
    return new Response("CANARY_LOG_KEY is not configured; refusing.\n", { status: 503 });
  }

  const url = new URL(request.url);
  if (url.searchParams.get("key") !== expected) {
    return new Response("Not found.\n", { status: 404 });
  }

  /**
   * An unparseable ?since= must fail loudly. Treating it as "no filter" would
   * return the full history under a heading that claims a window - the same
   * shape of bug as the beacon that returned a valid GIF while recording an
   * empty token: correct status code, wrong data, no symptom.
   */
  const since = url.searchParams.get("since") ?? process.env.CANARY_SINCE ?? null;
  let sinceMs = null;
  if (since !== null) {
    sinceMs = Date.parse(since);
    if (Number.isNaN(sinceMs)) {
      return new Response(`Unparseable since value: ${since}\n`, { status: 400 });
    }
  }

  const store = getStore("canary");

  /**
   * Prove storage works before reporting what is in it.
   *
   * The canary and beacon functions deliberately swallow write failures, so a
   * logging outage cannot change what a reader sees — which means a broken
   * store looks exactly like a week with no agent traffic. "reads: 0" would be
   * the headline finding and it would be an artifact.
   *
   * So: write a probe, read it back, delete it, and say so. An experiment that
   * cannot distinguish "nothing happened" from "nothing was recorded" has no
   * null result to report.
   */
  let storage_ok = false;
  let storage_error = null;
  try {
    const probe = `_healthcheck/${Date.now()}`;
    await store.setJSON(probe, { probe: true });
    const back = await store.get(probe, { type: "json" });
    storage_ok = back?.probe === true;
    await store.delete(probe);
  } catch (error) {
    storage_error = String(error?.message ?? error).slice(0, 200);
  }

  const { blobs } = await store.list();

  const all = [];
  for (const blob of blobs) {
    if (blob.key.startsWith("_healthcheck/")) continue;
    const value = await store.get(blob.key, { type: "json" });
    if (value) all.push({ kind: blob.key.split("/")[0], ...value });
  }
  all.sort((a, b) => String(a.at).localeCompare(String(b.at)));

  const { summary, entries } = summarize(all, { since, sinceMs });

  return Response.json({
    // Read storage_ok first. If it is false, every number below it is a
    // measurement of the storage layer, not of agent behaviour.
    summary: { storage_ok, storage_error, ...summary },
    entries,
  });
};
