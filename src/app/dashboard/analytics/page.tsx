import { getPostMetrics } from "./actions"
import { AnalyticsClient } from "@/components/analytics/analytics-client"

export default async function AnalyticsPage() {
  const result = await getPostMetrics()
  const metrics = result.data || {
    totalViews: 0,
    totalLikes: 0,
    postCount: 0,
    chartData: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]
  }

  return <AnalyticsClient metrics={metrics} />
}
