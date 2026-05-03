---
name: web-design-guidelines
description: Review UI code for Web Interface Guidelines compliance — accessibility, semantics, focus management, motion, color contrast, and responsive layout. Use when auditing or building UI in apps/web or apps/mobile.
source: https://github.com/vercel-labs/agent-skills --skill web-design-guidelines
apps: [web, mobile]
---

## Instructions

1. Verify all interactive elements have accessible labels (`aria-label`, `aria-labelledby`, or visible text).
2. Check color contrast meets WCAG AA minimums (4.5:1 for text, 3:1 for UI components).
3. Ensure focus ring is visible in all keyboard navigation paths — never `outline: none` without a replacement.
4. Validate heading hierarchy: one `<h1>` per page, logical `h2`→`h3`→`h4` nesting.
5. Confirm `<img>` elements have descriptive `alt` text; decorative images use `alt=""`.
6. Check that animations respect `prefers-reduced-motion` media query.
7. Verify touch targets are ≥ 44×44px on mobile (`apps/mobile`).
8. Use semantic HTML (`<nav>`, `<main>`, `<section>`, `<article>`, `<aside>`, `<footer>`).
9. Review `DESIGN.md` and `packages/theme` before introducing new visual tokens.
10. Run Lighthouse accessibility audit via browser agent after changes.

## Trigger Conditions

- User asks to "review my UI", "check accessibility", "audit design", or "check UX"
- Adding or modifying any page, component, or layout in `apps/web` or `apps/mobile`
- Pre-release review in `apps/web` or `apps/mobile`
- Any PR touching visual or interactive UI elements
