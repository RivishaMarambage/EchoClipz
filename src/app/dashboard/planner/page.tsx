import { Calendar } from "lucide-react"
import { getPlannerItems } from "./actions"
import { PlannerBoard } from "@/components/planner/planner-board"

export default async function PlannerPage() {
  const result = await getPlannerItems()
  const items = result.success && result.items ? result.items : []

  return (
    <div className="space-y-8 max-w-[1600px] mx-auto pb-12 overflow-x-hidden">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h2 className="text-3xl font-bold tracking-tight text-white mb-2 flex items-center gap-2">
            <Calendar className="w-8 h-8 text-indigo-400" />
            Content Planner
          </h2>
          <p className="text-zinc-400">
            Manage your content through the production pipeline.
          </p>
        </div>
      </div>

      <PlannerBoard initialItems={items} />
    </div>
  )
}
