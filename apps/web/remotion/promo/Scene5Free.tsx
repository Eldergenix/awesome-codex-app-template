import React from 'react';
import { AbsoluteFill, spring, interpolate, useCurrentFrame, useVideoConfig } from 'remotion';

export const Scene5Free: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const entrance = spring({ frame, fps, config: { damping: 14, stiffness: 100 } });
  
  const textPop = spring({ frame: frame - 20, fps, config: { damping: 10, stiffness: 150 } });

  return (
    <AbsoluteFill className="flex flex-col items-center justify-center bg-zinc-950">
      <div 
        style={{
          transform: `scale(${interpolate(entrance, [0, 1], [0.8, 1])})`,
          opacity: entrance,
        }}
        className="flex flex-col items-center"
      >
        <div className="w-24 h-24 rounded-full bg-white flex items-center justify-center mb-8">
          <svg viewBox="0 0 24 24" className="w-12 h-12 text-black" fill="currentColor">
            <path d="M12 2C6.477 2 2 6.477 2 12c0 4.42 2.865 8.166 6.839 9.489.5.092.682-.217.682-.482 0-.237-.008-.866-.013-1.7-2.782.603-3.369-1.34-3.369-1.34-.454-1.156-1.11-1.462-1.11-1.462-.908-.62.069-.608.069-.608 1.003.07 1.531 1.03 1.531 1.03.892 1.529 2.341 1.087 2.91.831.092-.646.35-1.086.636-1.336-2.22-.253-4.555-1.11-4.555-4.943 0-1.091.39-1.984 1.029-2.683-.103-.253-.446-1.27.098-2.647 0 0 .84-.269 2.75 1.025A9.578 9.578 0 0112 6.836c.85.004 1.705.114 2.504.336 1.909-1.294 2.747-1.025 2.747-1.025.546 1.377.203 2.394.1 2.647.64.699 1.028 1.592 1.028 2.683 0 3.842-2.339 4.687-4.566 4.935.359.309.678.919.678 1.852 0 1.336-.012 2.415-.012 2.743 0 .267.18.578.688.48C19.138 20.161 22 16.418 22 12c0-5.523-4.477-10-10-10z" />
          </svg>
        </div>

        <h2 className="text-6xl font-bold mb-4 text-center text-white">
          100% Free & Open Source
        </h2>
        
        <div 
          style={{
            transform: `scale(${textPop})`,
            opacity: textPop
          }}
          className="bg-zinc-900 border border-zinc-800 rounded-full px-8 py-3 mt-8"
        >
          <span className="text-2xl text-zinc-300 font-medium">Available now on GitHub</span>
        </div>
      </div>
    </AbsoluteFill>
  );
};
