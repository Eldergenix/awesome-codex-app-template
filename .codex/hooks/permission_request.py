#!/usr/bin/env python3
import sys
from pathlib import Path
sys.path.insert(0, str(Path(__file__).resolve().parents[2]))
from scripts.hooks.agent_hooks import codex_permission_request

if __name__ == "__main__":
    codex_permission_request()
