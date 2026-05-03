#!/usr/bin/env python3
from __future__ import annotations

import argparse
import json
import os
import re
import subprocess
import sys
import urllib.request
from pathlib import Path

ROOT = Path(__file__).resolve().parents[2]
OUTPUT = ROOT / ".agent-state" / "ai-qc-review.md"

REDACT_PATTERNS = [
    re.compile(r"sk-[A-Za-z0-9_-]{12,}"),
    re.compile(r"sk-ant-[A-Za-z0-9_-]{12,}"),
    re.compile(r"gh[pousr]_[A-Za-z0-9_]{12,}"),
    re.compile(r"AKIA[0-9A-Z]{16}"),
    re.compile(r"eyJ[A-Za-z0-9_-]{12,}\.[A-Za-z0-9_-]{12,}\.[A-Za-z0-9_-]{12,}"),
]

SYSTEM_PROMPT = """You are an enterprise code quality reviewer. Review the diff strictly.
Return concise markdown with sections: Verdict, Blocking Issues, Non-blocking Issues, Security, Performance, Completeness, Required Follow-up.
You must fail the review if deterministic gates are reported as failing or if acceptance criteria are not demonstrably satisfied.
Do not request or reveal secrets."""

USER_PROMPT_TEMPLATE = """Review this repository diff for an enterprise multi-app monorepo.

Focus areas:
- correctness and task completeness
- secret leakage and credential hygiene
- Supabase auth boundary safety
- Linear/Notion documentation completeness
- theme/style consistency
- performance regressions
- maintainability and file size limits

Diff:
```diff
{diff}
```
"""


def run(command: list[str]) -> subprocess.CompletedProcess[str]:
    return subprocess.run(command, cwd=ROOT, text=True, capture_output=True)


def get_diff() -> str:
    staged = run(["git", "diff", "--cached"])
    diff = staged.stdout.strip()
    if diff:
        return diff
    unstaged = run(["git", "diff", "HEAD"])
    return unstaged.stdout.strip() or "No git diff available. Review repository state and prompt files only."


def redact(text: str) -> str:
    for pattern in REDACT_PATTERNS:
        text = pattern.sub("[REDACTED_SECRET]", text)
    return text


def deterministic_precheck() -> None:
    proc = run([sys.executable, "scripts/quality/secret_scan.py"])
    if proc.returncode != 0:
        print(proc.stdout)
        print(proc.stderr, file=sys.stderr)
        raise SystemExit("Secret scan failed. AI QC aborted to avoid sending sensitive content to a model provider.")


def call_openai(model: str, prompt: str) -> str:
    api_key = os.getenv("OPENAI_API_KEY")
    if not api_key:
        raise SystemExit("OPENAI_API_KEY is not set.")
    payload = {
        "model": model,
        "input": [
            {"role": "system", "content": SYSTEM_PROMPT},
            {"role": "user", "content": prompt},
        ],
    }
    req = urllib.request.Request(
        "https://api.openai.com/v1/responses",
        data=json.dumps(payload).encode("utf-8"),
        headers={"Content-Type": "application/json", "Authorization": f"Bearer {api_key}"},
        method="POST",
    )
    with urllib.request.urlopen(req, timeout=90) as resp:
        data = json.loads(resp.read().decode("utf-8"))
    if "output_text" in data:
        return str(data["output_text"])
    chunks = []
    for item in data.get("output", []):
        for content in item.get("content", []):
            if content.get("type") in {"output_text", "text"}:
                chunks.append(content.get("text", ""))
    return "\n".join(chunks).strip() or json.dumps(data, indent=2)[:4000]


def call_anthropic(model: str, prompt: str) -> str:
    api_key = os.getenv("ANTHROPIC_API_KEY")
    if not api_key:
        raise SystemExit("ANTHROPIC_API_KEY is not set.")
    payload = {
        "model": model,
        "max_tokens": 3000,
        "system": SYSTEM_PROMPT,
        "messages": [{"role": "user", "content": prompt}],
    }
    req = urllib.request.Request(
        "https://api.anthropic.com/v1/messages",
        data=json.dumps(payload).encode("utf-8"),
        headers={
            "Content-Type": "application/json",
            "x-api-key": api_key,
            "anthropic-version": "2023-06-01",
        },
        method="POST",
    )
    with urllib.request.urlopen(req, timeout=90) as resp:
        data = json.loads(resp.read().decode("utf-8"))
    return "\n".join(part.get("text", "") for part in data.get("content", []) if part.get("type") == "text").strip()


def main() -> int:
    parser = argparse.ArgumentParser()
    parser.add_argument("--ci", action="store_true")
    args = parser.parse_args()

    provider = os.getenv("AI_QC_PROVIDER", "off").lower()
    model = os.getenv("AI_QC_MODEL", "gpt-5.5-pro")
    if provider in {"", "off", "none"}:
        print("AI QC skipped because AI_QC_PROVIDER is off.")
        return 0

    deterministic_precheck()
    diff = redact(get_diff())[:120_000]
    prompt = USER_PROMPT_TEMPLATE.format(diff=diff)

    if provider == "openai":
        review = call_openai(model, prompt)
    elif provider in {"anthropic", "claude"}:
        review = call_anthropic(model, prompt)
    else:
        raise SystemExit(f"Unsupported AI_QC_PROVIDER: {provider}")

    OUTPUT.parent.mkdir(parents=True, exist_ok=True)
    OUTPUT.write_text(review + "\n", encoding="utf-8")
    print(review)
    if args.ci and re.search(r"verdict:\s*(fail|blocked|reject)", review, re.IGNORECASE):
        return 1
    return 0


if __name__ == "__main__":
    raise SystemExit(main())
