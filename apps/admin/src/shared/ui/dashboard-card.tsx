import { Card, CardContent, CardHeader, CardTitle } from '@hyunwoo/ui'
import type { ReactNode } from 'react'
import { ICON_COLORS } from '@/shared/config'

interface DashboardCardProps {
  icon: ReactNode
  title: string
  iconColor: string
  children: ReactNode
}

export function DashboardCard({ icon, title, iconColor, children }: DashboardCardProps) {
  return (
    <Card className="py-4 h-full">
      <CardHeader className="py-0">
        <div className="flex items-center gap-2">
          <div
            className={`flex items-center justify-center size-7 rounded-md ${ICON_COLORS[iconColor] ?? ICON_COLORS.gray}`}
          >
            {icon}
          </div>
          <CardTitle className="text-sm font-semibold">{title}</CardTitle>
        </div>
      </CardHeader>
      <CardContent className="py-0">{children}</CardContent>
    </Card>
  )
}
