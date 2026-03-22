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
import type { CreateWorkBody, LocaleCode, Work, WorkTranslation, WorkType } from '@/entities/portfolio'
import { useCreateWork, useUpdateWork, useWork } from '@/entities/portfolio'
import { monokaiWinterNight } from '@/shared/lib'
import { AdminInput, AdminLabel, DatePicker, TagsInput } from '@/shared/ui'

const LOCALES: { code: LocaleCode; label: string }[] = [
  { code: 'ko', label: 'KO' },
  { code: 'en', label: 'EN' },
  { code: 'jp', label: 'JP' },
]

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
  const { data } = useWork(id)
  return <WorkFormInner mode="edit" id={id} initial={data} />
}

interface WorkFormInnerProps {
  mode: 'create' | 'edit'
  id?: number
  initial?: Work
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
      return LOCALES.map(l => createEmptyTranslation(l.code))
    }
    return LOCALES.map(l => ({
      locale: l.code as LocaleCode,
      title: l.code === 'ko' ? initial.title : '',
      role: l.code === 'ko' ? (initial.role ?? '') : '',
      summary: l.code === 'ko' ? initial.summary : '',
      content: l.code === 'ko' ? initial.content : '',
      highlights: l.code === 'ko' ? initial.highlights : [],
    }))
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
      <div className="flex flex-col gap-4">
        <h2 className="text-2xl font-bold">{mode === 'create' ? '새 Work' : 'Work 수정'}</h2>

        <div className="grid grid-cols-12 gap-6">
          <div className="col-span-12 lg:col-span-4">
            <Card>
              <CardContent className="pt-6 flex flex-col gap-4">
                <div>
                  <AdminLabel htmlFor="type">Type</AdminLabel>
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

                <div>
                  <AdminLabel>Start Date</AdminLabel>
                  <DatePicker value={startDate} onChange={setStartDate} />
                </div>

                <div>
                  <AdminLabel>End Date</AdminLabel>
                  <DatePicker value={endDate} onChange={setEndDate} disabled={isCurrent} />
                </div>

                <div className="flex items-center justify-between">
                  <AdminLabel htmlFor="isCurrent">현재 진행중</AdminLabel>
                  <Switch id="isCurrent" checked={isCurrent} onCheckedChange={setIsCurrent} />
                </div>

                <TagsInput label="Tech Stack" placeholder="Enter로 추가" value={techStack} onChange={setTechStack} />

                <div>
                  <AdminLabel htmlFor="demoUrl">Demo URL</AdminLabel>
                  <AdminInput
                    id="demoUrl"
                    value={demoUrl}
                    onChange={e => setDemoUrl(e.target.value)}
                    placeholder="https://"
                  />
                </div>

                <div>
                  <AdminLabel htmlFor="repoUrl">Repo URL</AdminLabel>
                  <AdminInput
                    id="repoUrl"
                    value={repoUrl}
                    onChange={e => setRepoUrl(e.target.value)}
                    placeholder="https://"
                  />
                </div>

                <div className="flex items-center justify-between">
                  <AdminLabel htmlFor="featured">Featured</AdminLabel>
                  <Switch id="featured" checked={featured} onCheckedChange={setFeatured} />
                </div>

                <div>
                  <AdminLabel htmlFor="sortOrder">Sort Order</AdminLabel>
                  <AdminInput
                    id="sortOrder"
                    type="number"
                    value={sortOrder}
                    onChange={e => setSortOrder(Number(e.target.value))}
                  />
                </div>
              </CardContent>
            </Card>
          </div>

          <div className="col-span-12 lg:col-span-8">
            <Card>
              <CardContent className="pt-6">
                <div className="flex items-center gap-1 mb-4">
                  {LOCALES.map(l => (
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
                  <div className="flex flex-col gap-4">
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

                    <div>
                      <AdminLabel>Content (Markdown)</AdminLabel>
                      <div className="rounded-md overflow-hidden border border-border">
                        <Editor
                          height="400px"
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

                    <TagsInput
                      label="Highlights"
                      placeholder="Enter로 추가"
                      value={currentTranslation.highlights ?? []}
                      onChange={v => updateTranslation(activeLocale, 'highlights', v)}
                    />
                  </div>
                )}
              </CardContent>
            </Card>
          </div>
        </div>

        <Separator />

        <div className="flex items-center justify-end gap-2">
          <Button type="button" variant="outline" onClick={() => navigate({ to: '/portfolio/works' })}>
            취소
          </Button>
          <Button type="submit" disabled={isPending}>
            {isPending && <Loader2 className="size-4 animate-spin" />}
            {mode === 'create' ? '생성' : '저장'}
          </Button>
        </div>
      </div>
    </form>
  )
}
