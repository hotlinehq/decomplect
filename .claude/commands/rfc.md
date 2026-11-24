---
description: Write an RFC (Request For Change) for a feature or change, in decomplect's RFC template
argument-hint: "[draft] <change to propose | path to notes or requirements file>"
allowed-tools: Read, Grep, Glob, Edit, Write, Bash(git log:*), Bash(git diff:*), Bash(git ls-files:*), Bash(gh pr view:*), Bash(gh issue view:*)
---

Use the `decomplect` skill in **RFC** mode (`references/rfc.md`).

Topic: `$ARGUMENTS`

- If it starts with "draft" (any case, followed by any punctuation), drop that word
  and write the RFC without asking questions: put `?` where only the person could
  answer, and list those under "Feedback wanted" in the Conclusion.
- If it is a path to an existing requirements file, spec or notes, convert it into
  an RFC: keep every fact, move each into its section, and mark gaps with `?`.
- If it is empty, ask what change to propose, in one question.
- Otherwise read the code, docs and tickets the change touches, then ask only what
  the person alone can decide (the problem, the goals and their targets, what is out
  of scope), one question per turn, as `references/rfc.md` describes.

Write it to the repo's RFC folder, or `docs/rfc/NNNN-slug.md`, with every section of
the template in order and Status: Draft. End with the path, the open `?`s, and an
offer of ADRs for the decisions in it that pass the ADR test.
