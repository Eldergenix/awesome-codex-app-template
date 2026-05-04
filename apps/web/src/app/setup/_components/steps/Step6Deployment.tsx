"use client";

import { COLORS, type DeploymentType, type Selections } from "../types";

interface Props {
  selections: Selections;
  onChange: (value: DeploymentType) => void;
}

function SelectionCard({ active, label, description, onClick, id }: { active: boolean; label: string; description: string; onClick: () => void; id: string }) {
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

export function Step6Deployment({ selections, onChange }: Props) {
  return (
    <div>
      <p style={{ fontSize: "11px", fontWeight: 600, letterSpacing: "0.4px", textTransform: "uppercase", color: COLORS.primary, marginBottom: "4px" }}>Step 6 of 6</p>
      <h2 style={{ fontSize: "24px", fontWeight: 600, letterSpacing: "-0.6px", lineHeight: 1.2, color: COLORS.ink, margin: 0 }}>Choose Deployment Target</h2>
      <p style={{ fontSize: "13px", color: COLORS.inkSubtle, marginTop: "8px", marginBottom: "16px", lineHeight: 1.6 }}>
        Configures GitHub Actions to automatically deploy your web app and API backend to your chosen provider.
      </p>
      <div style={{ display: "flex", flexDirection: "column", gap: "10px" }}>
        <SelectionCard
          id="deploy-vercel"
          active={selections.deployment === "vercel"}
          label="Vercel"
          description="Ideal for Next.js frontend with Serverless API. Installs Vercel GitHub Action workflows."
          onClick={() => onChange("vercel")}
        />
        <SelectionCard
          id="deploy-railway"
          active={selections.deployment === "railway"}
          label="Railway"
          description="Great for Next.js + Python FastAPI backend. Installs Railway CLI deployment action."
          onClick={() => onChange("railway")}
        />
        <SelectionCard
          id="deploy-render"
          active={selections.deployment === "render"}
          label="Render"
          description="Great alternative for frontend + backend container hosting. Installs Render Deploy Hook action."
          onClick={() => onChange("render")}
        />
        <SelectionCard
          id="deploy-none"
          active={selections.deployment === "none"}
          label="None / Custom"
          description="I will set up deployment pipelines manually later."
          onClick={() => onChange("none")}
        />
      </div>
      
      {selections.deployment && selections.deployment !== "none" && (
        <div style={{ marginTop: "16px", padding: "14px 16px", borderRadius: "8px", background: COLORS.primaryTint, border: `1px solid rgba(94,106,210,0.25)`, fontSize: "12px", color: COLORS.inkMuted, lineHeight: 1.6 }}>
          <strong style={{ color: COLORS.ink }}>Configuration Action:</strong>
          <p style={{ marginTop: "8px", marginBottom: 0, fontSize: "11px", color: COLORS.inkSubtle }}>
            Copies <code style={{ fontFamily: "ui-monospace, monospace", color: COLORS.primary }}>deploy-{selections.deployment}.yml</code> template into your <code style={{ fontFamily: "ui-monospace, monospace", color: COLORS.primary }}>.github/workflows</code> folder. Make sure to set the respective API tokens in your repository secrets!
          </p>
        </div>
      )}
    </div>
  );
}
