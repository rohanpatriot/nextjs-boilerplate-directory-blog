# Next.js Directory/Blog Boilerplate

<div align="center">

[![Next.js](https://img.shields.io/badge/Next.js-15-black?style=for-the-badge&logo=next.js&logoColor=white)](https://nextjs.org/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.0+-3178C6?style=for-the-badge&logo=typescript&logoColor=white)](https://www.typescriptlang.org/)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow?style=for-the-badge)](LICENSE)
[![GitHub Stars](https://img.shields.io/github/stars/rohanpatriot/nextjs-directory-boilerplate?style=for-the-badge&logo=github)](https://github.com/rohanpatriot/nextjs-directory-boilerplate/stargazers)
[![Deploy with Vercel](https://img.shields.io/badge/Deploy-Vercel-black?style=for-the-badge&logo=vercel)](https://vercel.com/new/clone?repository-url=https%3A%2F%2Fgithub.com%2Frohanpatriot%2Fnextjs-directory-boilerplate)

</div>

A modern, customizable directory/blog template built with Next.js 15, MDX, and shadcn/ui. Perfect for creating content-driven websites, directories, portfolios, blogs, or educational content collections.

[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new/clone?repository-url=https%3A%2F%2Fgithub.com%2Frohanpatriot%2Fnextjs-directory-boilerplate&project-name=nextjs-directory-boilerplate&repository-name=nextjs-directory-boilerplate&skippable-integrations=1)

## Features

- 📝 **MDX Support** - Write content using Markdown with JSX components
- 🎨 **Customizable Design** - Built with Tailwind CSS and shadcn/ui
- 🔍 **Search & Filtering** - Built-in content search and tag filtering
- 📱 **Responsive Layout** - Mobile-first design approach
- 🖼️ **Image Optimization** - Automatic image optimization with Next.js
- 🎵 **Audio Support** - Optional audio player for podcasts, stories, etc.
- 🏷️ **Tag System** - Organize content with tags and categories
- ⚡ **Fast Page Loads** - Static site generation for optimal performance
- 🌙 **Dark Mode** - System preference detection with manual toggle
- 🗺️ **SEO Infrastructure** - Auto-generated sitemap, RSS feed, and JSON-LD
- 🔧 **Config-Driven** - Easy configuration through config files
- 📖 **Multi-Content Types** - Support for different content categories

## Tech Stack

- **Framework**: [Next.js 15](https://nextjs.org/) with React 19
- **Package Manager**: [pnpm](https://pnpm.io/)
- **Styling**: [Tailwind CSS](https://tailwindcss.com/)
- **UI Components**: [shadcn/ui](https://ui.shadcn.com/)
- **Content**: [MDX](https://mdxjs.com/)
- **Theming**: [next-themes](https://github.com/pacocoursey/next-themes)
- **Typography**: Google Fonts (Cormorant Garamond & Nunito)

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

Open [http://localhost:3000](http://localhost:3000) to see your site.

## Project Structure

```
├── content/                  # MDX content files
│   ├── articles/            # Blog articles
│   └── stories/             # Story content
├── src/
│   ├── app/                 # Next.js App Router
│   │   ├── [contentType]/   # Dynamic content routes
│   │   ├── tags/            # Tag pages
│   │   ├── feed.xml/        # RSS feed
│   │   ├── sitemap.ts       # Dynamic sitemap
│   │   └── robots.ts        # Robots.txt
│   ├── components/          # React components
│   │   └── ui/              # shadcn/ui components
│   ├── config/              # Configuration
│   │   ├── content.config.ts    # Content type definitions
│   │   └── directory.config.ts  # Site settings
│   └── lib/
│       ├── content/         # Content system
│       ├── metadata.ts      # SEO metadata
│       └── structured-data.tsx  # JSON-LD schemas
```

## Content

Add MDX files to `content/articles/` or `content/stories/`:

```mdx
---
title: 'My Post Title'
summary: 'Brief description'
date: '2024-01-15'
author: 'Your Name'
tags: ['tag1', 'tag2']
image: '/images/post-image.jpg'
---

Your content here...
```

See [Content System docs](docs/content-system.md) for all frontmatter fields and adding custom content types.

## Configuration

**Site settings** in `src/config/directory.config.ts`:
```typescript
export const directoryConfig = {
  name: 'Your Site Name',
  description: 'Your site description',
  // ...
}
```

**Content types** in `src/config/content.config.ts`:
```typescript
export const contentConfig = {
  types: {
    articles: { /* config */ },
    stories: { /* config */ },
    // Add your own types
  }
}
```

See [Configuration docs](docs/configuration.md) for full reference.

## Documentation

Detailed documentation is available in the [docs/](docs/) folder:

- [Getting Started](docs/getting-started.md) - Installation and first steps
- [Content System](docs/content-system.md) - Adding and managing content
- [Configuration](docs/configuration.md) - Site and content config reference
- [SEO](docs/seo.md) - Sitemap, RSS, metadata, and structured data
- [Dark Mode](docs/dark-mode.md) - Theming and customization
- [Components](docs/components.md) - Available UI components
- [Deployment](docs/deployment.md) - Deploying to Vercel and other platforms

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## License

This project is released under the [MIT License](LICENSE).
