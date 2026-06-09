import { MetadataRoute } from 'next'

export default function sitemap(): MetadataRoute.Sitemap {
  return [
    { url: 'https://honeybadgerai.in', lastModified: new Date(), changeFrequency: 'weekly', priority: 1 },
    { url: 'https://honeybadgerai.in/services/real-estate', lastModified: new Date(), changeFrequency: 'monthly', priority: 0.9 },
    { url: 'https://honeybadgerai.in/services/hospitality', lastModified: new Date(), changeFrequency: 'monthly', priority: 0.9 },
    { url: 'https://honeybadgerai.in/services/ecommerce', lastModified: new Date(), changeFrequency: 'monthly', priority: 0.9 },
  ]
}
