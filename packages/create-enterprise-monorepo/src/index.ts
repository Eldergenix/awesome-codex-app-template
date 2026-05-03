#!/usr/bin/env node
import { execSync } from "child_process";
import { existsSync, mkdirSync } from "fs";
import path from "path";
import kleur from "kleur";
import prompts from "prompts";
import degit from "degit";

const REPO = "Eldergenix/enterprise-monorepo-template";
const VERSION = "1.0.2";

function log(msg: string) {
  process.stdout.write(msg + "\n");
}

function step(msg: string) {
  log(kleur.bold().cyan("→ ") + msg);
}

function success(msg: string) {
  log(kleur.bold().green("✓ ") + msg);
}

function warn(msg: string) {
  log(kleur.bold().yellow("⚠ ") + msg);
}

function err(msg: string) {
  log(kleur.bold().red("✗ ") + msg);
}

function hr() {
  log(kleur.dim("─".repeat(56)));
}

async function main() {
  log("");
  log(kleur.bold().white("  Enterprise Monorepo Template") + kleur.dim(` v${VERSION}`));
  log(kleur.dim("  Next.js · Expo · macOS · FastAPI · MCP · AI SDK · Supabase"));
  log("");
  hr();
  log("");

  // 1. Project name
  let projectName = process.argv[2];

  if (!projectName) {
    const response = await prompts(
      {
        type: "text",
        name: "projectName",
        message: "Project name:",
        initial: "my-app",
        validate: (v: string) =>
          /^[a-z0-9-_]+$/.test(v) || "Use lowercase letters, numbers, hyphens, underscores",
      },
      { onCancel: () => process.exit(1) }
    );
    projectName = response.projectName as string;
  }

  const targetDir = path.resolve(process.cwd(), projectName);

  if (existsSync(targetDir)) {
    err(`Directory "${projectName}" already exists. Choose a different name.`);
    process.exit(1);
  }

  log("");

  // 2. Confirm
  const { confirm } = await prompts(
    {
      type: "confirm",
      name: "confirm",
      message: `Create "${projectName}" from template?`,
      initial: true,
    },
    { onCancel: () => process.exit(1) }
  );

  if (!confirm) process.exit(0);

  log("");

  // 3. Clone via degit (no git history)
  step(`Downloading template into ./${projectName}/`);
  try {
    const emitter = degit(REPO, { cache: false, force: true, verbose: false });
    emitter.on("warn", (info: { message: string }) => warn(info.message));
    await emitter.clone(targetDir);
    success("Template downloaded");
  } catch (e) {
    err("Could not download template. Check your internet connection.");
    err(String(e));
    process.exit(1);
  }

  // 4. Detect package manager
  let pm = "pnpm";
  try {
    execSync("pnpm --version", { stdio: "ignore" });
  } catch {
    try {
      execSync("npm --version", { stdio: "ignore" });
      pm = "npm";
    } catch {
      pm = "yarn";
    }
  }

  // 5. Install
  step(`Installing dependencies with ${pm}...`);
  try {
    if (pm === "pnpm") {
      execSync("corepack enable || true", { cwd: targetDir, stdio: "ignore" });
    }
    execSync(`${pm} install --no-frozen-lockfile`, {
      cwd: targetDir,
      stdio: "inherit",
    });
    success("Dependencies installed");
  } catch {
    warn("Dependency install failed — run it manually inside the project.");
  }

  // 6. Copy .env.example → .env.local
  step("Creating .env.local from .env.example...");
  try {
    execSync(`cp .env.example .env.local`, { cwd: targetDir, stdio: "ignore" });
    success(".env.local created — fill in your credentials");
  } catch {
    warn(".env.example not found — create .env.local manually");
  }

  // Done
  log("");
  hr();
  log("");
  log(kleur.bold().white("  Your template is ready. ✦"));
  log("");
  log("  " + kleur.dim("Next steps:"));
  log("");
  log("  " + kleur.cyan(`cd ${projectName}`));
  log("  " + kleur.cyan(`${pm} run --filter @repo/web dev`) + kleur.dim("   # start Next.js at localhost:3000"));
  log("  " + kleur.cyan("open http://localhost:3000/setup") + kleur.dim("   # run the setup wizard"));
  log("");
  log("  " + kleur.dim("Read AGENTS.md, DESIGN.md, and MEMORY.MD before making changes."));
  log("");
  hr();
  log("");
}

main().catch((e: unknown) => {
  err(String(e));
  process.exit(1);
});
