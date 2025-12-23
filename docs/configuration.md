# Configuration

The boilerplate uses two main configuration files.

## Site Configuration

**File:** `src/config/directory.config.ts`

### DirectoryConfig

```typescript
export const directoryConfig: DirectoryConfig = {
  // Site name displayed in header and metadata
  name: 'Directory Boilerplate',

  // Site description for SEO
  description: 'A customizable directory/blog template',

  // Default items per page
  itemsPerPage: 9,

  // Global feature toggles
  features: {
    audio: true,      // Enable audio player support
    images: true,     // Enable image support
    tags: true,       // Enable tag filtering
    search: true,     // Enable search functionality
    pagination: true, // Enable pagination
  },

  // Typography settings
  theme: {
    fontHeading: 'Cormorant_Garamond',
    fontBody: 'Nunito',
  },
};
```

### SEOConfig

```typescript
export const seoConfig: SEOConfig = {
  // Your production URL (required for sitemap, RSS, etc.)
  siteUrl: process.env.NEXT_PUBLIC_SITE_URL || 'https://your-domain.com',

  // Site name for metadata
  siteName: 'Your Site Name',

  // Default description
  description: 'Your site description',

  // Twitter/X handle (optional)
  twitterHandle: '@yourtwitterhandle',

  // Social media links (optional)
  socialLinks: [
    'https://twitter.com/yourtwitterhandle',
    'https://github.com/yourusername',
  ],

  // Site logo path
  logo: '/logo.png',

  // Default Open Graph image
  defaultOgImage: '/og-default.png',

  // Default author name
  defaultAuthor: 'Your Name',

  // Default keywords for SEO
  defaultKeywords: ['directory', 'blog', 'nextjs'],

  // Search engine verification codes
  verification: {
    google: process.env.GOOGLE_SITE_VERIFICATION,
    yandex: undefined,
    yahoo: undefined,
  },
};
```

## Content Configuration

**File:** `src/config/content.config.ts`

### ContentConfig

```typescript
export const contentConfig: ContentConfig = {
  // Root directory for content (relative to project root)
  contentRoot: 'content',

  // Default settings for all content types
  defaults: {
    pageSize: 9,
    sortField: 'date',
    sortOrder: 'desc',
  },

  // Global features
  features: {
    search: true,
    tags: true,
    pagination: true,
  },

  // Content type definitions
  types: {
    articles: { /* ... */ },
    projects: { /* ... */ },
  },
};
```

### ContentTypeConfig

Each content type has these options:

```typescript
{
  // URL slug (e.g., /articles)
  slug: 'articles',

  // Singular name for display
  name: 'Article',

  // Plural name for display
  namePlural: 'Articles',

  // Directory name in content/
  directory: 'articles',

  // Items per page (overrides default)
  pageSize: 12,

  // Required frontmatter fields
  requiredFields: ['title'],

  // Feature toggles for this type
  features: {
    images: true,        // Enable featured images
    tags: true,          // Enable tag filtering
    search: true,        // Enable search
    pagination: true,    // Enable pagination
  },

  // Default sort settings
  defaultSort: {
    field: 'date',
    order: 'desc',
  },

  // Card display options (listing pages)
  card: {
    showImage: true,
    showSummary: true,
    showTags: true,
    showDate: true,
    showAuthor: false,
  },

  // Detail page display options
  detail: {
    showImage: true,     // Show featured image
    showTags: true,      // Show tags
    showAuthor: true,    // Show author
    showDate: true,      // Show publish date
  },
}
```

## Environment Variables

Create a `.env.local` file:

```bash
# Site URL (required for production)
NEXT_PUBLIC_SITE_URL=https://your-domain.com

# Google Search Console verification (optional)
GOOGLE_SITE_VERIFICATION=your-verification-code
```

## TypeScript Types

The configuration types are defined in `src/lib/content/types.ts`:

- `DirectoryConfig` - Site-wide settings
- `SEOConfig` - SEO and metadata settings
- `ContentConfig` - Content system settings
- `ContentTypeConfig` - Individual content type settings
- `BaseContentMeta` - Frontmatter fields
- `ContentItem` - Parsed content item
- `PaginatedContent` - Paginated response
- `ContentQuery` - Query parameters
