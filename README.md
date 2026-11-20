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
walk a team through problem-first design and record the decisions as ADRs.

## Install

**Per repo (team-shared):** copy `.claude/`
into the repository root and commit.

**Personal (all projects):** copy `.claude/skills/decomplect` to `~/.claude/skills/`,
`.claude/agents/decomplect.md` to `~/.claude/agents/`, and
`.claude/commands/hammock.md`, `.claude/commands/untangle.md` and
`.claude/commands/errorbar.md` to `~/.claude/commands/`.

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

### `/untangle`: review a change

Reviews a branch, a PR or a design doc for things tangled together, hidden state and
time, breaking changes and missing problem statements.

```
/untangle                            # current branch against origin/main
/untangle 123                        # PR #123
/untangle docs/adr/0007-events.md    # a design doc or ADR
```

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

## Notes

- Principles are synthesized, not copied. Run `transcripts/fetch.sh` to download the
  source transcripts from matthiasn/talk-transcripts. They carry no license grant, so
  they are not committed here.
- The skill avoids Lisp/Clojure framing and translates every idea into the idioms of
  the code under review.
- Some workflow ideas in Hammock mode and the glossary (rounds, the closing decision
  list, the ADR test) were inspired by Matt Pocock's
  [mattpocock/skills](https://github.com/mattpocock/skills) (MIT). Credited in
  `references/sources.md`; no text is copied.
- Error Bar mode's principles are our summaries with short quotes for citation; the
  linked essays, talks and papers are in `references/errorbar-sources.md`. Three of its
  steps were inspired by skills in four public repositories, credited there; no text is
  copied.
- The Apache-2.0 license covers this repository's own text only. Quoted passages stay
  the copyright of their authors; see [NOTICE](NOTICE).
