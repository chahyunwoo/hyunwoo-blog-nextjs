export type Locale = 'ko' | 'en' | 'jp'

export type Project = {
  title: string
  description: string
  techStack: string[]
  link?: string
}

export type Profile = {
  name: string
  job: string
  location: string
  link: {
    name: string
    href: string
    icon: React.ElementType
  }[]
  introduction: string[]
  education: {
    institution: string
    degree: string
    period: string
  }[]
  skills: {
    category: string
    items: string[]
  }[]
  experience: {
    title: string
    role: string
    period: string
    responsibilities: string[]
  }[]
  projects: Project[]
  copied: string
}
