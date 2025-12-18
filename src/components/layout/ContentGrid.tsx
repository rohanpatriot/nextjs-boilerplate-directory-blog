import React from 'react';
import { ContentItem } from '@/lib/content/types';
import ContentCard from './ContentCard';

interface ContentGridProps {
  items: ContentItem[];
  contentType?: string;
  className?: string;
}

export default function ContentGrid({
  items,
  contentType,
  className = '',
}: ContentGridProps) {
  return (
    <div
      className={`grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 ${className}`}
    >
      {items.map((item) => (
        <ContentCard
          key={`${item.contentType}-${item.slug}`}
          item={item}
          contentType={contentType}
        />
      ))}
    </div>
  );
}
