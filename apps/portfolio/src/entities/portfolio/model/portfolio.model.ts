export type WorkType = 'business' | 'personal'

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

export interface SkillItem {
  name: string
  proficiency: number
  description: string | null
}

export interface SkillGroup {
  category: string
  items: SkillItem[]
}

export interface Education {
  id: number
  institution: string
  degree: string
  period: string
}

export interface SocialLink {
  name: string
  href: string
  icon: string
}

export interface ProfileResponse {
  name: string
  jobTitle: string
  location: string
  imageUrl: string
  iconUrl: string
  introduction: string[]
  socialLinks: SocialLink[]
}
