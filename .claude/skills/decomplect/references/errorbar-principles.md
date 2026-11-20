# Error Bar principles

Distilled from Neil deGrasse Tyson's essays and interviews, Brendan Gregg's performance
methodology writing, and Jeff Dean's talks and papers on building large systems (see
`errorbar-sources.md`). Decomplect judges how a design is put together.
These principles come first: they check whether the claims that motivate a design are true and the
right size. Apply them to any engineering claim: "users want X", "this is the bottleneck", "it's 10x
faster", "the incident was caused by Y", "nobody uses that endpoint".

- **Part A, judging a claim (E1-E12)**: applies to every claim.
- **Part B, measuring a system (E13-E17)**: applies when the claim is about a running system:
  performance, capacity, cost or the root cause of an incident.
- **Part C, sizing a design (E18-E26)**: applies when a design, often one not built yet, rests on
  numbers: throughput, latency, storage, cost, failure rates or growth. Reference costs are in
  `numbers.md`.

Short quotes are for citation only. Cite by source id, don't paste long passages.

# Part A. Judging a claim

## E1. How you think beats what you know
A claim is judged by how it was reached, not by who says it or how familiar it sounds.
Ask how the claim was obtained before arguing about what it says.
- Engineering form: "Where does that come from?" is the first question for any premise in a design doc.

## E2. Don't fool yourself; name the habit that fooled you
The method exists to beat your own bias. Prior expectations hide discoveries (Herschel logged Uranus
as a comet). Selectively dropping inconvenient data is the classic blunder. In systems work the
self-deceptions have names (Gregg's anti-methods), and naming one makes a review comment short and
impersonal:
- **Blame someone else**: the cause is in a component you don't own.
- **Streetlight**: look where the familiar tools shine, not where the problem is.
- **Drunk man / random change**: tweak settings until the symptom goes away.
- **Traffic light**: green dashboard means fine, red means that's the cause. Fine for objective metrics (error counts), misleading for subjective ones (latency).
- **Average**: explain the mean and assume one peak.
- **Passive benchmarking**: run a benchmark, chart it, ship the slides.
- Engineering form: look for the benchmark run that was discarded, the dashboard filter that hides a
  segment, the incident timeline that starts after the cause. Gregg's case: a customer blamed the
  network from ping output; the database was out of memory and paging, and the network focus had
  hidden it (Queue 2012).

## E3. Neither swallow nor dismiss: ask, and check the test tested the claim
Accepting a claim without question and rejecting it without question are equally lazy.
The skeptic's questions: what is the source, what is the mechanism, what test was run, did it test
the thing claimed, has anyone else reproduced it? For a benchmark, ask what limited it: a result
nobody can explain ("why X and not 2X?") hasn't been understood yet.
> "you benchmark A, but actually measure B, and conclude you've measured C." (Gregg, Active Benchmarking)
> "Can they explain why the benchmark result was X, and not 2X (twice as fast)?" (Gregg, Active Benchmarking)
- Engineering form: a load test against a warm cache does not test cold-start latency. "The new JSON
  library is 3x faster" from a run limited by the load generator's single core says nothing about the
  library. Ask what was at 100% while it ran.

## E4. Hypothesis is not theory
An idea about how something works is a hypothesis until it has made a prediction that was tested.
Say which one you have.
> "If you have an idea about how something works, it's not a theory; it's a hypothesis." (Tyson, Freakonomics 2024)
- Engineering form: label premises in a design doc as **measured**, **inferred**, or **assumed**. A design resting on assumed premises must say what would falsify them.

## E5. One result is weak; replication is strong; negative results count
A single experiment, or two or three, can be a false positive from bias or bad design. Independent
reproduction is what makes a result solid. Null results count: in a system, a resource with low
utilization, no saturation and no errors is exonerated, which narrows the search.
> "Consistency and repeatability are the hallmarks of a genuine scientific finding" (Tyson, Certain Uncertainties I)
> "if they get the same result, then it means you've transcended the bias." (Tyson, Harbinger #327)
> "Null results matter too." (Tyson, Certain Uncertainties II)
- Engineering form: rerun the benchmark on a different machine or by a different person; record the experiments that showed no effect, and the components they ruled out.

## E6. Every measurement has uncertainty; precision is not accuracy; averages hide the shape
"Error" means quantified uncertainty, not a mistake. A tight number can still be wrong. Systematic
errors (wrong instrument, wrong population) are worse than noise because they don't average out.
Interval averages hide bursts, and many latency distributions have more than one peak: ask for the
distribution and the time series at a resolution that fits the problem.
> "Ordinary uncertainties almost always lead to correct (and meaningful) answers, but systematic uncertainties are insidious." (Tyson, Certain Uncertainties II)
> "a five-minute average can disguise short periods of 100-percent utilization and, therefore, saturation." (Gregg, Queue 2012)
> "Many distributions aren't normal, gaussian, or unimodal" (Gregg, Velocity 2013)
- Engineering form: "p99 = 212.4 ms" from one 30-second run on a laptop is precise and probably not
  accurate. "Average latency 40 ms" over a 2 ms cache-hit path and a 400 ms miss path describes no
  real request. Ask for the range, the histogram and the setup.

## E7. Size it before you believe it: against the world and against the whole
Most bad claims are off by orders of magnitude, and a quick estimate catches them. Raw totals mislead;
normalise per user, per request, per year, and compare with something familiar. Then size a suspect
against the whole: a plausible cause that explains a small share of the cost is not the answer.
> "you would think that $1-million equals $1-billion equals $1-trillion." (Tyson, Fear of Numbers)
> "What matters is the budget per year, all right?" (Tyson, Ferriss #389)
> "showing that it was responsible for only 1.6 percent of the CPU time." (Gregg, Flame Graph 2016)
- Engineering form: before designing for "a lot of traffic", write the back-of-envelope: users ×
  actions/day ÷ 86,400 = requests/s, × payload = bytes/s. Compare with what one box does. "Logging is
  slow" stays a hypothesis until a profile shows logging is a real share of request time (and
  remember CPU profiles miss time spent waiting). For a design on paper, Part C (E18-E26) gives the
  full method.

## E8. Anecdote, base rate, confounders; know the workload
One vivid case is not data. Check the base rate, and compare like with like before concluding. For
traffic, the base rate comes from characterising the workload: who causes the load, why, what it
consists of, and how it changes over time.
> Helfand on StarTalk 2017: "recognizing that the plural of anecdote is not data"
> "You want to compare neighborhoods of equal income." (Tyson, Ferriss #389)
- Engineering form: "three customers complained": out of how many, and how many complained last
  month? "Service B is slower": on the same hardware, same data size, same time of day? "Traffic
  tripled": from whom?

## E9. Mark the edge of what you know; list the known unknowns
Where understanding runs out, say so. "We can't explain it, so it must be X" is an argument from
ignorance. Also don't declare a problem unsolvable just because you haven't solved it. A metric you
can't currently collect is still a question: write it down, with the instrumentation that would
answer it.
> "how presumptuous it would be for me to claim that if I can't solve a problem, neither can any other person" (Tyson, Perimeter of Ignorance)
> "Take note of metrics that are not currently available: these are the "known unknowns."" (Gregg, Queue 2012)
- Engineering form: "probably a network blip" closing a postmortem is a god-of-the-gaps. Write "cause
  unknown" and the next test instead. "We have no per-tenant latency" belongs in the design's risks.

## E10. Confident "we're done" claims age badly: name a rival, say how sure you are
Every era's experts announced the end of discovery, and were wrong. Keep the error bars on your own
certainty; early results sit at the edge of knowledge. The first problem you find is a problem, not
necessarily the problem. So for every claimed cause, name at least one rival explanation that fits
the same evidence, and the observation that would tell them apart. Then say how sure you are:
**High** (direct evidence, rivals ruled out), **Medium** (evidence points this way, a rival is still
open), **Low** (one possibility among several). Say what would raise it.
> "Lord Kelvin was off by a factor of fifty." (Tyson, Certain Uncertainties I)
> "the first one you find may be *a* problem but not *the* problem." (Gregg, USE)
- Engineering form: "root cause: the connection pool is too small" (Medium). Rival: a slow query
  holds connections longer. They differ in query time per connection; one trace settles it. A
  postmortem that names one cause, considered no rival and reads as certain is a finding.

## E11. Bias can't be removed, only exposed
You can't live without bias, but you can be aware of it and invite people who don't share it.
Echo chambers hide the critique.
> "you never see a critique of your thoughts because your search engine never takes you there." (Tyson, Harbinger #327)
- Engineering form: ask the team that will be hurt by the change to try to break the claim.

## E12. Being right is half the job; the impression must be right too
A correct fact that leaves the wrong impression has failed. Meet the audience most of the way: use
a familiar comparison, and scale numbers to something they can feel.
> "If the impression isn't accurate, it doesn't matter that the fact is correct." (Tyson, Freakonomics 2024)
- Engineering form: "adds 40 ms" means nothing to a PM; "checkout feels as slow as it did last spring" does.

# Part B. Measuring a system

## E13. Start with questions, not with the tools you happen to know
Running the familiar tool and reading what it shows is not analysis. Pick the questions first, then
find (or build) the metric that answers each one.
> "Start with the questions, then make metrics to answer them" (Gregg, Applicative 2016)
- Engineering form: "we looked at the dashboard and CPU was fine" answers a question nobody asked.
  Ask "what is the request waiting on?" and then find the trace, profile or queue metric for it.

## E14. Write the problem statement before touching anything
A handful of questions often solves the issue outright, and always narrows it: what makes you think
there is a problem, has it ever been fine, what changed, can it be expressed as latency or run time,
who else is affected, what is the environment.
> "What makes you think there is a performance problem?" (Gregg, Methodology)
- Engineering form: "has this endpoint ever been fast?" turns "Postgres is slow" into "p99 doubled on
  Tuesday, the day the ORM upgrade shipped".

## E15. Cover every resource before you go deep (USE)
For every resource the design touches (CPU, memory, disk, network, and software ones such as locks,
thread pools, connection pools, queues, file descriptors) check utilization, saturation and errors.
Breadth first finds the cause nobody claimed, and clean resources are exonerated (E5).
> "For every resource, check utilization, saturation, and errors." (Gregg, USE)
- Engineering form: before "add a cache", check the connection pool: requests queued waiting for a
  connection is saturation, and a cache won't fix it.

## E16. Separate load from architecture; the best win is removing work
Many "architecture" problems are unexpected load. Characterise the workload (E8) before redesigning,
and consider not doing the work at all before doing it faster.
> "The best performance wins often arise from eliminating unnecessary work." (Gregg, Queue 2012)
- Engineering form: before sharding, find out who sends the traffic. One client polling every 100 ms
  is a conversation, not a migration.

## E17. Pick methods by payoff, and know when to stop
No method finds everything. Use cheap broad checks first (problem statement, workload, USE), then
expensive deep ones (profiles, latency breakdown). Fix where the gain is worth it, and stop when the
remaining gain isn't.
> "I find it solves about 80% of server issues with 5% of the effort" (Gregg, USE)
- Engineering form: Method R (cited on Gregg's Methodology page): pick the user actions that matter
  to the business, measure where their time goes, fix the biggest net payoff.

# Part C. Sizing a design

## E18. Estimate the design before you build it
Being able to predict a design's performance on paper is a core skill. It picks the promising design
out of several before any code exists. Performance belongs in the design for the small part of the
system where it matters (Knuth's "critical 3%"), not "later".
> "Important skill: ability to estimate performance of a system design" / "without actually having to build it!" (Dean, LADIS 2009)
> "This document is about that critical 3%." (Dean, Perf Hints)
- Engineering form: a design doc that claims "fast enough" or "scales" without a calculation is a
  finding. Ask for the envelope before asking for a benchmark.

## E19. Count the operations, multiply by cost, add up
List the low-level operations one request or job needs (seeks, round trips, bytes moved, cache
misses), multiply each by its rough cost, and sum. For latency, account for what runs in parallel.
The sum also shows which term dominates, which is often not the one people argue about. Give a range,
not a point.
- Example (Dean, LADIS 2009): a results page with 30 thumbnails. Serial reads: 30 seeks × 10 ms +
  30 × 256 KB ÷ 30 MB/s ≈ 560 ms. Parallel reads ≈ 18 ms, "really more like 30-60 ms" once variance
  is counted.
- Example (Dean, Perf Hints): sorting a billion ints. Memory passes cost a few seconds; mispredicted
  branches (15 billion × 5 ns) cost about 75 s. The estimate says to fix branches, not memory.
- Engineering form: show the table: operation, count per request, unit cost, total, then name the
  dominant term.

Then check the estimate a second way, by a different route: top-down from a total (traffic, bill,
fleet) instead of bottom-up from operations, or from a measured system of similar size. Two routes
within about 3x of each other agree; 10x apart means one route is wrong, so find which before using
either. This is replication (E5) on paper. Finally ask whether the decision changes anywhere across
the range. If it doesn't, the estimate is good enough: stop (E17). If it does, the cheapest test is
the number that moves it.
- Engineering form: "1,200 writes/s" from users × actions ÷ 86,400 should also come out of last
  month's write log ÷ 2.6 million seconds. If one route says 1,200 and the other 15, one input is wrong.

## E20. Know the reference numbers and their date; calibrate them
Estimates need costs for the basic operations, to an order of magnitude. The numbers move: Dean's
2009 table puts a datacenter round trip at 500 µs, the 2025 update at 50 µs. An estimate is a
hypothesis (E4): when a number decides the design, measure it on your own system, with the care
of Part B (E13-E17), and keep small benchmarks honest (E3).
> "If you don't know what's going on, you can't do decent back-of-the-envelope calculations!" (Dean, LADIS 2009; repeated in Perf Hints)
> "microbenchmarks can have pitfalls that make them non-representative of full system performance." (Dean, Perf Hints)
- Engineering form: cite the table and its year with every estimate (`numbers.md`). When the
  estimate and a measurement differ by more than ~2x, one of them is wrong: find out which.

## E21. Know how your building blocks work, not just their interfaces
The cost of a call depends on its implementation: block sizes, replication, caches, where the data
lives.
- Example (Bigtable 2006): each random read pulled a 64 KB block to return a 1 KB value; about 1,200
  reads/s already saturated the server. Smaller blocks were the fix.
- Engineering form: "one key-value lookup" may be a network round trip, a disk read and a 64 KB
  transfer. Write down what the block really does.

## E22. Find the scarce resource
Designs win by spending the plentiful resource to save the scarce one. Name which one runs out first.
This is the design-time twin of the USE sweep (E15).
> "CPUs are fast, memory/bandwidth are precious, ergo…" (Dean, LADIS 2009)
> "network bandwidth is a scarce resource." (MapReduce 2004)
- Example (MapReduce 2004): scheduling work next to its data meant most input "consumes no network
  bandwidth".
- Engineering form: for each option, which of CPU, memory, disk, network, money or people hits its
  limit first, and at what load?

## E23. Estimate the tail, and multiply it by the fan-out
Averages hide what users feel (E6), and fan-out amplifies the slow end. If 1 in 100 calls is slow and
a request touches 100 servers, most requests are slow.
> "then 63% of user requests will take more than one second." (Tail at Scale 2013)
- Arithmetic: P(request slow) = 1 − (1 − p)^N. With p = 0.01 and N = 100: 1 − 0.99^100 ≈ 0.63.
- Measured (Tail at Scale 2013): p99 for one leaf 10 ms; p99 waiting for all leaves 140 ms.
- Engineering form: any latency claim names the percentile and the fan-out. "p50 is 20 ms" says
  nothing about a page that calls 40 services.

## E24. Failures are a rate: budget for them
At scale, failure is a steady stream with a known shape, not an event. Count it like any other load,
and ask whether failures are independent or correlated.
- Example (Dean, LADIS 2009): a typical first year of a new cluster: about 1,000 machine failures,
  thousands of disk failures, about 20 rack failures, one power-unit failure dropping 500-1,000
  machines at once.
- Example (Bigtable 2006): real failures went well beyond the clean crash model that protocols
  assume (corruption, clock skew, hung machines).
- Engineering form: fleet size ÷ MTBF = failures per day. If the design assumes "a node rarely
  fails", compute how rarely.

## E25. Design for about 10x; plan to rewrite before 100x
Parameters grow by orders of magnitude, and the right design at one scale is wrong at another. Make
the design survive 10x, and don't pay for scale or features nobody has shown are needed.
> "design for ~10X growth, but plan to rewrite before ~100X" (Dean, WSDM 2009)
> "Don't design to scale infinitely:" (Dean, Stanford 2010)
> "it is important to delay adding new features until it is clear how the new features will be used." (Bigtable 2006)
- Engineering form: state today's number, the 10x number, and what breaks first between 10x and
  100x. A design for 1000x today's load needs a reason.

## E26. Price the fix in numbers, then show it worked
A mitigation is a claim too: it has a cost and a gain, and both should be numbers. Small, cheap
redundancy often beats hunting every root cause. Once it ships, the gain is still a claim until it
is measured: re-measure with the same metric, percentile, load and instrument that showed the
problem, and compare before with after. "Deployed" is not "fixed".
> "the sort program ... takes 44% longer to complete when the backup task mechanism is disabled." (MapReduce 2004)
> Hedged requests cut the 99.9th percentile "from 1,800ms to 74ms while sending just 2% more requests." (Tail at Scale 2013)
> "the most powerful tail-tolerant techniques reduce latency hiccups regardless of root cause." (Tail at Scale 2013)
- Engineering form: "add a retry / cache / replica / hedge" states its extra load, memory or money,
  and which percentile it moves by how much, and names the measurement that will confirm it ("p99 of
  /checkout on the same dashboard, a week before and a week after"). Decomplect's Review still judges
  what the fix complects.
