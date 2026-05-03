"use client";

import { COLORS } from "../types";
import type { Selections } from "../types";

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
        flex: 1,
        padding: "24px",
        borderRadius: "12px",
        border: `1px solid ${active ? COLORS.primary : COLORS.hairline}`,
        background: active ? COLORS.primaryTint : COLORS.surface1,
        cursor: "pointer",
        textAlign: "left",
        transition: "all 0.15s ease",
        outline: "none",
      }}
      onMouseEnter={(e) => { if (!active) { (e.currentTarget as HTMLButtonElement).style.background = COLORS.surface2; (e.currentTarget as HTMLButtonElement).style.borderColor = COLORS.hairlineStrong; } }}
      onMouseLeave={(e) => { if (!active) { (e.currentTarget as HTMLButtonElement).style.background = COLORS.surface1; (e.currentTarget as HTMLButtonElement).style.borderColor = COLORS.hairline; } }}
    >
      <div style={{ fontSize: "22px", marginBottom: "10px" }}>{active ? "✦" : "○"}</div>
      <div style={{ fontSize: "15px", fontWeight: 600, color: COLORS.ink, marginBottom: "6px" }}>{label}</div>
      <div style={{ fontSize: "13px", color: COLORS.inkSubtle, lineHeight: 1.6 }}>{description}</div>
    </button>
  );
}

export function Step5Customers({ selections, onChange }: Props) {
  return (
    <div>
      <p style={{ fontSize: "12px", fontWeight: 500, letterSpacing: "0.4px", textTransform: "uppercase", color: COLORS.primary, marginBottom: "8px" }}>Step 5 of 5</p>
      <h2 style={{ fontSize: "28px", fontWeight: 600, letterSpacing: "-0.6px", lineHeight: 1.2, color: COLORS.ink, margin: 0 }}>Will you have paying customers?</h2>
      <p style={{ fontSize: "14px", color: COLORS.inkSubtle, marginTop: "8px", marginBottom: "28px", lineHeight: 1.6 }}>
        Activates billing-related components, pricing UI, and payment AGENTS.md rules.
      </p>
      <div style={{ display: "flex", gap: "12px" }}>
        <ToggleCard
          id="customers-yes"
          active={selections.payingCustomers === true}
          label="Yes, I'll charge users"
          description="Installs @thegridcn pricing + checkout components and Stripe-ready payment flow scaffolding."
          onClick={() => onChange(true)}
        />
        <ToggleCard
          id="customers-no"
          active={selections.payingCustomers === false}
          label="No, free / internal"
          description="No payment UI installed. Ideal for internal tools, open source projects, or freemium-first builds."
          onClick={() => onChange(false)}
        />
      </div>
      {selections.payingCustomers === true && (
        <div style={{ marginTop: "16px", padding: "14px 16px", borderRadius: "8px", background: COLORS.primaryTint, border: `1px solid rgba(94,106,210,0.25)`, fontSize: "12px", color: COLORS.inkMuted, lineHeight: 1.6 }}>
          <strong style={{ color: COLORS.ink }}>Will install:</strong>
          <div style={{ marginTop: "6px", fontFamily: "ui-monospace, monospace", fontSize: "11px" }}>
            pnpm dlx shadcn@latest registry add @thegridcn
          </div>
          <p style={{ marginTop: "8px", marginBottom: 0, fontSize: "11px", color: COLORS.inkSubtle }}>
            Includes pricing cards, checkout UI, and subscription management components from{" "}
            <a href="https://thegridcn.com" target="_blank" rel="noopener noreferrer" style={{ color: COLORS.primary }}>thegridcn.com</a>.
          </p>
        </div>
      )}
    </div>
  );
}
