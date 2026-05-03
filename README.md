<!-- Banner -->
<div align="center">
  <h1>Enterprise Monorepo Template</h1>
  <p><strong>Production-grade scaffold for multi-platform products.</strong><br>Next.js · Expo · macOS · FastAPI · MCP · AI SDK · Supabase — configured by a setup wizard in your browser.</p>

  <p>
    <a href="https://github.com/Eldergenix/enterprise-monorepo-template/blob/main/LICENSE"><img src="https://img.shields.io/badge/license-MIT-blue.svg" alt="MIT License" /></a>
    <a href="https://github.com/Eldergenix/enterprise-monorepo-template/actions/workflows/quality-gates.yml"><img src="https://github.com/Eldergenix/enterprise-monorepo-template/actions/workflows/quality-gates.yml/badge.svg" alt="Quality Gates" /></a>
    <a href="https://www.npmjs.com/package/create-enterprise-monorepo"><img src="https://img.shields.io/npm/v/create-enterprise-monorepo.svg" alt="npm" /></a>
    <img src="https://img.shields.io/badge/Node-22-339933?logo=node.js&logoColor=white" alt="Node 22" />
    <img src="https://img.shields.io/badge/pnpm-10-F69220?logo=pnpm&logoColor=white" alt="pnpm" />
  </p>

  <p>
    <a href="https://vercel.com/new/clone?repository-url=https://github.com/Eldergenix/enterprise-monorepo-template&root=apps/web">
      <img src="https://vercel.com/button" alt="Deploy with Vercel" height="32" />
    </a>
  </p>
</div>

---

## What you get

One command gives you a monorepo with **five production apps**, a shared package layer, AI agent workflows, quality gates, and an interactive setup wizard that installs the right theme and components for your use case.

```bash
npx create-enterprise-monorepo my-app
```

Then open **`http://localhost:3000/setup`** to configure your stack in the browser:

> _Step through 5 questions — app type, layout, theme, animations, billing — and watch the wizard install shadcn registries, update DESIGN.md, and log every command it runs._

---

## Stack

| Layer | Technology |
|---|---|
| **Web** | Next.js 16 · React 19 · TypeScript 5 · Tailwind CSS 4 · AI SDK 6 |
| **Mobile** | Expo SDK 55 · React Native 0.83 · Expo Router · NativeWind 5 · TanStack Query |
| **macOS** | SwiftUI shell · Rust core library (FFI boundary) |
| **API** | FastAPI · Pydantic · uv · pytest |
| **MCP** | FastMCP — local agent tooling server |
| **Auth** | Supabase Auth · SSR helpers · custom Telegram auth bridge |
| **AI** | Vercel AI SDK 6 · OpenAI · Anthropic — shared `@repo/ai` package |
| **Build** | Turborepo · pnpm workspaces |
| **Agents** | AGENTS.md · 17 skills · quality gates · Notion MCP · Linear MCP |

---

## Repository layout

```
apps/
  web/        Next.js App Router — /setup wizard lives here
  mobile/     Expo Router
  macos/      SwiftUI + Rust core
  api/        FastAPI service
  mcp/        FastMCP local tooling server
packages/
  ai/         Shared AI SDK provider + prompt helpers
  supabase/   Supabase SSR client helpers
  theme/      Cross-platform design tokens
  types/      Shared TypeScript types
  validation/ Shared Zod schemas
  create-enterprise-monorepo/  ← the npx CLI (this package)
.agents/
  skills/     17 reusable agent skills
  prompts/    Reusable prompt fragments
scripts/
  ai-review/  GPT/Claude quality-control harness
  quality/    Deterministic quality gates
```

---

## Bootstrap

**Recommended (via CLI):**
```bash
npx create-enterprise-monorepo my-app
cd my-app
pnpm --filter @repo/web dev
# open http://localhost:3000/setup
```

**Manual:**
```bash
git clone https://github.com/Eldergenix/enterprise-monorepo-template my-app
cd my-app
corepack enable
pnpm install
cp .env.example .env.local
# fill in .env.local
pnpm --filter @repo/web dev
```

**Python services:**
```bash
cd apps/api && uv sync && uv run pytest
cd apps/mcp && uv sync && uv run python server.py
```

**macOS app:**
```bash
cd apps/macos
./scripts/build-rust.sh
swift build
```

---

## Setup Wizard

Navigate to **`/setup`** after starting the dev server to configure your project through a 5-step browser UI:

| Step | Question | Effect |
|---|---|---|
| 1 | App type | Activates app-specific AGENTS.md skills |
| 2 | Layout style | Selects dashboard / marketing / IDE layout scaffold |
| 3 | Theme | Installs `@fluid` (Modern) or `@thegridcn` (CyberPunk/Tron) from shadcn registry |
| 4 | Animations | Installs `@animate-ui/primitives-texts-sliding-number` + `motion` |
| 5 | Paying customers | Installs `@thegridcn` billing and pricing components |

After confirming, a streaming log runs the installs and updates `DESIGN.md` and `CONTINUITY.MD` automatically.

> The setup API is **dev-only** — it returns 403 on any deployed URL.

---

## Agent Workflows

This template is designed to work with **Codex**, **Claude Code**, and any AGENTS.md-compatible agent.

### Skill system

All 17 agent skills live in `.agents/skills/`. Each skill has precise `invoke_when` trigger conditions in `AGENTS.md`:

| Skill | Trigger |
|---|---|
| `vercel-react-best-practices` | Any edit in `apps/web/` |
| `agent-browser` | Any UI task completion — always takes a screenshot |
| `shadcn` | Adding any shadcn/ui component to `apps/web` |
| `frontend-design` | Building or redesigning pages |
| `deploy-to-vercel` | "Deploy", "ship it", "release" |
| `seo-audit` | Adding public pages or pre-launch review |
| `security-review` | Auth, Supabase, MCP tool changes |
| `quality-gate` | Before declaring any task complete |
| [+9 more](.agents/skills/) | … |

### MCP setup

```bash
# Codex
codex mcp login notion
codex mcp login linear

# Claude Code
claude mcp add --transport http notion https://mcp.notion.com/mcp --scope project
claude mcp add --transport http linear https://mcp.linear.app/mcp --scope project
```

---

## Quality Gates

```bash
pnpm quality          # all deterministic gates
pnpm quality:secrets  # secret scan
pnpm quality:loc      # line-of-code limits
pnpm typecheck        # TypeScript strict mode
pnpm lint             # ESLint

# Optional AI-assisted review (never replaces deterministic gates)
AI_QC_PROVIDER=anthropic AI_QC_MODEL=claude-sonnet-4.5 pnpm ai:qc
```

CI runs on every push and PR via GitHub Actions (`.github/workflows/quality-gates.yml`).

---

## Environment Variables

Copy `.env.example` to `.env.local` and fill in your credentials. Never commit real secrets — the quality gate scans for them.

Key variables:

| Variable | Purpose |
|---|---|
| `NEXT_PUBLIC_SUPABASE_URL` | Supabase project URL (public) |
| `NEXT_PUBLIC_SUPABASE_ANON_KEY` | Supabase anon key (public) |
| `SUPABASE_SERVICE_ROLE_KEY` | Server-only — never expose to client |
| `OPENAI_API_KEY` / `ANTHROPIC_API_KEY` | AI provider keys — server-only |
| `SETUP_SECRET` | Dev-only setup API guard |

---

## Task Workflow

1. Read `AGENTS.md`, `PLAN.MD`, `MEMORY.MD`, `CONTINUITY.MD`, `CODE-QUALITY.md`, and the nearest app-level `AGENTS.md`.
2. Create or identify the Linear issue.
3. Create or update the Notion documentation page.
4. Implement in small, testable increments.
5. Run `pnpm quality && pnpm typecheck && pnpm lint`.
6. Update `CONTINUITY.MD` and the Linear issue.

---

## Contributing

See [CONTRIBUTING.md](./CONTRIBUTING.md) for setup instructions, PR guidelines, and how to add skills or apps.

---

## License

[MIT](./LICENSE) — use it freely, ship something great.
