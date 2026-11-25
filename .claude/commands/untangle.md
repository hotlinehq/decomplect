---
description: Untangle the current branch, a PR, or a design doc: an architecture review with the decomplect principles
argument-hint: "[base-branch | PR number | path to design doc | repo | path to folder]"
allowed-tools: Bash(git diff:*), Bash(git log:*), Bash(git merge-base:*), Bash(git grep:*), Bash(git ls-files:*), Bash(gh pr view:*), Bash(gh pr diff:*), Read, Grep, Glob
---

Use the `decomplect` skill in **Review** mode, or **Survey** mode for a whole repo or
folder.

Target: `$ARGUMENTS`
- If it is `repo` or `.`, survey the whole repository in **Survey** mode
  (`references/survey.md`). If it is a path to a folder, survey that folder.
- If it is a number, review that pull request: `gh pr view $ARGUMENTS` for the problem
  statement and `gh pr diff $ARGUMENTS` for the change.
- If it is a path to a document, review that design doc or ADR. If the doc leaves
  decisions open, list them under Questions and suggest `/hammock` to settle them.
- If it is a branch name, review `git diff $(git merge-base HEAD $ARGUMENTS)...HEAD`.
- If empty, review `git diff $(git merge-base HEAD origin/main)...HEAD`, falling back
  to `origin/master`.

Read the code the change touches, not only the diff: grep the callers and readers of
every changed function, field, type or table, internal ones too, before judging
compatibility. Say which load you assumed. Check every finding against the code before
reporting it (Review step 4: no concrete case, no finding). Produce the review in the
skill's output format: findings numbered across severities, an "In plain words" line on
every finding, and the Verdict and Not checked lines at the end.
