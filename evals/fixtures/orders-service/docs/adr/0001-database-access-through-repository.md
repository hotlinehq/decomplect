# 0001. Database access goes through the repository module

- Status: Accepted
- Date: 2026-03-02
- Deciders: shop team
- Supersedes: none

## Problem
Handlers wrote SQL inline, so a column rename meant finding queries in every
handler, and two of them were missed in the last schema change.

## Options and tradeoffs
Where SQL lives, so a schema change touches one file.

| Criterion | Status quo: SQL in handlers | Repository module | ORM |
|---|---|---|---|
| One place to change on a schema change | 🔴 every handler | 🟢 `repository.ts` | 🟢 models |
| New dependency | none | none | 🟡 a large one |

## Decision
All SQL lives in `src/repository.ts`; handlers call its functions.

Confirmation: no `db.query(` outside `src/repository.ts`.

## Consequences
- Easier: a schema change touches one file.
- Harder: a new query needs a repository function first.
- Revisit if: the service gets a second database.
