"use client"

import { motion, HTMLMotionProps } from "framer-motion"
import { cn } from "@/lib/utils"

interface AnimatedCardProps extends HTMLMotionProps<"div"> {
  children: React.ReactNode
  delay?: number
}

export function AnimatedCard({ children, className, delay = 0, ...props }: AnimatedCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ 
        duration: 0.5, 
        delay: delay, 
        ease: [0.23, 1, 0.32, 1] // Custom cubic-bezier for Apple-like smoothness
      }}
      whileHover={{ 
        y: -5,
        boxShadow: "0 20px 40px -15px rgba(57, 255, 20, 0.15)", // Neon green subtle glow
        borderColor: "rgba(57, 255, 20, 0.2)"
      }}
      className={cn(
        "glass-panel rounded-2xl p-6 transition-colors duration-300 relative overflow-hidden group",
        className
      )}
      {...props}
    >
      {/* Subtle hover gradient overlay */}
      <div className="absolute inset-0 bg-gradient-to-br from-[#39FF14]/5 to-[#2ee610]/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />
      
      <div className="relative z-10">
        {children}
      </div>
    </motion.div>
  )
}
