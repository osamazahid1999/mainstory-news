import type { MetadataRoute } from "next";
import { getPublicationArticles } from "@/sanity/lib/publication";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const articles = await getPublicationArticles();
  const staticPages: MetadataRoute.Sitemap = [
    {
      url: "https://mainstorynews.com",
      lastModified: new Date(),
      changeFrequency: "hourly",
      priority: 1,
    },
    ...["world","business","technology","ai","markets","science","culture","video"].map((slug) => ({
      url: `https://mainstorynews.com/category/${slug}`,
      lastModified: new Date(),
      changeFrequency: "hourly" as const,
      priority: 0.8,
    })),
    ...["about", "editorial-policy", "corrections", "contact"].map((slug) => ({
      url: `https://mainstorynews.com/${slug}`,
      lastModified: new Date(),
      changeFrequency: "monthly" as const,
      priority: 0.5,
    })),
  ];

  const articlePages: MetadataRoute.Sitemap = articles
    .filter((article) => !article.noIndex)
    .map((article) => ({
      url: `https://mainstorynews.com/news/${article.slug}`,
      lastModified: article.updatedAt || article.publishedAt || new Date().toISOString(),
      changeFrequency: "daily" as const,
      priority: 0.9,
    }));

  return [...staticPages, ...articlePages];
}
