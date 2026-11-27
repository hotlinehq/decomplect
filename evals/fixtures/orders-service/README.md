# orders-service

A small internal service that takes orders from the web shop and hands them to
billing. One instance, about 200 orders a day, run by the shop team.

- `src/orders.ts`: order rules (totals, discounts, status)
- `src/handlers.ts`: HTTP handlers
- `src/repository.ts`: all database access
- Decisions are in `docs/adr/`.
