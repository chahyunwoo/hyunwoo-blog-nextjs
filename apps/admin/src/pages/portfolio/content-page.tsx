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
  ExperienceDetail,
  ExperienceTranslation,
  ProjectDetail,
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
import { adminApi } from '@/shared/api'
import type { LocaleCode } from '@/shared/config'
import { LOCALE_TABS } from '@/shared/config'
import { useTranslationForm } from '@/shared/hooks'
import { AdminInput, AdminLabel, AdminTextarea, LocaleTabs, TagsInput, useConfirmStore, YearPicker } from '@/shared/ui'

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

function createEmptyExperienceTranslation(locale: LocaleCode): ExperienceTranslation {
  return { locale, title: '', role: '', responsibilities: [] }
}

function ExperiencesSection() {
  const { data: experiences, isLoading } = useExperiences()
  const createExperience = useCreateExperience()
  const deleteExperience = useDeleteExperience()
  const confirm = useConfirmStore(state => state.confirm)

  const [showForm, setShowForm] = useState(false)
  const [editingId, setEditingId] = useState<number | null>(null)
  const [startDate, setStartDate] = useState('')
  const [endDate, setEndDate] = useState('')
  const [isCurrent, setIsCurrent] = useState(false)

  const {
    activeLocale,
    setActiveLocale,
    translations,
    currentTranslation,
    updateField,
    resetTranslations,
    setInitial,
  } = useTranslationForm({ emptyFactory: createEmptyExperienceTranslation })

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
    resetTranslations()
    setShowForm(false)
    setEditingId(null)
  }

  const handleCreate = () => {
    if (!startDate.trim()) return
    createExperience.mutate(
      {
        startDate,
        endDate: endDate || undefined,
        isCurrent,
        translations: translations.filter(t => t.title.trim()),
      },
      { onSuccess: resetForm },
    )
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

  const startEdit = async (exp: { id: number }) => {
    const detail = await adminApi.get(`api/portfolio/experiences/${exp.id}`).json<ExperienceDetail>()
    setEditingId(detail.id)
    setStartDate(detail.startDate)
    setEndDate(detail.endDate ?? '')
    setIsCurrent(detail.isCurrent)
    setInitial(
      LOCALE_TABS.map(l => {
        const existing = detail.translations.find(t => t.locale === l.code)
        return existing ?? createEmptyExperienceTranslation(l.code as LocaleCode)
      }),
    )
    setShowForm(true)
  }

  return (
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
                <YearPicker value={startDate} onChange={setStartDate} />
              </div>
              <div className="space-y-1">
                <AdminLabel>End Date</AdminLabel>
                <YearPicker value={endDate} onChange={setEndDate} disabled={isCurrent} />
              </div>
              <div className="flex items-center gap-2 pt-6">
                <AdminLabel htmlFor="exp-isCurrent">현재 재직중</AdminLabel>
                <Switch id="exp-isCurrent" checked={isCurrent} onCheckedChange={setIsCurrent} />
              </div>
            </div>

            <LocaleTabs activeLocale={activeLocale} onChange={setActiveLocale} />

            {currentTranslation && (
              <div className="flex flex-col gap-5">
                <div className="space-y-1">
                  <AdminLabel>Title (회사명)</AdminLabel>
                  <AdminInput
                    value={currentTranslation.title}
                    onChange={e => updateField(activeLocale, 'title', e.target.value)}
                  />
                </div>
                <div className="space-y-1">
                  <AdminLabel>Role</AdminLabel>
                  <AdminInput
                    value={currentTranslation.role}
                    onChange={e => updateField(activeLocale, 'role', e.target.value)}
                  />
                </div>
                <div className="space-y-1">
                  <AdminLabel>Responsibilities (한 줄씩 입력)</AdminLabel>
                  <AdminTextarea
                    className="min-h-[100px]"
                    value={currentTranslation.responsibilities.join('\n')}
                    onChange={e => updateField(activeLocale, 'responsibilities', e.target.value.split('\n'))}
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
          <div
            key={exp.id}
            className={`flex items-center justify-between p-4 rounded-md border ${editingId === exp.id ? 'border-primary bg-primary/5' : ''}`}
          >
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
      const body: CreateExperienceBody = {
        startDate,
        endDate: endDate || undefined,
        isCurrent,
        translations: translations
          .filter(t => t.title.trim())
          .map(({ locale, title, role, responsibilities }) => ({ locale, title, role, responsibilities })),
      }
      updateExperience.mutate(body, { onSuccess })
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

function createEmptyProjectTranslation(locale: LocaleCode): ProjectTranslation {
  return { locale, title: '', description: '' }
}

function ProjectsSection() {
  const { data: projects, isLoading } = useProjects()
  const createProject = useCreateProject()
  const deleteProject = useDeleteProject()
  const confirm = useConfirmStore(state => state.confirm)

  const [showForm, setShowForm] = useState(false)
  const [editingId, setEditingId] = useState<number | null>(null)
  const [techStack, setTechStack] = useState<string[]>([])
  const [demoUrl, setDemoUrl] = useState('')
  const [repoUrl, setRepoUrl] = useState('')
  const [featured, setFeatured] = useState(false)

  const {
    activeLocale,
    setActiveLocale,
    translations,
    currentTranslation,
    updateField,
    resetTranslations,
    setInitial,
  } = useTranslationForm({ emptyFactory: createEmptyProjectTranslation })

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
    resetTranslations()
    setShowForm(false)
    setEditingId(null)
  }

  const handleCreate = () => {
    createProject.mutate(
      {
        techStack,
        demoUrl: demoUrl || undefined,
        repoUrl: repoUrl || undefined,
        featured,
        translations: translations.filter(t => t.title.trim()),
      },
      { onSuccess: resetForm },
    )
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

  const startEdit = async (proj: { id: number }) => {
    const detail = await adminApi.get(`api/portfolio/projects/${proj.id}`).json<ProjectDetail>()
    setEditingId(detail.id)
    setTechStack(detail.techStack)
    setDemoUrl(detail.demoUrl ?? '')
    setRepoUrl(detail.repoUrl ?? '')
    setFeatured(detail.featured)
    setInitial(
      LOCALE_TABS.map(l => {
        const existing = detail.translations.find(t => t.locale === l.code)
        return existing ?? createEmptyProjectTranslation(l.code as LocaleCode)
      }),
    )
    setShowForm(true)
  }

  return (
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

            <LocaleTabs activeLocale={activeLocale} onChange={setActiveLocale} />

            {currentTranslation && (
              <div className="flex flex-col gap-5">
                <div className="space-y-1">
                  <AdminLabel>Title</AdminLabel>
                  <AdminInput
                    value={currentTranslation.title}
                    onChange={e => updateField(activeLocale, 'title', e.target.value)}
                  />
                </div>
                <div className="space-y-1">
                  <AdminLabel>Description</AdminLabel>
                  <AdminTextarea
                    className="min-h-[80px]"
                    value={currentTranslation.description ?? ''}
                    onChange={e => updateField(activeLocale, 'description', e.target.value)}
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
          <div
            key={proj.id}
            className={`flex items-center justify-between p-4 rounded-md border ${editingId === proj.id ? 'border-primary bg-primary/5' : ''}`}
          >
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
      const body: CreateProjectBody = {
        techStack,
        demoUrl: demoUrl || undefined,
        repoUrl: repoUrl || undefined,
        featured,
        translations: translations
          .filter(t => t.title.trim())
          .map(({ locale, title, description }) => ({ locale, title, description })),
      }
      updateProject.mutate(body, { onSuccess })
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
