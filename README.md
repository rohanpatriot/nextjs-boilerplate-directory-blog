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

---

## ✨ Key Features

<table>
<tr>
<td width="50%">

### 🚀 **Modern Stack**
Built on **Next.js 15** with React 19, TypeScript, and the latest web technologies for blazing-fast performance

### 📝 **MDX-Powered Content**
Write content in Markdown with full JSX support - embed interactive components directly in your content

### 🎨 **Beautiful by Default**
Gorgeous UI built with **shadcn/ui** and Tailwind CSS - customizable, accessible, and production-ready

</td>
<td width="50%">

### ⚡ **Lightning Fast**
Static site generation ensures optimal performance with instant page loads and perfect Lighthouse scores

### 🔍 **Search & Discovery**
Built-in content search, tag filtering, and smart categorization help users find what they need

### 🌙 **Dark Mode Included**
Automatic dark mode with system preference detection and manual toggle - no extra configuration needed

</td>
</tr>
</table>

### 🎯 **What Makes This Special?**

- **📱 Mobile-First & Responsive** - Looks stunning on every device from phone to desktop
- **🗺️ SEO Powerhouse** - Auto-generated sitemap, RSS feed, and JSON-LD structured data out of the box
- **🖼️ Smart Image Handling** - Automatic image optimization powered by Next.js
- **🎵 Multimedia Ready** - Optional audio player for podcasts, tutorials, and educational content
- **🏷️ Flexible Tag System** - Organize content with tags and categories for easy navigation
- **🔧 Config-Driven Setup** - Customize everything through simple configuration files
- **📖 Multi-Content Support** - Handle different content types (articles, guides, etc.) with ease
- **🚀 One-Click Deploy** - Deploy to Vercel in seconds with zero configuration

---

## 🛠️ Tech Stack

- **Framework**: [Next.js 15](https://nextjs.org/) with React 19
- **Package Manager**: [pnpm](https://pnpm.io/) 9.x
- **Styling**: [Tailwind CSS](https://tailwindcss.com/)
- **UI Components**: [shadcn/ui](https://ui.shadcn.com/)
- **Content**: [MDX](https://mdxjs.com/)
- **Theming**: [next-themes](https://github.com/pacocoursey/next-themes)
- **Typography**: [next/font/google](https://nextjs.org/docs/pages/building-your-application/optimizing/fonts) (Cormorant Garamond & Nunito)

## 🚀 Quick Start

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

## 📁 Project Structure

```
├── content/                  # MDX content files
│   ├── articles/            # Blog articles
│   └── guides/              # How-to guides and tutorials
│   └── [custom]/            # Add your own content types
├── src/
│   ├── app/                 # Next.js App Router
│   │   ├── [contentType]/   # Dynamic content routes
│   │   │   └── [slug]/      # Content detail pages
│   │   ├── tags/            # Tag pages
│   │   │   └── [tag]/       # Tag-filtered content
│   │   ├── feed.xml/        # RSS feed
│   │   ├── sitemap.ts       # Dynamic sitemap
│   │   └── robots.ts        # Robots.txt
│   ├── components/          # React components
│   │   ├── layout/          # Layout components
│   │   │   ├── ContentCard.tsx
│   │   │   └── ContentGrid.tsx
│   │   ├── Search/          # Search components
│   │   └── ui/              # shadcn/ui components
│   ├── config/              # Configuration
│   │   ├── content.config.ts    # Content type definitions
│   │   └── directory.config.ts  # Site settings
│   ├── lib/
│   │   ├── content/         # Content system
│   │   │   ├── loader.ts    # Content loader
│   │   │   ├── types.ts     # TypeScript types
│   │   │   └── index.ts     # Exports
│   │   ├── metadata.ts      # SEO metadata
│   │   ├── structured-data.tsx  # JSON-LD schemas
│   │   └── utils.ts         # Utility functions
│   └── types/               # TypeScript type definitions
│       └── content.ts       # Content interfaces
```

## ✍️ Content

Add MDX files to `content/articles/` or `content/guides/`:

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

## ⚙️ Configuration

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
    guides: { /* config */ },
    // Add your own types
  }
}
```

See [Configuration docs](docs/configuration.md) for full reference.

## 📚 Documentation

Comprehensive documentation is available online and in the repository:

- 📖 **[View Documentation](https://rohanpatriot.github.io/nextjs-directory-boilerplate/docs/)** - Online docs via GitHub Pages
- 📁 **[docs/](docs/)** - Local documentation folder

### Quick Links

- [Getting Started](docs/getting-started.md) - Installation and first steps
- [Content System](docs/content-system.md) - Adding and managing content
- [Configuration](docs/configuration.md) - Site and content config reference
- [SEO](docs/seo.md) - Sitemap, RSS, metadata, and structured data
- [Dark Mode](docs/dark-mode.md) - Theming and customization
- [Components](docs/components.md) - Available UI components
- [Deployment](docs/deployment.md) - Deploying to Vercel and other platforms

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## 📄 License

This project is released under the [MIT License](LICENSE).
