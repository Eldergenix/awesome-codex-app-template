---
name: find-skills
description: Discover and surface available agent skills for the current task. Use when you are unsure which skill applies, or when the user asks "what skills do you have?" or "what can you do?".
source: https://github.com/vercel-labs/skills --skill find-skills
---

## Instructions

1. List all skills present in `.agents/skills/` by reading each `SKILL.md` front-matter.
2. Match the user's stated task to the most relevant skill by description keyword overlap.
3. If multiple skills match, rank by specificity (most targeted app/layer first).
4. Output a ranked table: skill name | description | trigger conditions.
5. Recommend the top skill and ask the user to confirm before invoking it.
6. Never silently apply a skill — always surface the match reasoning.

## Trigger Conditions

- User asks "what skills are available?"
- User asks "which skill should I use for X?"
- Agent is unsure which skill applies to an ambiguous task.
- Starting a new feature that may span multiple apps or layers.
