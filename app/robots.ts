import type { MetadataRoute } from "next";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: "*",
        allow: "/",
        disallow: ["/studio", "/studio/"],
      },
    ],
    sitemap: [
      "https://mainstorynews.com/sitemap.xml",
      "https://mainstorynews.com/news-sitemap.xml",
    ],
    host: "https://mainstorynews.com",
  };
}
