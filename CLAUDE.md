# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Commands

```bash
pnpm dev         # Start development server at localhost:3000
pnpm build       # Build for production
pnpm lint        # Run ESLint
pnpm start       # Start production server
```

## Architecture

This is a Next.js 15 directory/blog boilerplate using the App Router, MDX for content, shadcn/ui components, and Tailwind CSS with dark mode support.

### Content System

A unified, config-driven content system supports multiple content types from a single codebase:

**Directory Structure:**
```
content/
  articles/     # Blog articles
  stories/      # Story content with virtue cards
  [custom]/     # Add new content types via config
```

**Content Configuration** (`src/config/content.config.ts`):
- Define content types with custom features (images, tags, audio, virtue cards)
- Configure listing and detail page behavior per type
- Set pagination defaults and sort options

**Content Loader** (`src/lib/content/loader.ts`):
- `getContent()` - Paginated content with filtering by type/tag
- `getContentBySlug()` - Single item lookup
- `getContentByTag()` - Tag-based filtering
- `getAllTags()` - Aggregate tags across all content
- `getAllContentSlugs()` - For static generation

### Configuration Files

- `src/config/directory.config.ts` - Site-wide settings (name, description, SEO config)
- `src/config/content.config.ts` - Content type definitions and features

### SEO Infrastructure

- `src/app/sitemap.ts` - Dynamic XML sitemap
- `src/app/robots.ts` - Robots.txt configuration
- `src/app/feed.xml/route.ts` - RSS feed generation
- `src/lib/structured-data.tsx` - JSON-LD schema helpers (Organization, Article, Breadcrumb)
- `src/lib/metadata.ts` - SEO metadata generation with Open Graph support

### Routes

- `/` - Home page with all content
- `/[contentType]` - Content type listing (e.g., `/articles`, `/stories`)
- `/[contentType]/[slug]` - Content detail page
- `/tags/[tag]` - Tag-filtered content
- `/feed.xml` - RSS feed
- `/sitemap.xml` - XML sitemap

### Key Files

- `src/lib/content/` - Unified content system (types.ts, loader.ts, index.ts)
- `src/lib/metadata.ts` - SEO metadata generation
- `src/types/content.ts` - TypeScript interfaces

### Component Patterns

- UI primitives in `src/components/ui/` are shadcn/ui components (button, card, input, badge, slider)
- Search functionality in `src/components/Search/` with useSearch hook
- Layout components (ContentCard, ContentGrid) handle content display
- ThemeProvider and ThemeToggle for dark mode support
- AudioPlayer component for optional audio playback

### Dark Mode

Uses `next-themes` with system preference detection. Theme toggle in navbar. CSS variables defined in `globals.css` with `.dark` class variant.

### Adding a New Content Type

1. Create directory in `content/[type-name]/`
2. Add type config to `contentConfig.types` in `src/config/content.config.ts`
3. Add MDX files with frontmatter to the new directory
4. Routes are automatically generated
