"use client";

import { COLORS, type Selections } from "../types";

interface Props {
  selections: Selections;
  onChange: (value: boolean) => void;
}

function ToggleCard({ active, label, description, onClick, id }: { active: boolean; label: string; description: string; onClick: () => void; id: string }) {
  return (
    <button
      id={id}
      onClick={onClick}
      style={{
        display: "flex",
        flexDirection: "row",
        alignItems: "center",
        gap: "12px",
        padding: "12px 16px",
        borderRadius: "12px",
        border: `1px solid ${active ? COLORS.primary : COLORS.hairline}`,
        background: active ? COLORS.primaryTint : COLORS.surface1,
        cursor: "pointer",
        textAlign: "left",
        width: "100%",
        transition: "all 0.15s ease",
        outline: "none",
        position: "relative",
      }}
      onMouseEnter={(e) => { if (!active) { (e.currentTarget as HTMLButtonElement).style.background = COLORS.surface2; (e.currentTarget as HTMLButtonElement).style.borderColor = COLORS.hairlineStrong; } }}
      onMouseLeave={(e) => { if (!active) { (e.currentTarget as HTMLButtonElement).style.background = COLORS.surface1; (e.currentTarget as HTMLButtonElement).style.borderColor = COLORS.hairline; } }}
    >
      <div style={{ fontSize: "18px", flexShrink: 0, color: active ? COLORS.primary : COLORS.inkTertiary }}>{active ? "✦" : "○"}</div>
      <div style={{ flex: 1 }}>
        <div style={{ fontSize: "14px", fontWeight: 600, color: COLORS.ink, marginBottom: "2px" }}>{label}</div>
        <div style={{ fontSize: "12px", color: COLORS.inkSubtle, lineHeight: 1.5 }}>{description}</div>
      </div>
      {active && (
        <div style={{ flexShrink: 0, width: "18px", height: "18px", borderRadius: "50%", background: COLORS.primary, display: "flex", alignItems: "center", justifyContent: "center" }}>
          <svg width="10" height="8" viewBox="0 0 10 8" fill="none"><path d="M1 4L3.5 6.5L9 1" stroke="rgb(255, 255, 255)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" /></svg>
        </div>
      )}
    </button>
  );
}

export function Step4Animations({ selections, onChange }: Props) {
  return (
    <div>
      <p style={{ fontSize: "11px", fontWeight: 600, letterSpacing: "0.4px", textTransform: "uppercase", color: COLORS.primary, marginBottom: "4px" }}>Step 4 of 5</p>
      <h2 style={{ fontSize: "24px", fontWeight: 600, letterSpacing: "-0.6px", lineHeight: 1.2, color: COLORS.ink, margin: 0 }}>Subtle animations?</h2>
      <p style={{ fontSize: "13px", color: COLORS.inkSubtle, marginTop: "8px", marginBottom: "16px", lineHeight: 1.6 }}>
        Installs <code style={{ fontSize: "12px", background: "rgba(255,255,255,0.06)", padding: "2px 6px", borderRadius: "4px", fontFamily: "ui-monospace, monospace" }}>@animate-ui/primitives-texts-sliding-number</code> and <code style={{ fontSize: "12px", background: "rgba(255,255,255,0.06)", padding: "2px 6px", borderRadius: "4px", fontFamily: "ui-monospace, monospace" }}>motion</code> (Framer Motion v11).
      </p>
      <div style={{ display: "flex", flexDirection: "column", gap: "10px" }}>
        <ToggleCard
          id="animations-yes"
          active={selections.animations === true}
          label="Yes, add animations"
          description="Sliding numbers, entrance transitions, hover lifts. Respects prefers-reduced-motion."
          onClick={() => onChange(true)}
        />
        <ToggleCard
          id="animations-no"
          active={selections.animations === false}
          label="No animations"
          description="Pure static UI, no animation dependencies. Ideal for data-dense tools or accessibility-first builds."
          onClick={() => onChange(false)}
        />
      </div>
      {selections.animations === true && (
        <div style={{ marginTop: "16px", padding: "14px 16px", borderRadius: "8px", background: COLORS.primaryTint, border: `1px solid rgba(94,106,210,0.25)`, fontSize: "12px", color: COLORS.inkMuted, lineHeight: 1.6 }}>
          <strong style={{ color: COLORS.ink }}>Will install:</strong>
          <div style={{ marginTop: "6px", display: "flex", flexDirection: "column", gap: "3px", fontFamily: "ui-monospace, monospace", fontSize: "11px" }}>
            <span>pnpm dlx shadcn@latest add @animate-ui/primitives-texts-sliding-number</span>
            <span>pnpm add motion --filter @repo/web</span>
          </div>
        </div>
      )}
    </div>
  );
}
