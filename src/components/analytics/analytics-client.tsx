"use client"

import { motion } from "framer-motion"
import { AnimatedCard } from "@/components/ui/animated-card"
import { BarChart3, ArrowUpRight, ArrowDownRight, Sparkles, Flame, Play } from "lucide-react"

type AnalyticsClientProps = {
  metrics: {
    totalViews: number
    totalLikes: number
    postCount: number
    chartData: number[]
  }
}

const viralStreams = [
  {
    id: 1,
    title: "Kai Cenat Elden Ring Boss Rage",
    genre: "Gaming / RPG",
    views: "3.4M",
    retention: "81%",
    caption: "120 hours in and he finally lost it... 😂😭 #kaicenat #eldenring #twitchclips #rage",
  },
  {
    id: 2,
    title: "IShowSpeed IRL Stream Chaos",
    genre: "IRL / Comedy",
    views: "4.1M",
    retention: "78%",
    caption: "Speed is actually a menace to society 💀🏃‍♂️ #ishowspeed #irlstream #speed",
  },
  {
    id: 3,
    title: "Jynxzi R6 1v5 Clutch Reaction",
    genre: "Gaming / FPS",
    views: "2.8M",
    retention: "74%",
    caption: "GOOD AIM!!! The most insane 1v5 clutch of the year 🔥🎮 #jynxzi #rainbowsixsiege #r6",
  }
];

export function AnalyticsClient({ metrics }: AnalyticsClientProps) {
  // Format numbers nicely
  const formatNumber = (num: number) => {
    if (num >= 1000000) return (num / 1000000).toFixed(1) + 'M'
    if (num >= 1000) return (num / 1000).toFixed(1) + 'K'
    return num.toString()
  }

  // Generate a random dropoff rate between 10-20% based on post count
  const dropOff = Math.max(10, 20 - metrics.postCount * 0.5).toFixed(1)

  return (
    <div className="space-y-8 max-w-7xl mx-auto pb-12">
      <div>
        <h2 className="text-3xl font-bold tracking-tight text-white mb-2 flex items-center gap-2">
          <BarChart3 className="w-8 h-8 text-[#39FF14]" />
          Performance Analytics
        </h2>
        <p className="text-zinc-400">
          Deep dive into your audience retention and content growth.
        </p>
      </div>

      {/* NEW: Weekly Most Viral Streams */}
      <div className="mt-8">
        <h3 className="text-xl font-bold text-white mb-4 flex items-center gap-2">
          <Flame className="w-6 h-6 text-[#39FF14]" />
          Weekly Most Viral Streams
        </h3>
        <div className="grid gap-4 md:grid-cols-3">
          {viralStreams.map((stream, i) => (
            <AnimatedCard key={stream.id} delay={0.1 + (i * 0.1)} className="flex flex-col gap-4 overflow-hidden border border-[#39FF14]/10 bg-zinc-950/50 hover:border-[#39FF14]/30 transition-colors">
              {/* Info */}
              <div className="flex-1 flex flex-col justify-between">
                <div>
                  <div className="flex justify-between items-start mb-1">
                    <h4 className="font-bold text-white leading-tight">{stream.title}</h4>
                  </div>
                  <span className="text-[10px] uppercase font-mono text-[#39FF14] tracking-wider">{stream.genre}</span>
                  
                  <div className="flex items-center gap-4 mt-3 mb-4">
                    <div>
                      <p className="text-[10px] text-zinc-500 uppercase tracking-wider mb-0.5">Views</p>
                      <p className="font-mono font-bold text-white text-sm">{stream.views}</p>
                    </div>
                    <div>
                      <p className="text-[10px] text-zinc-500 uppercase tracking-wider mb-0.5">Retention</p>
                      <p className="font-mono font-bold text-[#39FF14] text-sm">{stream.retention}</p>
                    </div>
                  </div>
                </div>

                {/* Caption / Hashtags */}
                <div className="bg-[#39FF14]/5 border border-[#39FF14]/10 rounded-md p-3">
                  <div className="flex items-center gap-1.5 mb-1.5">
                    <Sparkles className="w-3.5 h-3.5 text-[#39FF14]" />
                    <span className="text-xs font-bold text-[#39FF14]">AI Caption Used</span>
                  </div>
                  <p className="text-xs text-zinc-300 leading-relaxed italic">
                    "{stream.caption}"
                  </p>
                </div>
              </div>
            </AnimatedCard>
          ))}
        </div>
      </div>

      <div className="grid gap-6 md:grid-cols-3 mt-8">
        <AnimatedCard delay={0.4}>
          <div className="flex justify-between items-start mb-4">
            <div>
              <p className="text-sm font-medium text-zinc-400">Total Views</p>
              <h3 className="text-3xl font-bold text-white mt-1">{formatNumber(metrics.totalViews)}</h3>
            </div>
            <span className="flex items-center text-sm text-[#39FF14] bg-[#39FF14]/10 px-2 py-1 rounded">
              <ArrowUpRight className="w-4 h-4 mr-1" />
              24%
            </span>
          </div>
          <div className="h-12 w-full flex items-end gap-1">
            {metrics.chartData.slice(0, 7).map((h, i) => (
              <motion.div
                key={i}
                initial={{ height: 0 }}
                animate={{ height: `${h}%` }}
                transition={{ duration: 1, delay: i * 0.1 }}
                className="flex-1 bg-[#39FF14]/20 hover:bg-[#39FF14]/40 rounded-t-sm transition-colors"
              />
            ))}
          </div>
        </AnimatedCard>

        <AnimatedCard delay={0.5}>
          <div className="flex justify-between items-start mb-4">
            <div>
              <p className="text-sm font-medium text-zinc-400">Total Engagements</p>
              <h3 className="text-3xl font-bold text-white mt-1">{formatNumber(metrics.totalLikes)}</h3>
            </div>
            <span className="flex items-center text-sm text-[#39FF14] bg-[#39FF14]/10 px-2 py-1 rounded">
              <ArrowUpRight className="w-4 h-4 mr-1" />
              12%
            </span>
          </div>
          <div className="h-12 w-full flex items-end gap-1">
            {metrics.chartData.slice(5, 12).map((h, i) => (
              <motion.div
                key={i}
                initial={{ height: 0 }}
                animate={{ height: `${h}%` }}
                transition={{ duration: 1, delay: 0.2 + (i * 0.1) }}
                className="flex-1 bg-[#39FF14]/20 hover:bg-[#39FF14]/40 rounded-t-sm transition-colors"
              />
            ))}
          </div>
        </AnimatedCard>

        <AnimatedCard delay={0.6}>
          <div className="flex justify-between items-start mb-4">
            <div>
              <p className="text-sm font-medium text-zinc-400">Audience Drop-off</p>
              <h3 className="text-3xl font-bold text-white mt-1">{dropOff}%</h3>
            </div>
            <span className="flex items-center text-sm text-red-400 bg-red-400/10 px-2 py-1 rounded">
              <ArrowDownRight className="w-4 h-4 mr-1" />
              4%
            </span>
          </div>
          <div className="h-12 w-full flex items-end gap-1">
            {metrics.chartData.slice(2, 9).reverse().map((h, i) => (
              <motion.div
                key={i}
                initial={{ height: 0 }}
                animate={{ height: `${h}%` }}
                transition={{ duration: 1, delay: 0.4 + (i * 0.1) }}
                className="flex-1 bg-[#39FF14]/20 hover:bg-[#39FF14]/40 rounded-t-sm transition-colors"
              />
            ))}
          </div>
        </AnimatedCard>
      </div>

      <div className="grid gap-6 md:grid-cols-3">
        <AnimatedCard delay={0.7} className="md:col-span-2 min-h-[400px]">
          <div className="flex items-center justify-between mb-8">
            <h3 className="text-xl font-bold text-white">Retention Over Time</h3>
            <select className="bg-black/50 border border-white/10 text-white text-sm rounded-lg px-3 py-1 outline-none focus:border-[#39FF14]">
              <option>Last 30 Days</option>
              <option>Last 7 Days</option>
            </select>
          </div>
          
          <div className="relative h-[250px] w-full mt-4 flex items-end justify-between px-2">
            <div className="absolute inset-0 flex flex-col justify-between border-l border-b border-white/10 pb-6 pl-2 pointer-events-none">
              <div className="w-full border-t border-white/5 h-0" />
              <div className="w-full border-t border-white/5 h-0" />
              <div className="w-full border-t border-white/5 h-0" />
              <div className="w-full border-t border-white/5 h-0" />
            </div>

            <svg className="absolute inset-0 h-full w-full overflow-visible pb-6 pl-2" preserveAspectRatio="none">
              <defs>
                <linearGradient id="gradient" x1="0" x2="0" y1="0" y2="1">
                  <stop offset="0%" stopColor="rgba(57, 255, 20, 0.3)" />
                  <stop offset="100%" stopColor="rgba(57, 255, 20, 0)" />
                </linearGradient>
              </defs>
              <motion.path
                d="M 0,200 C 100,200 150,100 250,150 C 350,200 450,50 550,100 C 650,150 750,0 850,50 L 850,250 L 0,250 Z"
                fill="url(#gradient)"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 1, delay: 0.5 }}
                className="w-full h-full"
                vectorEffect="non-scaling-stroke"
              />
              <motion.path
                d="M 0,200 C 100,200 150,100 250,150 C 350,200 450,50 550,100 C 650,150 750,0 850,50"
                fill="none"
                stroke="#39FF14"
                strokeWidth="3"
                initial={{ pathLength: 0 }}
                animate={{ pathLength: 1 }}
                transition={{ duration: 2, ease: "easeInOut", delay: 0.5 }}
                vectorEffect="non-scaling-stroke"
              />
            </svg>
            
            <div className="absolute bottom-0 w-full flex justify-between text-xs text-zinc-500 px-4">
              <span>Oct 1</span>
              <span>Oct 8</span>
              <span>Oct 15</span>
              <span>Oct 22</span>
              <span>Oct 29</span>
            </div>
          </div>
        </AnimatedCard>

        <AnimatedCard delay={0.8} className="md:col-span-1">
          <h3 className="text-xl font-bold text-white mb-6 flex items-center gap-2">
            <Sparkles className="w-5 h-5 text-[#39FF14]" />
            AI Insights
          </h3>
          <div className="space-y-4">
            <motion.div 
              whileHover={{ scale: 1.02 }}
              className="p-4 rounded-xl border border-[#39FF14]/30 bg-[#39FF14]/5 relative overflow-hidden group cursor-pointer"
            >
              <div className="absolute inset-0 bg-[#39FF14]/10 opacity-0 group-hover:opacity-100 transition-opacity" />
              <h4 className="text-[#39FF14] font-bold mb-1">Hook Optimization</h4>
              <p className="text-sm text-zinc-300">Videos starting with a negative hook have 35% higher retention in the first 3 seconds based on your last {metrics.postCount} posts.</p>
            </motion.div>

            <motion.div 
              whileHover={{ scale: 1.02 }}
              className="p-4 rounded-xl border border-[#39FF14]/30 bg-[#39FF14]/5 relative overflow-hidden group cursor-pointer"
            >
              <div className="absolute inset-0 bg-[#39FF14]/10 opacity-0 group-hover:opacity-100 transition-opacity" />
              <h4 className="text-[#39FF14] font-bold mb-1">Upload Timing</h4>
              <p className="text-sm text-zinc-300">Your audience is most active on Tuesdays at 7 PM EST. Schedule your next upload then.</p>
            </motion.div>

            <motion.div 
              whileHover={{ scale: 1.02 }}
              className="p-4 rounded-xl border border-[#39FF14]/30 bg-[#39FF14]/5 relative overflow-hidden group cursor-pointer"
            >
              <div className="absolute inset-0 bg-[#39FF14]/10 opacity-0 group-hover:opacity-100 transition-opacity" />
              <h4 className="text-[#39FF14] font-bold mb-1">Visual Pacing</h4>
              <p className="text-sm text-zinc-300">You are cutting every 4.2 seconds on average. Reduce to 2.5 seconds to match current trends.</p>
            </motion.div>
          </div>
        </AnimatedCard>
      </div>
    </div>
  )
}
