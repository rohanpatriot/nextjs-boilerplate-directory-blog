'use client';

import { useEffect, useState, useCallback } from 'react';
import { useRouter } from 'next/navigation';
import { File, Tag } from 'lucide-react';
import {
  CommandDialog,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from '@/components/ui/command';
import { getAllContentForSearch } from '@/lib/actions/search';
import { ContentItem } from '@/lib/content/types';
import { contentConfig } from '@/config/content.config';

interface CommandPaletteProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export function CommandPalette({ open, onOpenChange }: CommandPaletteProps) {
  const router = useRouter();
  const [allContent, setAllContent] = useState<Omit<ContentItem, 'content'>[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [hasLoaded, setHasLoaded] = useState(false);

  // Load all content when the palette opens (only once)
  useEffect(() => {
    if (open && !hasLoaded) {
      setIsLoading(true);
      getAllContentForSearch()
        .then((items) => {
          setAllContent(items);
          setHasLoaded(true);
        })
        .catch((error) => {
          console.error('Failed to load content:', error);
          setHasLoaded(true); // Mark as loaded even on error to prevent retry loop
        })
        .finally(() => {
          setIsLoading(false);
        });
    }
  }, [open, hasLoaded]);

  // Clear content when dialog closes to free memory
  useEffect(() => {
    if (!open && allContent.length > 0) {
      setAllContent([]);
      setHasLoaded(false);
    }
  }, [open, allContent.length]);

  const handleSelect = useCallback(
    (contentType: string, slug: string) => {
      onOpenChange(false);
      router.push(`/${contentType}/${slug}`);
    },
    [onOpenChange, router]
  );

  // Group content by type
  const contentByType = allContent.reduce((acc, item) => {
    if (!acc[item.contentType]) {
      acc[item.contentType] = [];
    }
    acc[item.contentType].push(item);
    return acc;
  }, {} as Record<string, Array<Omit<ContentItem, 'content'>>>);

  return (
    <CommandDialog open={open} onOpenChange={onOpenChange}>
      <CommandInput placeholder="Search content by title or summary..." />
      <CommandList>
        {isLoading ? (
          <div className="py-6 text-center text-sm text-muted-foreground">
            Loading content...
          </div>
        ) : (
          <>
            <CommandEmpty>No results found.</CommandEmpty>
            
            {Object.entries(contentByType).map(([type, items]) => {
              const typeConfig = contentConfig.types[type];
              if (!typeConfig) return null;

              return (
                <CommandGroup
                  key={type}
                  heading={typeConfig.namePlural}
                >
                  {items.map((item) => (
                    <CommandItem
                      key={`${item.contentType}-${item.slug}`}
                      value={`${item.contentType}/${item.slug} ${item.meta.title} ${item.meta.summary || ''} ${item.meta.tags?.join(' ') || ''}`}
                      onSelect={() => handleSelect(item.contentType, item.slug)}
                      className="flex items-start gap-3 py-3"
                    >
                      <File className="h-4 w-4 mt-0.5 shrink-0 opacity-50" />
                      <div className="flex-1 overflow-hidden">
                        <div className="font-medium truncate">
                          {item.meta.title}
                        </div>
                        {item.meta.summary && (
                          <div className="text-xs text-muted-foreground line-clamp-1 mt-0.5">
                            {item.meta.summary}
                          </div>
                        )}
                        {item.meta.tags && item.meta.tags.length > 0 && (
                          <div className="flex items-center gap-1 mt-1.5 flex-wrap">
                            {item.meta.tags.slice(0, 3).map((tag) => (
                              <span
                                key={tag}
                                className="inline-flex items-center gap-1 text-xs text-muted-foreground"
                              >
                                <Tag className="h-2.5 w-2.5" />
                                {tag}
                              </span>
                            ))}
                            {item.meta.tags.length > 3 && (
                              <span className="text-xs text-muted-foreground">
                                +{item.meta.tags.length - 3}
                              </span>
                            )}
                          </div>
                        )}
                      </div>
                    </CommandItem>
                  ))}
                </CommandGroup>
              );
            })}
          </>
        )}
      </CommandList>
    </CommandDialog>
  );
}
