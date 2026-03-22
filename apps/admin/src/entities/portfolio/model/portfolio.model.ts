export type WorkType = 'business' | 'personal'
export type LocaleCode = 'ko' | 'en' | 'jp'

// --- GET 응답 타입 (플랫 구조, locale에 맞게 변환되어 내려옴) ---

export interface Work {
  id: number
  type: WorkType
  sortOrder: number
  startDate: string | null
  endDate: string | null
  isCurrent: boolean
  techStack: string[]
  demoUrl: string | null
  repoUrl: string | null
  featured: boolean
  gradientColors: string[] | null
  title: string
  role: string | null
  summary: string
  content: string
  highlights: string[]
}

export interface Experience {
  id: number
  startDate: string
  endDate: string | null
  isCurrent: boolean
  title: string
  role: string
  responsibilities: string[]
}

export interface Project {
  id: number
  demoUrl: string | null
  repoUrl: string | null
  techStack: string[]
  featured: boolean
  title: string
  description: string | null
}

export interface Skill {
  id: number
  category?: string
  name: string
  sortOrder?: number
  proficiency: number
  description: string | null
}

export interface Education {
  id: number
  period: string
  institution: string
  degree: string
}

export interface PortfolioProfile {
  name: string
  location: string
  imageUrl: string
  iconUrl: string
  socialLinks: SocialLink[]
  jobTitle: string
  introduction: string[]
}

export interface SocialLink {
  name: string
  href: string
  icon: string
}

export interface PortfolioLocale {
  id: number
  code: string
  label: string
}

// --- POST/PUT 요청 Body (translations 배열 포함) ---

export interface WorkTranslation {
  locale: LocaleCode
  title: string
  role?: string
  summary: string
  content: string
  highlights?: string[]
}

export interface CreateWorkBody {
  type: WorkType
  sortOrder?: number
  startDate?: string
  endDate?: string
  isCurrent?: boolean
  techStack: string[]
  demoUrl?: string
  repoUrl?: string
  featured?: boolean
  translations: WorkTranslation[]
}

export interface UpdateWorkBody extends Partial<CreateWorkBody> {}

export interface ExperienceTranslation {
  locale: LocaleCode
  title: string
  role: string
  responsibilities: string[]
}

export interface CreateExperienceBody {
  sortOrder?: number
  startDate: string
  endDate?: string
  isCurrent?: boolean
  translations: ExperienceTranslation[]
}

export interface ProjectTranslation {
  locale: LocaleCode
  title: string
  description?: string
}

export interface CreateProjectBody {
  sortOrder?: number
  techStack: string[]
  demoUrl?: string
  repoUrl?: string
  featured?: boolean
  translations: ProjectTranslation[]
}

export interface CreateSkillBody {
  category: string
  name: string
  sortOrder?: number
  proficiency?: number
  description?: string
}

export interface EducationTranslation {
  locale: LocaleCode
  institution: string
  degree: string
}

export interface CreateEducationBody {
  period: string
  sortOrder?: number
  translations: EducationTranslation[]
}

export interface ProfileTranslation {
  locale: LocaleCode
  jobTitle: string
  introduction: string[]
}

export interface UpdateProfileBody {
  name?: string
  location?: string
  imageUrl?: string
  iconUrl?: string
  socialLinks?: SocialLink[]
  translations?: ProfileTranslation[]
}

// --- Detail 응답 타입 (GET /:id — translations 포함) ---

export interface WorkDetail {
  id: number
  type: WorkType
  sortOrder: number
  startDate: string | null
  endDate: string | null
  isCurrent: boolean
  techStack: string[]
  demoUrl: string | null
  repoUrl: string | null
  featured: boolean
  gradientColors: string[] | null
  translations: WorkTranslation[]
}

export interface ExperienceDetail {
  id: number
  sortOrder: number
  startDate: string
  endDate: string | null
  isCurrent: boolean
  translations: ExperienceTranslation[]
}

export interface ProjectDetail {
  id: number
  sortOrder: number
  techStack: string[]
  demoUrl: string | null
  repoUrl: string | null
  featured: boolean
  translations: ProjectTranslation[]
}

export interface EducationDetail {
  id: number
  period: string
  sortOrder: number
  translations: EducationTranslation[]
}

export interface PortfolioProfileAll {
  name: string
  location: string
  imageUrl: string
  iconUrl: string
  socialLinks: SocialLink[]
  translations: ProfileTranslation[]
}
