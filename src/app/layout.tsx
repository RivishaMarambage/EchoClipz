import type { Metadata } from "next";
import "./globals.css";
import { Toaster } from "@/components/ui/sonner"

export const metadata: Metadata = {
  title: "ClipFlow AI – Turn Long Videos Into Viral Short Clips",
  description: "AI-powered creator operating system for TikTok, Reels, and YouTube Shorts editors.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className="dark h-full antialiased"
      style={{ fontFamily: "'Nohemi', system-ui, sans-serif" }}
    >
      <body className="min-h-full flex flex-col" style={{ fontFamily: "'Nohemi', system-ui, sans-serif" }}>
        {children}
        <Toaster />
      </body>
    </html>
  );
}
