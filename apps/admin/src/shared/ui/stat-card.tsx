import { Card, CardContent } from '@hyunwoo/ui'
import type { ReactNode } from 'react'
import { ICON_COLORS } from '@/shared/config'

interface StatCardProps {
  icon: ReactNode
  label: string
  value: number
  color: string
}

export function StatCard({ icon, label, value, color }: StatCardProps) {
  return (
    <Card className="py-0">
      <CardContent className="flex items-center justify-between py-4">
        <div>
          <p className="text-[11px] text-muted-foreground uppercase font-semibold mb-0.5">{label}</p>
          <span className="text-lg font-bold">{value.toLocaleString()}</span>
        </div>
        <div className={`flex items-center justify-center size-9 rounded-md ${ICON_COLORS[color] ?? ICON_COLORS.blue}`}>
          {icon}
        </div>
      </CardContent>
    </Card>
  )
}
