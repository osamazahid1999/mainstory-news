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
  const articles = await getPublicationArticles();
  const cutoff = Date.now() - 2 * 24 * 60 * 60 * 1000;

  const recent = articles.filter((article) => {
    if (!article.includeInGoogleNews || article.noIndex || !article.publishedAt) return false;
    return new Date(article.publishedAt).getTime() >= cutoff;
  });

  const urls = recent.map((article) => `
  <url>
    <loc>https://mainstorynews.com/news/${escapeXml(article.slug)}</loc>
    <news:news>
      <news:publication>
        <news:name>Main Story</news:name>
        <news:language>en</news:language>
      </news:publication>
      <news:publication_date>${escapeXml(article.publishedAt || "")}</news:publication_date>
      <news:title>${escapeXml(article.title)}</news:title>
    </news:news>
  </url>`).join("");

  const xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"
        xmlns:news="http://www.google.com/schemas/sitemap-news/0.9">
${urls}
</urlset>`;

  return new Response(xml, {
    headers: {
      "Content-Type": "application/xml; charset=utf-8",
      "Cache-Control": "public, s-maxage=300, stale-while-revalidate=600",
    },
  });
}
