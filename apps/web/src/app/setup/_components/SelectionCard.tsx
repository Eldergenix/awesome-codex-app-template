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
        flexDirection: "row",
        alignItems: "center",
        gap: "12px",
        padding: "12px 16px",
        borderRadius: "10px",
        border: `1px solid ${selected ? COLORS.primary : COLORS.hairline}`,
        background: selected ? COLORS.primaryTint : COLORS.surface1,
        cursor: "pointer",
        textAlign: "left",
        width: "100%",
        transition: "all 0.2s cubic-bezier(0.4, 0, 0.2, 1)",
        outline: "none",
        position: "relative",
      }}
      onMouseEnter={(e) => {
        e.currentTarget.style.transform = "translateY(-1px)";
        if (!selected) {
          (e.currentTarget as HTMLButtonElement).style.background = COLORS.surface2;
          (e.currentTarget as HTMLButtonElement).style.borderColor = COLORS.hairlineStrong;
          (e.currentTarget as HTMLButtonElement).style.boxShadow = "0 4px 12px rgba(0,0,0,0.03)";
        }
      }}
      onMouseLeave={(e) => {
        e.currentTarget.style.transform = "translateY(0)";
        if (!selected) {
          (e.currentTarget as HTMLButtonElement).style.background = COLORS.surface1;
          (e.currentTarget as HTMLButtonElement).style.borderColor = COLORS.hairline;
          (e.currentTarget as HTMLButtonElement).style.boxShadow = "none";
        }
      }}
    >
      {badge && (
        <span style={{ position: "absolute", top: "10px", right: "12px", fontSize: "9px", fontWeight: 500, letterSpacing: "0.4px", textTransform: "uppercase", color: COLORS.primary, background: COLORS.primaryTint, padding: "1px 6px", borderRadius: "9999px", border: `1px solid rgba(94,106,210,0.3)` }}>
          {badge}
        </span>
      )}
      <div style={{ color: selected ? COLORS.primary : COLORS.inkMuted, transition: "color 0.15s ease", flexShrink: 0 }}>{icon}</div>
      <div style={{ flex: 1 }}>
        <span style={{ display: "block", fontSize: "14px", fontWeight: 500, color: COLORS.ink, letterSpacing: "-0.1px", lineHeight: 1.2 }}>{label}</span>
        {description && <span style={{ display: "block", fontSize: "12px", color: COLORS.inkSubtle, marginTop: "1px", lineHeight: 1.4 }}>{description}</span>}
      </div>
      {selected && (
        <div style={{ flexShrink: 0, width: "18px", height: "18px", borderRadius: "50%", background: COLORS.primary, display: "flex", alignItems: "center", justifyContent: "center", marginLeft: "10px" }}>
          <svg width="10" height="8" viewBox="0 0 10 8" fill="none"><path d="M1 4L3.5 6.5L9 1" stroke="rgb(255, 255, 255)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" /></svg>
        </div>
      )}
    </button>
  );
}
