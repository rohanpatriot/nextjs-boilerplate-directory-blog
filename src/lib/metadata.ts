import { Metadata } from 'next';
import { directoryConfig, seoConfig } from '@/config/directory.config';
import { ContentItem } from '@/lib/content/types';

interface MetadataOptions {
  title?: string;
  description?: string;
  image?: string;
  canonical?: string;
  type?: 'website' | 'article';
  publishedTime?: string;
  modifiedTime?: string;
  author?: string;
  tags?: string[];
  noIndex?: boolean;
}

export function generateBaseMetadata(): Metadata {
  return {
    metadataBase: new URL(seoConfig.siteUrl),
    title: {
      default: directoryConfig.name,
      template: `%s | ${directoryConfig.name}`,
    },
    description: directoryConfig.description,
    keywords: seoConfig.defaultKeywords,
    authors: seoConfig.defaultAuthor
      ? [{ name: seoConfig.defaultAuthor }]
      : undefined,
    creator: seoConfig.defaultAuthor,
    publisher: directoryConfig.name,
    robots: {
      index: true,
      follow: true,
      googleBot: {
        index: true,
        follow: true,
        'max-video-preview': -1,
        'max-image-preview': 'large',
        'max-snippet': -1,
      },
    },
    openGraph: {
      type: 'website',
      locale: 'en_US',
      url: seoConfig.siteUrl,
      siteName: directoryConfig.name,
      title: directoryConfig.name,
      description: directoryConfig.description,
      images: seoConfig.defaultOgImage
        ? [
            {
              url: seoConfig.defaultOgImage,
              width: 1200,
              height: 630,
              alt: directoryConfig.name,
            },
          ]
        : [],
    },
    twitter: {
      card: 'summary_large_image',
      title: directoryConfig.name,
      description: directoryConfig.description,
      site: seoConfig.twitterHandle,
      creator: seoConfig.twitterHandle,
      images: seoConfig.defaultOgImage ? [seoConfig.defaultOgImage] : [],
    },
    verification: seoConfig.verification,
    alternates: {
      types: {
        'application/rss+xml': '/feed.xml',
      },
    },
  };
}

export function generatePageMetadata(options: MetadataOptions): Metadata {
  const {
    title,
    description,
    image,
    canonical,
    type = 'website',
    publishedTime,
    modifiedTime,
    author,
    tags,
    noIndex = false,
  } = options;

  const resolvedImage = image
    ? image.startsWith('http')
      ? image
      : `${seoConfig.siteUrl}${image}`
    : seoConfig.defaultOgImage
      ? `${seoConfig.siteUrl}${seoConfig.defaultOgImage}`
      : undefined;

  const metadata: Metadata = {
    title: title || directoryConfig.name,
    description: description || directoryConfig.description,
    keywords: tags || seoConfig.defaultKeywords,
    authors: author ? [{ name: author }] : undefined,
    alternates: canonical
      ? {
          canonical: canonical,
        }
      : undefined,
    robots: noIndex
      ? { index: false, follow: false }
      : {
          index: true,
          follow: true,
        },
    openGraph: {
      type: type === 'article' ? 'article' : 'website',
      title: title || directoryConfig.name,
      description: description || directoryConfig.description,
      url: canonical || seoConfig.siteUrl,
      siteName: directoryConfig.name,
      images: resolvedImage
        ? [
            {
              url: resolvedImage,
              width: 1200,
              height: 630,
              alt: title || directoryConfig.name,
            },
          ]
        : [],
      ...(type === 'article' && {
        publishedTime,
        modifiedTime: modifiedTime || publishedTime,
        authors: author ? [author] : undefined,
        tags,
      }),
    },
    twitter: {
      card: 'summary_large_image',
      title: title || directoryConfig.name,
      description: description || directoryConfig.description,
      site: seoConfig.twitterHandle,
      creator: seoConfig.twitterHandle,
      images: resolvedImage ? [resolvedImage] : [],
    },
  };

  return metadata;
}

export function generateContentMetadata(item: ContentItem): Metadata {
  return generatePageMetadata({
    title: item.meta.title,
    description: item.meta.summary,
    image: item.meta.image,
    canonical: `${seoConfig.siteUrl}/${item.contentType}/${item.slug}`,
    type: 'article',
    publishedTime: item.meta.date,
    author: item.meta.author,
    tags: item.meta.tags,
  });
}

export function generateTagMetadata(tag: string, itemCount: number): Metadata {
  return generatePageMetadata({
    title: `Content tagged with "${tag}"`,
    description: `Browse ${itemCount} items tagged with ${tag}`,
    canonical: `${seoConfig.siteUrl}/tags/${encodeURIComponent(tag)}`,
    type: 'website',
  });
}
