"use server"

import { createClient } from "@/utils/supabase/server"

export async function getPostMetrics() {
  try {
    const supabase = await createClient()
    const { data: { user } } = await supabase.auth.getUser()
    
    if (!user) return { error: "Not authenticated" }

    // Check if user has any posts
    const { data: posts, error } = await supabase
      .from('posts')
      .select('*')
      .eq('user_id', user.id)

    if (error) throw error

    // If no posts exist, inject dummy data for the showcase
    if (!posts || posts.length === 0) {
      await injectDummyMetrics(user.id)
      
      // Fetch again
      const { data: newPosts } = await supabase
        .from('posts')
        .select('*')
        .eq('user_id', user.id)
        
      return processMetrics(newPosts || [])
    }

    return processMetrics(posts)
  } catch (error: any) {
    console.error("Error fetching metrics:", error)
    return { error: error.message || "Failed to fetch metrics", data: getFallbackMetrics() }
  }
}

function processMetrics(posts: any[]) {
  const totalViews = posts.reduce((acc, p) => acc + (p.views || 0), 0)
  const totalLikes = posts.reduce((acc, p) => acc + (p.likes || 0), 0)
  
  return {
    success: true,
    data: {
      totalViews,
      totalLikes,
      postCount: posts.length,
      // Randomly generate chart data for now until we have actual time-series tracking
      chartData: Array.from({ length: 12 }, () => Math.floor(Math.random() * 60) + 40)
    }
  }
}

function getFallbackMetrics() {
  return {
    totalViews: 12400000,
    totalLikes: 850000,
    postCount: 14,
    chartData: [40, 30, 45, 50, 40, 65, 85, 75, 90, 100, 85, 95]
  }
}

async function injectDummyMetrics(userId: string) {
  const supabase = await createClient()
  
  const dummyPosts = [
    { user_id: userId, title: "The exact moment the WR was broken", platform: "TikTok", views: 4500000, likes: 320000 },
    { user_id: userId, title: "Hilarious reaction to jump scare", platform: "Reels", views: 2100000, likes: 180000 },
    { user_id: userId, title: "Deep dive into the new meta", platform: "YouTube", views: 1800000, likes: 140000 },
    { user_id: userId, title: "5 AI Tools for Creators", platform: "TikTok", views: 4000000, likes: 210000 },
  ]
  
  await supabase.from('posts').insert(dummyPosts)
}
