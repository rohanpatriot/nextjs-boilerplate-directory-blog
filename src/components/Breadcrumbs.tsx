import Link from 'next/link';
import { ChevronRight, Home } from 'lucide-react';
import { cn } from '@/lib/utils';

export interface BreadcrumbItem {
  label: string;
  href?: string;
}

interface BreadcrumbsProps {
  items: BreadcrumbItem[];
  className?: string;
}

export function Breadcrumbs({ items, className }: BreadcrumbsProps) {
  return (
    <nav
      aria-label="Breadcrumb"
      className={cn('flex items-center gap-1 text-caption', className)}
    >
      {/* Home link */}
      <Link
        href="/"
        className="flex items-center text-muted-foreground hover:text-foreground transition-colors duration-200"
        aria-label="Home"
      >
        <Home className="h-3.5 w-3.5" />
      </Link>

      {items.map((item, index) => {
        const isLast = index === items.length - 1;

        return (
          <div key={index} className="flex items-center gap-1">
            <ChevronRight className="h-3.5 w-3.5 text-muted-foreground/50" />

            {isLast || !item.href ? (
              <span
                className={cn(
                  'truncate max-w-[200px] sm:max-w-[300px]',
                  isLast
                    ? 'text-foreground font-medium'
                    : 'text-muted-foreground'
                )}
                aria-current={isLast ? 'page' : undefined}
              >
                {item.label}
              </span>
            ) : (
              <Link
                href={item.href}
                className="text-muted-foreground hover:text-foreground transition-colors duration-200 truncate max-w-[200px] sm:max-w-[300px]"
              >
                {item.label}
              </Link>
            )}
          </div>
        );
      })}
    </nav>
  );
}

/**
 * Helper to generate breadcrumb items for content pages
 */
export function generateContentBreadcrumbs(
  contentType: { slug: string; namePlural: string },
  title?: string
): BreadcrumbItem[] {
  const items: BreadcrumbItem[] = [
    {
      label: contentType.namePlural,
      href: `/${contentType.slug}`,
    },
  ];

  if (title) {
    items.push({
      label: title,
    });
  }

  return items;
}

/**
 * Helper to generate breadcrumb items for tag pages
 */
export function generateTagBreadcrumbs(tag: string): BreadcrumbItem[] {
  return [
    {
      label: 'Tags',
    },
    {
      label: tag,
    },
  ];
}
