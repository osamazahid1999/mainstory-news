import { sanityClient } from "@/sanity/lib/client";

export type BreakingItem = {
  headline: string;
  href?: string;
  priority?: string;
};

export async function getBreakingNews(): Promise<BreakingItem | null> {
  try {
    const now = new Date().toISOString();
    return await sanityClient.fetch<BreakingItem | null>(
      `*[
        _type == "breakingNews" &&
        !(_id in path("drafts.**")) &&
        enabled == true &&
        startsAt <= $now &&
        (!defined(endsAt) || endsAt > $now)
      ] | order(
        select(priority == "urgent" => 3, priority == "high" => 2, 1) desc,
        startsAt desc
      )[0] {
        headline,
        priority,
        "href": coalesce(
          select(defined(article->slug.current) => "/news/" + article->slug.current),
          externalUrl
        )
      }`,
      { now },
      { next: { revalidate: 30 } },
    );
  } catch {
    return null;
  }
}
