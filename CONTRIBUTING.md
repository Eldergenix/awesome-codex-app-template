# Contributing to Enterprise Monorepo Template

Thank you for helping improve this template. This guide covers how to report issues, propose features, and submit pull requests.

---

## Code of Conduct

Be respectful and constructive. Harassment of any kind is not tolerated.

---

## Reporting Bugs

1. Search [existing issues](../../issues) first — it may already be tracked.
2. Open a new issue using the **Bug Report** template.
3. Include:
   - Your OS and Node.js version
   - Exact reproduction steps
   - The error output (raw terminal output, not a description of it)

---

## Proposing Features

1. Open a **Feature Request** issue before writing code.
2. Describe the problem it solves, not just the solution.
3. Wait for maintainer acknowledgement before investing significant effort.

---

## Pull Requests

### Before You Start

- One PR per concern. Mixing unrelated changes slows review.
- For large changes, open a discussion issue first.
- Read `AGENTS.md` — it governs how code agents work in this repo.

### Setup

```bash
git clone https://github.com/Eldergenix/enterprise-monorepo-template
cd enterprise-monorepo-template
corepack enable
pnpm install
cp .env.example .env.local
# fill in .env.local with dev credentials
```

### Development Loop

```bash
pnpm --filter @repo/web dev     # Next.js at localhost:3000
pnpm --filter @repo/mobile dev  # Expo
```

### Quality Gate (required before PR)

```bash
pnpm quality      # deterministic gates — must pass
pnpm typecheck    # must pass
pnpm lint         # must pass
```

### PR Checklist

- [ ] Quality gate passes locally
- [ ] TypeScript errors: zero
- [ ] No secrets committed (`pnpm quality:secrets`)
- [ ] `CONTINUITY.MD` updated if the change is cross-app
- [ ] Screenshots included for any UI change

### Commit Style

Use [Conventional Commits](https://www.conventionalcommits.org/):

```
feat(web): add dark mode toggle
fix(api): correct auth token expiry check
docs: update bootstrap instructions
chore: bump turbo to 2.5.0
```

---

## Template-Specific Guidelines

### Adding a Skill

1. Create `.agents/skills/<name>/SKILL.md` following the YAML front-matter format.
2. Register the skill in the root `AGENTS.md` `<skills_registry>` section.
3. Document the `invoke_when` trigger conditions — be specific about which app.

### Adding an App

1. Create `apps/<name>/` with its own `package.json` and `AGENTS.md`.
2. Add to `pnpm-workspace.yaml`.
3. Add to `turbo.json` pipeline.
4. Register in the root `AGENTS.md` `<application_boundaries>` section.

### Changing DESIGN.md

Changes to `DESIGN.md` affect the design system across all apps. Include visual evidence (screenshots) in the PR.

---

## Release Process (maintainers)

```bash
# Bump version in root package.json + create-enterprise-monorepo/package.json
pnpm quality
git tag v1.x.x
git push origin v1.x.x
# GitHub Actions publishes the create package to npm automatically
```
