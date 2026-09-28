import type { Metadata } from "next";
import Link from "next/link";
import SiteHeader from "@/components/SiteHeader";
import SiteFooter from "@/components/SiteFooter";

export const metadata: Metadata = {
  title: "About",
  description: "Learn about Main Story and its editorial mission.",
  alternates: { canonical: "https://mainstorynews.com/about" },
};

const coverage = ["World", "Business", "Technology", "AI", "Markets", "Science", "Culture", "Video"];

export default function AboutPage() {
  return (
    <>
      <SiteHeader />
      <main className="wrap page-shell trust-page trust-page--about">
        <section className="trust-hero">
          <div className="trust-hero-copy">
            <span className="eyebrow">ABOUT MAIN STORY</span>
            <h1>News with context, not just headlines.</h1>
            <p>
              Main Story is an international digital publication built around a simple idea:
              tell readers what happened, explain why it matters, and make the reporting easy to follow.
            </p>
          </div>
          <aside className="trust-hero-card trust-brand-card">
            <span className="trust-card-kicker">OUR PROMISE</span>
            <strong>What matters.</strong>
            <strong>Why it matters.</strong>
            <p>Clear reporting, visible authorship, useful context and transparent updates.</p>
          </aside>
        </section>

        <section className="trust-split">
          <div className="trust-copy trust-copy--wide">
            <span className="trust-section-number">01</span>
            <h2>Our approach</h2>
            <p>
              Main Story is designed to separate facts from interpretation, make sources and authors
              visible, support corrections, and help readers understand what changed and what comes next.
            </p>
            <p>
              The product combines fast news discovery with deeper explanatory reading, so breaking
              developments and longer-form context can live in the same newsroom experience.
            </p>
          </div>

          <div className="trust-info-panel">
            <span className="trust-card-kicker">WHAT WE COVER</span>
            <div className="trust-chip-grid">
              {coverage.map((item) => (
                <span key={item}>{item}</span>
              ))}
            </div>
            <Link className="trust-text-link" href="/latest">Explore latest coverage →</Link>
          </div>
        </section>

        <section className="trust-principles">
          <article>
            <span>01</span>
            <h3>Accuracy</h3>
            <p>Reporting should be verifiable, clearly attributed and corrected when material facts change.</p>
          </article>
          <article>
            <span>02</span>
            <h3>Context</h3>
            <p>Readers should understand not only what happened, but the background and consequences around it.</p>
          </article>
          <article>
            <span>03</span>
            <h3>Transparency</h3>
            <p>Authorship, updates, corrections and editorial standards should be visible rather than hidden.</p>
          </article>
        </section>

        <section className="trust-split trust-split--reverse">
          <div className="trust-info-panel trust-info-panel--accent">
            <span className="trust-card-kicker">THE NEWSROOM</span>
            <strong className="trust-big-number">8</strong>
            <p>Core editorial sections spanning global news, business, technology, science, culture and video.</p>
          </div>
          <div className="trust-copy trust-copy--wide">
            <span className="trust-section-number">02</span>
            <h2>Built for a modern newsroom</h2>
            <p>
              Published stories identify their authors and sections. Author profiles provide additional
              background where available, while published and modified timestamps help readers understand
              when a story first appeared and when it changed.
            </p>
            <p>
              The publishing system also supports breaking news, live updates, structured metadata,
              corrections and section-level discovery.
            </p>
          </div>
        </section>
      </main>
      <SiteFooter />
    </>
  );
}
