import type { MetadataRoute } from 'next'

const PORTFOLIO_URL = 'https://portfolio.chahyunwoo.dev'

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
