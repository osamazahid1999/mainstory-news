import { sanityClient } from "@/sanity/lib/client";

export type PublicSiteSettings = {
  publicationName: string;
  tagline: string;
  contactEmail?: string;
  editorialEmail?: string;
  correctionsEmail?: string;
  advertisingEmail?: string;
  publisherName?: string;
  publisherCountry?: string;
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
        editorialEmail,
        correctionsEmail,
        advertisingEmail,
        publisherName,
        publisherCountry,
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
      editorialEmail: settings?.editorialEmail,
      correctionsEmail: settings?.correctionsEmail,
      advertisingEmail: settings?.advertisingEmail,
      publisherName: settings?.publisherName,
      publisherCountry: settings?.publisherCountry,
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
