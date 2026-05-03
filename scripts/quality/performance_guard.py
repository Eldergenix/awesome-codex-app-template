#!/usr/bin/env python3
from __future__ import annotations

import argparse
import json
import re
import sys
from pathlib import Path

sys.path.insert(0, str(Path(__file__).resolve().parents[2]))
from scripts.quality.util import ROOT, read_text


def main() -> int:
    parser = argparse.ArgumentParser()
    parser.add_argument("--json", action="store_true")
    parser.add_argument("--staged", action="store_true")
    parser.add_argument("--changed-only", action="store_true")
    args = parser.parse_args()

    findings: list[dict[str, str]] = []

    web_ai_route = ROOT / "apps/web/src/app/api/ai/route.ts"
    if web_ai_route.exists() and "streamText" not in read_text(web_ai_route):
        findings.append({"file": "apps/web/src/app/api/ai/route.ts", "issue": "AI route must stream responses"})

    for client_file in (ROOT / "apps/web/src").glob("**/*.tsx"):
        text = read_text(client_file)
        if '"use client"' in text and "@ai-sdk/openai" in text:
            findings.append({"file": str(client_file.relative_to(ROOT)), "issue": "client component imports server AI provider"})

    for py_file in (ROOT / "apps/api/app").glob("**/*.py"):
        text = read_text(py_file)
        if re.search(r"async\s+def", text) and re.search(r"\b(requests\.|time\.sleep\()", text):
            findings.append({"file": str(py_file.relative_to(ROOT)), "issue": "blocking call in async route"})

    mcp_server = ROOT / "apps/mcp/server.py"
    if mcp_server.exists():
        text = read_text(mcp_server)
        if "subprocess.run" in text and "timeout=" not in text:
            findings.append({"file": "apps/mcp/server.py", "issue": "subprocess calls must include timeouts"})
        if "[-4000:]" not in text:
            findings.append({"file": "apps/mcp/server.py", "issue": "MCP command output should be bounded"})

    if args.json:
        print(json.dumps({"ok": not findings, "findings": findings}, indent=2))
    else:
        for item in findings:
            print(f"Performance guard: {item['file']} {item['issue']}", file=sys.stderr)
    return 1 if findings else 0


if __name__ == "__main__":
    raise SystemExit(main())
