# Error Bar mode

Sanity-check the claims behind a design before judging how it is put together. The `/errorbar`
command starts it.

Use when a design, PR, ADR, incident report or decision rests on factual claims: performance numbers,
user demand, cost, root cause, usage ("nobody calls this"), scale ("we'll have millions of events").
Also use when someone asks "is this true?", "is this big enough to matter?", or "how do I explain
this decision?". Principles are in `errorbar-principles.md`: Part A (E1-E12) for every
claim, Part B (E13-E17) when the claim is about a running system (performance, capacity, cost,
incident cause), Part C (E18-E26) when a design rests on numbers (throughput, latency, storage,
cost, failures, growth). Reference costs are in `numbers.md`.

0. **State the problem** (E13, E14). *System claims only.* Answer in one line each: what makes us
   think there is a problem, has it ever been fine, what changed, can it be expressed as latency or
   run time, who else is affected, what is the environment. Often this alone settles it.
1. **List the claims.** Pull every premise the decision depends on into a table. One row per claim,
   in the author's words.
2. **Label each claim** (E4): **measured** (data exists, cite it), **inferred** (reasoned from other
   data), or **assumed** (nobody checked). Don't upgrade a label because the claim sounds plausible.
   If the claim came from a named anti-method (E2: blame someone else, streetlight, random change,
   traffic light, average, passive benchmarking), note it.
3. **Probe each measured claim** (E3, E5, E6, E8): source, method, did the test test this, what
   limited it (why X and not 2X), sample size and base rate, like-for-like comparison, reproduced by
   anyone else, uncertainty range, distribution rather than mean, interval length, possible
   systematic error.
4. **Name a rival and grade the cause** (E10). For each claimed cause ("X is the bottleneck", "Y
   caused the outage", "Z drove the drop"), name at least one rival explanation that fits the same
   evidence, and the observation that would tell them apart. Give the cause a confidence: High
   (direct evidence, rivals ruled out), Medium (a rival is still open) or Low (one possibility among
   several), and say what would raise it.
5. **Cover** (E15, E16). *System claims only.* Sweep utilization, saturation and errors over the
   resources the design touches, including software ones (pools, locks, queues). Report saturation or
   errors that no claim mentioned, and resources that are clean (exonerated). Ask whether the load
   itself is expected, or whether the work can be removed.
6. **Size it** (E7, E18-E26): write a back-of-envelope estimate for any number that drives the
   design. Normalise (per user, per request, per month) and compare with a known reference. For a
   suspected cause, give its share of the whole (profile, latency breakdown). For a design, check:
   - **Operations × cost** (E19-E21): what one request or job does, the unit cost of each step from
     `numbers.md` (with its year), the total as a range, and the dominant term.
   - **Scarce resource** (E22): which resource runs out first, and at what load.
   - **Tail** (E23): name the percentile; with fan-out N, apply 1 − (1 − p)^N.
   - **Failures** (E24): expected failures per day at this size; independent or correlated?
   - **Growth** (E25): does it hold at 10x? What breaks first before 100x? Is 100x actually needed?
   - **Second route** (E19): estimate the result again a different way (top-down from a total, or
     from a measured system of similar size). Within about 3x: they agree. 10x apart: one route is
     wrong; find which. Then ask whether the decision changes anywhere across the range; if not, stop.
   - **Price the fix** (E26): every proposed mitigation states its cost and its gain in numbers, and
     the measurement that will confirm the gain: same metric, percentile, load and instrument, before
     and after. A fix reported as working without that before/after comparison is still a claim.
   Flag anything off by 10x or more from the claim. Skip the bullets that don't apply.
7. **Mark the edge** (E9, E10): say what is unknown. Replace "probably X" with "unknown; next test is
   Y". List known unknowns with the metric or instrumentation that would close each.
8. **Find the cheapest test** (E17) for each assumed or weak claim that the decision hinges on: the
   smallest measurement, query or experiment that could prove it wrong. Order by cost: problem
   statement, workload characterization, USE sweep, profile, latency breakdown. For a design on
   paper, the cheapest test is often a microbenchmark of the dominant term or a measurement of the
   one reference number the decision hinges on (E20). Prefer a test that rules out half the
   suspects at once.
9. **Explain it** (E12): one paragraph a non-engineer can follow, with a familiar comparison for
   each number that matters.

Output:

```
## Verdict
<Can we decide on this evidence? One or two sentences.> Confidence: <High / Medium / Low>, because <...>.

## Problem statement            (system claims only)
<six one-line answers>

## Claims
| # | Claim | Label | Evidence / estimate | Weakness | Anti-method | Cheapest test |
|---|---|---|---|---|---|---|

## Causes                       (when a claim names a cause)
| Claimed cause | Rival explanation | What tells them apart | Confidence | What would raise it |
|---|---|---|---|---|

## Coverage                     (system claims only)
| Resource | Utilization | Saturation | Errors | Note |
|---|---|---|---|---|

## Back of the envelope
<the arithmetic, shown, with units; share of the whole for suspected causes>
| Operation | Count / request | Unit cost (source, year) | Total |   (designs)
|---|---|---|---|
Result: <range>. Dominant term: <...>. Scarce resource: <...>. At 10x: <holds / breaks at ...>.
Second route: <how, and its result>; agrees within <N>x. Decision holds across the range: <yes / no: flips at ...>.
Fixes: <each mitigation: cost, gain, and the before/after measurement that will confirm it>.

## What we don't know
<open questions and known unknowns, each with the test or instrumentation that would answer it>

## In plain words
<the decision and its key numbers for a non-engineer>
```

Each weakness cites a principle (e.g. "E6 averages hide the shape (Gregg, Queue 2012)"). Leave the
Anti-method column blank when none applies. Keep it proportional: a one-line claim gets a one-line
check, and skip steps 0 and 5 for claims that aren't about a running system. Don't invent doubt about
claims the decision doesn't depend on. This mode checks facts; Review and Advise still judge the
design.

## As a dialog

When the person asks to work through the claims together ("question me", or `/errorbar ask`),
follow the Hammock rules in `hammock.md` (one question per turn, look before you ask, stop once the
decision is safe) with these questions, in this order:

1. "What has to be true for this to be the right call?" (collect claims)
2. For a system claim: "What makes you think there's a problem, and was it ever fine? What changed?"
3. For each claim: "How do we know?" (label measured / inferred / assumed)
   For a claimed cause: "What else could explain this, and what would tell the two apart? How sure
   are we: high, medium or low?"
4. For a measured claim: "What was the limiting factor when you measured it?"
5. "What's the rough number, and how much of the whole does it explain?" (do the estimate together)
   For a design: "What does one request actually do, and what does each step cost? Which resource
   runs out first? What happens at 10x, and do we really need 100x?" Then: "Can we get the same
   number another way? Does the decision change anywhere in that range?"
6. "What would change your mind, and what's the cheapest way to find out?"
   For a fix: "How will we know it worked? Which measurement, before and after?"
7. "How would you say this to someone outside the team?"
