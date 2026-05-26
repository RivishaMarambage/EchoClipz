"use server"

import { createClient } from "@/utils/supabase/server"
import { revalidatePath } from "next/cache"

export type PlannerItem = {
  id: string
  title: string
  status: "ideas" | "scripting" | "editing" | "ready"
  platform: string
  scheduled_date: string | null
  created_at?: string
}

export async function getPlannerItems() {
  try {
    const supabase = await createClient()
    const { data: { user } } = await supabase.auth.getUser()
    
    if (!user) return { error: "Not authenticated" }

    const { data, error } = await supabase
      .from('planner')
      .select('*')
      .eq('user_id', user.id)
      .order('created_at', { ascending: false })

    if (error) throw error

    return { success: true, items: data as PlannerItem[] }
  } catch (error: any) {
    console.error("Error fetching planner items:", error)
    return { error: error.message || "Failed to fetch planner items" }
  }
}

export async function createPlannerItem(formData: FormData) {
  try {
    const supabase = await createClient()
    const { data: { user } } = await supabase.auth.getUser()
    
    if (!user) return { error: "Not authenticated" }

    const title = formData.get('title') as string
    const status = formData.get('status') as string || 'ideas'
    const platform = formData.get('platform') as string || 'TikTok'
    
    if (!title) return { error: "Title is required" }

    const { data, error } = await supabase
      .from('planner')
      .insert({
        user_id: user.id,
        title,
        status,
        platform
      })
      .select()
      .single()

    if (error) throw error

    revalidatePath('/dashboard/planner')
    return { success: true, item: data as PlannerItem }
  } catch (error: any) {
    console.error("Error creating planner item:", error)
    return { error: error.message || "Failed to create item" }
  }
}

export async function updatePlannerItemStatus(id: string, newStatus: string) {
  try {
    const supabase = await createClient()
    const { data: { user } } = await supabase.auth.getUser()
    
    if (!user) return { error: "Not authenticated" }

    const { error } = await supabase
      .from('planner')
      .update({ status: newStatus })
      .eq('id', id)
      .eq('user_id', user.id)

    if (error) throw error

    revalidatePath('/dashboard/planner')
    return { success: true }
  } catch (error: any) {
    console.error("Error updating planner item:", error)
    return { error: error.message || "Failed to update item" }
  }
}

export async function deletePlannerItem(id: string) {
  try {
    const supabase = await createClient()
    const { data: { user } } = await supabase.auth.getUser()
    
    if (!user) return { error: "Not authenticated" }

    const { error } = await supabase
      .from('planner')
      .delete()
      .eq('id', id)
      .eq('user_id', user.id)

    if (error) throw error

    revalidatePath('/dashboard/planner')
    return { success: true }
  } catch (error: any) {
    console.error("Error deleting planner item:", error)
    return { error: error.message || "Failed to delete item" }
  }
}
