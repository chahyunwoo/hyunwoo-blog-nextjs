import { apiFetch, ENDPOINTS } from '@hyunwoo/shared/api'
import { CACHE_TAGS } from '@hyunwoo/shared/config'
import type { ProfileResponse, SkillGroup, Work } from '../model'

export interface RecentPost {
  id: number
  title: string
  slug: string
  description: string
  category: string
  publishedAt: string
  tags: { name: string }[]
}

export async function getProfile(locale = 'ko'): Promise<ProfileResponse | null> {
  return apiFetch<ProfileResponse>(`${ENDPOINTS.portfolio.profile}?locale=${locale}`, {
    tags: [CACHE_TAGS.PORTFOLIO_PROFILE],
  })
}

export async function getWorks(locale = 'ko', type?: string): Promise<Work[]> {
  const params = new URLSearchParams({ locale })
  if (type) params.set('type', type)
  const data = await apiFetch<Work[]>(`${ENDPOINTS.portfolio.works}?${params}`, {
    tags: ['portfolio-works'],
  })
  return data ?? []
}

export async function getSkills(): Promise<SkillGroup[]> {
  const data = await apiFetch<SkillGroup[]>(ENDPOINTS.portfolio.skills, {
    tags: [CACHE_TAGS.PORTFOLIO_SKILLS],
  })
  return data ?? []
}

export async function getRecentPosts(): Promise<RecentPost[]> {
  const data = await apiFetch<RecentPost[]>(ENDPOINTS.blog.recentPosts, {
    tags: ['blog-recent'],
  })
  return data ?? []
}
