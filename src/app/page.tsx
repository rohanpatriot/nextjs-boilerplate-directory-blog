import { getContent } from '@/lib/content';
import { directoryConfig } from '@/config/directory.config';
import { contentConfig } from '@/config/content.config';
import ContentGrid from '@/components/layout/ContentGrid';
import ContentCard from '@/components/layout/ContentCard';
import Link from 'next/link';
import { ArrowRight } from 'lucide-react';

export default async function Home() {
  // Fetch all content, then organize by type
  const { items: allContent } = await getContent({ pageSize: 100 });
  const contentTypes = Object.values(contentConfig.types);

  // Get the most recent item for hero
  const heroItem = allContent[0];
  const remainingItems = allContent.slice(1);

  // Group content by type for sections
  const contentByType = contentTypes.reduce(
    (acc, type) => {
      acc[type.slug] = remainingItems.filter(
        (item) => item.contentType === type.slug
      );
      return acc;
    },
    {} as Record<string, typeof allContent>
  );

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative py-section bg-gradient-to-b from-muted/50 to-background">
        <div className="max-w-content mx-auto px-gutter lg:px-gutter-lg">
          {/* Site Header */}
          <header className="text-center mb-section-sm animate-fade-in">
            <h1 className="font-heading text-display tracking-tight text-foreground mb-4">
              {directoryConfig.name}
            </h1>
            <p className="text-body-lg text-muted-foreground max-w-reading mx-auto">
              {directoryConfig.description}
            </p>
          </header>

          {/* Featured Content */}
          {heroItem && (
            <div className="animate-fade-in" style={{ animationDelay: '200ms' }}>
              <ContentCard
                item={heroItem}
                variant="featured"
                showTags
              />
            </div>
          )}
        </div>
      </section>

      {/* Content Type Sections */}
      {contentTypes.map((type, typeIndex) => {
        const items = contentByType[type.slug] || [];
        if (items.length === 0) return null;

        const displayItems = items.slice(0, 6);

        return (
          <section
            key={type.slug}
            className="py-section-sm border-t border-border"
          >
            <div className="max-w-content mx-auto px-gutter lg:px-gutter-lg">
              {/* Section Header */}
              <div className="flex items-end justify-between mb-content">
                <div>
                  <span className="text-overline uppercase text-primary tracking-wider block mb-1">
                    {type.namePlural}
                  </span>
                  <h2 className="font-heading text-headline text-foreground">
                    Latest {type.namePlural}
                  </h2>
                </div>
                <Link
                  href={`/${type.slug}`}
                  className="group inline-flex items-center gap-2 text-caption font-medium text-muted-foreground hover:text-foreground transition-colors duration-200"
                >
                  View all
                  <ArrowRight className="h-4 w-4 transition-transform duration-200 group-hover:translate-x-1" />
                </Link>
              </div>

              {/* Content Grid */}
              <ContentGrid
                items={displayItems}
                contentType={type.slug}
                layout={typeIndex === 0 ? 'magazine' : 'default'}
                showTags
              />
            </div>
          </section>
        );
      })}

      {/* Recent Content Section */}
      {remainingItems.length > 0 && (
        <section className="py-section bg-muted/30 border-t border-border">
          <div className="max-w-content mx-auto px-gutter lg:px-gutter-lg">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-content-lg">
              {/* Main Content */}
              <div className="lg:col-span-8">
                <h2 className="font-heading text-title font-semibold text-foreground mb-content">
                  Recent Updates
                </h2>
                <div className="space-y-0 divide-y divide-border bg-card rounded-lg border border-border">
                  {remainingItems.slice(0, 5).map((item, index) => (
                    <ContentCard
                      key={`${item.contentType}-${item.slug}`}
                      item={item}
                      variant="compact"
                      className="animate-fade-in px-4"
                      style={{ animationDelay: `${index * 100}ms` }}
                    />
                  ))}
                </div>
              </div>

              {/* Sidebar */}
              <aside className="lg:col-span-4">
                <div className="sticky top-24">
                  <h3 className="font-heading text-title-sm font-semibold text-foreground mb-content-sm">
                    Browse by Category
                  </h3>
                  <nav className="space-y-2">
                    {contentTypes.map((type) => {
                      const count = contentByType[type.slug]?.length || 0;
                      return (
                        <Link
                          key={type.slug}
                          href={`/${type.slug}`}
                          className="group flex items-center justify-between p-4 rounded-lg bg-card border border-border hover:border-primary/50 hover:bg-muted/50 transition-all duration-200"
                        >
                          <span className="font-medium text-foreground group-hover:text-primary transition-colors duration-200">
                            {type.namePlural}
                          </span>
                          <span className="text-caption text-muted-foreground bg-muted px-2 py-0.5 rounded-full">
                            {count} {count === 1 ? 'item' : 'items'}
                          </span>
                        </Link>
                      );
                    })}
                  </nav>

                  {/* About Card */}
                  <div className="mt-content p-6 rounded-lg bg-card border border-border">
                    <h3 className="font-heading text-title-sm font-semibold text-foreground mb-2">
                      About
                    </h3>
                    <p className="text-body text-muted-foreground mb-4">
                      {directoryConfig.description}
                    </p>
                    <Link
                      href="/feed.xml"
                      className="text-caption font-medium text-primary hover:underline"
                    >
                      Subscribe via RSS →
                    </Link>
                  </div>
                </div>
              </aside>
            </div>
          </div>
        </section>
      )}
    </div>
  );
}
