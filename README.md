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

## What's here

```
.claude/
  skills/decomplect/
    SKILL.md                       # the skill: stance, modes, output format
    references/principles.md       # ~40 principles, how to spot violations, talk citations
    references/review-checklist.md # the review walk-through
    references/tradeoff-table.md   # one table shape for Advise, Design, ADRs and Review
    references/design-process.md   # Describe → Diagnose → Delimit → Direction → Design → Dev, decision matrix
    references/adr.md              # when and how to write ADRs, template, tradeoff table, reviewing against ADRs
    references/sources.md          # talks used, with links
  agents/decomplect.md       # read-only subagent that applies the skill
  commands/architect-review.md     # /architect-review [base | PR# | doc path]
assets/                            # logo: icon, mono stamp, light/dark lockups
docs/                              # advise-on-questions.md, tradeoff-table.md (spike)
examples/architect-review.yml      # optional GitHub Action for PR reviews (not enabled)
transcripts/                       # COVERAGE.md + fetch.sh (downloads all available transcripts)
```

## Install

**Per repo (team-shared):** copy `.claude/`
into the repository root and commit.

**Personal (all projects):** copy `.claude/skills/decomplect` to `~/.claude/skills/`,
`.claude/agents/decomplect.md` to `~/.claude/agents/`, and
`.claude/commands/architect-review.md` to `~/.claude/commands/`.

## Use

- `/architect-review` reviews the current branch against `origin/main`.
- `/architect-review 123` reviews PR #123.
- `/architect-review docs/adr/0007-events.md` reviews a design doc.
- "Use the decomplect agent to review the payments module boundaries."
- "Help me shape this problem with the decomplect skill" starts design mode
  (description, problem statement, use cases, decision matrix).

- "What would decomplect pick: A or B?" gives one recommended option with the why and the
  tradeoff. See [docs/advise-on-questions.md](docs/advise-on-questions.md) to have Claude
  attach decomplect's pick to every design question it asks you.

- "Write an ADR for this" records a decision in `docs/adr/NNNN-slug.md` (or the repo's
  existing ADR folder): problem, a tradeoff table with the status quo first, decision,
  and consequences. Advise and Design offer this once you've decided. A changed
  decision gets a new ADR that supersedes the old one; accepted ADRs are never
  rewritten. Reviews flag changes that contradict an accepted ADR. See
  [docs/tradeoff-table.md](docs/tradeoff-table.md) for why the table matters.

## Pipeline (optional, not enabled)

`examples/architect-review.yml` posts one advisory review per PR via
claude-code-action. To enable it, copy it to `.github/workflows/` and add an
`ANTHROPIC_API_KEY` (or `CLAUDE_CODE_OAUTH_TOKEN`, from `claude setup-token`) secret.
It never approves or blocks merges.

## Notes

- Principles are synthesized, not copied. Run `transcripts/fetch.sh` to download the
  source transcripts from matthiasn/talk-transcripts. They carry no license grant, so
  they are not committed here.
- The skill avoids Lisp/Clojure framing and translates every idea into the idioms of
  the code under review.
