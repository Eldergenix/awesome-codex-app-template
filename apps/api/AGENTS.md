# apps/api AGENTS.md

- FastAPI routes must validate inputs with Pydantic.
- Authenticated routes must verify Supabase JWTs or explicit service credentials.
- Do not log tokens, authorization headers, webhook signatures, or raw OAuth payloads.
- Run `cd apps/api && uv run pytest` after changes.
