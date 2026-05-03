---
name: quality-gate
description: Use before declaring work complete. Runs deterministic gates and optional AI QC review.
---


## Instructions

1. Run the smallest relevant check after each implementation increment.
2. Before completion, run `pnpm quality` and app-specific tests.
3. For security, auth, performance, or cross-app changes, run optional AI QC if provider keys are configured.
4. Do not claim completion while deterministic gates fail.
5. Record commands and outcomes in `CONTINUITY.MD`.

