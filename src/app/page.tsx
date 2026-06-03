"use client"

import { motion, useScroll, useTransform, type Variants } from "framer-motion"
import Link from "next/link"
import { ArrowRight, Upload, Cpu, Download, Scissors, Zap, Type, BarChart3, Play, Check, Rocket, Globe, Video, Share2, Lightbulb } from "lucide-react"
import { useRef } from "react"
import LiquidEther from "@/components/ui/LiquidEther"
import BlurText from "@/components/ui/BlurText"
import Stepper, { Step } from "@/components/ui/Stepper"
import { Navbar } from "@/components/ui/Navbar"
import { PricingWrapper, Heading, Price, Paragraph } from "@/components/ui/PricingCards"
import { TestimonialsColumn, testimonials } from "@/components/ui/Testimonials"
import { InteractiveRobotSpline } from "@/components/ui/InteractiveRobotSpline"
import { Footer } from "@/components/layout/Footer"
const fadeUp: Variants = {
  hidden: { opacity: 0, y: 40 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" } },
}

const stagger: Variants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.12 } },
}

function Section({ children, className = "", id }: { children: React.ReactNode; className?: string; id?: string }) {
  return (
    <motion.section
      id={id}
      variants={fadeUp}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: "-80px" }}
      className={className}
    >
      {children}
    </motion.section>
  )
}

export default function LandingPage() {
  const heroRef = useRef<HTMLDivElement>(null)
  const { scrollYProgress } = useScroll({ target: heroRef, offset: ["start start", "end start"] })
  const heroY = useTransform(scrollYProgress, [0, 1], ["0%", "30%"])
  const heroOpacity = useTransform(scrollYProgress, [0, 0.8], [1, 0])

  return (
    <div className="min-h-screen text-white font-sans overflow-x-hidden">
      {/* Interactive Liquid Fluid Background */}
      <div className="fixed inset-0 -z-10 w-full h-full pointer-events-none bg-[#070707]">
        <LiquidEther
          colors={['#39FF14', '#00ffc4', '#23153c']}
          mouseForce={18}
          cursorSize={85}
          resolution={0.4}
          autoDemo={true}
          autoSpeed={0.35}
        />
      </div>

      {/* Top Banner */}
      <div className="fixed top-0 left-0 w-full bg-[#39FF14] text-neutral-950 text-center py-2 text-[9px] sm:text-[10px] font-extrabold z-50 tracking-widest uppercase shadow-[0_2px_10px_rgba(57,255,20,0.15)] flex items-center justify-center gap-2">
        <span className="w-1.5 h-1.5 rounded-full bg-neutral-950 animate-pulse" />
        Early Access Launch: Try all Pro features 100% free! No credit card required.
        <span className="w-1.5 h-1.5 rounded-full bg-neutral-950 animate-pulse" />
      </div>

      {/* NAVBAR */}
      <Navbar />

      {/* HERO */}
      <div ref={heroRef} className="relative pt-40 pb-32 px-6 overflow-hidden min-h-[90vh] flex items-center">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_left,rgba(57,255,20,0.07),transparent_60%)]" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_bottom_right,rgba(0,200,150,0.05),transparent_60%)]" />

        <div className="max-w-7xl mx-auto w-full grid md:grid-cols-2 gap-16 items-center">
          {/* Left */}
          <motion.div style={{ y: heroY, opacity: heroOpacity }}>
            <motion.div variants={fadeUp} initial="hidden" animate="visible"
              className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/5 border border-white/10 text-xs font-medium text-[#39FF14] mb-6"
            >
              <span className="w-1.5 h-1.5 rounded-full bg-[#39FF14] animate-pulse" />
              ClipFlow Engine v2.0 Live
            </motion.div>

            <motion.h1 variants={fadeUp} initial="hidden" animate="visible" transition={{ delay: 0.1 }}
              className="text-5xl md:text-6xl lg:text-7xl font-bold tracking-tight leading-[1.08] mb-6"
            >
              Turn Long Videos Into{" "}
              <span className="text-[#39FF14] drop-shadow-[0_0_30px_rgba(57,255,20,0.5)]">
                Viral Short Clips
              </span>{" "}
              With AI
            </motion.h1>

            <BlurText
              text="AI-powered creator operating system integrated with Llama 3.3 70B. Generate viral ideas, crop clips dynamically, and draft optimized captions instantly."
              delay={30}
              animateBy="words"
              direction="bottom"
              className="text-zinc-400 text-lg leading-relaxed mb-10 max-w-lg"
            />

            <motion.div variants={fadeUp} initial="hidden" animate="visible" transition={{ delay: 0.3 }}
              className="flex items-center gap-4"
            >
              <Link href="/signup">
                <button className="flex items-center gap-2 bg-[#39FF14] text-black font-bold px-6 py-3 rounded-lg hover:bg-[#2ee610] transition-all shadow-[0_0_25px_rgba(57,255,20,0.4)] hover:shadow-[0_0_40px_rgba(57,255,20,0.6)]">
                  Start Free <ArrowRight className="w-4 h-4" />
                </button>
              </Link>
              <button className="flex items-center gap-2 text-sm font-medium text-zinc-300 hover:text-white border border-white/10 px-5 py-3 rounded-lg hover:border-white/20 transition-all">
                <Play className="w-4 h-4" /> Watch Demo
              </button>
            </motion.div>
            <motion.p variants={fadeUp} initial="hidden" animate="visible" transition={{ delay: 0.35 }}
              className="text-[10px] text-[#39FF14] mt-3 font-semibold tracking-wider uppercase flex items-center gap-2"
            >
              <span className="w-1.5 h-1.5 rounded-full bg-[#39FF14] animate-ping" />
              100% Free Trial for Launch Beta. No credit card required.
            </motion.p>

            <motion.div variants={fadeUp} initial="hidden" animate="visible" transition={{ delay: 0.4 }}
              className="flex items-center gap-3 mt-8 text-xs text-zinc-400"
            >
              <div className="flex -space-x-2">
                {[
                  "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=100&h=100&q=80",
                  "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=100&h=100&q=80",
                  "https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=100&h=100&q=80",
                  "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=100&h=100&q=80"
                ].map((src, i) => (
                  <img
                    key={i}
                    src={src}
                    alt={`Creator ${i}`}
                    className="w-6 h-6 rounded-full border border-black object-cover shadow-sm"
                  />
                ))}
              </div>
              <span><strong className="text-[#39FF14] drop-shadow-[0_0_8px_rgba(57,255,20,0.4)]">72+</strong> creators found their viral clips</span>
            </motion.div>
          </motion.div>

          {/* Right – Interactive Console Dashboard */}
          <motion.div
            initial={{ opacity: 0, x: 40 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="relative hidden md:flex w-full max-w-[540px] h-[540px] justify-center items-center lg:justify-self-end"
          >
            <div className="absolute -inset-4 bg-gradient-to-br from-[#39FF14]/10 to-transparent rounded-2xl blur-3xl opacity-50 pointer-events-none" />
            <InteractiveRobotSpline scene="https://prod.spline.design/PyzDhpQ9E5f1E3MT/scene.splinecode" className="w-full h-full" />
          </motion.div>
        </div>
      </div>

      {/* WORKFLOW */}
      <Section id="workflow" className="py-28 px-6 border-t border-white/5 bg-black/40">
        <div className="max-w-7xl mx-auto">
          <motion.div variants={stagger} initial="hidden" whileInView="visible" viewport={{ once: true }} className="text-center mb-16">
            <BlurText
              text="Seamless Editing Workflow"
              delay={70}
              animateBy="words"
              direction="top"
              className="text-4xl md:text-5xl font-bold mb-4 justify-center text-white"
            />
            <motion.p variants={fadeUp} className="text-zinc-400">From raw upload to viral masterpiece in minutes.</motion.p>
          </motion.div>

          <div className="mt-8 max-w-xl mx-auto w-full">
            <Stepper
              initialStep={1}
              backButtonText="Previous"
              nextButtonText="Continue"
            >
              <Step>
                <div className="flex flex-col items-center text-center p-4">
                  <div className="w-12 h-12 rounded-full bg-[#39FF14]/10 border border-[#39FF14]/20 flex items-center justify-center mb-4">
                    <Lightbulb className="w-6 h-6 text-[#39FF14]" />
                  </div>
                  <h3 className="text-xl font-bold text-white mb-2">1. AI Ideation Engine</h3>
                  <p className="text-sm text-zinc-400 mb-6 max-w-sm">Generate viral hooks and structured video ideas using Llama 3.3 70B tailored to your niche and tone.</p>
                  
                  {/* Simulated Ideation Panel */}
                  <div className="w-full border border-[#39FF14]/30 rounded-xl bg-black/40 p-5 text-left space-y-3">
                    <div className="flex justify-between items-center text-xs border-b border-white/10 pb-2">
                      <span className="text-zinc-400 font-bold">Llama 3.3 Idea Generator</span>
                      <span className="text-[#39FF14] text-[10px] font-mono uppercase">Llama Active</span>
                    </div>
                    <div className="space-y-2">
                      <div className="text-[10px] text-zinc-400"><strong className="text-zinc-300">Niche:</strong> Tech/Coding &nbsp;|&nbsp; <strong className="text-zinc-300">Tone:</strong> Hacker</div>
                      <div className="p-3 bg-zinc-950/80 border border-white/5 rounded-lg">
                        <p className="text-xs text-[#39FF14] font-bold mb-1">Hook Concept:</p>
                        <p className="text-xs text-white italic">"This secret AI tool for developers feels illegal to know..."</p>
                      </div>
                    </div>
                  </div>
                </div>
              </Step>

              <Step>
                <div className="flex flex-col items-center text-center p-4">
                  <div className="w-12 h-12 rounded-full bg-[#39FF14]/10 border border-[#39FF14]/20 flex items-center justify-center mb-4">
                    <Scissors className="w-6 h-6 text-[#39FF14]" />
                  </div>
                  <h3 className="text-xl font-bold text-white mb-2">2. Timeline Editor</h3>
                  <p className="text-sm text-zinc-400 mb-6 max-w-sm">Upload your video, split clips precisely on the timeline, adjust to 9:16 aspect ratios, and place text overlays.</p>
                  
                  {/* Simulated Processing Panel */}
                  <div className="w-full border border-white/5 rounded-xl bg-[#111] p-5 text-left space-y-3">
                    <div className="flex justify-between items-center text-xs">
                      <span className="text-zinc-500 font-mono">Splitting Timeline...</span>
                      <span className="text-[#39FF14] font-bold animate-pulse">Rendering</span>
                    </div>
                    <div className="w-full bg-zinc-900 rounded-full h-1.5 overflow-hidden">
                      <motion.div 
                        animate={{ width: ["15%", "85%", "100%"] }} 
                        transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
                        className="bg-[#39FF14] h-full rounded-full shadow-[0_0_8px_rgba(57,255,20,0.6)]" 
                      />
                    </div>
                    <div className="space-y-1.5 pt-1">
                      <div className="flex items-center gap-2 text-[10px] text-zinc-400">
                        <span className="w-1.5 h-1.5 rounded-full bg-[#39FF14]" />
                        <span>Timeline split created at 0:15 and 0:45</span>
                      </div>
                      <div className="flex items-center gap-2 text-[10px] text-zinc-400">
                        <span className="w-1.5 h-1.5 rounded-full bg-[#39FF14]" />
                        <span>Vertical video format (9:16 Aspect Ratio) applied</span>
                      </div>
                    </div>
                  </div>
                </div>
              </Step>

              <Step>
                <div className="flex flex-col items-center text-center p-4">
                  <div className="w-12 h-12 rounded-full bg-[#39FF14]/10 border border-[#39FF14]/20 flex items-center justify-center mb-4">
                    <Type className="w-6 h-6 text-[#39FF14]" />
                  </div>
                  <h3 className="text-xl font-bold text-white mb-2">3. Copywriter & Distribution</h3>
                  <p className="text-sm text-zinc-400 mb-6 max-w-sm">Draft optimized captions and hashtags tailored specifically for platform algorithms, then export in 4K.</p>
                  
                  {/* Simulated Export/Publish Panel */}
                  <div className="w-full border border-white/5 rounded-xl bg-[#111] p-5 text-left space-y-4">
                    <div className="flex justify-between items-center text-xs">
                      <span className="text-white font-bold">Copy & Hashtags</span>
                      <span className="text-[#39FF14] text-[10px] font-bold">ACTIVE</span>
                    </div>
                    <div className="p-2.5 bg-black/60 border border-[#39FF14]/30 rounded-lg text-[11px] text-zinc-300 leading-normal">
                      🚀 This coding trick changes EVERYTHING! Stop wasting hours on manual edits... #developer #webdev #codinglife
                    </div>
                    <div className="flex justify-between gap-2">
                      <div className="flex-1 bg-black/60 border border-[#39FF14]/20 rounded-lg p-2 flex items-center gap-1.5">
                        <div className="w-1 h-1 rounded-full bg-[#39FF14]" />
                        <span className="text-[9px] font-bold text-zinc-400">TikTok</span>
                      </div>
                      <div className="flex-1 bg-black/60 border border-[#39FF14]/20 rounded-lg p-2 flex items-center gap-1.5">
                        <div className="w-1 h-1 rounded-full bg-[#39FF14]" />
                        <span className="text-[9px] font-bold text-zinc-400">Shorts</span>
                      </div>
                      <div className="flex-1 bg-black/60 border border-[#39FF14]/20 rounded-lg p-2 flex items-center gap-1.5">
                        <div className="w-1 h-1 rounded-full bg-[#39FF14]" />
                        <span className="text-[9px] font-bold text-zinc-400">Reels</span>
                      </div>
                    </div>
                  </div>
                </div>
              </Step>
            </Stepper>
          </div>
        </div>
      </Section>

      {/* FEATURES */}
      <Section id="features" className="py-28 px-6">
        <div className="max-w-7xl mx-auto">
          <motion.div variants={stagger} className="text-center mb-16">
            <BlurText
              text="The Precision Flow Engine"
              delay={70}
              animateBy="words"
              direction="top"
              className="text-4xl md:text-5xl font-bold mb-4 justify-center text-white"
            />
            <motion.p variants={fadeUp} className="text-zinc-400">Advanced modules designed for high-velocity output.</motion.p>
          </motion.div>

          <motion.div variants={stagger} className="space-y-6">
            {/* Top 3 cards - Changed to motion.div to pass stagger variants */}
            <motion.div className="grid md:grid-cols-3 gap-6">
              {[
                { icon: Lightbulb, color: "#39FF14", title: "AI Idea Generator", desc: "Never run out of content ideas. Let Llama 3.3 70B generate scroll-stopping hooks and script templates for your exact niche." },
                { icon: Scissors, color: "#39FF14", title: "Browser Studio", desc: "Split your clips, track timeline intervals, and crop videos to vertical aspect ratios directly in your browser." },
                { icon: Type, color: "#39FF14", title: "AI Copywriter", desc: "Draft high-converting captions and viral hashtags optimized for TikTok, Reels, and Shorts search algorithms." },
              ].map(({ icon: Icon, color, title, desc }, i) => (
                <motion.div key={i} variants={fadeUp}
                  whileHover={{ scale: 1.03, borderColor: "rgba(57,255,20,0.4)" }}
                  className="bg-[#111] border border-white/8 rounded-2xl p-7 transition-all duration-300 hover:shadow-[0_0_30px_rgba(57,255,20,0.08)] group"
                >
                  <div className="w-10 h-10 rounded-lg bg-[#39FF14]/10 border border-[#39FF14]/20 flex items-center justify-center mb-5">
                    <Icon className="w-5 h-5 text-[#39FF14]" />
                  </div>
                  <h3 className="font-bold text-white mb-2">{title}</h3>
                  <p className="text-sm text-zinc-400 leading-relaxed">{desc}</p>
                </motion.div>
              ))}
            </motion.div>

            {/* Wide Analytics Card */}
            <motion.div variants={fadeUp}
              whileHover={{ borderColor: "rgba(57,255,20,0.4)" }}
              className="bg-[#111] border border-white/8 rounded-2xl p-8 transition-all duration-300 hover:shadow-[0_0_30px_rgba(57,255,20,0.08)]"
            >
              <div className="flex flex-col md:flex-row md:items-center gap-6">
                <div className="w-12 h-12 rounded-xl bg-[#39FF14]/10 border border-[#39FF14]/20 flex items-center justify-center shrink-0">
                  <BarChart3 className="w-6 h-6 text-[#39FF14]" />
                </div>
                <div className="flex-1">
                  <h3 className="font-bold text-white text-xl mb-2">Analytics Dashboard</h3>
                  <p className="text-zinc-400 text-sm leading-relaxed max-w-2xl">
                    Tracks multi-platform performance metrics from a unified command center. Each module sets deeper retention, engagement data, and cross-platform growth from a single, beautiful interface.
                  </p>
                </div>
                <div className="flex gap-3 shrink-0">
                  {[65, 80, 55, 90, 75, 95].map((h, i) => (
                    <motion.div key={i} className="w-2 bg-[#39FF14]/30 rounded-full self-end"
                      style={{ height: `${h * 0.8}px` }}
                      animate={{ opacity: [0.4, 1, 0.4] }}
                      transition={{ duration: 1.5, delay: i * 0.2, repeat: Infinity }}
                    />
                  ))}
                </div>
              </div>
            </motion.div>
          </motion.div>
        </div>
      </Section>

      {/* PRICING */}
      <Section id="pricing" className="py-28 px-6 bg-black/40 border-t border-white/5">
        <div className="max-w-7xl mx-auto">
          <motion.div variants={stagger} initial="hidden" whileInView="visible" viewport={{ once: true }} className="text-center mb-16">
            <BlurText
              text="Simple, Transparent Pricing"
              delay={70}
              animateBy="words"
              direction="top"
              className="text-4xl md:text-5xl font-bold mb-4 justify-center text-white"
            />
            <motion.p variants={fadeUp} className="text-zinc-400">
              All plans are <span className="text-[#39FF14] font-semibold">100% free to try</span> during our launch beta. No credit card required!
            </motion.p>
          </motion.div>

          <motion.div variants={stagger} initial="hidden" whileInView="visible" viewport={{ once: true }}
            className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto justify-items-center"
          >
            {/* Creator Card */}
            <motion.div variants={fadeUp} whileHover={{ y: -8 }} className="w-full max-w-sm">
              <PricingWrapper
                type="waves"
                contactHref="/signup"
                buttonText="Start For Free"
                className="bg-gradient-to-br from-zinc-900 via-neutral-900 to-black border-zinc-800"
                strokeColorClass="text-zinc-800/40"
              >
                <Heading>Creator</Heading>
                <Price>
                  <span className="line-through text-zinc-600 text-2xl mr-2 font-normal font-sans">$29</span>
                  $0
                  <span className="text-[10px] text-[#39FF14] font-bold tracking-widest ml-2 bg-[#39FF14]/10 border border-[#39FF14]/20 px-2 py-0.5 rounded uppercase">Beta Free</span>
                </Price>
                <Paragraph>Perfect for solo video editors, streamers, and indie creators starting their journey.</Paragraph>
                <ul className="space-y-2.5 mt-4">
                  {["10 Hours of Video Processing", "720p & 1080p Render Export", "Standard AI Captions"].map((f, i) => (
                    <li key={i} className="flex items-center gap-2 text-xs font-semibold text-zinc-300">
                      <Check className="w-3.5 h-3.5 text-[#39FF14] shrink-0" /> {f}
                    </li>
                  ))}
                </ul>
              </PricingWrapper>
            </motion.div>

            {/* Pro Card (Highlighted with Crosses) */}
            <motion.div variants={fadeUp} whileHover={{ y: -8 }} className="w-full max-w-sm">
              <PricingWrapper
                type="crosses"
                contactHref="/signup"
                buttonText="Claim Pro Beta Access"
                className="relative bg-gradient-to-br from-zinc-950 via-[#1b3d11]/15 to-black border-[#39FF14]/40 shadow-[0_0_40px_rgba(57,255,20,0.1)]"
                strokeColorClass="text-[#39FF14]/15"
                buttonClassName="bg-[#39FF14] hover:bg-[#2ee610] text-black font-extrabold shadow-[0_0_15px_rgba(57,255,20,0.3)]"
              >
                <div className="absolute top-4 right-4 z-10">
                  <span className="bg-[#39FF14] text-black text-[9px] font-bold px-2.5 py-0.5 rounded-full uppercase tracking-wider shadow-[0_0_10px_rgba(57,255,20,0.4)]">
                    Popular
                  </span>
                </div>
                <Heading>Pro</Heading>
                <Price className="text-[#39FF14]">
                  <span className="line-through text-zinc-500 text-2xl mr-2 font-normal font-sans">$79</span>
                  $0
                  <span className="text-[10px] text-black font-bold tracking-widest ml-2 bg-[#39FF14] px-2 py-0.5 rounded uppercase">Beta Free</span>
                </Price>
                <Paragraph className="text-zinc-300">Unlock full precision automation to build and run your multi-platform content engine.</Paragraph>
                <ul className="space-y-2.5 mt-4">
                  {["50 Hours of Video Processing", "Full 4K Render Quality", "Premium Dynamic AI Styles", "A/B Test Dynamic Variants"].map((f, i) => (
                    <li key={i} className="flex items-center gap-2 text-xs font-semibold text-zinc-200">
                      <Check className="w-3.5 h-3.5 text-[#39FF14] shrink-0" /> {f}
                    </li>
                  ))}
                </ul>
              </PricingWrapper>
            </motion.div>

            {/* Agency Card */}
            <motion.div variants={fadeUp} whileHover={{ y: -8 }} className="w-full max-w-sm">
              <PricingWrapper
                type="waves"
                contactHref="/signup"
                buttonText="Try Agency Free"
                className="bg-gradient-to-br from-zinc-900 via-[#1d1233]/15 to-black border-purple-500/20"
                strokeColorClass="text-purple-500/10"
                buttonClassName="bg-zinc-800 text-white border border-zinc-700 hover:bg-zinc-700 hover:border-zinc-500"
              >
                <Heading>Agency</Heading>
                <Price>
                  <span className="line-through text-zinc-600 text-2xl mr-2 font-normal font-sans">$199</span>
                  $0
                  <span className="text-[10px] text-[#39FF14] font-bold tracking-widest ml-2 bg-[#39FF14]/10 border border-[#39FF14]/20 px-2 py-0.5 rounded uppercase">Beta Free</span>
                </Price>
                <Paragraph>Designed for production studios, channels, and marketing teams managing infinite streams.</Paragraph>
                <ul className="space-y-2.5 mt-4">
                  {["Unlimited Video Processing", "High-Priority Server Queues", "Custom Templates & Integrations", "Developer API Access"].map((f, i) => (
                    <li key={i} className="flex items-center gap-2 text-xs font-semibold text-zinc-300">
                      <Check className="w-3.5 h-3.5 text-[#39FF14] shrink-0" /> {f}
                    </li>
                  ))}
                </ul>
              </PricingWrapper>
            </motion.div>
          </motion.div>
        </div>
      </Section>

      {/* TESTIMONIALS */}
      <Section id="testimonials" className="py-28 px-6 bg-black/40 border-t border-white/5 overflow-hidden">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <BlurText
              text="Loved by Global Creators"
              delay={75}
              animateBy="words"
              direction="top"
              className="text-4xl md:text-5xl font-bold mb-4 justify-center text-white"
            />
            <motion.p variants={fadeUp} className="text-zinc-400">
              Join thousands of video editors, agencies, and streamers who scale their content using ClipFlow.
            </motion.p>
          </div>

          <div className="flex justify-center gap-6 max-h-[500px] overflow-hidden relative">
            <TestimonialsColumn
              testimonials={testimonials.slice(0, 2)}
              duration={15}
              className="block"
            />
            <TestimonialsColumn
              testimonials={testimonials.slice(2, 4)}
              duration={19}
              className="hidden md:block"
            />
            <TestimonialsColumn
              testimonials={testimonials.slice(4, 6)}
              duration={14}
              className="hidden lg:block"
            />

            {/* Subtle mask to fade the vertical edges */}
            <div className="absolute inset-x-0 top-0 h-28 bg-gradient-to-b from-[#070707] to-transparent pointer-events-none z-10" />
            <div className="absolute inset-x-0 bottom-0 h-28 bg-gradient-to-t from-[#070707] to-transparent pointer-events-none z-10" />
          </div>
        </div>
      </Section>

      {/* FOOTER */}
      <Footer />
    </div>
  )
}
