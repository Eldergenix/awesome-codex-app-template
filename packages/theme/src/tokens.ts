export const colorTokens = {
  background: "oklch(0.99 0.01 250)",
  foreground: "oklch(0.18 0.03 250)",
  muted: "oklch(0.95 0.02 250)",
  mutedForeground: "oklch(0.48 0.03 250)",
  primary: "oklch(0.58 0.18 255)",
  primaryForeground: "oklch(0.99 0.01 250)",
  border: "oklch(0.88 0.02 250)",
  danger: "oklch(0.58 0.2 25)",
  success: "oklch(0.56 0.16 150)",
  warning: "oklch(0.74 0.16 75)",
} as const;

export const spacingTokens = {
  0: 0,
  1: 4,
  2: 8,
  3: 12,
  4: 16,
  5: 20,
  6: 24,
  8: 32,
  10: 40,
  12: 48,
  16: 64,
} as const;

export const radiusTokens = {
  sm: 6,
  md: 10,
  lg: 16,
  xl: 24,
} as const;

export type ColorToken = keyof typeof colorTokens;
export type SpacingToken = keyof typeof spacingTokens;
export type RadiusToken = keyof typeof radiusTokens;
