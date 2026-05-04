/* @allow-large-file: Four tightly-coupled Remotion launch variants share timing, copy, and visual primitives in one composition file for this release asset. */
import React from "react";
import {
  AbsoluteFill,
  Easing,
  Sequence,
  interpolate,
  useCurrentFrame,
  useVideoConfig,
} from "remotion";

type PromoVariant = "launch" | "workflow" | "free";

type PromoVideoProps = {
  variant: PromoVariant;
};

type SceneProps = {
  variant: PromoVariant;
};

type Panel = {
  title: string;
  detail: string;
  tag: string;
};

const colors = {
  canvas: "rgb(246, 249, 252)",
  surface: "rgb(255, 255, 255)",
  surfaceRaised: "rgb(247, 250, 255)",
  line: "rgb(214, 220, 230)",
  ink: "rgb(10, 37, 64)",
  muted: "rgb(66, 84, 102)",
  subtle: "rgb(104, 123, 142)",
  primary: "rgb(99, 91, 255)",
  primarySoft: "rgba(99, 91, 255, 0.12)",
  accent: "rgb(0, 212, 255)",
  accentSoft: "rgba(0, 212, 255, 0.14)",
  success: "rgb(0, 150, 136)",
  warning: "rgb(255, 183, 77)",
};

const repoUrl = "github.com/Eldergenix/enterprise-monorepo-template";

const variants: Record<
  PromoVariant,
  {
    eyebrow: string;
    headline: string;
    subhead: string;
    closer: string;
    panels: Panel[];
  }
> = {
  launch: {
    eyebrow: "New release",
    headline: "A production-ready vibe coding template.",
    subhead: "Codex App, Claude Code, and modern IDE workflows arrive pre-wired.",
    closer: "Clone the repo. Open the guide. Build the product.",
    panels: [
      { title: "Visual setup guide", detail: "A browser wizard configures app type, layout, theme, animation, billing, and deployment.", tag: "/setup" },
      { title: "Five app surfaces", detail: "Next.js web, Expo iOS and Android, macOS SwiftUI, FastAPI, and FastMCP foundations.", tag: "multi-app" },
      { title: "Agent-ready rules", detail: "AGENTS.md, Claude hooks, Codex hooks, skills, Linear, Notion, and completion gates.", tag: "agents" },
    ],
  },
  workflow: {
    eyebrow: "For serious builders",
    headline: "Vibe fast. Ship with guardrails.",
    subhead: "The template turns agent output into repeatable engineering workflow.",
    closer: "Production pressure, built into the starter.",
    panels: [
      { title: "Deterministic gates", detail: "Typecheck, lint, tests, secret scan, LOC guard, style guard, and prompt-file guard.", tag: "quality" },
      { title: "Design system first", detail: "Shared theme package, DESIGN.md, frontend design skills, and UI consistency rules.", tag: "design" },
      { title: "End-to-end handoff", detail: "PLAN, MEMORY, CONTINUITY, Linear, and Notion keep work traceable across agents.", tag: "handoff" },
    ],
  },
  free: {
    eyebrow: "100% free",
    headline: "The AI coding starter kit you wish every repo had.",
    subhead: "Open-source structure for new vibe coders and experienced teams.",
    closer: "No license wall. No setup mystery. Just the repo.",
    panels: [
      { title: "One command bootstrap", detail: "Create a full enterprise monorepo and customize it from the browser.", tag: "npx" },
      { title: "Codex + Claude ready", detail: "Prompt contracts, hooks, skills, MCP docs, and quality workflows included.", tag: "ready" },
      { title: "Ship across platforms", detail: "Web, iOS, Android, macOS, API, MCP, shared packages, and AI SDK wiring.", tag: "free" },
    ],
  },
};

const baseFont: React.CSSProperties = {
  fontFamily: "Inter, SF Pro Display, -apple-system, BlinkMacSystemFont, Segoe UI, sans-serif",
};

const monoFont: React.CSSProperties = {
  fontFamily: "JetBrains Mono, SFMono-Regular, ui-monospace, monospace",
};

const ease = Easing.bezier(0.16, 1, 0.3, 1);

const progressFor = (frame: number, start: number, duration: number) =>
  interpolate(frame, [start, start + duration], [0, 1], {
    easing: ease,
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

const fadeFor = (frame: number, start: number, duration: number) =>
  interpolate(frame, [start, start + duration], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

const Shell: React.FC<{ children: React.ReactNode; dense?: boolean }> = ({ children, dense = false }) => (
  <AbsoluteFill style={{ ...baseFont, backgroundColor: colors.canvas, color: colors.ink, overflow: "hidden" }}>
    <div
      style={{
        position: "absolute",
        top: -180,
        left: -120,
        right: -120,
        height: 360,
        transform: "skewY(-7deg)",
        transformOrigin: "0 0",
        background:
          "linear-gradient(100deg, rgb(99, 91, 255) 0%, rgb(99, 91, 255) 28%, rgb(0, 212, 255) 28%, rgb(0, 212, 255) 46%, rgb(122, 92, 255) 46%, rgb(122, 92, 255) 68%, rgb(255, 183, 77) 68%, rgb(255, 183, 77) 100%)",
      }}
    />
    <div
      style={{
        position: "absolute",
        top: 120,
        left: -80,
        right: -80,
        height: 130,
        transform: "skewY(-7deg)",
        background: "linear-gradient(100deg, rgba(255, 255, 255, 0.72), rgba(255, 255, 255, 0.18))",
      }}
    />
    <div
      style={{
        position: "absolute",
        inset: 30,
        border: `1px solid ${colors.line}`,
        borderRadius: 26,
        opacity: 0.75,
        background: "rgba(255, 255, 255, 0.32)",
      }}
    />
    <div style={{ position: "relative", height: "100%", padding: dense ? "34px 44px" : "46px 56px" }}>{children}</div>
  </AbsoluteFill>
);

const Chip: React.FC<{ children: React.ReactNode; tone?: "primary" | "success" | "neutral" }> = ({ children, tone = "neutral" }) => {
  const color = tone === "primary" ? colors.primary : tone === "success" ? colors.success : colors.muted;
  const background = tone === "primary" ? colors.primarySoft : tone === "success" ? "rgba(0, 150, 136, 0.12)" : "rgba(255, 255, 255, 0.74)";

  return (
    <span
      style={{
        ...monoFont,
        display: "inline-flex",
        alignItems: "center",
        border: `1px solid ${tone === "neutral" ? colors.line : "transparent"}`,
        borderRadius: 999,
        background,
        color,
        padding: "7px 12px",
        fontSize: 13,
        lineHeight: 1,
        whiteSpace: "nowrap",
      }}
    >
      {children}
    </span>
  );
};

const ProductFrame: React.FC<{ frame: number; variant: PromoVariant }> = ({ frame, variant }) => {
  const data = variants[variant];
  const pulse = fadeFor(frame % 120, 0, 80);

  return (
    <div
      style={{
        width: 482,
        height: 326,
        borderRadius: 20,
        border: `1px solid ${colors.line}`,
        background: colors.surface,
        padding: 14,
        boxShadow: "0 28px 80px rgba(50, 50, 93, 0.22), 0 12px 28px rgba(0, 0, 0, 0.12)",
      }}
    >
      <div style={{ display: "flex", gap: 7, marginBottom: 14 }}>
        <span style={{ width: 10, height: 10, borderRadius: 999, background: "rgb(255, 95, 87)" }} />
        <span style={{ width: 10, height: 10, borderRadius: 999, background: colors.warning }} />
        <span style={{ width: 10, height: 10, borderRadius: 999, background: colors.success }} />
        <div style={{ ...monoFont, marginLeft: "auto", color: colors.subtle, fontSize: 11 }}>enterprise-template</div>
      </div>
      <div style={{ display: "grid", gridTemplateColumns: "124px 1fr", gap: 12, height: 276 }}>
        <div style={{ borderRadius: 12, background: "rgb(246, 249, 252)", padding: 12 }}>
          {["web", "mobile", "macOS", "api", "mcp"].map((item, index) => (
            <div
              key={item}
              style={{
                ...monoFont,
                color: index === 0 ? colors.ink : colors.subtle,
                fontSize: 12,
                padding: "8px 7px",
                borderRadius: 8,
                background: index === 0 ? colors.primarySoft : "transparent",
                marginBottom: 5,
              }}
            >
              {item}
            </div>
          ))}
        </div>
        <div style={{ display: "grid", gridTemplateRows: "78px 1fr", gap: 12 }}>
          <div style={{ borderRadius: 12, background: "linear-gradient(135deg, rgba(99, 91, 255, 0.12), rgba(0, 212, 255, 0.12))", padding: 14 }}>
            <div style={{ color: colors.ink, fontSize: 18, fontWeight: 600 }}>{data.panels[0]?.title}</div>
            <div style={{ color: colors.subtle, fontSize: 12, marginTop: 8 }}>{data.panels[0]?.tag}</div>
          </div>
          <div style={{ borderRadius: 12, background: "rgb(246, 249, 252)", padding: 14 }}>
            {["pnpm quality", "codex hooks", "claude hooks", "notion + linear"].map((item, index) => (
              <div
                key={item}
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: 10,
                  height: 34,
                  opacity: index === 3 ? 0.55 + pulse * 0.45 : 1,
                }}
              >
                <span style={{ width: 9, height: 9, borderRadius: 999, background: index < 2 ? colors.success : colors.primary }} />
                <span style={{ ...monoFont, fontSize: 13, color: colors.muted }}>{item}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

const TitleScene: React.FC<SceneProps> = ({ variant }) => {
  const frame = useCurrentFrame();
  const data = variants[variant];
  const enter = progressFor(frame, 6, 42);
  const exit = progressFor(frame, 420, 52);

  return (
    <Shell>
      <div style={{ opacity: 1 - exit, transform: `translateY(${interpolate(enter, [0, 1], [24, 0])}px)` }}>
        <Chip tone={variant === "free" ? "success" : "primary"}>{data.eyebrow}</Chip>
        <h1
          style={{
            width: 820,
            margin: "38px 0 18px",
            fontSize: 64,
            lineHeight: 0.98,
            letterSpacing: 0,
            fontWeight: 650,
          }}
        >
          {data.headline}
        </h1>
        <p style={{ width: 660, color: colors.muted, fontSize: 23, lineHeight: 1.35, margin: 0 }}>{data.subhead}</p>
      </div>
      <div
        style={{
          position: "absolute",
          right: 58,
          bottom: 74,
          opacity: enter * (1 - exit),
          transform: `translateX(${interpolate(enter, [0, 1], [60, 0])}px)`,
        }}
      >
        <ProductFrame frame={frame} variant={variant} />
      </div>
    </Shell>
  );
};

const FeatureScene: React.FC<SceneProps> = ({ variant }) => {
  const frame = useCurrentFrame();
  const data = variants[variant];
  const exit = progressFor(frame, 430, 50);

  return (
    <Shell dense>
      <div style={{ opacity: 1 - exit }}>
        <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 30 }}>
          <div>
            <Chip tone="primary">standout features</Chip>
            <h2 style={{ margin: "18px 0 0", fontSize: 42, lineHeight: 1.05, letterSpacing: 0, fontWeight: 620 }}>
              Built for real product work.
            </h2>
          </div>
          <div style={{ ...monoFont, color: colors.subtle, fontSize: 13 }}>1080x700 / 60fps</div>
        </div>
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: 14 }}>
          {data.panels.map((panel, index) => {
            const enter = progressFor(frame, 24 + index * 30, 46);
            return (
              <div
                key={panel.title}
                style={{
                  minHeight: 378,
                  borderRadius: 18,
                  border: `1px solid ${colors.line}`,
                  background: index === 1 ? colors.surfaceRaised : colors.surface,
                  padding: 24,
                  opacity: enter,
                  transform: `translateY(${interpolate(enter, [0, 1], [30, 0])}px)`,
                  boxShadow: "0 14px 36px rgba(50, 50, 93, 0.10)",
                }}
              >
                <Chip tone={index === 2 ? "success" : "neutral"}>{panel.tag}</Chip>
                <h3 style={{ margin: "72px 0 16px", fontSize: 27, lineHeight: 1.08, letterSpacing: 0 }}>{panel.title}</h3>
                <p style={{ margin: 0, color: colors.muted, fontSize: 18, lineHeight: 1.42 }}>{panel.detail}</p>
              </div>
            );
          })}
        </div>
      </div>
    </Shell>
  );
};

const PlatformScene: React.FC = () => {
  const frame = useCurrentFrame();
  const exit = progressFor(frame, 430, 50);
  const platforms = ["Web apps", "iOS mobile", "Android mobile", "macOS apps", "API services", "MCP tools"];

  return (
    <Shell dense>
      <div style={{ opacity: 1 - exit }}>
        <Chip tone="primary">platform coverage</Chip>
        <h2 style={{ margin: "20px 0 34px", width: 760, fontSize: 48, lineHeight: 1.04, letterSpacing: 0 }}>
          One template for every surface your AI coding workflow touches.
        </h2>
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: 14 }}>
          {platforms.map((platform, index) => {
            const enter = progressFor(frame, index * 18, 38);
            return (
              <div
                key={platform}
                style={{
                  height: 118,
                  borderRadius: 16,
                  border: `1px solid ${colors.line}`,
                  background: index % 2 === 0 ? colors.surface : colors.surfaceRaised,
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "space-between",
                  padding: "0 24px",
                  opacity: enter,
                  transform: `scale(${interpolate(enter, [0, 1], [0.96, 1])})`,
                  boxShadow: "0 12px 28px rgba(50, 50, 93, 0.08)",
                }}
              >
                <span style={{ fontSize: 23, fontWeight: 590 }}>{platform}</span>
                <span style={{ ...monoFont, color: colors.success, fontSize: 15 }}>ready</span>
              </div>
            );
          })}
        </div>
      </div>
    </Shell>
  );
};

const ClosingScene: React.FC<SceneProps> = ({ variant }) => {
  const frame = useCurrentFrame();
  const data = variants[variant];
  const enter = progressFor(frame, 8, 44);
  const repoEnter = progressFor(frame, 150, 42);

  return (
    <Shell>
      <div
        style={{
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          opacity: enter,
          transform: `translateY(${interpolate(enter, [0, 1], [24, 0])}px)`,
        }}
      >
        <Chip tone="success">100% FREE</Chip>
        <h2 style={{ width: 820, margin: "32px 0 18px", fontSize: 60, lineHeight: 1, letterSpacing: 0 }}>
          {data.closer}
        </h2>
        <p style={{ margin: 0, width: 620, color: colors.muted, fontSize: 22, lineHeight: 1.35 }}>
          Production-grade codebase rules, hooks, quality gates, setup guide, and front-end UX workflows included.
        </p>
        <div
          style={{
            ...monoFont,
            marginTop: 44,
            width: "fit-content",
            padding: "18px 22px",
            borderRadius: 14,
            border: `1px solid rgba(99, 91, 255, 0.24)`,
            color: colors.ink,
            background: "rgba(255, 255, 255, 0.82)",
            fontSize: 22,
            opacity: repoEnter,
            transform: `translateY(${interpolate(repoEnter, [0, 1], [16, 0])}px)`,
            boxShadow: "0 18px 44px rgba(50, 50, 93, 0.16)",
          }}
        >
          {repoUrl}
        </div>
      </div>
    </Shell>
  );
};

export const PromoVideo: React.FC<PromoVideoProps> = ({ variant }) => {
  const { fps } = useVideoConfig();

  return (
    <AbsoluteFill>
      <Sequence from={0} durationInFrames={fps * 8}>
        <TitleScene variant={variant} />
      </Sequence>
      <Sequence from={fps * 8} durationInFrames={fps * 8}>
        <FeatureScene variant={variant} />
      </Sequence>
      <Sequence from={fps * 16} durationInFrames={fps * 8}>
        <PlatformScene />
      </Sequence>
      <Sequence from={fps * 24} durationInFrames={fps * 13}>
        <ClosingScene variant={variant} />
      </Sequence>
    </AbsoluteFill>
  );
};

const walkthroughSteps: Panel[] = [
  { title: "Clone or run npx", detail: "Start from GitHub or bootstrap a fresh project with create-enterprise-monorepo.", tag: "01" },
  { title: "Open the visual setup guide", detail: "The browser wizard configures app type, layout, theme, animations, billing, and deployment.", tag: "02" },
  { title: "Let hooks enforce the rules", detail: "Codex and Claude Code prompts, hooks, skills, Linear, Notion, and gates are already installed.", tag: "03" },
  { title: "Build across the stack", detail: "Web, iOS, Android, macOS, API, MCP, shared packages, and AI SDK code are ready for iteration.", tag: "04" },
  { title: "Verify before shipping", detail: "Run pnpm quality, typecheck, lint, tests, and review CONTINUITY before calling work complete.", tag: "05" },
];

export const WalkthroughVideo: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const active = Math.min(walkthroughSteps.length - 1, Math.floor(frame / (fps * 6.2)));
  const firstStep = walkthroughSteps[0] as Panel;
  const activeStep = walkthroughSteps[active] ?? firstStep;
  const localFrame = frame - active * fps * 6.2;
  const enter = progressFor(localFrame, 0, 36);

  return (
    <Shell dense>
      <div style={{ display: "grid", gridTemplateColumns: "330px 1fr", gap: 34, height: "100%" }}>
        <div>
          <Chip tone="primary">walkthrough</Chip>
          <h1 style={{ margin: "20px 0 18px", fontSize: 44, lineHeight: 1.04, letterSpacing: 0 }}>
            From blank repo to production-grade AI workspace.
          </h1>
          <p style={{ color: colors.muted, fontSize: 18, lineHeight: 1.4, margin: 0 }}>
            A visual release walkthrough for Codex App, Claude Code, and coding IDE users.
          </p>
          <div style={{ marginTop: 34, display: "grid", gap: 10 }}>
            {walkthroughSteps.map((step, index) => (
              <div
                key={step.title}
                style={{
                  borderRadius: 12,
                  border: `1px solid ${index === active ? colors.primary : colors.line}`,
                  background: index === active ? colors.primarySoft : "rgba(255, 255, 255, 0.74)",
                  padding: "12px 14px",
                  color: index === active ? colors.ink : colors.subtle,
                  fontSize: 15,
                  fontWeight: 560,
                }}
              >
                {step.tag} / {step.title}
              </div>
            ))}
          </div>
        </div>
        <div
          style={{
            borderRadius: 22,
            border: `1px solid ${colors.line}`,
            background: colors.surface,
            padding: 30,
            alignSelf: "stretch",
            display: "flex",
            flexDirection: "column",
            justifyContent: "space-between",
            opacity: enter,
            transform: `translateY(${interpolate(enter, [0, 1], [24, 0])}px)`,
            boxShadow: "0 28px 80px rgba(50, 50, 93, 0.16), 0 12px 28px rgba(0, 0, 0, 0.08)",
          }}
        >
          <div>
            <Chip tone={active === walkthroughSteps.length - 1 ? "success" : "neutral"}>{activeStep.tag}</Chip>
            <h2 style={{ fontSize: 48, lineHeight: 1.03, letterSpacing: 0, margin: "34px 0 18px" }}>{activeStep.title}</h2>
            <p style={{ color: colors.muted, fontSize: 22, lineHeight: 1.42, margin: 0 }}>{activeStep.detail}</p>
          </div>
          <div
            style={{
              ...monoFont,
              borderRadius: 16,
              background: "rgb(246, 249, 252)",
              border: `1px solid ${colors.line}`,
              padding: 18,
              color: active === walkthroughSteps.length - 1 ? colors.success : colors.muted,
              fontSize: 18,
            }}
          >
            {active === walkthroughSteps.length - 1 ? "pnpm quality && pnpm typecheck && pnpm lint" : "http://localhost:3000/setup"}
          </div>
        </div>
      </div>
    </Shell>
  );
};
