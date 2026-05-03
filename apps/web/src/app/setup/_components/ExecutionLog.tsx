"use client";

import { useEffect, useRef, useState } from "react";
import { COLORS } from "./types";

interface LogLine {
  text: string;
  type: "step" | "output" | "success" | "error" | "done";
}

interface Props {
  selections: Record<string, unknown>;
  onReset: () => void;
}

export function ExecutionLog({ selections, onReset }: Props) {
  const [lines, setLines] = useState<LogLine[]>([]);
  const [done, setDone] = useState(false);
  const [hasError, setHasError] = useState(false);
  const bottomRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    let cancelled = false;

    async function run() {
      setLines([{ text: "Connecting to setup API...", type: "step" }]);

      try {
        const res = await fetch("/api/setup", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(selections),
        });

        if (!res.ok || !res.body) {
          const errText = await res.text().catch(() => "Unknown error");
          setLines((prev) => [...prev, { text: `Error: ${errText}`, type: "error" }]);
          setHasError(true);
          setDone(true);
          return;
        }

        const reader = res.body.getReader();
        const decoder = new TextDecoder();
        let buffer = "";

        while (true) {
          const { done: streamDone, value } = await reader.read();
          if (cancelled) break;
          if (streamDone) break;

          buffer += decoder.decode(value, { stream: true });
          const parts = buffer.split("\n\n");
          buffer = parts.pop() ?? "";

          for (const part of parts) {
            const line = part.replace(/^data: /, "").trim();
            if (!line) continue;
            try {
              const event = JSON.parse(line) as { type: string; message: string };
              if (cancelled) break;
              setLines((prev) => [...prev, { text: event.message, type: event.type as LogLine["type"] }]);
              if (event.type === "done") { setDone(true); }
              if (event.type === "error") { setHasError(true); setDone(true); }
            } catch {
              // ignore malformed events
            }
          }
        }
      } catch (err) {
        if (!cancelled) {
          setLines((prev) => [...prev, { text: String(err), type: "error" }]);
          setHasError(true);
          setDone(true);
        }
      }
    }

    void run();
    return () => { cancelled = true; };
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [lines]);

  const lineColor = (type: LogLine["type"]) => {
    if (type === "success" || type === "done") return COLORS.success;
    if (type === "error") return COLORS.error;
    if (type === "step") return COLORS.primary;
    return COLORS.inkMuted;
  };

  const linePrefix = (type: LogLine["type"]) => {
    if (type === "success") return "✓ ";
    if (type === "done") return "✦ ";
    if (type === "error") return "✗ ";
    if (type === "step") return "→ ";
    return "  ";
  };

  return (
    <div>
      <p style={{ fontSize: "12px", fontWeight: 500, letterSpacing: "0.4px", textTransform: "uppercase", color: COLORS.primary, marginBottom: "8px" }}>Configuring</p>
      <h2 style={{ fontSize: "28px", fontWeight: 600, letterSpacing: "-0.6px", lineHeight: 1.2, color: COLORS.ink, margin: 0 }}>
        {done ? (hasError ? "Configuration failed" : "Configuration complete") : "Running setup..."}
      </h2>
      <p style={{ fontSize: "14px", color: COLORS.inkSubtle, marginTop: "8px", marginBottom: "24px", lineHeight: 1.6 }}>
        {done
          ? hasError
            ? "Some steps failed. Review the log and check the terminal for details."
            : "All packages installed. DESIGN.md and CONTINUITY.MD have been updated."
          : "Installing packages and updating configuration files..."}
      </p>

      <div
        style={{
          background: "#0a0a0f",
          border: `1px solid ${COLORS.hairline}`,
          borderRadius: "10px",
          padding: "20px",
          fontFamily: "ui-monospace, SF Mono, Menlo, monospace",
          fontSize: "12px",
          lineHeight: 1.7,
          minHeight: "280px",
          maxHeight: "400px",
          overflowY: "auto",
        }}
      >
        {lines.map((line, i) => (
          <div key={i} style={{ color: lineColor(line.type) }}>
            <span style={{ color: COLORS.inkTertiary, userSelect: "none" }}>{String(i + 1).padStart(3, " ")} │ </span>
            <span style={{ color: lineColor(line.type) }}>{linePrefix(line.type)}</span>
            <span>{line.text}</span>
          </div>
        ))}
        {!done && (
          <div style={{ color: COLORS.inkTertiary }}>
            <span style={{ color: COLORS.inkTertiary, userSelect: "none" }}>{String(lines.length + 1).padStart(3, " ")} │ </span>
            <span style={{ animation: "blink 1s step-start infinite" }}>█</span>
          </div>
        )}
        <div ref={bottomRef} />
      </div>

      {done && !hasError && (
        <div style={{ marginTop: "20px", padding: "16px 20px", borderRadius: "10px", background: COLORS.successTint, border: `1px solid rgba(39,166,68,0.25)`, fontSize: "13px", color: COLORS.inkMuted, lineHeight: 1.6 }}>
          <strong style={{ color: COLORS.success }}>✓ Done.</strong> Check <code style={{ fontFamily: "ui-monospace, monospace", fontSize: "11px", background: "rgba(255,255,255,0.06)", padding: "1px 5px", borderRadius: "3px" }}>DESIGN.md</code> and <code style={{ fontFamily: "ui-monospace, monospace", fontSize: "11px", background: "rgba(255,255,255,0.06)", padding: "1px 5px", borderRadius: "3px" }}>CONTINUITY.MD</code> in the repo root for the updated configuration.
        </div>
      )}

      {done && (
        <div style={{ marginTop: "16px", display: "flex", gap: "10px" }}>
          <button
            id="execution-reset"
            onClick={onReset}
            style={{ padding: "10px 20px", borderRadius: "8px", border: `1px solid ${COLORS.hairline}`, background: "transparent", color: COLORS.inkMuted, fontSize: "14px", fontWeight: 500, cursor: "pointer" }}
          >
            ← Start Over
          </button>
          <a
            href="/"
            style={{ display: "inline-flex", alignItems: "center", padding: "10px 20px", borderRadius: "8px", background: COLORS.primary, color: "#fff", fontSize: "14px", fontWeight: 600, textDecoration: "none" }}
          >
            Go to App →
          </a>
        </div>
      )}

      <style>{`@keyframes blink { 0%, 100% { opacity: 1; } 50% { opacity: 0; } }`}</style>
    </div>
  );
}
