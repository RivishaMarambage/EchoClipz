"use client"

import { motion, useScroll, useTransform, type Variants } from "framer-motion"
import Link from "next/link"
import { ArrowRight, Upload, Cpu, Download, Scissors, Zap, Type, BarChart3, Play, Check, Rocket, Globe, Video, Share2 } from "lucide-react"
import { useRef } from "react"
import LiquidEther from "@/components/ui/LiquidEther"
import BlurText from "@/components/ui/BlurText"
import Stepper, { Step } from "@/components/ui/Stepper"
import { Navbar } from "@/components/ui/Navbar"
import { PricingWrapper, Heading, Price, Paragraph } from "@/components/ui/PricingCards"
import { TestimonialsColumn, testimonials } from "@/components/ui/Testimonials"
import { InteractiveRobotSpline } from "@/components/ui/InteractiveRobotSpline"

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

      {/* NAVBAR */}
      <Navbar />

      {/* HERO */}
      <div ref={heroRef} className="relative pt-24 pb-32 px-6 overflow-hidden min-h-[90vh] flex items-center">
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
              text="AI-powered creator operating system for TikTok, Reels, and YouTube Shorts editors. Precision Flow to scale your content engine."
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

            <motion.div variants={fadeUp} initial="hidden" animate="visible" transition={{ delay: 0.4 }}
              className="flex items-center gap-2 mt-8 text-xs text-zinc-500"
            >
              <div className="flex -space-x-2">
                {["bg-indigo-500","bg-pink-500","bg-yellow-500","bg-cyan-500"].map((c,i)=>(
                  <div key={i} className={`w-6 h-6 rounded-full ${c} border-2 border-black`} />
                ))}
              </div>
              <span><strong className="text-white">8,150+</strong> Creators Found Their Viral Clips</span>
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
                    <Upload className="w-6 h-6 text-[#39FF14]" />
                  </div>
                  <h3 className="text-xl font-bold text-white mb-2">1. Upload Session</h3>
                  <p className="text-sm text-zinc-400 mb-6 max-w-sm">Drop your stream, vlog, or raw gaming footage directly into our cloud engine.</p>
                  
                  {/* Simulated Upload Zone */}
                  <div className="w-full border border-dashed border-[#39FF14]/30 rounded-xl bg-black/40 p-6 flex flex-col items-center">
                    <Upload className="w-8 h-8 text-[#39FF14] mb-3 animate-pulse" />
                    <p className="text-xs text-zinc-400 font-medium mb-1">gaming_session_4h.mp4</p>
                    <p className="text-[10px] text-zinc-600 mb-3">4.2 GB</p>
                    <div className="w-full bg-zinc-900 rounded-full h-1.5 overflow-hidden">
                      <div className="bg-[#39FF14] h-full rounded-full w-full shadow-[0_0_8px_rgba(57,255,20,0.6)]" />
                    </div>
                    <span className="text-[10px] text-[#39FF14] font-bold mt-2">100% UPLOADED</span>
                  </div>
                </div>
              </Step>

              <Step>
                <div className="flex flex-col items-center text-center p-4">
                  <div className="w-12 h-12 rounded-full bg-[#39FF14]/10 border border-[#39FF14]/20 flex items-center justify-center mb-4">
                    <Cpu className="w-6 h-6 text-[#39FF14]" />
                  </div>
                  <h3 className="text-xl font-bold text-white mb-2">2. Precision Processing</h3>
                  <p className="text-sm text-zinc-400 mb-6 max-w-sm">Our AI engine scans dialogue, laughter, and high-motion frames to crop precise 9:16 verticals.</p>
                  
                  {/* Simulated Processing Panel */}
                  <div className="w-full border border-white/5 rounded-xl bg-[#111] p-5 text-left space-y-3">
                    <div className="flex justify-between items-center text-xs">
                      <span className="text-zinc-500 font-mono">Analyzing Timeline...</span>
                      <span className="text-[#39FF14] font-bold animate-pulse">Processing</span>
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
                        <span>4 Viral Hook Moments Detected (Confidence: 96%)</span>
                      </div>
                      <div className="flex items-center gap-2 text-[10px] text-zinc-400">
                        <span className="w-1.5 h-1.5 rounded-full bg-[#39FF14]" />
                        <span>Auto-Framing face tracking applied (98% accuracy)</span>
                      </div>
                    </div>
                  </div>
                </div>
              </Step>

              <Step>
                <div className="flex flex-col items-center text-center p-4">
                  <div className="w-12 h-12 rounded-full bg-[#39FF14]/10 border border-[#39FF14]/20 flex items-center justify-center mb-4">
                    <Download className="w-6 h-6 text-[#39FF14]" />
                  </div>
                  <h3 className="text-xl font-bold text-white mb-2">3. Scale Distribution</h3>
                  <p className="text-sm text-zinc-400 mb-6 max-w-sm">Export instantly in ultra-smooth 4K with auto-generated kinetic captions and post directly to socials.</p>
                  
                  {/* Simulated Export/Publish Panel */}
                  <div className="w-full border border-white/5 rounded-xl bg-[#111] p-5 text-left space-y-4">
                    <div className="flex justify-between items-center text-xs">
                      <span className="text-white font-bold">Publish Destination</span>
                      <span className="text-[#39FF14] text-[10px] font-bold">READY TO EXPORT</span>
                    </div>
                    <div className="flex justify-between gap-2">
                      <div className="flex-1 bg-black/60 border border-[#39FF14]/30 rounded-lg p-2 flex items-center gap-2">
                        <div className="w-1.5 h-1.5 rounded-full bg-[#39FF14]" />
                        <span className="text-[10px] font-bold text-zinc-300">TikTok</span>
                      </div>
                      <div className="flex-1 bg-black/60 border border-[#39FF14]/30 rounded-lg p-2 flex items-center gap-2">
                        <div className="w-1.5 h-1.5 rounded-full bg-[#39FF14]" />
                        <span className="text-[10px] font-bold text-zinc-300">YT Shorts</span>
                      </div>
                      <div className="flex-1 bg-black/60 border border-[#39FF14]/30 rounded-lg p-2 flex items-center gap-2">
                        <div className="w-1.5 h-1.5 rounded-full bg-[#39FF14]" />
                        <span className="text-[10px] font-bold text-zinc-300">IG Reels</span>
                      </div>
                    </div>
                    <div className="flex items-center justify-between pt-1 border-t border-white/5 text-[10px] text-zinc-500">
                      <span>File Resolution: 4K (60fps)</span>
                      <span>Est. Reach: +135% Growth</span>
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
                { icon: Scissors, color: "#39FF14", title: "AI Clip Finder", desc: "Analyzes dozens of formats to identify high-value moments as they emerge in your clips." },
                { icon: Zap, color: "#39FF14", title: "Viral Hook Gen", desc: "Auto-generates fast hooks optimized for scroll-stopping." },
                { icon: Type, color: "#39FF14", title: "Auto-Captions", desc: "Kinetic transcription is tuned to speech with 99% accuracy." },
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
            <motion.p variants={fadeUp} className="text-zinc-400">Choose the plan that fits your creative needs.</motion.p>
          </motion.div>

          <motion.div variants={stagger} initial="hidden" whileInView="visible" viewport={{ once: true }}
            className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto justify-items-center"
          >
            {/* Creator Card */}
            <motion.div variants={fadeUp} whileHover={{ y: -8 }} className="w-full max-w-sm">
              <PricingWrapper
                type="waves"
                contactHref="/signup"
                buttonText="Get Started"
                className="bg-gradient-to-br from-zinc-900 via-neutral-900 to-black border-zinc-800"
                strokeColorClass="text-zinc-800/40"
              >
                <Heading>Creator</Heading>
                <Price>$29<span className="text-sm font-normal text-zinc-500 ml-1">/mo</span></Price>
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
                buttonText="Start Free Trial"
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
                <Price className="text-[#39FF14]">$79<span className="text-sm font-normal text-zinc-400 ml-1">/mo</span></Price>
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
                buttonText="Contact Sales"
                className="bg-gradient-to-br from-zinc-900 via-[#1d1233]/15 to-black border-purple-500/20"
                strokeColorClass="text-purple-500/10"
                buttonClassName="bg-zinc-800 text-white border border-zinc-700 hover:bg-zinc-700 hover:border-zinc-500"
              >
                <Heading>Agency</Heading>
                <Price>$199<span className="text-sm font-normal text-zinc-500 ml-1">/mo</span></Price>
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
      <footer className="border-t border-white/5 bg-black py-12 px-6">
        <div className="max-w-7xl mx-auto">
          <div className="grid md:grid-cols-4 gap-10 mb-12">
            <div>
              <div className="flex items-center gap-2 mb-4">
                <div className="w-6 h-6 rounded-md bg-[#39FF14] flex items-center justify-center">
                  <Scissors className="w-3.5 h-3.5 text-black" />
                </div>
                <span className="font-bold">ClipFlow AI</span>
              </div>
              <p className="text-xs text-zinc-500 leading-relaxed">
                All your short-form video needs in one beautiful, fast workspace.
              </p>
              <p className="text-xs text-zinc-600 mt-4">© 2026 ClipFlow AI. All rights reserved.</p>
            </div>
            <div>
              <h4 className="font-semibold text-white text-sm mb-4">Product</h4>
              <ul className="space-y-2 text-xs text-zinc-500">
                {["Features","Pricing","Changelog","Roadmap"].map(l => <li key={l}><a href="#" className="hover:text-white transition-colors">{l}</a></li>)}
              </ul>
            </div>
            <div>
              <h4 className="font-semibold text-white text-sm mb-4">Resources</h4>
              <ul className="space-y-2 text-xs text-zinc-500">
                {["Privacy Policy","Help Center","Blog","Contact","API Docs"].map(l => <li key={l}><a href="#" className="hover:text-white transition-colors">{l}</a></li>)}
              </ul>
            </div>
            <div>
              <h4 className="font-semibold text-white text-sm mb-4">Connect</h4>
              <div className="flex gap-3">
                {[Globe, Video, Share2].map((Icon, i) => (
                  <a key={i} href="#" className="w-8 h-8 rounded-md border border-white/10 flex items-center justify-center text-zinc-500 hover:text-[#39FF14] hover:border-[#39FF14]/40 transition-colors">
                    <Icon className="w-3.5 h-3.5" />
                  </a>
                ))}
              </div>
            </div>
          </div>
        </div>
      </footer>
    </div>
  )
}
