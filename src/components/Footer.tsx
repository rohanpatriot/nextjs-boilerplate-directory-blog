import Link from 'next/link';
import { Rss } from 'lucide-react';
import { contentConfig } from '@/config/content.config';
import { directoryConfig, seoConfig } from '@/config/directory.config';
import { Separator } from '@/components/ui/separator';

export function Footer() {
  const contentTypes = Object.values(contentConfig.types);
  const currentYear = new Date().getFullYear();

  return (
    <footer className="border-t border-border bg-muted/30">
      <div className="max-w-content mx-auto px-gutter lg:px-gutter-lg">
        {/* Main Footer Content */}
        <div className="py-section-sm grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-content">
          {/* Brand Column */}
          <div className="lg:col-span-2">
            <Link href="/" className="inline-block group">
              <h3 className="font-heading text-title font-semibold text-foreground group-hover:text-primary transition-colors duration-200">
                {directoryConfig.name}
              </h3>
            </Link>
            <p className="mt-4 text-body text-muted-foreground max-w-sm">
              {directoryConfig.description}
            </p>

            {/* RSS Feed Link */}
            <Link
              href="/feed.xml"
              className="inline-flex items-center gap-2 mt-6 text-caption text-muted-foreground hover:text-foreground transition-colors duration-200"
            >
              <Rss className="h-4 w-4" />
              <span>Subscribe via RSS</span>
            </Link>
          </div>

          {/* Navigation Column */}
          <div>
            <h4 className="text-overline uppercase text-muted-foreground mb-4">
              Browse
            </h4>
            <nav className="flex flex-col gap-3">
              <Link
                href="/"
                className="text-body text-foreground/80 hover:text-foreground transition-colors duration-200"
              >
                Home
              </Link>
              {contentTypes.map((type) => (
                <Link
                  key={type.slug}
                  href={`/${type.slug}`}
                  className="text-body text-foreground/80 hover:text-foreground transition-colors duration-200"
                >
                  {type.namePlural}
                </Link>
              ))}
            </nav>
          </div>

          {/* Resources Column */}
          <div>
            <h4 className="text-overline uppercase text-muted-foreground mb-4">
              Resources
            </h4>
            <nav className="flex flex-col gap-3">
              <Link
                href="/feed.xml"
                className="text-body text-foreground/80 hover:text-foreground transition-colors duration-200"
              >
                RSS Feed
              </Link>
              <Link
                href="/sitemap.xml"
                className="text-body text-foreground/80 hover:text-foreground transition-colors duration-200"
              >
                Sitemap
              </Link>
            </nav>
          </div>
        </div>

        <Separator className="bg-border" />

        {/* Copyright Bar */}
        <div className="py-6 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-caption text-muted-foreground">
            &copy; {currentYear} {seoConfig.siteName}. All rights reserved.
          </p>

          {/* Social Links - if configured */}
          {seoConfig.socialLinks && seoConfig.socialLinks.length > 0 && (
            <div className="flex items-center gap-4">
              {seoConfig.socialLinks.map((link, index) => (
                <a
                  key={index}
                  href={link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-muted-foreground hover:text-foreground transition-colors duration-200"
                >
                  {/* Extract domain name for display */}
                  {new URL(link).hostname.replace('www.', '')}
                </a>
              ))}
            </div>
          )}
        </div>
      </div>
    </footer>
  );
}
