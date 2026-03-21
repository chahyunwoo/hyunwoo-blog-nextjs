export interface ApiLocale {
  id: number
  code: string
  label: string
}

export interface ApiSocialLink {
  name: string
  href: string
  icon: string
}

export interface ApiProfileResponse {
  name: string
  jobTitle: string
  location: string
  imageUrl: string
  iconUrl: string
  introduction: string[]
  socialLinks: ApiSocialLink[]
}

export interface ApiExperience {
  id: number
  title: string
  role: string
  startDate: string
  endDate: string | null
  isCurrent: boolean
  responsibilities: string[]
}

export interface ApiProject {
  id: number
  title: string
  description: string
  techStack: string[]
  demoUrl: string | null
  repoUrl: string | null
  featured: boolean
}

export interface ApiSkillGroup {
  category: string
  items: string[]
}

export interface ApiEducation {
  id: number
  institution: string
  degree: string
  period: string
}
