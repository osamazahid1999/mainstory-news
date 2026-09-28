import Image from "next/image";
import Link from "next/link";
import SiteHeader from "@/components/SiteHeader";
import SiteFooter from "@/components/SiteFooter";
import StoryCard from "@/components/StoryCard";
import NewsletterSignup from "@/components/NewsletterSignup";
import { stories as mockStories } from "@/lib/mock-data";
import { getHomepageData } from "@/sanity/lib/homepage";

const sectionNames = ["world", "technology", "business"];

export default async function Home() {
  const cms = await getHomepageData();
  const mergedStories = [
    ...cms.stories,
    ...mockStories.filter(
      (mock) => !cms.stories.some((story) => story.slug === mock.slug),
    ),
  ];

  const lead =
    mergedStories.find((story) => story.slug === cms.leadSlug) ||
    cms.stories[0] ||
    mergedStories[0];

  const configuredSecondary = cms.secondarySlugs
    .map((slug) => mergedStories.find((story) => story.slug === slug))
    .filter((story): story is NonNullable<typeof story> => Boolean(story));

  const secondary = [
    ...configuredSecondary,
    ...mergedStories.filter((story) => story.slug !== lead.slug),
  ]
    .filter(
      (story, index, all) =>
        all.findIndex((item) => item.slug === story.slug) === index,
    )
    .slice(0, 2);

  const latest = mergedStories
    .filter(
      (story) =>
        story.slug !== lead.slug &&
        !secondary.some((item) => item.slug === story.slug),
    )
    .slice(0, 4);

  const storiesByCategory = (category: string) =>
    mergedStories.filter(
      (story) => story.category === category.toLowerCase(),
    );

  return (
    <>
      <SiteHeader />

      <main className="wrap home-main">
        <div className="home-edition-bar">
          <span>INTERNATIONAL EDITION</span>
          <p>
            Independent reporting, analysis and explainers across the stories
            shaping the world.
          </p>
          <Link href="/latest">Latest coverage →</Link>
        </div>

        <section className="home-top-stories">
          <div className="home-section-label">
            <span className="eyebrow">TOP STORIES</span>
            <span>What matters now</span>
          </div>

          <div className="hero">
            <article className="hero-main">
              <div className="hero-art">
                <Image
                  src={lead.image}
                  alt={lead.imageAlt}
                  fill
                  priority
                  sizes="(max-width: 900px) 100vw, 70vw"
                  className="hero-image"
                />
              </div>

              <div className="hero-copy">
                <Link
                  className="eyebrow"
                  href={"/category/" + lead.category}
                >
                  MAIN STORY
                </Link>

                <h1>
                  <Link href={"/news/" + lead.slug}>{lead.title}</Link>
                </h1>

                <p>{lead.excerpt}</p>

                <div className="byline">
                  By {lead.author} · {lead.readTime}
                </div>
              </div>
            </article>

            <div className="hero-side">
              {secondary.map((story) => (
                <StoryCard key={story.slug} story={story} />
              ))}
            </div>
          </div>
        </section>

        <section id="latest" className="section home-latest-section">
          <div className="section-head">
            <h2>Latest News</h2>
            <Link href="/latest">View all</Link>
          </div>

          <div className="latest-grid">
            {latest.map((story) => (
              <StoryCard key={story.slug} story={story} />
            ))}
          </div>
        </section>

        <section className="content-grid home-sections-layout">
          <div>
            {sectionNames.map((sectionName) => {
              const items = storiesByCategory(sectionName);
              const featured = items[0];
              if (!featured) return null;

              return (
                <section
                  id={sectionName}
                  className="section category"
                  key={sectionName}
                >
                  <div className="section-head">
                    <h2>
                      {sectionName[0].toUpperCase() + sectionName.slice(1)}
                    </h2>
                    <Link href={"/category/" + sectionName}>
                      More {sectionName[0].toUpperCase() + sectionName.slice(1)}
                    </Link>
                  </div>

                  <div className="category-grid">
                    <StoryCard story={featured} />

                    <div className="headline-list">
                      {items.slice(1, 4).map((story) => (
                        <article key={story.slug}>
                          <Link
                            className="eyebrow"
                            href={"/category/" + story.category}
                          >
                            {story.category.toUpperCase()}
                          </Link>
                          <h3>
                            <Link href={"/news/" + story.slug}>
                              {story.title}
                            </Link>
                          </h3>
                          <p>{story.excerpt}</p>
                        </article>
                      ))}
                    </div>
                  </div>
                </section>
              );
            })}
          </div>

          <aside className="home-rail">
            <div className="sidebox">
              <div className="section-head">
                <h2>Most Read</h2>
              </div>

              {mergedStories.slice(0, 5).map((story, index) => (
                <article className="ranked" key={story.slug}>
                  <b>{String(index + 1).padStart(2, "0")}</b>
                  <div>
                    <span className="eyebrow">TRENDING</span>
                    <h3>
                      <Link href={"/news/" + story.slug}>{story.title}</Link>
                    </h3>
                  </div>
                </article>
              ))}
            </div>

            <div className="sidebox newsletter" id="newsletter">
              <span className="eyebrow">NEWSLETTER</span>
              <h2>The Daily Main Story</h2>
              <p>
                The essential stories, explained clearly. Delivered to your
                inbox.
              </p>
              <NewsletterSignup />
            </div>
          </aside>
        </section>

        <section className="section video" id="video">
          <div className="section-head">
            <h2>Watch</h2>
            <Link href="/category/video">All videos</Link>
          </div>

          <div className="video-grid">
            {mergedStories.slice(5, 8).map((story) => (
              <StoryCard key={story.slug} story={story} />
            ))}
          </div>
        </section>
      </main>

      <SiteFooter />
    </>
  );
}
