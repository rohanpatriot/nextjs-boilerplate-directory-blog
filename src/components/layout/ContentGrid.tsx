import React from 'react';
import { ContentItem } from '@/lib/content/types';
import { cn } from '@/lib/utils';
import ContentCard from './ContentCard';

type LayoutVariant = 'default' | 'featured' | 'magazine' | 'compact-list';

interface ContentGridProps {
  items: ContentItem[];
  contentType?: string;
  layout?: LayoutVariant;
  showTags?: boolean;
  className?: string;
}

export default function ContentGrid({
  items,
  contentType,
  layout = 'default',
  showTags = false,
  className = '',
}: ContentGridProps) {
  if (items.length === 0) {
    return (
      <div className="text-center py-section-sm">
        <p className="text-muted-foreground text-body-lg">No content found.</p>
      </div>
    );
  }

  // Magazine layout: First item featured, rest in grid
  if (layout === 'magazine' && items.length > 0) {
    const [featured, ...rest] = items;

    return (
      <div className={cn('space-y-content', className)}>
        {/* Featured item */}
        <ContentCard
          item={featured}
          contentType={contentType}
          variant="featured"
          showTags={showTags}
          className="animate-fade-in"
        />

        {/* Rest in grid */}
        {rest.length > 0 && (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-content">
            {rest.map((item, index) => (
              <ContentCard
                key={`${item.contentType}-${item.slug}`}
                item={item}
                contentType={contentType}
                showTags={showTags}
                className="animate-fade-in"
                style={{ animationDelay: `${(index + 1) * 100}ms` }}
              />
            ))}
          </div>
        )}
      </div>
    );
  }

  // Featured layout: All items as featured cards
  if (layout === 'featured') {
    return (
      <div className={cn('grid grid-cols-1 lg:grid-cols-2 gap-content', className)}>
        {items.map((item, index) => (
          <ContentCard
            key={`${item.contentType}-${item.slug}`}
            item={item}
            contentType={contentType}
            variant="featured"
            showTags={showTags}
            className="animate-fade-in"
            style={{ animationDelay: `${index * 100}ms` }}
          />
        ))}
      </div>
    );
  }

  // Compact list layout
  if (layout === 'compact-list') {
    return (
      <div className={cn('divide-y divide-border', className)}>
        {items.map((item, index) => (
          <ContentCard
            key={`${item.contentType}-${item.slug}`}
            item={item}
            contentType={contentType}
            variant="compact"
            showTags={showTags}
            className="animate-fade-in"
            style={{ animationDelay: `${index * 50}ms` }}
          />
        ))}
      </div>
    );
  }

  // Default grid layout
  return (
    <div
      className={cn(
        'grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-content',
        className
      )}
    >
      {items.map((item, index) => (
        <ContentCard
          key={`${item.contentType}-${item.slug}`}
          item={item}
          contentType={contentType}
          showTags={showTags}
          className="animate-fade-in"
          style={{ animationDelay: `${index * 100}ms` }}
        />
      ))}
    </div>
  );
}
