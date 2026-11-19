---
description: Shape a problem and reach a decision with decomplect, one question at a time
argument-hint: "[no docs] <problem, idea or design question>"
allowed-tools: Read, Grep, Glob, Edit, Write, Bash(git log:*), Bash(git diff:*), Bash(git ls-files:*)
---

Use the `decomplect` skill in **Hammock** mode.

Topic: `$ARGUMENTS`

- If the topic starts with "no docs" (any case, followed by any punctuation), drop
  those words from the topic and write no files during the session: no
  `GLOSSARY.md` entries and no ADRs. Put them in the decision list instead.
- If the topic is empty, ask what problem or decision to work on, in one question.
- Otherwise start with the problem: read the code and docs the topic touches, then
  ask the first question, one per turn, as `references/hammock.md` describes.

Work out the problem statement before any solution. End with the decision list and
wait for the person to confirm it before writing ADRs, a plan or code.
