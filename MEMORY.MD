# MEMORY.MD

Persistent memory for agents. This file stores durable project facts, decisions, and constraints. It must not store secrets, credentials, private user data, or one-off debugging noise.

## Durable facts

- Repository type: enterprise multi-app monorepo.
- Package manager: pnpm.
- Python manager: uv.
- Auth provider: Supabase Auth.
- Documentation system: Notion via MCP.
- Task tracking: Linear via MCP.
- AI coding surfaces: Codex and Claude Code.
- Quality strategy: deterministic gates first, optional GPT/Claude review second.

## Architecture decisions

### ADR-0001 — Shared tokens are mandatory

All web/mobile/macOS UI should use shared semantic tokens from `packages/theme`. Raw color values in app code are rejected by the style guard.

### ADR-0002 — Hooks are guardrails, not the only boundary

Codex and Claude hooks are enabled for early blocking and feedback. CI remains the source of truth because hooks can be bypassed or may not intercept every tool path.

### ADR-0003 — Telegram auth is custom

Google, Discord, and Apple use Supabase-supported OAuth provider flows. Telegram requires a separate validation bridge because it is not part of the standard Supabase social provider list.

## Known risks

- NativeWind v5 is pre-release and must be validated before production launch.
- AI SDK and provider package versions should be locked during project bootstrap.
- MacOS SwiftUI + Rust FFI requires Xcode and platform-specific build validation.

## Memory update rules

- Add facts only when they should survive across sessions.
- Record decisions with rationale and impact.
- Remove stale assumptions when the architecture changes.
- Never add secrets, tokens, credential fragments, customer records, or private workspace URLs.
