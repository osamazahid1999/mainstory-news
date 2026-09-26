import type { Metadata } from "next";
import SiteHeader from "@/components/SiteHeader";
import SiteFooter from "@/components/SiteFooter";
import StoryCard from "@/components/StoryCard";
import { stories as mockStories } from "@/lib/mock-data";
import { getHomepageData } from "@/sanity/lib/homepage";

export const metadata: Metadata = {
  title: "Latest News",
  description: "The latest reporting and updates from Main Story.",
  alternates: { canonical: "https://mainstorynews.com/latest" },
  openGraph: {
    type: "website",
    url: "https://mainstorynews.com/latest",
    title: "Latest News | Main Story",
    description: "The latest reporting and updates from Main Story.",
  },
};

export default async function LatestPage() {
  const cms = await getHomepageData();
  const stories = [
    ...cms.stories,
    ...mockStories.filter((mock) => !cms.stories.some((story) => story.slug === mock.slug)),
  ];

  return (
    <>
      <SiteHeader />
      <main className="wrap page-shell">
        <div className="page-title">
          <span className="eyebrow">LATEST</span>
          <h1>Latest News</h1>
          <p>The newest reporting, analysis and explainers from Main Story.</p>
        </div>
        <div className="category-feed">
          {stories.map((story) => (
            <StoryCard key={story.slug} story={story} />
          ))}
        </div>
      </main>
      <SiteFooter />
    </>
  );
}
