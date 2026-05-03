#!/usr/bin/env python3
from __future__ import annotations

import sys
from pathlib import Path
sys.path.insert(0, str(Path(__file__).resolve().parents[2]))
import argparse
import json
import sys
from pathlib import Path

from scripts.quality.util import ROOT

REQUIRED = {
    "AGENTS.md": ["Required reading order", "Definition of done"],
    "CODE-QUALITY.md": ["Gate sequence", "Security standards"],
    "CONTINUITY.MD": ["Session start checklist", "Handoff log"],
    "MEMORY.MD": ["Durable facts", "Memory update rules"],
    "PLAN.MD": ["ExecPlan protocol", "Active ExecPlans"],
    "DESIGN.md": ["Design-system contract", "Semantic color roles"],
}


def main() -> int:
    parser = argparse.ArgumentParser()
    parser.add_argument("--json", action="store_true")
    parser.add_argument("--staged", action="store_true")
    parser.add_argument("--changed-only", action="store_true")
    args = parser.parse_args()
    findings: list[dict[str, str]] = []
    for filename, markers in REQUIRED.items():
        path = ROOT / filename
        if not path.exists():
            findings.append({"file": filename, "issue": "missing"})
            continue
        text = path.read_text(encoding="utf-8")
        for marker in markers:
            if marker not in text:
                findings.append({"file": filename, "issue": f"missing marker: {marker}"})
    skills_dir = ROOT / ".agents" / "skills"
    if not skills_dir.exists() or not any(skills_dir.glob("*/SKILL.md")):
        findings.append({"file": ".agents/skills", "issue": "missing skills"})
    if args.json:
        print(json.dumps({"ok": not findings, "findings": findings}, indent=2))
    else:
        for item in findings:
            print(f"Prompt guard: {item['file']} {item['issue']}", file=sys.stderr)
    return 1 if findings else 0


if __name__ == "__main__":
    raise SystemExit(main())
