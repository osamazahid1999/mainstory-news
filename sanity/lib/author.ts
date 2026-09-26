import type { Story } from "@/lib/mock-data";
import { sanityClient } from "@/sanity/lib/client";
import { urlForImage } from "@/sanity/lib/image";

export type AuthorProfile = {
  name: string;
  slug: string;
  jobTitle?: string;
  bio?: string;
  email?: string;
  xUrl?: string;
  linkedinUrl?: string;
  expertise?: string[];
  photo?: string;
  photoAlt?: string;
};

function estimateReadTime(bodyText?: string) {
  const words = bodyText?.trim().split(/\s+/).filter(Boolean).length || 0;
  return `${Math.max(1, Math.ceil(words / 220))} min read`;
}

export async function getAuthorProfile(slug: string): Promise<{
  author: AuthorProfile | null;
  stories: Story[];
}> {
  try {
    const result = await sanityClient.fetch<{
      author?: {
        name?: string;
        slug?: string;
        jobTitle?: string;
        bio?: string;
        email?: string;
        xUrl?: string;
        linkedinUrl?: string;
        expertise?: string[];
        photo?: {
          asset?: { _ref?: string };
          alt?: string;
        };
      };
      stories?: Array<Omit<Story, "readTime"> & { bodyText?: string }>;
    }>(`{
      "author": *[_type == "author" && slug.current == $slug][0] {
        name,
        "slug": slug.current,
        jobTitle,
        bio,
        email,
        xUrl,
        linkedinUrl,
        expertise,
        photo {
          asset,
          alt
        }
      },
      "stories": *[
        _type == "article" &&
        !(_id in path("drafts.**")) &&
        references(*[_type == "author" && slug.current == $slug]._id) &&
        defined(slug.current)
      ] | order(coalesce(publishedAt, _createdAt) desc)[0...30] {
        "slug": slug.current,
        title,
        "excerpt": coalesce(excerpt, subtitle, ""),
        "category": coalesce(category->slug.current, "world"),
        "author": coalesce(authors[0]->name, "Main Story Desk"),
        "image": featuredImage.asset->url,
        "imageAlt": coalesce(featuredImage.alt, title),
        "bodyText": pt::text(body)
      }
    }`, { slug }, { next: { revalidate: 60 } });

    if (!result.author?.name || !result.author.slug) {
      return { author: null, stories: [] };
    }

    const photo = result.author.photo?.asset?._ref
      ? urlForImage(result.author.photo).width(500).height(500).fit("crop").quality(88).url()
      : undefined;

    const stories = (result.stories || [])
      .filter((story) => Boolean(story.image))
      .map(({ bodyText, ...story }) => ({
        ...story,
        readTime: estimateReadTime(bodyText),
      }));

    return {
      author: {
        name: result.author.name,
        slug: result.author.slug,
        jobTitle: result.author.jobTitle,
        bio: result.author.bio,
        email: result.author.email,
        xUrl: result.author.xUrl,
        linkedinUrl: result.author.linkedinUrl,
        expertise: result.author.expertise,
        photo,
        photoAlt: result.author.photo?.alt || result.author.name,
      },
      stories,
    };
  } catch {
    return { author: null, stories: [] };
  }
}
