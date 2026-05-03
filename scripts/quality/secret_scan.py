#!/usr/bin/env python3
from __future__ import annotations

import sys
from pathlib import Path
sys.path.insert(0, str(Path(__file__).resolve().parents[2]))
import argparse
import json
import re
import sys
from pathlib import Path

from scripts.quality.util import read_text, rel, selected_files

PATTERNS: list[tuple[str, re.Pattern[str]]] = [
    ("OpenAI API key", re.compile(r"sk-[A-Za-z0-9_-]{24,}")),
    ("Anthropic API key", re.compile(r"sk-ant-[A-Za-z0-9_-]{24,}")),
    ("GitHub token", re.compile(r"gh[pousr]_[A-Za-z0-9_]{30,}")),
    ("AWS access key", re.compile(r"AKIA[0-9A-Z]{16}")),
    ("Private key", re.compile(r"-----BEGIN [A-Z ]*PRIVATE KEY-----")),
    ("Slack token", re.compile(r"xox[baprs]-[A-Za-z0-9-]{20,}")),
    ("Linear API key", re.compile(r"lin_api_[A-Za-z0-9]{20,}")),
    ("JWT", re.compile(r"eyJ[A-Za-z0-9_-]{20,}\.[A-Za-z0-9_-]{20,}\.[A-Za-z0-9_-]{20,}")),
]

ALLOWLIST_PHRASES = {
    "your_api_key_here",
    "<yourtoken>",
    "<set-in-secret-manager>",
    "OPENAI_API_KEY=",
    "ANTHROPIC_API_KEY=",
}


def scan_file(path: Path) -> list[dict[str, object]]:
    text = read_text(path)
    if not text:
        return []
    findings: list[dict[str, object]] = []
    for name, pattern in PATTERNS:
        for match in pattern.finditer(text):
            line_no = text.count("\n", 0, match.start()) + 1
            line = text.splitlines()[line_no - 1] if line_no - 1 < len(text.splitlines()) else ""
            if any(phrase in line for phrase in ALLOWLIST_PHRASES):
                continue
            findings.append({"file": rel(path), "line": line_no, "type": name})
    return findings


def main() -> int:
    parser = argparse.ArgumentParser()
    parser.add_argument("--staged", action="store_true")
    parser.add_argument("--changed-only", action="store_true")
    parser.add_argument("--json", action="store_true")
    args = parser.parse_args()

    findings: list[dict[str, object]] = []
    for path in selected_files(staged=args.staged, changed_only=args.changed_only):
        findings.extend(scan_file(path))

    if args.json:
        print(json.dumps({"ok": not findings, "findings": findings}, indent=2))
    elif findings:
        print("Secret scan failed:", file=sys.stderr)
        for item in findings:
            print(f"- {item['file']}:{item['line']} potential {item['type']}", file=sys.stderr)
    return 1 if findings else 0


if __name__ == "__main__":
    raise SystemExit(main())
