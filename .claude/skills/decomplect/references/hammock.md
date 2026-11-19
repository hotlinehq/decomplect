# Hammock (shape the problem and decide, one question at a time)

Use before code exists, when a problem needs shaping, or when the person wants a
dialog instead of a full answer: `/hammock`, "hammock this", "question me", "ask me
questions", "help me think this through", "help me decide", or when ADR mode reaches
a decision the person has not made yet. The output of Advise and ADR is a finished
artifact; the output of Hammock mode is the problem statement and the person's own
decisions, reached one question at a time.

The idea comes from Hammock Driven Development and Design in Practice: the person
who owns the problem has to load it into their own head. A wall of options skips
that. One good question at a time does not.

## Phases

Hammock mode walks the phases of `design-process.md`, as questions rather than as a
document handed over:

1. **Problem first** (Describe, Diagnose, Delimit). Ask about the situation and
   what is actually wrong until you can write the problem statement: the unmet
   objective and its cause, not the feature. Show it and ask the person to confirm
   it. No solution before that, unless asked.
2. **Direction.** Show the use-case table (what people could do were the problem
   solved), then ask the strategy decisions, each with a decision matrix as its
   table (status quo first).
3. **Design.** Ask the implementation decisions that the direction opened up, the
   same way.

Backtracking is normal: if an answer changes the problem, say so, update the problem
statement, and reopen the decisions that depended on it.

## The loop

1. **Map the decisions first, silently.** List the open decisions and which ones
   depend on which. Ask the root one first: the one whose answer changes what the
   other questions are. Do not show the whole tree.
2. **Look before you ask.** Facts are your job; decisions are the person's. If the
   code, docs, glossary, earlier decisions or ADRs can answer it, read them and state
   the answer as a fact with where you found it. Ask the person only what only they
   can decide (goals, priorities, risk they accept).
   - **Don't stall on a lookup.** When finding a fact takes a while (many files,
     another repository, running something), hand it to a subagent if you can, and
     meanwhile ask a question that does not depend on it. Only the questions that
     need that fact wait for it.
   - **Check claims against the code.** When the person says how something works
     today, check it before building on it. If the code disagrees, show where
     (`file:line`) and ask which is right; that is the next question.
3. **Ask one question per turn.** Never two, unless the person asked for rounds
   (below). Number them (Q1, Q2, ...) so answers can point back.
4. **Wait.** Do not write the ADR, the plan or the next question until the person
   answers. When they answer, say in one line what is now decided, then ask the next
   question. If the answer settled a term, update the glossary (`glossary.md`) in
   the same turn.
5. **Close with the decision list** (below) once no open question is left, and wait
   for the person to confirm it before acting on any of it.

## Shape of one question

```
<Context: two to four sentences on what exists today and why this question comes up.>

**Q<n>. <The question, in the person's words, one sentence, worded so "yes" takes the pick.>**

My pick: <option>, because <one sentence>.

| | Today: <status quo> | <Option B> | <Option C> |
|---|---|---|---|
| <criterion that decides it> | ... | ... | ... |

🟢 good · 🟡 challenge · 🔴 blocking · ? unknown
```

- **Context comes first.** A question the person cannot answer without reading the
  code is not ready to ask.
- **"Yes" takes the pick.** Word the question so a plain "yes" accepts your pick:
  "Q3. Keep every status change as a row in a new `order_events` table?", not "Q3.
  Should we overwrite `orders.status`?" with a pick that argues for "no". With more
  than two options, name the pick in the question: "... in `order_events`, rather
  than the other options below?"
- **Always a pick and always a small table**, even with two options: status quo
  first, two to four rows, words in every cell (`tradeoff-table.md`). In Hammock mode
  the table is the point, not an extra.
- **Plain words.** Define every term of jargon in the sentence that uses it, every
  time, even if an earlier question defined it.

## When the answer "depends"

If the person says the answer varies, or you can see it would, the question bundles
several cases. Split it before asking again:

1. List the cases the answer depends on, one line each, with what happens in each
   today.
2. Mark the ones already decided, and by whom.
3. Ask again about the open case only.

Asking "what should happen when X fails?" before listing why X can fail makes the
person do the diagnosis (Design in Practice: Diagnose before Delimit).

## When talk can't settle it

Some questions are not answered by more questions: how a screen or a workflow
should feel, or a number nobody has measured yet (latency, load, cost, how often a
case happens). Asking again only produces guesses, and the scope grows with the
uncertainty.

1. Say that this one needs evidence, not an opinion.
2. Propose the smallest experiment that would answer it: a throwaway prototype, a
   query against real data, a quick load test. Write down first what result would
   decide it ("if p99 stays under 200 ms with 50 writers, the queue is not needed"),
   as in Design in Practice's Diagnose phase.
3. Keep the question open and carry on with questions that don't depend on it. When
   the result is in, the answer is usually one line.

## When the person asks for more

These are the usual follow-ups. Answer them before they are asked when you can.

- **"I need an example."** Give one worked example per option: a numbered walk
  through one concrete case, with real names from the system (a real program, a
  real host, a real config key), from the first event to what ends up recorded or
  stored. Abstract rows in a table are not an example.
- **"Why?" about a cell.** A cell that states a limit ("no content", "cannot be
  undone", "slower") needs the mechanism behind it. Explain how it works today,
  how it would work under the option, and where the limit comes from, in a few
  sentences. Then fix the cell so the next reader does not have to ask.
- **"Let's wait, I need more context."** Not yet is an answer. Keep the question
  open, do not repeat the pick, and do not move on to a question that depends on
  it. Ask what context is missing, or offer the example or mechanism that is most
  likely missing.

## Rounds, on request

One question per turn is the default. If the person asks for the questions in
batches ("ask them all", "give me a round", "batch them"):

- Ask every open question whose answer does not depend on another open question,
  numbered and each in the usual shape (context, question, pick, table), separated
  by a rule.
- A question that depends on an answer in this round waits for the next round.
- After each round, say in one line per question what is now decided, then work out
  the next round from scratch: answers open up questions the first round could not
  ask.
- Go back to one question per turn when the person asks.

## The decision list

The dialog is done when no open question is left, or when the person says to
stop. Close with every decision made, one line each, including the ones that will
never be ADRs; most decisions do not earn one, and without this list they exist only
in the chat.

```
Decided:
- Q1. Status changes are kept as rows in `order_events`. (ADR: yes)
- Q2. `GET /orders` keeps `status` as a computed field. (ADR: no, easy to change)
Still open:
- Q4. Retention period for `order_events`: needs a storage cost estimate.
Glossary: added *Order*, *Fulfilment*; *purchase* is now under Avoid.
```

- Write each line as a fact a newcomer could act on, with the precise detail the
  person gave (numbers, orderings, "never" rules). Don't soften them.
- Mark which ones pass the ADR test (`adr.md`, "When to write one").
- Ask the person to confirm the list matches what they meant. Do not write ADRs, a
  plan or code until they confirm. Then offer the ADRs for the ones marked yes; the
  tradeoff tables from their questions become the ADRs' tables.

## No docs

If the person says "no docs" (for example `/hammock no docs: should we split
billing events?`), write no files: no `GLOSSARY.md` entries and no ADRs. Run the
same dialog, and put what would have been written into the decision list instead:

```
Glossary (not written): *Billing event*: a fact about money owed or paid, ...
ADR candidates (not written): Q2. Split billing events into their own stream.
```

The person can ask for the files later from that list.

## What Hammock mode does not do

- Does not hand over all options and all decisions in one message, even when it
  could.
- Does not ask what the repository can answer, and does not answer the person's
  decisions for them.
- Does not keep asking a question only evidence can settle.
- Does not treat the pick as the decision. The person decides; a short "yes" is
  confirmed against the question it answers before acting on it.
