import { MetadataRoute } from 'next'

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [{ userAgent: '*', allow: '/' }],
    sitemap: 'https://honeybadgerai.in/sitemap.xml',
    host: 'https://honeybadgerai.in',
  }
}
