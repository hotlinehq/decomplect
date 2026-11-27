<p align="center">
  <picture>
    <source media="(prefers-color-scheme: dark)" srcset="assets/decomplect-lockup-dark.svg">
    <img alt="decomplect: untangle before you build" src="assets/decomplect-lockup-light.svg" width="560">
  </picture>
</p>

# Decomplect

> **decomplect** /ˌdiː.kəmˈplɛkt/ *verb*
>
> To take apart things that have been braided together, so that each can be
> understood, changed and reused on its own.
>
> **Origin:** *de-* (Latin, "undo, reverse") + *complect*, an archaic English verb
> "to interweave", from Latin *complectī* "to embrace, encircle", from *com-*
> "together" + *plectere* "to plait, braid".
>
> **Related:** *simple* (*sim-* "one" + *plex* "fold": one braid, one role),
> *complex* (many folds braided together).
>
> **Usage:** "Before we add the retry logic, let's decomplect the HTTP client from
> the billing rules."
>
> **Antonym:** complect, the source of most incidental complexity.

Decomplect is a language-agnostic architect for Claude Code. Its principles are distilled from Rich Hickey's conference talks (credited in references/sources.md).
It reviews PRs, design docs, APIs and schemas for complecting, place-oriented data,
hidden state and time, breaking changes, and missing problem statements, and it can
walk a team through problem-first design, write the change up as an RFC for
stakeholders to review, and record the decisions as ADRs.

## Install

**Per repo (team-shared):** copy `.claude/`
into the repository root and commit.

**Personal (all projects):** copy `.claude/skills/decomplect` to `~/.claude/skills/`,
`.claude/agents/decomplect.md` to `~/.claude/agents/`, and
`.claude/commands/hammock.md`, `.claude/commands/untangle.md`,
`.claude/commands/errorbar.md`, `.claude/commands/rfc.md` and
`.claude/commands/adr-check.md` to `~/.claude/commands/`.

## Commands

### `/hammock`: shape the problem and decide

Asks you one question at a time until the problem is clear, then works through the
decisions it leads to. Each question comes with context, decomplect's pick and a
small tradeoff table with today's setup as the first column. It looks up in the code
anything the code can answer, and asks you only what you alone can decide.

Along the way it writes settled terms to `GLOSSARY.md`. It ends with a list of every
decision you made and waits for you to confirm it. Then it offers ADRs, but only for
decisions that are hard to reverse, surprising without context, and a real tradeoff.

```
/hammock should we split billing events into their own stream?
/hammock customers keep asking for order history, what should we build?
/hammock no docs: should we split billing events?
```

With `no docs` it runs the same dialog but writes no files: no glossary entries and
no ADRs. What it would have written goes into the final decision list instead.

Say "ask in rounds" to get every independent question at once instead of one per
turn.

### `/untangle`: review a change, or survey a whole repo

Reviews a branch, a PR or a design doc for things tangled together, hidden state and
time, breaking changes and missing problem statements. It reads the code the change
touches, not only the diff (every caller and reader of what changed), and says which
load it assumed. Every finding needs a concrete case: the caller, input or next change
that goes wrong. Findings are numbered so you can say "fix 2 and 5", and the review
ends with `Verdict: Ship.` or `Verdict: fix 1 and 3 first.` and a `Not checked:` line.

```
/untangle                            # current branch against origin/main
/untangle 123                        # PR #123
/untangle docs/adr/0007-events.md    # a design doc or ADR
/untangle repo                       # survey the whole repo
/untangle services/billing           # survey one folder
```

With `repo` or a folder it runs a survey instead of a review: it maps the parts, the
state holders, the boundaries and the main flows, goes deep where a tangle costs the
most, ranks at most 10 findings by change cost, and ends with what to untangle first
and which parts it did not read. It changes no code.

### `/errorbar`: check the claims behind a design

Lists every claim a design, PR, ADR or incident report rests on and labels each one
measured, inferred or assumed. For a claimed cause it names a rival explanation and
grades the cause high, medium or low. For a running system it writes the problem
statement and sweeps utilization, saturation and errors. For a design it sizes the
numbers on the back of an envelope (cost per request, the scarce resource, the tail
times the fan-out, failures, 10x growth) and checks them a second way. Every fix gets
its cost, its gain and the before/after measurement that will confirm it. It ends with
the cheapest test for each weak claim and the decision in plain words.

```
/errorbar 123                               # the claims in PR #123
/errorbar docs/postmortems/2026-10-checkout.md
/errorbar "the new cache will cut p99 by half"
/errorbar ask should we shard the orders table?   # as a dialog, one question at a time
```

The principles come from Neil deGrasse Tyson (judging claims), Brendan Gregg
(measuring running systems) and Jeff Dean (sizing designs); sources are in
`references/errorbar-sources.md`.

### `/adr-check`: are the recorded decisions still true?

Takes every accepted ADR and checks it against the code today. It searches for each
ADR's Confirmation signal (followed, drifted, or no signal), looks for evidence that
its "Revisit if" trigger has fired, and tags ADRs with neither as `no-tripwire`,
because those are the ones that rot unnoticed. It ends with a numbered ledger, drifted
and fired first, with an action per row. It never edits an accepted ADR; it offers a
superseding one instead.

```
/adr-check                  # every current ADR
/adr-check 4 7              # ADRs 0004 and 0007
/adr-check docs/decisions   # a different ADR folder
```

### `/rfc`: propose a change for feedback

Writes an RFC (Request For Change) for a feature or change, in one fixed template
instead of an ad-hoc requirements file: Introduction, Problem Statement (with a
picture of today's solution), Goals (a metric each, and Out of scope), Solution,
Abandoned Solutions (status quo first, with why each lost), Implementation & rollout
(phases, rollback, observability, stakeholders), Risk, Cost (TCO for the next few
months) and Conclusion. It reads the code for what it can find and asks you only for
the problem, the goals and what is out of scope. Anything still unknown is marked `?`
and listed as feedback wanted. The Solution's diagram is today's picture with the new,
changed and removed parts marked. Before handing it over, it checks its own reasoning
with an Error Bar pass (every number and cause labelled measured, inferred or assumed)
and its system split with an `/untangle`-style review, and fixes the draft from both.

```
/rfc stream billing events to the ledger
/rfc docs/notes/billing-requirements.md    # convert an existing requirements file
/rfc draft move sessions to Redis           # no questions; ? for what only you know
```

It goes to `docs/rfc/NNNN-slug.md` (or the repo's RFC folder) as Draft. Use an RFC to
get agreement on a whole change before it is built; use an ADR to record one decision
once it is made. After an RFC is approved, it offers ADRs for its hard-to-reverse
decisions. See [docs/rfc-instead-of-requirements.md](docs/rfc-instead-of-requirements.md)
to make it the format Claude uses for every plan or requirements file.

## Other ways to use it

- "Use the decomplect agent to review the payments module boundaries."
- "Hammock this with decomplect" or "question me on this" starts the same dialog as
  `/hammock`.

- "What would decomplect pick: A or B?" gives one recommended option with the why and the
  tradeoff. See [docs/advise-on-questions.md](docs/advise-on-questions.md) to have Claude
  attach decomplect's pick to every design question it asks you.

- "Write an ADR for this" records a decision in `docs/adr/NNNN-slug.md` (or the repo's
  existing ADR folder): problem, a tradeoff table with the status quo first, decision,
  and consequences. Advise and `/hammock` offer this once you've decided, for
  decisions worth recording. A changed
  decision gets a new ADR that supersedes the old one; accepted ADRs are never
  rewritten. Reviews flag changes that contradict an accepted ADR. See
  [docs/tradeoff-table.md](docs/tradeoff-table.md) for why the table matters.

## Evals

`evals/` holds 17 cases, each a pitfall the skill should avoid, and a runner
that runs each one with and without the skill, grades the answers and counts
tokens. Run `python3 evals/run.py`; see [evals/README.md](evals/README.md).

## Notes

Sources, credits and licensing are in [docs/notes.md](docs/notes.md).
