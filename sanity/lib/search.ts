import type { Story } from "@/lib/mock-data";
import { sanityClient } from "@/sanity/lib/client";

type SearchStory = Story & {
  bodyText?: string;
};

function estimateReadTime(bodyText?: string) {
  const words = bodyText?.trim().split(/\s+/).filter(Boolean).length || 0;
  return `${Math.max(1, Math.ceil(words / 220))} min read`;
}

export async function searchCmsStories(query: string): Promise<Story[]> {
  const term = query.trim();
  if (!term) return [];

  try {
    const stories = await sanityClient.fetch<SearchStory[]>(
      `*[
        _type == "article" &&
        !(_id in path("drafts.**")) &&
        defined(slug.current) &&
        (
          title match $term ||
          subtitle match $term ||
          excerpt match $term ||
          category->title match $term ||
          authors[]->name match $term ||
          pt::text(body) match $term
        )
      ] | order(coalesce(publishedAt, _createdAt) desc)[0...50] {
        "slug": slug.current,
        title,
        "excerpt": coalesce(excerpt, subtitle, ""),
        "category": coalesce(category->slug.current, "world"),
        "author": coalesce(authors[0]->name, "Main Story Desk"),
        "image": featuredImage.asset->url,
        "imageAlt": coalesce(featuredImage.alt, title),
        "bodyText": pt::text(body)
      }`,
      { term: `*${term}*` },
      { next: { revalidate: 30 } },
    );

    return stories
      .filter((story) => Boolean(story.image))
      .map(({ bodyText, ...story }) => ({
        ...story,
        readTime: estimateReadTime(bodyText),
      }));
  } catch {
    return [];
  }
}
