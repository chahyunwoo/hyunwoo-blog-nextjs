import { toast } from '@hyunwoo/ui'
import { useMutation, useQuery, useQueryClient, useSuspenseQuery } from '@tanstack/react-query'
import { adminApi, uploadFile } from '@/shared/api'
import { queryKeys } from '@/shared/config'
import { getErrorMessage } from '@/shared/lib'
import type {
  CreateEducationBody,
  CreateExperienceBody,
  CreateProjectBody,
  CreateSkillBody,
  CreateWorkBody,
  Education,
  EducationDetail,
  Experience,
  ExperienceDetail,
  PortfolioLocale,
  PortfolioProfile,
  PortfolioProfileAll,
  Project,
  ProjectDetail,
  Skill,
  UpdateProfileBody,
  UpdateWorkBody,
  Work,
  WorkDetail,
} from '../model'

// Works
export function useWorks(type?: string) {
  const params = new URLSearchParams()
  if (type) params.set('type', type)
  return useQuery({
    queryKey: queryKeys.portfolio.works.list(type),
    queryFn: () => adminApi.get(`api/portfolio/works${params.toString() ? `?${params}` : ''}`).json<Work[]>(),
  })
}

export function useWork(id: number) {
  return useSuspenseQuery({
    queryKey: queryKeys.portfolio.works.detail(id),
    queryFn: () => adminApi.get(`api/portfolio/works/${id}`).json<Work>(),
  })
}

export function useWorkDetail(id: number) {
  return useSuspenseQuery({
    queryKey: queryKeys.portfolio.works.detail(id),
    queryFn: () => adminApi.get(`api/portfolio/works/${id}`).json<WorkDetail>(),
  })
}

export function useCreateWork() {
  const qc = useQueryClient()
  return useMutation({
    mutationFn: (body: CreateWorkBody) => adminApi.post('api/portfolio/works', { json: body }).json<Work>(),
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: queryKeys.portfolio.works.all })
      toast.success('Work 생성 완료')
    },
    onError: async e => {
      toast.error(await getErrorMessage(e))
    },
  })
}

export function useUpdateWork(id: number) {
  const qc = useQueryClient()
  return useMutation({
    mutationFn: (body: UpdateWorkBody) => adminApi.put(`api/portfolio/works/${id}`, { json: body }).json<Work>(),
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: queryKeys.portfolio.works.all })
      toast.success('Work 수정 완료')
    },
    onError: async e => {
      toast.error(await getErrorMessage(e))
    },
  })
}

export function useDeleteWork() {
  const qc = useQueryClient()
  return useMutation({
    mutationFn: (id: number) => adminApi.delete(`api/portfolio/works/${id}`),
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: queryKeys.portfolio.works.all })
      toast.success('Work 삭제 완료')
    },
    onError: async e => {
      toast.error(await getErrorMessage(e))
    },
  })
}

// Experiences
export function useExperiences() {
  return useQuery({
    queryKey: queryKeys.portfolio.experiences.all,
    queryFn: () => adminApi.get('api/portfolio/experiences').json<Experience[]>(),
  })
}

export function useCreateExperience() {
  const qc = useQueryClient()
  return useMutation({
    mutationFn: (body: CreateExperienceBody) =>
      adminApi.post('api/portfolio/experiences', { json: body }).json<Experience>(),
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: queryKeys.portfolio.experiences.all })
      toast.success('경력 추가 완료')
    },
    onError: async e => {
      toast.error(await getErrorMessage(e))
    },
  })
}

export function useUpdateExperience(id: number) {
  const qc = useQueryClient()
  return useMutation({
    mutationFn: (body: Partial<CreateExperienceBody>) =>
      adminApi.put(`api/portfolio/experiences/${id}`, { json: body }).json<Experience>(),
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: queryKeys.portfolio.experiences.all })
      toast.success('경력 수정 완료')
    },
    onError: async e => {
      toast.error(await getErrorMessage(e))
    },
  })
}

export function useDeleteExperience() {
  const qc = useQueryClient()
  return useMutation({
    mutationFn: (id: number) => adminApi.delete(`api/portfolio/experiences/${id}`),
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: queryKeys.portfolio.experiences.all })
      toast.success('경력 삭제 완료')
    },
    onError: async e => {
      toast.error(await getErrorMessage(e))
    },
  })
}

// Projects
export function useProjects() {
  return useQuery({
    queryKey: queryKeys.portfolio.projects.all,
    queryFn: () => adminApi.get('api/portfolio/projects').json<Project[]>(),
  })
}

export function useCreateProject() {
  const qc = useQueryClient()
  return useMutation({
    mutationFn: (body: CreateProjectBody) => adminApi.post('api/portfolio/projects', { json: body }).json<Project>(),
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: queryKeys.portfolio.projects.all })
      toast.success('프로젝트 추가 완료')
    },
    onError: async e => {
      toast.error(await getErrorMessage(e))
    },
  })
}

export function useUpdateProject(id: number) {
  const qc = useQueryClient()
  return useMutation({
    mutationFn: (body: Partial<CreateProjectBody>) =>
      adminApi.put(`api/portfolio/projects/${id}`, { json: body }).json<Project>(),
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: queryKeys.portfolio.projects.all })
      toast.success('프로젝트 수정 완료')
    },
    onError: async e => {
      toast.error(await getErrorMessage(e))
    },
  })
}

export function useDeleteProject() {
  const qc = useQueryClient()
  return useMutation({
    mutationFn: (id: number) => adminApi.delete(`api/portfolio/projects/${id}`),
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: queryKeys.portfolio.projects.all })
      toast.success('프로젝트 삭제 완료')
    },
    onError: async e => {
      toast.error(await getErrorMessage(e))
    },
  })
}

// Skills
export function useSkills() {
  return useQuery({
    queryKey: queryKeys.portfolio.skills.all,
    queryFn: () => adminApi.get('api/portfolio/skills').json<{ category: string; items: Skill[] }[]>(),
  })
}

export function useCreateSkill() {
  const qc = useQueryClient()
  return useMutation({
    mutationFn: (body: CreateSkillBody) => adminApi.post('api/portfolio/skills', { json: body }).json<Skill>(),
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: queryKeys.portfolio.skills.all })
      toast.success('스킬 추가 완료')
    },
    onError: async e => {
      toast.error(await getErrorMessage(e))
    },
  })
}

export function useUpdateSkill(id: number) {
  const qc = useQueryClient()
  return useMutation({
    mutationFn: (body: Partial<CreateSkillBody>) =>
      adminApi.put(`api/portfolio/skills/${id}`, { json: body }).json<Skill>(),
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: queryKeys.portfolio.skills.all })
      toast.success('스킬 수정 완료')
    },
    onError: async e => {
      toast.error(await getErrorMessage(e))
    },
  })
}

export function useDeleteSkill() {
  const qc = useQueryClient()
  return useMutation({
    mutationFn: (id: number) => adminApi.delete(`api/portfolio/skills/${id}`),
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: queryKeys.portfolio.skills.all })
      toast.success('스킬 삭제 완료')
    },
    onError: async e => {
      toast.error(await getErrorMessage(e))
    },
  })
}

// Education
export function useEducation() {
  return useQuery({
    queryKey: queryKeys.portfolio.education.all,
    queryFn: () => adminApi.get('api/portfolio/education').json<Education[]>(),
  })
}

export function useCreateEducation() {
  const qc = useQueryClient()
  return useMutation({
    mutationFn: (body: CreateEducationBody) =>
      adminApi.post('api/portfolio/education', { json: body }).json<Education>(),
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: queryKeys.portfolio.education.all })
      toast.success('학력 추가 완료')
    },
    onError: async e => {
      toast.error(await getErrorMessage(e))
    },
  })
}

export function useUpdateEducation(id: number) {
  const qc = useQueryClient()
  return useMutation({
    mutationFn: (body: Partial<CreateEducationBody>) =>
      adminApi.put(`api/portfolio/education/${id}`, { json: body }).json<Education>(),
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: queryKeys.portfolio.education.all })
      toast.success('학력 수정 완료')
    },
    onError: async e => {
      toast.error(await getErrorMessage(e))
    },
  })
}

export function useDeleteEducation() {
  const qc = useQueryClient()
  return useMutation({
    mutationFn: (id: number) => adminApi.delete(`api/portfolio/education/${id}`),
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: queryKeys.portfolio.education.all })
      toast.success('학력 삭제 완료')
    },
    onError: async e => {
      toast.error(await getErrorMessage(e))
    },
  })
}

// Detail hooks (GET /:id with translations)
export function useExperienceDetail(id: number) {
  return useQuery({
    queryKey: [...queryKeys.portfolio.experiences.all, 'detail', id],
    queryFn: () => adminApi.get(`api/portfolio/experiences/${id}`).json<ExperienceDetail>(),
  })
}

export function useProjectDetail(id: number) {
  return useQuery({
    queryKey: [...queryKeys.portfolio.projects.all, 'detail', id],
    queryFn: () => adminApi.get(`api/portfolio/projects/${id}`).json<ProjectDetail>(),
  })
}

export function useEducationDetail(id: number) {
  return useQuery({
    queryKey: [...queryKeys.portfolio.education.all, 'detail', id],
    queryFn: () => adminApi.get(`api/portfolio/education/${id}`).json<EducationDetail>(),
  })
}

// Profile
export function useProfile() {
  return useQuery({
    queryKey: queryKeys.portfolio.profile(),
    queryFn: () => adminApi.get('api/portfolio/profile').json<PortfolioProfile>(),
  })
}

export function useProfileAll() {
  return useQuery({
    queryKey: [...queryKeys.portfolio.profile(), 'all'],
    queryFn: () => adminApi.get('api/portfolio/profile/all').json<PortfolioProfileAll>(),
  })
}

export function useUploadProfileImage() {
  const qc = useQueryClient()
  return useMutation({
    mutationFn: (file: File) => {
      const formData = new FormData()
      formData.append('image', file)
      return uploadFile<{ url: string }>('api/portfolio/profile/image', formData)
    },
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: queryKeys.portfolio.profile() })
      toast.success('이미지 업로드 완료')
    },
    onError: async e => {
      toast.error(await getErrorMessage(e))
    },
  })
}

export function useUploadProfileIcon() {
  const qc = useQueryClient()
  return useMutation({
    mutationFn: (file: File) => {
      const formData = new FormData()
      formData.append('icon', file)
      return uploadFile<{ url: string }>('api/portfolio/profile/icon', formData)
    },
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: queryKeys.portfolio.profile() })
      toast.success('아이콘 업로드 완료')
    },
    onError: async e => {
      toast.error(await getErrorMessage(e))
    },
  })
}

export function useUpdateProfile() {
  const qc = useQueryClient()
  return useMutation({
    mutationFn: (body: UpdateProfileBody) =>
      adminApi.put('api/portfolio/profile', { json: body }).json<PortfolioProfile>(),
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: queryKeys.portfolio.profile() })
      toast.success('프로필 수정 완료')
    },
    onError: async e => {
      toast.error(await getErrorMessage(e))
    },
  })
}

// Locales
export function useLocales() {
  return useQuery({
    queryKey: queryKeys.portfolio.locales,
    queryFn: () => adminApi.get('api/portfolio/locales').json<PortfolioLocale[]>(),
  })
}

export function useCreateLocale() {
  const qc = useQueryClient()
  return useMutation({
    mutationFn: (body: { code: string; label: string }) =>
      adminApi.post('api/portfolio/locales', { json: body }).json<PortfolioLocale>(),
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: queryKeys.portfolio.locales })
      toast.success('로케일 추가 완료')
    },
    onError: async e => {
      toast.error(await getErrorMessage(e))
    },
  })
}

export function useDeleteLocale() {
  const qc = useQueryClient()
  return useMutation({
    mutationFn: (id: number) => adminApi.delete(`api/portfolio/locales/${id}`),
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: queryKeys.portfolio.locales })
      toast.success('로케일 삭제 완료')
    },
    onError: async e => {
      toast.error(await getErrorMessage(e))
    },
  })
}
