"use client";

import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Check, Sparkles, UploadCloud, Play, Download, Scissors } from 'lucide-react';

interface Clip {
  id: string;
  time: string;
  label: string;
  score: number;
}

export default function ClipsPage() {
  const [phase, setPhase] = useState<'idle' | 'analyzing' | 'done'>('idle');
  const [pulse, setPulse] = useState(true);
  const [progress, setProgress] = useState(0);
  const [clips, setClips] = useState<Clip[]>([]);
  const fileInputRef = useRef<HTMLInputElement>(null);

  // Toggle subtle status indicator pulse
  useEffect(() => {
    const interval = setInterval(() => {
      setPulse((p) => !p);
    }, 1500);
    return () => clearInterval(interval);
  }, []);

  const handleUpload = () => {
    setPhase('analyzing');
    setProgress(0);
    setClips([]);

    let p = 0;
    const interval = setInterval(() => {
      p += Math.floor(Math.random() * 5) + 1;
      if (p >= 100) {
        p = 100;
        clearInterval(interval);
        setTimeout(() => {
          setPhase('done');
          setClips([
            { id: "1", time: "00:42", label: "Epic Clutch Moment", score: 94 },
            { id: "2", time: "01:15", label: "Multi-kill Highlight", score: 96 },
            { id: "3", time: "02:50", label: "High Energy Reaction", score: 91 },
            { id: "4", time: "05:12", label: "Insane Snipe", score: 88 },
            { id: "5", time: "08:30", label: "Funny Glitch", score: 92 },
          ]);
        }, 500);
      }
      setProgress(p);
    }, 150);
  };

  return (
    <div className="max-w-4xl mx-auto space-y-8 pb-12">
      <div className="flex items-center gap-3 mb-8">
         <Scissors className="w-8 h-8 text-[#39FF14]" />
         <div>
            <h2 className="text-3xl font-bold tracking-tight text-white font-mono">Clip Analyzer</h2>
            <p className="text-zinc-400">Extract viral moments with AI.</p>
         </div>
      </div>

      <div className="relative rounded-2xl bg-[#09090b] border border-zinc-800/80 overflow-hidden shadow-2xl w-full flex flex-col p-6 gap-6">
        
        {/* Top Window Headers */}
        <div className="flex items-center justify-between border-b border-zinc-800/50 pb-4 shrink-0">
          <div className="flex items-center gap-2">
            <div className="w-2.5 h-2.5 rounded-full bg-zinc-800" />
            <div className="w-2.5 h-2.5 rounded-full bg-zinc-800" />
            <div className="w-2.5 h-2.5 rounded-full bg-zinc-800" />
            <span className="ml-3 text-xs font-mono text-zinc-500">clipflow_analyzer.exe</span>
          </div>
          <div className="flex items-center gap-1.5 text-[10px] font-mono font-medium text-zinc-500 uppercase">
            <span className={`w-1.5 h-1.5 rounded-full ${phase === 'analyzing' ? 'bg-[#39FF14]' : 'bg-zinc-600'} ${pulse && phase === 'analyzing' ? 'opacity-100 scale-110 shadow-[0_0_8px_#39FF14]' : 'opacity-40'} transition-all duration-500`} />
            {phase === 'analyzing' ? 'ANALYZING' : phase === 'done' ? 'COMPLETE' : 'IDLE'}
          </div>
        </div>

        <AnimatePresence mode="wait">
          {phase === 'idle' && (
             <motion.div 
               key="idle"
               initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
               className="flex flex-col items-center justify-center py-16 px-4 border-2 border-dashed border-zinc-800 rounded-xl hover:border-[#39FF14]/50 hover:bg-[#39FF14]/5 transition-all cursor-pointer group"
               onClick={() => fileInputRef.current?.click()}
             >
                <input ref={fileInputRef} type="file" className="hidden" accept="video/*" onChange={handleUpload} />
                <div className="w-16 h-16 rounded-full bg-zinc-900 group-hover:bg-[#39FF14]/10 flex items-center justify-center mb-4 transition-colors">
                  <UploadCloud className="w-8 h-8 text-zinc-500 group-hover:text-[#39FF14] transition-colors" />
                </div>
                <h3 className="text-lg font-mono font-bold text-white mb-2">Drop Video to Analyze</h3>
                <p className="text-zinc-500 text-sm font-mono text-center max-w-sm">
                  Upload your stream VOD. We'll find the best highlights automatically.
                </p>
                <button 
                  className="mt-6 bg-[#39FF14] hover:bg-[#2ee610] text-black font-bold font-mono px-6 py-2 rounded-lg text-sm transition-colors shadow-[0_0_15px_rgba(57,255,20,0.3)]"
                  onClick={(e) => { e.stopPropagation(); handleUpload(); }}
                >
                  START ANALYSIS
                </button>
             </motion.div>
          )}

          {(phase === 'analyzing' || phase === 'done') && (
            <motion.div key="active" initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="flex flex-col gap-6">
              {/* Main Stats Summary Header */}
              <div className="flex flex-col gap-1 shrink-0 text-left">
                <div className="flex justify-between items-end">
                   <div>
                     <span className="text-[10px] font-mono uppercase tracking-wider text-zinc-500">Current Stream</span>
                     <h3 className="text-sm font-semibold text-white font-mono">
                       AI Analyzing: <span className="text-[#39FF14]">gaming_session_4h.mp4</span>
                     </h3>
                   </div>
                   {phase === 'analyzing' && (
                     <div className="text-sm font-mono font-bold text-[#39FF14]">{progress}%</div>
                   )}
                </div>
              </div>

              {/* Sleek Pulse Waveform Visualizer */}
              <div className="relative h-24 bg-zinc-950/60 rounded-xl border border-zinc-900/50 flex items-center px-4 overflow-hidden group">
                {/* Scanning Laser Line */}
                {phase === 'analyzing' && (
                  <motion.div 
                    animate={{ left: ['0%', '100%'] }}
                    transition={{ duration: 4, repeat: Infinity, ease: "linear" }}
                    className="absolute top-0 bottom-0 w-[2px] bg-[#39FF14] shadow-[0_0_15px_#39FF14] z-20 pointer-events-none"
                  />
                )}

                {/* Dynamic Waveform Bars */}
                <div className="w-full h-16 flex justify-between items-center gap-[2px]">
                  {Array.from({ length: 80 }).map((_, i) => {
                    const isHighlighted = (i > 10 && i < 18) || (i > 30 && i < 40) || (i > 60 && i < 75);
                    const rawHeight = isHighlighted ? 40 + Math.sin(i) * 15 : 15 + Math.cos(i) * 5;
                    const targetHeight = Math.round(rawHeight);
                    
                    return (
                      <motion.div 
                        key={i}
                        animate={phase === 'analyzing' ? {
                          height: [targetHeight, Math.round(targetHeight * 0.6), targetHeight]
                        } : { height: targetHeight }}
                        transition={{ duration: 2.2, repeat: Infinity, delay: i * 0.04 }}
                        style={{ height: `${targetHeight}px` }}
                        className={`w-1.5 rounded-full transition-all duration-300 ${
                          phase === 'done' && isHighlighted ? 'bg-[#39FF14] opacity-90 shadow-[0_0_8px_rgba(57,255,20,0.3)]' :
                          phase === 'analyzing' && isHighlighted ? 'bg-[#39FF14] opacity-80 shadow-[0_0_4px_rgba(57,255,20,0.25)]' : 
                          'bg-zinc-800 opacity-40'
                        }`}
                      />
                    );
                  })}
                </div>
              </div>

              {phase === 'analyzing' && (
                 <div className="py-8 flex flex-col items-center justify-center">
                    <Sparkles className="w-8 h-8 text-[#39FF14] mb-4 animate-pulse" />
                    <p className="text-zinc-400 font-mono text-sm animate-pulse">Scanning audio frequencies & visual peaks...</p>
                 </div>
              )}

              {phase === 'done' && (
                <>
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
                      {clips.map((clip, index) => (
                        <motion.div 
                          key={index}
                          initial={{ opacity: 0, y: 10 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{ delay: index * 0.1 }}
                          className="flex items-center justify-between p-4 bg-zinc-950/40 rounded-xl border border-zinc-900/50 hover:border-[#39FF14]/30 hover:bg-[#39FF14]/5 transition-all group"
                        >
                          <div className="flex items-center gap-4">
                            <button className="w-8 h-8 rounded-full bg-zinc-900 group-hover:bg-[#39FF14] flex items-center justify-center transition-colors">
                               <Play className="w-3 h-3 text-zinc-500 group-hover:text-black ml-0.5" fill="currentColor" />
                            </button>
                            <span className="text-sm font-mono font-bold text-zinc-500 group-hover:text-zinc-300 transition-colors">{clip.time}</span>
                            <span className="text-sm font-semibold text-zinc-200">{clip.label}</span>
                          </div>
                          <div className="flex items-center gap-4">
                            <span className="text-[10px] font-bold font-mono text-[#39FF14] bg-[#39FF14]/10 border border-[#39FF14]/20 px-2.5 py-1 rounded-full uppercase tracking-wider">
                              {clip.score}% VIRAL
                            </span>
                            <button className="w-8 h-8 rounded-full border border-zinc-800 flex items-center justify-center hover:border-[#39FF14] hover:text-[#39FF14] text-zinc-500 transition-colors">
                               <Download className="w-3.5 h-3.5" />
                            </button>
                            <Check className="w-4 h-4 text-[#39FF14] opacity-50 group-hover:opacity-100 transition-opacity" />
                          </div>
                        </motion.div>
                      ))}
                    </div>
                  </div>

                  {/* Minimalist Metrics Footer Cards */}
                  <div className="flex gap-4 border-t border-zinc-800/40 pt-5 mt-2 shrink-0">
                    <div className="flex-1 bg-zinc-950/40 border border-zinc-900 rounded-xl p-4 flex flex-col text-left">
                      <span className="text-[10px] font-mono text-zinc-500 uppercase tracking-wider mb-1">Clips Found</span>
                      <span className="text-2xl font-bold text-white font-mono tracking-tight">{clips.length}</span>
                    </div>
                    <div className="flex-1 bg-zinc-950/40 border border-zinc-900 rounded-xl p-4 flex flex-col text-left">
                      <span className="text-[10px] font-mono text-zinc-500 uppercase tracking-wider mb-1">Avg. Retention</span>
                      <span className="text-2xl font-bold text-[#39FF14] font-mono tracking-tight">94.2%</span>
                    </div>
                  </div>
                </>
              )}
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}
