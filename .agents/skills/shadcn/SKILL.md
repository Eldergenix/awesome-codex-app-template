---
name: shadcn
description: Install, configure, and customize shadcn/ui components in apps/web. Use when adding UI primitives (Button, Dialog, Table, Form, etc.), setting up a component registry, or composing shadcn components into product features.
source: https://github.com/shadcn/ui --skill shadcn
apps: [web]
---

## Instructions

1. Check that `apps/web/components.json` exists before running `pnpm dlx shadcn@latest add <component>`.
2. Run `pnpm dlx shadcn@latest init` from `apps/web/` if `components.json` is missing.
3. Always install into `apps/web/` — never add shadcn components into shared packages unless they are fully headless.
4. After adding a component, verify it imports correctly by running `pnpm --filter @repo/web typecheck`.
5. Map shadcn CSS variables to `packages/theme` tokens — do not override variables outside the theme package.
6. Use the `cn()` utility from `apps/web/lib/utils.ts` for conditional className merging.
7. Prefer composing shadcn primitives over writing bespoke components for common patterns (forms, dialogs, tables, dropdowns).
8. When customizing a component, copy it to `apps/web/components/ui/` and modify locally — never edit node_modules.
9. Document any non-default shadcn configuration in `MEMORY.MD`.
10. Validate dark mode appearance in the browser agent after adding components.

## Trigger Conditions

- User asks to "add a shadcn component", "use shadcn", or "install a UI component"
- Building forms, dialogs, tables, toasts, or data display in `apps/web`
- Setting up the initial component registry for `apps/web`
- Composing multiple primitives into a feature UI
- Any task with `components.json` in the file path
