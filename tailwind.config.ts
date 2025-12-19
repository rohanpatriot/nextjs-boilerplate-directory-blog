import type { Config } from "tailwindcss";
import { fontFamily } from "tailwindcss/defaultTheme";
import animatePlugin from "tailwindcss-animate";
import typography from '@tailwindcss/typography';

const config: Config = {
  darkMode: 'class',
  content: [
    "./src/components/**/*.{js,ts,jsx,tsx}",
    "./src/app/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      /*
       * Editorial Typography Scale
       * Optimized for reading and visual hierarchy
       */
      fontSize: {
        // Display - Hero headlines, landing pages
        'display': ['3.5rem', { lineHeight: '1.1', letterSpacing: '-0.02em', fontWeight: '600' }],
        'display-sm': ['2.5rem', { lineHeight: '1.15', letterSpacing: '-0.02em', fontWeight: '600' }],

        // Headlines - Page titles, section headers
        'headline': ['2.25rem', { lineHeight: '1.2', letterSpacing: '-0.01em', fontWeight: '600' }],
        'headline-sm': ['1.875rem', { lineHeight: '1.25', letterSpacing: '-0.01em', fontWeight: '600' }],

        // Titles - Card titles, subheadings
        'title': ['1.5rem', { lineHeight: '1.3', letterSpacing: '-0.01em', fontWeight: '500' }],
        'title-sm': ['1.25rem', { lineHeight: '1.35', letterSpacing: '-0.005em', fontWeight: '500' }],

        // Subtitles - Secondary headings
        'subtitle': ['1.125rem', { lineHeight: '1.4', fontWeight: '500' }],

        // Body - Reading text (larger for comfort)
        'body-lg': ['1.125rem', { lineHeight: '1.75' }],
        'body': ['1rem', { lineHeight: '1.75' }],
        'body-sm': ['0.9375rem', { lineHeight: '1.7' }],

        // Captions & metadata
        'caption': ['0.875rem', { lineHeight: '1.5' }],
        'micro': ['0.75rem', { lineHeight: '1.5', letterSpacing: '0.01em' }],

        // Overline - Labels, categories
        'overline': ['0.75rem', { lineHeight: '1.5', letterSpacing: '0.1em', fontWeight: '600' }],
      },

      /*
       * Font Families
       */
      fontFamily: {
        heading: ['var(--font-heading)', ...fontFamily.serif],
        body: ['var(--font-body)', ...fontFamily.sans],
      },

      /*
       * Editorial Color System
       * Defined via CSS variables in globals.css
       */
      colors: {
        border: 'hsl(var(--border))',
        input: 'hsl(var(--input))',
        ring: 'hsl(var(--ring))',
        background: 'hsl(var(--background))',
        foreground: 'hsl(var(--foreground))',
        primary: {
          DEFAULT: 'hsl(var(--primary))',
          foreground: 'hsl(var(--primary-foreground))'
        },
        secondary: {
          DEFAULT: 'hsl(var(--secondary))',
          foreground: 'hsl(var(--secondary-foreground))'
        },
        destructive: {
          DEFAULT: 'hsl(var(--destructive))',
          foreground: 'hsl(var(--destructive-foreground))'
        },
        muted: {
          DEFAULT: 'hsl(var(--muted))',
          foreground: 'hsl(var(--muted-foreground))'
        },
        accent: {
          DEFAULT: 'hsl(var(--accent))',
          foreground: 'hsl(var(--accent-foreground))'
        },
        popover: {
          DEFAULT: 'hsl(var(--popover))',
          foreground: 'hsl(var(--popover-foreground))'
        },
        card: {
          DEFAULT: 'hsl(var(--card))',
          foreground: 'hsl(var(--card-foreground))'
        },
        // Custom editorial colors
        highlight: 'hsl(var(--highlight))',
        link: 'hsl(var(--link))',
        caption: 'hsl(var(--caption))',
        divider: 'hsl(var(--divider))',
      },

      /*
       * Semantic Spacing
       * Based on 8px grid with editorial-appropriate spacing
       */
      spacing: {
        // Section spacing - generous vertical rhythm
        'section': '6rem',        // 96px - major sections
        'section-sm': '4rem',     // 64px - smaller sections
        'section-xs': '3rem',     // 48px - compact sections

        // Content spacing - within sections
        'content-lg': '3rem',     // 48px - larger content gap
        'content': '2rem',        // 32px - default content gap
        'content-sm': '1.5rem',   // 24px - tighter content
        'content-xs': '1rem',     // 16px - compact content

        // Component spacing
        'component': '0.75rem',   // 12px - within components
        'component-sm': '0.5rem', // 8px - tight component spacing

        // Reading gutter
        'gutter': '1.5rem',       // 24px - page gutters mobile
        'gutter-lg': '3rem',      // 48px - page gutters desktop
      },

      /*
       * Max Widths
       * Constrain content for optimal reading
       */
      maxWidth: {
        'reading': '45rem',       // 720px - optimal line length for reading
        'reading-wide': '55rem',  // 880px - slightly wider for mixed content
        'content': '80rem',       // 1280px - max site content width
        'header': '90rem',        // 1440px - max header width
      },

      /*
       * Border Radius
       * Editorial crispness with subtle rounding
       */
      borderRadius: {
        xl: `calc(var(--radius) + 4px)`,
        lg: `var(--radius)`,
        md: `calc(var(--radius) - 2px)`,
        sm: `calc(var(--radius) - 4px)`,
      },

      /*
       * Box Shadows
       * Subtle, editorial shadows
       */
      boxShadow: {
        'editorial': '0 1px 3px 0 rgb(0 0 0 / 0.05), 0 1px 2px -1px rgb(0 0 0 / 0.05)',
        'editorial-md': '0 4px 6px -1px rgb(0 0 0 / 0.05), 0 2px 4px -2px rgb(0 0 0 / 0.05)',
        'editorial-lg': '0 10px 15px -3px rgb(0 0 0 / 0.05), 0 4px 6px -4px rgb(0 0 0 / 0.05)',
        'card-hover': '0 10px 40px -10px rgb(0 0 0 / 0.1)',
      },

      /*
       * Transitions
       * Smooth, editorial transitions
       */
      transitionDuration: {
        '250': '250ms',
        '350': '350ms',
      },
      transitionTimingFunction: {
        'editorial': 'cubic-bezier(0.4, 0, 0.2, 1)',
        'editorial-out': 'cubic-bezier(0, 0, 0.2, 1)',
      },

      /*
       * Animations
       */
      keyframes: {
        "accordion-down": {
          from: { height: "0" },
          to: { height: "var(--radix-accordion-content-height)" }
        },
        "accordion-up": {
          from: { height: "var(--radix-accordion-content-height)" },
          to: { height: "0" }
        },
        "fade-in": {
          from: { opacity: "0" },
          to: { opacity: "1" }
        },
        "fade-out": {
          from: { opacity: "1" },
          to: { opacity: "0" }
        },
        "slide-in-from-top": {
          from: { transform: "translateY(-10px)", opacity: "0" },
          to: { transform: "translateY(0)", opacity: "1" }
        },
        "slide-in-from-bottom": {
          from: { transform: "translateY(10px)", opacity: "0" },
          to: { transform: "translateY(0)", opacity: "1" }
        },
        "slide-in-from-left": {
          from: { transform: "translateX(-10px)", opacity: "0" },
          to: { transform: "translateX(0)", opacity: "1" }
        },
        "slide-in-from-right": {
          from: { transform: "translateX(10px)", opacity: "0" },
          to: { transform: "translateX(0)", opacity: "1" }
        },
        "scale-in": {
          from: { transform: "scale(0.95)", opacity: "0" },
          to: { transform: "scale(1)", opacity: "1" }
        },
      },
      animation: {
        "accordion-down": "accordion-down 0.2s ease-out",
        "accordion-up": "accordion-up 0.2s ease-out",
        "fade-in": "fade-in 0.3s ease-out",
        "fade-out": "fade-out 0.3s ease-out",
        "slide-in-from-top": "slide-in-from-top 0.3s ease-out",
        "slide-in-from-bottom": "slide-in-from-bottom 0.3s ease-out",
        "slide-in-from-left": "slide-in-from-left 0.3s ease-out",
        "slide-in-from-right": "slide-in-from-right 0.3s ease-out",
        "scale-in": "scale-in 0.2s ease-out",
      },

      /*
       * Aspect Ratios
       * Common editorial image ratios
       */
      aspectRatio: {
        'editorial': '16 / 10',   // Slightly taller than 16:9
        'card': '4 / 3',          // Standard card image
        'hero': '21 / 9',         // Wide hero images
        'square': '1 / 1',
      },
    },
  },
  plugins: [
    typography,
    animatePlugin
  ],
};

export default config;
