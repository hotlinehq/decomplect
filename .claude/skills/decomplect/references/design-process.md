# Design process (shaping mode)

Based on *Design in Practice* (2023) and *Hammock Driven Development* (2010).
Design is not waterfall, and not a do-over loop. It is a hike up the understanding
mountain: trending up, sometimes backtracking, and saying so explicitly.

At every phase ask the four reflective questions:
- **Where are you at?** **Where are you going?** (status, agenda)
- **What do you know?** **What do you need to know?** (understanding)

## Phases

### 1. Describe (the situation)
Output: a one-paragraph **Description** of context, symptoms, reports, requests.
Do not state the problem yet. Record assertions as "X says Y", not as facts.

### 2. Diagnose (possible problems)
- Bugs: symptom → several hypotheses → use logic to rule out → pick the one that is
  most likely or shrinks the space most → experiment. Write the result template before
  running the experiment ("if this table were filled in, we'd know X").
- Features: a feature is one possible answer, not the problem. Ask what the user's
  objective is, and what is in the way.

### 3. Delimit (the problem you will solve)
Output: the **Problem Statement**, a succinct statement of unmet user objectives and
their causes. Not symptoms, not desires, not the remedy. Retitle the ticket from symptom
to problem. Keep it current as understanding grows. This is the most important artifact.

### 4. Direction (strategy)
Outputs:
- **Use cases table:** user intentions in terms of *what* they could accomplish were
  the problem solved. Leave a blank *How* column to fill in later.

  | Use case (what) | How (given the design) | Notes |
  |---|---|---|

- **Strategy decision matrix** (below) comparing high-level approaches: in-process vs
  service, library vs app, buy vs build, modify vs add, automatic vs manual.

### 5. Design (tactics)
Outputs: implementation decision matrix, diagrams (diagram the problem, not only the
solution), filled-in *How* column, Approach section of the ticket. Expect scope
adjustments and backtracking.

### 6. Dev
You know why, you know how, and you are confident it works. Solutions should come
out smaller and more general for having been designed.

**Decide** (to do, or not) can happen at any phase.

## Decision matrix

A spreadsheet beats prose because prose linearizes and hides contrast. The decision
matrix is the tradeoff table defined in `tradeoff-table.md`: status quo as the first
column, criteria as rows, aspects in the cells, a 🟢 🟡 🔴 `?` legend, no scores.

Design-specific notes:

- **A1:** the decision being made, for which problem.
- **Columns:** include what others have done, plus your ideas. The best answer is
  often a column you didn't start with.
- **Rows:** fitness for the use cases from the use-case table comes first, then the
  menu rows that differ (strategy: in-process vs service, buy vs build, modify vs
  add; tactics: data shape, state holders, contracts).
- In a spreadsheet, put judgment in an unsaturated background color (neutral,
  yellow, red, green) instead of the marks.

## Ticket shape

```
Title: <problem, not symptom or feature>
Description: <situation paragraph>
Problem: <unmet objective + cause>
Approach: <chosen direction and design, with link to decision matrices>
```

## Socratic stance
Examine ideas dispassionately. You are not your idea. We don't define the truth, we
discover it. Ask questions that provoke; logic only rules things out.

## Words
Keep a glossary of terms in one place. Use them uniformly. When a term breaks, fix or
abandon it. Avoid codenames.
