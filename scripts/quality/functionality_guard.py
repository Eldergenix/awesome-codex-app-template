#!/usr/bin/env python3
from __future__ import annotations

import argparse
import json
import sys
from pathlib import Path

sys.path.insert(0, str(Path(__file__).resolve().parents[2]))
from scripts.quality.util import ROOT

REQUIRED_PACKAGE_SCRIPTS = {
    "apps/web/package.json": ["build", "lint", "typecheck", "test"],
    "apps/mobile/package.json": ["build", "lint", "typecheck", "test"],
    "packages/ai/package.json": ["build", "lint", "typecheck", "test"],
    "packages/supabase/package.json": ["build", "lint", "typecheck", "test"],
    "packages/theme/package.json": ["build", "lint", "typecheck", "test"],
    "packages/types/package.json": ["build", "lint", "typecheck", "test"],
    "packages/validation/package.json": ["build", "lint", "typecheck", "test"],
}


def main() -> int:
    parser = argparse.ArgumentParser()
    parser.add_argument("--json", action="store_true")
    parser.add_argument("--staged", action="store_true")
    parser.add_argument("--changed-only", action="store_true")
    args = parser.parse_args()

    findings: list[dict[str, str]] = []
    for rel_path, scripts in REQUIRED_PACKAGE_SCRIPTS.items():
        path = ROOT / rel_path
        if not path.exists():
            findings.append({"file": rel_path, "issue": "missing package.json"})
            continue
        data = json.loads(path.read_text(encoding="utf-8"))
        package_scripts = data.get("scripts", {})
        for script in scripts:
            if script not in package_scripts:
                findings.append({"file": rel_path, "issue": f"missing script: {script}"})
    if args.json:
        print(json.dumps({"ok": not findings, "findings": findings}, indent=2))
    else:
        for item in findings:
            print(f"Functionality guard: {item['file']} {item['issue']}", file=sys.stderr)
    return 1 if findings else 0


if __name__ == "__main__":
    raise SystemExit(main())
