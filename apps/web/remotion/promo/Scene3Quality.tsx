import React from 'react';
import { AbsoluteFill, spring, interpolate, useCurrentFrame, useVideoConfig } from 'remotion';

export const Scene3Quality: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const entrance = spring({ frame, fps, config: { damping: 14, stiffness: 100 } });
  
  const check1 = spring({ frame: frame - 20, fps, config: { damping: 14 } });
  const check2 = spring({ frame: frame - 40, fps, config: { damping: 14 } });
  const check3 = spring({ frame: frame - 60, fps, config: { damping: 14 } });

  const fadeOut = spring({ frame: frame - 150, fps, config: { damping: 20 } });
  const opacity = 1 - fadeOut;

  const checks = [
    { label: "100% Strict TypeScript", animation: check1 },
    { label: "ESLint & Prettier configured", animation: check2 },
    { label: "End-to-End Test Ready", animation: check3 },
  ];

  return (
    <AbsoluteFill className="flex flex-col items-center justify-center bg-zinc-950" style={{ opacity }}>
      <div 
        style={{
          transform: `translateY(${interpolate(entrance, [0, 1], [30, 0])}px)`,
          opacity: entrance,
        }}
        className="w-full max-w-3xl"
      >
        <h2 className="text-5xl font-bold mb-12 text-center text-white">
          Enterprise Quality Control
        </h2>

        <div className="flex flex-col gap-6">
          {checks.map((check, idx) => (
            <div 
              key={idx}
              style={{
                transform: `scale(${check.animation}) translateX(${interpolate(check.animation, [0, 1], [-20, 0])}px)`,
                opacity: check.animation
              }}
              className="flex items-center gap-6 bg-zinc-900 rounded-xl p-6 border border-zinc-800"
            >
              <div className="w-10 h-10 rounded-full bg-emerald-500/20 flex items-center justify-center border border-emerald-500/50 text-emerald-400">
                ✓
              </div>
              <span className="text-2xl font-medium text-zinc-200">{check.label}</span>
            </div>
          ))}
        </div>
      </div>
    </AbsoluteFill>
  );
};
