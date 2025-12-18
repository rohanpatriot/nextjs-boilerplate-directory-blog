import { getContentByTag, getAllTags } from '@/lib/content';
import ContentGrid from '@/components/layout/ContentGrid';
import { Button } from '@/components/ui/button';
import Link from 'next/link';

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

  return (
    <div className="max-w-4xl mx-auto py-8 px-4">
      <div className="mb-8 space-y-4">
        <Button asChild variant="outline">
          <Link href="/">← Back to Home</Link>
        </Button>
        <h1 className="text-3xl font-bold font-heading">
          Content tagged with &ldquo;{decodedTag}&rdquo;
        </h1>
        <p className="text-muted-foreground">
          {content.length} {content.length === 1 ? 'item' : 'items'} found
        </p>
      </div>
      <ContentGrid items={content} />
    </div>
  );
}
