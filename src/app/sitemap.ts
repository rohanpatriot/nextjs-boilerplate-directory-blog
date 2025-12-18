import type { MetadataRoute } from 'next';
import { getContent, getAllTags, getContentTypes } from '@/lib/content';
import { seoConfig } from '@/config/directory.config';

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const baseUrl = seoConfig.siteUrl;

  // Static pages
  const staticPages: MetadataRoute.Sitemap = [
    {
      url: baseUrl,
      lastModified: new Date(),
      changeFrequency: 'daily',
      priority: 1,
    },
  ];

  // Content type listing pages
  const contentTypes = getContentTypes();
  const contentTypePages: MetadataRoute.Sitemap = contentTypes.map((type) => ({
    url: `${baseUrl}/${type}`,
    lastModified: new Date(),
    changeFrequency: 'daily' as const,
    priority: 0.9,
  }));

  // All content pages
  const { items: allContent } = await getContent({ pageSize: 1000 });
  const contentPages: MetadataRoute.Sitemap = allContent.map((item) => ({
    url: `${baseUrl}/${item.contentType}/${item.slug}`,
    lastModified: item.meta.date ? new Date(item.meta.date) : new Date(),
    changeFrequency: 'weekly' as const,
    priority: 0.8,
  }));

  // Tag pages
  const tags = await getAllTags();
  const tagPages: MetadataRoute.Sitemap = tags.map((tag) => ({
    url: `${baseUrl}/tags/${encodeURIComponent(tag)}`,
    lastModified: new Date(),
    changeFrequency: 'weekly' as const,
    priority: 0.6,
  }));

  return [...staticPages, ...contentTypePages, ...contentPages, ...tagPages];
}
