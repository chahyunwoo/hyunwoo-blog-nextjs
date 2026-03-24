import type { MetadataRoute } from 'next'

const PORTFOLIO_URL = 'https://portfolio.chahyunwoo.dev'

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
