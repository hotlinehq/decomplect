# Decomplect

A language-agnostic architect for Claude Code, distilled from Rich Hickey's conference talks (credited in references/sources.md).
It reviews PRs, design docs, APIs and schemas for complecting, place-oriented data,
hidden state and time, breaking changes, and missing problem statements, and it can
walk a team through problem-first design.

## What's here

```
.claude/
  skills/decomplect/
    SKILL.md                       # the skill: stance, modes, output format
    references/principles.md       # ~40 principles, how to spot violations, talk citations
    references/review-checklist.md # the review walk-through
    references/design-process.md   # Describe → Diagnose → Delimit → Direction → Design → Dev, decision matrix
    references/sources.md          # talks used, with links
  agents/decomplect.md       # read-only subagent that applies the skill
  commands/architect-review.md     # /architect-review [base | PR# | doc path]
.github/workflows/architect-review.yml  # runs the review on every PR via claude-code-action
transcripts/                       # COVERAGE.md + fetch.sh (downloads all available transcripts)
```

## Install

**Per repo (team-shared):** copy `.claude/` (and optionally `.github/workflows/architect-review.yml`)
into the repository root and commit. Add the `ANTHROPIC_API_KEY` secret for the workflow.

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

## Pipeline

The workflow posts one sticky architecture review per PR, plus inline comments for
blocking and major findings. It never approves or blocks merges; treat it as an
advisory reviewer. To run it only on PRs labeled `architecture`, swap the `if:` line.

## Notes

- Principles are synthesized, not copied. Run `transcripts/fetch.sh` to download the
  source transcripts from matthiasn/talk-transcripts. They carry no license grant, so
  they are not committed here.
- The skill avoids Lisp/Clojure framing and translates every idea into the idioms of
  the code under review.
