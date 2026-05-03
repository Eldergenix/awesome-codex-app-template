# Architecture

This monorepo separates apps from shared packages and keeps agent operations explicit.

- Apps own platform-specific composition.
- Packages own cross-platform logic, schemas, tokens, and providers.
- API owns server-side auth and privileged integrations.
- MCP owns local tooling for agents and bounded repository introspection.
