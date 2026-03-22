import {
  Button,
  Card,
  CardContent,
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
  Separator,
  Switch,
} from '@hyunwoo/ui'
import Editor, { type Monaco } from '@monaco-editor/react'
import { useNavigate } from '@tanstack/react-router'
import { Loader2 } from 'lucide-react'
import { useState } from 'react'
import type { CreateWorkBody, WorkDetail, WorkTranslation, WorkType } from '@/entities/portfolio'
import { useCreateWork, useUpdateWork, useWorkDetail } from '@/entities/portfolio'
import type { LocaleCode } from '@/shared/config'
import { LOCALE_TABS } from '@/shared/config'
import { monokaiWinterNight } from '@/shared/lib'
import { AdminInput, AdminLabel, MonthPicker, TagsInput } from '@/shared/ui'

function createEmptyTranslation(locale: LocaleCode): WorkTranslation {
  return { locale, title: '', role: '', summary: '', content: '', highlights: [] }
}

interface WorkFormPageProps {
  mode: 'create' | 'edit'
  id?: number
}

export function WorkFormPage({ mode, id }: WorkFormPageProps) {
  if (mode === 'edit' && id) {
    return <WorkEditForm id={id} />
  }
  return <WorkFormInner mode="create" />
}

function WorkEditForm({ id }: { id: number }) {
  const { data } = useWorkDetail(id)
  return <WorkFormInner mode="edit" id={id} initial={data} />
}

interface WorkFormInnerProps {
  mode: 'create' | 'edit'
  id?: number
  initial?: WorkDetail
}

function WorkFormInner({ mode, id, initial }: WorkFormInnerProps) {
  const navigate = useNavigate()
  const createWork = useCreateWork()
  const updateWork = useUpdateWork(id ?? 0)

  const [type, setType] = useState<WorkType>(initial?.type ?? 'business')
  const [startDate, setStartDate] = useState(initial?.startDate ?? '')
  const [endDate, setEndDate] = useState(initial?.endDate ?? '')
  const [isCurrent, setIsCurrent] = useState(initial?.isCurrent ?? false)
  const [techStack, setTechStack] = useState<string[]>(initial?.techStack ?? [])
  const [demoUrl, setDemoUrl] = useState(initial?.demoUrl ?? '')
  const [repoUrl, setRepoUrl] = useState(initial?.repoUrl ?? '')
  const [featured, setFeatured] = useState(initial?.featured ?? false)
  const [sortOrder, setSortOrder] = useState(initial?.sortOrder ?? 0)
  const [activeLocale, setActiveLocale] = useState<LocaleCode>('ko')
  const [translations, setTranslations] = useState<WorkTranslation[]>(() => {
    if (!initial) {
      return LOCALE_TABS.map(l => createEmptyTranslation(l.code))
    }
    return LOCALE_TABS.map(l => {
      const existing = initial.translations.find(t => t.locale === l.code)
      return existing
        ? {
            locale: l.code,
            title: existing.title,
            role: existing.role ?? '',
            summary: existing.summary,
            content: existing.content,
            highlights: existing.highlights ?? [],
          }
        : createEmptyTranslation(l.code)
    })
  })

  const isPending = createWork.isPending || updateWork.isPending

  const currentTranslation = translations.find(t => t.locale === activeLocale)

  const updateTranslation = (locale: LocaleCode, field: keyof WorkTranslation, value: unknown) => {
    setTranslations(prev => prev.map(t => (t.locale === locale ? { ...t, [field]: value } : t)))
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()

    const body: CreateWorkBody = {
      type,
      sortOrder,
      startDate: startDate || undefined,
      endDate: endDate || undefined,
      isCurrent,
      techStack,
      demoUrl: demoUrl || undefined,
      repoUrl: repoUrl || undefined,
      featured,
      translations: translations.filter(t => t.title.trim()),
    }

    if (mode === 'edit' && id) {
      updateWork.mutate(body, {
        onSuccess: () => navigate({ to: '/portfolio/works' }),
      })
    } else {
      createWork.mutate(body, {
        onSuccess: () => navigate({ to: '/portfolio/works' }),
      })
    }
  }

  return (
    <form onSubmit={handleSubmit}>
      <h2 className="text-2xl font-bold mb-6">{mode === 'create' ? '새 Work' : 'Work 수정'}</h2>

      <div className="grid grid-cols-1 lg:grid-cols-[1fr_320px] gap-6">
        {/* Left column — main content */}
        <div className="flex flex-col gap-5">
          {/* Locale tabs */}
          <div className="flex items-center gap-1">
            {LOCALE_TABS.map(l => (
              <Button
                key={l.code}
                type="button"
                variant={activeLocale === l.code ? 'default' : 'outline'}
                size="sm"
                onClick={() => setActiveLocale(l.code)}
              >
                {l.label}
              </Button>
            ))}
          </div>

          {currentTranslation && (
            <>
              <div>
                <AdminLabel>Title</AdminLabel>
                <AdminInput
                  value={currentTranslation.title}
                  onChange={e => updateTranslation(activeLocale, 'title', e.target.value)}
                />
              </div>

              <div>
                <AdminLabel>Role</AdminLabel>
                <AdminInput
                  value={currentTranslation.role ?? ''}
                  onChange={e => updateTranslation(activeLocale, 'role', e.target.value)}
                />
              </div>

              <div>
                <AdminLabel>Summary</AdminLabel>
                <AdminInput
                  value={currentTranslation.summary}
                  onChange={e => updateTranslation(activeLocale, 'summary', e.target.value)}
                />
              </div>

              {/* Monaco Editor for content */}
              <div>
                <AdminLabel>Content (MDX)</AdminLabel>
                <div className="rounded-md overflow-hidden border border-border">
                  <Editor
                    height="calc(100vh - 500px)"
                    defaultLanguage="markdown"
                    value={currentTranslation.content}
                    onChange={value => updateTranslation(activeLocale, 'content', value ?? '')}
                    beforeMount={(monaco: Monaco) => {
                      monaco.editor.defineTheme('monokai-winter-night', monokaiWinterNight)
                    }}
                    theme="monokai-winter-night"
                    options={{
                      minimap: { enabled: false },
                      fontSize: 14,
                      lineNumbers: 'on',
                      wordWrap: 'on',
                      scrollBeyondLastLine: false,
                      padding: { top: 16, bottom: 16 },
                    }}
                  />
                </div>
              </div>
            </>
          )}
        </div>

        {/* Right column — settings */}
        <div className="flex flex-col gap-4">
          <Card>
            <CardContent className="pt-4 flex flex-col gap-4">
              <AdminLabel className="text-base font-semibold mb-0">Settings</AdminLabel>

              <div>
                <AdminLabel>Type</AdminLabel>
                <Select value={type} onValueChange={v => setType(v as WorkType)}>
                  <SelectTrigger className="h-10 w-full">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="business">Business</SelectItem>
                    <SelectItem value="personal">Personal</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <AdminLabel>Start Date</AdminLabel>
                  <MonthPicker value={startDate} onChange={setStartDate} placeholder="시작일" />
                </div>
                <div>
                  <AdminLabel>End Date</AdminLabel>
                  <MonthPicker value={endDate} onChange={setEndDate} placeholder="종료일" disabled={isCurrent} />
                </div>
              </div>

              <div className="flex items-center justify-between">
                <AdminLabel className="mb-0">현재 진행 중</AdminLabel>
                <Switch checked={isCurrent} onCheckedChange={setIsCurrent} />
              </div>

              <div className="flex items-center justify-between">
                <AdminLabel className="mb-0">Featured</AdminLabel>
                <Switch checked={featured} onCheckedChange={setFeatured} />
              </div>

              <div>
                <AdminLabel>Sort Order</AdminLabel>
                <AdminInput type="number" value={sortOrder} onChange={e => setSortOrder(Number(e.target.value))} />
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="pt-4 flex flex-col gap-4">
              <AdminLabel className="text-base font-semibold mb-0">Tech Stack</AdminLabel>
              <TagsInput value={techStack} onChange={setTechStack} placeholder="Enter로 추가" />
            </CardContent>
          </Card>

          <Card>
            <CardContent className="pt-4 flex flex-col gap-4">
              <AdminLabel className="text-base font-semibold mb-0">URLs</AdminLabel>
              <div>
                <AdminLabel>Demo URL</AdminLabel>
                <AdminInput value={demoUrl} onChange={e => setDemoUrl(e.target.value)} placeholder="https://" />
              </div>
              <div>
                <AdminLabel>Repository URL</AdminLabel>
                <AdminInput value={repoUrl} onChange={e => setRepoUrl(e.target.value)} placeholder="https://" />
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="pt-4 flex flex-col gap-4">
              <AdminLabel className="text-base font-semibold mb-0">Highlights</AdminLabel>
              {currentTranslation && (
                <TagsInput
                  value={currentTranslation.highlights ?? []}
                  onChange={v => updateTranslation(activeLocale, 'highlights', v)}
                  placeholder="Enter로 추가"
                />
              )}
            </CardContent>
          </Card>
        </div>
      </div>

      <Separator className="my-6" />

      <div className="flex items-center justify-end gap-2">
        <Button type="button" variant="outline" onClick={() => navigate({ to: '/portfolio/works' })}>
          취소
        </Button>
        <Button type="submit" disabled={isPending}>
          {isPending && <Loader2 className="size-4 animate-spin" />}
          {mode === 'create' ? '생성' : '저장'}
        </Button>
      </div>
    </form>
  )
}
