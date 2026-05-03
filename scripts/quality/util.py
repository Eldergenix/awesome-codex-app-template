from __future__ import annotations

import os
import subprocess
from pathlib import Path
from typing import Iterable

ROOT = Path(__file__).resolve().parents[2]

SKIP_DIRS = {
    ".git", "node_modules", ".next", ".turbo", ".expo", "dist", "build", "coverage",
    ".venv", "__pycache__", ".pytest_cache", "target", ".build", ".agent-state"
}

SKIP_SUFFIXES = {".png", ".jpg", ".jpeg", ".gif", ".webp", ".ico", ".pdf", ".zip", ".gz", ".lockb"}
SKIP_FILES = {"pnpm-lock.yaml", "package-lock.json", "yarn.lock", "Cargo.lock"}


def git_available() -> bool:
    return (ROOT / ".git").exists()


def run_git(args: list[str]) -> list[str]:
    if not git_available():
        return []
    result = subprocess.run(["git", *args], cwd=ROOT, text=True, capture_output=True)
    if result.returncode != 0:
        return []
    return [line.strip() for line in result.stdout.splitlines() if line.strip()]


def staged_files() -> list[Path]:
    return [ROOT / item for item in run_git(["diff", "--cached", "--name-only", "--diff-filter=ACM"])]


def changed_files() -> list[Path]:
    names = set(run_git(["diff", "--name-only", "--diff-filter=ACM", "HEAD"]))
    names.update(run_git(["ls-files", "--others", "--exclude-standard"]))
    return [ROOT / item for item in sorted(names)]


def should_skip(path: Path) -> bool:
    rel_parts = set(path.relative_to(ROOT).parts) if path.is_absolute() and path.exists() else set(path.parts)
    if rel_parts & SKIP_DIRS:
        return True
    if path.name in SKIP_FILES:
        return True
    if path.suffix.lower() in SKIP_SUFFIXES:
        return True
    return False


def all_files() -> Iterable[Path]:
    for dirpath, dirnames, filenames in os.walk(ROOT):
        current = Path(dirpath)
        dirnames[:] = [d for d in dirnames if d not in SKIP_DIRS]
        for filename in filenames:
            path = current / filename
            if not should_skip(path):
                yield path


def selected_files(staged: bool = False, changed_only: bool = False) -> list[Path]:
    if staged:
        files = staged_files()
    elif changed_only:
        files = changed_files()
    else:
        files = list(all_files())
    if not files and (staged or changed_only):
        return []
    return [p for p in files if p.exists() and p.is_file() and not should_skip(p)]


def read_text(path: Path) -> str:
    try:
        return path.read_text(encoding="utf-8")
    except UnicodeDecodeError:
        return ""


def rel(path: Path) -> str:
    try:
        return str(path.relative_to(ROOT))
    except ValueError:
        return str(path)
