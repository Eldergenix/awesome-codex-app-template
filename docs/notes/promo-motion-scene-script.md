# Promo Motion Scene Script

## Project

Enterprise Monorepo Template

## Format

- Duration: 37 seconds
- Canvas: 1080 x 700
- Frame rate: 60 fps
- Primary use: X launch promo, website embed, GitHub release asset
- Visual system: near-black canvas, charcoal product panels, lavender-blue accent, sparse success green, dense product UI screenshots
- Motion language: fast but controlled. Panels slide and fade in with spring easing. Avoid decorative gradients, mascot art, or abstract blobs. The product UI is the hero.

## Core Message

Most AI coding starters help you begin. This one helps you finish.

## Voiceover

This is the enterprise monorepo template for serious AI builders.

One command gives you web, mobile, macOS, API, MCP tools, shared packages, AI providers, Supabase auth, and a browser setup wizard.

Codex, Claude Code, Linear, Notion, hooks, skills, and quality gates are already wired in.

Build fast. Verify everything. Ship across every surface.

Clone it, configure it, and start from production-grade foundations.

## Scene 1 - The Starter That Ships

Time: 0:00-0:08

On-screen text:

```
Enterprise Monorepo Template
Production-grade scaffold for multi-platform products.
```

Visual:

- Start on a near-black canvas with a thin hairline frame.
- A compact terminal line appears: `npx create-enterprise-monorepo my-app`.
- The command resolves into a polished product frame showing five app surfaces: web, mobile, macOS, api, mcp.
- Small status chips appear in sequence: `Next.js 16`, `Expo 55`, `FastAPI`, `FastMCP`, `AI SDK 6`.

Motion:

- Terminal cursor blinks for 12 frames, then command types on.
- Product frame enters from the lower right with 24px vertical drift and opacity ramp.
- Stack chips stagger every 8 frames with subtle scale from 0.96 to 1.0.

Sound:

- Tight keystroke texture under the command.
- Low click when the product frame locks into place.

## Scene 2 - Configure The Stack Visually

Time: 0:08-0:16

On-screen text:

```
Open /setup
Choose app type, layout, theme, motion, billing, and deployment.
```

Visual:

- Cut into the setup wizard as a full-width product screenshot panel.
- The left rail shows five completed steps and one active deployment step.
- The active card shows install logs streaming below it.
- A small label reads: `dev-only setup API`.

Motion:

- Step markers fill from top to bottom.
- Selection cards slide in from 18px below, one at a time.
- The streaming log advances with a clipped reveal, not a typewriter effect.

Sound:

- Soft interface ticks for each completed wizard step.
- Gentle rising tone as the final step activates.

## Scene 3 - Agents With Guardrails

Time: 0:16-0:24

On-screen text:

```
Agent-ready from the first commit.
AGENTS.md + skills + hooks + Linear + Notion
```

Visual:

- Split the screen into three charcoal panels.
- Panel 1: `AGENTS.md` contract with highlighted lines: gather context, take action, verify work.
- Panel 2: skills registry cards: `quality-gate`, `security-review`, `frontend-design`, `agent-browser`.
- Panel 3: Linear issue and Notion doc icons connected to `PLAN.MD`, `MEMORY.MD`, and `CONTINUITY.MD`.

Motion:

- Panels enter as a staggered grid, left to right.
- Highlight bars sweep across key text once, then hold.
- Connection lines draw from docs to Linear and Notion, ending with small lavender nodes.

Sound:

- Short confirmation tones as each guardrail panel lands.
- Subtle mechanical draw sound for connection lines.

## Scene 4 - Quality Gates Before Done

Time: 0:24-0:31

On-screen text:

```
No fake done states.
typecheck  lint  tests  secret scan  style guard
```

Visual:

- A command palette floats over the product UI: `pnpm quality`.
- Check rows complete in order:
  - `pnpm typecheck`
  - `pnpm lint`
  - `pnpm test`
  - `python3 scripts/quality/agent_gate.py`
- A final success chip reads: `ready for review`.

Motion:

- Command palette expands from 88 percent scale to full size.
- Each check row reveals with a left-edge success pulse.
- Keep success green restrained; lavender remains the primary brand accent.

Sound:

- Four clean verification clicks.
- Final low-impact success hit, no celebratory flourish.

## Scene 5 - Every Surface, One Foundation

Time: 0:31-0:37

On-screen text:

```
Build the product, not the scaffolding.
github.com/Eldergenix/enterprise-monorepo-template
```

Visual:

- Product frame zooms out to reveal six surface tiles: Web, iOS, Android, macOS, API, MCP.
- The tiles settle into a dense grid on the dark canvas.
- The GitHub URL appears inside a lavender hairline command pill.
- Final frame holds long enough to read.

Motion:

- Surface tiles scale from 0.98 to 1.0 with a 6-frame stagger.
- GitHub URL fades and rises 12px into the final lockup.
- Hold the final frame for at least 72 frames.

Sound:

- Bass-soft resolve as the grid completes.
- End on a dry UI click, not a cinematic boom.

## Alternate X Hook Lines

- "AI coding starters should not stop at scaffolding."
- "Start with the repo rules a senior engineer would add anyway."
- "The monorepo template for Codex, Claude Code, and teams that verify before shipping."

## Implementation Notes For Remotion

- Use `spring()` for panel entrances and `interpolate()` with clamped ranges for opacity and position.
- Keep frame-driven animation in React, not CSS keyframes.
- Keep all copy in data objects so launch, workflow, and free variants can share the same scene structure.
- Use `staticFile()` for any screenshot or logo assets.
- Add a `reduceMotion` prop before this becomes an embedded player experience.
