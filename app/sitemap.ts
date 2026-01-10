import { MetadataRoute } from 'next'

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = 'https://www.lagenceyl.fr'
  
  const routes = [
    '',
    '/a-propos',
    '/notre-methode',
    '/services',
    '/estimation',
    '/vente',
    '/location',
    '/catalogue',
    '/analyse',
  ]

  return routes.map((route) => ({
    url: `${baseUrl}${route}`,
    lastModified: new Date(),
    changeFrequency: 'weekly' as const,
    priority: route === '' ? 1.0 : 0.8,
  }))
}
