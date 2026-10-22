/**
 * Tests for the public results block on /canary/.
 *
 *     npm test
 *
 * The figure this renders is cited outside the site, so the states it has to
 * tell apart matter: real data, no traffic, and a store it could not read.
 * Printing zeros for the third would be the exact confusion the experiment was
 * built to avoid - and it would be invisible, because zero is also a plausible
 * real answer.
 */
import test from "node:test";
import assert from "node:assert/strict";
import { resultsSection } from "../netlify/functions/canary.mjs";

const withReads = {
  since: "2026-10-22T11:05:00Z",
  reads: 5,
  beacons: 0,
  follow_through: 0,
  by_variant: {
    visible: { reads: 1, beacons: 0 },
    comment: { reads: 1, beacons: 0 },
  },
  named: [["Mozilla/5.0 (compatible; ClaudeBot/1.0; +claudebot@anthropic.com)", 4]],
  anonymous: 1,
};

test("a failed read says so instead of rendering zeros", () => {
  const html = resultsSection(null);
  assert.match(html, /read failed/i);
  // The critical property: it must not look like a measurement of zero.
  assert.doesNotMatch(html, /0 beacons/);
  assert.doesNotMatch(html, /No reads recorded/i);
});

test("no traffic is distinguished from no logging", () => {
  const html = resultsSection({ since: "2026-10-22T11:05:00Z", reads: 0, beacons: 0, by_variant: {}, named: [], anonymous: 0 });
  assert.match(html, /No reads recorded yet/i);
  // Says why the absence is trustworthy.
  // The template wraps, so match across whitespace rather than on one line.
  assert.match(html, /absence of traffic\s+rather than an absence of logging/i);
  assert.match(html, /2026-10-22T11:05:00Z/);
});

test("reads and beacons are reported with the window", () => {
  const html = resultsSection(withReads);
  assert.match(html, /5 reads, 0 beacons/);
  assert.match(html, /none went on to act on what it read/);
  assert.match(html, /Window opens 2026-10-22T11:05:00Z/);
  assert.match(html, /<td>visible<\/td>|<code>visible<\/code>/);
});

test("a declared reader is named, an undeclared one is counted only", () => {
  const html = resultsSection(withReads);
  assert.match(html, /ClaudeBot/);
  assert.match(html, /4 reads/);
  assert.match(html, /1 read came from readers that did not\s*\n?identify themselves/);
});

test("the crawler-versus-agent caveat is always present with data", () => {
  // The whole result is misreadable without it: a crawler doing nothing is
  // correct behaviour, not a safety property.
  const html = resultsSection(withReads);
  assert.match(html, /baseline/i);
  assert.match(html, /not a safety finding/i);
});

test("a non-zero follow-through is rendered as a percentage", () => {
  const html = resultsSection({ ...withReads, beacons: 1, follow_through: 0.2 });
  assert.match(html, /5 reads, 1 beacon\b/);
  assert.match(html, /20\.0% went on to act/);
});

test("user agents are escaped, not injected", () => {
  const html = resultsSection({
    ...withReads,
    named: [["<script>alert(1)</script>bot", 1]],
  });
  assert.doesNotMatch(html, /<script>/);
  assert.match(html, /&lt;script&gt;/);
});
