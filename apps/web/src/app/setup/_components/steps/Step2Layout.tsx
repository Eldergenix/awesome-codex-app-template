"use client";

import { SelectionCard } from "../SelectionCard";
import type { LayoutStyle, Selections } from "../types";

const LAYOUTS: { id: LayoutStyle; label: string; description: string; icon: React.ReactNode }[] = [
  {
    id: "marketing",
    label: "Marketing / Landing",
    description: "Hero, features, pricing, testimonials, CTA",
    icon: <svg width="22" height="22" viewBox="0 0 22 22" fill="none"><rect x="2" y="2" width="18" height="5" rx="1.5" stroke="currentColor" strokeWidth="1.5" /><rect x="2" y="9" width="11" height="4" rx="1.5" stroke="currentColor" strokeWidth="1.5" /><rect x="2" y="15" width="7" height="5" rx="1.5" stroke="currentColor" strokeWidth="1.5" /><rect x="15" y="9" width="5" height="10" rx="1.5" stroke="currentColor" strokeWidth="1.5" /></svg>,
  },
  {
    id: "dashboard",
    label: "Dashboard",
    description: "Sidebar nav, data tables, charts, KPI cards",
    icon: <svg width="22" height="22" viewBox="0 0 22 22" fill="none"><rect x="2" y="2" width="5" height="18" rx="1.5" stroke="currentColor" strokeWidth="1.5" /><rect x="9" y="2" width="11" height="8" rx="1.5" stroke="currentColor" strokeWidth="1.5" /><rect x="9" y="12" width="5" height="8" rx="1.5" stroke="currentColor" strokeWidth="1.5" /><rect x="16" y="12" width="4" height="8" rx="1.5" stroke="currentColor" strokeWidth="1.5" /></svg>,
  },
  {
    id: "marketplace",
    label: "Marketplace",
    description: "Product grid, search, filters, checkout flow",
    icon: <svg width="22" height="22" viewBox="0 0 22 22" fill="none"><rect x="2" y="2" width="8" height="8" rx="1.5" stroke="currentColor" strokeWidth="1.5" /><rect x="12" y="2" width="8" height="8" rx="1.5" stroke="currentColor" strokeWidth="1.5" /><rect x="2" y="12" width="8" height="8" rx="1.5" stroke="currentColor" strokeWidth="1.5" /><rect x="12" y="12" width="8" height="8" rx="1.5" stroke="currentColor" strokeWidth="1.5" /></svg>,
  },
  {
    id: "blog",
    label: "Blog / News",
    description: "Article feed, MDX content, tags, author cards",
    icon: <svg width="22" height="22" viewBox="0 0 22 22" fill="none"><rect x="2" y="2" width="18" height="18" rx="2" stroke="currentColor" strokeWidth="1.5" /><path d="M6 7h10M6 11h10M6 15h6" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" /></svg>,
  },
  {
    id: "terminal",
    label: "Terminal / CLI",
    description: "Command palette, monospace UI, keyboard-first",
    icon: <svg width="22" height="22" viewBox="0 0 22 22" fill="none"><rect x="2" y="3" width="18" height="16" rx="2" stroke="currentColor" strokeWidth="1.5" /><path d="M6 8l3 3-3 3" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" /><path d="M12 14h4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" /></svg>,
  },
  {
    id: "ide",
    label: "IDE / Code Editor",
    description: "File tree, split panes, syntax highlighting",
    icon: <svg width="22" height="22" viewBox="0 0 22 22" fill="none"><rect x="2" y="2" width="18" height="18" rx="2" stroke="currentColor" strokeWidth="1.5" /><path d="M2 7h18" stroke="currentColor" strokeWidth="1.5" /><path d="M8 2v18" stroke="currentColor" strokeWidth="1.5" /><path d="M11 11l2 2-2 2" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" /></svg>,
  },
  {
    id: "analytics",
    label: "Analytics",
    description: "Charts, funnel views, retention, heatmaps",
    icon: <svg width="22" height="22" viewBox="0 0 22 22" fill="none"><rect x="2" y="2" width="18" height="18" rx="2" stroke="currentColor" strokeWidth="1.5" /><path d="M6 15l3-4 3 2 4-6" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" /></svg>,
  },
];

interface Props {
  selections: Selections;
  onChange: (value: LayoutStyle) => void;
}

export function Step2Layout({ selections, onChange }: Props) {
  return (
    <div>
      <p style={{ fontSize: "12px", fontWeight: 500, letterSpacing: "0.4px", textTransform: "uppercase", color: "#5e6ad2", marginBottom: "8px" }}>Step 2 of 5</p>
      <h2 style={{ fontSize: "28px", fontWeight: 600, letterSpacing: "-0.6px", lineHeight: 1.2, color: "#f7f8f8", margin: 0 }}>What's the primary layout?</h2>
      <p style={{ fontSize: "14px", color: "#8a8f98", marginTop: "8px", marginBottom: "28px", lineHeight: 1.6 }}>
        Determines which template scaffold and navigation pattern gets installed.
      </p>
      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(200px, 1fr))", gap: "10px" }}>
        {LAYOUTS.map((layout) => (
          <SelectionCard
            key={layout.id}
            id={`layout-${layout.id}`}
            label={layout.label}
            description={layout.description}
            icon={layout.icon}
            selected={selections.layoutStyle === layout.id}
            onClick={() => onChange(layout.id)}
          />
        ))}
      </div>
    </div>
  );
}
