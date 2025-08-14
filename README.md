# Next.js Directory/Blog Boilerplate

A modern, customizable directory/blog template built with Next.js, MDX, and shadcn/ui. Perfect for creating content-driven websites, directories, portfolios, blogs, or educational content collections like stories, articles, and guides.

This boilerplate provides a flexible foundation for organizing and presenting content with built-in search, filtering, and responsive design. Whether you're building a company directory, blog, educational resource, or content showcase, this template offers the tools you need to get started quickly.

## Quick Deploy w/ Vercel
[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new/clone?repository-url=https%3A%2F%2Fgithub.com%2Frohanpatriot%2Fnextjs-directory-boilerplate&project-name=nextjs-directory-boilerplate&repository-name=nextjs-directory-boilerplate&skippable-integrations=1)

## Features

- 📝 **MDX Support** - Write content using Markdown with JSX components
- 🎨 **Customizable Design** - Built with Tailwind CSS and shadcn/ui
- 🔍 **Search & Filtering** - Built-in content search and tag filtering
- 📱 **Responsive Layout** - Mobile-first design approach
- 🖼️ **Image Optimization** - Automatic image optimization with Next.js
- 🎵 **Audio Support** - Optional audio player for content (great for podcasts, stories, etc.)
- 🏷️ **Tag System** - Organize content with tags and categories
- ⚡ **Fast Page Loads** - Static site generation for optimal performance
- 🎯 **SEO Optimized** - Built-in SEO best practices
- 🔧 **Highly Configurable** - Easy configuration through a single config file
- 📖 **Multi-Content Types** - Support for different content categories (stories, articles, posts, etc.)

## Use Cases

This boilerplate is perfect for:

- **Educational Content** - Story collections, lesson libraries, course materials
- **Company Directories** - Team member profiles, service catalogs, resource libraries
- **Blogs & Magazines** - Personal blogs, company blogs, digital magazines
- **Portfolio Sites** - Project showcases, case studies, work samples
- **Documentation Sites** - API docs, user guides, knowledge bases
- **Content Libraries** - Article collections, research papers, media libraries

## Tech Stack

- **Framework**: [Next.js 14](https://nextjs.org/)
- **Styling**: [Tailwind CSS](https://tailwindcss.com/)
- **UI Components**: [shadcn/ui](https://ui.shadcn.com/)
- **Content**: [MDX](https://mdxjs.com/)
- **Typography**: Google Fonts (Cormorant Garamond & Nunito)

## Getting Started

1. Clone this repository:
   ```bash
   git clone https://github.com/rohanpatriot/nextjs-directory-boilerplate
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Run the development server:
   ```bash
   npm run dev
   ```

4. Open [http://localhost:3000](http://localhost:3000) to see your site

5. Start customizing:
   - Replace the example content in `src/content/` with your own MDX files
   - Update `src/config/directory.config.ts` with your site information
   - Modify the styling and components to match your brand

## What You'll Get

![Next.js Directory Boilerplate Screenshot](https://github.com/user-attachments/assets/67e8cb19-d816-42e7-9911-01d87955c185)

Out of the box, you'll have a fully functional content directory with:
- A clean, responsive homepage with search and filtering
- Individual content pages with rich formatting
- Tag-based content organization
- Mobile-friendly responsive design

## Project Structure

```
src/
├── app/ # Next.js app directory
│ ├── content/ # Content page routes
│ ├── stories/ # Story page routes
│ ├── tags/ # Tag page routes
│ ├── layout.tsx # Root layout component
│ ├── not-found.tsx # 404 page component
│ └── page.tsx # Home page
├── components/ # React components
│ ├── layout/ # Layout components
│ ├── ui/ # UI components
│ ├── AudioPlayer.tsx # Audio player component
│ ├── ErrorBoundary.tsx # Error boundary component
│ ├── Navbar.tsx # Navbar component
│ ├── Pagination.tsx # Pagination component
│ ├── Search/ # Search components
│ ├── Search.tsx # Search component
│ ├── summaryCard.tsx # Summary card component
│ └── TagFilter.tsx # Tag filter component
├── config/ # Site configuration (src/config)
│ └── directory.config.ts
├── content/ # MDX content files (src/content)
├── lib/ # Utility functions
│ ├── content.ts # Content management
│ ├── metadata.ts # Metadata generation
│ ├── posts.ts # Post management
│ └── utils.ts # Utility functions
├── stories/ # MDX story files
├── types/ # TypeScript types
│ └── content.ts
└── app/globals.css # Global styles
```

## Content Structure

Content is written in MDX format with frontmatter metadata. Create new `.mdx` files in the `src/content` directory:

```mdx
---
title: 'Example Post'
topic: 'Topic'
image: '/image.png'
summary: "Brief summary"
tags: ['tag1', 'tag2']
date: '2024-01-01'
author: 'Author Name'
---

Content goes here...
```

### Available Frontmatter Fields

| Field    | Required | Description                    |
|----------|----------|--------------------------------|
| title    | Yes      | Content title                  |
| topic    | No       | Content topic/category         |
| image    | No       | Featured image path            |
| summary  | No       | Brief content summary          |
| tags     | No       | Array of related tags          |
| date     | No       | Publication date               |
| author   | No       | Content author                 |
| audioUrl | No       | URL to associated audio file   |
| virtue   | No       | Key lesson or takeaway (custom field example) |

> **Note**: You can add custom fields to the frontmatter as needed. The `virtue` field shown above is an example of how you can extend the metadata for specific content types.

## Customization

### Site Configuration

Modify `src/config/directory.config.ts` to customize site-wide settings:

```typescript
export const directoryConfig: DirectoryConfig = {
  name: 'Your Site Name',
  description: 'Your site description',
  itemsPerPage: 9,
  features: {
    audio: true,
    images: true,
    tags: true,
    search: true,
    pagination: true,
  },
  theme: {
    fontHeading: 'Your_Heading_Font',
    fontBody: 'Your_Body_Font',
  },
};
```

### Styling

- Global styles: `src/app/globals.css`
- Tailwind config: `tailwind.config.ts`
- Component styles: Individual component files using Tailwind classes

### Components

- Create new components in `src/components`
- Modify existing components to match your needs
- Use shadcn/ui components for consistent styling

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## License

This project is released under the [MIT License](LICENSE).
