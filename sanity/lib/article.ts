import type { Story } from "@/lib/mock-data";
import { sanityClient } from "@/sanity/lib/client";
import { urlForImage } from "@/sanity/lib/image";

type SanityEditorialImage = {
  asset?: { _ref?: string };
  alt?: string;
  caption?: string;
  credit?: string;
};

export type CmsArticle = Story & {
  subtitle?: string;
  publishedAt?: string;
  body?: unknown[];
  correctionNote?: string;
  imageCaption?: string;
  imageCredit?: string;
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
  featuredImage {
    asset,
    alt,
    caption,
    credit
  },
  body,
  "bodyText": pt::text(body),
  publishedAt,
  correctionNote
}`;

export async function getCmsArticle(slug: string): Promise<CmsArticle | null> {
  try {
    const article = await sanityClient.fetch<{
      slug?: string;
      title?: string;
      subtitle?: string;
      excerpt?: string;
      category?: string;
      author?: string;
      featuredImage?: SanityEditorialImage;
      body?: unknown[];
      bodyText?: string;
      publishedAt?: string;
      correctionNote?: string;
    }>(articleQuery, { slug }, { next: { revalidate: 30 } });

    if (!article?.slug || !article.title) return null;

    const words = article.bodyText?.trim().split(/\s+/).filter(Boolean).length || 0;
    const image = article.featuredImage?.asset?._ref
      ? urlForImage(article.featuredImage).width(1800).fit("max").quality(88).url()
      : "https://images.unsplash.com/photo-1495020689067-958852a7765e?auto=format&fit=crop&w=1600&q=80";

    return {
      slug: article.slug,
      title: article.title,
      subtitle: article.subtitle,
      excerpt: article.excerpt || article.subtitle || "",
      category: article.category || "world",
      author: article.author || "Main Story Desk",
      image,
      imageAlt: article.featuredImage?.alt || article.title,
      readTime: `${Math.max(1, Math.ceil(words / 220))} min read`,
      body: article.body,
      publishedAt: article.publishedAt,
      correctionNote: article.correctionNote,
      imageCaption: article.featuredImage?.caption,
      imageCredit: article.featuredImage?.credit,
    };
  } catch {
    return null;
  }
}
