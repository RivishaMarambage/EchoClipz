"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { LayoutDashboard, Lightbulb, Scissors, Type, Calendar, BarChart, Settings, LogOut } from "lucide-react"
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarFooter,
} from "@/components/ui/sidebar"
import { signout } from "@/app/(auth)/actions"
import { createClient } from "@/utils/supabase/client"
import { useEffect, useState } from "react"
import { User } from "@supabase/supabase-js"

const items = [
  {
    title: "Dashboard",
    url: "/dashboard",
    icon: LayoutDashboard,
  },
  {
    title: "Clip Finder",
    url: "/dashboard/clips",
    icon: Scissors,
  },
  {
    title: "Viral Ideas",
    url: "/dashboard/ideas",
    icon: Lightbulb,
  },
  {
    title: "Captions",
    url: "/dashboard/captions",
    icon: Type,
  },
  {
    title: "Analytics",
    url: "/dashboard/analytics",
    icon: BarChart,
  },
  {
    title: "Planner",
    url: "/dashboard/planner",
    icon: Calendar,
  },
  {
    title: "Settings",
    url: "/dashboard/settings",
    icon: Settings,
  },
]

export function AppSidebar() {
  const [user, setUser] = useState<User | null>(null)
  const [loading, setLoading] = useState(true)
  const pathname = usePathname()

  useEffect(() => {
    const supabase = createClient()
    
    // Get initial user
    const getUser = async () => {
      try {
        const { data: { user } } = await supabase.auth.getUser()
        setUser(user)
      } catch (err) {
        console.error("Error fetching user:", err)
      } finally {
        setLoading(false)
      }
    }
    getUser()

    // Listen for auth changes
    const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
      setUser(session?.user ?? null)
      setLoading(false)
    })

    return () => {
      subscription.unsubscribe()
    }
  }, [])

  const email = user?.email || ""
  const fullName = user?.user_metadata?.full_name || user?.user_metadata?.name || ""
  const displayName = fullName || email.split("@")[0] || "Creator AI"
  
  const initials = fullName
    ? fullName
        .split(" ")
        .map((n) => n[0])
        .join("")
        .slice(0, 2)
        .toUpperCase()
    : email
    ? email.slice(0, 2).toUpperCase()
    : "CR"

  const avatarUrl = user?.user_metadata?.avatar_url || user?.user_metadata?.picture

  return (
    <Sidebar className="border-r border-white/10 bg-black/50 backdrop-blur-xl rounded-r-3xl shadow-[4px_0_24px_rgba(0,0,0,0.5)]">
      <SidebarContent className="p-4">
        <SidebarGroup>
          <SidebarGroupLabel className="mb-6 mt-2 ml-2">
            <img src="/EchoClipz.png" alt="EchoClipz" className="h-11 object-contain drop-shadow-[0_0_10px_rgba(57,255,20,0.2)]" />
          </SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu className="gap-2">
              {items.map((item) => {
                const isActive = item.url === '/dashboard' ? pathname === '/dashboard' : pathname?.startsWith(item.url);
                
                return (
                  <SidebarMenuItem key={item.title}>
                    <SidebarMenuButton 
                      render={<Link href={item.url} />} 
                      className={`rounded-full transition-all duration-300 ease-out hover:translate-x-1 active:scale-95 ${
                        isActive 
                          ? "text-[#39FF14] bg-[#39FF14]/10 shadow-[0_0_12px_rgba(57,255,20,0.1)]" 
                          : "text-zinc-300 hover:text-[#39FF14] hover:bg-[#39FF14]/10 hover:shadow-[0_0_12px_rgba(57,255,20,0.1)]"
                      }`}
                    >
                      <item.icon className="w-5 h-5 mr-3" />
                      <span className="font-medium">{item.title}</span>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                )
              })}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>

      <SidebarFooter className="p-4 border-t border-white/10">
        <div className="flex items-center gap-3 mb-4 px-2">
          <div className="relative flex-shrink-0">
            <div className="w-10 h-10 rounded-full bg-zinc-800 border border-[#39FF14]/30 overflow-hidden flex items-center justify-center">
              {avatarUrl ? (
                <img src={avatarUrl} alt={displayName} className="w-full h-full object-cover" />
              ) : (
                <span className="text-[#39FF14] font-bold text-sm">{initials}</span>
              )}
            </div>
            <div className="absolute bottom-0 right-0 w-3 h-3 bg-[#39FF14] border-2 border-black rounded-full" />
          </div>
          <div className="flex flex-col flex-1 min-w-0">
            <span className="text-sm font-bold text-white truncate" title={displayName}>
              {loading ? "Loading..." : displayName}
            </span>
            <span className="text-[10px] text-zinc-400 truncate" title={email}>
              {loading ? "..." : (email || "Pro Plan")}
            </span>
          </div>
        </div>

        <form action={signout}>
          <button
            type="submit"
            className="w-full flex items-center justify-center gap-2 px-4 py-2 rounded-xl bg-red-500/10 text-red-400 border border-red-500/20 hover:bg-red-500/20 hover:border-red-500/40 transition-all duration-300 ease-out active:scale-95 font-medium text-xs"
          >
            <LogOut className="w-4 h-4" />
            <span>Sign Out</span>
          </button>
        </form>
      </SidebarFooter>
    </Sidebar>
  )
}
