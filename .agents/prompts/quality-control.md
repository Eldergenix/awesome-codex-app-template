# Quality Control Prompt

Review the current change as an enterprise quality gate.

Pass only if:

- deterministic gates pass
- acceptance criteria are satisfied
- tests cover changed behavior
- no secrets or sensitive values are introduced
- file-size limits are respected
- theme and style rules are respected
- performance impact is bounded or documented
- Linear and Notion tracking are updated or drafted

Return: Verdict, Blocking Issues, Non-blocking Issues, Verification, Required Follow-up.
