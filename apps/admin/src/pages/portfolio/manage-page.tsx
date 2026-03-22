import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
  Badge,
  Button,
  Card,
  CardContent,
  Input,
  Label,
  Separator,
} from '@hyunwoo/ui'
import { Loader2, Plus, Trash2 } from 'lucide-react'
import { useEffect, useRef, useState } from 'react'
import type {
  CreateEducationBody,
  CreateSkillBody,
  EducationTranslation,
  LocaleCode,
  ProfileTranslation,
  SocialLink,
  UpdateProfileBody,
} from '@/entities/portfolio'
import {
  useCreateEducation,
  useCreateLocale,
  useCreateSkill,
  useDeleteEducation,
  useDeleteLocale,
  useDeleteSkill,
  useEducation,
  useLocales,
  useProfile,
  useSkills,
  useUpdateEducation,
  useUpdateProfile,
  useUpdateSkill,
} from '@/entities/portfolio'

const LOCALE_TABS: { code: LocaleCode; label: string }[] = [
  { code: 'ko', label: 'KO' },
  { code: 'en', label: 'EN' },
  { code: 'jp', label: 'JP' },
]

export function ManagePage() {
  return (
    <div className="flex flex-col gap-4">
      <h2 className="text-2xl font-bold">Portfolio 관리</h2>
      <Accordion type="multiple" defaultValue={['profile']}>
        <AccordionItem value="profile">
          <AccordionTrigger>프로필</AccordionTrigger>
          <AccordionContent>
            <ProfileSection />
          </AccordionContent>
        </AccordionItem>
        <AccordionItem value="skills">
          <AccordionTrigger>스킬</AccordionTrigger>
          <AccordionContent>
            <SkillsSection />
          </AccordionContent>
        </AccordionItem>
        <AccordionItem value="education">
          <AccordionTrigger>학력</AccordionTrigger>
          <AccordionContent>
            <EducationSection />
          </AccordionContent>
        </AccordionItem>
        <AccordionItem value="locales">
          <AccordionTrigger>로케일</AccordionTrigger>
          <AccordionContent>
            <LocalesSection />
          </AccordionContent>
        </AccordionItem>
      </Accordion>
    </div>
  )
}

function ProfileSection() {
  const { data: profile, isLoading } = useProfile()
  const updateProfile = useUpdateProfile()

  const [name, setName] = useState('')
  const [location, setLocation] = useState('')
  const [imageUrl, setImageUrl] = useState('')
  const [iconUrl, setIconUrl] = useState('')
  const keyCounter = useRef(0)
  const [socialLinks, setSocialLinks] = useState<(SocialLink & { _key: number })[]>([])
  const [translations, setTranslations] = useState<ProfileTranslation[]>(
    LOCALE_TABS.map(l => ({ locale: l.code, jobTitle: '', introduction: [] })),
  )
  const [activeLocale, setActiveLocale] = useState<LocaleCode>('ko')

  useEffect(() => {
    if (!profile) return
    setName(profile.name)
    setLocation(profile.location)
    setImageUrl(profile.imageUrl)
    setIconUrl(profile.iconUrl)
    setSocialLinks((profile.socialLinks ?? []).map(link => ({ ...link, _key: keyCounter.current++ })))
    setTranslations(
      LOCALE_TABS.map(l => ({
        locale: l.code as LocaleCode,
        jobTitle: l.code === 'ko' ? (profile.jobTitle ?? '') : '',
        introduction: l.code === 'ko' ? (profile.introduction ?? []) : [],
      })),
    )
  }, [profile])

  if (isLoading) {
    return (
      <div className="flex justify-center py-8">
        <Loader2 className="size-6 animate-spin" />
      </div>
    )
  }

  const currentTranslation = translations.find(t => t.locale === activeLocale)

  const updateTranslationField = (locale: LocaleCode, field: keyof ProfileTranslation, value: unknown) => {
    setTranslations(prev => prev.map(t => (t.locale === locale ? { ...t, [field]: value } : t)))
  }

  const handleSave = () => {
    const body: UpdateProfileBody = {
      name,
      location,
      imageUrl,
      iconUrl,
      socialLinks: socialLinks.map(({ _key: _, ...rest }) => rest),
      translations,
    }
    updateProfile.mutate(body)
  }

  const addSocialLink = () => {
    setSocialLinks(prev => [...prev, { name: '', href: '', icon: '', _key: keyCounter.current++ }])
  }

  const updateSocialLink = (index: number, field: keyof SocialLink, value: string) => {
    setSocialLinks(prev => prev.map((link, i) => (i === index ? { ...link, [field]: value } : link)))
  }

  const removeSocialLink = (index: number) => {
    setSocialLinks(prev => prev.filter((_, i) => i !== index))
  }

  return (
    <div className="flex flex-col gap-4">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <Label htmlFor="profile-name">Name</Label>
          <Input id="profile-name" value={name} onChange={e => setName(e.target.value)} />
        </div>
        <div>
          <Label htmlFor="profile-location">Location</Label>
          <Input id="profile-location" value={location} onChange={e => setLocation(e.target.value)} />
        </div>
        <div>
          <Label htmlFor="profile-imageUrl">Image URL</Label>
          <Input id="profile-imageUrl" value={imageUrl} onChange={e => setImageUrl(e.target.value)} />
        </div>
        <div>
          <Label htmlFor="profile-iconUrl">Icon URL</Label>
          <Input id="profile-iconUrl" value={iconUrl} onChange={e => setIconUrl(e.target.value)} />
        </div>
      </div>

      <Separator />

      <div>
        <div className="flex items-center justify-between mb-2">
          <Label>Social Links</Label>
          <Button type="button" variant="outline" size="sm" onClick={addSocialLink}>
            <Plus className="size-3" /> 추가
          </Button>
        </div>
        <div className="flex flex-col gap-2">
          {socialLinks.map((link, i) => (
            <div key={link._key} className="flex items-center gap-2">
              <Input placeholder="name" value={link.name} onChange={e => updateSocialLink(i, 'name', e.target.value)} />
              <Input placeholder="href" value={link.href} onChange={e => updateSocialLink(i, 'href', e.target.value)} />
              <Input placeholder="icon" value={link.icon} onChange={e => updateSocialLink(i, 'icon', e.target.value)} />
              <Button type="button" variant="ghost" size="icon" onClick={() => removeSocialLink(i)} aria-label="삭제">
                <Trash2 className="size-4 text-destructive" />
              </Button>
            </div>
          ))}
        </div>
      </div>

      <Separator />

      <div>
        <div className="flex items-center gap-1 mb-4">
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
          <div className="flex flex-col gap-4">
            <div>
              <Label>Job Title</Label>
              <Input
                value={currentTranslation.jobTitle}
                onChange={e => updateTranslationField(activeLocale, 'jobTitle', e.target.value)}
              />
            </div>
            <div>
              <Label>Introduction (한 줄씩 입력)</Label>
              <textarea
                className="flex w-full rounded-md border border-input bg-transparent px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 min-h-[120px]"
                value={currentTranslation.introduction.join('\n')}
                onChange={e => updateTranslationField(activeLocale, 'introduction', e.target.value.split('\n'))}
              />
            </div>
          </div>
        )}
      </div>

      <div className="flex justify-end">
        <Button type="button" onClick={handleSave} disabled={updateProfile.isPending}>
          {updateProfile.isPending && <Loader2 className="size-4 animate-spin" />}
          저장
        </Button>
      </div>
    </div>
  )
}

function SkillsSection() {
  const { data: skillGroups, isLoading } = useSkills()
  const createSkill = useCreateSkill()
  const deleteSkill = useDeleteSkill()

  const [newSkill, setNewSkill] = useState<CreateSkillBody>({
    category: '',
    name: '',
    proficiency: 80,
    description: '',
  })
  const [editingId, setEditingId] = useState<number | null>(null)
  const [editForm, setEditForm] = useState<Partial<CreateSkillBody>>({})

  if (isLoading) {
    return (
      <div className="flex justify-center py-8">
        <Loader2 className="size-6 animate-spin" />
      </div>
    )
  }

  const handleCreate = () => {
    if (!newSkill.category.trim() || !newSkill.name.trim()) return
    createSkill.mutate(newSkill, {
      onSuccess: () => setNewSkill({ category: '', name: '', proficiency: 80, description: '' }),
    })
  }

  const handleDelete = (id: number, name: string) => {
    if (!window.confirm(`"${name}" 스킬을 삭제하시겠습니까?`)) return
    deleteSkill.mutate(id)
  }

  return (
    <div className="flex flex-col gap-4">
      <Card>
        <CardContent className="pt-4">
          <span className="text-sm font-semibold block mb-3">새 스킬 추가</span>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-2">
            <Input
              placeholder="Category"
              value={newSkill.category}
              onChange={e => setNewSkill(p => ({ ...p, category: e.target.value }))}
            />
            <Input
              placeholder="Name"
              value={newSkill.name}
              onChange={e => setNewSkill(p => ({ ...p, name: e.target.value }))}
            />
            <Input
              placeholder="Proficiency"
              type="number"
              min={0}
              max={100}
              value={newSkill.proficiency}
              onChange={e => setNewSkill(p => ({ ...p, proficiency: Number(e.target.value) }))}
            />
            <Button type="button" onClick={handleCreate} disabled={createSkill.isPending}>
              {createSkill.isPending && <Loader2 className="size-4 animate-spin" />}
              추가
            </Button>
          </div>
        </CardContent>
      </Card>

      {skillGroups?.map(group => (
        <div key={group.category}>
          <h4 className="text-sm font-semibold mb-2">{group.category}</h4>
          <div className="flex flex-col gap-1">
            {group.items.map(skill => (
              <SkillRow
                key={skill.id}
                skill={skill}
                isEditing={editingId === skill.id}
                editForm={editForm}
                onStartEdit={() => {
                  setEditingId(skill.id)
                  setEditForm({
                    name: skill.name,
                    proficiency: skill.proficiency,
                    description: skill.description ?? '',
                  })
                }}
                onCancelEdit={() => setEditingId(null)}
                onEditFormChange={setEditForm}
                onDelete={() => handleDelete(skill.id, skill.name)}
                deleteIsPending={deleteSkill.isPending}
              />
            ))}
          </div>
        </div>
      ))}
    </div>
  )
}

interface SkillRowProps {
  skill: { id: number; name: string; proficiency: number; description: string | null }
  isEditing: boolean
  editForm: Partial<CreateSkillBody>
  onStartEdit: () => void
  onCancelEdit: () => void
  onEditFormChange: (form: Partial<CreateSkillBody>) => void
  onDelete: () => void
  deleteIsPending: boolean
}

function SkillRow({
  skill,
  isEditing,
  editForm,
  onStartEdit,
  onCancelEdit,
  onEditFormChange,
  onDelete,
  deleteIsPending,
}: SkillRowProps) {
  const updateSkill = useUpdateSkill(skill.id)

  const handleSave = () => {
    updateSkill.mutate(editForm, { onSuccess: () => onCancelEdit() })
  }

  if (isEditing) {
    return (
      <div className="flex items-center gap-2 p-2 rounded-md border">
        <Input
          value={editForm.name ?? ''}
          onChange={e => onEditFormChange({ ...editForm, name: e.target.value })}
          className="flex-1"
        />
        <Input
          type="number"
          min={0}
          max={100}
          value={editForm.proficiency ?? 0}
          onChange={e => onEditFormChange({ ...editForm, proficiency: Number(e.target.value) })}
          className="w-20"
        />
        <Button type="button" size="sm" onClick={handleSave} disabled={updateSkill.isPending}>
          {updateSkill.isPending ? <Loader2 className="size-3 animate-spin" /> : '저장'}
        </Button>
        <Button type="button" size="sm" variant="outline" onClick={onCancelEdit}>
          취소
        </Button>
      </div>
    )
  }

  return (
    <div className="flex items-center justify-between p-2 rounded-md hover:bg-muted/50">
      <div className="flex items-center gap-2">
        <span className="text-sm">{skill.name}</span>
        <Badge variant="outline" className="text-xs">
          {skill.proficiency}%
        </Badge>
        {skill.description && <span className="text-xs text-muted-foreground">{skill.description}</span>}
      </div>
      <div className="flex items-center gap-1">
        <Button type="button" variant="ghost" size="sm" onClick={onStartEdit}>
          수정
        </Button>
        <Button
          type="button"
          variant="ghost"
          size="sm"
          className="text-destructive hover:text-destructive"
          onClick={onDelete}
          disabled={deleteIsPending}
        >
          삭제
        </Button>
      </div>
    </div>
  )
}

function EducationSection() {
  const { data: educationList, isLoading } = useEducation()
  const createEducation = useCreateEducation()
  const deleteEducation = useDeleteEducation()

  const [showForm, setShowForm] = useState(false)
  const [editingId, setEditingId] = useState<number | null>(null)
  const [period, setPeriod] = useState('')
  const [activeLocale, setActiveLocale] = useState<LocaleCode>('ko')
  const [translations, setTranslations] = useState<EducationTranslation[]>(
    LOCALE_TABS.map(l => ({ locale: l.code, institution: '', degree: '' })),
  )

  if (isLoading) {
    return (
      <div className="flex justify-center py-8">
        <Loader2 className="size-6 animate-spin" />
      </div>
    )
  }

  const resetForm = () => {
    setPeriod('')
    setTranslations(LOCALE_TABS.map(l => ({ locale: l.code, institution: '', degree: '' })))
    setActiveLocale('ko')
    setShowForm(false)
    setEditingId(null)
  }

  const handleCreate = () => {
    if (!period.trim()) return
    const body: CreateEducationBody = {
      period,
      translations: translations.filter(t => t.institution.trim()),
    }
    createEducation.mutate(body, { onSuccess: resetForm })
  }

  const handleDelete = (id: number) => {
    if (!window.confirm('학력을 삭제하시겠습니까?')) return
    deleteEducation.mutate(id)
  }

  const startEdit = (edu: { id: number; period: string; institution: string; degree: string }) => {
    setEditingId(edu.id)
    setPeriod(edu.period)
    setTranslations(
      LOCALE_TABS.map(l => ({
        locale: l.code as LocaleCode,
        institution: l.code === 'ko' ? edu.institution : '',
        degree: l.code === 'ko' ? edu.degree : '',
      })),
    )
    setShowForm(true)
  }

  const currentTranslation = translations.find(t => t.locale === activeLocale)

  const updateTranslationField = (locale: LocaleCode, field: keyof EducationTranslation, value: string) => {
    setTranslations(prev => prev.map(t => (t.locale === locale ? { ...t, [field]: value } : t)))
  }

  return (
    <div className="flex flex-col gap-4">
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
          <CardContent className="pt-4 flex flex-col gap-4">
            <div>
              <Label>Period</Label>
              <Input placeholder="2018 - 2022" value={period} onChange={e => setPeriod(e.target.value)} />
            </div>

            <div className="flex items-center gap-1 mb-2">
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
              <div className="flex flex-col gap-2">
                <div>
                  <Label>Institution</Label>
                  <Input
                    value={currentTranslation.institution}
                    onChange={e => updateTranslationField(activeLocale, 'institution', e.target.value)}
                  />
                </div>
                <div>
                  <Label>Degree</Label>
                  <Input
                    value={currentTranslation.degree}
                    onChange={e => updateTranslationField(activeLocale, 'degree', e.target.value)}
                  />
                </div>
              </div>
            )}

            <div className="flex items-center gap-2 justify-end">
              <Button type="button" variant="outline" size="sm" onClick={resetForm}>
                취소
              </Button>
              <EducationSaveButton
                editingId={editingId}
                period={period}
                translations={translations}
                createIsPending={createEducation.isPending}
                onCreate={handleCreate}
                onSuccess={resetForm}
              />
            </div>
          </CardContent>
        </Card>
      )}

      {educationList?.map(edu => {
        return (
          <div key={edu.id} className="flex items-center justify-between p-3 rounded-md border">
            <div>
              <span className="text-sm font-medium">{edu.institution || '기관 없음'}</span>
              <div className="flex items-center gap-2 mt-1">
                <span className="text-xs text-muted-foreground">{edu.period}</span>
                <span className="text-xs text-muted-foreground">{edu.degree}</span>
              </div>
            </div>
            <div className="flex items-center gap-1">
              <Button type="button" variant="ghost" size="sm" onClick={() => startEdit(edu)}>
                수정
              </Button>
              <Button
                type="button"
                variant="ghost"
                size="sm"
                className="text-destructive hover:text-destructive"
                onClick={() => handleDelete(edu.id)}
                disabled={deleteEducation.isPending}
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

interface EducationSaveButtonProps {
  editingId: number | null
  period: string
  translations: EducationTranslation[]
  createIsPending: boolean
  onCreate: () => void
  onSuccess: () => void
}

function EducationSaveButton({
  editingId,
  period,
  translations,
  createIsPending,
  onCreate,
  onSuccess,
}: EducationSaveButtonProps) {
  const updateEducation = useUpdateEducation(editingId ?? 0)

  if (editingId) {
    const handleUpdate = () => {
      updateEducation.mutate({ period, translations: translations.filter(t => t.institution.trim()) }, { onSuccess })
    }
    return (
      <Button type="button" size="sm" onClick={handleUpdate} disabled={updateEducation.isPending}>
        {updateEducation.isPending && <Loader2 className="size-3 animate-spin" />}
        저장
      </Button>
    )
  }

  return (
    <Button type="button" size="sm" onClick={onCreate} disabled={createIsPending}>
      {createIsPending && <Loader2 className="size-3 animate-spin" />}
      추가
    </Button>
  )
}

function LocalesSection() {
  const { data: locales, isLoading } = useLocales()
  const createLocale = useCreateLocale()
  const deleteLocale = useDeleteLocale()
  const [code, setCode] = useState('')
  const [label, setLabel] = useState('')

  if (isLoading) {
    return (
      <div className="flex justify-center py-8">
        <Loader2 className="size-6 animate-spin" />
      </div>
    )
  }

  const handleCreate = () => {
    if (!code.trim() || !label.trim()) return
    createLocale.mutate(
      { code, label },
      {
        onSuccess: () => {
          setCode('')
          setLabel('')
        },
      },
    )
  }

  const handleDelete = (id: number, localeCode: string) => {
    if (!window.confirm(`"${localeCode}" 로케일을 삭제하시겠습니까?`)) return
    deleteLocale.mutate(id)
  }

  return (
    <div className="flex flex-col gap-4">
      <div className="flex items-center gap-2">
        <Input placeholder="code (ko)" value={code} onChange={e => setCode(e.target.value)} className="w-32" />
        <Input placeholder="label (한국어)" value={label} onChange={e => setLabel(e.target.value)} className="flex-1" />
        <Button type="button" onClick={handleCreate} disabled={createLocale.isPending}>
          {createLocale.isPending && <Loader2 className="size-4 animate-spin" />}
          추가
        </Button>
      </div>

      {locales?.map(locale => (
        <div key={locale.id} className="flex items-center justify-between p-2 rounded-md border">
          <div className="flex items-center gap-2">
            <Badge variant="secondary">{locale.code}</Badge>
            <span className="text-sm">{locale.label}</span>
          </div>
          <Button
            type="button"
            variant="ghost"
            size="icon"
            className="text-destructive hover:text-destructive"
            onClick={() => handleDelete(locale.id, locale.code)}
            disabled={deleteLocale.isPending}
            aria-label="삭제"
          >
            <Trash2 className="size-4" />
          </Button>
        </div>
      ))}
    </div>
  )
}
