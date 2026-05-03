# Codex Integration

- Project config lives in `.codex/config.toml`.
- Lifecycle hooks live in `.codex/hooks.json`.
- Root guidance lives in `AGENTS.md` with nested overrides under app directories.
- Notion and Linear MCP servers are configured as remote MCP endpoints.

Run these user-level logins after trusting the repo:

```bash
codex mcp login notion
codex mcp login linear
```
