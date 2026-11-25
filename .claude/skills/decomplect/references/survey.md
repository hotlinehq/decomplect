# Survey (a whole repo, folder or package)

Review looks at one change. Survey looks at what is already there: where the
codebase is most tangled, what that costs, and what to untangle first. Use it when
someone inherits a codebase, before a large change lands in it, or when asked to
audit the architecture. `/untangle repo` (or `/untangle` with a folder) starts it.

It is a one-shot report. It changes no code and writes no files.

## 1. Map first

- Survey what the person names: a folder, a package, a service, or the whole repo.
  Nothing named: the whole repo.
- Read the README, the build and deploy config, the dependency list, the entry
  points (routes, handlers, jobs, consumers, CLI commands), the data stores and
  their schemas, and the tests. If the repo keeps ADRs or a glossary, read the
  accepted ADRs' Decision and Confirmation lines and the glossary terms.
- Find the expected load: one person running a script, or many users and processes
  at once. Judge state, time and boundary findings against it, and say which load
  you assumed.
- Name the parts and what each owns: modules or services, the state holders (tables,
  caches, singletons, global clients, in-memory maps), and the boundaries between
  them (process, network, storage, queue).
- Trace the two to four main flows end to end: where data comes in, what is
  stored, what goes out, and what happens on failure.

## 2. Go deep where a tangle costs the most

A big repo cannot be read file by file. Spend the reading on the places where a
tangle makes every change slow or risky:

- code many other parts depend on (shared models, base classes, utility modules
  imported everywhere);
- the state holders, and every writer of each;
- the boundaries: what crosses them (plain data, or live objects, ORM entities,
  callbacks, connections);
- published contracts: endpoints, events, messages, tables other services read;
- files that change together in `git log` but live apart (a sign two concerns are
  braided across them): `git log --name-only --format= -n 300 | sort | uniq -c | sort -rn`
  shows which files churn most.

Walk the review checklist (`review-checklist.md`) over these hotspots. Sections B
(complecting), C (information), D (state and time) and E (boundaries) carry most
survey findings; F (compatibility) applies to the published contracts; A applies to
the ADRs and docs. Check every hotspot against the accepted ADRs, as Review does.

Say which parts you did not read.

## 3. Check before you report

The same check as Review step 4 in `SKILL.md`:

- Every finding needs a concrete case: this change, this caller or this input leads
  to this wrong result or this extra cost. No case, no finding.
- Re-read the lines and confirm it: the two writers really exist, the field really
  is overwritten, the modules really reach into each other's internals.
- A choice an accepted ADR records is a decision, not a finding, unless its
  Revisit-if has fired or the expected load already crosses it.
- Essential complexity of the domain is not a finding.
- No style taste, no "consider", no vague worries.

## 4. Rank

Rank findings by change cost: how much each tangle slows or endangers the changes
this codebase is likely to need, given its load and what its git history shows it
changing. Blocking and major first. At most 10 findings; if you left smaller ones
out, say how many.

## Output

```
<Verdict in one or two sentences: how tangled, and where.>

## What this codebase does
<Two or three sentences. The load you assumed.>

## Map
<The parts, what each owns, the state holders and the boundaries. A small text
diagram if it helps. Keep it to what the findings need.>

## Findings
### 1. [severity] <short title>
- In plain words: ...
- Principle: <name> (<talk>)
- Where: <files, or the boundary between two parts>
- Complects: <A> with <B>
- Why it matters: <the changes it makes slow or risky, with a real example from
  the code or its history>
- Simpler alternative: <the next disentangling step, not a rewrite>

## What is already simple
<Good structure to keep.>

## Untangle first
<One to three steps, in order. Each is the smallest change that disentangles, and
says what it makes easier.>

Verdict: <healthy | untangle 1 first | untangle 1 and 3 first>
Not checked: <the parts you did not read or could not run>
```

Number findings across all severities, so the person can say "do 2 next". Every
finding follows Review's finding rules in `SKILL.md`, including the "In plain words"
line first.

Nothing found: the "What this codebase does" and "Map" sections, then
`Healthy. Nothing to untangle.` and one line on what you read.

Offer, in one line at the end, an RFC (`rfc.md`) for an "Untangle first" step that
is too big to do without others agreeing to it.
