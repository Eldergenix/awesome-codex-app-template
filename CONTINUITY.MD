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

### 2026-05-03 — Template initialization

- Created root prompt contract files, app scaffolds, agent hooks, CI gates, Notion/Linear workflows, and shared packages.
- No real credentials were added.
- First project-specific task should replace placeholder environment values and configure MCP OAuth for Notion and Linear.
