import Image from "next/image";
import Link from "next/link";
import SiteHeader from "@/components/SiteHeader";
import SiteFooter from "@/components/SiteFooter";
import StoryCard from "@/components/StoryCard";
import { stories, storiesByCategory } from "@/lib/mock-data";

const sectionNames = ["world", "technology", "business"];

export default function Home() {
  const lead = stories[0];
  const secondary = stories.slice(1, 3);
  const latest = stories.slice(2, 6);

  return (
    <>
      <SiteHeader />

      <main className="wrap">
        <section className="hero">
          <article className="hero-main">
            <div className="hero-art">
              <Image src={lead.image} alt={lead.imageAlt} fill priority sizes="(max-width: 900px) 100vw, 70vw" className="hero-image" />
            </div>
            <div className="hero-copy">
              <Link className="eyebrow" href={"/category/" + lead.category}>
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
        </section>

        <section id="latest" className="section">
          <div className="section-head">
            <h2>Latest News</h2>
            <Link href="/search?q=">View all</Link>
          </div>
          <div className="latest-grid">
            {latest.map((story) => (
              <StoryCard key={story.slug} story={story} />
            ))}
          </div>
        </section>

        <section className="content-grid">
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
                    <h2>{sectionName[0].toUpperCase() + sectionName.slice(1)}</h2>
                    <Link href={"/category/" + sectionName}>
                      More {sectionName[0].toUpperCase() + sectionName.slice(1)}
                    </Link>
                  </div>

                  <div className="category-grid">
                    <StoryCard story={featured} />
                    <div className="headline-list">
                      {items.slice(1, 4).map((story) => (
                        <article key={story.slug}>
                          <Link className="eyebrow" href={"/category/" + story.category}>
                            {story.category.toUpperCase()}
                          </Link>
                          <h3>
                            <Link href={"/news/" + story.slug}>{story.title}</Link>
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

          <aside>
            <div className="sidebox">
              <div className="section-head">
                <h2>Most Read</h2>
              </div>
              {stories.slice(0, 5).map((story, index) => (
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
                The essential stories, explained clearly. Delivered to your inbox.
              </p>
              <form>
                <input
                  type="email"
                  placeholder="Email address"
                  aria-label="Email address"
                />
                <button type="submit">Subscribe</button>
              </form>
            </div>
          </aside>
        </section>

        <section className="section video" id="video">
          <div className="section-head">
            <h2>Watch</h2>
            <Link href="/category/video">All videos</Link>
          </div>
          <div className="video-grid">
            {stories.slice(5, 8).map((story) => (
              <StoryCard key={story.slug} story={story} />
            ))}
          </div>
        </section>
      </main>

      <SiteFooter />
    </>
  );
}
