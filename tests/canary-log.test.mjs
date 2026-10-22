/**
 * Tests for the log summary.
 *
 *     npm test
 *
 * The filters are worth testing and the storage probe is not: a filter that
 * silently keeps everything returns a number that looks exactly like a correct
 * one, which is how the first round of canary data came back reporting a
 * follow-through rate of 0.31 that was entirely our own curl requests.
 *
 * This file lives outside netlify/functions/ because Netlify treats every
 * module in that directory as a deployable function, and a function name
 * cannot contain a period. Putting it there broke the deploy outright.
 */
import test from "node:test";
import assert from "node:assert/strict";
import { summarize } from "../netlify/functions/canary-log.mjs";

const AGENT = "SomeBot/1.0";
const SELF = "TimlinCanarySelfTest/1 (verification; filter me out)";

const read = (at, variant, ua = AGENT) => ({ kind: "read", at, variant, ua });
const beacon = (at, variant, ua = AGENT) => ({ kind: "beacon", at, variant, ua });

const SINCE = "2026-10-22T12:00:00Z";
const sinceMs = Date.parse(SINCE);

test("self-test traffic is excluded from the totals but still counted", () => {
  const { summary } = summarize([
    read("2026-10-22T13:00:00Z", "comment"),
    read("2026-10-22T13:01:00Z", "comment", SELF),
    beacon("2026-10-22T13:02:00Z", "comment", SELF),
  ], { since: SINCE, sinceMs });

  assert.equal(summary.reads, 1);
  assert.equal(summary.beacons, 0);
  assert.equal(summary.excluded.self_test, 2);
  // Reporting the exclusion is the point. A filter that drops data without
  // saying how much is indistinguishable from a filter that is broken.
  assert.equal(summary.total_recorded, 3);
});

test("entries before the window are excluded", () => {
  const { summary } = summarize([
    read("2026-10-22T09:00:00Z", "comment"),
    read("2026-10-22T13:00:00Z", "comment"),
  ], { since: SINCE, sinceMs });

  assert.equal(summary.reads, 1);
  assert.equal(summary.excluded.before_since, 1);
});

test("an entry is excluded for exactly one reason", () => {
  // Self-test traffic from before the window matches both filters. If it were
  // counted twice the exclusions would overshoot the total and the arithmetic
  // would stop being checkable.
  const all = [read("2026-10-22T09:00:00Z", "comment", SELF)];
  const { summary } = summarize(all, { since: SINCE, sinceMs });

  assert.equal(summary.excluded.self_test, 1);
  assert.equal(summary.excluded.before_since, 0);
});

test("exclusions plus kept entries account for every stored entry", () => {
  const all = [
    read("2026-10-22T09:00:00Z", "visible"),
    read("2026-10-22T13:00:00Z", "visible", SELF),
    read("2026-10-22T13:01:00Z", "visible"),
    beacon("2026-10-22T13:02:00Z", "visible"),
  ];
  const { summary, entries } = summarize(all, { since: SINCE, sinceMs });

  assert.equal(
    entries.length + summary.excluded.self_test + summary.excluded.before_since,
    summary.total_recorded
  );
});

test("no since means no window filter", () => {
  const { summary } = summarize([read("2019-01-01T00:00:00Z", "comment")], {});

  assert.equal(summary.since, null);
  assert.equal(summary.reads, 1);
  assert.equal(summary.excluded.before_since, 0);
});

test("a beacon with no variant is surfaced, not silently dropped", () => {
  // The live reproduction: by_variant summed to 3 while beacons said 4,
  // because the routing bug recorded a beacon against an empty token and
  // by_variant is built from the set of variants actually seen.
  const { summary } = summarize([
    read("2026-10-22T13:00:00Z", "comment"),
    beacon("2026-10-22T13:01:00Z", "comment"),
    beacon("2026-10-22T13:02:00Z", ""),
  ], { since: SINCE, sinceMs });

  assert.equal(summary.beacons, 2);
  assert.equal(summary.unattributed.beacons, 1);

  const attributed = Object.values(summary.by_variant)
    .reduce((sum, v) => sum + v.beacons, 0);
  // The invariant that was missing: the breakdown and the total reconcile,
  // and the gap between them has a name.
  assert.equal(attributed + summary.unattributed.beacons, summary.beacons);
});

test("follow_through is null rather than zero when nothing was read", () => {
  // 0/0 reported as 0 would read as "agents saw it and ignored it", which is a
  // claim the data does not support.
  const { summary } = summarize([], {});

  assert.equal(summary.reads, 0);
  assert.equal(summary.follow_through, null);
});

test("follow_through is the beacon-to-read ratio", () => {
  const { summary } = summarize([
    read("2026-10-22T13:00:00Z", "comment"),
    read("2026-10-22T13:01:00Z", "hidden"),
    beacon("2026-10-22T13:02:00Z", "comment"),
  ], { since: SINCE, sinceMs });

  assert.equal(summary.follow_through, 0.5);
  assert.deepEqual(summary.by_variant.comment, { reads: 1, beacons: 1 });
  assert.deepEqual(summary.by_variant.hidden, { reads: 1, beacons: 0 });
});
