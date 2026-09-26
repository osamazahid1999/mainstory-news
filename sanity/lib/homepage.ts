import type { Story } from "@/lib/mock-data";
import { sanityClient } from "@/sanity/lib/client";

type CmsStory = Story & {
  publishedAt?: string;
};

type HomepageData = {
  stories: CmsStory[];
  leadSlug?: string;
  secondarySlugs: string[];
};

const homepageQuery = `{
  "articles": *[
    _type == "article" &&
    !(_id in path("drafts.**")) &&
    defined(slug.current)
  ] | order(coalesce(publishedAt, _createdAt) desc)[0...30] {
    "slug": slug.current,
    title,
    "excerpt": coalesce(excerpt, subtitle, ""),
    "category": coalesce(category->slug.current, "world"),
    "author": coalesce(authors[0]->name, "Main Story Desk"),
    "image": featuredImage.asset->url,
    "imageAlt": coalesce(featuredImage.alt, title),
    "bodyText": pt::text(body),
    publishedAt
  },
  "settings": *[_type == "homepageSettings" && _id == "homepageSettings"][0] {
    "leadSlug": leadStory->slug.current,
    "secondarySlugs": secondaryStories[]->slug.current
  }
}`;

function estimateReadTime(bodyText?: string) {
  const words = bodyText?.trim().split(/\s+/).filter(Boolean).length || 0;
  const minutes = Math.max(1, Math.ceil(words / 220));
  return `${minutes} min read`;
}

export async function getHomepageData(): Promise<HomepageData> {
  try {
    const result = await sanityClient.fetch<{
      articles?: Array<Omit<CmsStory, "readTime"> & { bodyText?: string }>;
      settings?: { leadSlug?: string; secondarySlugs?: string[] };
    }>(homepageQuery, {}, { next: { revalidate: 60 } });

    const stories = (result.articles || [])
      .filter((story) => Boolean(story.image))
      .map(({ bodyText, ...story }) => ({
        ...story,
        readTime: estimateReadTime(bodyText),
      }));

    return {
      stories,
      leadSlug: result.settings?.leadSlug,
      secondarySlugs: result.settings?.secondarySlugs || [],
    };
  } catch {
    return { stories: [], secondarySlugs: [] };
  }
}
