import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
  Badge,
  Button,
  Card,
  CardContent,
  Switch,
} from '@hyunwoo/ui'
import { Loader2, Plus } from 'lucide-react'
import { useState } from 'react'
import type {
  CreateExperienceBody,
  CreateProjectBody,
  ExperienceTranslation,
  LocaleCode,
  ProjectTranslation,
} from '@/entities/portfolio'
import {
  useCreateExperience,
  useCreateProject,
  useDeleteExperience,
  useDeleteProject,
  useExperiences,
  useProjects,
  useUpdateExperience,
  useUpdateProject,
} from '@/entities/portfolio'
import { AdminInput, AdminLabel, AdminTextarea, DatePicker, TagsInput, useConfirm } from '@/shared/ui'

const LOCALE_TABS: { code: LocaleCode; label: string }[] = [
  { code: 'ko', label: 'KO' },
  { code: 'en', label: 'EN' },
  { code: 'jp', label: 'JP' },
]

export function ContentPage() {
  return (
    <div className="flex flex-col gap-6">
      <h2 className="text-2xl font-bold">Portfolio 콘텐츠</h2>
      <Accordion type="multiple" defaultValue={['experiences']}>
        <AccordionItem value="experiences">
          <AccordionTrigger>경력</AccordionTrigger>
          <AccordionContent className="px-1 pt-4 pb-2">
            <ExperiencesSection />
          </AccordionContent>
        </AccordionItem>
        <AccordionItem value="projects">
          <AccordionTrigger>프로젝트</AccordionTrigger>
          <AccordionContent className="px-1 pt-4 pb-2">
            <ProjectsSection />
          </AccordionContent>
        </AccordionItem>
      </Accordion>
    </div>
  )
}

function ExperiencesSection() {
  const { data: experiences, isLoading } = useExperiences()
  const createExperience = useCreateExperience()
  const deleteExperience = useDeleteExperience()
  const { confirm, ConfirmDialog } = useConfirm()

  const [showForm, setShowForm] = useState(false)
  const [editingId, setEditingId] = useState<number | null>(null)
  const [startDate, setStartDate] = useState('')
  const [endDate, setEndDate] = useState('')
  const [isCurrent, setIsCurrent] = useState(false)
  const [activeLocale, setActiveLocale] = useState<LocaleCode>('ko')
  const [translations, setTranslations] = useState<ExperienceTranslation[]>(
    LOCALE_TABS.map(l => ({ locale: l.code, title: '', role: '', responsibilities: [] })),
  )

  if (isLoading) {
    return (
      <div className="flex justify-center py-8">
        <Loader2 className="size-6 animate-spin" />
      </div>
    )
  }

  const resetForm = () => {
    setStartDate('')
    setEndDate('')
    setIsCurrent(false)
    setTranslations(LOCALE_TABS.map(l => ({ locale: l.code, title: '', role: '', responsibilities: [] })))
    setActiveLocale('ko')
    setShowForm(false)
    setEditingId(null)
  }

  const handleCreate = () => {
    if (!startDate.trim()) return
    const body: CreateExperienceBody = {
      startDate,
      endDate: endDate || undefined,
      isCurrent,
      translations: translations.filter(t => t.title.trim()),
    }
    createExperience.mutate(body, { onSuccess: resetForm })
  }

  const handleDelete = async (id: number, title: string) => {
    const ok = await confirm({
      title: '경력 삭제',
      description: `"${title}" 경력을 삭제하시겠습니까?`,
      confirmLabel: '삭제',
      variant: 'destructive',
    })
    if (!ok) return
    deleteExperience.mutate(id)
  }

  const startEdit = (exp: {
    id: number
    startDate: string
    endDate: string | null
    isCurrent: boolean
    title: string
    role: string
    responsibilities: string[]
  }) => {
    setEditingId(exp.id)
    setStartDate(exp.startDate)
    setEndDate(exp.endDate ?? '')
    setIsCurrent(exp.isCurrent)
    setTranslations(
      LOCALE_TABS.map(l => ({
        locale: l.code as LocaleCode,
        title: l.code === 'ko' ? exp.title : '',
        role: l.code === 'ko' ? exp.role : '',
        responsibilities: l.code === 'ko' ? exp.responsibilities : [],
      })),
    )
    setShowForm(true)
  }

  const currentTranslation = translations.find(t => t.locale === activeLocale)

  const updateTranslationField = (locale: LocaleCode, field: keyof ExperienceTranslation, value: unknown) => {
    setTranslations(prev => prev.map(t => (t.locale === locale ? { ...t, [field]: value } : t)))
  }

  return (
    <>
      {ConfirmDialog}
      <div className="flex flex-col gap-5">
        <div className="flex justify-end">
          <Button
            type="button"
            variant="outline"
            size="sm"
            onClick={() => {
              resetForm()
              setShowForm(true)
            }}
          >
            <Plus className="size-3" /> 추가
          </Button>
        </div>

        {showForm && (
          <Card>
            <CardContent className="pt-4 flex flex-col gap-5">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
                <div className="space-y-1">
                  <AdminLabel>Start Date</AdminLabel>
                  <DatePicker value={startDate} onChange={setStartDate} />
                </div>
                <div className="space-y-1">
                  <AdminLabel>End Date</AdminLabel>
                  <DatePicker value={endDate} onChange={setEndDate} disabled={isCurrent} />
                </div>
                <div className="flex items-center gap-2 pt-6">
                  <AdminLabel htmlFor="exp-isCurrent">현재 재직중</AdminLabel>
                  <Switch id="exp-isCurrent" checked={isCurrent} onCheckedChange={setIsCurrent} />
                </div>
              </div>

              <div className="flex items-center gap-2">
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
                <div className="flex flex-col gap-5">
                  <div className="space-y-1">
                    <AdminLabel>Title (회사명)</AdminLabel>
                    <AdminInput
                      value={currentTranslation.title}
                      onChange={e => updateTranslationField(activeLocale, 'title', e.target.value)}
                    />
                  </div>
                  <div className="space-y-1">
                    <AdminLabel>Role</AdminLabel>
                    <AdminInput
                      value={currentTranslation.role}
                      onChange={e => updateTranslationField(activeLocale, 'role', e.target.value)}
                    />
                  </div>
                  <div className="space-y-1">
                    <AdminLabel>Responsibilities (한 줄씩 입력)</AdminLabel>
                    <AdminTextarea
                      className="min-h-[100px]"
                      value={currentTranslation.responsibilities.join('\n')}
                      onChange={e =>
                        updateTranslationField(activeLocale, 'responsibilities', e.target.value.split('\n'))
                      }
                    />
                  </div>
                </div>
              )}

              <div className="flex items-center gap-2 justify-end">
                <Button type="button" variant="outline" size="sm" onClick={resetForm}>
                  취소
                </Button>
                <ExperienceSaveButton
                  editingId={editingId}
                  startDate={startDate}
                  endDate={endDate}
                  isCurrent={isCurrent}
                  translations={translations}
                  createIsPending={createExperience.isPending}
                  onCreate={handleCreate}
                  onSuccess={resetForm}
                />
              </div>
            </CardContent>
          </Card>
        )}

        {experiences?.map(exp => {
          const title = exp.title || '제목 없음'
          return (
            <div key={exp.id} className="flex items-center justify-between p-4 rounded-md border">
              <div>
                <span className="text-sm font-medium">{title}</span>
                <div className="flex items-center gap-2 mt-1">
                  <span className="text-xs text-muted-foreground">
                    {exp.startDate} ~ {exp.isCurrent ? '현재' : exp.endDate}
                  </span>
                  {exp.role && (
                    <Badge variant="secondary" className="text-xs">
                      {exp.role}
                    </Badge>
                  )}
                </div>
              </div>
              <div className="flex items-center gap-1">
                <Button type="button" variant="ghost" size="sm" onClick={() => startEdit(exp)}>
                  수정
                </Button>
                <Button
                  type="button"
                  variant="ghost"
                  size="sm"
                  className="text-destructive hover:text-destructive"
                  onClick={() => handleDelete(exp.id, title)}
                  disabled={deleteExperience.isPending}
                >
                  삭제
                </Button>
              </div>
            </div>
          )
        })}
      </div>
    </>
  )
}

interface ExperienceSaveButtonProps {
  editingId: number | null
  startDate: string
  endDate: string
  isCurrent: boolean
  translations: ExperienceTranslation[]
  createIsPending: boolean
  onCreate: () => void
  onSuccess: () => void
}

function ExperienceSaveButton({
  editingId,
  startDate,
  endDate,
  isCurrent,
  translations,
  createIsPending,
  onCreate,
  onSuccess,
}: ExperienceSaveButtonProps) {
  const updateExperience = useUpdateExperience(editingId ?? 0)

  if (editingId) {
    const handleUpdate = () => {
      updateExperience.mutate(
        {
          startDate,
          endDate: endDate || undefined,
          isCurrent,
          translations: translations.filter(t => t.title.trim()),
        },
        { onSuccess },
      )
    }
    return (
      <Button type="button" size="sm" onClick={handleUpdate} disabled={updateExperience.isPending}>
        {updateExperience.isPending && <Loader2 className="size-3 animate-spin" />}
        저장
      </Button>
    )
  }

  return (
    <Button type="button" size="sm" variant="secondary" onClick={onCreate} disabled={createIsPending}>
      {createIsPending && <Loader2 className="size-3 animate-spin" />}
      추가
    </Button>
  )
}

function ProjectsSection() {
  const { data: projects, isLoading } = useProjects()
  const createProject = useCreateProject()
  const deleteProject = useDeleteProject()
  const { confirm, ConfirmDialog } = useConfirm()

  const [showForm, setShowForm] = useState(false)
  const [editingId, setEditingId] = useState<number | null>(null)
  const [techStack, setTechStack] = useState<string[]>([])
  const [demoUrl, setDemoUrl] = useState('')
  const [repoUrl, setRepoUrl] = useState('')
  const [featured, setFeatured] = useState(false)
  const [activeLocale, setActiveLocale] = useState<LocaleCode>('ko')
  const [translations, setTranslations] = useState<ProjectTranslation[]>(
    LOCALE_TABS.map(l => ({ locale: l.code, title: '', description: '' })),
  )

  if (isLoading) {
    return (
      <div className="flex justify-center py-8">
        <Loader2 className="size-6 animate-spin" />
      </div>
    )
  }

  const resetForm = () => {
    setTechStack([])
    setDemoUrl('')
    setRepoUrl('')
    setFeatured(false)
    setTranslations(LOCALE_TABS.map(l => ({ locale: l.code, title: '', description: '' })))
    setActiveLocale('ko')
    setShowForm(false)
    setEditingId(null)
  }

  const handleCreate = () => {
    const body: CreateProjectBody = {
      techStack,
      demoUrl: demoUrl || undefined,
      repoUrl: repoUrl || undefined,
      featured,
      translations: translations.filter(t => t.title.trim()),
    }
    createProject.mutate(body, { onSuccess: resetForm })
  }

  const handleDelete = async (id: number, title: string) => {
    const ok = await confirm({
      title: '프로젝트 삭제',
      description: `"${title}" 프로젝트를 삭제하시겠습니까?`,
      confirmLabel: '삭제',
      variant: 'destructive',
    })
    if (!ok) return
    deleteProject.mutate(id)
  }

  const startEdit = (proj: {
    id: number
    techStack: string[]
    demoUrl: string | null
    repoUrl: string | null
    featured: boolean
    title: string
    description: string | null
  }) => {
    setEditingId(proj.id)
    setTechStack(proj.techStack)
    setDemoUrl(proj.demoUrl ?? '')
    setRepoUrl(proj.repoUrl ?? '')
    setFeatured(proj.featured)
    setTranslations(
      LOCALE_TABS.map(l => ({
        locale: l.code as LocaleCode,
        title: l.code === 'ko' ? proj.title : '',
        description: l.code === 'ko' ? (proj.description ?? '') : '',
      })),
    )
    setShowForm(true)
  }

  const currentTranslation = translations.find(t => t.locale === activeLocale)

  const updateTranslationField = (locale: LocaleCode, field: keyof ProjectTranslation, value: string) => {
    setTranslations(prev => prev.map(t => (t.locale === locale ? { ...t, [field]: value } : t)))
  }

  return (
    <>
      {ConfirmDialog}
      <div className="flex flex-col gap-5">
        <div className="flex justify-end">
          <Button
            type="button"
            variant="outline"
            size="sm"
            onClick={() => {
              resetForm()
              setShowForm(true)
            }}
          >
            <Plus className="size-3" /> 추가
          </Button>
        </div>

        {showForm && (
          <Card>
            <CardContent className="pt-4 flex flex-col gap-5">
              <TagsInput label="Tech Stack" placeholder="Enter로 추가" value={techStack} onChange={setTechStack} />

              <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                <div className="space-y-1">
                  <AdminLabel>Demo URL</AdminLabel>
                  <AdminInput value={demoUrl} onChange={e => setDemoUrl(e.target.value)} placeholder="https://" />
                </div>
                <div className="space-y-1">
                  <AdminLabel>Repo URL</AdminLabel>
                  <AdminInput value={repoUrl} onChange={e => setRepoUrl(e.target.value)} placeholder="https://" />
                </div>
              </div>

              <div className="flex items-center gap-2">
                <AdminLabel htmlFor="proj-featured">Featured</AdminLabel>
                <Switch id="proj-featured" checked={featured} onCheckedChange={setFeatured} />
              </div>

              <div className="flex items-center gap-2">
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
                <div className="flex flex-col gap-5">
                  <div className="space-y-1">
                    <AdminLabel>Title</AdminLabel>
                    <AdminInput
                      value={currentTranslation.title}
                      onChange={e => updateTranslationField(activeLocale, 'title', e.target.value)}
                    />
                  </div>
                  <div className="space-y-1">
                    <AdminLabel>Description</AdminLabel>
                    <AdminTextarea
                      className="min-h-[80px]"
                      value={currentTranslation.description ?? ''}
                      onChange={e => updateTranslationField(activeLocale, 'description', e.target.value)}
                    />
                  </div>
                </div>
              )}

              <div className="flex items-center gap-2 justify-end">
                <Button type="button" variant="outline" size="sm" onClick={resetForm}>
                  취소
                </Button>
                <ProjectSaveButton
                  editingId={editingId}
                  techStack={techStack}
                  demoUrl={demoUrl}
                  repoUrl={repoUrl}
                  featured={featured}
                  translations={translations}
                  createIsPending={createProject.isPending}
                  onCreate={handleCreate}
                  onSuccess={resetForm}
                />
              </div>
            </CardContent>
          </Card>
        )}

        {projects?.map(proj => {
          const title = proj.title || '제목 없음'
          return (
            <div key={proj.id} className="flex items-center justify-between p-4 rounded-md border">
              <div>
                <div className="flex items-center gap-2">
                  <span className="text-sm font-medium">{title}</span>
                  {proj.featured && (
                    <Badge variant="outline" className="text-xs">
                      Featured
                    </Badge>
                  )}
                </div>
                <div className="flex flex-wrap items-center gap-1 mt-1">
                  {proj.techStack.map(tech => (
                    <Badge key={tech} variant="secondary" className="text-xs">
                      {tech}
                    </Badge>
                  ))}
                </div>
              </div>
              <div className="flex items-center gap-1">
                <Button type="button" variant="ghost" size="sm" onClick={() => startEdit(proj)}>
                  수정
                </Button>
                <Button
                  type="button"
                  variant="ghost"
                  size="sm"
                  className="text-destructive hover:text-destructive"
                  onClick={() => handleDelete(proj.id, title)}
                  disabled={deleteProject.isPending}
                >
                  삭제
                </Button>
              </div>
            </div>
          )
        })}
      </div>
    </>
  )
}

interface ProjectSaveButtonProps {
  editingId: number | null
  techStack: string[]
  demoUrl: string
  repoUrl: string
  featured: boolean
  translations: ProjectTranslation[]
  createIsPending: boolean
  onCreate: () => void
  onSuccess: () => void
}

function ProjectSaveButton({
  editingId,
  techStack,
  demoUrl,
  repoUrl,
  featured,
  translations,
  createIsPending,
  onCreate,
  onSuccess,
}: ProjectSaveButtonProps) {
  const updateProject = useUpdateProject(editingId ?? 0)

  if (editingId) {
    const handleUpdate = () => {
      updateProject.mutate(
        {
          techStack,
          demoUrl: demoUrl || undefined,
          repoUrl: repoUrl || undefined,
          featured,
          translations: translations.filter(t => t.title.trim()),
        },
        { onSuccess },
      )
    }
    return (
      <Button type="button" size="sm" onClick={handleUpdate} disabled={updateProject.isPending}>
        {updateProject.isPending && <Loader2 className="size-3 animate-spin" />}
        저장
      </Button>
    )
  }

  return (
    <Button type="button" size="sm" variant="secondary" onClick={onCreate} disabled={createIsPending}>
      {createIsPending && <Loader2 className="size-3 animate-spin" />}
      추가
    </Button>
  )
}
