# Spike: what a tradeoff table buys us

decomplect already asks for a decision matrix in Hammock mode (`references/design-process.md`).
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

## What we adopted

- One definition of the table in `references/tradeoff-table.md`: shape, a menu of
  seven plain-word criteria tied to the principles, marks, smells, and which mode
  uses it when. Hammock's decision matrix and the ADR's table both point to it.
- The ADR template's "Options and tradeoffs" section is this table, with the status
  quo first (`references/adr.md`). A superseding ADR starts from the old table.
- **Advise:** with three or more options, or a close call, a compact table goes under
  the pick block. The pick block stays first and is the only part that goes on a
  question card.
- **Compatibility:** a change ledger (change, class, who is affected, how to make it
  growth) when more than one published thing changes.
- **Review:** an optional small table under "Simpler alternative" for blocking or
  major findings with two credible fixes; table smells are on the checklist for
  design docs and ADRs; contradictions with accepted ADRs are flagged.

## Guardrails

| Risk | Guardrail |
|---|---|
| Verbosity | Table only when it changes what the reader can see: 3+ options, a close call, or an ADR. Two clear options keep the one-line Tradeoff |
| False precision | No scores, no totals; the pick is argued in words |
| Generic rows | 3 to 5 rows, only ones where options differ |
| Rationalizing | Status quo column first; an all-green pick column must say why |
| Jargon | Plain-word row labels; principles live in the reference file |
| Narrow renderers | At most four option columns; transpose beyond that |

## Still open

- **Rejected-option detection.** Partly addressed: ADRs now carry a Confirmation
  line (from MADR) naming a code signal, usually the rejected option's pattern, and
  Review searches the diff for it. Still open: matching a change against rejected
  columns when the ADR's Confirmation is `?`.
- Try Advise with tables on a handful of real questions. A table that never changes
  anyone's mind or surfaces a `?` means the trigger is too loose.
