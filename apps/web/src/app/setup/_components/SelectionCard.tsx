"use client";

import { COLORS } from "./types";

interface SelectionCardProps {
  id: string;
  label: string;
  description?: string;
  icon: React.ReactNode;
  selected: boolean;
  onClick: () => void;
  badge?: string;
}

export function SelectionCard({ id, label, description, icon, selected, onClick, badge }: SelectionCardProps) {
  return (
    <button
      id={id}
      onClick={onClick}
      style={{
        display: "flex",
        flexDirection: "column",
        gap: "10px",
        padding: "20px",
        borderRadius: "12px",
        border: `1px solid ${selected ? COLORS.primary : COLORS.hairline}`,
        background: selected ? COLORS.primaryTint : COLORS.surface1,
        cursor: "pointer",
        textAlign: "left",
        width: "100%",
        transition: "all 0.15s ease",
        outline: "none",
        position: "relative",
      }}
      onMouseEnter={(e) => {
        if (!selected) {
          (e.currentTarget as HTMLButtonElement).style.background = COLORS.surface2;
          (e.currentTarget as HTMLButtonElement).style.borderColor = COLORS.hairlineStrong;
        }
      }}
      onMouseLeave={(e) => {
        if (!selected) {
          (e.currentTarget as HTMLButtonElement).style.background = COLORS.surface1;
          (e.currentTarget as HTMLButtonElement).style.borderColor = COLORS.hairline;
        }
      }}
    >
      {badge && (
        <span style={{ position: "absolute", top: "12px", right: "12px", fontSize: "10px", fontWeight: 500, letterSpacing: "0.4px", textTransform: "uppercase", color: COLORS.primary, background: COLORS.primaryTint, padding: "2px 8px", borderRadius: "9999px", border: `1px solid rgba(94,106,210,0.3)` }}>
          {badge}
        </span>
      )}
      <span style={{ color: selected ? COLORS.primary : COLORS.inkMuted, transition: "color 0.15s ease" }}>{icon}</span>
      <span>
        <span style={{ display: "block", fontSize: "14px", fontWeight: 500, color: COLORS.ink, letterSpacing: "-0.1px", lineHeight: 1.3 }}>{label}</span>
        {description && <span style={{ display: "block", fontSize: "12px", color: COLORS.inkSubtle, marginTop: "3px", lineHeight: 1.5 }}>{description}</span>}
      </span>
      {selected && (
        <span style={{ position: "absolute", top: "12px", right: badge ? "70px" : "12px", width: "18px", height: "18px", borderRadius: "50%", background: COLORS.primary, display: "flex", alignItems: "center", justifyContent: "center" }}>
          <svg width="10" height="8" viewBox="0 0 10 8" fill="none"><path d="M1 4L3.5 6.5L9 1" stroke="#fff" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" /></svg>
        </span>
      )}
    </button>
  );
}
