---
name: agent-browser
description: Automate browser interactions for testing, scraping, form filling, screenshots, and UI validation. Use when verifying rendered output in apps/web or apps/mobile (web preview), or when the task requires real browser interaction.
source: https://github.com/vercel-labs/agent-browser --skill agent-browser
apps: [web, mobile]
---

## Instructions

1. Use the browser agent for any task requiring visual confirmation of UI output.
2. After deploying or running the dev server, always open the relevant URL in the browser agent and take a screenshot before reporting success.
3. For `apps/web`, the default dev URL is `http://localhost:3000`. For Expo web preview, use the port shown by `expo start --web`.
4. Use the browser agent to fill forms, click through flows, and verify end-to-end user journeys.
5. Capture screenshots at mobile (375px) and desktop (1440px) viewports for any UI change.
6. Run Lighthouse or accessibility audits via the browser agent when the `web-design-guidelines` skill is active.
7. Do NOT use the browser agent to log into production systems or access user data.
8. Save all screenshots to `.agents/audit/screenshots/` with a timestamp in the filename.
9. If the browser agent returns an error opening a URL, report it to the user and do not mark the task complete.
10. Pair with `deploy-to-vercel` skill to verify preview deployments visually.

## Trigger Conditions

- User asks to "open a website", "take a screenshot", "test this in the browser", or "verify the UI"
- Any task completion that touches visual UI in `apps/web` or `apps/mobile`
- E2E flow validation (auth, forms, navigation, purchase flows)
- Debugging rendering errors that are only visible in a real browser
- Post-deploy smoke testing of `apps/web` on Vercel
