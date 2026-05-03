"use client";

import { COLORS } from "../types";
import type { Theme, Selections } from "../types";

const THEMES: {
  id: Theme;
  label: string;
  tagline: string;
  description: string;
  command: string;
  badge?: string;
  previewColors: string[];
}[] = [
  {
    id: "modern",
    label: "Modern / Fluid",
    tagline: "Clean, minimal, glassmorphism",
    description: "Smooth gradients, fluid motion, translucent surfaces. Inspired by Linear and Vercel.",
    command: "npx shadcn@latest registry add @fluid",
    badge: "Popular",
    previewColors: ["#5e6ad2", "#8b96ff", "#3b4abd", "#c7ccff"],
  },
  {
    id: "cyberpunk",
    label: "CyberPunk / Tron",
    tagline: "Dark neon, grid lines, glitch effects",
    description: "High-contrast neon on deep black. Perfect for developer tools, terminals, and games.",
    command: "pnpm dlx shadcn@latest registry add @thegridcn",
    badge: "From thegridcn.com",
    previewColors: ["#00fff7", "#ff2d78", "#7b2fff", "#1a1a2e"],
  },
  {
    id: "custom",
    label: "Custom Theme",
    tagline: "Bring your own palette",
    description: "Skip registry installs. DESIGN.md gets a blank template — populate it with your brand tokens.",
    command: "No install — manual DESIGN.md setup",
    previewColors: ["#8a8f98", "#d0d6e0", "#62666d", "#f7f8f8"],
  },
];

interface Props {
  selections: Selections;
  onChange: (value: Theme) => void;
}

export function Step3Theme({ selections, onChange }: Props) {
  return (
    <div>
      <p style={{ fontSize: "12px", fontWeight: 500, letterSpacing: "0.4px", textTransform: "uppercase", color: COLORS.primary, marginBottom: "8px" }}>Step 3 of 5</p>
      <h2 style={{ fontSize: "28px", fontWeight: 600, letterSpacing: "-0.6px", lineHeight: 1.2, color: COLORS.ink, margin: 0 }}>Choose your visual theme</h2>
      <p style={{ fontSize: "14px", color: COLORS.inkSubtle, marginTop: "8px", marginBottom: "28px", lineHeight: 1.6 }}>
        The shadcn registry for your chosen theme will be installed automatically.
      </p>
      <div style={{ display: "flex", flexDirection: "column", gap: "12px" }}>
        {THEMES.map((theme) => (
          <button
            key={theme.id}
            id={`theme-${theme.id}`}
            onClick={() => onChange(theme.id)}
            style={{
              display: "grid",
              gridTemplateColumns: "1fr auto",
              gap: "16px",
              padding: "20px 24px",
              borderRadius: "12px",
              border: `1px solid ${selections.theme === theme.id ? COLORS.primary : COLORS.hairline}`,
              background: selections.theme === theme.id ? COLORS.primaryTint : COLORS.surface1,
              cursor: "pointer",
              textAlign: "left",
              width: "100%",
              transition: "all 0.15s ease",
              outline: "none",
            }}
            onMouseEnter={(e) => {
              if (selections.theme !== theme.id) {
                (e.currentTarget as HTMLButtonElement).style.background = COLORS.surface2;
                (e.currentTarget as HTMLButtonElement).style.borderColor = COLORS.hairlineStrong;
              }
            }}
            onMouseLeave={(e) => {
              if (selections.theme !== theme.id) {
                (e.currentTarget as HTMLButtonElement).style.background = COLORS.surface1;
                (e.currentTarget as HTMLButtonElement).style.borderColor = COLORS.hairline;
              }
            }}
          >
            <div>
              <div style={{ display: "flex", alignItems: "center", gap: "10px", marginBottom: "4px" }}>
                <span style={{ fontSize: "15px", fontWeight: 600, color: COLORS.ink, letterSpacing: "-0.2px" }}>{theme.label}</span>
                {theme.badge && (
                  <span style={{ fontSize: "10px", fontWeight: 500, letterSpacing: "0.4px", textTransform: "uppercase", color: COLORS.primary, background: COLORS.primaryTint, padding: "2px 8px", borderRadius: "9999px", border: `1px solid rgba(94,106,210,0.3)` }}>
                    {theme.badge}
                  </span>
                )}
              </div>
              <p style={{ fontSize: "12px", color: COLORS.inkSubtle, margin: "0 0 10px", lineHeight: 1.5 }}>{theme.description}</p>
              <code style={{ fontSize: "11px", color: COLORS.inkMuted, background: "rgba(255,255,255,0.06)", padding: "3px 8px", borderRadius: "5px", fontFamily: "ui-monospace, monospace" }}>
                {theme.command}
              </code>
            </div>
            <div style={{ display: "flex", flexDirection: "column", alignItems: "flex-end", justifyContent: "space-between" }}>
              <div style={{ display: "flex", gap: "4px" }}>
                {theme.previewColors.map((color, i) => (
                  <span key={i} style={{ width: "14px", height: "14px", borderRadius: "50%", background: color, border: "1px solid rgba(255,255,255,0.1)", flexShrink: 0 }} />
                ))}
              </div>
              {selections.theme === theme.id && (
                <span style={{ width: "20px", height: "20px", borderRadius: "50%", background: COLORS.primary, display: "flex", alignItems: "center", justifyContent: "center" }}>
                  <svg width="10" height="8" viewBox="0 0 10 8" fill="none"><path d="M1 4L3.5 6.5L9 1" stroke="#fff" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" /></svg>
                </span>
              )}
            </div>
          </button>
        ))}
      </div>
    </div>
  );
}
