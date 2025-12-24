# Getting Started

## Prerequisites

- **Node.js** 18.17 or later
- **pnpm** 9.15 or later (recommended) or npm/yarn

### Installing pnpm

If you don't have pnpm installed:

```bash
# Using npm
npm install -g pnpm

# Or using Homebrew (macOS)
brew install pnpm
```

## Installation

1. **Clone the repository**

```bash
git clone https://github.com/rohanpatriot/nextjs-directory-boilerplate
cd nextjs-directory-boilerplate
```

2. **Install dependencies**

```bash
pnpm install
```

3. **Start the development server**

```bash
pnpm dev
```

4. **Open your browser**

Visit [http://localhost:3000](http://localhost:3000)

## Available Commands

| Command | Description |
|---------|-------------|
| `pnpm dev` | Start development server with Turbopack |
| `pnpm build` | Build for production |
| `pnpm start` | Start production server |
| `pnpm lint` | Run ESLint |

## First Customization

### 1. Update Site Information

Edit `src/config/directory.config.ts`:

```typescript
export const directoryConfig: DirectoryConfig = {
  name: 'Your Site Name',
  description: 'Your site description',
  // ...
};

export const seoConfig: SEOConfig = {
  siteUrl: 'https://your-domain.com',
  siteName: 'Your Site Name',
  // ...
};
```

### 2. Add Your Content

Replace the example content in the `content/` folder:

```bash
content/
  articles/
    my-first-post.mdx
  guides/
    my-guide.mdx
```

### 3. Customize Styling

- **Colors & Typography**: Edit `src/app/globals.css`
- **Tailwind Config**: Edit `tailwind.config.ts`
- **Components**: Modify files in `src/components/`

## Environment Variables

Copy the example environment file and update values for your environment:

```bash
cp .env.example .env.local
```

Then edit `.env.local` with your values:

| Variable | Required | Description |
|----------|----------|-------------|
| `NEXT_PUBLIC_SITE_URL` | Yes | Your production URL (e.g., `https://your-domain.com`) |
| `GOOGLE_SITE_VERIFICATION` | No | Google Search Console verification code |
| `NEXT_PUBLIC_ANALYTICS_ENABLED` | No | Enable client-side analytics (`true`/`false`) |

See `.env.example` for all available options and documentation.

## Next Steps

- [Content System](content-system.md) - Learn how to add content
- [Configuration](configuration.md) - Full configuration reference
- [Deployment](deployment.md) - Deploy to production
