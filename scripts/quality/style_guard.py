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

HEX_COLOR = re.compile(r"(?<![A-Za-z0-9_])#(?:[0-9A-Fa-f]{3}|[0-9A-Fa-f]{6}|[0-9A-Fa-f]{8})(?![A-Za-z0-9_])")
TAILWIND_ARBITRARY_COLOR = re.compile(r"(?:text|bg|border|ring|from|to|via)-\[#")

ALLOWED_PREFIXES = (
    "packages/theme/",
    "DESIGN.md",
    "docs/",
)

SCAN_SUFFIXES = {".ts", ".tsx", ".css", ".md", ".swift"}


def is_allowed(path: Path) -> bool:
    r = rel(path)
    return r.startswith(ALLOWED_PREFIXES) or r.endswith("global.css") or r.endswith("globals.css")


def scan_file(path: Path) -> list[dict[str, object]]:
    if path.suffix.lower() not in SCAN_SUFFIXES or is_allowed(path):
        return []
    text = read_text(path)
    findings: list[dict[str, object]] = []
    for pattern_name, pattern in (("raw hex color", HEX_COLOR), ("arbitrary Tailwind color", TAILWIND_ARBITRARY_COLOR)):
        for match in pattern.finditer(text):
            line = text.count("\n", 0, match.start()) + 1
            findings.append({"file": rel(path), "line": line, "type": pattern_name})
    return findings


def main() -> int:
    parser = argparse.ArgumentParser()
    parser.add_argument("--staged", action="store_true")
    parser.add_argument("--changed-only", action="store_true")
    parser.add_argument("--json", action="store_true")
    args = parser.parse_args()

    findings: list[dict[str, object]] = []
    for path in selected_files(args.staged, args.changed_only):
        findings.extend(scan_file(path))

    if args.json:
        print(json.dumps({"ok": not findings, "findings": findings}, indent=2))
    elif findings:
        print("Style guard failed:", file=sys.stderr)
        for item in findings:
            print(f"- {item['file']}:{item['line']} {item['type']} outside theme package", file=sys.stderr)
    return 1 if findings else 0


if __name__ == "__main__":
    raise SystemExit(main())
