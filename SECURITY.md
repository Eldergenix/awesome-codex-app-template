# Security Policy

## Reporting

Report vulnerabilities through the organization security process or private security channel. Do not file public issues containing exploit details or secrets.

## Required controls

- Secret scan before commit and in CI.
- Supabase service-role isolation.
- Server-side verification for Web3 and Telegram auth.
- OAuth redirect validation.
- MCP destructive action review.
- Dependency updates through reviewed PRs.

## Rotation rule

Any credential exposed in a prompt, terminal, issue, Notion page, log, screenshot, or commit must be rotated. Deleting the text is not sufficient.
