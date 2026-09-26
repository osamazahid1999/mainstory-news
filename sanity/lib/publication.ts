import { sanityClient } from "@/sanity/lib/client";

export type PublicationArticle = {
  slug: string;
  title: string;
  excerpt: string;
  category: string;
  author: string;
  publishedAt?: string;
  updatedAt?: string;
  image?: string;
  includeInGoogleNews?: boolean;
  noIndex?: boolean;
};

const publicationIndexQuery = `*[
  _type == "article" &&
  !(_id in path("drafts.**")) &&
  defined(slug.current)
] | order(coalesce(publishedAt, _createdAt) desc) {
  "slug": slug.current,
  title,
  "excerpt": coalesce(excerpt, subtitle, ""),
  "category": coalesce(category->slug.current, "world"),
  "author": coalesce(authors[0]->name, "Main Story Desk"),
  publishedAt,
  "updatedAt": coalesce(updatedAt, _updatedAt),
  "image": featuredImage.asset->url,
  "includeInGoogleNews": coalesce(seo.includeInGoogleNews, true),
  "noIndex": coalesce(seo.noIndex, false)
}`;

export async function getPublicationArticles(): Promise<PublicationArticle[]> {
  try {
    return await sanityClient.fetch<PublicationArticle[]>(
      publicationIndexQuery,
      {},
      { next: { revalidate: 300 } },
    );
  } catch {
    return [];
  }
}
