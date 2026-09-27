import type { Metadata } from "next";
import { notFound } from "next/navigation";
import SiteHeader from "@/components/SiteHeader";
import SiteFooter from "@/components/SiteFooter";
import StoryCard from "@/components/StoryCard";
import { PageAnalytics } from "@/components/AnalyticsTracker";
import { categories, storiesByCategory } from "@/lib/mock-data";
import { getCmsCategory } from "@/sanity/lib/category";

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const cms = await getCmsCategory(slug);
  const exists = cms.category || categories.includes(slug);

  if (!exists) {
    return {
      title: "Section not found",
      robots: { index: false, follow: false },
    };
  }

  const label = cms.category?.title || slug[0].toUpperCase() + slug.slice(1);
  const leadStory = items[0];
  const remainingStories = items.slice(1);
  const description =
    cms.category?.description ||
    `Latest ${label.toLowerCase()} reporting, analysis and explainers from Main Story.`;

  return {
    title: label,
    description,
    alternates: {
      canonical: `https://mainstorynews.com/category/${slug}`,
    },
    openGraph: {
      type: "website",
      url: `https://mainstorynews.com/category/${slug}`,
      title: `${label} | Main Story`,
      description,
    },
    twitter: {
      card: "summary",
      title: `${label} | Main Story`,
      description,
    },
  };
}

export default async function CategoryPage({ params }:{ params: Promise<{slug:string}> }) {
  const { slug } = await params;
  const cms = await getCmsCategory(slug);

  if (!cms.category && !categories.includes(slug)) notFound();

  const fallbackItems = storiesByCategory(slug);
  const items = [
    ...cms.stories,
    ...fallbackItems.filter((mock) => !cms.stories.some((story) => story.slug === mock.slug)),
  ];

  const label = cms.category?.title || slug[0].toUpperCase() + slug.slice(1);
  const description =
    cms.category?.description ||
    `Latest ${label.toLowerCase()} reporting, analysis and explainers from Main Story.`;

  return (
    <>
      <PageAnalytics eventName="category_view" payload={{ category: slug, label }} />
      <SiteHeader />
      <main className="wrap page-shell section-page">
        <header className="section-hero">
          <div>
            <span className="eyebrow">SECTION</span>
            <h1>{label}</h1>
          </div>
          <p>{description}</p>
        </header>

        {leadStory && (
          <section className="section-lead">
            <StoryCard story={leadStory} />
            <div className="section-lead-note">
              <span className="eyebrow">LEADING THIS SECTION</span>
              <strong>{label}</strong>
              <p>Reporting, analysis and explainers selected from the latest published coverage.</p>
            </div>
          </section>
        )}

        <div className="category-page-grid">
          <div className="category-feed">
            {remainingStories.map((story) => <StoryCard key={story.slug} story={story} />)}
            {items.length === 0 && <p>More stories are coming soon.</p>}
          </div>

          <aside className="sidebox section-most-read">
            <div className="section-head"><h2>Most Read</h2></div>
            {items.slice(0,5).map((story,index) => (
              <div className="ranked" key={story.slug}>
                <b>{String(index+1).padStart(2,"0")}</b>
                <h3>{story.title}</h3>
              </div>
            ))}
          </aside>
        </div>
      </main>
      <SiteFooter />
    </>
  );
}
