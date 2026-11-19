---
description: Untangle the current branch, a PR, or a design doc: an architecture review with the decomplect principles
argument-hint: "[base-branch | PR number | path to design doc]"
allowed-tools: Bash(git diff:*), Bash(git log:*), Bash(git merge-base:*), Bash(gh pr view:*), Bash(gh pr diff:*), Read, Grep, Glob
---

Use the `decomplect` skill in **Review** mode.

Target: `$ARGUMENTS`
- If it is a number, review that pull request: `gh pr view $ARGUMENTS` for the problem
  statement and `gh pr diff $ARGUMENTS` for the change.
- If it is a path to a document, review that design doc or ADR. If the doc leaves
  decisions open, list them under Questions and suggest `/hammock` to settle them.
- If it is a branch name, review `git diff $(git merge-base HEAD $ARGUMENTS)...HEAD`.
- If empty, review `git diff $(git merge-base HEAD origin/main)...HEAD`, falling back
  to `origin/master`.

Read surrounding code and consumers of any changed public interface before judging
compatibility. Produce the review in the skill's output format, with an "In plain words"
line on every finding.
