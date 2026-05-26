"use client"

import Link from "next/link"
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

const items = [
  {
    title: "Dashboard",
    url: "/dashboard",
    icon: LayoutDashboard,
  },
  {
    title: "Viral Ideas",
    url: "/dashboard/ideas",
    icon: Lightbulb,
  },
  {
    title: "Clip Finder",
    url: "/dashboard/clips",
    icon: Scissors,
  },
  {
    title: "Captions",
    url: "/dashboard/captions",
    icon: Type,
  },
  {
    title: "Planner",
    url: "/dashboard/planner",
    icon: Calendar,
  },
  {
    title: "Analytics",
    url: "/dashboard/analytics",
    icon: BarChart,
  },
  {
    title: "Settings",
    url: "/dashboard/settings",
    icon: Settings,
  },
]

export function AppSidebar() {
  return (
    <Sidebar className="border-r border-white/10 bg-black/50 backdrop-blur-xl rounded-r-3xl shadow-[4px_0_24px_rgba(0,0,0,0.5)]">
      <SidebarContent className="p-4">
        <SidebarGroup>
          <SidebarGroupLabel className="text-zinc-400 font-bold mb-4 ml-2 tracking-wider">CLIPFLOW AI</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu className="gap-2">
              {items.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton 
                    render={<Link href={item.url} />} 
                    className="text-zinc-300 hover:text-[#39FF14] hover:bg-[#39FF14]/10 rounded-full transition-all duration-300 ease-out hover:translate-x-1 hover:shadow-[0_0_12px_rgba(57,255,20,0.1)] active:scale-95"
                  >
                    <item.icon className="w-5 h-5 mr-3" />
                    <span className="font-medium">{item.title}</span>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>

      <SidebarFooter className="p-4 border-t border-white/10">
        <form action={signout}>
          <button
            type="submit"
            className="w-full flex items-center gap-3 px-4 py-2.5 rounded-full text-zinc-400 hover:text-red-400 hover:bg-red-500/10 transition-all duration-300 ease-out hover:translate-x-1 active:scale-95 font-medium text-sm"
          >
            <LogOut className="w-5 h-5" />
            <span>Sign Out</span>
          </button>
        </form>
      </SidebarFooter>
    </Sidebar>
  )
}
