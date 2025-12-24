# Dark Mode

The boilerplate includes dark mode support with system preference detection.

## How It Works

Dark mode is implemented using [next-themes](https://github.com/pacocoursey/next-themes):

1. **System Detection**: Automatically matches user's OS preference
2. **Manual Toggle**: Users can override with the theme toggle button
3. **Persistence**: Selection is saved to localStorage
4. **No Flash**: Server-side rendering prevents flash of unstyled content

## Theme Toggle

The theme toggle component cycles through: Light → Dark → System

**Location:** `src/components/ThemeToggle.tsx`

```typescript
import { ThemeToggle } from '@/components/ThemeToggle';

// In your navbar or header
<ThemeToggle />
```

## CSS Variables

Theme colors are defined using CSS custom properties in `src/app/globals.css`:

### Light Theme (Editorial)

The light theme uses warm, sophisticated tones inspired by literary magazines.

```css
:root {
  --background: 40 33% 98%;           /* Warm ivory, like quality paper */
  --foreground: 20 20% 12%;           /* Rich warm black */
  --card: 40 25% 96%;                 /* Slightly warmer than background */
  --card-foreground: 20 20% 12%;
  --primary: 4 74% 49%;               /* Classic editorial vermillion red */
  --primary-foreground: 0 0% 100%;
  --secondary: 30 8% 92%;             /* Warm stone gray */
  --muted: 35 15% 94%;                /* Soft warm gray */
  --muted-foreground: 25 10% 45%;
  --accent: 220 45% 15%;              /* Deep editorial navy */
  --border: 30 15% 88%;               /* Subtle warm border */
  --input: 30 15% 88%;
  --ring: 4 74% 49%;                  /* Focus ring matches primary */
}
```

### Dark Theme (Editorial)

```css
.dark {
  --background: 20 15% 7%;            /* Warm dark, not pure black */
  --foreground: 35 20% 92%;           /* Warm off-white */
  --card: 20 15% 10%;                 /* Elevated surfaces */
  --card-foreground: 35 20% 92%;
  --primary: 4 80% 58%;               /* Brighter red for dark mode */
  --primary-foreground: 0 0% 100%;
  --secondary: 20 12% 18%;
  --muted: 20 12% 15%;
  --muted-foreground: 30 10% 55%;
  --accent: 200 60% 70%;              /* Lighter blue accent in dark */
  --border: 20 12% 20%;
  --input: 20 12% 20%;
  --ring: 4 80% 58%;
}
```

## Customizing Colors

To customize the color palette:

1. Edit the CSS variables in `src/app/globals.css`
2. Values use HSL format: `hue saturation% lightness%`
3. Update both `:root` (light) and `.dark` sections

### Example: Blue Theme

```css
:root {
  --background: 210 30% 98%;
  --foreground: 210 20% 15%;
  --primary: 210 90% 50%;
  /* ... other variables */
}

.dark {
  --background: 210 30% 10%;
  --foreground: 210 20% 90%;
  --primary: 210 90% 60%;
  /* ... other variables */
}
```

## Using Theme Colors

### In Tailwind Classes

Use the semantic color names:

```html
<div class="bg-background text-foreground">
  <div class="bg-card p-4 border border-border">
    <h2 class="text-primary">Title</h2>
    <p class="text-muted-foreground">Description</p>
  </div>
</div>
```

### In Custom CSS

Reference variables directly:

```css
.custom-element {
  background-color: hsl(var(--card));
  color: hsl(var(--card-foreground));
  border: 1px solid hsl(var(--border));
}
```

## Theme Provider

The theme provider is configured in `src/components/ThemeProvider.tsx`:

```typescript
'use client';

import { ThemeProvider as NextThemesProvider } from 'next-themes';

export function ThemeProvider({ children }: { children: React.ReactNode }) {
  return (
    <NextThemesProvider
      attribute="class"
      defaultTheme="system"
      enableSystem
      disableTransitionOnChange
    >
      {children}
    </NextThemesProvider>
  );
}
```

Options:
- `attribute="class"`: Adds `.dark` class to `<html>`
- `defaultTheme="system"`: Defaults to OS preference
- `enableSystem`: Enables system preference detection
- `disableTransitionOnChange`: Prevents animation flash on theme change

## Accessing Theme in Code

```typescript
'use client';

import { useTheme } from 'next-themes';

function MyComponent() {
  const { theme, setTheme, resolvedTheme } = useTheme();

  // theme: 'light' | 'dark' | 'system'
  // resolvedTheme: 'light' | 'dark' (actual theme being used)

  return (
    <button onClick={() => setTheme('dark')}>
      Dark Mode
    </button>
  );
}
```

## Components Support

All shadcn/ui components automatically support dark mode through CSS variables. No additional configuration needed.

## Images in Dark Mode

For images that need different versions for dark mode:

```tsx
import { useTheme } from 'next-themes';

function Logo() {
  const { resolvedTheme } = useTheme();

  return (
    <img
      src={resolvedTheme === 'dark' ? '/logo-dark.png' : '/logo-light.png'}
      alt="Logo"
    />
  );
}
```

Or use CSS:

```css
.logo-dark {
  display: none;
}

.dark .logo-light {
  display: none;
}

.dark .logo-dark {
  display: block;
}
```
