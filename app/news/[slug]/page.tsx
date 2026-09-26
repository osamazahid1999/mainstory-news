import Image from "next/image";
import { notFound } from "next/navigation";
import Link from "next/link";
import SiteHeader from "@/components/SiteHeader";
import SiteFooter from "@/components/SiteFooter";
import StoryCard from "@/components/StoryCard";
import PortableArticleBody from "@/components/PortableArticleBody";
import { storyBySlug, stories as mockStories } from "@/lib/mock-data";
import { getCmsArticle } from "@/sanity/lib/article";
import { getHomepageData } from "@/sanity/lib/homepage";

export default async function ArticlePage({ params }:{ params: Promise<{slug:string}> }) {
  const { slug } = await params;
  const cmsArticle = await getCmsArticle(slug);
  const mockStory = storyBySlug(slug);
  const story = cmsArticle || mockStory;
  if (!story) notFound();

  const cmsHome = await getHomepageData();
  const mergedStories = [
    ...cmsHome.stories,
    ...mockStories.filter((mock) => !cmsHome.stories.some((item) => item.slug === mock.slug)),
  ];

  const related = mergedStories
    .filter((item) => item.category === story.category && item.slug !== story.slug)
    .slice(0, 3);

  const publishedLabel = cmsArticle?.publishedAt
    ? new Intl.DateTimeFormat("en", { dateStyle: "medium" }).format(new Date(cmsArticle.publishedAt))
    : "Sep 26, 2026";

  return (
    <>
      <SiteHeader />
      <main className="wrap article-shell">
        <div className="article-breadcrumbs">
          <Link href="/">Home</Link> / <Link href={"/category/" + story.category}>{story.category}</Link>
        </div>

        <article className="article-layout">
          <div className="article-main">
            <span className="eyebrow">{story.category.toUpperCase()}</span>
            <h1>{story.title}</h1>
            <p className="article-deck">{cmsArticle?.subtitle || story.excerpt}</p>
            <div className="article-meta">
              By {story.author} · Published {publishedLabel} · {story.readTime}
            </div>

            <figure className="article-featured-media">
              <div className="article-hero article-hero-image">
                <Image
                  src={story.image}
                  alt={story.imageAlt}
                  fill
                  priority
                  sizes="(max-width: 900px) 100vw, 900px"
                />
              </div>
              {cmsArticle && (cmsArticle.imageCaption || cmsArticle.imageCredit) && (
                <figcaption>
                  {cmsArticle.imageCaption}
                  {cmsArticle.imageCaption && cmsArticle.imageCredit ? " · " : ""}
                  {cmsArticle.imageCredit && <>Credit: {cmsArticle.imageCredit}</>}
                </figcaption>
              )}
            </figure>

            {cmsArticle?.body?.length ? (
              <PortableArticleBody body={cmsArticle.body} />
            ) : (
              <div className="article-body">
                <p>This is the first editorial article template for Main Story. It is designed for clear reading, strong hierarchy and future CMS-driven publishing.</p>
                <p>When the newsroom CMS is connected, this area will support rich text, inline images, embeds, pull quotes, live updates, correction notes, related links and structured article metadata.</p>
                <h2>Why it matters</h2>
                <p>Main Story will focus on context as much as the headline itself: what happened, why it matters, who it affects and what comes next.</p>
                <blockquote>What matters. Why it matters.</blockquote>
                <h2>What comes next</h2>
                <p>The next milestone connects these templates to real editorial content and adds the production SEO layer needed for a modern international publication.</p>
              </div>
            )}

            {cmsArticle?.correctionNote && (
              <div className="correction-note">
                <strong>Correction:</strong> {cmsArticle.correctionNote}
              </div>
            )}
          </div>

          <aside>
            <div className="sidebox">
              <div className="section-head"><h2>Also in {story.category}</h2></div>
              {related.map((item) => <StoryCard key={item.slug} story={item} compact />)}
            </div>
          </aside>
        </article>

        <section className="section">
          <div className="section-head"><h2>Related Stories</h2></div>
          <div className="latest-grid">
            {mergedStories
              .filter((item) => item.slug !== story.slug)
              .slice(0,4)
              .map((item) => <StoryCard key={item.slug} story={item} compact />)}
          </div>
        </section>
      </main>
      <SiteFooter />
    </>
  );
}
