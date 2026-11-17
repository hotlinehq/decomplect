# Spike: what a tradeoff table buys us

decomplect already asks for a decision matrix in Design mode (`references/design-process.md`).
This spike looks at where the same table helps beyond that, and what we adopt now.

## The table

Options are columns, with the status quo first. Criteria are rows, most important
first, and only rows where the options differ. Cells describe how the option handles
the criterion in a few words, plus a mark: 🟢 notably good, 🟡 challenge, 🔴 blocking,
`?` unknown. No scores and no totals: the point is to see the contrast, not to add it up.

Example, for "where should order status history live?":

| Criterion | Status quo: overwrite `orders.status` | Add `status_history` JSON column | New append-only `order_events` table |
|---|---|---|---|
| Answer "when did it ship?" | 🔴 lost on every update | 🟡 yes, but parsed in app code | 🟢 one query |
| Readers of `orders` | no change | 🟡 row grows without bound | 🟢 untouched; add a `current_status` view |
| Writers | one `UPDATE` | 🟡 read-modify-write, race between writers | 🟢 one `INSERT`, no race |
| Migration risk | none | low | 🟡 backfill from audit log; gaps before 2025 are `?` |
| Team familiarity | 🟢 | 🟢 | 🟡 first event table in this service |

Reading across a row shows the tradeoff on that criterion. Reading down a column
shows what an option costs in total. The decision line ("we chose `order_events`") is
one sentence; the table is the record of why the other two lost.

## Where it helps

1. **It keeps the "why not".** Chat answers and PR descriptions record what was
   chosen. Six months later the question is "why didn't we just add a column?", and
   only the rejected columns answer it. In an ADR, the table is the part that pays off.

2. **It makes supersession readable.** When a decision changes, the new ADR copies
   the old table and changes the cells that turned out wrong, fills in a `?`, or adds a
   row or column. The difference between the two tables is the reason for the change.
   That is accretion applied to decisions: nothing is rewritten, the new fact is added
   next to the old one.

3. **It gives Review something concrete to check.** A rejected column is a
   recorded "don't". A PR that reintroduces it (say, a new `UPDATE orders SET status`)
   can be flagged as contradicting ADR 0004, with the row that made it lose. A `?`
   cell or a "Revisit if" line tells the reviewer what new evidence would reopen the
   decision.

4. **It catches rationalizing.** An all-green column, a table with one option, or
   rows where every cell says the same thing are visible at a glance. The skill can
   point these out when reviewing an ADR or design doc, which a prose rationale hides.

5. **It makes Advise honest on close calls.** The Advise pick block has one
   "Tradeoff" line. That is enough for two clear options. With three or more options,
   or a close call, the one line drops the information the person needs to overrule
   the pick.

## What we adopt now (this PR)

- The ADR template's "Options and tradeoffs" section is this table, with the status
  quo first, and rules for writing it (`references/adr.md`).
- Design mode's decision matrix is reused as the ADR's table, not rewritten.
- A superseding ADR starts from the old table.
- Review flags contradictions with accepted ADRs, tripped "Revisit if" triggers, and
  edits to accepted ADR bodies.

## Possible next steps (not in this PR)

- **Advise: optional table.** When there are three or more options, or the pick is a
  close call, add a compact table under the pick block (rows: the two or three
  criteria that decided it). Keep the pick block first so it can still be pasted
  next to a question.
- **Review: table smells.** Add the smells above to the review checklist for ADRs and
  design docs, so "all-green column" or "no status quo" becomes a finding.
- **Review: rejected-option detection.** When reviewing a PR, match the change against
  the rejected columns of accepted ADRs, not only the Decision lines.

Each is a few lines in `SKILL.md` and the checklist. Worth trying on a real repo with a
handful of ADRs before committing to them.
