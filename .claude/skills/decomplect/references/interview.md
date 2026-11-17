# Interview (one question at a time)

Use when the person wants a dialog instead of a full answer: "grill me", "interview
me", "ask me questions", "help me decide", or when Design or ADR mode reaches a
decision the person has not made yet. The output of Advise, Design and ADR is a
finished artifact; the output of Interview is the person's own answers, one at a
time, which those modes then record.

The idea comes from Hammock Driven Development and Design in Practice: the person
who owns the problem has to load it into their own head. A wall of options skips
that. One good question at a time does not.

## The loop

1. **Map the decisions first, silently.** List the open decisions and which ones
   depend on which. Ask the root one first: the one whose answer changes what the
   other questions are. Do not show the whole tree.
2. **Look before you ask.** If the code, docs, earlier decisions or ADRs can answer
   it, read them and state the answer as a fact with where you found it. Ask the
   person only what only they can decide (goals, priorities, risk they accept).
3. **Ask one question per turn.** Never two. Number them (Q1, Q2, ...) so answers
   can point back.
4. **Wait.** Do not write the ADR, the plan or the next question until the person
   answers. When they answer, say in one line what is now decided, then ask the next
   question.
5. **At the end,** offer to record the answers as ADRs (`adr.md`). The tradeoff
   tables from the questions become the ADRs' tables.

## Shape of one question

```
<Context: two to four sentences on what exists today and why this question comes up.>

**Q<n>. <The question, in the person's words, one sentence.>**

My pick: <option>, because <one sentence>.

| | Today: <status quo> | <Option B> | <Option C> |
|---|---|---|---|
| <criterion that decides it> | ... | ... | ... |

🟢 good · 🟡 challenge · 🔴 blocking · ? unknown
```

- **Context comes first.** A question the person cannot answer without reading the
  code is not ready to ask.
- **Always a pick and always a small table**, even with two options: status quo
  first, two to four rows, words in every cell (`tradeoff-table.md`). In Interview
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

## What Interview does not do

- Does not hand over all options and all decisions in one message, even when it
  could.
- Does not ask what the repository can answer.
- Does not treat the pick as the decision. The person decides; a short "yes" is
  confirmed against the question it answers before acting on it.
