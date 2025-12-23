---
layout: default
title: Home
---

# Next.js Directory/Blog Boilerplate Documentation

Welcome to the comprehensive documentation for the Next.js Directory/Blog Boilerplate - a modern, customizable template for building content-driven websites.

[![Next.js](https://img.shields.io/badge/Next.js-15-black?style=flat-square&logo=next.js)](https://nextjs.org/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.0+-3178C6?style=flat-square&logo=typescript)](https://www.typescriptlang.org/)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow?style=flat-square)](../LICENSE)

## Quick Navigation

### Getting Started
- [Installation & Setup](getting-started) - Get up and running in minutes
- [Project Structure](getting-started#project-structure) - Understanding the codebase
- [First Customization](getting-started#first-customization) - Make it yours

### Core Features
- [Content System](content-system) - MDX-powered content management
- [Configuration](configuration) - Customize site and content settings
- [Components](components) - UI components and patterns
- [SEO](seo) - Built-in SEO optimization

### Advanced Topics
- [Dark Mode](dark-mode) - Theming and customization
- [Deployment](deployment) - Deploy to production
- [Solutions](solutions/) - Common issues and solutions

## What's Inside

This boilerplate provides everything you need to build a modern content-driven website:

### 🎯 Core Features

- **Unified Content System** - Manage multiple content types (articles, stories, custom types) from a single configuration
- **SEO-First Design** - Automatic sitemap, RSS feed, and JSON-LD structured data
- **Dark Mode** - System preference detection with manual toggle
- **Type-Safe** - Full TypeScript support throughout
- **Modern Stack** - Next.js 15, React 19, Tailwind CSS, shadcn/ui

### 📦 What You Get

```
✅ MDX Content Support           ✅ Responsive Design
✅ Dynamic Routing               ✅ Tag Filtering
✅ Search Functionality          ✅ Pagination
✅ Audio Player Support          ✅ Image Optimization
✅ RSS Feed                      ✅ XML Sitemap
✅ Structured Data (JSON-LD)     ✅ Open Graph Tags
✅ Twitter Cards                 ✅ Theme Toggle
```

## Architecture Overview

```
📁 content/              # Your MDX content files
   ├── articles/         # Blog articles
   ├── stories/          # Stories with audio
   └── [custom]/         # Add your own types

📁 src/
   ├── app/             # Next.js App Router pages
   │   ├── [contentType]/  # Dynamic content routes
   │   ├── tags/        # Tag filtering
   │   └── feed.xml/    # RSS feed
   ├── components/      # React components
   │   ├── layout/      # Layout components
   │   ├── Search/      # Search functionality
   │   └── ui/          # shadcn/ui components
   ├── config/          # Configuration files
   └── lib/             # Utilities and helpers
       └── content/     # Content loading system
```

## Quick Start

```bash
# Clone the repository
git clone https://github.com/rohanpatriot/nextjs-directory-boilerplate
cd nextjs-directory-boilerplate

# Install dependencies
pnpm install

# Start development server
pnpm dev
```

Visit [http://localhost:3000](http://localhost:3000) to see your site.

## Key Concepts

### Content Types

Define custom content types with their own features, layouts, and behaviors. Each type can have:

- Custom frontmatter fields
- Unique display options
- Type-specific features (audio, tags, images, etc.)
- Custom sorting and pagination

### Configuration-Driven

Two main configuration files control the entire system:

1. **`directory.config.ts`** - Site-wide settings (name, SEO, features)
2. **`content.config.ts`** - Content type definitions and behaviors

### SEO Built-In

Every page automatically includes:

- Meta tags (title, description, keywords)
- Open Graph tags for social sharing
- Twitter Card tags
- JSON-LD structured data
- Canonical URLs
- XML sitemap
- RSS feed

## Need Help?

- 📖 [Full Documentation](https://rohanpatriot.github.io/nextjs-directory-boilerplate/)
- 🐛 [Report Issues](https://github.com/rohanpatriot/nextjs-directory-boilerplate/issues)
- 💬 [Discussions](https://github.com/rohanpatriot/nextjs-directory-boilerplate/discussions)
- ⭐ [Star on GitHub](https://github.com/rohanpatriot/nextjs-directory-boilerplate)

## License

This project is released under the [MIT License](https://github.com/rohanpatriot/nextjs-directory-boilerplate/blob/main/LICENSE).

---

**Ready to dive in?** Start with [Getting Started](getting-started) →
