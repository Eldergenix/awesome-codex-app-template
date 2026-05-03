# apps/macos AGENTS.md

- Keep SwiftUI views small and move core logic into Rust or Swift services.
- Do not add unsafe Rust without a safety comment and test coverage.
- Keep FFI boundaries explicit and documented.
- Run `cd apps/macos/rust-core && cargo test` and `cd apps/macos && swift build` after changes.
