"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import { Loader2, Lightbulb, Sparkles } from "lucide-react"
import ReactMarkdown from "react-markdown"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { AnimatedCard } from "@/components/ui/animated-card"
import { GlowingButton } from "@/components/ui/glowing-button"
import { generateViralIdeas } from "./actions"

export default function IdeasPage() {
  const [loading, setLoading] = useState(false)
  const [ideas, setIdeas] = useState<string | null>(null)
  const [error, setError] = useState<string | null>(null)

  async function onSubmit(formData: FormData) {
    setLoading(true)
    setError(null)
    setIdeas(null)
    
    try {
      const result = await generateViralIdeas(formData)
      if (result.error) {
        setError(result.error)
      } else if (result.success && result.ideas) {
        setIdeas(result.ideas)
      }
    } catch (err) {
      setError("An unexpected error occurred.")
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="space-y-8 max-w-5xl mx-auto pb-12">
      <div>
        <h2 className="text-3xl font-bold tracking-tight text-white mb-2 flex items-center gap-2">
          <Lightbulb className="w-8 h-8 text-yellow-400" />
          AI Viral Idea Generator
        </h2>
        <p className="text-zinc-400">
          Input your niche and target audience to get 10 viral hook and content ideas.
        </p>
      </div>

      <div className="grid gap-8 md:grid-cols-12">
        <div className="md:col-span-4">
          <AnimatedCard delay={0.1} className="sticky top-24">
            <div className="mb-6">
              <h3 className="text-xl font-bold text-white mb-1">Target Details</h3>
              <p className="text-sm text-zinc-400">The more specific you are, the better the AI can tailor the ideas.</p>
            </div>
            
            <form action={onSubmit} className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="creatorType" className="text-zinc-200">Creator Type</Label>
                <Input 
                  id="creatorType" 
                  name="creatorType" 
                  placeholder="e.g. Gaming Streamer, Fitness Coach" 
                  required
                  className="border-white/10 bg-white/5 text-white focus-visible:ring-indigo-500"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="niche" className="text-zinc-200">Niche / Topic</Label>
                <Input 
                  id="niche" 
                  name="niche" 
                  placeholder="e.g. Call of Duty Warzone, Keto Diet" 
                  required
                  className="border-white/10 bg-white/5 text-white focus-visible:ring-indigo-500"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="audience" className="text-zinc-200">Target Audience</Label>
                <Input 
                  id="audience" 
                  name="audience" 
                  placeholder="e.g. Teen Gamers, Busy Moms" 
                  required
                  className="border-white/10 bg-white/5 text-white focus-visible:ring-indigo-500"
                />
              </div>
              
              <div className="pt-4">
                <button 
                  type="submit" 
                  disabled={loading} 
                  className="relative w-full inline-flex items-center justify-center px-6 py-3 overflow-hidden font-medium text-white bg-indigo-600 rounded-lg group disabled:opacity-50"
                >
                  <span className="absolute w-0 h-0 transition-all duration-500 ease-out bg-white rounded-full group-hover:w-56 group-hover:h-56 opacity-10"></span>
                  <span className="relative flex items-center justify-center gap-2">
                    {loading ? (
                      <><Loader2 className="h-4 w-4 animate-spin" /> Generating...</>
                    ) : (
                      <><Sparkles className="h-4 w-4" /> Generate Ideas</>
                    )}
                  </span>
                </button>
              </div>
              
              {error && (
                <p className="text-sm text-red-500 font-medium mt-2">{error}</p>
              )}
            </form>
          </AnimatedCard>
        </div>

        <div className="md:col-span-8">
          <AnimatedCard delay={0.2} className="min-h-[500px]">
            <h3 className="text-xl font-bold text-white mb-6">Generated Ideas</h3>
            
            <div className="h-full">
              {loading ? (
                <div className="h-full min-h-[400px] flex flex-col items-center justify-center text-zinc-500 space-y-4">
                  <div className="relative w-16 h-16">
                    <div className="absolute inset-0 rounded-full border-t-2 border-indigo-500 animate-spin"></div>
                    <div className="absolute inset-2 rounded-full border-r-2 border-purple-500 animate-spin" style={{ animationDirection: 'reverse', animationDuration: '1.5s' }}></div>
                  </div>
                  <p className="text-indigo-400 font-medium animate-pulse">Analyzing trends & generating hooks...</p>
                </div>
              ) : ideas ? (
                <motion.div 
                  initial={{ opacity: 0 }} 
                  animate={{ opacity: 1 }}
                  className="prose prose-invert max-w-none
                    prose-headings:text-white prose-headings:font-bold
                    prose-p:text-zinc-300 prose-p:leading-relaxed
                    prose-strong:text-indigo-300
                    prose-ul:text-zinc-300 prose-li:marker:text-indigo-500"
                >
                  <ReactMarkdown>{ideas}</ReactMarkdown>
                </motion.div>
              ) : (
                <div className="h-full min-h-[400px] flex flex-col items-center justify-center text-zinc-500 border-2 border-dashed border-white/5 rounded-xl p-8 text-center bg-white/5">
                  <Sparkles className="h-12 w-12 text-zinc-700 mb-4" />
                  <p>Fill out the form on the left to generate customized viral ideas powered by Llama 3.3 70B.</p>
                </div>
              )}
            </div>
          </AnimatedCard>
        </div>
      </div>
    </div>
  )
}
