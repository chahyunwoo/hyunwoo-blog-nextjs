import { Github } from 'lucide-react'
import type {
  ApiEducation,
  ApiExperience,
  ApiLocale,
  ApiProfileResponse,
  ApiProject,
  ApiSkillGroup,
} from '@/entities/about/model'
import { apiFetch } from '@/shared/api/api.client'
import { ENDPOINTS } from '@/shared/api/endpoints'
import { CACHE_TAGS, SOCIAL_ICON_MAP } from '@/shared/config/constants'
import type { Locale, Profile } from '@/shared/types'

export async function getProfile(locale: Locale): Promise<Profile | null> {
  const [profile, experiences, projects, skills, education] = await Promise.all([
    apiFetch<ApiProfileResponse>(`${ENDPOINTS.portfolio.profile}?locale=${locale}`, {
      tags: [CACHE_TAGS.PORTFOLIO_PROFILE],
    }),
    apiFetch<ApiExperience[]>(`${ENDPOINTS.portfolio.experiences}?locale=${locale}`, {
      tags: [CACHE_TAGS.PORTFOLIO_EXPERIENCES],
    }),
    apiFetch<ApiProject[]>(`${ENDPOINTS.portfolio.projects}?locale=${locale}`, {
      tags: [CACHE_TAGS.PORTFOLIO_PROJECTS],
    }),
    apiFetch<ApiSkillGroup[]>(ENDPOINTS.portfolio.skills, {
      tags: [CACHE_TAGS.PORTFOLIO_SKILLS],
    }),
    apiFetch<ApiEducation[]>(`${ENDPOINTS.portfolio.education}?locale=${locale}`, {
      tags: [CACHE_TAGS.PORTFOLIO_EDUCATION],
    }),
  ])

  if (!profile) return null

  return {
    name: profile.name,
    job: profile.jobTitle,
    location: profile.location,
    imageUrl: profile.imageUrl,
    link: profile.socialLinks.map(sl => ({
      name: sl.name,
      href: sl.href,
      icon: SOCIAL_ICON_MAP[sl.icon] ?? Github,
    })),
    introduction: profile.introduction,
    education: education,
    skills: skills,
    experience: experiences
      ? experiences.map(exp => ({
          title: exp.title,
          role: exp.role,
          period: exp.isCurrent ? `${exp.startDate} - Present` : `${exp.startDate} - ${exp.endDate}`,
          responsibilities: exp.responsibilities,
        }))
      : null,
    projects: projects
      ? projects.map(p => ({
          title: p.title,
          description: p.description,
          techStack: p.techStack,
          demoUrl: p.demoUrl,
          repoUrl: p.repoUrl,
        }))
      : null,
  }
}

export async function getLocales(): Promise<ApiLocale[]> {
  const data = await apiFetch<ApiLocale[]>(ENDPOINTS.portfolio.locales, {
    tags: [CACHE_TAGS.PORTFOLIO_LOCALES],
  })
  return data ?? []
}
