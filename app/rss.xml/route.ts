import { getPublicationArticles } from "@/sanity/lib/publication";

function escapeXml(value: string) {
  return value
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&apos;");
}

export async function GET() {
  const articles = (await getPublicationArticles()).filter((article) => !article.noIndex).slice(0, 50);

  const items = articles.map((article) => `
    <item>
      <title>${escapeXml(article.title)}</title>
      <link>https://mainstorynews.com/news/${escapeXml(article.slug)}</link>
      <guid isPermaLink="true">https://mainstorynews.com/news/${escapeXml(article.slug)}</guid>
      <description>${escapeXml(article.excerpt || "")}</description>
      <category>${escapeXml(article.category)}</category>
      <dc:creator>${escapeXml(article.author)}</dc:creator>
      ${article.publishedAt ? `<pubDate>${new Date(article.publishedAt).toUTCString()}</pubDate>` : ""}
    </item>`).join("");

  const xml = `<?xml version="1.0" encoding="UTF-8"?>
<rss version="2.0" xmlns:dc="http://purl.org/dc/elements/1.1/">
  <channel>
    <title>Main Story</title>
    <link>https://mainstorynews.com</link>
    <description>What matters. Why it matters.</description>
    <language>en</language>
    <lastBuildDate>${new Date().toUTCString()}</lastBuildDate>
    ${items}
  </channel>
</rss>`;

  return new Response(xml, {
    headers: {
      "Content-Type": "application/rss+xml; charset=utf-8",
      "Cache-Control": "public, s-maxage=300, stale-while-revalidate=600",
    },
  });
}
