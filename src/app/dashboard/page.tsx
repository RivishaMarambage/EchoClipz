"use client"

import { motion } from "framer-motion"
import { AnimatedCard } from "@/components/ui/animated-card"
import { PerformanceCard, CardVisual, Visual1, CardBody, CardTitle, CardDescription } from "@/components/ui/performance-visual-card"
import { Activity, Flame, TrendingUp, Users, Video } from "lucide-react"

export default function DashboardPage() {
  return (
    <div className="space-y-8 max-w-7xl mx-auto pb-12">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-3xl font-bold tracking-tight text-white mb-2">Welcome back, Creator</h2>
          <p className="text-zinc-400">Here's what's happening with your content today.</p>
        </div>
      </div>

      {/* High-level stats */}
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
        <AnimatedCard delay={0.1} className="flex flex-col gap-4">
          <div className="flex items-center justify-between">
            <h3 className="text-sm font-medium text-zinc-400">Total Views (30d)</h3>
            <div className="p-2 bg-[#39FF14]/10 rounded-lg">
              <Activity className="w-4 h-4 text-[#39FF14]" />
            </div>
          </div>
          <div className="text-3xl font-bold text-white">3.1M</div>
          <p className="text-xs text-[#39FF14] flex items-center"><TrendingUp className="w-3 h-3 mr-1" /> +22.4% from last month</p>
        </AnimatedCard>

        <AnimatedCard delay={0.2} className="flex flex-col gap-4">
          <div className="flex items-center justify-between">
            <h3 className="text-sm font-medium text-zinc-400">Avg Retention</h3>
            <div className="p-2 bg-[#39FF14]/10 rounded-lg">
              <Users className="w-4 h-4 text-[#39FF14]" />
            </div>
          </div>
          <div className="text-3xl font-bold text-white">68%</div>
          <p className="text-xs text-[#39FF14] flex items-center"><TrendingUp className="w-3 h-3 mr-1" /> Top 10% in your niche</p>
        </AnimatedCard>

        <AnimatedCard delay={0.3} className="flex flex-col gap-4">
          <div className="flex items-center justify-between">
            <h3 className="text-sm font-medium text-zinc-400">Active Viral Clips</h3>
            <div className="p-2 bg-[#39FF14]/10 rounded-lg">
              <Flame className="w-4 h-4 text-[#39FF14]" />
            </div>
          </div>
          <div className="text-3xl font-bold text-white">7</div>
          <p className="text-xs text-[#39FF14]">3 currently trending on TikTok</p>
        </AnimatedCard>

        <AnimatedCard delay={0.4} className="flex flex-col gap-4">
          <div className="flex items-center justify-between">
            <h3 className="text-sm font-medium text-zinc-400">Ideas in Pipeline</h3>
            <div className="p-2 bg-[#39FF14]/10 rounded-lg">
              <Video className="w-4 h-4 text-[#39FF14]" />
            </div>
          </div>
          <div className="text-3xl font-bold text-white">18</div>
          <p className="text-xs text-zinc-500">4 ready to publish today</p>
        </AnimatedCard>
      </div>

      {/* Main Content Area */}
      <div className="grid gap-6 md:grid-cols-7">
        <AnimatedCard delay={0.5} className="md:col-span-4 min-h-[400px]">
          <h3 className="text-lg font-bold text-white mb-6">Recent Performance</h3>
          <div className="w-full flex items-center justify-center">
            <PerformanceCard>
              <CardVisual>
                <Visual1 />
              </CardVisual>
              <CardBody>
                <CardTitle>Audience Retention Flow</CardTitle>
                <CardDescription>
                  Your latest content is trending above average.
                </CardDescription>
              </CardBody>
            </PerformanceCard>
          </div>
        </AnimatedCard>

        <AnimatedCard delay={0.6} className="md:col-span-3 min-h-[400px]">
          <h3 className="text-lg font-bold text-white mb-6 flex items-center gap-2">
            <Flame className="w-5 h-5 text-[#39FF14]" /> 
            AI Trending Insights
          </h3>
          <div className="space-y-4">
            {[
              { text: "Assetto Corsa No-Hesi videos are seeing a 34% spike in engagement this week.", tag: "Gaming" },
              { text: "Clips between 25-30s have optimal retention on TikTok.", tag: "Analytics" },
              { text: "Your audience is highly active between 6PM and 9PM EST.", tag: "Timing" },
            ].map((insight, i) => (
              <div key={i} className="p-4 rounded-xl bg-zinc-950/50 border border-zinc-900 hover:border-[#39FF14]/30 transition-colors">
                <span className="text-xs font-bold text-[#39FF14] uppercase tracking-wider mb-2 block">{insight.tag}</span>
                <p className="text-sm text-zinc-300">{insight.text}</p>
              </div>
            ))}
          </div>
        </AnimatedCard>
      </div>
    </div>
  )
}
