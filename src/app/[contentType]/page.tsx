import { notFound } from 'next/navigation';
import { contentConfig } from '@/config/content.config';
import {
  getContent,
  getTagsForType,
  getContentTypes,
  isValidContentType,
} from '@/lib/content';
import ContentGrid from '@/components/layout/ContentGrid';
import { Button } from '@/components/ui/button';
import Link from 'next/link';

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

  return (
    <div className="max-w-4xl mx-auto py-8 px-4">
      <div className="mb-8 space-y-4">
        <Button asChild variant="outline">
          <Link href="/">← Back to Home</Link>
        </Button>
        <h1 className="text-4xl font-bold font-heading">{config.namePlural}</h1>
      </div>

      {/* Tag filters */}
      {Object.keys(allTags).length > 0 && (
        <div className="flex flex-wrap gap-2 mb-8">
          {Object.entries(allTags).map(([tag, count]) => {
            const isActive = tags?.includes(tag);
            const newTags = isActive
              ? tags?.filter((t) => t !== tag)
              : [...(tags || []), tag];
            const href =
              newTags && newTags.length > 0
                ? `/${contentType}?tags=${newTags.join(',')}`
                : `/${contentType}`;

            return (
              <Link key={tag} href={href}>
                <span
                  className={`px-3 py-1 rounded-full text-sm cursor-pointer transition-colors ${
                    isActive
                      ? 'bg-primary text-primary-foreground'
                      : 'bg-muted text-muted-foreground hover:bg-muted/80'
                  }`}
                >
                  {tag} ({count})
                </span>
              </Link>
            );
          })}
        </div>
      )}

      <ContentGrid items={items} contentType={contentType} />

      {/* Pagination */}
      {pagination.totalPages > 1 && (
        <div className="flex justify-center gap-2 mt-8">
          {pagination.hasPrevPage && (
            <Link href={`/${contentType}?page=${pagination.page - 1}`}>
              <Button variant="outline">Previous</Button>
            </Link>
          )}
          <span className="flex items-center px-4 text-sm text-muted-foreground">
            Page {pagination.page} of {pagination.totalPages}
          </span>
          {pagination.hasNextPage && (
            <Link href={`/${contentType}?page=${pagination.page + 1}`}>
              <Button variant="outline">Next</Button>
            </Link>
          )}
        </div>
      )}
    </div>
  );
}
