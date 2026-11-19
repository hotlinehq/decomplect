# Glossary (the project's words)

A glossary is one file that holds the project's own words for its own things, each
with a tight definition and the words to avoid. Design in Practice asks for exactly
this: keep the terms in one place, use them uniformly, and when a term breaks, fix it
or drop it. Fuzzy words hide fuzzy thinking; a question asked in a word that means
two things gets an answer about one of them.

The glossary is written **during** Hammock and Design modes, the moment a term is
settled, not in a batch at the end. Review reads it and never writes it.

## Where it goes

1. Look for an existing glossary first: `GLOSSARY.md`, `docs/glossary.md`,
   `docs/GLOSSARY.md`, a "Glossary" or "Ubiquitous language" section in the README or
   design docs. If one exists, add to it in its own format.
2. If the repo has several areas with their own words (a `GLOSSARY.md` per service or
   module, or a map file listing them), write to the one the current topic belongs
   to. If it is unclear which, ask.
3. Otherwise create `GLOSSARY.md` at the repository root, and only when the first
   term is settled. No term settled, no file.

## Format

```markdown
# Glossary

<One or two sentences: what this system or area is.>

**Order**:
A customer's request for one or more products, from checkout until it is delivered or cancelled.
_Avoid_: purchase, transaction

**Invoice**:
A request for payment sent to a customer after delivery.
_Avoid_: bill, payment request
```

- **One canonical word per thing.** When the code, the docs and the person use
  several words for the same thing, pick one and list the others under `_Avoid_`.
- **Say what it is, not what it does,** in one or two sentences.
- **Only this project's words.** General programming terms (timeout, retry, cache)
  do not belong, even when the code uses them everywhere.
- **No decisions and no implementation.** Not a spec, not notes, not a place for
  "we store it in Postgres". Decisions go to ADRs (`adr.md`) or the decision list
  (`hammock.md`).
- Group terms under subheadings only when clusters appear on their own.

## During Hammock and Design modes

- **Challenge against the glossary.** When the person uses a term the glossary
  defines differently, say so at once: "GLOSSARY.md defines *cancellation* as the
  whole order being withdrawn, but you seem to mean one line item. Which is it?"
- **Sharpen fuzzy words.** When a word could mean two things ("account": the
  customer or the login?), name both and propose one canonical term. This is a
  question for the person, asked in the usual shape.
- **Check the code's words too.** When the code uses one name for two concepts, or
  two names for one, raise it: the glossary is where that gets settled.
- **Write it when it is settled.** Add or fix the entry right away and say so in one
  line ("Added *Order* to GLOSSARY.md, avoiding *purchase*."). Do not ask
  permission per term; the person can edit the file.
- **When a term breaks,** edit its entry: the glossary is the current vocabulary,
  not a log. Keep the old word under `_Avoid_` so the next reader knows it is gone.
  If the change in meaning came from a decision, that decision is what gets recorded.

## In Review

If the repo has a glossary, check the change's names against it (checklist G):

- a word listed under `_Avoid_` used for the thing it was replaced by;
- a defined term used for a different concept;
- a new concept named in the code with no entry, where the team keeps a glossary
  (note severity: offer the entry, do not write it).
