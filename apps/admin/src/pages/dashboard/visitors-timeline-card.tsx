import { Globe } from 'lucide-react'
import { useVisitorsTimeline } from '@/entities/analytics'
import { DashboardCard, EmptyState } from '@/shared/ui'
import { VisitorItem } from './visitor-item'

export function VisitorsTimelineCard() {
  const { data: timeline } = useVisitorsTimeline(7, 'blog')

  return (
    <DashboardCard icon={<Globe size={16} />} title="방문자 타임라인 (7일)" iconColor="indigo">
      {!timeline?.length ? (
        <EmptyState />
      ) : (
        <div className="max-h-[360px] overflow-y-auto flex flex-col">
          {timeline.map(visitor => (
            <VisitorItem key={visitor.ipAddress} visitor={visitor} />
          ))}
        </div>
      )}
    </DashboardCard>
  )
}
