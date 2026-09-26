import Link from "next/link";
import SiteHeader from "@/components/SiteHeader";
import SiteFooter from "@/components/SiteFooter";
import { PageAnalytics } from "@/components/AnalyticsTracker";
import { stories } from "@/lib/mock-data";

export default async function SearchPage({ searchParams }:{ searchParams: Promise<{q?:string}> }) {
  const { q = "" } = await searchParams;
  const query = q.trim().toLowerCase();
  const results = query ? stories.filter((story) =>
    [story.title, story.excerpt, story.category, story.author].join(" ").toLowerCase().includes(query)
  ) : [];

  return (
    <>
      {query && (
        <PageAnalytics
          eventName="search"
          payload={{ query: q, result_count: results.length }}
        />
      )}
      <SiteHeader />
      <main className="wrap page-shell">
        <div className="page-title">
          <span className="eyebrow">SEARCH</span>
          <h1>{query ? `Results for “${q}”` : "Search Main Story"}</h1>
          <p>{query ? `${results.length} result${results.length === 1 ? "" : "s"} found.` : "Search stories, topics and authors."}</p>
        </div>
        <form className="search-page-form" action="/search">
          <input name="q" defaultValue={q} placeholder="Search Main Story" />
          <button type="submit">Search</button>
        </form>
        <div className="search-results">
          {results.map((story) => (
            <article key={story.slug}>
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
              <small>{story.author} · {story.readTime}</small>
            </article>
          ))}
        </div>
      </main>
      <SiteFooter />
    </>
  );
}
