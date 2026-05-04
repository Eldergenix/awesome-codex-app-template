import React from 'react';
import { AbsoluteFill, spring, interpolate, useCurrentFrame, useVideoConfig } from 'remotion';

export const Scene4Setup: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const entrance = spring({ frame, fps, config: { damping: 14, stiffness: 100 } });
  
  const step1 = spring({ frame: frame - 20, fps, config: { damping: 14 } });
  const step2 = spring({ frame: frame - 60, fps, config: { damping: 14 } });
  const step3 = spring({ frame: frame - 100, fps, config: { damping: 14 } });

  const fadeOut = spring({ frame: frame - 180, fps, config: { damping: 20 } });
  const opacity = 1 - fadeOut;

  return (
    <AbsoluteFill className="flex flex-col items-center justify-center bg-zinc-950" style={{ opacity }}>
      <div 
        style={{
          transform: `scale(${interpolate(entrance, [0, 1], [0.9, 1])})`,
          opacity: entrance,
        }}
        className="w-full max-w-4xl flex flex-col items-center"
      >
        <h2 className="text-5xl font-bold mb-6 text-center text-white">
          Frictionless Setup
        </h2>
        <p className="text-2xl text-zinc-400 mb-16 text-center max-w-2xl">
          From clone to production in minutes. Pre-configured onboarding flows included.
        </p>

        <div className="flex items-center gap-4 w-full justify-between">
          {/* Step 1 */}
          <div 
            style={{ opacity: step1, transform: `translateY(${interpolate(step1, [0, 1], [20, 0])}px)` }}
            className="flex-1 flex flex-col items-center bg-zinc-900/50 p-8 rounded-2xl border border-zinc-800"
          >
            <div className="w-16 h-16 rounded-full bg-zinc-800 flex items-center justify-center text-2xl mb-4 font-mono">1</div>
            <span className="text-xl font-medium text-zinc-300">pnpm install</span>
          </div>

          <div className="text-zinc-600 text-4xl">→</div>

          {/* Step 2 */}
          <div 
            style={{ opacity: step2, transform: `translateY(${interpolate(step2, [0, 1], [20, 0])}px)` }}
            className="flex-1 flex flex-col items-center bg-zinc-900/50 p-8 rounded-2xl border border-zinc-800"
          >
            <div className="w-16 h-16 rounded-full bg-zinc-800 flex items-center justify-center text-2xl mb-4 font-mono">2</div>
            <span className="text-xl font-medium text-zinc-300">Link Supabase</span>
          </div>

          <div className="text-zinc-600 text-4xl">→</div>

          {/* Step 3 */}
          <div 
            style={{ opacity: step3, transform: `translateY(${interpolate(step3, [0, 1], [20, 0])}px)` }}
            className="flex-1 flex flex-col items-center bg-blue-900/20 p-8 rounded-2xl border border-blue-500/30"
          >
            <div className="w-16 h-16 rounded-full bg-blue-500/20 flex items-center justify-center text-2xl mb-4 text-blue-400 font-bold">▲</div>
            <span className="text-xl font-medium text-blue-400">Deploy to Vercel</span>
          </div>
        </div>
      </div>
    </AbsoluteFill>
  );
};
