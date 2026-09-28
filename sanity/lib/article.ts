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
  updatedAt?: string;
  body?: unknown[];
  correctionNote?: string;
  imageCaption?: string;
  imageCredit?: string;
  seoTitle?: string;
  seoDescription?: string;
  socialTitle?: string;
  socialDescription?: string;
  socialImage?: string;
  canonicalUrl?: string;
  noIndex?: boolean;
  includeInGoogleNews?: boolean;
  authorSlug?: string;
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
  "authorSlug": authors[0]->slug.current,
  featuredImage {
    asset,
    alt,
    caption,
    credit
  },
  body,
  "bodyText": pt::text(body),
  publishedAt,
  "updatedAt": coalesce(updatedAt, _updatedAt),
  correctionNote,
  "seoTitle": seo.title,
  "seoDescription": seo.description,
  "socialTitle": seo.socialTitle,
  "socialDescription": seo.socialDescription,
  "socialImageRef": seo.socialImage.asset._ref,
  "canonicalUrl": seo.canonicalUrl,
  "noIndex": coalesce(seo.noIndex, false),
  "includeInGoogleNews": coalesce(seo.includeInGoogleNews, true)
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
      authorSlug?: string;
      featuredImage?: SanityEditorialImage;
      body?: unknown[];
      bodyText?: string;
      publishedAt?: string;
      updatedAt?: string;
      correctionNote?: string;
      seoTitle?: string;
      seoDescription?: string;
      socialTitle?: string;
      socialDescription?: string;
      socialImageRef?: string;
      canonicalUrl?: string;
      noIndex?: boolean;
      includeInGoogleNews?: boolean;
    }>(articleQuery, { slug }, { next: { revalidate: 30 } });

    if (!article?.slug || !article.title) return null;

    const words = article.bodyText?.trim().split(/\s+/).filter(Boolean).length || 0;
    const image = article.featuredImage?.asset?._ref
      ? urlForImage(article.featuredImage).width(1800).fit("max").quality(88).url()
      : "https://images.unsplash.com/photo-1495020689067-958852a7765e?auto=format&fit=crop&w=1600&q=80";

    const socialImage = article.socialImageRef
      ? urlForImage({ asset: { _ref: article.socialImageRef } }).width(1200).height(630).fit("crop").quality(88).url()
      : image;

    return {
      slug: article.slug,
      title: article.title,
      subtitle: article.subtitle,
      excerpt: article.excerpt || article.subtitle || "",
      category: article.category || "world",
      author: article.author || "Main Story Desk",
      authorSlug: article.authorSlug,
      image,
      imageAlt: article.featuredImage?.alt || article.title,
      readTime: `${Math.max(1, Math.ceil(words / 220))} min read`,
      body: article.body,
      publishedAt: article.publishedAt,
      updatedAt: article.updatedAt,
      correctionNote: article.correctionNote,
      imageCaption: article.featuredImage?.caption,
      imageCredit: article.featuredImage?.credit,
      seoTitle: article.seoTitle,
      seoDescription: article.seoDescription,
      socialTitle: article.socialTitle,
      socialDescription: article.socialDescription,
      socialImage,
      canonicalUrl: article.canonicalUrl,
      noIndex: article.noIndex,
      includeInGoogleNews: article.includeInGoogleNews,
    };
  } catch {
    return null;
  }
}
