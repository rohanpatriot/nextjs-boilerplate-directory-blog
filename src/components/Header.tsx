'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Menu, Search, Command } from 'lucide-react';
import { cn } from '@/lib/utils';
import { contentConfig } from '@/config/content.config';
import { directoryConfig } from '@/config/directory.config';
import { Button } from '@/components/ui/button';
import { ThemeToggle } from '@/components/ThemeToggle';
import { MobileMenu } from '@/components/MobileMenu';
import { CommandPalette } from '@/components/CommandPalette';

export function Header() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isCommandPaletteOpen, setIsCommandPaletteOpen] = useState(false);
  const pathname = usePathname();

  // Get content types for navigation
  const contentTypes = Object.values(contentConfig.types);

  // Track scroll for header styling
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Handle keyboard shortcut for search
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
        e.preventDefault();
        setIsCommandPaletteOpen(true);
      }
    };

    document.addEventListener('keydown', handleKeyDown);
    return () => document.removeEventListener('keydown', handleKeyDown);
  }, []);

  const isActive = (href: string) => {
    if (href === '/') return pathname === '/';
    return pathname.startsWith(href);
  };

  return (
    <>
      <header
        className={cn(
          'fixed top-0 left-0 right-0 z-50',
          'transition-all duration-300 ease-editorial',
          isScrolled
            ? 'bg-background/80 backdrop-blur-lg border-b border-border shadow-editorial'
            : 'bg-transparent'
        )}
      >
        <div className="max-w-header mx-auto">
          <nav className="flex items-center justify-between h-16 md:h-20 px-gutter lg:px-gutter-lg">
            {/* Logo / Site Name */}
            <Link
              href="/"
              className="group flex items-center gap-2"
            >
              <span className="font-heading text-title-sm md:text-title font-semibold tracking-tight text-foreground group-hover:text-primary transition-colors duration-200">
                {directoryConfig.name}
              </span>
            </Link>

            {/* Desktop Navigation */}
            <div className="hidden md:flex items-center gap-1">
              {contentTypes.map((type) => (
                <Link
                  key={type.slug}
                  href={`/${type.slug}`}
                  className={cn(
                    'relative px-4 py-2 text-body font-medium transition-colors duration-200',
                    isActive(`/${type.slug}`)
                      ? 'text-foreground'
                      : 'text-muted-foreground hover:text-foreground'
                  )}
                >
                  {type.namePlural}
                  {/* Active indicator */}
                  {isActive(`/${type.slug}`) && (
                    <span className="absolute bottom-0 left-4 right-4 h-0.5 bg-primary rounded-full" />
                  )}
                </Link>
              ))}
            </div>

            {/* Actions */}
            <div className="flex items-center gap-2">
              {/* Search Button */}
              <Button
                variant="ghost"
                size="sm"
                className="hidden sm:flex items-center gap-2 text-muted-foreground hover:text-foreground"
                onClick={() => setIsCommandPaletteOpen(true)}
              >
                <Search className="h-4 w-4" />
                <span className="text-caption hidden lg:inline">Search</span>
                <kbd className="hidden lg:inline-flex h-5 items-center gap-1 rounded border border-border bg-muted px-1.5 font-mono text-micro text-muted-foreground">
                  <Command className="h-3 w-3" />K
                </kbd>
              </Button>

              {/* Theme Toggle */}
              <ThemeToggle />

              {/* Mobile Menu Button */}
              <Button
                variant="ghost"
                size="icon"
                className="md:hidden"
                onClick={() => setIsMobileMenuOpen(true)}
                aria-label="Open menu"
              >
                <Menu className="h-5 w-5" />
              </Button>
            </div>
          </nav>
        </div>
      </header>

      {/* Mobile Menu */}
      <MobileMenu
        isOpen={isMobileMenuOpen}
        onClose={() => setIsMobileMenuOpen(false)}
        onOpenCommandPalette={() => setIsCommandPaletteOpen(true)}
        contentTypes={contentTypes}
        currentPath={pathname}
      />

      {/* Command Palette */}
      <CommandPalette
        open={isCommandPaletteOpen}
        onOpenChange={setIsCommandPaletteOpen}
      />

      {/* Spacer for fixed header */}
      <div className="h-16 md:h-20" />
    </>
  );
}
