# PLAN.MD

## ExecPlan protocol

Use an ExecPlan for tasks that span multiple files, affect security/auth, touch more than one app, require migrations, or are expected to take more than one implementation pass.

Each ExecPlan must include:

1. Objective.
2. Linear issue link or draft payload.
3. Notion documentation target.
4. Scope and non-goals.
5. Acceptance criteria.
6. Implementation steps.
7. Verification commands.
8. Rollback plan.
9. Risks and mitigations.
10. Progress log.

## Active ExecPlans

No active ExecPlans yet.

## Template

```md
### EP-YYYYMMDD-slug — Title

**Objective:**

**Linear:**

**Notion:**

**Scope:**

**Non-goals:**

**Acceptance criteria:**

- [ ]

**Implementation steps:**

1.

**Verification:**

- [ ] `pnpm quality`

**Rollback:**

**Risks:**

**Progress:**
```
