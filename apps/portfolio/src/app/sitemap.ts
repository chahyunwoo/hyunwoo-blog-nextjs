import { BASE_URL } from '@hyunwoo/shared/config'
import type { MetadataRoute } from 'next'

const PORTFOLIO_URL = `${BASE_URL}/portfolio`

export default function sitemap(): MetadataRoute.Sitemap {
  return [
    {
      url: PORTFOLIO_URL,
      lastModified: new Date().toISOString(),
      changeFrequency: 'monthly',
      priority: 1,
    },
  ]
}
