import Link from "next/link";
import { ArrowRight, Scissors } from "lucide-react";

export function Footer() {
  return (
    <footer className="bg-black text-white py-10 px-6 border-t border-white/10 mt-12 relative overflow-hidden">
      {/* Background gradients */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,rgba(57,255,20,0.03),transparent_50%)] pointer-events-none" />
      <div className="absolute top-0 right-0 w-1/2 h-[400px] bg-gradient-to-bl from-[#39FF14]/5 to-transparent blur-3xl pointer-events-none -z-10" />

      <div className="max-w-7xl mx-auto flex flex-col">
        {/* Top Section: CTA */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-12 gap-4">
          <h2 className="text-3xl md:text-4xl font-medium tracking-tight">
            Get started today
          </h2>
          <div className="flex items-stretch group">
            <Link 
              href="/signup"
              className="bg-[#39FF14] text-black font-bold text-[10px] tracking-widest uppercase px-6 py-3 flex items-center justify-center transition-all group-hover:bg-[#2ee610]"
            >
              Start Free Trial
            </Link>
            <div className="bg-[#39FF14]/90 text-black px-3 py-3 flex items-center justify-center border-l border-black/20 transition-all group-hover:bg-[#2ee610]/90 cursor-pointer">
              <ArrowRight className="w-4 h-4" />
            </div>
          </div>
        </div>

        {/* Huge Logo Section */}
        <div className="flex items-center mb-10 overflow-hidden">
          <img src="/EchoClipz.png" alt="EchoClipz Logo" className="h-20 md:h-28 lg:h-36 object-contain drop-shadow-[0_0_30px_rgba(57,255,20,0.3)]" />
        </div>

        {/* Middle Section: Info & Newsletter */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-8 mb-12">
          <div className="md:col-span-5">
            <p className="text-lg md:text-xl text-zinc-400 font-light leading-relaxed max-w-sm">
              AI agents to help you turn long videos into viral short clips.
            </p>
          </div>
          <div className="md:col-span-3 space-y-4">
            <h4 className="text-[10px] font-bold tracking-widest text-zinc-500 uppercase">Contact Us</h4>
            <div className="text-sm text-zinc-300 space-y-1">
              <p>123 Creator Lane #404</p>
              <p>Los Angeles, CA 90028</p>
              <br />
              <p className="hover:text-[#39FF14] transition-colors cursor-pointer">hello@echoclipz.ai</p>
            </div>
          </div>
          <div className="md:col-span-4 space-y-4">
             <h4 className="text-[10px] font-bold tracking-widest text-zinc-500 uppercase">Stay Up To Date</h4>
             <form className="flex border border-white/20 focus-within:border-[#39FF14]/50 transition-colors bg-white/5">
                <input 
                  type="email" 
                  placeholder="" 
                  className="bg-transparent border-none outline-none text-white px-4 py-3 w-full text-sm placeholder:text-zinc-600"
                />
                <button type="submit" className="bg-white text-black text-[10px] font-bold tracking-widest uppercase px-6 py-3 hover:bg-zinc-200 transition-colors">
                  Submit
                </button>
             </form>
          </div>
        </div>

        {/* Horizontal Navigation */}
        <div className="border-t border-white/10 pt-6 pb-8 overflow-x-auto no-scrollbar">
          <ul className="flex items-center gap-8 md:gap-12 min-w-max text-[10px] font-bold tracking-widest text-zinc-500 uppercase">
            <li><Link href="#" className="hover:text-white transition-colors">Build</Link></li>
            <li><Link href="#" className="hover:text-white transition-colors">Automate</Link></li>
            <li><Link href="#" className="hover:text-white transition-colors">Templates</Link></li>
            <li><Link href="#" className="hover:text-white transition-colors">Schedule</Link></li>
            <li><Link href="#" className="hover:text-white transition-colors">Track</Link></li>
            <li><Link href="#" className="hover:text-white transition-colors">Resources</Link></li>
            <li><Link href="#" className="hover:text-white transition-colors">About</Link></li>
            <li><Link href="#" className="hover:text-white transition-colors">Security</Link></li>
            <li><Link href="#" className="hover:text-white transition-colors">Privacy</Link></li>
            <li><Link href="#" className="hover:text-white transition-colors">Terms</Link></li>
          </ul>
        </div>

        {/* Bottom Section */}
        <div className="flex flex-col sm:flex-row justify-between items-center pt-8 border-t border-white/5 text-[10px] text-zinc-600">
          <p>© EchoClipz. All Rights Reserved {new Date().getFullYear()}</p>
          <p className="mt-4 sm:mt-0">Site by DEEPMIND</p>
        </div>
      </div>
    </footer>
  );
}
