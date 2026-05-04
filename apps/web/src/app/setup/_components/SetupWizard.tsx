"use client";

import { useState } from "react";
import { Step1AppType } from "./steps/Step1AppType";
import { Step2Layout } from "./steps/Step2Layout";
import { Step3Theme } from "./steps/Step3Theme";
import { Step4Animations } from "./steps/Step4Animations";
import { Step5Customers } from "./steps/Step5Customers";
import { Step6Deployment } from "./steps/Step6Deployment";
import { Review } from "./Review";
import { ExecutionLog } from "./ExecutionLog";
import { COLORS } from "./types";
import type { Selections, AppType, LayoutStyle, Theme, DeploymentType } from "./types";

const TOTAL_STEPS = 6;

function ProgressBar({ currentStep }: { currentStep: number }) {
  return (
    <div style={{ display: "flex", alignItems: "center", gap: "0", marginBottom: "24px" }}>
      {Array.from({ length: TOTAL_STEPS }, (_, i) => {
        const stepNum = i + 1;
        const isDone = currentStep > stepNum;
        const isActive = currentStep === stepNum;
        return (
          <div key={stepNum} style={{ display: "flex", alignItems: "center", flex: i < TOTAL_STEPS - 1 ? 1 : undefined }}>
            <div
              style={{
                width: "24px",
                height: "24px",
                borderRadius: "50%",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                fontSize: "11px",
                fontWeight: 600,
                flexShrink: 0,
                border: `1.5px solid ${isDone || isActive ? COLORS.primary : COLORS.hairlineStrong}`,
                background: isDone ? COLORS.primary : isActive ? COLORS.primaryTint : "transparent",
                color: isDone ? "rgb(255, 255, 255)" : isActive ? COLORS.primary : COLORS.inkTertiary,
                transition: "all 0.25s ease",
              }}
            >
              {isDone ? (
                <svg width="10" height="8" viewBox="0 0 12 10" fill="none">
                  <path d="M1 5L4 8L11 1" stroke="rgb(255, 255, 255)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              ) : stepNum}
            </div>
            {i < TOTAL_STEPS - 1 && (
              <div style={{ flex: 1, height: "1px", background: isDone ? COLORS.primary : COLORS.hairline, transition: "background 0.25s ease", margin: "0 4px" }} />
            )}
          </div>
        );
      })}
    </div>
  );
}

const INITIAL_SELECTIONS: Selections = {
  appType: null,
  layoutStyle: null,
  theme: null,
  animations: null,
  payingCustomers: null,
  deployment: null,
};

export function SetupWizard() {
  const [step, setStep] = useState(1); // 1-5 = form steps, 6 = review, 7 = execution
  const [selections, setSelections] = useState<Selections>(INITIAL_SELECTIONS);

  const canAdvance = () => {
    if (step === 1) return selections.appType !== null;
    if (step === 2) return selections.layoutStyle !== null;
    if (step === 3) return selections.theme !== null;
    if (step === 4) return selections.animations !== null;
    if (step === 5) return selections.payingCustomers !== null;
    if (step === 6) return selections.deployment !== null;
    return true;
  };

  const next = () => { if (canAdvance()) setStep((s) => s + 1); };
  const back = () => setStep((s) => Math.max(1, s - 1));

  const handleReset = () => {
    setStep(1);
    setSelections(INITIAL_SELECTIONS);
  };

  return (
    <div style={{ display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", boxSizing: "border-box", width: "100%" }}>
      {/* Logo / wordmark */}
      <div style={{ marginBottom: "24px", textAlign: "center" }}>
        <div style={{ display: "inline-flex", alignItems: "center", gap: "10px", padding: "8px 16px", borderRadius: "9999px", border: `1px solid ${COLORS.hairline}`, background: COLORS.surface1 }}>
          <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
            <rect x="1" y="1" width="6" height="6" rx="1.5" fill={COLORS.primary} />
            <rect x="9" y="1" width="6" height="6" rx="1.5" fill={COLORS.primary} opacity="0.6" />
            <rect x="1" y="9" width="6" height="6" rx="1.5" fill={COLORS.primary} opacity="0.4" />
            <rect x="9" y="9" width="6" height="6" rx="1.5" fill={COLORS.primary} opacity="0.2" />
          </svg>
          <span style={{ fontSize: "13px", fontWeight: 500, color: COLORS.inkMuted, letterSpacing: "-0.1px" }}>Enterprise Monorepo</span>
          <span style={{ fontSize: "10px", color: COLORS.inkTertiary, background: COLORS.surface2, padding: "2px 8px", borderRadius: "9999px", fontWeight: 500, letterSpacing: "0.3px" }}>SETUP</span>
        </div>
      </div>

      {/* Wizard card */}
      <div
        style={{
          width: "100%",
          maxWidth: "700px",
          background: "transparent",
          border: "none",
          borderRadius: "0",
          padding: "0",
          boxSizing: "border-box",
          boxShadow: "none",
          backdropFilter: "none",
        }}
      >
        {step <= TOTAL_STEPS && <ProgressBar currentStep={step} />}

        <div style={{ minHeight: "300px" }}>
          {step === 1 && <Step1AppType selections={selections} onChange={(v: AppType) => setSelections((s) => ({ ...s, appType: v }))} />}
          {step === 2 && <Step2Layout selections={selections} onChange={(v: LayoutStyle) => setSelections((s) => ({ ...s, layoutStyle: v }))} />}
          {step === 3 && <Step3Theme selections={selections} onChange={(v: Theme) => setSelections((s) => ({ ...s, theme: v }))} />}
          {step === 4 && <Step4Animations selections={selections} onChange={(v: boolean) => setSelections((s) => ({ ...s, animations: v }))} />}
          {step === 5 && <Step5Customers selections={selections} onChange={(v: boolean) => setSelections((s) => ({ ...s, payingCustomers: v }))} />}
          {step === 6 && <Step6Deployment selections={selections} onChange={(v: DeploymentType) => setSelections((s) => ({ ...s, deployment: v }))} />}
          {step === 7 && <Review selections={selections} onConfirm={() => setStep(8)} onBack={back} />}
          {step === 8 && <ExecutionLog selections={selections as unknown as Record<string, unknown>} onReset={handleReset} />}
        </div>

        {/* Navigation — only shown on form steps 1-6 */}
        {step <= TOTAL_STEPS && (
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginTop: "24px", paddingTop: "20px", borderTop: `1px solid ${COLORS.hairline}` }}>
            <button
              id="wizard-back"
              onClick={back}
              disabled={step === 1}
              style={{ padding: "9px 18px", borderRadius: "8px", border: `1px solid ${COLORS.hairline}`, background: "transparent", color: step === 1 ? COLORS.inkTertiary : COLORS.inkMuted, fontSize: "13px", fontWeight: 500, cursor: step === 1 ? "default" : "pointer", transition: "all 0.15s ease", opacity: step === 1 ? 0.4 : 1 }}
            >
              ← Back
            </button>

            <span style={{ fontSize: "12px", color: COLORS.inkTertiary }}>
              {step} / {TOTAL_STEPS}
            </span>

            <button
              id="wizard-next"
              onClick={step === TOTAL_STEPS ? () => setStep(6) : next}
              disabled={!canAdvance()}
              style={{
                padding: "9px 20px",
                borderRadius: "8px",
                border: "none",
                background: canAdvance() ? COLORS.primary : COLORS.surface2,
                color: canAdvance() ? "rgb(255, 255, 255)" : COLORS.inkTertiary,
                fontSize: "13px",
                fontWeight: 600,
                cursor: canAdvance() ? "pointer" : "default",
                transition: "all 0.15s ease",
                letterSpacing: "-0.1px",
              }}
              onMouseEnter={(e) => { if (canAdvance()) (e.currentTarget as HTMLButtonElement).style.background = COLORS.primaryHover; }}
              onMouseLeave={(e) => { if (canAdvance()) (e.currentTarget as HTMLButtonElement).style.background = COLORS.primary; }}
            >
              {step === TOTAL_STEPS ? "Review →" : "Next →"}
            </button>
          </div>
        )}
      </div>

      {/* Footer hint */}
      <p style={{ marginTop: "24px", fontSize: "11px", color: COLORS.inkTertiary, textAlign: "center" }}>
        dev-only setup wizard · changes are applied to your local repository
      </p>
    </div>
  );
}
