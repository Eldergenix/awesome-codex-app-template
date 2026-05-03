export type AppType = "web" | "mobile" | "macos" | "chrome" | "windows";
export type LayoutStyle =
  | "marketing"
  | "dashboard"
  | "marketplace"
  | "blog"
  | "terminal"
  | "ide"
  | "analytics";
export type Theme = "modern" | "cyberpunk" | "custom";

export interface Selections {
  appType: AppType | null;
  layoutStyle: LayoutStyle | null;
  theme: Theme | null;
  animations: boolean | null;
  payingCustomers: boolean | null;
}

export const COLORS = {
  canvas: "#010102",
  surface1: "rgba(255,255,255,0.04)",
  surface2: "rgba(255,255,255,0.07)",
  surface3: "rgba(255,255,255,0.10)",
  primary: "#5e6ad2",
  primaryHover: "#828fff",
  primaryTint: "rgba(94,106,210,0.12)",
  ink: "#f7f8f8",
  inkMuted: "#d0d6e0",
  inkSubtle: "#8a8f98",
  inkTertiary: "#62666d",
  hairline: "rgba(255,255,255,0.08)",
  hairlineStrong: "rgba(255,255,255,0.14)",
  success: "#27a644",
  successTint: "rgba(39,166,68,0.12)",
  errorTint: "rgba(239,68,68,0.12)",
  error: "#ef4444",
} as const;
