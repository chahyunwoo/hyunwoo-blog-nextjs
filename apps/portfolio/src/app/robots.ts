import { BASE_URL } from '@hyunwoo/shared/config'
import type { MetadataRoute } from 'next'

const PORTFOLIO_URL = `${BASE_URL}/portfolio`

export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: '*',
      allow: '/',
      disallow: ['/_next/', '/api/'],
    },
    sitemap: `${PORTFOLIO_URL}/sitemap.xml`,
    host: PORTFOLIO_URL,
  }
}
