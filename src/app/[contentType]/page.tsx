import { notFound } from 'next/navigation';
import { contentConfig } from '@/config/content.config';
import {
  getContent,
  getTagsForType,
  getContentTypes,
  isValidContentType,
} from '@/lib/content';
import ContentGrid from '@/components/layout/ContentGrid';
import { Breadcrumbs, generateContentBreadcrumbs } from '@/components/Breadcrumbs';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import { ChevronLeft, ChevronRight, X } from 'lucide-react';

interface PageProps {
  params: Promise<{ contentType: string }>;
  searchParams: Promise<{
    page?: string;
    q?: string;
    tags?: string;
    sort?: string;
  }>;
}

export async function generateStaticParams() {
  return getContentTypes().map((type) => ({
    contentType: type,
  }));
}

export async function generateMetadata({ params }: PageProps) {
  const { contentType } = await params;
  const config = contentConfig.types[contentType];

  if (!config) {
    return { title: 'Not Found' };
  }

  return {
    title: config.namePlural,
    description: `Browse all ${config.namePlural.toLowerCase()}`,
  };
}

export default async function ContentTypePage({
  params,
  searchParams,
}: PageProps) {
  const { contentType } = await params;
  const searchParamsResolved = await searchParams;

  if (!isValidContentType(contentType)) {
    notFound();
  }

  const config = contentConfig.types[contentType];

  // Parse URL search params
  const page = parseInt(searchParamsResolved.page || '1');
  const query = searchParamsResolved.q;
  const tags = searchParamsResolved.tags?.split(',').filter(Boolean);
  const sortParts = searchParamsResolved.sort?.split(':');
  const sortBy = sortParts?.[0] as keyof typeof config.defaultSort;
  const sortOrder = sortParts?.[1] as 'asc' | 'desc';

  const { items, pagination } = await getContent({
    contentType,
    page,
    pageSize: config.pageSize || contentConfig.defaults.pageSize,
    query,
    tags,
    sortBy: sortBy || config.defaultSort?.field,
    sortOrder: sortOrder || config.defaultSort?.order,
  });

  const allTags = await getTagsForType(contentType);
  const breadcrumbs = generateContentBreadcrumbs(config);

  // Build URL helper for pagination with preserved params
  const buildUrl = (newPage: number) => {
    const params = new URLSearchParams();
    if (newPage > 1) params.set('page', String(newPage));
    if (tags?.length) params.set('tags', tags.join(','));
    if (query) params.set('q', query);
    if (sortBy) params.set('sort', `${sortBy}:${sortOrder || 'desc'}`);
    const queryString = params.toString();
    return `/${contentType}${queryString ? `?${queryString}` : ''}`;
  };

  return (
    <div className="min-h-screen">
      {/* Hero Header */}
      <section className="py-section-sm bg-gradient-to-b from-muted/50 to-background border-b border-border">
        <div className="max-w-content mx-auto px-gutter lg:px-gutter-lg">
          {/* Breadcrumbs */}
          <Breadcrumbs items={breadcrumbs} className="mb-content" />

          {/* Title */}
          <h1 className="font-heading text-display tracking-tight text-foreground mb-4 animate-fade-in">
            {config.namePlural}
          </h1>

          <p className="text-body-lg text-muted-foreground max-w-reading animate-fade-in" style={{ animationDelay: '100ms' }}>
            Explore our collection of {config.namePlural.toLowerCase()}.
          </p>

          {/* Result count */}
          <p className="text-caption text-muted-foreground mt-4 animate-fade-in" style={{ animationDelay: '200ms' }}>
            {pagination.totalItems} {pagination.totalItems === 1 ? 'item' : 'items'} found
            {tags && tags.length > 0 && ` in ${tags.length} selected ${tags.length === 1 ? 'tag' : 'tags'}`}
          </p>
        </div>
      </section>

      {/* Content */}
      <section className="py-section-sm">
        <div className="max-w-content mx-auto px-gutter lg:px-gutter-lg">
          <div className="grid grid-cols-1 lg:grid-cols-4 gap-content-lg">
            {/* Main Content */}
            <main className={Object.keys(allTags).length > 0 ? 'lg:col-span-3 lg:order-1' : 'lg:col-span-4'}>
              {items.length > 0 ? (
                <ContentGrid
                  items={items}
                  contentType={contentType}
                  layout={page === 1 ? 'magazine' : 'default'}
                  showTags
                />
              ) : (
                <div className="text-center py-section">
                  <p className="text-body-lg text-muted-foreground mb-4">
                    No {config.namePlural.toLowerCase()} found
                    {tags && tags.length > 0 && ' with the selected tags'}.
                  </p>
                  {tags && tags.length > 0 && (
                    <Link href={`/${contentType}`}>
                      <Button variant="outline">Clear filters</Button>
                    </Link>
                  )}
                </div>
              )}

              {/* Pagination */}
              {pagination.totalPages > 1 && (
                <nav
                  aria-label="Pagination"
                  className="flex items-center justify-center gap-2 mt-section-sm pt-content border-t border-border"
                >
                  <Button
                    variant="outline"
                    size="sm"
                    disabled={!pagination.hasPrevPage}
                    asChild={pagination.hasPrevPage}
                  >
                    {pagination.hasPrevPage ? (
                      <Link href={buildUrl(pagination.page - 1)}>
                        <ChevronLeft className="h-4 w-4 mr-1" />
                        Previous
                      </Link>
                    ) : (
                      <>
                        <ChevronLeft className="h-4 w-4 mr-1" />
                        Previous
                      </>
                    )}
                  </Button>

                  {/* Page numbers */}
                  <div className="flex items-center gap-1">
                    {Array.from({ length: pagination.totalPages }, (_, i) => i + 1)
                      .filter((p) => {
                        // Show first, last, current, and adjacent pages
                        return (
                          p === 1 ||
                          p === pagination.totalPages ||
                          Math.abs(p - pagination.page) <= 1
                        );
                      })
                      .map((p, idx, arr) => {
                        // Add ellipsis
                        const showEllipsisBefore = idx > 0 && arr[idx - 1] !== p - 1;
                        return (
                          <span key={p} className="flex items-center gap-1">
                            {showEllipsisBefore && (
                              <span className="px-2 text-muted-foreground">...</span>
                            )}
                            <Link href={buildUrl(p)}>
                              <Button
                                variant={p === pagination.page ? 'default' : 'ghost'}
                                size="sm"
                                className="w-9 h-9"
                              >
                                {p}
                              </Button>
                            </Link>
                          </span>
                        );
                      })}
                  </div>

                  <Button
                    variant="outline"
                    size="sm"
                    disabled={!pagination.hasNextPage}
                    asChild={pagination.hasNextPage}
                  >
                    {pagination.hasNextPage ? (
                      <Link href={buildUrl(pagination.page + 1)}>
                        Next
                        <ChevronRight className="h-4 w-4 ml-1" />
                      </Link>
                    ) : (
                      <>
                        Next
                        <ChevronRight className="h-4 w-4 ml-1" />
                      </>
                    )}
                  </Button>
                </nav>
              )}
            </main>

            {/* Sidebar - Tags */}
            {Object.keys(allTags).length > 0 && (
              <aside className="lg:col-span-1 lg:order-2">
                <div className="sticky top-24 p-6 bg-card rounded-lg border border-border">
                  <div className="flex items-center justify-between mb-4">
                    <h2 className="font-heading text-title-sm font-semibold text-foreground">
                      Filter by Tag
                    </h2>
                    {tags && tags.length > 0 && (
                      <Link
                        href={`/${contentType}`}
                        className="text-micro text-primary hover:underline"
                      >
                        Clear all
                      </Link>
                    )}
                  </div>

                  {/* Active tags */}
                  {tags && tags.length > 0 && (
                    <div className="flex flex-wrap gap-2 mb-4 pb-4 border-b border-border">
                      {tags.map((tag) => {
                        const newTags = tags.filter((t) => t !== tag);
                        const href =
                          newTags.length > 0
                            ? `/${contentType}?tags=${newTags.join(',')}`
                            : `/${contentType}`;

                        return (
                          <Link key={tag} href={href}>
                            <Badge
                              variant="default"
                              className="cursor-pointer group gap-1 pr-1"
                            >
                              {tag}
                              <X className="h-3 w-3 opacity-60 group-hover:opacity-100" />
                            </Badge>
                          </Link>
                        );
                      })}
                    </div>
                  )}

                  {/* All tags */}
                  <div className="flex flex-wrap gap-2">
                    {Object.entries(allTags).map(([tag, count]) => {
                      const isActive = tags?.includes(tag);
                      if (isActive) return null;

                      const newTags = [...(tags || []), tag];
                      const href = `/${contentType}?tags=${newTags.join(',')}`;

                      return (
                        <Link key={tag} href={href}>
                          <Badge
                            variant="outline"
                            className="cursor-pointer hover:bg-muted hover:border-primary/50 transition-colors duration-200"
                          >
                            {tag}
                            <span className="ml-1 text-muted-foreground">
                              ({count})
                            </span>
                          </Badge>
                        </Link>
                      );
                    })}
                  </div>
                </div>
              </aside>
            )}
          </div>
        </div>
      </section>
    </div>
  );
}
