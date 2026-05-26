"use client";

import React from "react";
import { motion } from "framer-motion";

export const testimonials = [
  {
    text: "ClipFlow completely changed my workflow. I used to spend 4 hours cutting stream highlights; now AI finds them in seconds and auto-generates dynamic captions.",
    image: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=100&auto=format&fit=crop&q=60",
    name: "Sarah Jenkins",
    role: "TikTok Editor (1.2M followers)"
  },
  {
    text: "The dynamic captions styling is exactly what you see on viral reels. It makes retention rates skyrocket with zero editing effort.",
    image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&auto=format&fit=crop&q=60",
    name: "Marcus Vance",
    role: "Shorts Channel Owner"
  },
  {
    text: "Having an infinite editing assistant allowed us to scale from posting twice a week to three times a day. Our organic traffic grew by 400%.",
    image: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100&auto=format&fit=crop&q=60",
    name: "Elena Rostova",
    role: "Studio Director"
  },
  {
    text: "The WebGL fluid interface is incredibly smooth, and the AI clip generator works like absolute magic. A must-have for content creators.",
    image: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=100&auto=format&fit=crop&q=60",
    name: "David K.",
    role: "Full-Time Streamer"
  },
  {
    text: "Being able to A/B test subtitle variants is a game-changer. We can see exactly which typography pulls the most audience retention.",
    image: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=100&auto=format&fit=crop&q=60",
    name: "Jessie Miller",
    role: "Digital Strategist"
  },
  {
    text: "No more manual cutting. It identifies high-energy gaming highlights perfectly and crops it for YouTube Shorts and Reels immediately.",
    image: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100&auto=format&fit=crop&q=60",
    name: "Tyler Thompson",
    role: "Gaming Creator"
  }
];

export const TestimonialsColumn = (props: {
  className?: string;
  testimonials: typeof testimonials;
  duration?: number;
}) => {
  return (
    <div className={props.className}>
      <motion.div
        animate={{
          translateY: "-50%",
        }}
        transition={{
          duration: props.duration || 10,
          repeat: Infinity,
          ease: "linear",
          repeatType: "loop",
        }}
        className="flex flex-col gap-6 pb-6"
      >
        {[
          ...new Array(2).fill(0).map((_, index) => (
            <React.Fragment key={index}>
              {props.testimonials.map(({ text, image, name, role }, i) => (
                <div 
                  className="p-8 rounded-3xl border border-zinc-800 bg-zinc-950/40 backdrop-blur-sm shadow-lg shadow-black/10 max-w-xs w-full text-left transition-all duration-300 hover:border-[#39FF14]/30" 
                  key={`${index}-${i}`}
                >
                  <div className="text-zinc-300 text-sm leading-relaxed">{text}</div>
                  <div className="flex items-center gap-3 mt-6 border-t border-zinc-900 pt-4">
                    <img
                      width={40}
                      height={40}
                      src={image}
                      alt={name}
                      className="h-10 w-10 rounded-full object-cover border border-zinc-800"
                    />
                    <div className="flex flex-col">
                      <div className="font-semibold text-sm tracking-tight leading-5 text-white">{name}</div>
                      <div className="text-xs leading-5 opacity-60 tracking-tight text-zinc-400">{role}</div>
                    </div>
                  </div>
                </div>
              ))}
            </React.Fragment>
          )),
        ]}
      </motion.div>
    </div>
  );
};
