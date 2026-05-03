---
name: frontend-design
description: Implement premium frontend UI and visual design. Use when building new pages, redesigning components, creating design systems, or producing high-fidelity UI in apps/web or apps/mobile. Enforces rich aesthetics, motion, and brand consistency.
source: https://github.com/anthropics/skills --skill frontend-design
apps: [web, mobile]
---

## Instructions

1. Source all colors, spacing, and typography from `packages/theme` — never hardcode values.
2. Use Google Fonts (Inter, Outfit, or Roboto) via `next/font` in `apps/web` for zero layout shift.
3. Apply micro-animations on interactive elements: hover lift, button press scale, focus ring transition.
4. Respect `prefers-reduced-motion` — all animations must have a reduced-motion fallback.
5. For glassmorphism or translucent surfaces, test at multiple viewport sizes and on both light/dark modes.
6. For dark mode, verify contrast ratios in both themes before shipping.
7. Use CSS custom properties (design tokens) for all theme-switchable values.
8. For `apps/mobile`, follow Apple HIG spacing (44pt minimum touch targets) and Android Material guidelines.
9. Run `generate_image` to produce placeholder visuals rather than leaving empty image slots.
10. Validate final output in the browser agent with a screenshot review before marking done.

## Trigger Conditions

- Building or redesigning any page or component with significant visual scope
- User asks to "make it beautiful", "premium design", or "match this screenshot"
- Creating a landing page, marketing section, or user-facing feature
- Establishing or expanding the design system in `packages/theme`
- Any task in `apps/web` or `apps/mobile` that involves visual output
