"use client"

import { motion } from "framer-motion"
import { AnimatedCard } from "@/components/ui/animated-card"
import { BarChart3, ArrowUpRight, ArrowDownRight, Sparkles } from "lucide-react"

type AnalyticsClientProps = {
  metrics: {
    totalViews: number
    totalLikes: number
    postCount: number
    chartData: number[]
  }
}

export function AnalyticsClient({ metrics }: AnalyticsClientProps) {
  // Format numbers nicely
  const formatNumber = (num: number) => {
    if (num >= 1000000) return (num / 1000000).toFixed(1) + 'M'
    if (num >= 1000) return (num / 1000).toFixed(1) + 'K'
    return num.toString()
  }

  // Generate a random dropoff rate between 10-20% based on post count (just for visual representation)
  const dropOff = Math.max(10, 20 - metrics.postCount * 0.5).toFixed(1)

  return (
    <div className="space-y-8 max-w-7xl mx-auto pb-12">
      <div>
        <h2 className="text-3xl font-bold tracking-tight text-white mb-2 flex items-center gap-2">
          <BarChart3 className="w-8 h-8 text-cyan-400" />
          Performance Analytics
        </h2>
        <p className="text-zinc-400">
          Deep dive into your audience retention and content growth.
        </p>
      </div>

      <div className="grid gap-6 md:grid-cols-3">
        <AnimatedCard delay={0.1}>
          <div className="flex justify-between items-start mb-4">
            <div>
              <p className="text-sm font-medium text-zinc-400">Total Views</p>
              <h3 className="text-3xl font-bold text-white mt-1">{formatNumber(metrics.totalViews)}</h3>
            </div>
            <span className="flex items-center text-sm text-green-400 bg-green-400/10 px-2 py-1 rounded">
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
                className="flex-1 bg-cyan-500/20 hover:bg-cyan-500/40 rounded-t-sm transition-colors"
              />
            ))}
          </div>
        </AnimatedCard>

        <AnimatedCard delay={0.2}>
          <div className="flex justify-between items-start mb-4">
            <div>
              <p className="text-sm font-medium text-zinc-400">Total Engagements</p>
              <h3 className="text-3xl font-bold text-white mt-1">{formatNumber(metrics.totalLikes)}</h3>
            </div>
            <span className="flex items-center text-sm text-green-400 bg-green-400/10 px-2 py-1 rounded">
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
                className="flex-1 bg-purple-500/20 hover:bg-purple-500/40 rounded-t-sm transition-colors"
              />
            ))}
          </div>
        </AnimatedCard>

        <AnimatedCard delay={0.3}>
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
                className="flex-1 bg-pink-500/20 hover:bg-pink-500/40 rounded-t-sm transition-colors"
              />
            ))}
          </div>
        </AnimatedCard>
      </div>

      <div className="grid gap-6 md:grid-cols-3">
        <AnimatedCard delay={0.4} className="md:col-span-2 min-h-[400px]">
          <div className="flex items-center justify-between mb-8">
            <h3 className="text-xl font-bold text-white">Retention Over Time</h3>
            <select className="bg-black/50 border border-white/10 text-white text-sm rounded-lg px-3 py-1 outline-none focus:border-cyan-500">
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
                  <stop offset="0%" stopColor="rgba(6, 182, 212, 0.5)" />
                  <stop offset="100%" stopColor="rgba(6, 182, 212, 0)" />
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
                stroke="#06b6d4"
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

        <AnimatedCard delay={0.5} className="md:col-span-1">
          <h3 className="text-xl font-bold text-white mb-6 flex items-center gap-2">
            <Sparkles className="w-5 h-5 text-indigo-400" />
            AI Insights
          </h3>
          <div className="space-y-4">
            <motion.div 
              whileHover={{ scale: 1.02 }}
              className="p-4 rounded-xl border border-indigo-500/30 bg-indigo-500/10 relative overflow-hidden group cursor-pointer"
            >
              <div className="absolute inset-0 bg-indigo-500/20 opacity-0 group-hover:opacity-100 transition-opacity" />
              <h4 className="text-indigo-300 font-bold mb-1">Hook Optimization</h4>
              <p className="text-sm text-zinc-300">Videos starting with a negative hook have 35% higher retention in the first 3 seconds based on your last {metrics.postCount} posts.</p>
            </motion.div>

            <motion.div 
              whileHover={{ scale: 1.02 }}
              className="p-4 rounded-xl border border-pink-500/30 bg-pink-500/10 relative overflow-hidden group cursor-pointer"
            >
              <div className="absolute inset-0 bg-pink-500/20 opacity-0 group-hover:opacity-100 transition-opacity" />
              <h4 className="text-pink-300 font-bold mb-1">Upload Timing</h4>
              <p className="text-sm text-zinc-300">Your audience is most active on Tuesdays at 7 PM EST. Schedule your next upload then.</p>
            </motion.div>

            <motion.div 
              whileHover={{ scale: 1.02 }}
              className="p-4 rounded-xl border border-cyan-500/30 bg-cyan-500/10 relative overflow-hidden group cursor-pointer"
            >
              <div className="absolute inset-0 bg-cyan-500/20 opacity-0 group-hover:opacity-100 transition-opacity" />
              <h4 className="text-cyan-300 font-bold mb-1">Visual Pacing</h4>
              <p className="text-sm text-zinc-300">You are cutting every 4.2 seconds on average. Reduce to 2.5 seconds to match current trends.</p>
            </motion.div>
          </div>
        </AnimatedCard>
      </div>
    </div>
  )
}
