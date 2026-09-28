import type { Metadata } from "next";
import Link from "next/link";
import SiteHeader from "@/components/SiteHeader";
import SiteFooter from "@/components/SiteFooter";
import { getPublicSiteSettings } from "@/sanity/lib/siteSettings";

export const metadata: Metadata = {
  title: "Contact",
  description: "Contact Main Story.",
  alternates: { canonical: "https://mainstorynews.com/contact" },
};

export default async function ContactPage() {
  const settings = await getPublicSiteSettings();
  const emailHref = settings.contactEmail ? "mailto:" + settings.contactEmail : undefined;
  const editorialHref = settings.editorialEmail
    ? "mailto:" + settings.editorialEmail
    : emailHref;
  const correctionsHref = settings.correctionsEmail
    ? "mailto:" + settings.correctionsEmail
    : emailHref;
  const advertisingHref = settings.advertisingEmail
    ? "mailto:" + settings.advertisingEmail
    : emailHref;

  return (
    <>
      <SiteHeader />
      <main className="wrap page-shell trust-page">
        <section className="trust-hero">
          <div className="trust-hero-copy">
            <span className="eyebrow">CONTACT</span>
            <h1>Reach the right part of the newsroom.</h1>
            <p>
              Editorial questions, corrections, partnerships and general inquiries each need a slightly different path.
            </p>
          </div>
          <aside className="trust-hero-card trust-contact-card">
            <span className="trust-card-kicker">PUBLIC CONTACT</span>
            {settings.contactEmail ? (
              <>
                <strong>{settings.contactEmail}</strong>
                <a className="trust-primary-link" href={emailHref}>Send an email →</a>
              </>
            ) : (
              <>
                <strong>Contact email not published yet</strong>
                <p>Add the public address in Sanity → Site Settings before launch.</p>
              </>
            )}
          </aside>
        </section>

        <section className="contact-grid">
          <article>
            <span className="contact-icon">01</span>
            <h2>Editorial</h2>
            <p>Questions about coverage, published reporting, story context or newsroom matters.</p>
            {editorialHref ? <a href={editorialHref}>Email editorial →</a> : <span>Configure email in Site Settings</span>}
          </article>

          <article>
            <span className="contact-icon">02</span>
            <h2>Corrections</h2>
            <p>Report a possible factual error. Include the story URL, the issue and any supporting source.</p>
            {correctionsHref ? (
              <a href={correctionsHref}>Report a correction →</a>
            ) : (
              <Link href="/corrections">Read correction process →</Link>
            )}
          </article>

          <article>
            <span className="contact-icon">03</span>
            <h2>Partnerships</h2>
            <p>Use this route for partnership, sponsorship or other business-related conversations.</p>
            {advertisingHref ? <a href={advertisingHref}>Discuss advertising →</a> : <span>Configure email in Site Settings</span>}
          </article>

          <article>
            <span className="contact-icon">04</span>
            <h2>General</h2>
            <p>For questions that do not fit another category, use the publication’s public contact address.</p>
            {emailHref ? <a href={emailHref}>Contact Main Story →</a> : <span>Configure email in Site Settings</span>}
          </article>
        </section>

        <section className="trust-split contact-guidance">
          <div className="trust-copy trust-copy--wide">
            <span className="trust-section-number">BEFORE YOU SEND</span>
            <h2>Help us understand the request quickly.</h2>
            <p>
              For article-related questions, include the story URL. For corrections, identify the exact statement in question.
              For business inquiries, include enough context for the message to reach the right person.
            </p>
          </div>
          <div className="trust-info-panel">
            <span className="trust-card-kicker">RELATED</span>
            <Link className="trust-text-link" href="/editorial-policy">Editorial Policy →</Link>
            <Link className="trust-text-link" href="/corrections">Corrections →</Link>
            <Link className="trust-text-link" href="/about">About Main Story →</Link>
          </div>
        </section>
      </main>
      <SiteFooter />
    </>
  );
}
