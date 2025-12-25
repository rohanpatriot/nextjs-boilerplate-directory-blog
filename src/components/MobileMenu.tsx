'use client';

import Link from 'next/link';
import { X, Search, ArrowRight } from 'lucide-react';
import { cn } from '@/lib/utils';
import { directoryConfig } from '@/config/directory.config';
import { ContentTypeConfig } from '@/lib/content/types';
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetClose,
} from '@/components/ui/sheet';
import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';
import { ThemeToggle } from '@/components/ThemeToggle';

interface MobileMenuProps {
  isOpen: boolean;
  onClose: () => void;
  onOpenCommandPalette: () => void;
  contentTypes: ContentTypeConfig[];
  currentPath: string;
}

export function MobileMenu({
  isOpen,
  onClose,
  onOpenCommandPalette,
  contentTypes,
  currentPath,
}: MobileMenuProps) {
  const isActive = (href: string) => {
    if (href === '/') return currentPath === '/';
    return currentPath.startsWith(href);
  };

  return (
    <Sheet open={isOpen} onOpenChange={onClose}>
      <SheetContent
        side="right"
        className="w-full sm:w-[400px] p-0 bg-background border-l border-border"
      >
        <SheetHeader className="px-6 py-4 border-b border-border">
          <div className="flex items-center justify-between">
            <SheetTitle className="font-heading text-title-sm font-semibold">
              {directoryConfig.name}
            </SheetTitle>
            <SheetClose asChild>
              <Button variant="ghost" size="icon" className="h-8 w-8">
                <X className="h-4 w-4" />
                <span className="sr-only">Close menu</span>
              </Button>
            </SheetClose>
          </div>
        </SheetHeader>

        <div className="flex flex-col h-[calc(100vh-73px)]">
          {/* Search Button */}
          <div className="p-4">
            <Button
              variant="outline"
              className="w-full justify-start gap-3 h-12 text-muted-foreground"
              onClick={() => {
                onClose();
                onOpenCommandPalette();
              }}
            >
              <Search className="h-4 w-4" />
              <span>Search content...</span>
            </Button>
          </div>

          <Separator />

          {/* Navigation Links */}
          <nav className="flex-1 py-4">
            <div className="px-4 mb-2">
              <span className="text-overline uppercase text-muted-foreground">
                Browse
              </span>
            </div>

            {/* Home Link */}
            <Link
              href="/"
              onClick={onClose}
              className={cn(
                'flex items-center justify-between px-6 py-3 transition-colors duration-200',
                isActive('/')
                  ? 'bg-muted text-foreground'
                  : 'text-muted-foreground hover:bg-muted/50 hover:text-foreground'
              )}
            >
              <span className="font-medium">Home</span>
              {isActive('/') && (
                <span className="h-2 w-2 rounded-full bg-primary" />
              )}
            </Link>

            {/* Content Type Links */}
            {contentTypes.map((type) => (
              <Link
                key={type.slug}
                href={`/${type.slug}`}
                onClick={onClose}
                className={cn(
                  'group flex items-center justify-between px-6 py-3 transition-colors duration-200',
                  isActive(`/${type.slug}`)
                    ? 'bg-muted text-foreground'
                    : 'text-muted-foreground hover:bg-muted/50 hover:text-foreground'
                )}
              >
                <span className="font-medium">{type.namePlural}</span>
                <ArrowRight
                  className={cn(
                    'h-4 w-4 transition-transform duration-200',
                    isActive(`/${type.slug}`)
                      ? 'text-primary'
                      : 'opacity-0 -translate-x-2 group-hover:opacity-100 group-hover:translate-x-0'
                  )}
                />
              </Link>
            ))}
          </nav>

          <Separator />

          {/* Footer */}
          <div className="p-4 space-y-4">
            <div className="flex items-center justify-between">
              <span className="text-caption text-muted-foreground">
                Appearance
              </span>
              <ThemeToggle />
            </div>

            <p className="text-micro text-muted-foreground">
              {directoryConfig.description}
            </p>
          </div>
        </div>
      </SheetContent>
    </Sheet>
  );
}
