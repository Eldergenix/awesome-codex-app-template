# Security Runbook

## Secrets

- Use `.env.example` for names only.
- Store actual values in local secret stores, CI secrets, Supabase/Vercel/Expo environments, or enterprise vaults.
- Rotate any secret pasted into a prompt, terminal output, issue, Notion page, log, or screenshot.

## Auth

- Supabase service-role keys are server-only.
- Web and mobile clients use anon keys only.
- OAuth callbacks must validate redirect targets.
- Web3 identity must be proven through server-verified signatures.
- Telegram identity must be proven through hash verification.

## MCP

- Notion and Linear use OAuth-backed MCP where possible.
- Destructive MCP actions require explicit user intent.
- Repo-local MCP tools must return bounded output.
