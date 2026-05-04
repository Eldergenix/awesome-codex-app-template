"use client";

import { SelectionCard } from "../SelectionCard";
import { COLORS, type AppType, type Selections } from "../types";

const APP_TYPES: { id: AppType; label: string; description: string; icon: React.ReactNode }[] = [
  {
    id: "web",
    label: "Web App",
    description: "Next.js App Router — server components, API routes, Supabase",
    icon: (
      <svg width="22" height="22" viewBox="0 0 22 22" fill="none">
        <rect x="2" y="3" width="18" height="14" rx="2" stroke="currentColor" strokeWidth="1.5" />
        <path d="M2 7h18" stroke="currentColor" strokeWidth="1.5" />
        <circle cx="5" cy="5" r="1" fill="currentColor" />
        <circle cx="8" cy="5" r="1" fill="currentColor" />
        <path d="M8 19h6" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
        <path d="M11 17v2" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
      </svg>
    ),
  },
  {
    id: "mobile",
    label: "Mobile App",
    description: "Expo Router — iOS and Android with React Native",
    icon: (
      <svg width="22" height="22" viewBox="0 0 22 22" fill="none">
        <rect x="6" y="2" width="10" height="18" rx="2" stroke="currentColor" strokeWidth="1.5" />
        <path d="M9.5 19h3" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
        <path d="M9 5h4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
      </svg>
    ),
  },
  {
    id: "macos",
    label: "macOS App",
    description: "SwiftUI with Rust core — native Apple menu bar or windowed app",
    icon: (
      <svg width="22" height="22" viewBox="0 0 22 22" fill="none">
        <path d="M4 5C4 3.895 4.895 3 6 3h10c1.105 0 2 .895 2 2v11c0 1.105-.895 2-2 2H6c-1.105 0-2-.895-2-2V5z" stroke="currentColor" strokeWidth="1.5" />
        <path d="M2 16h18" stroke="currentColor" strokeWidth="1.5" />
        <path d="M8 19h6" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
        <path d="M11 16v3" stroke="currentColor" strokeWidth="1.5" />
      </svg>
    ),
  },
  {
    id: "chrome",
    label: "Chrome Extension",
    description: "Manifest V3 — popup, background service worker, content scripts",
    icon: (
      <svg width="22" height="22" viewBox="0 0 22 22" fill="none">
        <circle cx="11" cy="11" r="8" stroke="currentColor" strokeWidth="1.5" />
        <circle cx="11" cy="11" r="3" stroke="currentColor" strokeWidth="1.5" />
        <path d="M11 8H19M7.5 14l-4 2M14.5 14l4 2" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
      </svg>
    ),
  },
  {
    id: "windows",
    label: "Windows App",
    description: "Electron or Tauri — cross-platform desktop with web tech",
    icon: (
      <svg width="22" height="22" viewBox="0 0 22 22" fill="none">
        <path d="M3 5l8-2v8H3V5zM11 3l8-2v10h-8V3zM3 12h8v8l-8-2v-6zM11 12h8v6l-8 2v-8z" stroke="currentColor" strokeWidth="1.5" strokeLinejoin="round" />
      </svg>
    ),
  },
];

interface Props {
  selections: Selections;
  onChange: (value: AppType) => void;
}

export function Step1AppType({ selections, onChange }: Props) {
  return (
    <div>
      <p style={{ fontSize: "11px", fontWeight: 600, letterSpacing: "0.4px", textTransform: "uppercase", color: COLORS.primary, marginBottom: "4px" }}>Step 1 of 5</p>
      <h2 style={{ fontSize: "24px", fontWeight: 600, letterSpacing: "-0.6px", lineHeight: 1.2, color: COLORS.ink, margin: 0 }}>What are you building?</h2>
      <p style={{ fontSize: "13px", color: COLORS.inkSubtle, marginTop: "8px", marginBottom: "16px", lineHeight: 1.6 }}>
        Choose your primary platform. This determines which agent skills and AGENTS.md rules are activated.
      </p>
      <div style={{ display: "flex", flexDirection: "column", gap: "10px" }}>
        {APP_TYPES.map((type) => (
          <SelectionCard
            key={type.id}
            id={`app-type-${type.id}`}
            label={type.label}
            description={type.description}
            icon={type.icon}
            selected={selections.appType === type.id}
            onClick={() => onChange(type.id)}
          />
        ))}
      </div>
    </div>
  );
}
