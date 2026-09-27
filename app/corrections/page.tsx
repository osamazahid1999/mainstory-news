import type { Metadata } from "next";
import Link from "next/link";
import SiteHeader from "@/components/SiteHeader";
import SiteFooter from "@/components/SiteFooter";

export const metadata: Metadata = {
  title: "Corrections",
  description: "How Main Story handles corrections and updates.",
  alternates: { canonical: "https://mainstorynews.com/corrections" },
};

const steps = [
  ["01", "Report", "Send the article URL and a concise description of the possible factual error."],
  ["02", "Review", "The newsroom checks the published story, cited material and available evidence."],
  ["03", "Correct", "If a material error is confirmed, the published article can be amended."],
  ["04", "Disclose", "Where appropriate, a visible correction note explains what was changed."],
];

export default function CorrectionsPage() {
  return (
    <>
      <SiteHeader />
      <main className="wrap page-shell trust-page">
        <section className="trust-hero">
          <div className="trust-hero-copy">
            <span className="eyebrow">TRANSPARENCY</span>
            <h1>Corrections should be clear, visible and useful.</h1>
            <p>
              If something is wrong, readers should have a straightforward way to report it and understand what happened next.
            </p>
          </div>
          <aside className="trust-hero-card">
            <span className="trust-card-kicker">FOUND AN ERROR?</span>
            <strong>Help us review it.</strong>
            <p>Include the article URL, the statement you believe is incorrect and any supporting source.</p>
            <Link className="trust-primary-link" href="/contact">Contact the newsroom →</Link>
          </aside>
        </section>

        <section className="correction-process">
          <div className="trust-section-heading">
            <span className="eyebrow">THE PROCESS</span>
            <h2>What happens after you report an issue</h2>
          </div>
          <div className="correction-steps">
            {steps.map(([number, title, copy]) => (
              <article key={number}>
                <span>{number}</span>
                <h3>{title}</h3>
                <p>{copy}</p>
              </article>
            ))}
          </div>
        </section>

        <section className="correction-compare">
          <article>
            <span className="trust-card-kicker">CORRECTION</span>
            <h2>A material fact was wrong.</h2>
            <p>
              A correction addresses a factual error in previously published material. When the change is significant,
              the article can display a correction note so readers can see that the record changed.
            </p>
          </article>
          <article>
            <span className="trust-card-kicker">UPDATE</span>
            <h2>The story developed.</h2>
            <p>
              A routine update adds new information after publication and does not necessarily mean the earlier version
              was inaccurate. Updated timestamps help readers see when a story changed.
            </p>
          </article>
        </section>

        <section className="trust-cta">
          <div>
            <span className="eyebrow">READER FEEDBACK</span>
            <h2>See something that needs review?</h2>
            <p>Send us the article link and a concise explanation. That gives the newsroom the clearest starting point.</p>
          </div>
          <Link className="trust-primary-link trust-primary-link--button" href="/contact">Report a possible error →</Link>
        </section>
      </main>
      <SiteFooter />
    </>
  );
}
