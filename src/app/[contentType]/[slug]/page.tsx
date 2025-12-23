import { notFound } from 'next/navigation';
import { MDXRemote } from 'next-mdx-remote/rsc';
import Image from 'next/image';
import Link from 'next/link';
import { format } from 'date-fns';
import { contentConfig } from '@/config/content.config';
import {
  getContentBySlug,
  getAllContentSlugs,
  isValidContentType,
  getContent,
} from '@/lib/content';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import {
  Breadcrumbs,
  generateContentBreadcrumbs,
} from '@/components/Breadcrumbs';
import ContentCard from '@/components/layout/ContentCard';
import AudioPlayer from '@/components/AudioPlayer';
import { Clock, Calendar, User, ArrowLeft } from 'lucide-react';

interface PageProps {
  params: Promise<{ contentType: string; slug: string }>;
}

export async function generateStaticParams() {
  const slugs = await getAllContentSlugs();
  return slugs;
}

export async function generateMetadata({ params }: PageProps) {
  const { contentType, slug } = await params;
  const item = await getContentBySlug(contentType, slug);

  if (!item) {
    return { title: 'Not Found' };
  }

  return {
    title: item.meta.title,
    description: item.meta.summary,
    openGraph: {
      title: item.meta.title,
      description: item.meta.summary,
      images: item.meta.image ? [item.meta.image] : [],
      type: 'article',
      publishedTime: item.meta.date,
      authors: item.meta.author ? [item.meta.author] : [],
      tags: item.meta.tags,
    },
  };
}

// Calculate reading time
function getReadingTime(content: string): number {
  const wordsPerMinute = 200;
  const words = content.trim().split(/\s+/).length;
  return Math.ceil(words / wordsPerMinute);
}

export default async function ContentDetailPage({ params }: PageProps) {
  const { contentType, slug } = await params;

  if (!isValidContentType(contentType)) {
    notFound();
  }

  const item = await getContentBySlug(contentType, slug);

  if (!item) {
    notFound();
  }

  const config = contentConfig.types[contentType];
  const detailConfig = config.detail || {};
  const breadcrumbs = generateContentBreadcrumbs(config, item.meta.title);
  const readingTime = getReadingTime(item.content);

  // Get related content (same type, different slug)
  const { items: relatedItems } = await getContent({
    contentType,
    pageSize: 4,
  });
  const related = relatedItems.filter((i) => i.slug !== slug).slice(0, 3);

  return (
    <article className="min-h-screen">
      {/* Hero Section */}
      <header className="relative">
        {/* Featured Image */}
        {detailConfig.showImage !== false && item.meta.image && (
          <div className="relative w-full aspect-editorial-wide overflow-hidden bg-muted">
            <Image
              src={item.meta.image}
              alt={item.meta.title}
              fill
              className="object-cover"
              priority
            />
            {/* Gradient overlay */}
            <div className="absolute inset-0 bg-gradient-to-t from-background via-background/20 to-transparent" />
          </div>
        )}

        {/* Content overlay / Header content */}
        <div
          className={`${
            item.meta.image
              ? 'absolute bottom-0 left-0 right-0'
              : 'bg-gradient-to-b from-muted/50 to-background'
          } py-section-sm`}
        >
          <div className="max-w-reading mx-auto px-gutter lg:px-gutter-lg">
            {/* Breadcrumbs */}
            <Breadcrumbs
              items={breadcrumbs}
              className={`mb-content ${item.meta.image ? 'text-white/80' : ''}`}
            />

            {/* Category */}
            <Link
              href={`/${contentType}`}
              className={`text-overline uppercase tracking-wider ${
                item.meta.image
                  ? 'text-white/90 hover:text-white'
                  : 'text-primary hover:text-primary/80'
              } transition-colors duration-200 mb-4 inline-block`}
            >
              {config.namePlural}
            </Link>

            {/* Title */}
            <h1
              className={`font-heading text-display tracking-tight leading-tight mb-6 animate-fade-in ${
                item.meta.image ? 'text-white' : 'text-foreground'
              }`}
            >
              {item.meta.title}
            </h1>

            {/* Summary */}
            {item.meta.summary && (
              <p
                className={`text-body-lg max-w-2xl mb-6 animate-fade-in ${
                  item.meta.image ? 'text-white/80' : 'text-muted-foreground'
                }`}
                style={{ animationDelay: '100ms' }}
              >
                {item.meta.summary}
              </p>
            )}

            {/* Meta row */}
            <div
              className={`flex flex-wrap items-center gap-4 text-caption animate-fade-in ${
                item.meta.image ? 'text-white/70' : 'text-muted-foreground'
              }`}
              style={{ animationDelay: '200ms' }}
            >
              {detailConfig.showAuthor !== false && item.meta.author && (
                <span className="flex items-center gap-1.5">
                  <User className="h-3.5 w-3.5" />
                  <span className={item.meta.image ? 'text-white/90' : 'text-foreground'}>
                    {item.meta.author}
                  </span>
                </span>
              )}
              {detailConfig.showDate !== false && item.meta.date && (
                <span className="flex items-center gap-1.5">
                  <Calendar className="h-3.5 w-3.5" />
                  <time dateTime={item.meta.date}>
                    {format(new Date(item.meta.date), 'MMMM d, yyyy')}
                  </time>
                </span>
              )}
              <span className="flex items-center gap-1.5">
                <Clock className="h-3.5 w-3.5" />
                {readingTime} min read
              </span>
            </div>
          </div>
        </div>
      </header>

      {/* Audio player */}
      {detailConfig.showAudio !== false && item.meta.audioUrl && (
        <div className="max-w-reading mx-auto px-gutter lg:px-gutter-lg py-content">
          <AudioPlayer audioUrl={item.meta.audioUrl} />
        </div>
      )}

      {/* Main Content */}
      <div className="py-section-sm">
        <div className="max-w-reading mx-auto px-gutter lg:px-gutter-lg">
          {/* Prose content */}
          <div className="prose-editorial animate-fade-in" style={{ animationDelay: '300ms' }}>
            <MDXRemote source={item.content} />
          </div>

          {/* Optional virtue/moral card for educational content */}
          {detailConfig.showVirtue && item.meta.virtue && (
            <Card className="bg-accent/10 border-accent/30 mt-section-sm animate-fade-in">
              <CardContent className="p-8 text-center">
                <span className="text-overline uppercase text-accent tracking-wider block mb-2">
                  Moral of the Story
                </span>
                <p className="font-heading text-title text-accent italic">
                  &ldquo;{item.meta.virtue}&rdquo;
                </p>
              </CardContent>
            </Card>
          )}

          {/* Tags */}
          {detailConfig.showTags !== false &&
            item.meta.tags &&
            item.meta.tags.length > 0 && (
              <div className="mt-section-sm pt-content border-t border-border">
                <h3 className="text-overline uppercase text-muted-foreground tracking-wider mb-4">
                  Tagged with
                </h3>
                <div className="flex gap-2 flex-wrap">
                  {item.meta.tags.map((tag) => (
                    <Link key={tag} href={`/tags/${tag}`}>
                      <Badge
                        variant="secondary"
                        className="cursor-pointer hover:bg-primary hover:text-primary-foreground transition-colors duration-200"
                      >
                        {tag}
                      </Badge>
                    </Link>
                  ))}
                </div>
              </div>
            )}
        </div>
      </div>

      {/* Related Content */}
      {related.length > 0 && (
        <section className="py-section bg-muted/30 border-t border-border">
          <div className="max-w-content mx-auto px-gutter lg:px-gutter-lg">
            <div className="flex items-center justify-between mb-content">
              <h2 className="font-heading text-headline text-foreground">
                More {config.namePlural}
              </h2>
              <Link
                href={`/${contentType}`}
                className="group inline-flex items-center gap-2 text-caption font-medium text-muted-foreground hover:text-foreground transition-colors duration-200"
              >
                View all
                <ArrowLeft className="h-4 w-4 rotate-180 transition-transform duration-200 group-hover:translate-x-1" />
              </Link>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-content">
              {related.map((relatedItem, index) => (
                <ContentCard
                  key={`${relatedItem.contentType}-${relatedItem.slug}`}
                  item={relatedItem}
                  contentType={contentType}
                  showTags
                  className="animate-fade-in"
                  style={{ animationDelay: `${index * 100}ms` }}
                />
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Back link */}
      <div className="py-content border-t border-border">
        <div className="max-w-content mx-auto px-gutter lg:px-gutter-lg">
          <Link
            href={`/${contentType}`}
            className="inline-flex items-center gap-2 text-caption font-medium text-muted-foreground hover:text-foreground transition-colors duration-200"
          >
            <ArrowLeft className="h-4 w-4" />
            Back to all {config.namePlural.toLowerCase()}
          </Link>
        </div>
      </div>
    </article>
  );
}
