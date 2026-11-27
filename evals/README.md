# Evals

A small eval set for decomplect, so a change to the skill can be measured
instead of guessed. Each case is a pitfall the skill is meant to prevent: a
review that invents findings, Advise answering a question that isn't about
design, Hammock asking several questions at once, a fix that works by
coincidence, an ADR check that edits an accepted ADR, an RFC that guesses
numbers.

Every case runs twice: once **with the skill** and once as a **baseline**,
the same task in the same folder without `.claude/`. The difference between
the two is what the skill adds. Tokens are counted for both, because a skill
that helps but triples the cost is a tradeoff worth seeing.

## Files

- `evals.json`: the cases.
- `fixtures/orders-service/`: a small TypeScript repo with one accepted ADR
  and three planted problems (a hidden clock in the pricing rule, a status
  overwritten in place, SQL in a handler against ADR 0001). Used by the
  Survey, ADR check, ADR, RFC and Hammock cases.
- `run.py`: runs the cases with `claude -p`, grades them, writes
  `results/<timestamp>/results.jsonl` and `summary.md`. Standard library only.

## A case

```json
{
  "id": "<area>-<nnn>-<what it tests>",
  "expected_mode": "Review",
  "fixture": "orders-service",
  "prompt": "Review this bug fix ...",
  "baseline_prompt": "...",
  "expected_output": "What a good answer does, in words.",
  "assertions": ["One thing a grader can mark pass or fail", "..."],
  "checks": {"no_new_files": true, "new_files": ["docs/adr/0002-*.md"], "unchanged": ["src/orders.ts"]}
}
```

- `fixture` (optional) is copied into a fresh git repo; without one the
  folder is empty.
- `baseline_prompt` (optional) replaces a slash command such as `/untangle repo`,
  which doesn't exist without the skill, with the same request in words.
- `assertions` are graded by a second headless session that sees the prompt,
  the expected output, the answer and any files written. Write each one so it
  can only be read one way.
- `checks` are run by plain code on the folder before and after: no new files,
  a new file matching a pattern, a file left unchanged.

## Run it

```bash
python3 evals/run.py --dry-run                     # list what would run
python3 evals/run.py                               # all cases, both conditions
python3 evals/run.py --cases advise-001-pick-one,survey-001-orders-service
python3 evals/run.py --conditions skill --runs 3   # repeat to see the spread
python3 evals/run.py --model <model> --judge-model <model>
```

A full run is 34 sessions plus 34 grading sessions. The Survey and RFC cases
read the fixture repo and cost the most.

`summary.md` reports, for each condition, the share of assertions and file
checks passed, the cases that passed completely, whether the skill picked the
expected mode, and total tokens, then one row per case and a list of what
failed with the skill.

The baseline runs with `--setting-sources project,local`, but a copy of the
skill installed in `~/.claude/skills/` can still load. The runner warns when
it finds one.

## When you change the skill

1. Run the cases the change touches, with the skill, before and after the
   change. One run per case is noisy; use `--runs 3` before trusting a
   difference of one assertion.
2. Run the whole set before a release, both conditions.
3. When a review goes wrong in real use, add the case here first, then fix
   the skill.

Single runs are noisy and the grader is a model, so read the failed
assertions in `summary.md` rather than only the percentages.

The case format (prompt, expected output, assertions, expected skill) and the
with/without comparison follow NVIDIA auto-ontology's
`skills/*/evals/evals.json` and benchmark reports (Apache-2.0). No text is
copied.
