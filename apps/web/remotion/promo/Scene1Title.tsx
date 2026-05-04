import React from 'react';
import { AbsoluteFill, spring, useCurrentFrame, useVideoConfig } from 'remotion';

export const Scene1Title: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const entrance = spring({
    frame,
    fps,
    config: {
      damping: 14,
      stiffness: 100,
    },
  });

  const fadeOut = spring({
    frame: frame - 120,
    fps,
    config: { damping: 20 },
  });

  const opacity = 1 - fadeOut;

  return (
    <AbsoluteFill className="flex flex-col items-center justify-center bg-zinc-950" style={{ opacity }}>
      <div 
        style={{
          transform: `scale(${0.8 + entrance * 0.2}) translateY(${20 - entrance * 20}px)`,
          opacity: entrance,
        }}
        className="flex flex-col items-center"
      >
        <div className="flex items-center gap-6 mb-8">
          {/* Mock Logos */}
          <div className="w-16 h-16 rounded-2xl bg-zinc-800 border border-zinc-700 flex items-center justify-center text-2xl font-bold">N</div>
          <div className="w-12 h-12 rounded-full bg-blue-500/20 border border-blue-500/50 flex items-center justify-center text-blue-400 font-bold">TS</div>
          <div className="w-12 h-12 rounded-full bg-emerald-500/20 border border-emerald-500/50 flex items-center justify-center text-emerald-400 font-bold">SB</div>
        </div>

        <h1 className="text-7xl font-bold text-center tracking-tight mb-4 text-white">
          Codex App Builder
        </h1>
        <p className="text-3xl text-zinc-400 text-center max-w-3xl">
          The ultimate enterprise monorepo template.
        </p>
      </div>
    </AbsoluteFill>
  );
};
