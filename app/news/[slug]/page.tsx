import type { Metadata } from "next";
import Image from "next/image";
import { notFound } from "next/navigation";
import Link from "next/link";
import SiteHeader from "@/components/SiteHeader";
import SiteFooter from "@/components/SiteFooter";
import StoryCard from "@/components/StoryCard";
import PortableArticleBody from "@/components/PortableArticleBody";
import { PageAnalytics } from "@/components/AnalyticsTracker";
import { storyBySlug, stories as mockStories } from "@/lib/mock-data";
import { getCmsArticle } from "@/sanity/lib/article";
import { getHomepageData } from "@/sanity/lib/homepage";

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const cmsArticle = await getCmsArticle(slug);
  const mockStory = storyBySlug(slug);
  const story = cmsArticle || mockStory;

  if (!story) {
    return {
      title: "Story not found",
      robots: { index: false, follow: false },
    };
  }

  const canonical = cmsArticle?.canonicalUrl || `https://mainstorynews.com/news/${story.slug}`;
  const title = cmsArticle?.seoTitle || story.title;
  const description = cmsArticle?.seoDescription || story.excerpt;
  const socialTitle = cmsArticle?.socialTitle || title;
  const socialDescription = cmsArticle?.socialDescription || description;
  const socialImage = cmsArticle?.socialImage || story.image;

  return {
    title,
    description,
    alternates: { canonical },
    robots: cmsArticle?.noIndex ? { index: false, follow: true } : { index: true, follow: true },
    openGraph: {
      type: "article",
      url: canonical,
      title: socialTitle,
      description: socialDescription,
      images: [{ url: socialImage, alt: story.imageAlt }],
      publishedTime: cmsArticle?.publishedAt,
      modifiedTime: cmsArticle?.updatedAt,
      authors: [story.author],
      section: story.category,
    },
    twitter: {
      card: "summary_large_image",
      title: socialTitle,
      description: socialDescription,
      images: [socialImage],
    },
  };
}

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

  const sidebarStories =
    related.length > 0
      ? related
      : mergedStories.filter((item) => item.slug !== story.slug).slice(0, 3);

  const sidebarTitle =
    related.length > 0 ? `Also in ${story.category}` : "Latest News";

  const publishedLabel = cmsArticle?.publishedAt
    ? new Intl.DateTimeFormat("en", { dateStyle: "medium" }).format(new Date(cmsArticle.publishedAt))
    : "Sep 26, 2026";

  const canonicalUrl = cmsArticle?.canonicalUrl || `https://mainstorynews.com/news/${story.slug}`;
  const newsArticleJsonLd = {
    "@context": "https://schema.org",
    "@type": "NewsArticle",
    headline: story.title,
    description: cmsArticle?.seoDescription || story.excerpt,
    image: [cmsArticle?.socialImage || story.image],
    datePublished: cmsArticle?.publishedAt,
    dateModified: cmsArticle?.updatedAt || cmsArticle?.publishedAt,
    mainEntityOfPage: canonicalUrl,
    articleSection: story.category,
    author: {
      "@type": "Person",
      name: story.author,
      ...(cmsArticle?.authorSlug
        ? { url: `https://mainstorynews.com/author/${cmsArticle.authorSlug}` }
        : {}),
    },
    publisher: {
      "@type": "Organization",
      name: "Main Story",
      url: "https://mainstorynews.com",
    },
  };

  const breadcrumbJsonLd = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Home", item: "https://mainstorynews.com" },
      {
        "@type": "ListItem",
        position: 2,
        name: story.category,
        item: `https://mainstorynews.com/category/${story.category}`,
      },
      { "@type": "ListItem", position: 3, name: story.title, item: canonicalUrl },
    ],
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(newsArticleJsonLd) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd) }}
      />
      <PageAnalytics
        eventName="article_view"
        payload={{ slug: story.slug, category: story.category, author: story.author }}
      />
      <SiteHeader />
      <main className="wrap article-shell">
        <header className="article-header article-header--premium">
          <div className="article-breadcrumbs">
            <Link href="/">Home</Link> / <Link href={"/category/" + story.category}>{story.category}</Link>
          </div>
          <span className="eyebrow">{story.category.toUpperCase()}</span>
          <h1>{story.title}</h1>
          <p className="article-deck">{cmsArticle?.subtitle || story.excerpt}</p>
          <div className="article-meta">
            <span className="article-meta-author">
              By{" "}
              <strong>
                {cmsArticle?.authorSlug ? (
                  <Link href={"/author/" + cmsArticle.authorSlug}>{story.author}</Link>
                ) : (
                  story.author
                )}
              </strong>
            </span>
            <span>Published {publishedLabel}</span>
            <span>{story.readTime}</span>
          </div>
        </header>

        <article className="article-layout">
          <div className="article-main">
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

            <section className="article-context-panel">
              <span className="eyebrow">WHY IT MATTERS</span>
              <p>{story.excerpt}</p>
            </section>

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

          <aside className="article-side-rail">
            <div className="article-side-summary">
              <span className="eyebrow">STORY AT A GLANCE</span>
              <dl>
                <div>
                  <dt>Section</dt>
                  <dd>{story.category}</dd>
                </div>
                <div>
                  <dt>Author</dt>
                  <dd>{story.author}</dd>
                </div>
                <div>
                  <dt>Read time</dt>
                  <dd>{story.readTime}</dd>
                </div>
              </dl>
            </div>
            <div className="sidebox">
              <div className="section-head"><h2>{sidebarTitle}</h2></div>
              {sidebarStories.map((item) => <StoryCard key={item.slug} story={item} compact />)}
            </div>
          </aside>
        </article>

        <section className="section article-related-section">
          <div className="section-head"><h2>Related Stories</h2></div>
          <div className="article-related-grid">
            {mergedStories
              .filter((item) => item.slug !== story.slug)
              .slice(0,4)
              .map((item) => <StoryCard key={item.slug} story={item} />)}
          </div>
        </section>
      </main>
      <SiteFooter />
    </>
  );
}
