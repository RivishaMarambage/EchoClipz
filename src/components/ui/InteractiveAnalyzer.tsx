"use client";

import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Check, Sparkles } from 'lucide-react';

export default function InteractiveAnalyzer() {
  const [pulse, setPulse] = useState(true);

  // Toggle subtle status indicator pulse
  useEffect(() => {
    const interval = setInterval(() => {
      setPulse((p) => !p);
    }, 1500);
    return () => clearInterval(interval);
  }, []);

  const timelineClips = [
    { time: "00:42", label: "Epic Clutch Moment", score: 94, active: true },
    { time: "01:15", label: "Multi-kill Highlight", score: 96, active: true },
    { time: "02:50", label: "High Energy Reaction", score: 91, active: true },
  ];

  return (
    <div className="relative rounded-2xl bg-[#09090b] border border-zinc-800/80 overflow-hidden shadow-2xl w-full flex flex-col p-6 gap-6 select-none">
      
      {/* Top Window Headers */}
      <div className="flex items-center justify-between border-b border-zinc-800/50 pb-4 shrink-0">
        <div className="flex items-center gap-2">
          <div className="w-2.5 h-2.5 rounded-full bg-zinc-800" />
          <div className="w-2.5 h-2.5 rounded-full bg-zinc-800" />
          <div className="w-2.5 h-2.5 rounded-full bg-zinc-800" />
          <span className="ml-3 text-xs font-mono text-zinc-500">echoclipz_analyzer.exe</span>
        </div>
        <div className="flex items-center gap-1.5 text-[10px] font-mono font-medium text-zinc-500">
          <span className={`w-1.5 h-1.5 rounded-full bg-[#39FF14] ${pulse ? 'opacity-100 scale-110 shadow-[0_0_8px_#39FF14]' : 'opacity-40'} transition-all duration-500`} />
          ANALYZING
        </div>
      </div>

      {/* Main Stats Summary Header */}
      <div className="flex flex-col gap-1 shrink-0 text-left">
        <span className="text-[10px] font-mono uppercase tracking-wider text-zinc-500">Current Stream</span>
        <h3 className="text-sm font-semibold text-white font-mono">
          AI Analyzing: <span className="text-[#39FF14]">gaming_session_4h.mp4</span>
        </h3>
      </div>

      {/* Sleek Pulse Waveform Visualizer */}
      <div className="relative h-20 bg-zinc-950/60 rounded-xl border border-zinc-900/50 flex items-center px-4 overflow-hidden group">
        {/* Scanning Laser Line */}
        <motion.div 
          animate={{
            left: ['0%', '100%']
          }}
          transition={{
            duration: 6,
            repeat: Infinity,
            ease: "easeInOut"
          }}
          className="absolute top-0 bottom-0 w-[1.5px] bg-[#39FF14] shadow-[0_0_10px_#39FF14] z-20 pointer-events-none"
        />

        {/* Dynamic Waveform Bars */}
        <div className="w-full h-10 flex justify-between items-center gap-[2px]">
          {Array.from({ length: 42 }).map((_, i) => {
            const isHighlighted = i > 8 && i < 16 || i > 20 && i < 28 || i > 32;
            const rawHeight = isHighlighted ? 28 + Math.sin(i) * 8 : 12 + Math.cos(i) * 4;
            const targetHeight = Math.round(rawHeight);
            
            return (
              <motion.div 
                key={i}
                animate={{
                  height: [targetHeight, Math.round(targetHeight * 0.7), targetHeight]
                }}
                transition={{
                  duration: 2.2,
                  repeat: Infinity,
                  delay: i * 0.04
                }}
                style={{ height: `${targetHeight}px` }}
                className={`w-[3px] rounded-full transition-all duration-300 ${isHighlighted ? 'bg-[#39FF14] opacity-80 shadow-[0_0_4px_rgba(57,255,20,0.25)]' : 'bg-zinc-800 opacity-40'}`}
              />
            );
          })}
        </div>
      </div>

      {/* Clean Timeline Tracks List */}
      <div className="flex flex-col gap-3 shrink-0">
        <div className="flex justify-between items-center text-[10px] font-mono text-zinc-500 select-none">
          <span>VIRAL CLIP DETECTIONS</span>
          <span className="text-zinc-400 font-semibold flex items-center gap-1">
            <Sparkles className="w-3 h-3 text-[#39FF14]" />
            Active Mode
          </span>
        </div>

        <div className="flex flex-col gap-2.5">
          {timelineClips.map((clip, index) => (
            <motion.div 
              key={index}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.15 + 0.3 }}
              className="flex items-center justify-between p-3.5 bg-zinc-950/40 rounded-xl border border-zinc-900/50 hover:border-zinc-800 transition-colors"
            >
              <div className="flex items-center gap-3.5">
                <span className="text-xs font-mono font-bold text-zinc-500">{clip.time}</span>
                <span className="text-xs font-semibold text-zinc-200">{clip.label}</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="text-[10px] font-bold font-mono text-[#39FF14] bg-[#39FF14]/10 border border-[#39FF14]/20 px-2.5 py-0.5 rounded-full uppercase tracking-wider">
                  {clip.score}% VIRAL
                </span>
                <Check className="w-3.5 h-3.5 text-[#39FF14]" />
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Minimalist Metrics Footer Cards */}
      <div className="flex gap-4 border-t border-zinc-800/40 pt-5 mt-1 shrink-0">
        <div className="flex-1 bg-zinc-950/40 border border-zinc-900 rounded-xl p-3.5 flex flex-col text-left">
          <span className="text-[9px] font-mono text-zinc-500 uppercase tracking-wider mb-1">Clips Found</span>
          <span className="text-xl font-bold text-white font-mono tracking-tight">12</span>
        </div>
        <div className="flex-1 bg-zinc-950/40 border border-zinc-900 rounded-xl p-3.5 flex flex-col text-left">
          <span className="text-[9px] font-mono text-zinc-500 uppercase tracking-wider mb-1">Avg. Retention</span>
          <span className="text-xl font-bold text-[#39FF14] font-mono tracking-tight">94.2%</span>
        </div>
      </div>

    </div>
  );
}
