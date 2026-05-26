"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import { Loader2, Type, Copy, Check } from "lucide-react"
import ReactMarkdown from "react-markdown"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { AnimatedCard } from "@/components/ui/animated-card"
import { GlowingButton } from "@/components/ui/glowing-button"
import { generateCaptions } from "./actions"

export default function CaptionsPage() {
  const [loading, setLoading] = useState(false)
  const [captions, setCaptions] = useState<string | null>(null)
  const [error, setError] = useState<string | null>(null)
  const [copied, setCopied] = useState(false)

  async function onSubmit(formData: FormData) {
    setLoading(true)
    setError(null)
    setCaptions(null)
    setCopied(false)
    
    try {
      const result = await generateCaptions(formData)
      if (result.error) {
        setError(result.error)
      } else if (result.success && result.captions) {
        setCaptions(result.captions)
      }
    } catch (err) {
      setError("An unexpected error occurred.")
    } finally {
      setLoading(false)
    }
  }

  const handleCopy = () => {
    if (captions) {
      navigator.clipboard.writeText(captions)
      setCopied(true)
      setTimeout(() => setCopied(false), 2000)
    }
  }

  return (
    <div className="space-y-8 max-w-5xl mx-auto pb-12">
      <div>
        <h2 className="text-3xl font-bold tracking-tight text-white mb-2 flex items-center gap-2">
          <Type className="w-8 h-8 text-pink-400" />
          AI Caption & Hashtag Generator
        </h2>
        <p className="text-zinc-400">
          Generate optimized captions, hooks, and hashtags for any platform.
        </p>
      </div>

      <div className="grid gap-8 md:grid-cols-12">
        <div className="md:col-span-4">
          <AnimatedCard delay={0.1} className="sticky top-24">
            <div className="mb-6">
              <h3 className="text-xl font-bold text-white mb-1">Video Details</h3>
              <p className="text-sm text-zinc-400">Provide context for your video to generate the perfect caption.</p>
            </div>
            <form action={onSubmit} className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="topic" className="text-zinc-200">Clip Topic / Summary</Label>
                <Input 
                  id="topic" 
                  name="topic" 
                  placeholder="e.g. Insane 1v4 clutch in Valorant" 
                  required
                  className="border-white/10 bg-white/5 text-white focus-visible:ring-pink-500"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="tone" className="text-zinc-200">Tone of Voice</Label>
                <Input 
                  id="tone" 
                  name="tone" 
                  placeholder="e.g. Hype, Funny, Educational, Professional" 
                  required
                  className="border-white/10 bg-white/5 text-white focus-visible:ring-pink-500"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="platform" className="text-zinc-200">Target Platform</Label>
                <select 
                  id="platform" 
                  name="platform"
                  className="flex h-9 w-full rounded-md border border-white/10 bg-[#111827] px-3 py-1 text-sm text-white shadow-sm transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-pink-500"
                  required
                >
                  <option value="TikTok">TikTok</option>
                  <option value="Instagram Reels">Instagram Reels</option>
                  <option value="YouTube Shorts">YouTube Shorts</option>
                </select>
              </div>
              
              <div className="pt-4">
                <button 
                  type="submit" 
                  disabled={loading} 
                  className="relative w-full inline-flex items-center justify-center px-6 py-3 overflow-hidden font-medium text-white bg-pink-600 rounded-lg group disabled:opacity-50"
                >
                  <span className="absolute w-0 h-0 transition-all duration-500 ease-out bg-white rounded-full group-hover:w-56 group-hover:h-56 opacity-10"></span>
                  <span className="relative flex items-center justify-center gap-2">
                    {loading ? (
                      <><Loader2 className="h-4 w-4 animate-spin" /> Writing...</>
                    ) : (
                      <><Type className="h-4 w-4" /> Generate Captions</>
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
          <AnimatedCard delay={0.2} className="min-h-[500px] flex flex-col">
            <div className="flex flex-row items-center justify-between mb-6">
              <h3 className="text-xl font-bold text-white">Generated Captions</h3>
              {captions && (
                <Button 
                  variant="outline" 
                  size="sm" 
                  onClick={handleCopy}
                  className="border-white/10 bg-white/5 text-white hover:bg-white/10"
                >
                  {copied ? <Check className="h-4 w-4 mr-2 text-green-400" /> : <Copy className="h-4 w-4 mr-2" />}
                  {copied ? "Copied!" : "Copy All"}
                </Button>
              )}
            </div>
            
            <div className="flex-1">
              {loading ? (
                <div className="h-full min-h-[400px] flex flex-col items-center justify-center text-zinc-500 space-y-4">
                  <div className="relative w-16 h-16">
                    <div className="absolute inset-0 rounded-full border-t-2 border-pink-500 animate-spin"></div>
                    <div className="absolute inset-2 rounded-full border-r-2 border-purple-500 animate-spin" style={{ animationDirection: 'reverse', animationDuration: '1.5s' }}></div>
                  </div>
                  <p className="text-pink-400 font-medium animate-pulse">Crafting the perfect hooks and hashtags...</p>
                </div>
              ) : captions ? (
                <motion.div 
                  initial={{ opacity: 0 }} 
                  animate={{ opacity: 1 }}
                  className="prose prose-invert prose-pink max-w-none
                    prose-headings:text-white prose-headings:font-bold
                    prose-p:text-zinc-300 prose-p:leading-relaxed
                    prose-strong:text-pink-300"
                >
                  <ReactMarkdown>{captions}</ReactMarkdown>
                </motion.div>
              ) : (
                <div className="h-full min-h-[400px] flex flex-col items-center justify-center text-zinc-500 border-2 border-dashed border-white/5 rounded-xl p-8 text-center bg-white/5">
                  <Type className="h-12 w-12 text-zinc-700 mb-4" />
                  <p>Fill out the form on the left to generate platform-optimized captions and hashtags.</p>
                </div>
              )}
            </div>
          </AnimatedCard>
        </div>
      </div>
    </div>
  )
}
