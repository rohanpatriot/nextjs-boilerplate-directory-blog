import { getContent } from '@/lib/content';
import { directoryConfig } from '@/config/directory.config';
import { contentConfig } from '@/config/content.config';
import Search from '@/components/Search';
import Link from 'next/link';
import { Button } from '@/components/ui/button';

export default async function Home() {
  const { items } = await getContent({ pageSize: 50 });

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-background p-4">
      <div className="max-w-4xl w-full space-y-8">
        <header className="text-center space-y-4">
          <h1 className="text-4xl font-bold tracking-tighter font-heading">
            {directoryConfig.name}
          </h1>
          <p className="text-muted-foreground text-lg">
            {directoryConfig.description}
          </p>
        </header>

        {/* Content type navigation */}
        <nav className="flex justify-center gap-4">
          {Object.values(contentConfig.types).map((type) => (
            <Link key={type.slug} href={`/${type.slug}`}>
              <Button variant="outline">{type.namePlural}</Button>
            </Link>
          ))}
        </nav>

        <main className="space-y-8">
          <Search items={items} />
        </main>
      </div>
    </div>
  );
}
