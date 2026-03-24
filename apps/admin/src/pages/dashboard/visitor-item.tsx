import { Badge } from '@hyunwoo/ui'
import { Bot, MapPin } from 'lucide-react'
import type { VisitorTimelineItem } from '@/entities/analytics'
import { countryFlag } from '@/shared/lib'

function formatTime(dateStr: string) {
  const d = new Date(dateStr)
  const month = d.getMonth() + 1
  const day = d.getDate()
  const hour = String(d.getHours()).padStart(2, '0')
  const min = String(d.getMinutes()).padStart(2, '0')
  return `${month}/${day} ${hour}:${min}`
}

function pageName(path: string) {
  if (path === '/') return '홈'
  const slug = path.replace('/blog/', '').replace(/^\//, '')
  return slug.length > 35 ? `${slug.slice(0, 35)}...` : slug
}

export function VisitorItem({ visitor }: { visitor: VisitorTimelineItem }) {
  const flag = visitor.country ? countryFlag(visitor.country) : ''
  const cityLabel = visitor.city ?? '알 수 없음'
  const isBot = visitor.isBot

  return (
    <div className={`py-3 border-b border-border/50 last:border-0 ${isBot ? 'opacity-40' : ''}`}>
      <div className="flex items-center gap-2 mb-1">
        {flag && <span>{flag}</span>}
        <span className="text-sm font-mono font-medium">{visitor.ipAddress}</span>
        <span className="text-[11px] text-muted-foreground">
          <MapPin size={10} className="inline mr-0.5 -translate-y-px" aria-hidden="true" />
          {cityLabel}
        </span>
        {isBot && (
          <Badge variant="secondary" className="gap-1 text-[10px] px-1.5 py-0 bg-amber-900/30 text-amber-400">
            <Bot size={10} aria-hidden="true" />
            Bot
          </Badge>
        )}
      </div>

      {isBot ? (
        <p className="text-xs text-muted-foreground/60 ml-0.5">봇이 {visitor.totalViews}개 페이지를 크롤링함</p>
      ) : (
        <div className="flex flex-col gap-1 ml-0.5">
          {visitor.visits.slice(0, 6).map(visit => (
            <p key={`${visit.path}-${visit.visitedAt}`} className="text-xs text-muted-foreground leading-relaxed">
              <span className="font-mono text-muted-foreground/50">{formatTime(visit.visitedAt)}</span>{' '}
              {visit.referrer ? (
                <span>
                  <span className="text-blue-400">{visit.referrer}</span>에서 유입
                </span>
              ) : (
                <span>직접 접속</span>
              )}
              {' → '}
              <span className="text-foreground/90 font-medium">{pageName(visit.path)}</span>
            </p>
          ))}
          {visitor.visits.length > 6 && (
            <p className="text-[10px] text-muted-foreground/40">외 {visitor.visits.length - 6}건</p>
          )}
        </div>
      )}
    </div>
  )
}
