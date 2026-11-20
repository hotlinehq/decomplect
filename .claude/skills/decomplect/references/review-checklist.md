# Review checklist

Walk these in order. Each line is a question; raise a finding only when you can point
to evidence. Principle numbers refer to `principles.md`.

## A. Problem fit (6.1–6.4)
- [ ] Is there a written problem statement (unmet objective + cause), not just a feature name?
- [ ] Does the change address that problem, or a symptom of it?
- [ ] Were alternatives considered? Is the status quo one of them?
- [ ] Are known tradeoffs and open questions stated?
- [ ] For design docs and ADRs: does the tradeoff table have a status quo column, rows
      that actually differ, must rows marked (must), and no all-green or scored
      column? Does an ADR have a Confirmation line? (Smells in `tradeoff-table.md`.)
- [ ] For bug fixes: is the cause diagnosed, or is this whack-a-mole on a symptom?
- [ ] If the repo keeps ADRs: does the change contradict an accepted one, fail its
      Confirmation line, trip a "Revisit if" trigger, or edit an accepted ADR's body instead of superseding it?
      (See "Reviewing against ADRs" in `adr.md`.)

## B. Complecting (1.2–1.8)
- [ ] Does any unit mix *what* with *how* (business rule with iteration, I/O, or framework calls)?
- [ ] Is policy (*why*) buried in conditionals across multiple places?
- [ ] Is *when/where* (scheduling, threading, location) hardwired into logic that could be handed a queue?
- [ ] Does any type bundle information with behavior and identity when plain data would do?
- [ ] Is inheritance used for reuse where an interface or composition would decouple?
- [ ] Are there switch/match statements on type repeated in several places?
- [ ] Do positional parameters, tuples, or column order carry meaning that names should carry?
- [ ] Are modules "separated" in folders but mutually dependent on internals?

## C. Information and data (2.x)
- [ ] Is information represented as plain, inspectable data at boundaries?
- [ ] Are there getter-only wrapper classes or mapping layers that only copy fields?
- [ ] Are attribute names precise, consistent across modules and services, and namespaced where shared?
- [ ] Is optionality modeled per operation, or are shapes full of nullable/Maybe fields?
- [ ] Do consumers tolerate and pass through unknown fields?
- [ ] Does any write overwrite facts the business may need later (status, price, address)?
- [ ] Is time recorded (when it happened, when we learned it)?

## D. State and time (3.x)
- [ ] How many places hold mutable state? Can any become values?
- [ ] Is each state transition atomic and expressed as old value → pure function → new value?
- [ ] Can readers see a consistent snapshot without locking writers?
- [ ] Is effectful code at the edges, with the core pure and testable with plain data?
- [ ] Are hidden inputs (clock, env, global clients, singletons) pulled into arguments?
- [ ] Are reads made against an explicit basis (version, timestamp, snapshot)?

## E. Boundaries and systems (4.x)
- [ ] Could this subsystem move out of process or to another language without much change?
- [ ] Do boundaries pass data, or live objects, connections, callbacks, ORM entities?
- [ ] Are there synchronous call chains across services that a queue would decouple?
- [ ] Is a graph of services triggering effects on each other forming (distributed objects)?
- [ ] Are formats and protocols standard, not bespoke?
- [ ] Is failure handled as the system's model: timeouts, retries, idempotency, partial failure?
- [ ] Is a transformation duplicated per conveyance (batch, stream, API) instead of shared?

## F. Compatibility (5.x)
For every change to something with consumers outside this change (public function,
endpoint, event, message, table, config, CLI flag):
- [ ] Classify: accretion / relaxation / fixation / **breakage**.
- [ ] Breakage: can it become accretion (new name alongside old)?
- [ ] Is a version bump being used to justify removal or meaning change?
- [ ] Is a required input added, an output removed, or a name reused for new semantics?
- [ ] Are schemas closed where they should be open?

## G. Words (6.7)
- [ ] Do names say what things are? Any codenames or puns hiding meaning?
- [ ] Is the same concept named differently, or one name used for two concepts?
- [ ] Would a glossary entry help reviewers and newcomers?
- [ ] If the repo keeps a glossary: does the change use a word it lists under
      `_Avoid_`, or a defined term for a different concept? (See `glossary.md`.)

## H. Size and generality (4.6)
- [ ] Is new code specific where a generic function over data exists already?
- [ ] Is a new abstraction justified by more than one use?
- [ ] Could the change be smaller and more general?

## I. Evidence (`evidence-principles.md`)
- [ ] Does the design claim scale, speed or cost without an estimate? (E18)
- [ ] Does a latency claim name the percentile and the fan-out? (E23)
- [ ] Does each mitigation (retry, cache, replica, hedge) state its cost? (E26)
- [ ] Are the reference numbers behind an estimate dated and sourced? (minor, E20)
- [ ] Is a root cause stated with no rival explanation considered, or with more
      certainty than the evidence supports? (E10)
- [ ] Is a number that decides the design estimated only one way? (minor, E19)
- [ ] Is a fix reported as working without a before/after measurement on the same
      metric? (E26)

For a full check of the claims, use Evidence mode (`evidence.md`).

## Calibration
- Proportionality: small changes get a short review.
- Don't flag essential complexity of the domain.
- Prefer one high-leverage finding over ten nitpicks.
- Always offer a concrete next step in the language and frameworks the repo already uses.
