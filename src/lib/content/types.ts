/**
 * Base metadata that ALL content types share
 */
export interface BaseContentMeta {
  title: string;
  slug: string;
  contentType: string;
  summary?: string;
  image?: string;
  date?: string;
  author?: string;
  tags?: string[];
  audioUrl?: string;
  virtue?: string;
  topic?: string;
  [key: string]: unknown;
}

/**
 * A content item with parsed MDX
 */
export interface ContentItem<T extends BaseContentMeta = BaseContentMeta> {
  slug: string;
  contentType: string;
  content: string;
  meta: T;
}

/**
 * Paginated response from content loader
 */
export interface PaginatedContent<T extends BaseContentMeta = BaseContentMeta> {
  items: ContentItem<T>[];
  pagination: {
    page: number;
    pageSize: number;
    totalItems: number;
    totalPages: number;
    hasNextPage: boolean;
    hasPrevPage: boolean;
  };
  filters: {
    query?: string;
    tags?: string[];
    sortBy?: string;
    sortOrder?: 'asc' | 'desc';
  };
}

/**
 * Query options for content fetching
 */
export interface ContentQuery {
  contentType?: string;
  page?: number;
  pageSize?: number;
  query?: string;
  tags?: string[];
  sortBy?: keyof BaseContentMeta;
  sortOrder?: 'asc' | 'desc';
}

/**
 * Content type configuration
 */
export interface ContentTypeConfig {
  slug: string;
  name: string;
  namePlural: string;
  directory: string;
  pageSize?: number;
  requiredFields?: string[];
  features?: {
    audio?: boolean;
    images?: boolean;
    tags?: boolean;
    search?: boolean;
    pagination?: boolean;
    virtueCard?: boolean;
  };
  defaultSort?: {
    field: string;
    order: 'asc' | 'desc';
  };
  card?: {
    showImage?: boolean;
    showSummary?: boolean;
    showTags?: boolean;
    showDate?: boolean;
    showAuthor?: boolean;
  };
  detail?: {
    showImage?: boolean;
    showAudio?: boolean;
    showTags?: boolean;
    showAuthor?: boolean;
    showDate?: boolean;
    showVirtue?: boolean;
  };
}

/**
 * Main content configuration
 */
export interface ContentConfig {
  contentRoot: string;
  defaults: {
    pageSize: number;
    sortField: string;
    sortOrder: 'asc' | 'desc';
  };
  types: Record<string, ContentTypeConfig>;
  features: {
    search: boolean;
    tags: boolean;
    pagination: boolean;
  };
}

/**
 * SEO configuration
 */
export interface SEOConfig {
  siteUrl: string;
  siteName: string;
  description: string;
  twitterHandle?: string;
  socialLinks?: string[];
  logo?: string;
  defaultOgImage?: string;
  defaultAuthor?: string;
  defaultKeywords?: string[];
  verification?: {
    google?: string;
    yandex?: string;
    yahoo?: string;
  };
}
