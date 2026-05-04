# CONTINUITY.MD

This file preserves working context between agent sessions. Do not store secrets or private customer data here.

## Session start checklist

- Read the latest entry below.
- Check `PLAN.MD` for active ExecPlans.
- Check Linear for the task status when MCP is connected.
- Check Notion for the task doc when MCP is connected.
- Run `git status --short` before editing.

## Session end checklist

Append an entry with:

- Date/time.
- Task or Linear issue key.
- Files changed.
- Commands run and their result.
- Decisions made.
- Risks or blockers.
- Next concrete action.

## Current state

No active implementation yet. This template is ready for project-specific customization.

## Handoff log

### 2026-05-04 — Stripe-themed Remotion promo refresh

- Updated the shared Remotion promo visual system to a Stripe-inspired release theme: bright canvas, diagonal color bands, white product panels, blurple/cyan accents, and softer SaaS-style depth.
- Preserved the existing four compositions, timing, dimensions, copy, and GitHub repository CTA while refreshing all rendered MP4s and representative still frames.
- Commands run successfully: four `pnpm exec remotion still ...` checks, four `pnpm exec remotion render ...` exports, `pnpm --filter @repo/web typecheck`, `pnpm --filter @repo/web lint`, `pnpm --filter @repo/web test`, `python3 scripts/quality/agent_gate.py --changed-only --json`, and `ffprobe` metadata checks confirming 1080x700, 60fps, 37 seconds for all four MP4s.
- Decisions made: keep this as a shared style-layer update in `apps/web/remotion/promo/PromoVideo.tsx` so all promo and walkthrough variants stay visually coherent.
- Risks or blockers: a parallel Remotion still render hit webpack cache contention and was rerun successfully by itself; future render batches should run sequentially unless the cache directory is isolated per render.
- Next concrete action: watch the refreshed MP4s and choose the preferred X promo variant for copy/timing refinement.

### 2026-05-04 — Promo motion scene script

- Created `docs/notes/promo-motion-scene-script.md` as a producer/director-ready scene script for the Enterprise Monorepo Template promo video.
- Grounded the script in the existing 37-second, 1080x700, 60fps Remotion promo direction and the repository's dark product-UI-forward design system.
- Commands run: `python3 scripts/quality/agent_gate.py --changed-only --json` passed; `pnpm exec prettier --check docs/notes/promo-motion-scene-script.md CONTINUITY.MD` passed; `pnpm typecheck` passed; `pnpm test` passed with placeholder package/app test scripts; `pnpm lint` failed in shared packages because package-level `eslint .` sees all files as ignored.
- Decisions made: keep the motion language tied to product UI panels, setup wizard states, agent guardrails, and deterministic quality gates instead of generic launch-video abstraction.
- Risks or blockers: this is a script artifact only; it has not yet been implemented as a new Remotion composition or rendered. Full repo lint remains blocked by the existing ESLint package-scope issue.
- Next concrete action: convert the script into a Remotion composition variant or revise the existing `XPromoLaunch` composition around this beat sheet.

### 2026-05-04 — Remotion launch promo set

- Created four Remotion outputs for the enterprise monorepo template launch: three X promo variants and one walkthrough, all targeting 1080x700, 60fps, 37 seconds.
- Changed the Remotion entrypoint and shared promo composition under `apps/web/remotion/`, pinned the web app Zod version to the Remotion-supported version, and kept the GitHub repository URL in each ending frame.
- Fixed changed-file quality blockers discovered during verification: prompt marker docs, eslint ignore handling, setup wizard type-only imports, the missing `Label` component, and changed-file raw color style violations.
- Commands run successfully: `pnpm --filter @repo/web typecheck`, `pnpm --filter @repo/web lint`, `pnpm --filter @repo/web test`, `python3 scripts/quality/agent_gate.py --changed-only --json`, four `pnpm exec remotion still ...` checks, and four `pnpm exec remotion render ...` exports.
- Decisions made: keep the four videos as separate Remotion compositions so individual social variants can be refined without touching the shared visual system; avoid CSS keyframe animations inside Remotion and drive animation from frames.
- Risks or blockers: the worktree already contained unrelated modified and untracked setup/template files before this task; those were preserved.
- Next concrete action: review the four MP4s, choose the X promo direction, then refine copy/timing/visual emphasis for that selected variant.

### 2026-05-03 — Template initialization

- Created root prompt contract files, app scaffolds, agent hooks, CI gates, Notion/Linear workflows, and shared packages.
- No real credentials were added.
- First project-specific task should replace placeholder environment values and configure MCP OAuth for Notion and Linear.
