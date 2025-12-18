import { notFound } from 'next/navigation';
import { MDXRemote } from 'next-mdx-remote/rsc';
import Image from 'next/image';
import Link from 'next/link';
import { contentConfig } from '@/config/content.config';
import {
  getContentBySlug,
  getAllContentSlugs,
  isValidContentType,
} from '@/lib/content';
import { Card, CardContent, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import AudioPlayer from '@/components/AudioPlayer';

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

  return (
    <div className="max-w-3xl mx-auto py-8 px-4 sm:px-6 lg:px-8">
      {/* Back button */}
      <div className="mb-6">
        <Button asChild variant="outline">
          <Link href={`/${contentType}`}>← Back to {config.namePlural}</Link>
        </Button>
      </div>

      {/* Featured image */}
      {detailConfig.showImage !== false && item.meta.image && (
        <div className="relative w-full h-80 mb-8 overflow-hidden rounded-lg">
          <Image
            src={item.meta.image}
            alt={item.meta.title}
            fill
            style={{ objectFit: 'cover', objectPosition: 'top' }}
            className="rounded-lg"
            priority
          />
        </div>
      )}

      {/* Audio player */}
      {detailConfig.showAudio !== false && item.meta.audioUrl && (
        <AudioPlayer audioUrl={item.meta.audioUrl} />
      )}

      {/* Title */}
      <h1 className="text-4xl font-bold mb-4 font-heading">{item.meta.title}</h1>

      {/* Meta info */}
      {(detailConfig.showDate || detailConfig.showAuthor) && (
        <div className="flex gap-4 text-sm text-muted-foreground mb-6">
          {detailConfig.showDate && item.meta.date && (
            <time dateTime={item.meta.date}>
              {new Date(item.meta.date).toLocaleDateString('en-US', {
                year: 'numeric',
                month: 'long',
                day: 'numeric',
              })}
            </time>
          )}
          {detailConfig.showAuthor && item.meta.author && (
            <span>By {item.meta.author}</span>
          )}
        </div>
      )}

      {/* Content */}
      <div className="prose prose-lg max-w-none">
        <MDXRemote source={item.content} />
      </div>

      {/* Virtue card for stories */}
      {detailConfig.showVirtue && item.meta.virtue && (
        <Card className="bg-accent text-accent-foreground mt-8">
          <CardContent className="p-6">
            <CardTitle className="mb-2 p-4 italic font-heading">
              {item.meta.virtue}
            </CardTitle>
          </CardContent>
        </Card>
      )}

      {/* Tags */}
      {detailConfig.showTags !== false && item.meta.tags && item.meta.tags.length > 0 && (
        <div className="mt-8 flex gap-2 flex-wrap">
          {item.meta.tags.map((tag) => (
            <Link key={tag} href={`/tags/${tag}`}>
              <Badge variant="secondary" className="cursor-pointer hover:bg-secondary/80 transition-colors">
                {tag}
              </Badge>
            </Link>
          ))}
        </div>
      )}
    </div>
  );
}
