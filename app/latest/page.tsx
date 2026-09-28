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
    ...mockStories.filter(
      (mock) => !cms.stories.some((story) => story.slug === mock.slug),
    ),
  ];

  const lead = stories[0];
  const rest = stories.slice(1);

  return (
    <>
      <SiteHeader />

      <main className="wrap page-shell latest-page">
        <header className="latest-hero">
          <div>
            <span className="eyebrow">LATEST</span>
            <h1>Latest News</h1>
          </div>
          <p>
            The newest reporting, analysis and explainers from Main Story,
            ordered for quick scanning and deeper reading.
          </p>
        </header>

        {lead && (
          <section className="latest-lead">
            <StoryCard story={lead} />
            <aside className="latest-lead-note">
              <span className="trust-card-kicker">LATEST UPDATE</span>
              <strong>Start here.</strong>
              <p>
                The most recent story from across Main Story&apos;s newsroom.
              </p>
            </aside>
          </section>
        )}

        <section className="section latest-feed-section">
          <div className="section-head">
            <h2>More from the newsroom</h2>
          </div>

          <div className="latest-feed-grid">
            {rest.map((story) => (
              <StoryCard key={story.slug} story={story} />
            ))}
          </div>
        </section>
      </main>

      <SiteFooter />
    </>
  );
}
