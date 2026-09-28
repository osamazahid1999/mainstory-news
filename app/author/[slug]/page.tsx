import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import SiteHeader from "@/components/SiteHeader";
import SiteFooter from "@/components/SiteFooter";
import StoryCard from "@/components/StoryCard";
import { PageAnalytics } from "@/components/AnalyticsTracker";
import { getAuthorProfile } from "@/sanity/lib/author";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const { author } = await getAuthorProfile(slug);

  if (!author) {
    return {
      title: "Author not found",
      robots: { index: false, follow: false },
    };
  }

  const canonical = `https://mainstorynews.com/author/${author.slug}`;
  const description =
    author.bio ||
    `Read the latest reporting and analysis from ${author.name} at Main Story.`;

  return {
    title: author.name,
    description,
    alternates: { canonical },
    openGraph: {
      type: "profile",
      url: canonical,
      title: `${author.name} | Main Story`,
      description,
      images: author.photo ? [{ url: author.photo, alt: author.photoAlt }] : undefined,
    },
    twitter: {
      card: "summary",
      title: `${author.name} | Main Story`,
      description,
      images: author.photo ? [author.photo] : undefined,
    },
  };
}

export default async function AuthorPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const { author, stories } = await getAuthorProfile(slug);

  if (!author) notFound();

  const canonical = `https://mainstorynews.com/author/${author.slug}`;
  const sameAs = [author.xUrl, author.linkedinUrl].filter(Boolean);

  const personJsonLd = {
    "@context": "https://schema.org",
    "@type": "Person",
    name: author.name,
    url: canonical,
    jobTitle: author.jobTitle,
    description: author.bio,
    image: author.photo,
    worksFor: {
      "@type": "Organization",
      name: "Main Story",
      url: "https://mainstorynews.com",
    },
    sameAs,
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(personJsonLd) }}
      />
      <PageAnalytics eventName="author_view" payload={{ author: author.name, slug: author.slug }} />
      <SiteHeader />
      <main className="wrap page-shell author-page">
        <header className="author-header author-header--premium">
          {author.photo && (
            <div className="author-photo">
              <Image
                src={author.photo}
                alt={author.photoAlt || author.name}
                fill
                sizes="160px"
              />
            </div>
          )}
          <div className="author-profile-copy">
            <span className="eyebrow">AUTHOR</span>
            <h1>{author.name}</h1>
            {author.jobTitle && <p className="author-role">{author.jobTitle}</p>}
            {author.bio && <p className="author-bio">{author.bio}</p>}
            <div className="author-links">
              {author.xUrl && <Link href={author.xUrl} data-analytics-event="social_click" data-analytics-label="x">X</Link>}
              {author.linkedinUrl && <Link href={author.linkedinUrl} data-analytics-event="social_click" data-analytics-label="linkedin">LinkedIn</Link>}
              {author.email && <a href={"mailto:" + author.email}>Email</a>}
            </div>
          </div>
        </header>

        <section className="author-profile-grid">
          <div>
            {author.expertise?.length ? (
              <div className="author-expertise">
            {author.expertise.map((item) => (
              <span key={item}>{item}</span>
            ))}
              </div>
            ) : null}
          </div>

          <aside className="author-facts">
            <span className="trust-card-kicker">PROFILE</span>
            <dl>
              <div>
                <dt>Role</dt>
                <dd>{author.jobTitle || "Contributor"}</dd>
              </div>
              <div>
                <dt>Publication</dt>
                <dd>Main Story</dd>
              </div>
              <div>
                <dt>Published stories</dt>
                <dd>{stories.length}</dd>
              </div>
            </dl>
          </aside>
        </section>

        <section className="section author-latest-section">
          <div className="section-head">
            <h2>Latest by {author.name}</h2>
          </div>
          <div className="author-story-grid">
            {stories.map((story) => (
              <StoryCard key={story.slug} story={story} />
            ))}
            {stories.length === 0 && <p>No published stories yet.</p>}
          </div>
        </section>
      </main>
      <SiteFooter />
    </>
  );
}
