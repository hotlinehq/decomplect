# Architecture decision records (ADR mode)

An ADR is a short file that records one decision: the problem, the options weighed,
the choice, and the tradeoff accepted. It keeps the output of Advise and Hammock
from disappearing with the chat.

An ADR is a fact: "on this date, for this problem, we chose X over Y because Z".
Facts are not edited. When the decision changes, write a new ADR that supersedes
the old one. The log of ADRs grows by accretion, like source control, so anyone can
see what was decided, when, and what changed (The Value of Values; Spec-ulation).

## When to write one

1. **On request.** "Write an ADR for this", "record this decision", "save that as an ADR".
2. **Offered at the end of Advise or Hammock**, once a decision has
   actually been made **and** it passes all three of these:
   - **Hard to reverse:** changing it later costs real work (data written in its
     shape, consumers depending on it, a vendor or platform to move off).
   - **Surprising without context:** a future reader would not guess the reason
     from the code, or would "fix" it back to the obvious option.
   - **A real tradeoff:** there were at least two credible options and one was
     picked for a reason. "We did the obvious thing" has nothing to record.

   If all three hold, ask in one line: "Want this saved as an ADR?" If any is
   missing, don't offer: the decision goes in the decision list (`hammock.md`)
   and nowhere else. Do not write one by default; small questions should not fill
   the repository with files. Do not offer when the person has not chosen yet, or
   when decomplect had no opinion. An explicit request (1) always gets an ADR.
3. **When a decision reverses or replaces an accepted ADR.** Write a new ADR that
   supersedes it (see Superseding). Never rewrite the old one.

Review mode never writes ADRs. It reads them (see Reviewing against ADRs).

## Where it goes

1. Look for an existing ADR folder first: `docs/adr/`, `doc/adr/`, `docs/decisions/`,
   `adr/`, `architecture/decisions/`, or files matching `*adr*` / `NNNN-*.md`. If one
   exists, follow its numbering, file naming, status words and section headings
   (Nygard, MADR, or house style). Add the decomplect sections only where they fit
   that style; do not reformat older ADRs.
2. Otherwise use `docs/adr/NNNN-short-decision-slug.md`: the next free four-digit
   number, and a kebab-case slug that names the decision, not the topic
   (`0007-record-invoice-changes-as-events.md`, not `0007-invoices.md`).
3. If the repo has an index (`docs/adr/README.md` or similar), add one line for the
   new ADR. The index is a view over the ADR files; the files are the source of truth.

## Statuses

- **Proposed**: drafted, not agreed. May be edited freely until accepted.
- **Accepted**: decided. From here on the body does not change.
- **Rejected**: considered and turned down. Kept, because "why not" is information.
- **Superseded by NNNN**: replaced by a later ADR.

Write new ADRs as **Proposed** unless the person says the decision is made. The
skill records decisions; it does not make them. A person changes the status to Accepted.

## Superseding

- Write a new ADR with `Supersedes: NNNN` and a Problem section that says what
  changed since the old decision: a new use case, a cell in the tradeoff table that
  turned out wrong, a `?` that is now known, a revisit trigger that fired.
- Start its tradeoff table from the old one: keep the old columns and rows, change
  the cells that changed, and add the new column or row. The difference between the
  two tables is the reason for the change.
- Leave the old file's body unchanged. If the repository's own convention is to mark
  the old ADR (for example `Status: Superseded by 0012`), change only that status
  line and nothing else. Otherwise the `Supersedes` line in the new ADR is the record.
- The current decision on a topic is the newest Accepted ADR in a `Supersedes` chain.

## Template

Keep it to about a page. Short sentences. Use the real names from the code.

```markdown
# NNNN. <Decision, as a short phrase: "Record invoice changes as events">

- Status: Proposed
- Date: YYYY-MM-DD
- Deciders: <names or roles, if known>
- Supersedes: <NNNN, or none>

## Problem
<Unmet objective and its cause, in two to five sentences. Not the feature, not the
remedy. Include the context a newcomer needs: what exists today and what hurts.>

## Options and tradeoffs
<One line: the decision being made, for which problem.>

| Criterion | Status quo: <what exists> | <Option B> | <Option C> |
|---|---|---|---|
| <most important criterion> | 🟡 <how it handles it> | 🟢 ... | 🔴 ... |
| <next criterion> | ... | ... | ? |

🟢 notably good · 🟡 challenge · 🔴 blocking · ? unknown · no mark: neutral

## Decision
<The option chosen, in one or two sentences, and why it wins on the rows that
matter most. Name the principle if one applies, with its talk.>

Confirmation: <how a reviewer can tell from the code that this decision is followed,
e.g. "status changes go through `OrderEvents.append`; no `UPDATE orders SET status`
outside it". `?` if there is no such signal yet.>

## Consequences
- Easier: <what this makes simpler or possible>
- Harder: <what this costs: the tradeoff we accepted>
- Follow-up: <work this decision creates, if any>
- Revisit if: <the observable condition that would make us decide again>
```

## Writing the tradeoff table

The table is the part of the ADR that pays off later. The decision line says what
was chosen; the table says what was given up and why the other options lost, which
is the information that is otherwise lost first.

Follow `tradeoff-table.md` for the shape, the criteria menu and the smells. For an
ADR in particular:

- **Keep the rejected columns.** They answer "why didn't we just ...?" six months
  later, and Review uses them to spot a change that brings a rejected option back.
- **Put `?` where you don't know.** An honest `?` is a reason to revisit later; a
  guess hides it. Turn the important ones into "Revisit if" lines, along with the
  "Flips if" line if the decision had one.

## Writing the Confirmation line

The Confirmation line (from MADR) turns the decision into something a reviewer can
check in a diff. Name a concrete signal in the code, using real names:

- a pattern that must not appear: the rejected column coming back
  (`UPDATE orders SET status`, a second writer to the same table, a new sync call
  from `billing` to `orders`);
- a pattern that must appear: the chosen path (`OrderEvents.append`, a version
  field on every message, the `current_status` view as the only reader);
- or a check that already enforces it: a lint rule, an architecture test, a schema
  constraint.

Prefer the rejected-option pattern: it is what drifts back in. Keep it to one or two
signals. If the decision has no signal in code (a team process, a vendor choice),
write `Confirmation: ?`; Review then falls back to the Decision line.

When the decision came from Hammock mode, the decision matrix from
that question is the tradeoff table: reuse it. When it came from Advise mode,
build the table from the options in the question, with the status quo added if the
question left it out.

## Reviewing against ADRs

In Review mode, before walking the checklist:

1. Look for an ADR folder (see Where it goes). If there is none, skip this.
2. Read the titles, the Decision lines and the Confirmation lines of Accepted ADRs.
   Open the ones that touch the files, data, services or contracts in the change.
   Search the diff for each Confirmation signal: a forbidden pattern that appears, or
   a required one that is bypassed, is a contradiction.
3. Raise a finding when the change:
   - **contradicts** an accepted decision (does the option the ADR rejected, or
     undoes the one it chose, or fails its Confirmation line) without a new ADR that
     supersedes it;
   - **trips a revisit trigger** named in an ADR's Consequences;
   - **edits the body of an accepted ADR** instead of adding a superseding one
     (that rewrites a recorded fact);
   - **makes a significant structural decision with no record**, where the team
     already keeps ADRs (note severity, and offer to draft one).
4. Cite the ADR in the finding: `Where: src/billing/store.ts:30, contradicts ADR 0004`.

A contradiction is not automatically wrong: the decision may deserve to change.
The finding asks for the change to be recorded as a new ADR, so the reason is kept.
