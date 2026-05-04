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
export type DeploymentType = "vercel" | "railway" | "render" | "none";

export interface Selections {
  appType: AppType | null;
  layoutStyle: LayoutStyle | null;
  theme: Theme | null;
  animations: boolean | null;
  payingCustomers: boolean | null;
  deployment: DeploymentType | null;
}

export const COLORS = {
  canvas: "rgb(255, 255, 255)",
  surface1: "rgba(0,0,0,0.02)",
  surface2: "rgba(0,0,0,0.04)",
  surface3: "rgba(0,0,0,0.06)",
  primary: "rgb(37, 99, 235)", // Better contrast for light mode
  primaryHover: "rgb(29, 78, 216)",
  primaryTint: "rgba(37,99,235,0.1)",
  ink: "rgb(15, 23, 42)",
  inkMuted: "rgb(51, 65, 85)",
  inkSubtle: "rgb(71, 85, 105)",
  inkTertiary: "rgb(100, 116, 139)",
  hairline: "rgba(0,0,0,0.1)",
  hairlineStrong: "rgba(0,0,0,0.2)",
  success: "rgb(22, 163, 74)",
  successTint: "rgba(22,163,74,0.1)",
  errorTint: "rgba(220,38,38,0.1)",
  error: "rgb(220, 38, 38)",
} as const;

