"use client"

import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { AnimatedCard } from "@/components/ui/animated-card"
import { 
  User, 
  Settings2, 
  Link as LinkIcon, 
  Camera, 
  Save, 
  Sparkles,
  CheckCircle2,
  AlertCircle
} from "lucide-react"

export default function SettingsPage() {
  const [activeTab, setActiveTab] = useState<"profile" | "ai" | "integrations">("profile")
  const [isSaved, setIsSaved] = useState(false)

  const handleSave = () => {
    setIsSaved(true)
    setTimeout(() => setIsSaved(false), 3000)
  }

  return (
    <div className="max-w-4xl mx-auto pb-12">
      <div className="mb-8">
        <h2 className="text-3xl font-bold tracking-tight text-white mb-2">Settings & Profile</h2>
        <p className="text-zinc-400">Manage your account, AI preferences, and connected platforms.</p>
      </div>

      {/* Tabs */}
      <div className="flex space-x-1 bg-zinc-900/50 p-1 rounded-xl mb-8 border border-white/5">
        {[
          { id: "profile", label: "Profile", icon: User },
          { id: "ai", label: "AI Preferences", icon: Settings2 },
          { id: "integrations", label: "Integrations", icon: LinkIcon },
        ].map((tab) => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id as any)}
            className={`
              flex items-center justify-center gap-2 flex-1 py-2.5 px-4 rounded-lg text-sm font-medium transition-all duration-300
              ${activeTab === tab.id 
                ? "bg-[#39FF14]/10 text-[#39FF14] border border-[#39FF14]/20 shadow-[0_0_15px_rgba(57,255,20,0.1)]" 
                : "text-zinc-400 hover:text-white hover:bg-white/5 border border-transparent"
              }
            `}
          >
            <tab.icon className="w-4 h-4" />
            {tab.label}
          </button>
        ))}
      </div>

      {/* Content Area */}
      <AnimatedCard delay={0.1} className="min-h-[500px] border border-white/5 bg-zinc-950/50 backdrop-blur-xl relative overflow-hidden">
        
        {/* Subtle Background Glow */}
        <div className="absolute -top-[200px] -right-[200px] w-[400px] h-[400px] bg-[#39FF14]/5 rounded-full blur-[100px] pointer-events-none" />

        <AnimatePresence mode="wait">
          
          {/* PROFILE TAB */}
          {activeTab === "profile" && (
            <motion.div
              key="profile"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.2 }}
              className="space-y-8 relative z-10"
            >
              <div>
                <h3 className="text-xl font-bold text-white mb-1">Public Profile</h3>
                <p className="text-sm text-zinc-400">This information will be displayed on your generated clip sharing pages.</p>
              </div>

              <div className="flex items-center gap-6">
                <div className="relative group cursor-pointer">
                  <div className="w-24 h-24 rounded-full bg-zinc-900 border-2 border-dashed border-zinc-700 group-hover:border-[#39FF14] flex items-center justify-center overflow-hidden transition-colors">
                    <span className="text-[#39FF14] font-bold text-2xl group-hover:hidden">CR</span>
                    <Camera className="w-8 h-8 text-[#39FF14] hidden group-hover:block" />
                  </div>
                  <div className="absolute bottom-0 right-0 w-6 h-6 bg-[#39FF14] border-2 border-black rounded-full flex items-center justify-center">
                    <div className="w-2 h-2 bg-black rounded-full" />
                  </div>
                </div>
                <div>
                  <button className="px-4 py-2 bg-white/5 hover:bg-white/10 border border-white/10 rounded-lg text-sm font-medium text-white transition-colors">
                    Upload new avatar
                  </button>
                  <p className="text-xs text-zinc-500 mt-2">JPG, GIF or PNG. 1MB max.</p>
                </div>
              </div>

              <div className="grid gap-6 md:grid-cols-2">
                <div className="space-y-2">
                  <label className="text-sm font-medium text-zinc-300">Display Name</label>
                  <input 
                    type="text" 
                    defaultValue="Creator AI"
                    className="w-full bg-black/50 border border-white/10 rounded-lg px-4 py-2.5 text-white outline-none focus:border-[#39FF14] focus:ring-1 focus:ring-[#39FF14]/50 transition-all"
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-medium text-zinc-300">Email Address</label>
                  <input 
                    type="email" 
                    defaultValue="creator@clipflow.ai"
                    disabled
                    className="w-full bg-black/20 border border-white/5 rounded-lg px-4 py-2.5 text-zinc-500 outline-none cursor-not-allowed"
                  />
                  <p className="text-xs text-zinc-500">Contact support to change your email.</p>
                </div>
              </div>

              <div className="space-y-2">
                <label className="text-sm font-medium text-zinc-300">Bio</label>
                <textarea 
                  rows={4}
                  defaultValue="I make gaming and tech content. Powered by AI."
                  className="w-full bg-black/50 border border-white/10 rounded-lg px-4 py-3 text-white outline-none focus:border-[#39FF14] focus:ring-1 focus:ring-[#39FF14]/50 transition-all resize-none"
                />
              </div>
            </motion.div>
          )}

          {/* AI PREFERENCES TAB */}
          {activeTab === "ai" && (
            <motion.div
              key="ai"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.2 }}
              className="space-y-8 relative z-10"
            >
              <div>
                <h3 className="text-xl font-bold text-white mb-1 flex items-center gap-2">
                  <Sparkles className="w-5 h-5 text-[#39FF14]" />
                  AI Generation Engine
                </h3>
                <p className="text-sm text-zinc-400">Configure how ClipFlow's Llama 3.3 model generates your content.</p>
              </div>

              <div className="space-y-6">
                <div className="p-5 border border-white/5 bg-white/5 rounded-xl space-y-4">
                  <div className="flex justify-between items-center">
                    <div>
                      <h4 className="font-bold text-white text-sm">Default Content Niche</h4>
                      <p className="text-xs text-zinc-400 mt-1">Helps the AI understand your context better.</p>
                    </div>
                    <select className="bg-black/80 border border-white/10 text-white text-sm rounded-lg px-4 py-2 outline-none focus:border-[#39FF14]">
                      <option>Gaming / Esports</option>
                      <option>Tech & Reviews</option>
                      <option>IRL / Vlogging</option>
                      <option>Educational / Podcast</option>
                    </select>
                  </div>
                </div>

                <div className="p-5 border border-white/5 bg-white/5 rounded-xl space-y-4">
                  <div className="flex justify-between items-center">
                    <div>
                      <h4 className="font-bold text-white text-sm">AI Copywriting Tone</h4>
                      <p className="text-xs text-zinc-400 mt-1">Default tone for generated captions and hooks.</p>
                    </div>
                    <select className="bg-black/80 border border-white/10 text-white text-sm rounded-lg px-4 py-2 outline-none focus:border-[#39FF14]">
                      <option>Gen-Z (Trendy, Slang)</option>
                      <option>Hype (High Energy, Emojis)</option>
                      <option>Professional (Clean, Informative)</option>
                      <option>Mysterious (Curiosity Hooks)</option>
                    </select>
                  </div>
                </div>

                <div className="p-5 border border-[#39FF14]/10 bg-[#39FF14]/5 rounded-xl space-y-4 relative overflow-hidden">
                  <div className="absolute top-0 right-0 w-32 h-32 bg-[#39FF14]/10 rounded-full blur-[30px]" />
                  <div className="flex justify-between items-center relative z-10">
                    <div>
                      <h4 className="font-bold text-[#39FF14] text-sm flex items-center gap-2">
                        Hacker Aesthetic Auto-Captions
                        <span className="text-[9px] px-1.5 py-0.5 bg-[#39FF14]/20 border border-[#39FF14]/50 rounded uppercase tracking-wider">Beta</span>
                      </h4>
                      <p className="text-xs text-zinc-400 mt-1">Force all auto-generated captions to use the neon green brand style.</p>
                    </div>
                    <div className="w-12 h-6 bg-[#39FF14] rounded-full relative cursor-pointer flex items-center px-1">
                      <div className="w-4 h-4 bg-black rounded-full absolute right-1" />
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          )}

          {/* INTEGRATIONS TAB */}
          {activeTab === "integrations" && (
            <motion.div
              key="integrations"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.2 }}
              className="space-y-8 relative z-10"
            >
              <div>
                <h3 className="text-xl font-bold text-white mb-1">Connected Platforms</h3>
                <p className="text-sm text-zinc-400">Connect your socials to enable auto-publishing and real-time analytics.</p>
              </div>

              <div className="grid gap-4">
                {/* TikTok */}
                <div className="flex items-center justify-between p-4 border border-white/5 bg-white/5 rounded-xl hover:border-white/10 transition-colors">
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 bg-black rounded-lg flex items-center justify-center border border-zinc-800">
                      <svg viewBox="0 0 24 24" className="w-6 h-6 fill-white" xmlns="http://www.w3.org/2000/svg">
                        <path d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 0 1-5.2 1.74 2.89 2.89 0 0 1 2.31-4.64 2.93 2.93 0 0 1 .88.13V9.4a6.84 6.84 0 0 0-1-.05A6.33 6.33 0 0 0 5 20.1a6.34 6.34 0 0 0 10.86-4.43v-7a8.16 8.16 0 0 0 4.77 1.52v-3.4a4.85 4.85 0 0 1-1-.1z"/>
                      </svg>
                    </div>
                    <div>
                      <h4 className="font-bold text-white">TikTok</h4>
                      <p className="text-xs text-zinc-400">For Shorts & Viral Clips</p>
                    </div>
                  </div>
                  <button className="px-4 py-2 bg-white text-black text-sm font-bold rounded-lg hover:bg-zinc-200 transition-colors">
                    Connect
                  </button>
                </div>

                {/* YouTube */}
                <div className="flex items-center justify-between p-4 border border-[#39FF14]/20 bg-[#39FF14]/5 rounded-xl">
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 bg-black rounded-lg flex items-center justify-center border border-zinc-800">
                      <svg viewBox="0 0 24 24" className="w-6 h-6 fill-none stroke-red-500 stroke-2" strokeLinecap="round" strokeLinejoin="round" xmlns="http://www.w3.org/2000/svg">
                        <path d="M22.54 6.42a2.78 2.78 0 0 0-1.94-2C18.88 4 12 4 12 4s-6.88 0-8.6.46a2.78 2.78 0 0 0-1.94 2A29 29 0 0 0 1 11.75a29 29 0 0 0 .46 5.33A2.78 2.78 0 0 0 3.4 19c1.72.46 8.6.46 8.6.46s6.88 0 8.6-.46a2.78 2.78 0 0 0 1.94-2 29 29 0 0 0 .46-5.25 29 29 0 0 0-.46-5.33z"></path>
                        <polygon points="9.75 15.02 15.5 11.75 9.75 8.48 9.75 15.02"></polygon>
                      </svg>
                    </div>
                    <div>
                      <div className="flex items-center gap-2">
                        <h4 className="font-bold text-white">YouTube</h4>
                        <span className="flex items-center text-[10px] text-[#39FF14] bg-[#39FF14]/10 px-1.5 py-0.5 rounded border border-[#39FF14]/20">
                          <CheckCircle2 className="w-3 h-3 mr-1" />
                          Connected
                        </span>
                      </div>
                      <p className="text-xs text-zinc-400">CreatorChannel_AI</p>
                    </div>
                  </div>
                  <button className="px-4 py-2 bg-white/5 border border-white/10 text-white text-sm font-medium rounded-lg hover:bg-red-500/10 hover:text-red-400 hover:border-red-500/20 transition-colors">
                    Disconnect
                  </button>
                </div>

                {/* Instagram */}
                <div className="flex items-center justify-between p-4 border border-white/5 bg-white/5 rounded-xl hover:border-white/10 transition-colors">
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 bg-black rounded-lg flex items-center justify-center border border-zinc-800">
                      <svg viewBox="0 0 24 24" className="w-6 h-6 fill-none stroke-pink-500 stroke-2" strokeLinecap="round" strokeLinejoin="round" xmlns="http://www.w3.org/2000/svg">
                        <rect x="2" y="2" width="20" height="20" rx="5" ry="5"></rect>
                        <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path>
                        <line x1="17.5" y1="6.5" x2="17.51" y2="6.5"></line>
                      </svg>
                    </div>
                    <div>
                      <h4 className="font-bold text-white">Instagram</h4>
                      <p className="text-xs text-zinc-400">For Reels Auto-Publish</p>
                    </div>
                  </div>
                  <button className="px-4 py-2 bg-white text-black text-sm font-bold rounded-lg hover:bg-zinc-200 transition-colors">
                    Connect
                  </button>
                </div>
              </div>
            </motion.div>
          )}

        </AnimatePresence>

        {/* Global Save Action */}
        <div className="mt-12 pt-6 border-t border-white/10 flex justify-end items-center relative z-10">
          <AnimatePresence>
            {isSaved && (
              <motion.span 
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -10 }}
                className="text-[#39FF14] text-sm font-medium flex items-center mr-4"
              >
                <CheckCircle2 className="w-4 h-4 mr-2" />
                Settings Saved!
              </motion.span>
            )}
          </AnimatePresence>
          <button 
            onClick={handleSave}
            className="flex items-center gap-2 bg-[#39FF14] text-black px-6 py-2.5 rounded-xl font-bold hover:bg-[#32e012] hover:shadow-[0_0_20px_rgba(57,255,20,0.3)] transition-all active:scale-95"
          >
            <Save className="w-4 h-4" />
            Save Changes
          </button>
        </div>
      </AnimatedCard>
    </div>
  )
}
