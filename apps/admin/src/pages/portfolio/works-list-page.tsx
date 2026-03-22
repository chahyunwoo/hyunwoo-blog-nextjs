import { Badge, Button, Card, CardContent } from '@hyunwoo/ui'
import { Link, useNavigate } from '@tanstack/react-router'
import { Loader2, Pencil, Plus, Trash2 } from 'lucide-react'
import { useState } from 'react'
import type { Work, WorkType } from '@/entities/portfolio'
import { useDeleteWork, useWorks } from '@/entities/portfolio'
import { useConfirm } from '@/shared/ui'

const TABS: { label: string; value: WorkType | undefined }[] = [
  { label: 'All', value: undefined },
  { label: 'Business', value: 'business' },
  { label: 'Personal', value: 'personal' },
]

function getDisplayTitle(work: Work): string {
  return work.title || '제목 없음'
}

function formatPeriod(startDate: string | null, endDate: string | null, isCurrent: boolean): string {
  const start = startDate ?? '?'
  if (isCurrent) return `${start} ~ 현재`
  return endDate ? `${start} ~ ${endDate}` : start
}

export function WorksListPage() {
  const navigate = useNavigate()
  const [activeType, setActiveType] = useState<WorkType | undefined>(undefined)
  const [deletingId, setDeletingId] = useState<number | null>(null)
  const { data: works, isLoading } = useWorks(activeType)
  const deleteWork = useDeleteWork()
  const { confirm, ConfirmDialog } = useConfirm()

  const handleDelete = async (id: number, title: string) => {
    const ok = await confirm({
      title: 'Work 삭제',
      description: `"${title}" Work를 삭제하시겠습니까?`,
      confirmLabel: '삭제',
      variant: 'destructive',
    })
    if (!ok) return
    setDeletingId(id)
    deleteWork.mutate(id, { onSettled: () => setDeletingId(null) })
  }

  return (
    <>
      {ConfirmDialog}
      <div className="flex flex-col gap-4">
        <div className="flex items-center justify-between">
          <h2 className="text-2xl font-bold">Works</h2>
          <Button asChild>
            <Link to="/portfolio/works/new">
              <Plus className="size-4" />새 Work
            </Link>
          </Button>
        </div>

        <div className="flex items-center gap-1">
          {TABS.map(tab => (
            <Button
              key={tab.label}
              variant={activeType === tab.value ? 'default' : 'outline'}
              size="sm"
              onClick={() => setActiveType(tab.value)}
            >
              {tab.label}
            </Button>
          ))}
        </div>

        {isLoading ? (
          <div className="flex items-center justify-center py-12">
            <Loader2 className="size-6 animate-spin" />
          </div>
        ) : !works || works.length === 0 ? (
          <p className="text-muted-foreground text-center py-6">Work가 없습니다.</p>
        ) : (
          <div className="flex flex-col gap-2">
            {works.map(work => {
              const title = getDisplayTitle(work)
              return (
                <Card key={work.id} className="py-0">
                  <CardContent className="flex items-center justify-between gap-2 py-3">
                    <div className="flex items-center gap-2 flex-1 min-w-0">
                      <div className="flex-1 min-w-0">
                        <span className="text-sm font-semibold line-clamp-1">{title}</span>
                        <div className="flex items-center gap-2 mt-1">
                          <Badge variant="secondary" className="text-xs">
                            {work.type}
                          </Badge>
                          <span className="text-xs text-muted-foreground">
                            {formatPeriod(work.startDate, work.endDate, work.isCurrent)}
                          </span>
                          {work.featured && (
                            <Badge variant="outline" className="text-xs">
                              Featured
                            </Badge>
                          )}
                        </div>
                      </div>
                    </div>
                    <div className="flex items-center gap-1">
                      <Button
                        variant="ghost"
                        size="icon"
                        onClick={() => navigate({ to: '/portfolio/works/$id', params: { id: String(work.id) } })}
                        aria-label="수정"
                      >
                        <Pencil className="size-4" />
                      </Button>
                      <Button
                        variant="ghost"
                        size="icon"
                        className="text-destructive hover:text-destructive"
                        disabled={deleteWork.isPending && deletingId === work.id}
                        onClick={() => handleDelete(work.id, title)}
                        aria-label="삭제"
                      >
                        {deleteWork.isPending && deletingId === work.id ? (
                          <Loader2 className="size-4 animate-spin" />
                        ) : (
                          <Trash2 className="size-4" />
                        )}
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              )
            })}
          </div>
        )}
      </div>
    </>
  )
}
