---
description: Check the claims behind a design, PR, ADR or incident report: measured, inferred or assumed, and the right size
argument-hint: "[ask] [PR number | path to doc | claim]"
allowed-tools: Bash(git diff:*), Bash(git log:*), Bash(git merge-base:*), Bash(gh pr view:*), Bash(gh pr diff:*), Read, Grep, Glob
---

Use the `decomplect` skill in **Evidence** mode (`references/evidence.md`).

Target: `$ARGUMENTS`

- If it starts with "ask" (any case), drop that word and run the mode as a dialog,
  one question per turn, as "As a dialog" in `references/evidence.md` describes.
- If it is a number, check the claims in that pull request: `gh pr view $ARGUMENTS`
  for the description and `gh pr diff $ARGUMENTS` for the change.
- If it is a path, check the claims in that design doc, ADR or incident report.
- If it is text, treat it as the claim to check.
- If empty, check the claims in the current branch's commits and changed docs against
  `origin/main`, falling back to `origin/master`.

Look up in the code, docs and data anything that can confirm or refute a claim before
labelling it assumed. Produce the result in the mode's output format, starting with
the verdict and its confidence.
