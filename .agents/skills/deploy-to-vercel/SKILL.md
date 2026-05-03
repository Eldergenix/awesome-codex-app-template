---
name: deploy-to-vercel
description: Deploy apps/web to Vercel. Use when shipping a release, configuring Vercel project settings, managing environment variables, or debugging a Vercel build failure.
source: https://github.com/vercel-labs/agent-skills --skill deploy-to-vercel
apps: [web]
---

## Instructions

1. Before deploying, run the full quality gate: `pnpm --filter @repo/web typecheck && pnpm --filter @repo/web lint && pnpm --filter @repo/web build`.
2. Confirm all required environment variables in `.env.example` are provisioned in the Vercel dashboard for the target environment (preview / production).
3. Never commit `.env.local` or any secrets — use Vercel environment variable management exclusively.
4. For monorepo deployments, set the Vercel root directory to `apps/web` and the install command to `pnpm install --frozen-lockfile`.
5. Verify the build command is `pnpm --filter @repo/web build` or `turbo build --filter=@repo/web`.
6. After deployment, check the Vercel deployment log for errors before declaring success.
7. Use Vercel Preview Deployments for all feature branches — never push untested code straight to production.
8. Document the deployment outcome in `CONTINUITY.MD` including the deployment URL and any env var changes made.

## Trigger Conditions

- User says "deploy", "ship it", "push to Vercel", or "release"
- Configuring a new Vercel project for `apps/web`
- Debugging a Vercel build or runtime error
- Managing Vercel environment variables or domain settings
- Post-merge production deployment
