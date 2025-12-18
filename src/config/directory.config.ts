import { DirectoryConfig } from '@/types/content';
import { SEOConfig } from '@/lib/content/types';

export const directoryConfig: DirectoryConfig = {
  name: 'Directory Boilerplate',
  description: 'A customizable directory/blog template built with Next.js and MDX',
  itemsPerPage: 9,
  features: {
    audio: true,
    images: true,
    tags: true,
    search: true,
    pagination: true,
  },
  theme: {
    fontHeading: 'Cormorant_Garamond',
    fontBody: 'Nunito',
  },
};

export const seoConfig: SEOConfig = {
  siteUrl: process.env.NEXT_PUBLIC_SITE_URL || 'https://your-domain.com',
  siteName: directoryConfig.name,
  description: directoryConfig.description,
  twitterHandle: '@yourtwitterhandle',
  socialLinks: [],
  logo: '/logo.png',
  defaultOgImage: '/og-default.png',
  defaultAuthor: 'Your Name',
  defaultKeywords: ['directory', 'blog', 'nextjs', 'mdx'],
  verification: {
    google: process.env.GOOGLE_SITE_VERIFICATION,
  },
};
