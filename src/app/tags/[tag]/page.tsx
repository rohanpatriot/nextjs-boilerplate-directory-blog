import { getContentByTag, getAllTags } from '@/lib/content';
import ContentGrid from '@/components/layout/ContentGrid';
import { Breadcrumbs, generateTagBreadcrumbs } from '@/components/Breadcrumbs';
import { Badge } from '@/components/ui/badge';
import Link from 'next/link';
import { Tag } from 'lucide-react';

interface PageProps {
  params: Promise<{ tag: string }>;
}

export async function generateStaticParams() {
  const tags = await getAllTags();
  return tags.map((tag) => ({
    tag: tag,
  }));
}

export async function generateMetadata({ params }: PageProps) {
  const { tag } = await params;
  const decodedTag = decodeURIComponent(tag);

  return {
    title: `Content tagged with "${decodedTag}"`,
    description: `Browse all content tagged with ${decodedTag}`,
  };
}

export default async function TagPage({ params }: PageProps) {
  const { tag } = await params;
  const decodedTag = decodeURIComponent(tag);
  const content = await getContentByTag(decodedTag);
  const allTags = await getAllTags();
  const breadcrumbs = generateTagBreadcrumbs(decodedTag);

  // Get other popular tags (excluding current)
  const otherTags = allTags.filter((t) => t !== decodedTag).slice(0, 8);

  return (
    <div className="min-h-screen">
      {/* Hero Header */}
      <section className="py-section-sm bg-gradient-to-b from-muted/50 to-background border-b border-border">
        <div className="max-w-content mx-auto px-gutter lg:px-gutter-lg">
          {/* Breadcrumbs */}
          <Breadcrumbs items={breadcrumbs} className="mb-content" />

          {/* Tag icon and label */}
          <div className="flex items-center gap-3 mb-4">
            <div className="p-2 rounded-lg bg-primary/10">
              <Tag className="h-5 w-5 text-primary" />
            </div>
            <span className="text-overline uppercase text-muted-foreground tracking-wider">
              Tag
            </span>
          </div>

          {/* Title */}
          <h1 className="font-heading text-display tracking-tight text-foreground mb-4 animate-fade-in">
            {decodedTag}
          </h1>

          <p
            className="text-body-lg text-muted-foreground max-w-reading animate-fade-in"
            style={{ animationDelay: '100ms' }}
          >
            Explore all content tagged with &ldquo;{decodedTag}&rdquo;.
          </p>

          {/* Result count */}
          <p
            className="text-caption text-muted-foreground mt-4 animate-fade-in"
            style={{ animationDelay: '200ms' }}
          >
            {content.length} {content.length === 1 ? 'item' : 'items'} found
          </p>
        </div>
      </section>

      {/* Content */}
      <section className="py-section-sm">
        <div className="max-w-content mx-auto px-gutter lg:px-gutter-lg">
          <div className="grid grid-cols-1 lg:grid-cols-4 gap-content-lg">
            {/* Main Content */}
            <main className="lg:col-span-3">
              {content.length > 0 ? (
                <ContentGrid items={content} layout="magazine" showTags />
              ) : (
                <div className="text-center py-section">
                  <p className="text-body-lg text-muted-foreground">
                    No content found with this tag.
                  </p>
                </div>
              )}
            </main>

            {/* Sidebar - Other Tags */}
            <aside className="lg:col-span-1">
              <div className="sticky top-24 p-6 bg-card rounded-lg border border-border">
                <h2 className="font-heading text-title-sm font-semibold text-foreground mb-4">
                  Other Tags
                </h2>
                <div className="flex flex-wrap gap-2">
                  {otherTags.map((otherTag) => (
                    <Link key={otherTag} href={`/tags/${encodeURIComponent(otherTag)}`}>
                      <Badge
                        variant="outline"
                        className="cursor-pointer hover:bg-muted hover:border-primary/50 transition-colors duration-200"
                      >
                        {otherTag}
                      </Badge>
                    </Link>
                  ))}
                </div>

                {allTags.length > otherTags.length + 1 && (
                  <p className="text-micro text-muted-foreground mt-4">
                    + {allTags.length - otherTags.length - 1} more tags
                  </p>
                )}
              </div>
            </aside>
          </div>
        </div>
      </section>
    </div>
  );
}
