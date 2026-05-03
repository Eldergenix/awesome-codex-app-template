.PHONY: quality web mobile api mcp macos

quality:
	python3 scripts/quality/agent_gate.py

web:
	pnpm --filter @repo/web dev

mobile:
	pnpm --filter @repo/mobile dev

api:
	cd apps/api && uv run uvicorn app.main:app --reload

mcp:
	cd apps/mcp && uv run python server.py

macos:
	cd apps/macos && ./scripts/build-rust.sh && swift build
