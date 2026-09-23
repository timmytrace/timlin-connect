---
title: Caught and Logged, Not Raised
excerpt: We shipped a ReDoS mitigation in July. The commit message said the timeout was caught and logged, not raised. It was raised, every time, for sixty-three days — and the only reason nobody noticed is that the thing it guarded against never happened.
category: Threat Research
date: 2026-09-23
author: Timilehin Owolabi
authorRole: Founder & CEO
image: /magnumai-demo/interaction-logs.png
featured: true
takeaways:
  - An exception handler is code that does not run until the worst day. If you have never seen it run, you have not tested it.
  - A mitigation whose trigger condition never occurs is indistinguishable from no mitigation, right up until it occurs.
  - Check what your regex library actually raises. We caught a name it does not export, and the handler failed while handling the failure.
---

On 21 July we shipped a commit titled *security: fix 5 production vulnerabilities*. The first item read:

> ReDoS (input_security): replace stdlib re with regex module and add per-call timeout (`_REGEX_TIMEOUT=0.5s`) to every `pattern.search()` call. TimeoutError is caught and logged, not raised.

The reasoning was sound. Our gateway runs dozens of regular expressions over every prompt. Some of those patterns have the shape that backtracks badly — nested quantifiers, alternation, wide character classes — and a prompt is attacker-controlled input. A regex that takes four seconds on a crafted string is a way to take the gateway down without touching anything else. So: a timeout on every search, and if it fires, drop that one rule and carry on scanning with the rest.

Every part of that shipped except the last sentence.

## What the handler did

Five places in the engine looked like this:

```python
try:
    match = pattern.search(normalized_prompt, timeout=_REGEX_TIMEOUT)
except regex.TimeoutError:
    logger.warning("regex_timeout", rule=name, engine="injection")
    continue
```

The `regex` module does not export `TimeoutError`. It raises the builtin one.

So when a search exceeded 500 milliseconds, Python evaluated the `except` clause, looked up `regex.TimeoutError`, and raised `AttributeError: module 'regex' has no attribute 'TimeoutError'` — *while handling* the original timeout. That propagated out of `scan()`. Neither call site in the request path wraps the scan in a try block, because it was not supposed to be able to throw.

The mitigation against a slow regex converted a slow regex into a failed request.

## How bad, honestly

Less bad than it sounds, and worse in one specific way.

The part that worked is the part that bounds CPU. A pathological pattern still stops at 500ms rather than running to completion, so nobody can hang a worker indefinitely by sending one prompt. That is the larger of the two DoS risks and the timeout genuinely prevented it.

What broke is everything after. Instead of a scan that completes with one rule skipped, you get an unhandled exception and a 500. An attacker who found a prompt slow enough could return it in a loop and take the gateway's availability, cheaply, from anywhere. That is smaller than hanging every worker, and it is still an outage.

And there is a quieter cost. The `regex_timeout` log line — the one signal that would have said *a pattern in your engine is pathological, go look at it* — could never be written. The code that writes it is unreachable. Every slow pattern we might have had was invisible by construction.

## Why it survived sixty-three days

Because it never fired. Not once.

A guard only runs when its condition occurs, and no pattern we shipped was slow enough to reach 500ms on any prompt anyone sent. The handler was, for two months, a piece of code with no execution path. Tests passed, because nothing in the test suite was slow. Production was fine, because nothing in production was slow. The bug was real the whole time and observably absent the whole time.

This is what makes exception handlers different from ordinary code. Ordinary code that is wrong is wrong on Tuesday. A handler that is wrong is correct-looking until the single worst moment you wrote it for, and then it fails in addition to whatever already went wrong.

## How it surfaced

Not by looking for it. I was building a corpus.

The work that week was writing *hard negatives* — sentences that trip a detection rule's vocabulary while being completely ordinary. "Please ignore my previous message, I sent it to the wrong channel." Those found their own problem, which is a separate post. But while measuring, one of the new detection rules I had written turned out to be slow: it used a lookahead of the form `(?=[\s\S]*…)`, which rescans the entire prompt from every starting position. On an 11,869-character jailbreak prompt it took over three seconds.

The measurement run crashed. Not with a timeout — with `AttributeError`.

If my pattern had been merely slow rather than three-seconds slow, I would have shipped it, and the first customer to paste a long document into a protected application would have found this instead.

## The test I nearly wrote

I sat down to write the regression test with the textbook ReDoS pattern:

```python
with pytest.raises(TimeoutError):
    regex.compile(r"(a+)+b").search("a" * 64, timeout=0.05)
```

It did not raise. This version of the `regex` module optimises the classic catastrophic patterns away — `(a+)+b` and `(x+x+)+y` both complete in about two milliseconds on inputs that would hang a naive engine for hours.

Which raised an uncomfortable question about my own diagnosis, because I *had* produced a timeout with that exact pattern an hour earlier. The difference: at the time, three model evaluations were saturating every core. The 50ms budget was exceeded by scheduling, not by backtracking.

So the test I was about to commit would have passed on a loaded machine and failed on an idle one — or worse, passed for the wrong reason forever and told me nothing. The handler is what needs testing, so the final test raises `TimeoutError` from a stub and asserts the scan survives, in both directions: a hostile prompt still gets blocked with the slow rule skipped, and a benign one still comes back clean rather than failing closed.

There is a second test that walks every shipped pattern across a long hostile input and asserts none of them come near the limit. Worst case is now 1.4 milliseconds. Before the fix, one pattern was over three seconds.

## The fourth one that week

What makes this worth writing about is not the bug. It is that it was the fourth control we found in one week that reported success while doing nothing.

A tenant could set a policy action to `flag`, see it saved, see it returned by the API, and have every violating request blocked exactly as before — nothing read the column. A status called `FLAGGED` existed in the schema and on the dashboard, counted in a chart, and was never written by any code path, so the chart could only ever show zero. A published false-positive figure came from a script nobody had kept, so it could not be re-run and had drifted in both directions. And a ReDoS handler that crashed instead of handling.

None of these fail loudly. That is the whole category: a control that is wired to nothing looks exactly like a control that is working, because both of them sit there quietly producing no errors. You cannot find them by watching for failures. You find them by trying to make each one fail and noticing which ones won't.

That is now a rule here. When we added a CI check this week that runs those hard negatives against the live rules, the first thing I did after it went green was plant a regression and confirm it exited non-zero and named the offending rule. A check that has never failed is a check you are trusting on faith.

## What generalises

**Test the handler, not just the happy path.** If you have never watched an exception handler run, you have not tested it — you have tested the code that does not need it. Forcing the exception from a stub takes five lines.

**Verify what your library raises.** Do not infer it from the module name. `regex` raises the builtin `TimeoutError`; `re` in recent Python has no timeout at all; other libraries define their own. One `hasattr` check in a test pins the assumption, and fails the day a dependency changes it.

**A commit message is a claim, not evidence.** Ours said "caught and logged, not raised". It was written in good faith by someone who had implemented exactly that, and it was wrong, and nothing in the repository disagreed with it for two months.

**Ask what would have to happen for this code to run.** If the answer is "something that has never happened here", that code is a hypothesis, not a mitigation. Either make it run in a test, or accept that you do not know whether it works.

The fix was one word in five places — `except regex.TimeoutError` became `except TimeoutError` — plus a pattern rewritten to use bounded windows instead of an unbounded lookahead. The finding was worth considerably more than the fix.
