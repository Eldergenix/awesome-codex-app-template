# Claude Code Integration

- Project hooks live in `.claude/settings.json`.
- Hook scripts live in `.claude/hooks/` and delegate to `scripts/hooks/agent_hooks.py`.
- `CLAUDE.md` points Claude to the repo-level prompt contract.
- `.mcp.json` contains Notion, Linear, and repo FastMCP server definitions.

Run `/hooks` in Claude Code to inspect active hooks.
