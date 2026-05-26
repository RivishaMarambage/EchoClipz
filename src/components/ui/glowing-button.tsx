"use client"

import * as React from "react"
import { motion } from "framer-motion"
import { cn } from "@/lib/utils"

interface GlowingButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  children: React.ReactNode
  variant?: "primary" | "secondary"
}

export const GlowingButton = React.forwardRef<HTMLButtonElement, GlowingButtonProps>(
  ({ children, className, variant = "primary", ...props }, ref) => {
    return (
      <div className="relative group inline-block">
        {/* Animated Glow Behind the Button */}
        <div 
          className={cn(
            "absolute -inset-0.5 rounded-lg blur opacity-60 group-hover:opacity-100 transition duration-1000 group-hover:duration-200 animate-gradient bg-[length:200%_auto]",
            variant === "primary" ? "bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500" : "bg-gradient-to-r from-cyan-400 to-blue-500"
          )}
        />
        
        {/* Actual Button */}
        <button
          ref={ref}
          className={cn(
            "relative flex items-center justify-center gap-2 px-6 py-3 rounded-lg font-medium text-white transition-all duration-200 w-full",
            variant === "primary" ? "bg-black/90 hover:bg-black" : "bg-zinc-900/90 hover:bg-zinc-900",
            className
          )}
          {...props}
        >
          {children}
        </button>
      </div>
    )
  }
)

GlowingButton.displayName = "GlowingButton"
