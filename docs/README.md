# Documentation

Welcome to the Next.js Directory/Blog Boilerplate documentation.

> **📖 View Online:** This documentation is also available on [GitHub Pages](https://rohanpatriot.github.io/nextjs-directory-boilerplate/docs/)

## Quick Links

- [Getting Started](getting-started.md) - Installation and first steps
- [Content System](content-system.md) - Adding and managing content
- [Configuration](configuration.md) - Site and content config reference
- [SEO](seo.md) - Sitemap, RSS, metadata, and structured data
- [Dark Mode](dark-mode.md) - Theming and customization
- [Components](components.md) - Available UI components
- [Deployment](deployment.md) - Deploying to production

## Overview

This boilerplate provides a flexible, config-driven system for building content-driven websites. Key features:

- **Unified Content System** - Manage multiple content types (articles, guides, custom types) from a single configuration
- **SEO-First Design** - Automatic sitemap, RSS feed, and JSON-LD structured data
- **Dark Mode** - System preference detection with manual toggle
- **Type-Safe** - Full TypeScript support throughout

## Architecture

```
content/              # Your MDX content files
src/
  app/               # Next.js App Router pages
  components/        # React components
  config/            # Configuration files
  lib/
    content/         # Content loading system
```

The content system reads MDX files from the `content/` directory, parses frontmatter metadata, and serves them through dynamic routes.

## Support

- [GitHub Issues](https://github.com/rohanpatriot/nextjs-directory-boilerplate/issues)
- [GitHub Discussions](https://github.com/rohanpatriot/nextjs-directory-boilerplate/discussions)

---

## GitHub Pages Setup

To enable the built-in GitHub Pages for this documentation:

1. Go to your repository **Settings** → **Pages**
2. Under "Build and deployment":
   - **Source**: Deploy from a branch
   - **Branch**: `main`
   - **Folder**: `/docs`
3. Click **Save**

GitHub will automatically serve the documentation at:
`https://[your-username].github.io/nextjs-directory-boilerplate/docs/`

## GitHub Wiki Integration

This documentation is automatically synced to the repository's GitHub Wiki via a GitHub Action.

### Setup
1. Enable the **Wiki** feature in repository **Settings** → **General** → **Features**.
2. Create the first page (Home) in the Wiki manually if it doesn't exist (just to initialize the git repo).
3. The `.github/workflows/publish-wiki.yml` action will run on the next push to `main` that changes `docs/`.

### Structure
- `docs/README.md` becomes the Wiki **Home** page.
- `docs/_Sidebar.md` controls the Wiki sidebar navigation.
- All other files are preserved with their directory structure.
