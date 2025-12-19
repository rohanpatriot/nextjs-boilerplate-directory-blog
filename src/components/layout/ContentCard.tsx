import Image from 'next/image';
import Link from 'next/link';
import { formatDistanceToNow } from 'date-fns';
import { cn } from '@/lib/utils';
import { ContentItem } from '@/lib/content/types';
import { Badge } from '@/components/ui/badge';

interface ContentCardProps {
  item: ContentItem;
  contentType?: string;
  variant?: 'default' | 'featured' | 'compact';
  showImage?: boolean;
  showSummary?: boolean;
  showDate?: boolean;
  showTags?: boolean;
  className?: string;
  style?: React.CSSProperties;
}

export default function ContentCard({
  item,
  contentType,
  variant = 'default',
  showImage = true,
  showSummary = true,
  showDate = true,
  showTags = false,
  className,
  style,
}: ContentCardProps) {
  const { slug, meta } = item;
  const type = contentType || item.contentType || 'articles';
  const href = `/${type}/${slug}`;

  // Format date if available
  const formattedDate = meta.date
    ? formatDistanceToNow(new Date(meta.date), { addSuffix: true })
    : null;

  if (variant === 'featured') {
    return (
      <Link href={href} className={cn('group block', className)} style={style}>
        <article className="relative overflow-hidden rounded-lg bg-card">
          {/* Featured Image */}
          {meta.image && showImage && (
            <div className="aspect-editorial relative overflow-hidden">
              <Image
                src={meta.image}
                alt={meta.title}
                fill
                className="object-cover transition-transform duration-500 ease-editorial group-hover:scale-105"
              />
              {/* Gradient overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent" />
            </div>
          )}

          {/* Content overlay */}
          <div className="absolute bottom-0 left-0 right-0 p-6 md:p-8">
            {/* Category/Type label */}
            <span className="text-overline uppercase text-white/80 mb-2 block">
              {type}
            </span>

            <h2 className="font-heading text-headline-sm md:text-headline font-semibold text-white leading-tight mb-3 group-hover:text-white/90 transition-colors duration-200">
              {meta.title}
            </h2>

            {meta.summary && showSummary && (
              <p className="text-body text-white/80 line-clamp-2 mb-4 max-w-2xl">
                {meta.summary}
              </p>
            )}

            {/* Meta info */}
            <div className="flex items-center gap-4 text-caption text-white/70">
              {meta.author && <span>{meta.author}</span>}
              {formattedDate && showDate && (
                <>
                  {meta.author && <span className="text-white/40">·</span>}
                  <time dateTime={meta.date}>{formattedDate}</time>
                </>
              )}
            </div>
          </div>
        </article>
      </Link>
    );
  }

  if (variant === 'compact') {
    return (
      <Link href={href} className={cn('group block', className)} style={style}>
        <article className="flex gap-4 py-4 border-b border-border last:border-0">
          {/* Small thumbnail */}
          {meta.image && showImage && (
            <div className="w-20 h-20 flex-shrink-0 relative rounded overflow-hidden">
              <Image
                src={meta.image}
                alt={meta.title}
                fill
                className="object-cover transition-transform duration-300 group-hover:scale-105"
              />
            </div>
          )}

          <div className="flex-1 min-w-0">
            <h3 className="font-heading text-title-sm font-medium text-foreground group-hover:text-primary transition-colors duration-200 line-clamp-2">
              {meta.title}
            </h3>
            {formattedDate && showDate && (
              <time
                dateTime={meta.date}
                className="text-micro text-muted-foreground mt-1 block"
              >
                {formattedDate}
              </time>
            )}
          </div>
        </article>
      </Link>
    );
  }

  // Default variant
  return (
    <Link href={href} className={cn('group block', className)} style={style}>
      <article className="h-full flex flex-col">
        {/* Image */}
        {meta.image && showImage && (
          <div className="aspect-card relative overflow-hidden rounded-lg mb-4">
            <Image
              src={meta.image}
              alt={meta.title}
              fill
              className="object-cover transition-transform duration-500 ease-editorial group-hover:scale-105"
            />
          </div>
        )}

        {/* Content */}
        <div className="flex-1 flex flex-col">
          {/* Category label */}
          <span className="text-overline uppercase text-primary mb-2">
            {type}
          </span>

          <h3 className="font-heading text-title font-medium text-foreground group-hover:text-primary transition-colors duration-200 line-clamp-2 mb-2">
            {meta.title}
          </h3>

          {meta.summary && showSummary && (
            <p className="text-body text-muted-foreground line-clamp-2 mb-4 flex-1">
              {meta.summary}
            </p>
          )}

          {/* Tags */}
          {showTags && meta.tags && meta.tags.length > 0 && (
            <div className="flex flex-wrap gap-2 mb-3">
              {meta.tags.slice(0, 3).map((tag) => (
                <Badge
                  key={tag}
                  variant="secondary"
                  className="text-micro font-normal"
                >
                  {tag}
                </Badge>
              ))}
            </div>
          )}

          {/* Meta info */}
          <div className="flex items-center gap-3 text-caption text-muted-foreground mt-auto pt-2 border-t border-border">
            {meta.author && (
              <span className="font-medium text-foreground/80">
                {meta.author}
              </span>
            )}
            {formattedDate && showDate && (
              <>
                {meta.author && <span className="text-border">·</span>}
                <time dateTime={meta.date}>{formattedDate}</time>
              </>
            )}
          </div>
        </div>
      </article>
    </Link>
  );
}
