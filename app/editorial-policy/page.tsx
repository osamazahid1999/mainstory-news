import type { Metadata } from "next";
import Link from "next/link";
import SiteHeader from "@/components/SiteHeader";
import SiteFooter from "@/components/SiteFooter";

export const metadata: Metadata = {
  title: "Editorial Policy",
  description: "Main Story editorial standards and publishing principles.",
  alternates: { canonical: "https://mainstorynews.com/editorial-policy" },
};

const sections = [
  ["accuracy", "Accuracy & verification"],
  ["context", "Context & clarity"],
  ["transparency", "Conflicts & transparency"],
  ["corrections", "Corrections"],
  ["sources", "Sources & attribution"],
  ["ai", "AI-assisted work"],
];

export default function EditorialPolicyPage() {
  return (
    <>
      <SiteHeader />
      <main className="wrap page-shell trust-page">
        <section className="trust-hero trust-hero--policy">
          <div className="trust-hero-copy">
            <span className="eyebrow">EDITORIAL STANDARDS</span>
            <h1>Standards readers can see.</h1>
            <p>
              The principles Main Story is designed to follow when reporting, editing, updating and correcting published work.
            </p>
          </div>
          <div className="trust-policy-meta">
            <span>PUBLICATION</span>
            <strong>Main Story</strong>
            <span>PRINCIPLE</span>
            <strong>Accuracy before speed</strong>
          </div>
        </section>

        <section className="policy-layout">
          <aside className="policy-toc">
            <span className="trust-card-kicker">ON THIS PAGE</span>
            <nav>
              {sections.map(([id, label], index) => (
                <a key={id} href={"#" + id}>
                  <span>{String(index + 1).padStart(2, "0")}</span>
                  {label}
                </a>
              ))}
            </nav>
            <Link className="trust-text-link" href="/corrections">Corrections process →</Link>
          </aside>

          <div className="policy-content">
            <article id="accuracy">
              <span className="policy-number">01</span>
              <div>
                <h2>Accuracy and verification</h2>
                <p>Newsroom content should be based on verifiable information, clearly sourced where appropriate, and updated when material facts change.</p>
              </div>
            </article>

            <article id="context">
              <span className="policy-number">02</span>
              <div>
                <h2>Context and clarity</h2>
                <p>Coverage should distinguish confirmed facts from analysis, opinion, projections and claims made by sources. Headlines should accurately reflect the substance of the story.</p>
              </div>
            </article>

            <article id="transparency">
              <span className="policy-number">03</span>
              <div>
                <h2>Conflicts and transparency</h2>
                <p>Relevant conflicts of interest, sponsored material or other relationships that could affect a reader’s understanding should be disclosed clearly.</p>
              </div>
            </article>

            <article id="corrections">
              <span className="policy-number">04</span>
              <div>
                <h2>Corrections</h2>
                <p>Material errors should be corrected promptly and transparently. When appropriate, a visible correction note should explain what changed.</p>
              </div>
            </article>

            <article id="sources">
              <span className="policy-number">05</span>
              <div>
                <h2>Sources and attribution</h2>
                <p>Information from other people, publications or institutions should be attributed clearly enough for readers to understand where key claims originated.</p>
              </div>
            </article>

            <article id="ai">
              <span className="policy-number">06</span>
              <div>
                <h2>AI-assisted work</h2>
                <p>Any AI-assisted workflow used by the newsroom should remain subject to human editorial review, verification and responsibility before publication.</p>
              </div>
            </article>
          </div>
        </section>
      </main>
      <SiteFooter />
    </>
  );
}
