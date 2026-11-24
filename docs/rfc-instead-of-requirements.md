# RFCs instead of ad-hoc requirements files

Left alone, Claude writes plans and requirements in a new shape every time:
`REQUIREMENTS.md`, `PLAN.md`, `spec.md`, each with its own headings. With decomplect
installed, `/rfc` writes them in one shape instead: the RFC (Request For Change)
template in [`references/rfc.md`](../.claude/skills/decomplect/references/rfc.md).

## The sections

1. **Introduction**: why the document exists, who should read it, and a request for feedback.
2. **Problem Statement**: the unmet objective and its cause, why today's solution
   falls short, and a picture of today's solution.
3. **Goals**: what success looks like, a metric per goal, and an **Out of scope** list.
4. **Solution**: the design, with diagrams, data model, API changes and UI flows. Short.
5. **Abandoned Solutions**: the other options, status quo first, with pros, cons
   and why each was dropped. Ideas dropped during review move here; nothing is deleted.
6. **Implementation & rollout**: phases instead of a big bang, a rollback for each,
   logs, metrics and traces, and who needs to know.
7. **Risk**: what could go wrong and how we reduce it.
8. **Cost**: total cost of ownership for the next few months, with the arithmetic.
9. **Conclusion**: the key points, and the feedback wanted.

Before handing an RFC over, Claude checks it twice and fixes the draft: an Error Bar
pass on its reasoning (are the problem's cost, the goals, the risks and the cost
measured, inferred or assumed?) and a decomplect review of the Solution (are the
systems split properly, or does one part take on two jobs? does any change break a
consumer?).

Each RFC has a Status (Draft, In Review, Approved, Rejected, Withdrawn) and a Linked
Tickets line, and goes to `docs/rfc/NNNN-slug.md` unless the repo keeps RFCs elsewhere.

## RFC or ADR

Write an **RFC** to propose a whole change before it is built and get stakeholders
to agree to it; it is edited until approved. Write an **ADR** to record one decision
after it is made; it is never edited. An approved RFC usually leads to a few ADRs for
its hard-to-reverse decisions.

## Turn it on for every plan

`/rfc` works on request. To make it the default whenever Claude would write a
requirements or plan file, add this to the repository's `CLAUDE.md` (or to
`~/.claude/CLAUDE.md`):

```markdown
## Plans and requirements
When you write a requirements, spec, plan or proposal document for a feature or
change, write it as an RFC with the `decomplect` skill's RFC mode
(`references/rfc.md`): its sections in order, Status: Draft, in `docs/rfc/` unless
this repo keeps RFCs elsewhere. Do not invent another layout. Mark what you don't
know with `?` instead of guessing. Before showing it, check its claims with Error Bar
mode and its system split with Review mode, and fix the draft from both.
```
