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
  guides/       # How-to guides and tutorials
  [custom]/     # Add new content types via config
```

**Content Configuration** (`src/config/content.config.ts`):
- Define content types with custom features (images, tags, search, pagination)
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
- `/[contentType]` - Content type listing (e.g., `/articles`, `/guides`)
- `/[contentType]/[slug]` - Content detail page
- `/tags/[tag]` - Tag-filtered content
- `/feed.xml` - RSS feed
- `/sitemap.xml` - XML sitemap

### Key Files

- `src/lib/content/` - Unified content system
  - `loader.ts` - Content loading and querying
  - `types.ts` - TypeScript type definitions
  - `index.ts` - Public API exports
- `src/lib/metadata.ts` - SEO metadata generation
- `src/lib/structured-data.tsx` - JSON-LD schema helpers
- `src/types/content.ts` - Additional TypeScript interfaces

### Component Patterns

- UI primitives in `src/components/ui/` are shadcn/ui components (button, card, input, badge, slider, dialog, dropdown-menu, command, etc.)
- Layout components in `src/components/layout/`:
  - `ContentCard` - Content item cards with variants (default, featured, compact)
  - `ContentGrid` - Grid layout for content cards
- Search functionality in `src/components/Search/` with useSearch hook
- Navigation components:
  - `Header` - Main navigation with mobile menu, search shortcut, theme toggle
  - `Footer` - Site footer
  - `MobileMenu` - Responsive mobile navigation
  - `Breadcrumbs` - Breadcrumb navigation
- Theme components:
  - `ThemeProvider` - next-themes provider wrapper
  - `ThemeToggle` - Theme switcher button
- Media components:
  - `AudioPlayer` - Optional audio playback with controls
- Utility components:
  - `Pagination` - Page navigation
  - `TagFilter` - Tag filtering
  - `ErrorBoundary` - React error boundary

### Dark Mode

Uses `next-themes` with system preference detection. Theme toggle in navbar. CSS variables defined in `globals.css` with `.dark` class variant.

### Adding a New Content Type

1. Create directory in `content/[type-name]/`
2. Add type config to `contentConfig.types` in `src/config/content.config.ts`
3. Add MDX files with frontmatter to the new directory
4. Routes are automatically generated
