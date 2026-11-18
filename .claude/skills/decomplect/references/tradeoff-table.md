# Tradeoff tables

One table shape, used wherever decomplect compares options: Design mode's decision
matrix, an ADR's "Options and tradeoffs" section, and Advise when the call is close.
Prose linearizes and hides contrast; a table lets the reader see why the other
options lost, and disagree with the pick for a reason the skill could not see
(Design in Practice).

## Shape

- **First cell / one line above:** the decision being made, for which problem.
- **Columns are options.** The first column is the **status quo** (keep what exists,
  or do nothing), even when the question left it out. At least two options; one
  column is a justification, not a decision (Hammock Driven Development).
- **Rows are criteria,** 3 to 5 of them, most important first, and only rows where
  the options differ. Pick them from the menu below.
- **Must-have rows:** a hard constraint (something the decision must satisfy, not a
  preference) gets `(must)` after its label and goes first. A 🔴 on a must row rules
  the option out: say so in the cell ("🔴 breaks the v1 API: out") and don't argue it
  further in the other rows. Keep the column; it records why the option lost
  (MADR's knock-out criterion). A 🔴 on any other row is a cost to weigh, not a veto.
- **Cells are aspects:** a few words on how this option handles this criterion,
  using the real names from the code ("keeps every attempt as a row"). No yes/no,
  no points.
- **Marks:** 🟢 notably good · 🟡 challenge · 🔴 blocking · `?` unknown · no mark:
  neutral. Put the legend under the table.
- **No totals.** Never count greens or add scores. The pick is argued in words
  above or below the table; the table is the evidence.
- **Width:** at most four option columns. With more options, transpose (options as
  rows, criteria as columns) so it stays readable in a terminal or a PR comment.

```markdown
<Decision, for which problem.>

| Criterion | Status quo: <what exists> | <Option B> | <Option C> |
|---|---|---|---|
| <hard constraint> (must) | <aspect> | <aspect> | 🔴 <aspect>: out |
| <most important> | 🔴 <aspect> | 🟢 <aspect> | 🟢 <aspect> |
| <next> | <aspect> | 🟡 <aspect> | ? |

🟢 notably good · 🟡 challenge · 🔴 blocking · ? unknown · no mark: neutral

Flips if: <the observable fact that would make the runner-up win>
```

## Flips if

Under a close-call table (Advise or Interview, where the runner-up loses on only one
or two rows), add one line: `Flips if: <fact>`. Name the observable fact that would
make the runner-up win: a number crossing a threshold, a use case arriving, a `?`
resolving the other way. "If priorities change" is not a fact. This replaces
re-weighting the criteria: it tells the person exactly what they would have to
believe to overrule the pick. When the decision is recorded, the line becomes a
"Revisit if" in the ADR's Consequences. A table with a clear winner needs no line.

## Criteria menu

Row labels are in plain words, so a newcomer can read the table without knowing the
principles. The principle behind each row is here, not in the table.

| Row label | What the cell answers | Principle (talk) |
|---|---|---|
| Solves the stated problem | Does it remove the cause of the unmet objective, or only add a feature? | Solve problems, not features (Hammock Driven Development; Design in Practice) |
| What gets tangled together | Which independent things it braids together, or keeps apart | Complect = interleave (Simple Made Easy) |
| History and time | Does it keep facts with their time, or overwrite them in place? | Facts incorporate time (The Value of Values; Are We There Yet?) |
| Who can change state, and where | Where mutable state lives, and which boundaries share it | State is never simple (Are We There Yet?) |
| Effect on existing consumers | Grows, relaxes or breaks a published contract, and for whom | Change is growth or breakage (Spec-ulation) |
| Cost to change later | How hard it is to undo or extend once data and callers depend on it | Judge the artifact, not the construct (Simple Made Easy) |
| Real costs now | Performance, migration effort, operational load, team familiarity | Easy is relative, but its costs are real (Simple Made Easy) |

Domain criteria (latency budget, a compliance rule, a use case from the use-case
table) are welcome; put them first when they decide the question.

## Smells

Raise these as findings when reviewing a design doc or ADR, and fix them in your own
tables before showing them:

- **All-green column:** the choice was made first and the table rationalizes it. If
  the picked column truly has no 🟡 or 🔴, say why in one line.
- **No status quo column,** or only one option.
- **Rows that don't differ:** every cell says the same thing. Drop the row.
- **Generic rows:** all seven menu rows filled in every time, whatever the question.
- **Scores or totals,** or cells that are only a mark with no words.
- **Links instead of summaries,** and hidden comments.
- **Jargon row labels** ("complects", "accretion") in a table meant for people.
- **A preference marked (must),** or a must row where every option passes: drop the
  mark or the row.
- **Options at different levels:** a pattern against a product ("event sourcing vs
  Kafka"). Compare like with like, or split the decision in two.
- **Popularity as the argument:** a cell whose only reason is "everybody does it" or
  "we've always done it this way". Say what it does for this problem.
- **Close call without "Flips if".**

## Where each mode uses it

| Mode | When | Notes |
|---|---|---|
| Design | Strategy and implementation decision matrices | Always. See `design-process.md` |
| ADR | The "Options and tradeoffs" section | Always. Reuse the Design matrix or the Advise table if there was one. See `adr.md` |
| Advise | Three or more options, or a close call | Under the pick block, never instead of it |
| Review | A blocking or major finding with two credible fixes | Under "Simpler alternative". Most findings need none |
| Compatibility | Not this table | Use the change ledger in SKILL.md: rows are changes, not options |
