import { getContent } from '@/lib/content/loader';
import { directoryConfig, seoConfig } from '@/config/directory.config';

export async function GET() {
  const { items } = await getContent({ pageSize: 100 });

  // Sort by date (newest first)
  const sortedContent = items
    .filter((item) => item.meta.date)
    .sort((a, b) => {
      const dateA = new Date(a.meta.date || 0);
      const dateB = new Date(b.meta.date || 0);
      return dateB.getTime() - dateA.getTime();
    });

  const rssItems = sortedContent
    .map((item) => {
      const url = `${seoConfig.siteUrl}/${item.contentType}/${item.slug}`;
      const pubDate = item.meta.date
        ? new Date(item.meta.date).toUTCString()
        : new Date().toUTCString();

      return `
    <item>
      <title><![CDATA[${item.meta.title}]]></title>
      <link>${url}</link>
      <guid isPermaLink="true">${url}</guid>
      <description><![CDATA[${item.meta.summary || ''}]]></description>
      <pubDate>${pubDate}</pubDate>
      ${item.meta.author ? `<author>${item.meta.author}</author>` : ''}
      ${item.meta.tags?.map((tag) => `<category>${tag}</category>`).join('\n      ') || ''}
    </item>`;
    })
    .join('\n');

  const rssFeed = `<?xml version="1.0" encoding="UTF-8"?>
<rss version="2.0" xmlns:atom="http://www.w3.org/2005/Atom" xmlns:content="http://purl.org/rss/1.0/modules/content/">
  <channel>
    <title><![CDATA[${directoryConfig.name}]]></title>
    <link>${seoConfig.siteUrl}</link>
    <description><![CDATA[${directoryConfig.description}]]></description>
    <language>en-US</language>
    <lastBuildDate>${new Date().toUTCString()}</lastBuildDate>
    <atom:link href="${seoConfig.siteUrl}/feed.xml" rel="self" type="application/rss+xml"/>
    ${rssItems}
  </channel>
</rss>`;

  return new Response(rssFeed.trim(), {
    headers: {
      'Content-Type': 'application/xml',
      'Cache-Control': 's-maxage=3600, stale-while-revalidate',
    },
  });
}
