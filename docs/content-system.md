# Content System

The unified content system manages all your content through a single, config-driven architecture.

## Directory Structure

```
content/
  articles/          # Blog articles
    example-1.mdx
    example-2.mdx
    web-performance-essentials.mdx
  guides/            # How-to guides and tutorials
    getting-started-with-nextjs.mdx
    building-a-design-system.mdx
    content-strategy-for-developers.mdx
  [custom-type]/     # Add your own types
```

## Creating Content

Create `.mdx` files in the appropriate content directory:

```mdx
---
title: 'My Article Title'
summary: 'A brief description of the article'
date: '2024-01-15'
author: 'Your Name'
tags: ['technology', 'tutorial']
image: '/images/my-article.jpg'
---

Your markdown content goes here...

You can use **bold**, *italic*, and other Markdown formatting.

## Headings Work Too

And code blocks:

```javascript
const hello = 'world';
```
```

## Frontmatter Reference

### Required Fields

| Field | Type | Description |
|-------|------|-------------|
| `title` | string | Content title (required for all types) |

### Optional Fields

| Field | Type | Description |
|-------|------|-------------|
| `summary` | string | Brief description for cards and SEO |
| `date` | string | Publication date (YYYY-MM-DD format) |
| `author` | string | Content author name |
| `tags` | string[] | Array of tags for categorization |
| `image` | string | Featured image path (relative to /public) |
| `topic` | string | Content topic or category |
| `audioUrl` | string | URL to audio file (for audio-enabled types) |

### Type-Specific Fields

Different content types may require additional fields. Check `src/config/content.config.ts` for `requiredFields` per type.

## Adding a New Content Type

### 1. Create the Directory

```bash
mkdir content/tutorials
```

### 2. Add Type Configuration

Edit `src/config/content.config.ts`:

```typescript
export const contentConfig: ContentConfig = {
  // ...existing config
  types: {
    // ...existing types

    tutorials: {
      slug: 'tutorials',
      name: 'Tutorial',
      namePlural: 'Tutorials',
      directory: 'tutorials',
      requiredFields: ['title', 'difficulty'],
      features: {
        images: true,
        tags: true,
        search: true,
        pagination: true,
      },
      defaultSort: {
        field: 'date',
        order: 'desc',
      },
      card: {
        showImage: true,
        showSummary: true,
        showTags: true,
        showDate: true,
      },
      detail: {
        showImage: true,
        showTags: true,
        showDate: true,
        showAuthor: true,
      },
    },
  },
};
```

### 3. Add Content

Create MDX files in your new directory:

```mdx
---
title: 'Getting Started with React'
difficulty: 'beginner'
summary: 'Learn the basics of React'
date: '2024-01-20'
tags: ['react', 'javascript']
---

Content here...
```

### 4. Routes Are Automatic

Your content is immediately available at:
- `/tutorials` - Listing page
- `/tutorials/getting-started-with-react` - Detail page

## Content Type Configuration Options

### Features

```typescript
features: {
  images: boolean;     // Enable featured images
  tags: boolean;       // Enable tag filtering
  search: boolean;     // Enable search
  pagination: boolean; // Enable pagination
  audio: boolean;      // Enable audio player (optional)
}
```

### Card Display Options

Controls what appears on content cards in listings:

```typescript
card: {
  showImage: boolean;
  showSummary: boolean;
  showTags: boolean;
  showDate: boolean;
  showAuthor: boolean;
}
```

### Detail Page Options

Controls what appears on the content detail page:

```typescript
detail: {
  showImage: boolean;
  showTags: boolean;
  showAuthor: boolean;
  showDate: boolean;
  showAudio: boolean;  // For audio-enabled content types
}
```

## Content Loader API

The content loader provides these functions (in `src/lib/content/loader.ts`):

```typescript
// Get paginated content
const result = await getContent({
  contentType: 'articles',
  page: 1,
  pageSize: 10,
  tags: ['technology'],
  sortBy: 'date',
  sortOrder: 'desc',
});

// Get single item
const item = await getContentBySlug('articles', 'my-post-slug');

// Get all tags (across all content types)
const tags = await getAllTags();

// Get content by tag
const tagged = await getContentByTag('technology');

// Get all slugs (for static generation)
const slugs = await getAllContentSlugs();
// Returns: [{ contentType: 'articles', slug: 'my-post' }, ...]
```

## Images

Place images in the `public/images/` directory and reference them in frontmatter:

```yaml
image: '/images/my-image.jpg'
```

Next.js automatically optimizes images when using the `Image` component.
