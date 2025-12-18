import { seoConfig } from '@/config/directory.config';
import { ContentItem } from '@/lib/content/types';

/**
 * Organization schema for the site
 */
export function generateOrganizationSchema() {
  return {
    '@context': 'https://schema.org',
    '@type': 'Organization',
    name: seoConfig.siteName,
    description: seoConfig.description,
    url: seoConfig.siteUrl,
    logo: seoConfig.logo ? `${seoConfig.siteUrl}${seoConfig.logo}` : undefined,
    sameAs: seoConfig.socialLinks || [],
  };
}

/**
 * WebSite schema for sitelinks search box
 */
export function generateWebSiteSchema() {
  return {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    name: seoConfig.siteName,
    url: seoConfig.siteUrl,
    potentialAction: {
      '@type': 'SearchAction',
      target: {
        '@type': 'EntryPoint',
        urlTemplate: `${seoConfig.siteUrl}?q={search_term_string}`,
      },
      'query-input': 'required name=search_term_string',
    },
  };
}

/**
 * Article/BlogPosting schema for content pages
 */
export function generateArticleSchema(
  item: ContentItem,
  type: 'Article' | 'BlogPosting' = 'Article'
) {
  const url = `${seoConfig.siteUrl}/${item.contentType}/${item.slug}`;

  return {
    '@context': 'https://schema.org',
    '@type': type,
    headline: item.meta.title,
    description: item.meta.summary,
    image: item.meta.image
      ? `${seoConfig.siteUrl}${item.meta.image}`
      : undefined,
    datePublished: item.meta.date,
    dateModified: item.meta.date,
    author: item.meta.author
      ? {
          '@type': 'Person',
          name: item.meta.author,
        }
      : {
          '@type': 'Organization',
          name: seoConfig.siteName,
        },
    publisher: {
      '@type': 'Organization',
      name: seoConfig.siteName,
      logo: seoConfig.logo
        ? {
            '@type': 'ImageObject',
            url: `${seoConfig.siteUrl}${seoConfig.logo}`,
          }
        : undefined,
    },
    mainEntityOfPage: {
      '@type': 'WebPage',
      '@id': url,
    },
    keywords: item.meta.tags?.join(', '),
    url,
  };
}

/**
 * BreadcrumbList schema
 */
export function generateBreadcrumbSchema(
  items: Array<{ name: string; url: string }>
) {
  return {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: items.map((item, index) => ({
      '@type': 'ListItem',
      position: index + 1,
      name: item.name,
      item: item.url,
    })),
  };
}

/**
 * CollectionPage schema for listing/tag pages
 */
export function generateCollectionPageSchema(
  name: string,
  description: string,
  url: string,
  itemCount: number
) {
  return {
    '@context': 'https://schema.org',
    '@type': 'CollectionPage',
    name,
    description,
    url,
    numberOfItems: itemCount,
  };
}

/**
 * Component to render JSON-LD in pages
 */
export function JsonLd({ data }: { data: object | object[] }) {
  const jsonLd = Array.isArray(data) ? data : [data];

  return (
    <>
      {jsonLd.map((item, index) => (
        <script
          key={index}
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(item).replace(/</g, '\\u003c'),
          }}
        />
      ))}
    </>
  );
}
