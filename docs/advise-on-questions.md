# decomplect's pick on questions

When Claude stops to ask you a design question, it can first ask decomplect for an
answer and show it next to the options:

> **Should order history live in the `orders` table or a new `order_events` log?**
> 1. Add `status` and `updated_at` columns to `orders`
> 2. New append-only `order_events` table (**decomplect's pick**)
>
> decomplect's pick: 2. Status changes are facts with time; overwriting them in
> place loses the history support will ask for. Tradeoff: one more table and a
> view for "current status". Principle: Facts include time (The Value of Values).

You still choose. The pick is one more opinion on the card, not the decision.

## Turn it on

Add this to the `CLAUDE.md` of any repository that has the decomplect skill
(or to `~/.claude/CLAUDE.md` to turn it on everywhere):

```markdown
## Design questions
Before you ask me a question with options about design, architecture, data shapes,
state, APIs, schemas or dependencies (with AskUserQuestion or in a message),
get decomplect's pick first: use the `decomplect` skill in Advise mode, or the
`decomplect` subagent for questions that need the code read. Then:
- mark the picked option with "(decomplect's pick)" in its label,
- put the one-line "Why" and "Tradeoff" in that option's description,
- list the picked option first.
Skip this for questions that aren't about design (naming, dates, taste).
If decomplect has no opinion, ask the question without a pick.
```

## Ask it directly

- "What would decomplect pick: a shared `User` type with optional fields, or separate request types?"
- In a review thread or design doc: "decomplect, advise on the three options in section 4."
