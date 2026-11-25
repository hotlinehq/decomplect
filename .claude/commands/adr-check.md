---
description: Check that the code still follows its accepted ADRs, and which decisions are due for a revisit
argument-hint: "[ADR number(s) | path to ADR folder]"
allowed-tools: Bash(git grep:*), Bash(git log:*), Bash(git ls-files:*), Read, Grep, Glob
---

Use the `decomplect` skill in **ADR check** mode ("Checking the ADR log" in
`references/adr.md`).

Target: `$ARGUMENTS`
- If it is one or more numbers, check those ADRs.
- If it is a path, use that folder as the ADR log.
- If empty, find the repo's ADR folder ("Where it goes" in `references/adr.md`) and
  check every current decision.

For each current ADR, search the code for its Confirmation signal (followed, drifted
or no signal) and look for evidence that its "Revisit if" trigger has fired. Tag ADRs
with neither as `no-tripwire` and propose the missing lines. Produce the numbered
ledger in the mode's output format, ending with the counts, the Verdict and the Not
checked lines. Edit no files; offer superseding ADR drafts in one line.
