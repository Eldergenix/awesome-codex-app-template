# Linear Workflow

Use Linear as the task and bug source of truth.

## Issue lifecycle

1. `Triage`: request captured, scope unclear.
2. `Planned`: acceptance criteria and verification defined.
3. `In Progress`: implementation active.
4. `In Review`: deterministic gates and AI QC review complete.
5. `Done`: shipped or merged, Notion progress updated.

## Required labels

- `app:web`, `app:mobile`, `app:macos`, `app:api`, `app:mcp`
- `risk:low`, `risk:medium`, `risk:high`
- `type:bug`, `type:feature`, `type:security`, `type:chore`
- `nativewind-v5-risk` when mobile NativeWind behavior is involved

## Completion comment template

```md
Changed files:

Verification:

- [ ] pnpm quality

Security notes:

Notion docs:

Remaining risks:
```
