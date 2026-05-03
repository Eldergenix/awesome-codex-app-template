"use client";

import { COLORS } from "./types";
import type { Selections } from "./types";

function buildCommandList(s: Selections): { cmd: string; reason: string }[] {
  const cmds: { cmd: string; reason: string }[] = [];

  // Always check/init shadcn if not custom
  if (s.theme !== "custom") {
    cmds.push({ cmd: "pnpm dlx shadcn@latest init --defaults (if components.json absent)", reason: "Bootstrap shadcn registry" });
  }

  if (s.theme === "modern") {
    cmds.push({ cmd: "npx shadcn@latest registry add @fluid", reason: "Modern / Fluid theme" });
  }

  if (s.theme === "cyberpunk") {
    cmds.push({ cmd: "pnpm dlx shadcn@latest registry add @thegridcn", reason: "CyberPunk / Tron theme" });
    if (s.layoutStyle === "dashboard") {
      cmds.push({ cmd: "→ Dashboard template from thegridcn.com/templates/dashboard", reason: "Layout: Dashboard" });
    } else if (s.layoutStyle === "marketing") {
      cmds.push({ cmd: "→ Landing template from thegridcn.com/templates/landing", reason: "Layout: Marketing" });
    } else if (s.layoutStyle === "analytics") {
      cmds.push({ cmd: "→ Analytics template from thegridcn.com/templates/analytics", reason: "Layout: Analytics" });
    }
  }

  if (s.animations) {
    cmds.push({ cmd: "pnpm dlx shadcn@latest add @animate-ui/primitives-texts-sliding-number", reason: "Animate UI text primitives" });
    cmds.push({ cmd: "pnpm add motion --filter @repo/web", reason: "Framer Motion v11 peer dep" });
  }

  if (s.payingCustomers && s.theme !== "cyberpunk") {
    cmds.push({ cmd: "pnpm dlx shadcn@latest registry add @thegridcn", reason: "Billing / pricing components" });
  }

  cmds.push({ cmd: "✎ Mutate DESIGN.md — write Active Theme Configuration block", reason: "Document chosen theme" });
  cmds.push({ cmd: "✎ Append dated entry to CONTINUITY.MD", reason: "Track setup run" });

  return cmds;
}

const LABEL_MAP: Record<string, string> = {
  web: "Web App",
  mobile: "Mobile (iOS + Android)",
  macos: "macOS App",
  chrome: "Chrome Extension",
  windows: "Windows App",
  marketing: "Marketing / Landing",
  dashboard: "Dashboard",
  marketplace: "Marketplace",
  blog: "Blog / News",
  terminal: "Terminal / CLI",
  ide: "IDE / Code Editor",
  analytics: "Analytics",
  modern: "Modern / Fluid",
  cyberpunk: "CyberPunk / Tron",
  custom: "Custom Theme",
};

interface Props {
  selections: Selections;
  onConfirm: () => void;
  onBack: () => void;
}

export function Review({ selections, onConfirm, onBack }: Props) {
  const commands = buildCommandList(selections);

  const summaryItems = [
    { label: "App Type", value: selections.appType ? LABEL_MAP[selections.appType] : "—" },
    { label: "Layout", value: selections.layoutStyle ? LABEL_MAP[selections.layoutStyle] : "—" },
    { label: "Theme", value: selections.theme ? LABEL_MAP[selections.theme] : "—" },
    { label: "Animations", value: selections.animations === true ? "Yes" : selections.animations === false ? "No" : "—" },
    { label: "Paying Customers", value: selections.payingCustomers === true ? "Yes" : selections.payingCustomers === false ? "No" : "—" },
  ];

  return (
    <div>
      <p style={{ fontSize: "12px", fontWeight: 500, letterSpacing: "0.4px", textTransform: "uppercase", color: COLORS.primary, marginBottom: "8px" }}>Review</p>
      <h2 style={{ fontSize: "28px", fontWeight: 600, letterSpacing: "-0.6px", lineHeight: 1.2, color: COLORS.ink, margin: 0 }}>Ready to configure</h2>
      <p style={{ fontSize: "14px", color: COLORS.inkSubtle, marginTop: "8px", marginBottom: "28px", lineHeight: 1.6 }}>
        Review your selections and the commands that will run. This is dev-only and will not execute on deployed builds.
      </p>

      {/* Selections summary */}
      <div style={{ display: "grid", gridTemplateColumns: "repeat(5, 1fr)", gap: "8px", marginBottom: "24px" }}>
        {summaryItems.map((item) => (
          <div key={item.label} style={{ padding: "14px 16px", borderRadius: "10px", background: COLORS.surface1, border: `1px solid ${COLORS.hairline}` }}>
            <div style={{ fontSize: "11px", color: COLORS.inkTertiary, textTransform: "uppercase", letterSpacing: "0.4px", marginBottom: "6px" }}>{item.label}</div>
            <div style={{ fontSize: "13px", fontWeight: 500, color: COLORS.ink }}>{item.value}</div>
          </div>
        ))}
      </div>

      {/* Commands list */}
      <div style={{ borderRadius: "10px", border: `1px solid ${COLORS.hairline}`, overflow: "hidden", marginBottom: "28px" }}>
        <div style={{ padding: "12px 16px", borderBottom: `1px solid ${COLORS.hairline}`, background: COLORS.surface1 }}>
          <span style={{ fontSize: "12px", fontWeight: 500, color: COLORS.inkMuted }}>Commands to execute</span>
        </div>
        {commands.map((item, i) => (
          <div
            key={i}
            style={{
              display: "grid",
              gridTemplateColumns: "1fr auto",
              gap: "16px",
              alignItems: "center",
              padding: "10px 16px",
              borderBottom: i < commands.length - 1 ? `1px solid ${COLORS.hairline}` : undefined,
              background: "transparent",
            }}
          >
            <code style={{ fontSize: "11px", color: COLORS.inkMuted, fontFamily: "ui-monospace, monospace" }}>{item.cmd}</code>
            <span style={{ fontSize: "11px", color: COLORS.inkTertiary, whiteSpace: "nowrap" }}>{item.reason}</span>
          </div>
        ))}
      </div>

      <div style={{ display: "flex", gap: "10px" }}>
        <button
          id="review-back"
          onClick={onBack}
          style={{ padding: "10px 20px", borderRadius: "8px", border: `1px solid ${COLORS.hairline}`, background: "transparent", color: COLORS.inkMuted, fontSize: "14px", fontWeight: 500, cursor: "pointer", transition: "all 0.15s ease" }}
        >
          ← Back
        </button>
        <button
          id="review-confirm"
          onClick={onConfirm}
          style={{ flex: 1, padding: "12px 24px", borderRadius: "8px", border: "none", background: COLORS.primary, color: "#fff", fontSize: "14px", fontWeight: 600, cursor: "pointer", letterSpacing: "-0.1px", transition: "all 0.15s ease" }}
          onMouseEnter={(e) => { (e.currentTarget as HTMLButtonElement).style.background = COLORS.primaryHover; }}
          onMouseLeave={(e) => { (e.currentTarget as HTMLButtonElement).style.background = COLORS.primary; }}
        >
          Run Configuration →
        </button>
      </div>
    </div>
  );
}
