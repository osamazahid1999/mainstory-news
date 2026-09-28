import Link from "next/link";
import SiteHeader from "@/components/SiteHeader";
import SiteFooter from "@/components/SiteFooter";
import { PageAnalytics } from "@/components/AnalyticsTracker";
import { stories } from "@/lib/mock-data";
import { searchCmsStories } from "@/sanity/lib/search";

export default async function SearchPage({
  searchParams,
}: {
  searchParams: Promise<{ q?: string }>;
}) {
  const { q = "" } = await searchParams;
  const query = q.trim().toLowerCase();
  const cmsResults = query ? await searchCmsStories(q) : [];
  const mockResults = query
    ? stories.filter((story) =>
        [story.title, story.excerpt, story.category, story.author]
          .join(" ")
          .toLowerCase()
          .includes(query),
      )
    : [];

  const results = [
    ...cmsResults,
    ...mockResults.filter(
      (mock) => !cmsResults.some((story) => story.slug === mock.slug),
    ),
  ];

  return (
    <>
      {query && (
        <PageAnalytics
          eventName="search"
          payload={{ query: q, result_count: results.length }}
        />
      )}

      <SiteHeader />

      <main className="wrap page-shell search-page">
        <header className="search-page-hero">
          <div>
            <span className="eyebrow">SEARCH</span>
            <h1>{query ? `Results for “${q}”` : "Search Main Story"}</h1>
          </div>
          <p>
            {query
              ? `${results.length} result${results.length === 1 ? "" : "s"} found across stories, topics and authors.`
              : "Find reporting, analysis and explainers across Main Story."}
          </p>
        </header>

        <form className="search-page-form search-page-form--premium" action="/search">
          <input
            name="q"
            defaultValue={q}
            placeholder="Search stories, topics and authors"
            aria-label="Search Main Story"
          />
          <button type="submit">Search</button>
        </form>

        <div className="search-page-layout">
          <section className="search-results">
            {results.map((story) => (
              <article key={story.slug} className="search-result-card">
                <div>
                  <span className="eyebrow">{story.category.toUpperCase()}</span>
                  <h2>
                    <Link
                      href={"/news/" + story.slug}
                      data-analytics-event="story_click"
                      data-analytics-slug={story.slug}
                      data-analytics-category={story.category}
                      data-analytics-author={story.author}
                    >
                      {story.title}
                    </Link>
                  </h2>
                  <p>{story.excerpt}</p>
                  <small>
                    {story.author} · {story.readTime}
                  </small>
                </div>
              </article>
            ))}

            {query && results.length === 0 && (
              <div className="search-empty">
                <span className="eyebrow">NO RESULTS</span>
                <h2>Try a broader search.</h2>
                <p>
                  Search by topic, category, author or a shorter keyword.
                </p>
              </div>
            )}
          </section>

          <aside className="search-side">
            <div className="trust-info-panel">
              <span className="trust-card-kicker">POPULAR SEARCHES</span>
              <Link href="/search?q=AI">AI →</Link>
              <Link href="/search?q=markets">Markets →</Link>
              <Link href="/search?q=technology">Technology →</Link>
              <Link href="/search?q=world">World →</Link>
            </div>
          </aside>
        </div>
      </main>

      <SiteFooter />
    </>
  );
}
