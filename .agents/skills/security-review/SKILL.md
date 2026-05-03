---
name: security-review
description: Use for auth, API, secrets, Web3, Telegram auth, Supabase, or MCP tool changes.
---


## Instructions

Review boundaries:

- Client/server separation.
- Token and refresh-token storage.
- Supabase service-role isolation.
- JWT verification and clock skew.
- OAuth callback validation.
- Web3 signature verification.
- Telegram hash verification.
- MCP tool side effects and destructive operations.
- Secret scans and log redaction.

