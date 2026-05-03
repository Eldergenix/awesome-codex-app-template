# apps/mcp AGENTS.md

- MCP tools must be documented, bounded, and side-effect explicit.
- Tools that create or update external systems must require explicit arguments and return structured summaries.
- Do not expose secrets or environment dumps through MCP resources.
- Run `cd apps/mcp && uv run pytest` after changes.
