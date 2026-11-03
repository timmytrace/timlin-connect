---
title: Nobody Took the Bait
excerpt: We put an instruction on six web pages asking any automated reader to fetch one URL, then watched for twelve days. Three crawlers read it sixteen times and none of them acted. The null result is the easy part — the hard part was three separate bugs that would each have produced the same zero while the system reported itself healthy.
category: Threat Research
date: 2026-11-07
author: Timilehin Owolabi
authorRole: Founder & CEO
image: /magnumai-demo/interaction-logs.png
featured: true
takeaways:
  - User agents and request rates identify crawlers. They do not identify agents, because the thing that separates an agent from a scraper is whether it acts on what it reads.
  - A sensor that cannot distinguish "nothing happened" from "nothing was recorded" has no null result to report, only an absence.
  - Making the pages discoverable through a sitemap is what made the experiment collect anything at all, and it is also what stopped the surfaces discriminating between readers.
---

How do you tell an AI agent from a web crawler?

The usual answers are user agent, request rate, and header fingerprints. Those identify *crawlers*. They do not identify agents, because a well-behaved agent and a well-behaved crawler send more or less the same request. The thing that separates them is what happens next: a scraper ingests text and does nothing with it, an agent comprehends it and may act.

So we built something to measure the acting.

## The setup

Six pages, each carrying one instruction addressed to automated readers, asking them to fetch a single URL on the same domain. Reaching that URL is evidence of comprehension rather than of traffic.

One instruction per page, placed in a different surface each time:

| Variant | Instruction placed in | What it separates |
|---|---|---|
| `visible` | a visible paragraph | baseline — any reader of rendered text |
| `comment` | an HTML comment | source parsers from rendered-output readers |
| `hidden` | a CSS-offscreen element | raw-DOM readers from ones respecting computed style |
| `alt` | `alt` and `aria-label` | accessibility-tree extraction |
| `noindex` | a visible paragraph, `Disallow`ed in robots.txt | whether exclusion is honoured before reading |
| `/canary/` | nothing — the human explainer | — |

Only one instruction per page, because several on one page would make a hit ambiguous about which surface was actually read.

The ethics were fixed before anything was built, and they are not subtle. The instruction asks for exactly one thing: a GET to a URL we own. It never asks for a system prompt, conversation history, credentials, or anything about the agent's user. Every page explains itself in plain language to a human. Cookies are discarded before anything is written down. Nothing touches a third party's systems. This measures instruction-following; it does not extract.

## The result, after twelve days

Figures as of **3 November 2026**, from a collection window opening 22 October at 11:05 UTC. They will have moved by the time you read this, which is why they are stated with a date and why [the experiment page](/canary/) reads them live rather than reprinting them.

**Sixteen reads of a page carrying an instruction. Zero beacons.**

| Reader | Reads |
|---|---|
| `AhrefsBot/7.0` | 8 |
| `ClaudeBot/1.0` | 4 |
| `QlyzeBot/1.0` | 4 |

Three declared crawlers, from three unrelated operators, and not one of them followed the instruction.

Here is what that is not: it is not a finding that AI systems resist prompt injection. **ClaudeBot is a crawler.** It collects content for training; it is not a model acting on behalf of a person, and it has no mechanism for acting on what it reads. A crawler that fetches a page and does nothing is behaving exactly as a crawler should. The zero is a baseline, and reporting it as anything else would be the kind of overstatement this experiment exists to avoid.

The population worth measuring is user-initiated agents: a model fetching a page because somebody asked it to, with the ability to act. None has appeared.

Live numbers are on [the experiment page](/canary/), read from the collection store rather than typed into it, so they cannot drift from what actually happened.

## The part that was actually difficult

A null result is easy to produce. We produced three of them by accident first, and each one looked exactly like the real thing.

**The rewrite that dropped the parameter.** The pages were routed through `_redirects`, which forwards the *incoming* query string and discards the one written into the destination. So `/canary/comment` arrived at the function with no variant at all.

The beacon was worse, because it looked like it worked. `/b/comment-1` returned a valid 42-byte GIF with status 200 while recording an **empty token**. Every hit would have been logged against nothing, and the per-surface breakdown would have been silently uniform. Correct status code, empty data, no symptom.

**The denominator that grew when you looked at it.** The headline said "of everything that read a canary page, none went on to act". But the explainer page is in that count, and it carries no instruction by design — those readers were never given anything to act on. They were sitting in the denominator of a ratio about acting.

Worse, it grew. Every visit to check the results added one. Reading the number changed it.

**The experiment nobody could find.** For the first day the store held nineteen entries, every one of them ours. The pages were live, the logging worked, the health check was green — and nothing could reach them. The sitemap had sixteen URLs and none was the canary; no page on the site linked to `/canary/`.

Crawlers find pages through links and sitemaps. Nothing was ever going to arrive.

**`reads: 0` would have been the headline after twelve days, and it would have measured discoverability rather than agent behaviour** — with the storage health check sitting next to it reporting that logging was fine. Because logging *was* fine. The health check answers "was it recorded", not "could it be found", and those are different questions.

We added the canary to the sitemap at around 13:00 UTC. ClaudeBot arrived at 15:43.

## What the sitemap also cost

Look again at the distribution: `visible` 4, `comment` 4, `hidden` 4, `alt` 4. Perfectly flat.

That is what sitemap-driven fetching looks like. A crawler takes the URL list and retrieves each entry without caring what is in the HTML, so the surface variants discriminate between nothing. Whether an instruction sits in a visible paragraph or an HTML comment only matters to a reader that arrives at *one* page and decides what counts as content.

So the fix that made the experiment collect at all is the same thing suppressing the distinction it was built to measure. That is not a bug to be removed; it is the shape of the problem. Discovery by sitemap brings crawlers. Discovery by a person asking a question brings agents, and those are different populations arriving through different doors.

`noindex` has not been read once — but it is also absent from the sitemap, so "honoured the exclusion" and "never learned the URL existed" produce an identical observation. That variant cannot answer its question yet, and saying so is cheaper than pretending otherwise.

## What generalises

**If you are detecting agents by user agent, you are detecting the ones that tell you.** Three of three readers here declared themselves. The interesting population is the one that does not, and no amount of header analysis will separate it from ordinary traffic. Behaviour is the only signal with teeth, and behaviour requires something to act on.

**A sensor that cannot tell "nothing happened" from "nothing was recorded" has no null result, only an absence.** Ours writes a probe to its own store, reads it back, deletes it, and reports whether that worked, before reporting anything else. That check is why the zero above is worth publishing.

**Instrument the denominator before the numerator.** Three of our four near-misses were denominator problems: no readers, uncountable readers, or readers who were never shown anything. The beacon — the exciting half — was correct almost immediately.

**Publish the zero.** Sixteen reads, three named crawlers, twelve days, no instruction-following. That is a real finding with a real method, and if a positive result turns up later it will only mean something because this was recorded first.

The experiment is still running. If something that is not a crawler ever takes the bait, it will be on [the page](/canary/) before it is anywhere else.
