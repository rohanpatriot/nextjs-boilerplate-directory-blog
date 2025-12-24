# Components

The boilerplate includes a set of pre-built components using shadcn/ui and custom implementations.

## UI Components (shadcn/ui)

Located in `src/components/ui/`:

### Button

```typescript
import { Button } from '@/components/ui/button';

<Button variant="default">Click me</Button>
<Button variant="secondary">Secondary</Button>
<Button variant="outline">Outline</Button>
<Button variant="ghost">Ghost</Button>
<Button variant="link">Link</Button>
<Button variant="destructive">Delete</Button>
```

### Card

```typescript
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
  CardFooter,
} from '@/components/ui/card';

<Card>
  <CardHeader>
    <CardTitle>Title</CardTitle>
    <CardDescription>Description</CardDescription>
  </CardHeader>
  <CardContent>
    Content goes here
  </CardContent>
  <CardFooter>
    <Button>Action</Button>
  </CardFooter>
</Card>
```

### Badge

```typescript
import { Badge } from '@/components/ui/badge';

<Badge>Default</Badge>
<Badge variant="secondary">Secondary</Badge>
<Badge variant="outline">Outline</Badge>
<Badge variant="destructive">Destructive</Badge>
```

### Input

```typescript
import { Input } from '@/components/ui/input';

<Input type="text" placeholder="Enter text..." />
<Input type="email" placeholder="email@example.com" />
<Input disabled placeholder="Disabled" />
```

### Slider

```typescript
import { Slider } from '@/components/ui/slider';

<Slider defaultValue={[50]} max={100} step={1} />
```

## Content Components

### ContentCard

Displays a content item in card format.

**Location:** `src/components/layout/ContentCard.tsx`

```typescript
import ContentCard from '@/components/layout/ContentCard';

<ContentCard item={contentItem} />
```

Features controlled by content type config:
- Featured image
- Title
- Summary
- Tags
- Date
- Author

### ContentGrid

Displays a grid of content cards.

**Location:** `src/components/layout/ContentGrid.tsx`

```typescript
import ContentGrid from '@/components/layout/ContentGrid';

<ContentGrid items={contentItems} />
```

## Navigation Components

### Header

Modern site header with navigation, search, and theme toggle.

**Location:** `src/components/Header.tsx`

```typescript
import { Header } from '@/components/Header';

<Header />
```

Features:
- Responsive navigation with mobile menu
- Scroll-based styling with backdrop blur
- Content type navigation links
- Search shortcut (⌘K/Ctrl+K)
- Theme toggle
- Active route indicators

### Pagination

Page navigation for content listings.

**Location:** `src/components/Pagination.tsx`

```typescript
import Pagination from '@/components/Pagination';

<Pagination
  currentPage={1}
  totalPages={10}
  onPageChange={(page) => setCurrentPage(page)}
/>
```

### Footer

Site footer with copyright and optional links.

**Location:** `src/components/Footer.tsx`

```typescript
import { Footer } from '@/components/Footer';

<Footer />
```

### Breadcrumbs

Navigation breadcrumbs for better UX.

**Location:** `src/components/Breadcrumbs.tsx`

```typescript
import { Breadcrumbs } from '@/components/Breadcrumbs';

<Breadcrumbs
  items={[
    { label: 'Home', href: '/' },
    { label: 'Articles', href: '/articles' },
    { label: 'Current Article' }
  ]}
/>
```

### MobileMenu

Slide-out mobile navigation menu.

**Location:** `src/components/MobileMenu.tsx`

Used internally by the Header component for responsive navigation.

### TagFilter

Tag-based content filtering.

**Location:** `src/components/TagFilter.tsx`

```typescript
import TagFilter from '@/components/TagFilter';

<TagFilter
  tags={['react', 'nextjs', 'typescript']}
  selectedTags={['react']}
  onChange={(tags) => setSelectedTags(tags)}
/>
```

## Search Components

### SearchInput

Search input with real-time filtering.

**Location:** `src/components/Search/SearchInput.tsx`

```typescript
import { SearchInput } from '@/components/Search/SearchInput';

<SearchInput
  value={query}
  onChange={setQuery}
  placeholder="Search content..."
/>
```

### Search Index

Main search component with integrated filtering.

**Location:** `src/components/Search/index.tsx`

### useSearch Hook

**Location:** `src/components/Search/useSearch.ts`

```typescript
import { useSearch } from '@/components/Search/useSearch';

const {
  searchResults,
  currentPage,
  setCurrentPage,
  selectedTags,
  handleSearch,
  handleTagSelect,
  totalPages,
  allTags,
} = useSearch(items);
```

Features:
- Real-time search filtering
- Tag-based filtering
- Pagination support
- Combined search and tag filters

## Media Components

### AudioPlayer

Optional audio playback for content.

**Location:** `src/components/AudioPlayer.tsx`

```typescript
import AudioPlayer from '@/components/AudioPlayer';

<AudioPlayer audioUrl="/audio/episode-1.mp3" />
```

Features:
- Play/pause
- Progress bar
- Volume control
- Time display

Enable audio in content type config:
```typescript
features: {
  audio: true,
}
```

And include `audioUrl` in frontmatter:
```yaml
audioUrl: '/audio/my-audio.mp3'
```

## Utility Components

### ThemeToggle

Dark mode toggle button.

**Location:** `src/components/ThemeToggle.tsx`

```typescript
import { ThemeToggle } from '@/components/ThemeToggle';

<ThemeToggle />
```

### ErrorBoundary

React error boundary for graceful error handling.

**Location:** `src/components/ErrorBoundary.tsx`

```typescript
import { ErrorBoundary } from '@/components/ErrorBoundary';

<ErrorBoundary fallback={<ErrorMessage />}>
  <MyComponent />
</ErrorBoundary>
```

## Adding New shadcn/ui Components

To add more shadcn/ui components:

```bash
pnpm dlx shadcn@latest add [component-name]
```

Available components: https://ui.shadcn.com/docs/components

Examples:
```bash
pnpm dlx shadcn@latest add dialog
pnpm dlx shadcn@latest add dropdown-menu
pnpm dlx shadcn@latest add tabs
pnpm dlx shadcn@latest add accordion
```

## Creating Custom Components

1. Create file in `src/components/` (or `src/components/layout/` for layout components)
2. Use existing UI primitives for consistency
3. Follow the established patterns:

```typescript
// src/components/MyComponent.tsx
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';

interface MyComponentProps {
  title: string;
  onAction: () => void;
}

export function MyComponent({ title, onAction }: MyComponentProps) {
  return (
    <Card>
      <CardContent className="p-4">
        <h3 className="font-heading text-lg">{title}</h3>
        <Button onClick={onAction}>Action</Button>
      </CardContent>
    </Card>
  );
}
```

### Component Organization

- `src/components/ui/` - shadcn/ui primitives (button, card, input, etc.)
- `src/components/layout/` - Layout components (ContentCard, ContentGrid)
- `src/components/Search/` - Search-related components
- `src/components/` - General components (Header, Footer, ThemeToggle, etc.)
