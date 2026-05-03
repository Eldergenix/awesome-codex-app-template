---
name: remotion-best-practices
description: Create, render, and maintain Remotion video compositions. Use when building video content, motion graphics, walkthrough videos, or animated marketing assets inside this monorepo.
source: https://github.com/remotion-dev/skills --skill remotion-best-practices
apps: [web]
---

## Instructions

1. Install Remotion packages via `pnpm add remotion @remotion/player @remotion/cli` inside the relevant workspace.
2. Keep compositions in a dedicated directory: `apps/web/remotion/` or a standalone `apps/video/` package.
3. Always define `fps`, `durationInFrames`, `width`, and `height` explicitly on every `<Composition>`.
4. Use `spring()` for physics-based animations and `interpolate()` with `extrapolateLeft/Right: 'clamp'` for range-locked values.
5. Respect `prefers-reduced-motion` by accepting a `reduceMotion` prop and returning a static frame when true.
6. Use `staticFile()` for all assets referenced inside compositions — never relative paths.
7. Test render output with `npx remotion render` before committing video compositions.
8. For walkthroughs, use the `remotion` global skill pattern from `.gemini/antigravity/skills/remotion/SKILL.md`.
9. Document composition name, fps, duration, and intended use in a comment at the top of each composition file.
10. Never block the main thread — all async data must be fetched in `delayRender`/`continueRender`.

## Trigger Conditions

- User asks to "create a video", "animate this", "make a walkthrough video", or "add motion graphics"
- Building marketing or demo content that requires video output
- Creating a Remotion composition, player embed, or render pipeline
- Integrating `@remotion/player` into `apps/web` pages
