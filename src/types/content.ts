// Re-export types from new content system for backwards compatibility
export type {
  BaseContentMeta as ContentMeta,
  ContentItem,
  SEOConfig,
} from '@/lib/content/types';

export interface DirectoryConfig {
  name: string;
  description: string;
  itemsPerPage?: number;
  features: {
    audio?: boolean;
    images?: boolean;
    tags?: boolean;
    search?: boolean;
    pagination?: boolean;
  };
  theme: {
    fontHeading: string;
    fontBody: string;
  };
}
