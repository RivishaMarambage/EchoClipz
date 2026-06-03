import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar"
import { AppSidebar } from "@/components/layout/app-sidebar"

export const dynamic = "force-dynamic"

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
  return (
    <SidebarProvider>
      <AppSidebar />
      <main className="flex-1 overflow-auto bg-[#070707] text-white min-h-screen">
        <div className="flex items-center p-4 border-b border-white/10 bg-black/20 backdrop-blur-sm sticky top-0 z-10">
          <SidebarTrigger className="text-zinc-400 hover:text-white mr-4" />
          <h1 className="text-lg font-bold text-white transition-colors">
            ClipFlow <span className="text-[#39FF14] drop-shadow-[0_0_8px_rgba(57,255,20,0.5)]">AI</span>
          </h1>
        </div>
        <div className="p-6 max-w-7xl mx-auto">
          {children}
        </div>
      </main>
    </SidebarProvider>
  )
}
