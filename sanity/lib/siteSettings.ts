import { sanityClient } from "@/sanity/lib/client";

export type PublicSiteSettings = {
  publicationName: string;
  tagline: string;
  contactEmail?: string;
  xUrl?: string;
  instagramUrl?: string;
  youtubeUrl?: string;
  linkedinUrl?: string;
};

export async function getPublicSiteSettings(): Promise<PublicSiteSettings> {
  try {
    const settings = await sanityClient.fetch<Partial<PublicSiteSettings> | null>(
      `*[_type == "siteSettings" && _id == "siteSettings"][0] {
        publicationName,
        tagline,
        contactEmail,
        xUrl,
        instagramUrl,
        youtubeUrl,
        linkedinUrl
      }`,
      {},
      { next: { revalidate: 300 } },
    );

    return {
      publicationName: settings?.publicationName || "Main Story",
      tagline: settings?.tagline || "What matters. Why it matters.",
      contactEmail: settings?.contactEmail,
      xUrl: settings?.xUrl,
      instagramUrl: settings?.instagramUrl,
      youtubeUrl: settings?.youtubeUrl,
      linkedinUrl: settings?.linkedinUrl,
    };
  } catch {
    return {
      publicationName: "Main Story",
      tagline: "What matters. Why it matters.",
    };
  }
}
