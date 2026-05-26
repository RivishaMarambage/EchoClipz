"use client"

import { useState, useTransition } from "react"
import { motion } from "framer-motion"
import { MoreHorizontal, Plus, Video, Image as ImageIcon, Type, Loader2, Trash2 } from "lucide-react"
import { GlowingButton } from "@/components/ui/glowing-button"
import { PlannerItem, updatePlannerItemStatus, createPlannerItem, deletePlannerItem } from "@/app/dashboard/planner/actions"

type PlannerBoardProps = {
  initialItems: PlannerItem[]
}

const COLUMNS = [
  { id: "ideas", title: "Idea Backlog", color: "bg-zinc-500" },
  { id: "scripting", title: "Scripting / Prep", color: "bg-indigo-500" },
  { id: "editing", title: "In Production", color: "bg-orange-500" },
  { id: "ready", title: "Ready to Publish", color: "bg-green-500" },
]

export function PlannerBoard({ initialItems }: PlannerBoardProps) {
  const [items, setItems] = useState<PlannerItem[]>(initialItems)
  const [isPending, startTransition] = useTransition()
  const [isAdding, setIsAdding] = useState<string | null>(null) // column id

  // Handle moving card to next status
  const moveCard = async (id: string, currentStatus: string) => {
    const currentIndex = COLUMNS.findIndex(c => c.id === currentStatus)
    if (currentIndex >= COLUMNS.length - 1) return // Already at end

    const nextStatus = COLUMNS[currentIndex + 1].id
    
    // Optimistic UI update
    setItems(prev => prev.map(item => item.id === id ? { ...item, status: nextStatus as any } : item))
    
    // Server update
    startTransition(async () => {
      await updatePlannerItemStatus(id, nextStatus)
    })
  }

  const handleDelete = async (id: string) => {
    setItems(prev => prev.filter(item => item.id !== id))
    startTransition(async () => {
      await deletePlannerItem(id)
    })
  }

  const handleAddSubmit = async (e: React.FormEvent<HTMLFormElement>, status: string) => {
    e.preventDefault()
    const formData = new FormData(e.currentTarget)
    formData.append('status', status)
    
    const title = formData.get('title') as string
    if (!title) return
    
    // Temporary optimistic item
    const tempId = `temp-${Date.now()}`
    const tempItem: PlannerItem = {
      id: tempId,
      title,
      status: status as any,
      platform: "TikTok",
      scheduled_date: null
    }
    setItems(prev => [tempItem, ...prev])
    setIsAdding(null)

    startTransition(async () => {
      const result = await createPlannerItem(formData)
      if (result.success && result.item) {
        // Replace temp item with real item
        setItems(prev => prev.map(i => i.id === tempId ? result.item! : i))
      } else {
        // Rollback
        setItems(prev => prev.filter(i => i.id !== tempId))
      }
    })
  }

  return (
    <div className="flex gap-6 overflow-x-auto pb-4 snap-x">
      {COLUMNS.map((column, columnIndex) => {
        const columnItems = items.filter(item => item.status === column.id)
        
        return (
          <div key={column.id} className="min-w-[320px] w-[320px] shrink-0 snap-start">
            <div className="flex items-center justify-between mb-4 px-2">
              <div className="flex items-center gap-2">
                <div className={`w-3 h-3 rounded-full ${column.color}`} />
                <h3 className="font-bold text-white">{column.title}</h3>
                <span className="text-xs bg-white/10 text-zinc-400 px-2 py-0.5 rounded-full">
                  {columnItems.length}
                </span>
              </div>
              {isPending && <Loader2 className="w-4 h-4 animate-spin text-zinc-500" />}
            </div>

            <div className="bg-[#111827] rounded-2xl p-3 min-h-[500px] border border-white/5 space-y-3">
              {columnItems.map((item, itemIndex) => (
                <motion.div
                  layoutId={item.id}
                  key={item.id}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="bg-black border border-white/10 rounded-xl p-4 hover:border-indigo-500/50 hover:bg-white/5 transition-all group"
                >
                  <div className="flex items-start justify-between mb-3">
                    <span className="text-[10px] font-bold uppercase tracking-wider bg-white/10 text-zinc-300 px-2 py-1 rounded">
                      {item.platform}
                    </span>
                    <button 
                      onClick={() => handleDelete(item.id)}
                      className="opacity-0 group-hover:opacity-100 text-red-500 hover:text-red-400 transition-opacity"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                  
                  <h4 className="text-white font-medium mb-4">{item.title}</h4>
                  
                  <div className="flex items-center justify-between border-t border-white/5 pt-3">
                    <div className="flex items-center gap-2 text-xs text-zinc-400">
                      <Video className="w-4 h-4 text-indigo-400" />
                      <span>Video</span>
                    </div>
                    {column.id !== "ready" && (
                      <button 
                        onClick={() => moveCard(item.id, item.status)}
                        className="text-xs font-medium text-indigo-400 hover:text-indigo-300 bg-indigo-500/10 px-2 py-1 rounded transition-colors"
                      >
                        Move Next →
                      </button>
                    )}
                  </div>
                </motion.div>
              ))}

              {isAdding === column.id ? (
                <form onSubmit={(e) => handleAddSubmit(e, column.id)} className="bg-black border border-indigo-500/50 rounded-xl p-3">
                  <input 
                    name="title"
                    autoFocus
                    placeholder="Enter idea title..."
                    className="w-full bg-transparent text-white text-sm outline-none mb-3"
                  />
                  <div className="flex gap-2">
                    <button type="submit" className="text-xs bg-indigo-600 text-white px-3 py-1.5 rounded font-medium">Add</button>
                    <button type="button" onClick={() => setIsAdding(null)} className="text-xs text-zinc-400 hover:text-white px-2">Cancel</button>
                  </div>
                </form>
              ) : (
                <button 
                  onClick={() => setIsAdding(column.id)}
                  className="w-full py-3 rounded-xl border border-dashed border-white/10 text-zinc-500 hover:text-white hover:border-white/30 hover:bg-white/5 transition-colors flex items-center justify-center gap-2 text-sm font-medium"
                >
                  <Plus className="w-4 h-4" /> Add Item
                </button>
              )}
            </div>
          </div>
        )
      })}
    </div>
  )
}
