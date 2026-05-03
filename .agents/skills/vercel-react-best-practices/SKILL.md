---
name: vercel-react-best-practices
description: Apply Vercel/React performance and architecture best practices. Use when writing, reviewing, or refactoring code in apps/web (Next.js) or packages/. Triggers on Server Components, data fetching, bundle optimization, streaming, caching, and React 19 patterns.
source: https://github.com/vercel-labs/agent-skills --skill vercel-react-best-practices
apps: [web]
---

## Instructions

1. Default to React Server Components. Move to `'use client'` only when state, effects, or browser APIs are required.
2. Colocate data fetching with the component that needs it — avoid prop drilling fetched data.
3. Use `next/image` for all images; never use raw `<img>` tags.
4. Use `next/font` to eliminate layout shift from web fonts.
5. Prefer `loading.tsx` and `error.tsx` over in-component loading/error states.
6. Use `Suspense` boundaries to stream partial UI instead of blocking the whole page.
7. Keep route handlers (`route.ts`) thin — move business logic to service modules.
8. Run `pnpm --filter @repo/web build` and confirm zero unused imports before marking work done.
9. Check `packages/theme` for design tokens before adding any inline styles.
10. Validate that no server-only imports leak into client components (`server-only` package).

## Trigger Conditions

- Editing any file under `apps/web/`
- Adding a new page, layout, or route handler in Next.js
- Optimizing bundle size or Core Web Vitals
- Implementing data fetching, caching, or streaming
- Migrating class components or Pages Router patterns to App Router
