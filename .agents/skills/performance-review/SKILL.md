---
name: performance-review
description: Use for bundle size, AI streaming, API latency, mobile network usage, and MCP payload-size review.
---


## Instructions

Review for:

- avoidable client bundle growth
- server-only imports crossing into client bundles
- blocking I/O in async Python routes
- unbounded MCP responses
- missing request cancellation
- mobile query cache misuse
- avoidable React re-render paths

Record known baseline gaps in `docs/progress/`.

