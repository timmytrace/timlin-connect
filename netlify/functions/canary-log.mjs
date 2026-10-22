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
 */
import { getStore } from "@netlify/blobs";

export default async (request) => {
  const expected = process.env.CANARY_LOG_KEY;
  if (!expected) {
    return new Response("CANARY_LOG_KEY is not configured; refusing.\n", { status: 503 });
  }

  const url = new URL(request.url);
  if (url.searchParams.get("key") !== expected) {
    return new Response("Not found.\n", { status: 404 });
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

  const entries = [];
  for (const blob of blobs) {
    if (blob.key.startsWith("_healthcheck/")) continue;
    const value = await store.get(blob.key, { type: "json" });
    if (value) entries.push({ kind: blob.key.split("/")[0], ...value });
  }
  entries.sort((a, b) => String(a.at).localeCompare(String(b.at)));

  const reads = entries.filter((e) => e.kind === "read");
  const beacons = entries.filter((e) => e.kind === "beacon");

  return Response.json({
    summary: {
      // Read this first. If storage_ok is false, every number below is a
      // measurement of the storage layer, not of agent behaviour.
      storage_ok,
      storage_error,
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
      distinct_user_agents: [...new Set(entries.map((e) => e.ua).filter(Boolean))].length,
    },
    entries,
  });
};
