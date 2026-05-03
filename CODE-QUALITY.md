# CODE-QUALITY.md

## Gate sequence

Run the lowest-cost gate that can catch the issue first, then run the full gate before completion.

| Scope | Required gates |
|---|---|
| TypeScript package/app | `pnpm typecheck`, `pnpm lint`, relevant tests |
| Web app | route/component tests, accessibility review for UI changes, bundle/perf notes for heavy routes |
| Mobile app | unit tests, Expo config validation, token-storage review |
| FastAPI | `uv run pytest`, auth boundary tests, OpenAPI compatibility check |
| FastMCP | MCP smoke test and tool side-effect review |
| macOS/Rust | `swift build`, `cargo test`, FFI boundary review |
| Any change | `python3 scripts/quality/agent_gate.py` |

## File size and locality limits

Default maximum source lines of code, excluding blank lines and comments:

| File type | Soft limit | Hard limit |
|---|---:|---:|
| UI component `.tsx` | 180 | 250 |
| TypeScript module `.ts` | 260 | 350 |
| Python module `.py` | 300 | 400 |
| Swift source `.swift` | 260 | 350 |
| Rust source `.rs` | 260 | 350 |
| Prompt/doc contract `.md` | 700 | 1,000 |

Files above the hard limit must either be split or contain an `@allow-large-file` marker with a concrete reason. Generated files and lockfiles are exempt.

## TypeScript standards

- `strict` mode stays enabled.
- Prefer discriminated unions over boolean flag clusters.
- Do not use broad `any`; use `unknown`, `z.infer`, branded types, or explicit interfaces.
- Runtime input from APIs, MCP tools, auth callbacks, and storage must be validated with Zod or platform-native schema validation.
- Shared schemas live in `packages/validation`.

## UI, theme, CSS, and style consistency

- Use tokens from `packages/theme` and CSS variables from `DESIGN.md`.
- Raw hex colors are only permitted in `packages/theme` or design documentation.
- Tailwind arbitrary values require a documented reason when used outside layout primitives.
- Web and mobile components should share naming, spacing, and semantic color roles.
- No app-specific design token forks without a design decision record.

## Security standards

- Secrets must only be provided through local environment variables, platform secret stores, or managed CI secrets.
- Never log auth tokens, refresh tokens, service-role keys, OAuth payloads, JWTs, private keys, or webhook signatures.
- Supabase service role keys are server-only and must never be imported into web or mobile client bundles.
- Web3 auth must verify wallet signatures server-side before trusting identity claims.
- Telegram auth must validate the login hash server-side before linking identity.
- All external webhooks require signature verification and replay protection.

## Performance standards

- Prefer streaming for AI responses.
- Avoid client bundles pulling server-only AI providers.
- Add memoization only where profiling or render frequency justifies it.
- Mobile network calls must have cancellation or stale-response handling through TanStack Query.
- FastAPI endpoints must avoid blocking I/O in async routes.
- MCP tools should be concise and return bounded payloads.

## AI QC standards

Optional model-assisted review can use OpenAI GPT-5.5 or Claude. It must evaluate:

1. Correctness against task acceptance criteria.
2. Security and secret handling.
3. Performance regressions.
4. Cross-platform consistency.
5. Completeness of tests and documentation.
6. Whether Linear and Notion updates are sufficient.

The AI reviewer may not approve a change when deterministic gates fail.
