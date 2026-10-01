import type { MetadataRoute } from 'next'

import { blogPosts } from '@/assets/data/blog-posts'

export const dynamic = 'force-static'

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const base = process.env.NEXT_PUBLIC_APP_URL ?? 'http://localhost:3000'
  const staticRoutes = ['', '/contact']
  const blogRoutes = blogPosts.map(p => `/blog-detail/${p.slug}`)

  return [...staticRoutes, ...blogRoutes].map(route => ({
    url: `${base}${route}`
  }))
}
