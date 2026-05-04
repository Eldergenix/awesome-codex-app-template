from __future__ import annotations

import datetime as _dt
import json
import os
import re
import subprocess
import sys
from pathlib import Path
from typing import Any

ROOT = Path(__file__).resolve().parents[2]
STATE_DIR = ROOT / ".agents" / "state"
AUDIT_DIR = ROOT / ".agents" / "audit"

SECRET_PATTERNS: list[tuple[str, re.Pattern[str]]] = [
    ("OpenAI key", re.compile(r"sk-[A-Za-z0-9_-]{24,}")),
    ("Anthropic key", re.compile(r"sk-ant-[A-Za-z0-9_-]{24,}")),
    ("GitHub token", re.compile(r"gh[pousr]_[A-Za-z0-9_]{30,}")),
    ("AWS access key", re.compile(r"AKIA[0-9A-Z]{16}")),
    ("Private key", re.compile(r"-----BEGIN [A-Z ]*PRIVATE KEY-----")),
    ("Slack token", re.compile(r"xox[baprs]-[A-Za-z0-9-]{20,}")),
    ("Linear API key", re.compile(r"lin_api_[A-Za-z0-9]{20,}")),
    ("JWT", re.compile(r"eyJ[A-Za-z0-9_-]{20,}\.[A-Za-z0-9_-]{20,}\.[A-Za-z0-9_-]{20,}")),
]

RISKY_COMMANDS: list[tuple[re.Pattern[str], str]] = [
    (re.compile(r"\brm\s+-rf\s+(/|~|\$HOME)(\s|$)"), "Refusing destructive rm command outside a scoped project path."),
    (re.compile(r"\bsudo\b"), "Refusing sudo in agent session. Use documented local setup steps instead."),
    (re.compile(r"\bchmod\s+777\b"), "Refusing chmod 777. Use least-privilege file permissions."),
    (re.compile(r"\bgit\s+push\s+--force\b"), "Refusing force push from an agent hook."),
    (re.compile(r"\bgit\s+reset\s+--hard\b"), "Refusing hard reset from an agent hook."),
    (re.compile(r"\bgit\s+clean\s+-fdx\b"), "Refusing destructive git clean from an agent hook."),
    (re.compile(r"\b(curl|wget)\b[^|\n]*\|\s*(sh|bash)\b"), "Refusing remote script piping into a shell."),
    (re.compile(r"\b(cat|less|more|head|tail)\b[^\n]*(\.env|\.pem|\.key|\.p8|\.p12)"), "Refusing command likely to print secrets."),
    (re.compile(r"(^|[;&|])\s*(env|printenv)\s*($|[;&|])"), "Refusing full environment dump because it can leak secrets."),
]

PROTECTED_PATHS: list[re.Pattern[str]] = [
    re.compile(r"(^|/)\.env(\.|$)?"),
    re.compile(r"\.(pem|key|p8|p12)$"),
    re.compile(r"(^|/)\.git/"),
    re.compile(r"(^|/)node_modules/"),
    re.compile(r"(^|/)\.next/"),
    re.compile(r"(^|/)\.turbo/"),
]

DESTRUCTIVE_MCP = re.compile(r"mcp__.*__(delete|remove|destroy|archive|purge).*", re.IGNORECASE)


def read_event() -> dict[str, Any]:
    raw = sys.stdin.read()
    if not raw.strip():
        return {}
    try:
        return json.loads(raw)
    except json.JSONDecodeError:
        return {"raw": raw}


def emit_json(payload: dict[str, Any]) -> None:
    print(json.dumps(payload, separators=(",", ":")))


def fail_stderr(reason: str) -> None:
    print(reason, file=sys.stderr)
    raise SystemExit(2)


def repo_rel(path: str | None) -> str:
    if not path:
        return ""
    candidate = Path(path)
    if candidate.is_absolute():
        try:
            return str(candidate.relative_to(ROOT))
        except ValueError:
            return str(candidate)
    return str(candidate)


def tool_input(event: dict[str, Any]) -> dict[str, Any]:
    value = event.get("tool_input")
    return value if isinstance(value, dict) else {}


def command_from_event(event: dict[str, Any]) -> str:
    data = tool_input(event)
    for key in ("command", "cmd", "shell_command"):
        value = data.get(key)
        if isinstance(value, str):
            return value
    return ""


def paths_from_event(event: dict[str, Any]) -> list[str]:
    data = tool_input(event)
    found: list[str] = []
    for key in ("file_path", "path", "filename", "target_file"):
        value = data.get(key)
        if isinstance(value, str):
            found.append(repo_rel(value))
    edits = data.get("edits")
    if isinstance(edits, list):
        for edit in edits:
            if isinstance(edit, dict):
                value = edit.get("file_path") or edit.get("path")
                if isinstance(value, str):
                    found.append(repo_rel(value))
    return sorted(set(filter(None, found)))


def has_secret_text(text: str) -> str | None:
    for name, pattern in SECRET_PATTERNS:
        if pattern.search(text):
            return f"Potential {name} detected. Remove the secret from the prompt or file and rotate it if it was real."
    return None


def assess_tool_use(event: dict[str, Any]) -> str | None:
    tool_name = str(event.get("tool_name") or "")
    command = command_from_event(event)
    if command:
        secret_reason = has_secret_text(command)
        if secret_reason:
            return secret_reason
        for pattern, reason in RISKY_COMMANDS:
            if pattern.search(command):
                return reason
    for path in paths_from_event(event):
        for pattern in PROTECTED_PATHS:
            if pattern.search(path):
                return f"Refusing to read or write protected path: {path}"
    if DESTRUCTIVE_MCP.fullmatch(tool_name) and os.getenv("ALLOW_AGENT_DESTRUCTIVE_MCP") != "1":
        return f"Refusing destructive MCP tool without ALLOW_AGENT_DESTRUCTIVE_MCP=1: {tool_name}"
    return None


def audit(event: dict[str, Any], note: str) -> None:
    AUDIT_DIR.mkdir(parents=True, exist_ok=True)
    entry = {
        "ts": _dt.datetime.now(_dt.timezone.utc).isoformat(),
        "event": event.get("hook_event_name"),
        "tool": event.get("tool_name"),
        "cwd": event.get("cwd"),
        "note": note,
    }
    with (AUDIT_DIR / "hooks.jsonl").open("a", encoding="utf-8") as fh:
        fh.write(json.dumps(entry, separators=(",", ":")) + "\n")


def run_quality_changed() -> tuple[int, str]:
    command = [sys.executable, str(ROOT / "scripts" / "quality" / "agent_gate.py"), "--changed-only", "--json"]
    result = subprocess.run(command, cwd=ROOT, text=True, capture_output=True, timeout=75)
    output = (result.stdout + "\n" + result.stderr).strip()
    return result.returncode, output[-4000:]


def codex_session_start() -> None:
    _ = read_event()
    context = (
        "Repository operating context: read AGENTS.md, CODE-QUALITY.md, PLAN.MD, MEMORY.MD, "
        "CONTINUITY.MD, and DESIGN.md before code changes. Use Linear and Notion MCP workflows "
        "when connected. Run deterministic quality gates before declaring completion."
    )
    emit_json({"hookSpecificOutput": {"hookEventName": "SessionStart", "additionalContext": context}})


def claude_session_start() -> None:
    _ = read_event()
    print(
        "Repository operating context: read AGENTS.md, CODE-QUALITY.md, PLAN.MD, MEMORY.MD, "
        "CONTINUITY.MD, and DESIGN.md before code changes. Run quality gates before completion."
    )


def codex_user_prompt_submit() -> None:
    event = read_event()
    prompt = str(event.get("prompt") or "")
    reason = has_secret_text(prompt)
    if reason:
        emit_json({"decision": "block", "reason": reason})
    else:
        emit_json({"continue": True, "suppressOutput": True})


def claude_user_prompt_submit() -> None:
    event = read_event()
    prompt = str(event.get("prompt") or "")
    reason = has_secret_text(prompt)
    if reason:
        fail_stderr(reason)


def codex_pre_tool_use() -> None:
    event = read_event()
    reason = assess_tool_use(event)
    if reason:
        emit_json({
            "systemMessage": reason,
            "hookSpecificOutput": {
                "hookEventName": "PreToolUse",
                "permissionDecision": "deny",
                "permissionDecisionReason": reason,
            },
        })
    else:
        audit(event, "pre-tool allowed")


def claude_pre_tool_use() -> None:
    event = read_event()
    reason = assess_tool_use(event)
    if reason:
        fail_stderr(reason)
    audit(event, "pre-tool allowed")


def codex_permission_request() -> None:
    event = read_event()
    reason = assess_tool_use(event)
    if reason:
        emit_json({
            "hookSpecificOutput": {
                "hookEventName": "PermissionRequest",
                "decision": {"behavior": "deny", "message": reason},
            }
        })
    else:
        emit_json({"hookSpecificOutput": {"hookEventName": "PermissionRequest", "decision": {"behavior": "allow"}}})


def codex_post_tool_use() -> None:
    event = read_event()
    audit(event, "post-tool audit")
    rc, output = run_quality_changed()
    if rc != 0:
        reason = "Changed-file quality gate failed after tool use. Fix before continuing.\n" + output
        emit_json({
            "decision": "block",
            "reason": reason,
            "hookSpecificOutput": {"hookEventName": "PostToolUse", "additionalContext": reason},
        })


def claude_post_tool_use() -> None:
    event = read_event()
    audit(event, "post-tool audit")
    rc, output = run_quality_changed()
    if rc != 0:
        fail_stderr("Changed-file quality gate failed after tool use. Fix before continuing.\n" + output)


def codex_stop() -> None:
    event = read_event()
    rc, output = run_quality_changed()
    if rc == 0:
        emit_json({"continue": True, "suppressOutput": True})
        return
    reason = "Final quality gate failed. Continue by fixing these issues before summarizing completion.\n" + output
    if event.get("stop_hook_active"):
        emit_json({"continue": False, "stopReason": reason, "systemMessage": reason})
    else:
        emit_json({"decision": "block", "reason": reason})


def claude_stop() -> None:
    _ = read_event()
    rc, output = run_quality_changed()
    if rc != 0:
        fail_stderr("Final quality gate failed. Fix before completing.\n" + output)
