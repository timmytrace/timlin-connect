/**
 * What shipped, and when.
 *
 * Curated rather than generated. Not every commit is a shipment, and a feed of
 * merge subjects would be noise with dates on it — the editorial judgement
 * about what counts is the whole value of the page.
 *
 * The cost of curating is that it can go stale silently, which is the failure
 * mode this practice keeps finding in other people's work. So the page states
 * the date of the most recent entry at the top: a changelog that has stopped
 * being updated should look stopped, not look finished.
 *
 * Dates are the date the work landed on main, taken from git history.
 */
export type ChangelogArea = 'Gateway' | 'Research' | 'Site' | 'Open source';

export interface ChangelogEntry {
  /** ISO date (YYYY-MM-DD) the work landed. */
  date: string;
  area: ChangelogArea;
  title: string;
  /** One or two sentences. What changed and why it mattered. */
  detail: string;
  /** Optional public link. Omitted where the work lives in a private repository. */
  href?: string;
}

export const changelog: ChangelogEntry[] = [
  {
    date: '2026-11-07',
    area: 'Research',
    title: 'Published the agent canary null result',
    detail:
      'Twelve days, sixteen reads of an instrumented page by three declared crawlers, zero instruction-following. Reported as a crawler baseline rather than a safety finding, alongside the three bugs that each produced the same zero while the system reported itself healthy.',
    href: '/blog/nobody-took-the-bait/',
  },
  {
    date: '2026-11-03',
    area: 'Gateway',
    title: 'Scoped an application security assessment of the gateway',
    detail:
      'Every test so far had been of the detection engine, never of the application around it. Scope fixed in git before testing began, with broken access control first because no model carries a tenant id.',
  },
  {
    date: '2026-10-22',
    area: 'Research',
    title: 'Mapped the gateway against the OWASP LLM Top 10',
    detail:
      'All ten categories of the 2026 edition, with coverage stated honestly: four are not addressed at all. Published because a buyer can get a list of what a control catches from any vendor, and nowhere else can they get where it stops.',
    href: '/gateway#owasp',
  },
  {
    date: '2026-10-22',
    area: 'Research',
    title: 'Deployed the agent canary',
    detail:
      'Six surfaces carrying an instruction addressed to automated readers, and a beacon that records whether anything acts on it. Measures comprehension rather than traffic, which is the property separating an agent from a crawler.',
    href: '/canary/',
  },
  {
    date: '2026-10-22',
    area: 'Site',
    title: 'Cut the claims back to the evidence',
    detail:
      'Seven services removed that nobody here had delivered, a global delivery claim that described no capability, and a false-positive figure restated as measured on curated datasets. The site now claims only what it can show.',
  },
  {
    date: '2026-10-19',
    area: 'Site',
    title: 'Scheduled publishing for posts',
    detail:
      'Posts dated in the future stay unpublished until their date, at build time and at render time, so a finding can be written when it is fresh and published on a cadence.',
  },
  {
    date: '2026-10-18',
    area: 'Open source',
    title: 'CI on the suffix-evasion evaluation',
    detail:
      'Tests across Python 3.11, 3.12 and 3.13, plus a weekly run — because the realistic failure for an evaluation nobody is actively editing is that a dependency moves and the repository looks maintained right up until someone tries to run it.',
    href: 'https://github.com/timmytrace/suffix-evasion',
  },
  {
    date: '2026-10-17',
    area: 'Open source',
    title: 'Open-sourced the suffix evasion evaluation',
    detail:
      'Built on Inspect, the UK AI Security Institute’s framework. MIT licensed, with control arms in every test and a published null result. Adapters cover Hugging Face classifiers, ONNX models and any guardrail reachable over HTTP.',
    href: 'https://github.com/timmytrace/suffix-evasion',
  },
  {
    date: '2026-10-17',
    area: 'Research',
    title: 'The mitigation is the vulnerability',
    detail:
      'Appending ordinary commercial text released 19.6% of blocked attacks through the gateway, against 0% on the bare classifier. The layer that makes a classifier deployable is the attack surface.',
    href: '/blog/the-mitigation-is-the-vulnerability/',
  },
  {
    date: '2026-09-27',
    area: 'Gateway',
    title: 'Shadow mode reporting',
    detail:
      'A report generator for running detection without enforcing it, so a prospective deployment can measure what the gateway would have blocked against its own traffic before anything is turned on.',
  },
  {
    date: '2026-09-22',
    area: 'Gateway',
    title: 'Hard-negative corpus, and the false positives it found',
    detail:
      'Thirty-nine benign sentences written by hand, of the kind people actually type at work. Twenty-two of 140 fired rules that had measured zero false positives across 1,703 curated prompts. Ten rules rewritten; the corpus now runs in CI.',
  },
  {
    date: '2026-09-21',
    area: 'Gateway',
    title: 'Non-English structural coverage',
    detail:
      'Structural detection was English-only, so 11 of 103 non-English attacks produced any structural finding against 94% on English. Seven rules across nine languages, written on the train split and scored on a holdout, with no regression in English.',
  },
  {
    date: '2026-09-21',
    area: 'Research',
    title: 'Re-measured a published figure, and corrected it',
    detail:
      'A bypass we had published as affecting 32% of blocked injections was 58% on re-measurement. The original script had not been kept, so neither number could be re-run. The harness is now part of the repository.',
    href: '/blog/the-discount-i-was-giving-attackers/',
  },
  {
    date: '2026-09-13',
    area: 'Gateway',
    title: 'Canadian health identifiers in DLP',
    detail:
      'OHIP, provincial health card and SIN detection, because the home market is Ontario and PHIPA and PIPEDA apply, not only HIPAA.',
  },
  {
    date: '2026-09-12',
    area: 'Gateway',
    title: 'Ascii85 decoding',
    detail:
      'An encoding the normalisation layer did not decode, so a payload encoded in it reached the classifier as noise and the model as an instruction. Now decoded and rescanned through the full stack.',
  },
  {
    date: '2026-09-01',
    area: 'Research',
    title: 'When your benchmark measures something else',
    detail:
      'A fix that blocked every encoded injection we could construct moved the industry benchmark by 1.4 points. Reading the items showed the benchmark was testing toxicity smuggling, not injection.',
    href: '/blog/when-your-benchmark-measures-something-else/',
  },
  {
    date: '2026-08-19',
    area: 'Gateway',
    title: 'Recovery key for encrypted logs',
    detail:
      'Log encryption without a recovery path is data loss waiting for a lost key. Added before any design partner could be affected by it.',
  },
  {
    date: '2026-08-10',
    area: 'Gateway',
    title: 'Login brute-force hardening and encrypted secrets',
    detail:
      'Rate limiting on authentication, and secrets moved to SOPS-encrypted storage rather than environment files passed around by hand.',
  },
  {
    date: '2026-08-05',
    area: 'Gateway',
    title: 'ONNX runtime for the classifier',
    detail:
      'The DeBERTa classifier moved to ONNX with a self-test on load and a documented fallback to PyTorch, cutting inference cost on the hot path.',
  },
];

/** Most recent first, so the page cannot disagree with the data about its own freshness. */
export const changelogSorted: ChangelogEntry[] = [...changelog].sort((a, b) =>
  b.date.localeCompare(a.date)
);

export const lastShipped: string | null = changelogSorted[0]?.date ?? null;
