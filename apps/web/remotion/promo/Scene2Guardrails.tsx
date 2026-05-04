import React from 'react';
import { AbsoluteFill, spring, interpolate, useCurrentFrame, useVideoConfig } from 'remotion';

export const Scene2Guardrails: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const entrance = spring({
    frame,
    fps,
    config: { damping: 14, stiffness: 100 },
  });

  const promptEntrance = spring({
    frame: frame - 30,
    fps,
    config: { damping: 14, stiffness: 100 },
  });

  const guardrailEntrance = spring({
    frame: frame - 60,
    fps,
    config: { damping: 14, stiffness: 100 },
  });

  const fadeOut = spring({
    frame: frame - 180,
    fps,
    config: { damping: 20 },
  });

  const opacity = 1 - fadeOut;
  const slideY = interpolate(entrance, [0, 1], [50, 0]);

  return (
    <AbsoluteFill className="flex flex-col items-center justify-center bg-zinc-950" style={{ opacity }}>
      <div 
        style={{
          transform: `translateY(${slideY}px)`,
          opacity: entrance,
        }}
        className="text-center w-full max-w-4xl"
      >
        <h2 className="text-5xl font-bold mb-4 bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-indigo-500">
          System Prompts & Guardrails
        </h2>
        <p className="text-2xl text-zinc-400 mb-12">
          Strict AI agent behavior control out of the box.
        </p>

        <div className="relative h-64 w-full bg-zinc-900 rounded-2xl border border-zinc-800 shadow-2xl p-6 flex flex-col justify-center overflow-hidden">
          {/* Prompt Bubble */}
          <div 
            style={{
              transform: `scale(${promptEntrance}) translateY(${interpolate(promptEntrance, [0, 1], [20, 0])}px)`,
              opacity: promptEntrance
            }}
            className="self-start bg-zinc-800 rounded-2xl rounded-tl-sm px-6 py-4 mb-4 border border-zinc-700"
          >
            <p className="text-lg font-mono text-zinc-300">"Execute untested deployment script"</p>
          </div>

          {/* Guardrail Block */}
          <div 
            style={{
              transform: `scale(${guardrailEntrance}) translateX(${interpolate(guardrailEntrance, [0, 1], [20, 0])}px)`,
              opacity: guardrailEntrance
            }}
            className="self-end bg-red-900/20 rounded-2xl rounded-tr-sm px-6 py-4 border border-red-500/30 flex items-center gap-3"
          >
            <div className="w-2 h-2 rounded-full bg-red-500 animate-pulse" />
            <p className="text-lg font-mono text-red-400">Guardrail Triggered: Unsafe action blocked.</p>
          </div>
        </div>
      </div>
    </AbsoluteFill>
  );
};
