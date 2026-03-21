export type Locale = 'ko' | 'en' | 'jp'

export type Project = {
  title: string
  description: string
  techStack: string[]
  demoUrl: string | null
  repoUrl: string | null
}

export type Profile = {
  name: string
  job: string
  location: string
  imageUrl: string
  link: {
    name: string
    href: string
    icon: React.ElementType
  }[]
  introduction: string[]
  education:
    | {
        institution: string
        degree: string
        period: string
      }[]
    | null
  skills:
    | {
        category: string
        items: string[]
      }[]
    | null
  experience:
    | {
        title: string
        role: string
        period: string
        responsibilities: string[]
      }[]
    | null
  projects: Project[] | null
}
