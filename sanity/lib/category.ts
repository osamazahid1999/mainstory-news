import type { Story } from "@/lib/mock-data";
import { sanityClient } from "@/sanity/lib/client";

type CategoryInfo = {
  title: string;
  slug: string;
  description?: string;
};

function estimateReadTime(bodyText?: string) {
  const words = bodyText?.trim().split(/\s+/).filter(Boolean).length || 0;
  return `${Math.max(1, Math.ceil(words / 220))} min read`;
}

export async function getCmsCategory(slug: string): Promise<{ category: CategoryInfo | null; stories: Story[] }> {
  try {
    const result = await sanityClient.fetch<{
      category?: CategoryInfo;
      stories?: Array<Omit<Story, "readTime"> & { bodyText?: string }>;
    }>(`{
      "category": *[_type == "category" && slug.current == $slug][0] {
        title,
        "slug": slug.current,
        description
      },
      "stories": *[
        _type == "article" &&
        !(_id in path("drafts.**")) &&
        category->slug.current == $slug &&
        defined(slug.current)
      ] | order(coalesce(publishedAt, _createdAt) desc)[0...40] {
        "slug": slug.current,
        title,
        "excerpt": coalesce(excerpt, subtitle, ""),
        "category": coalesce(category->slug.current, $slug),
        "author": coalesce(authors[0]->name, "Main Story Desk"),
        "image": featuredImage.asset->url,
        "imageAlt": coalesce(featuredImage.alt, title),
        "bodyText": pt::text(body)
      }
    }`, { slug }, { next: { revalidate: 60 } });

    const stories = (result.stories || [])
      .filter((story) => Boolean(story.image))
      .map(({ bodyText, ...story }) => ({ ...story, readTime: estimateReadTime(bodyText) }));

    return { category: result.category || null, stories };
  } catch {
    return { category: null, stories: [] };
  }
}
