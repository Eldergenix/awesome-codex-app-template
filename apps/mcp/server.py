from __future__ import annotations

import json
import subprocess
from pathlib import Path
from typing import Literal

from fastmcp import FastMCP
from pydantic import BaseModel, Field

ROOT = Path(__file__).resolve().parents[2]
mcp = FastMCP("enterprise-repo-tools")


class LinearDraft(BaseModel):
    title: str
    issue_type: Literal["bug", "feature", "task", "chore", "security"] = "task"
    acceptance_criteria: list[str] = Field(default_factory=list)
    verification: list[str] = Field(default_factory=lambda: ["pnpm quality"])
    risk: Literal["low", "medium", "high"] = "medium"


def run(command: list[str]) -> str:
    result = subprocess.run(command, cwd=ROOT, text=True, capture_output=True, timeout=20)
    return (result.stdout + result.stderr).strip()[-4000:]


@mcp.tool
def repo_health() -> dict[str, str]:
    """Return a bounded repository health summary for agents."""
    return {
        "git_status": run(["git", "status", "--short"]),
        "quality_hint": "Run python3 scripts/quality/agent_gate.py before completion.",
    }


@mcp.tool
def draft_linear_issue(payload: LinearDraft) -> dict[str, object]:
    """Create a structured Linear issue draft when direct Linear MCP tools are unavailable."""
    return payload.model_dump()


@mcp.tool
def draft_notion_progress(title: str, status: str, summary: str) -> dict[str, str]:
    """Create a structured Notion progress draft when direct Notion MCP tools are unavailable."""
    return {"title": title, "status": status, "summary": summary, "database": "progress"}


@mcp.tool
def quality_gate_summary() -> dict[str, object]:
    """Run the lightweight quality gate and return a bounded result."""
    result = subprocess.run(
        ["python3", "scripts/quality/agent_gate.py", "--changed-only", "--json"],
        cwd=ROOT,
        text=True,
        capture_output=True,
        timeout=90,
    )
    try:
        payload = json.loads(result.stdout)
    except json.JSONDecodeError:
        payload = {"raw": result.stdout[-3000:]}
    return {"ok": result.returncode == 0, "result": payload, "stderr": result.stderr[-1000:]}


if __name__ == "__main__":
    mcp.run()
