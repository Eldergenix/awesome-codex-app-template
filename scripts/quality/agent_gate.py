#!/usr/bin/env python3
from __future__ import annotations

import argparse
import json
import subprocess
import os
import sys
from pathlib import Path

ROOT = Path(__file__).resolve().parents[2]
CHECKS = [
    ("secret_scan", [sys.executable, "scripts/quality/secret_scan.py"]),
    ("loc_guard", [sys.executable, "scripts/quality/loc_guard.py"]),
    ("style_guard", [sys.executable, "scripts/quality/style_guard.py"]),
    ("prompt_file_guard", [sys.executable, "scripts/quality/prompt_file_guard.py"]),
    ("functionality_guard", [sys.executable, "scripts/quality/functionality_guard.py"]),
    ("performance_guard", [sys.executable, "scripts/quality/performance_guard.py"]),
]


def main() -> int:
    parser = argparse.ArgumentParser()
    parser.add_argument("--changed-only", action="store_true")
    parser.add_argument("--staged", action="store_true")
    parser.add_argument("--json", action="store_true")
    args = parser.parse_args()

    results = []
    env = os.environ.copy()
    env["PYTHONPATH"] = str(ROOT) + os.pathsep + env.get("PYTHONPATH", "")
    failed = False
    for name, command in CHECKS:
        cmd = [*command]
        if args.changed_only:
            cmd.append("--changed-only")
        if args.staged:
            cmd.append("--staged")
        if args.json:
            cmd.append("--json")
        proc = subprocess.run(cmd, cwd=ROOT, text=True, capture_output=True, env=env)
        ok = proc.returncode == 0
        failed = failed or not ok
        results.append({"name": name, "ok": ok, "stdout": proc.stdout.strip(), "stderr": proc.stderr.strip()})

    if args.json:
        print(json.dumps({"ok": not failed, "checks": results}, indent=2))
    else:
        for result in results:
            status = "PASS" if result["ok"] else "FAIL"
            print(f"[{status}] {result['name']}")
            if result["stdout"]:
                print(result["stdout"])
            if result["stderr"]:
                print(result["stderr"], file=sys.stderr)
    return 1 if failed else 0


if __name__ == "__main__":
    raise SystemExit(main())
