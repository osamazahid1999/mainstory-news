import type { Story } from "@/lib/mock-data";
import { sanityClient } from "@/sanity/lib/client";

export type CmsArticle = Story & {
  subtitle?: string;
  publishedAt?: string;
  body?: unknown[];
  correctionNote?: string;
};

const articleQuery = `*[
  _type == "article" &&
  !(_id in path("drafts.**")) &&
  slug.current == $slug
][0] {
  "slug": slug.current,
  title,
  subtitle,
  "excerpt": coalesce(excerpt, subtitle, ""),
  "category": coalesce(category->slug.current, "world"),
  "author": coalesce(authors[0]->name, "Main Story Desk"),
  "image": featuredImage.asset->url,
  "imageAlt": coalesce(featuredImage.alt, title),
  body,
  "bodyText": pt::text(body),
  publishedAt,
  correctionNote
}`;

export async function getCmsArticle(slug: string): Promise<CmsArticle | null> {
  try {
    const article = await sanityClient.fetch<
      Omit<CmsArticle, "readTime"> & { bodyText?: string }
    >(articleQuery, { slug }, { next: { revalidate: 60 } });

    if (!article?.slug) return null;

    const words = article.bodyText?.trim().split(/\s+/).filter(Boolean).length || 0;
    const { bodyText, ...rest } = article;
    return {
      ...rest,
      image: article.image || "https://images.unsplash.com/photo-1495020689067-958852a7765e?auto=format&fit=crop&w=1600&q=80",
      imageAlt: article.imageAlt || article.title,
      readTime: `${Math.max(1, Math.ceil(words / 220))} min read`,
    };
  } catch {
    return null;
  }
}
