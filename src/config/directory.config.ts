import { DirectoryConfig } from '@/types/content';
import { SEOConfig } from '@/lib/content/types';

export const directoryConfig: DirectoryConfig = {
  name: 'DevInsights',
  description: 'Practical articles and guides for modern web developers',
  itemsPerPage: 9,
  features: {
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
  siteUrl: process.env.NEXT_PUBLIC_SITE_URL || 'https://devinsights.example.com',
  siteName: directoryConfig.name,
  description: directoryConfig.description,
  twitterHandle: '@devinsights',
  socialLinks: [
    'https://github.com/devinsights',
    'https://twitter.com/devinsights',
  ],
  logo: '/logo.svg',
  defaultOgImage: '/og-default.png',
  defaultAuthor: 'DevInsights Team',
  defaultKeywords: ['web development', 'tutorials', 'guides', 'nextjs', 'react', 'javascript'],
  verification: {
    google: process.env.GOOGLE_SITE_VERIFICATION,
  },
};
