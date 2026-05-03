#!/usr/bin/env python3
from __future__ import annotations

import sys
from pathlib import Path
sys.path.insert(0, str(Path(__file__).resolve().parents[2]))
import argparse
import json
import sys
from pathlib import Path

from scripts.quality.util import read_text, rel, selected_files

LIMITS = {
    ".tsx": 250,
    ".ts": 350,
    ".py": 400,
    ".swift": 350,
    ".rs": 350,
    ".md": 1000,
}

SOFT_HINT = {
    ".tsx": 180,
    ".ts": 260,
    ".py": 300,
    ".swift": 260,
    ".rs": 260,
    ".md": 700,
}


def effective_loc(text: str) -> int:
    count = 0
    for raw in text.splitlines():
        line = raw.strip()
        if not line:
            continue
        if line.startswith(("//", "#", "--")):
            continue
        count += 1
    return count


def scan_file(path: Path) -> dict[str, object] | None:
    limit = LIMITS.get(path.suffix.lower())
    if limit is None:
        return None
    text = read_text(path)
    if "@allow-large-file" in text:
        return None
    loc = effective_loc(text)
    if loc > limit:
        return {"file": rel(path), "loc": loc, "limit": limit, "level": "fail"}
    soft = SOFT_HINT.get(path.suffix.lower(), limit)
    if loc > soft:
        return {"file": rel(path), "loc": loc, "limit": soft, "level": "warn"}
    return None


def main() -> int:
    parser = argparse.ArgumentParser()
    parser.add_argument("--staged", action="store_true")
    parser.add_argument("--changed-only", action="store_true")
    parser.add_argument("--json", action="store_true")
    args = parser.parse_args()

    findings = [item for path in selected_files(args.staged, args.changed_only) if (item := scan_file(path))]
    failures = [item for item in findings if item["level"] == "fail"]

    if args.json:
        print(json.dumps({"ok": not failures, "findings": findings}, indent=2))
    else:
        for item in findings:
            stream = sys.stderr if item["level"] == "fail" else sys.stdout
            print(f"{item['level'].upper()}: {item['file']} has {item['loc']} LOC over {item['limit']}", file=stream)
    return 1 if failures else 0


if __name__ == "__main__":
    raise SystemExit(main())
