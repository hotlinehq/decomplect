# Principles

Each principle has: the idea, how to spot its violation in any language, and the
talk it comes from. Talk names map to links in `sources.md`.

---

## 1. Simplicity and complecting

### 1.1 Simple vs easy
- **Idea:** *Simple* (sim-plex, one fold) is about lack of interleaving, and is
  objective. *Easy* (adjacent, near) is about familiarity and being at hand, and is
  relative to the person. They are different axes. Choosing easy constructs gives
  early speed; ignoring complexity slows you down over the long haul.
- **Spot it:** justification like "it's what we always use", "one line with this
  framework", "everyone knows ORMs" for a construct that braids concerns.
- **Source:** Simple Made Easy; Simplicity Matters.

### 1.2 Complect = interleave
- **Idea:** Complecting is braiding independent things together, and it is the
  source of complexity. Once braided, they must be considered together. People can
  only juggle a few things at a time.
- **Spot it:** to understand or change X you must also understand Y even though the
  problem doesn't connect them.
- **Source:** Simple Made Easy.

### 1.3 Constructs and what they complect (language-agnostic table)

| Construct | Complects | Simpler alternative |
|---|---|---|
| Mutable state / fields | everything that touches it, value with time | immutable values; one explicit, atomic state holder |
| Objects bundling data + behavior + identity | state, identity, value | plain data + functions; identity only where needed |
| Methods on information classes | function with state, logic with representation | free functions/modules over plain data |
| Inheritance | types with types | interfaces/traits/type classes, composition |
| switch/match on type spread across code | many who/what pairs | open polymorphism (interface dispatch, registry) |
| Variables reassigned over time | value, time | immutable bindings; explicit state transition |
| Imperative loops | what with how | declarative ops (map/filter/reduce, SQL, set ops) |
| Actors / direct service-to-service calls | what with who | queues, pub/sub |
| ORM | object model with relational model, time, place | declarative queries returning data |
| Conditionals encoding business rules | why with control flow | rules as data, declarative rule systems |
| Positional args / tuples / column order | meaning with order | named fields, maps/dicts, keyword args |
| Syntax / bespoke DSL | meaning with order | data |
| Inconsistency | everything | transactions, values |

- **Source:** Simple Made Easy (complexity/simplicity toolkits); Simplicity Matters
  (order).

### 1.4 Incidental vs essential complexity
- **Idea:** Essential complexity belongs to the problem. Incidental complexity is
  what our solutions, tools and languages add on top. The worst kind comes from making
  things *look* simple: one syntax for mutable and immutable references, or for heap
  and stack.
- **Source:** Are We There Yet?; Simple Made Easy.

### 1.5 Modularity is not simplicity
- **Idea:** A simple design makes splitting into modules and layers easy, but the
  split alone doesn't make it simple. Folders and packages can hide a tangle: two
  modules that each know the other's internals are still one tangle.
- **Spot it:** a "clean" folder structure where every module imports every other;
  encapsulation around state that still leaks through shared mutation.
- **Source:** Simple Made Easy.

### 1.6 Simplicity often means more things
- **Idea:** Simplify by pulling apart; the result has more, smaller pieces that
  compose. Design is taking things apart so they can be put back together.
- **Source:** Simple Made Easy; Design, Composition and Performance; Simplicity Matters.

### 1.7 Guard rails are not steering
- **Idea:** Every bug in production passed the type checker and the tests. Tests,
  types, and refactoring tools don't care whether the program is simple. Your ability
  to *reason* about the program is what lets you change and debug it.
- **Source:** Simple Made Easy; Clojure Made Simple.

### 1.8 Abstraction is drawing away, not hiding
- **Idea:** To abstract is to draw a concern away from the others, not to hide
  complexity behind a facade. Pull these questions apart:
  - **What:** a small set of operations, defined by their inputs, outputs and meaning
    in terms of values; it says nothing about how.
  - **Who:** the components that implement it, assembled from parts passed in;
    favour many small parts (policy among them).
  - **How:** the implementation, chosen through polymorphism; favour declarative
    interfaces that leave the how open.
  - **When/where:** keep these out of everything else; put a queue between them.
  - **Why:** policy and rules, which tend to scatter through conditionals. Gather
    them into explicit rules.
- **Source:** Simple Made Easy.

---

## 2. Information, data, and values

### 2.1 Information is simple; don't ruin it
- **Idea:** Don't hide information behind a micro-language (a class with
  information-specific getters). It thwarts generic composition and ties logic to
  whatever representation is current. Keep data as plain data. Encapsulation is for
  implementation details, and information has no implementation unless you added it.
- **Spot it:** `CustomerInfo` with 30 getters and no behavior; DTO-to-domain-to-DTO
  mapping layers that only copy fields; a request object with dozens of bespoke
  accessors where a dictionary would do (the HttpServletRequest example).
- **Language translation:** records/structs/dataclasses/JSON objects with public,
  named fields, processed by generic functions. Typed languages: plain data types
  with no hidden state, generic serialization, and library functions that work on
  any record.
- **Source:** Simple Made Easy; Simplicity Matters; Clojure Made Simple.

### 2.2 Death by specificity
- **Idea:** Most information objects are glorified name-to-value maps. Making each
  one its own type with its own interface yields more code, less reuse, more
  coupling, harder test fabrication.
- **Source:** Clojure Made Simple.

### 2.3 Information is sparse, open, accretive; names carry semantics
- **Idea:** Real information is sparse (you don't know everything), open (more can
  arrive), and accumulates. Semantics should attach to *attributes* (well-named,
  namespaced keys) not to the aggregate that happens to hold them. Classes and
  product types fix a set of slots, complect meaning with position, and claim
  ownership of attributes ("does an email belong to the Person class?").
- **Spot it:** the same concept (email, customer id) defined differently in five
  types; schema changes requiring every consumer to update; fields named `data`,
  `info`, `value`.
- **Language translation:** shared, namespaced attribute definitions
  (`billing.invoice/id`), reusable field-level schemas (JSON Schema `$defs`,
  protobuf messages composed of shared field types), consistent names across
  services.
- **Source:** Effective Programs; Maybe Not.

### 2.4 Optionality belongs to context, not to the schema
- **Idea:** "Maybe" fields bake context into the shape. Separate the *schema* (what
  attributes can travel together and what each means) from the *selection* (what a
  given operation requires or provides). An absent value is simply not in the map;
  don't store a null for it.
- **Spot it:** one `User` type with most fields nullable because different calls
  fill different parts; `Optional<>` on fields that are required in some flows and
  not others; making an argument optional breaks existing callers' types, or
  strengthening a return breaks them too.
- **Language translation:** define one shape; express per-operation requirements
  at the function or endpoint boundary (validation per use case, narrow input types,
  `Pick<>`/projections). Accept and pass through unknown fields.
- **Source:** Maybe Not.

### 2.5 Values over places (PLOP)
- **Idea:** Overwriting in place (new information replaces old, in memory or
  storage) is a habit from when RAM and disks were tiny. Immutable values give: free
  sharing, reproducible results, easy fabrication for tests, language independence,
  generic handling, aggregation to larger values, and they are the best interfaces
  between subsystems. An information model is about facts, not storage locations.
- **Spot it:** `UPDATE` destroying history the business later wants; caches and
  defensive copies to make shared objects safe; tests needing elaborate setup to
  reproduce state.
- **Source:** The Value of Values; Effective Programs.

### 2.6 Facts incorporate time; accrete, don't overwrite
- **Idea:** A fact records something that happened, and the past doesn't change, so
  a fact is never updated. Information systems are about facts and should support
  decisions, which needs comparison over time. Records should be enduring and
  accreting, like source control and logs.
- **Spot it:** no created/valid-from timestamps; status columns overwritten with no
  event history; "we'll mine the logs" as the history strategy.
- **Language translation:** append-only event or fact tables, temporal tables,
  as-of queries, immutable object storage keys, audit tables as first-class data.
- **Source:** The Value of Values; Deconstructing the Database; The Functional Database.

### 2.7 Data as the interface between subsystems
- **Idea:** A subsystem needs a clear boundary, a small set of verbs as its
  interface, uniform error handling, and it accepts and returns *data*, not
  objects. Litmus test: could you move this subsystem out of process, to another
  language, or another thread without changing much?
- **Spot it:** passing ORM entities, live connections, or callbacks across module or
  service boundaries; an API that takes an interface type wrapping plain info.
- **Source:** Simplicity Matters; Clojure Made Simple; The Language of the System.

---

## 3. State, identity, and time

### 3.1 Value, identity, state, time are distinct
- **Value:** immutable magnitude or composite.
- **Identity:** a stable name for something whose value changes over time, each new
  value caused by the previous one.
- **State:** which value an identity has at a given point.
- **Time:** the order of those values: which came before which.
- Conventional objects conflate all four, so perception becomes fragile.
- **Source:** Are We There Yet?; Persistent Data Structures and Managed References.

### 3.2 State is never simple
- **Idea:** State complects value and time and interweaves everything that touches it;
  encapsulation doesn't fix that. When state is needed, make it explicit: a small
  number of identities, each moving from one immutable value to the next via a pure
  function applied atomically (compare-and-set, transaction, single-writer queue).
- **Spot it:** many mutable fields across objects updated in sequence without
  atomicity; readers seeing half-updated composites; locks sprinkled to restore
  a single timeline.
- **Source:** Simple Made Easy; Are We There Yet?

### 3.3 Perception needs no coordination; action does
- **Idea:** Observers should be able to read a consistent snapshot (a value) without
  locking writers. Only the process of producing the next value needs coordination.
  Separate reads (perception) from writes (process).
- **Spot it:** read transactions or locks just to get a consistent view; read paths
  routed through the write master unnecessarily.
- **Language translation:** snapshot isolation/MVCC reads, immutable snapshots
  passed to readers, CQRS where it's genuinely separating perception from process.
- **Source:** Are We There Yet?; Deconstructing the Database.

### 3.4 Pure functions where possible; push effects to the edges
- **Idea:** Pure functions take and return values, have no notion of time, same input
  same output, and are easy to understand, test, compose. Most interesting programs
  are processes, so isolate the effectful parts and keep the computation pure. A
  database value passed as an argument is better than an ambient connection.
- **Spot it:** business logic interleaved with I/O; hidden global clients; functions
  that read the clock or env deep inside.
- **Source:** Are We There Yet?; The Functional Database; Datomic Ions ("write and
  test functions of data to data").

### 3.5 Stable bases
- **Idea:** Same query, same basis, same results. Make the point-in-time basis of a
  read explicit and communicable (permalinks, versions, as-of).
- **Source:** Deconstructing the Database.

---

## 4. Systems

### 4.1 Program the inside like the outside
- **Idea:** Successful systems are independent parts connected by plain data over
  RPC and queues, tolerant in what they accept. Program the insides of systems the
  same way, passing immutable data between parts, because it buys the same loose
  coupling, independence and flexibility.
- **Source:** Clojure Made Simple; The Language of the System.

### 4.2 Queues decouple; call chains make poor machines
- **Idea:** Queues decouple producer and consumer in identity and availability, are
  first-class, enduring, monitorable. Direct-connect webs of callbacks, futures, and
  observers fragment logic. Avoid a graph of stateful services triggering effects on
  one another ("the revenge of objects").
- **Spot it:** service A synchronously calling B calling C to complete one user
  action; callback chains; "when X changes, call Y" listeners across modules.
- **Source:** The Language of the System; Clojure core.async Channels.

### 4.3 Systems transform, move, route, and remember values
- **Idea:** Keep those four jobs separate. Flow over places. Prefer simple,
  general system services (queues, coordination, storage, caches) that "do the
  least", and standard protocols and formats over bespoke ones. Design to be
  composed. The system's failure model (partial, independent, timeouts, retries,
  idempotency) is your failure model.
- **Source:** The Language of the System.

### 4.4 Separate the transformation from the conveyance
- **Idea:** A transformation (map, filter, enrich) should not know whether its inputs
  come from a list, stream, channel or queue. Re-implementing the same logic for each
  conveyance is needless specificity.
- **Language translation:** write per-item or reducer-style transformation
  functions, then plug them into batch jobs, stream processors and HTTP handlers.
- **Source:** Transducers; Inside Transducers.

### 4.5 Polymorphism à la carte
- **Idea:** Extend behavior to types without inheritance or owning the type (open
  interfaces, traits, type classes, extension points). Avoid the privileged native
  framework that everything must subclass.
- **Source:** Clojure Made Simple; Simple Made Easy.

### 4.6 Smaller is better
- **Idea:** Bigger programs mean more bugs, slower change, more brittleness.
  Concision is size in the small; generality is size in the large.
- **Source:** Clojure Made Simple.

---

## 5. Change and compatibility

### 5.1 Change is either growth or breakage
- **Growth:** accretion (provide more), relaxation (require less), fixation (fix bugs).
- **Breakage:** require more, provide less, or reuse a name for something different.
- Applies at every level: function, module, package, service, message, schema.
- **Source:** Spec-ulation.

### 5.2 Breaking changes are broken
- **Idea:** Don't break. Turn breakage into accretion: old and new co-exist under
  different names (`foo2`, new endpoint, new topic, new column). A version bump
  doesn't make breakage OK; a major version means "you might be screwed" with no
  indication where. Reluctance to remove things is good.
- **Spot it:** renamed or removed fields in a public API; a required field added to a
  request; a field's meaning changed under the same name; deleted endpoints "because
  we bumped to v2".
- **Source:** Spec-ulation; Problem Solving podcast.

### 5.3 Open specs; be tolerant of more
- **Idea:** Specs say what you *can* do, not what you can't. Always presume you may be
  handed more than you need; ignore it or have a policy. Closed schemas turn growth
  into breakage that cascades.
- **Spot it:** "additionalProperties: false" on inputs from other teams; strict
  deserializers rejecting unknown fields; enums that fail on new values.
- **Source:** Spec-ulation; Effective Programs; Maybe Not.

### 5.4 Don't conflate levels
- **Idea:** A collection (package, service, namespace) changes only by adding or
  removing members. Adding a function to a module isn't a change to the other
  functions. Versioning the whole artifact for a change in one leaf forces cascading
  bumps.
- **Source:** Spec-ulation.

### 5.5 Treating consumers well is social
- **Idea:** Incompatible churn is fine in private; published things have an open,
  unknown user base. "Change" originally meant exchange; one-sided change is
  antisocial.
- **Source:** Spec-ulation.

---

## 6. Problems and design process

### 6.1 Solve problems, not features
- **Idea:** Features are results, not objectives. A sum of features does not
  guarantee any problem is solved. Users describe problems; don't let them dictate
  solutions. Avoiding a problem isn't solving it. A missing feature is not a problem
  statement; ask what objective it serves and what is in the way.
- **Source:** Hammock Driven Development; Design in Practice.

### 6.2 Biggest problems are misconception
- **Idea:** Bugs are cheapest to avoid in design. The worst problems are
  misconceptions, which tests and type systems barely touch.
- **Source:** Hammock Driven Development; Effective Programs; Clojure Made Simple.

### 6.3 State and understand the problem
- **Idea:** Write the problem down. List what you know (facts, context,
  constraints), what you don't, and similar problems already solved. Look for the
  problems in your own solutions too. A design with no tradeoffs or no open questions
  hasn't been examined yet.
- **Source:** Hammock Driven Development.

### 6.4 Tradeoffs require alternatives
- **Idea:** A tradeoff needs at least two candidate solutions, each with its
  strengths and weaknesses written down. With one option there is nothing to trade.
- **Source:** Hammock Driven Development; Design in Practice (decision matrix).

### 6.5 Feed the background mind
- **Idea:** Load the problem up (write it down, review it from different angles),
  then step away: sleep, walk. Analysis is waking-mind work; synthesis comes from the
  background. Let an idea sit overnight before you build it.
- **Source:** Hammock Driven Development; Design in Practice.

### 6.6 Design is making decisions
- **Idea:** A design's value is the decisions it records and the reasons for them.
  Keeping every option open means no design was done. Constraints drive creativity; don't fidget, agglomerate,
  tweak.
- **Source:** Design, Composition and Performance; Design in Practice.

### 6.7 Precise words
- **Idea:** Precision in naming is precision in thinking. Avoid cute codenames that
  carry no meaning and hide fuzziness. Keep a glossary; when a term breaks, fix or
  abandon it. A good name later feeling wrong means your intent has drifted.
- **Spot it:** components named after superheroes or puns; one concept with three
  names across the codebase; the same name for two concepts; a new name so general
  it fits half the codebase (`items`, `ending`, `data`, `info`), so the reader
  must open its definition to learn what it holds. A vague name is as unclear as a
  wrong one, only harder to spot, because nothing in it is false.
- **Source:** Design in Practice.

### 6.8 Design progress is understanding
- **Idea:** Progress is measured by increasing understanding and decisions made with
  reasons, not by checking off process artifacts. Phases are not waterfall; be
  explicit about backtracking. Incremental (grow into) beats iterative (do-over).
- **Source:** Design in Practice.

---

## 7. Effective programs

### 7.1 Situated programs
- **Idea:** Most business software is situated: runs a long time, deals with
  information and real-world irregularity, has long memory (databases), talks to
  other systems and humans, uses other people's code, lives in a changing world.
  Choose techniques for that, not for compilers or theorem provers.
- **Source:** Effective Programs.

### 7.2 Program for stakeholders
- **Idea:** "Something good" means it does what it should from the stakeholders'
  view, meets operational needs, and accommodates inevitable change. Loose coupling
  is key to flexibility. Passing tests and type checks are means, not ends.
- **Source:** Clojure Made Simple.

### 7.3 Positional semantics and parameterization don't scale
- **Idea:** Flowing detailed type information and structure through a whole system is
  a major source of coupling. The more elaborate and parochial the types, the more
  they encourage "tyranny of the container". Prefer open, need-to-know data that
  accepts and propagates more.
- **Note:** This is not an argument against static types. Use them, but keep data
  types open and attribute-centric, and avoid making every layer depend on every
  type.
- **Source:** Effective Programs.
