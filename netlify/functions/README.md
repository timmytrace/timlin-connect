# Agent canary

A public experiment measuring one thing: **how often an automated reader acts on
an instruction it finds in the content of a web page.**

User agents, request rates and header fingerprints distinguish *crawlers*. They
do not distinguish agents. The property separating an LLM agent from a scraper
is that it reads content and acts on it — a scraper ingests the text and does
nothing, an agent comprehends it and may follow it. So each canary page carries
an instruction addressed to automated readers asking them to fetch one URL on
this domain. **Reaching that URL is evidence of comprehension, not of traffic.**

## Surfaces

| URL | instruction placed in | what it separates |
|---|---|---|
| `/canary/visible` | a visible paragraph | baseline — any reader of rendered text |
| `/canary/comment` | an HTML comment | source parsers from rendered-output readers |
| `/canary/hidden` | a CSS-offscreen element | raw-DOM readers from ones respecting computed style |
| `/canary/alt` | `alt` and `aria-label` | accessibility-tree extraction |
| `/canary/noindex` | a visible paragraph, `Disallow`ed in robots.txt | whether exclusion is honoured before reading |
| `/canary/` | nothing — the human explainer | — |

One instruction per page, on purpose. Several on one page would make a beacon
hit ambiguous about which surface was actually read.

## Why the pages are served by a function

A static file on the CDN is invisible to us. "An agent acted on this page" means
nothing without "this many readers saw it" underneath — the read is the
denominator, the beacon is the numerator, and the ratio is the finding. Pages
are served `no-store` for the same reason: a cached read is a read we never see.

## Reading the results

```bash
curl "https://timlinconnect.com/.netlify/functions/canary-log?key=$CANARY_LOG_KEY" > canary.json
```

Set `CANARY_LOG_KEY` in the Netlify site environment, scoped to **Functions**,
and redeploy — Netlify fixes the environment into a deploy at build time, so
saving the variable alone leaves the running function without it. If it is
unset the endpoint refuses rather than defaulting to open.

### The collection window

Blobs are site-scoped, not deploy-scoped. Every beacon fired at a deploy
preview while the routing bug was live sits in the same store as production
data, as do our own verification requests. Two filters narrow the summary:

```bash
curl ".../canary-log?key=$CANARY_LOG_KEY&since=2026-10-22T11:00:00Z"
```

`since` takes any ISO 8601 timestamp and can be set once as `CANARY_SINCE`
instead. An unparseable value returns `400` rather than falling through to the
full history under a heading that claims a window. Requests tagged
`TimlinCanarySelfTest` are excluded unconditionally.

Both filters report what they removed, in `excluded`, against `total_recorded`.
Nothing is deleted — the pre-fix entries are evidence of a bug worth keeping,
they are just not evidence of an agent. **A published figure should always name
its `since`.**

### Reconciling the breakdown

`by_variant` is built from the set of variants actually seen, so an entry
recorded with an empty variant disappears from the breakdown while still
counting in the totals. That is how the routing bug stayed invisible: the first
real read of the log showed four beacons over a breakdown that summed to three,
and only arithmetic revealed it. `unattributed` now names that gap. A non-zero
value there is a routing bug, not an agent.

### Tests

```bash
npm test
```

Covers the filters and the reconciliation, not the storage probe. A filter that
silently keeps everything returns a number indistinguishable from a correct
one — which is the whole reason the first summary read `follow_through: 0.31`
when every request in it was our own.

**Check `storage_ok` before anything else.** The canary and beacon functions
deliberately swallow write failures so a logging outage cannot change what a
reader sees — which means a broken store looks exactly like a week with no agent
traffic. `reads: 0` would be the headline finding and it would be an artifact.
The log endpoint therefore writes a probe, reads it back, deletes it, and
reports whether that worked. An experiment that cannot tell "nothing happened"
from "nothing was recorded" has no null result to report.

## Ethics

Fixed, and not negotiable:

- The instruction asks for exactly one thing: a GET to a URL on this domain.
- It never asks for a system prompt, conversation history, credentials, or
  anything about the agent's user. This measures instruction-following; it does
  not extract.
- Every page explains itself in plain language to a human reader.
- Cookies are dropped before anything is written to storage.
- Nothing touches a third party's systems.

If you operate an agent that tripped this and want it excluded, the contact is
on timlinconnect.com.

## Local development

`netlify dev` runs Blobs in **sandbox mode**, where a write from one invocation
is not visible to a later one. Locally the log will report `storage_ok: true`
alongside `reads: 0`. That is the sandbox, not a bug. Cross-invocation
persistence can only be verified on a deploy preview or in production.

## Expected outcome

Declared AI crawlers — `GPTBot`, `ClaudeBot`, `PerplexityBot`, `Bytespider` —
will reach a public page within days. That gives a baseline and a taxonomy.

A beacon hit is the rarer prize and may not come at all. **A null result is
publishable and should be published**: "six surfaces, N reads across M declared
agents over seven days, zero instruction-following" is a real finding with a
real method, and reporting the zero is what makes a positive result elsewhere
mean anything.
