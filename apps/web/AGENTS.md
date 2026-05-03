# apps/web AGENTS.md

- This app uses Next.js App Router and React Server Components.
- Keep server-only imports out of client components.
- Use Supabase SSR helpers for auth callbacks and server session reads.
- Use `packages/theme` tokens and `DESIGN.md` for styling.
- Run `pnpm --filter @repo/web typecheck` after code changes.
