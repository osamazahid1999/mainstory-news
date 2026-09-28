import type { Metadata } from "next";
import Link from "next/link";
import SiteHeader from "@/components/SiteHeader";
import SiteFooter from "@/components/SiteFooter";
import { getPublicSiteSettings } from "@/sanity/lib/siteSettings";

export const metadata: Metadata = {
  title: "Advertise With Us",
  description: "Advertising, sponsorship and partnership opportunities with Main Story.",
  alternates: { canonical: "https://mainstorynews.com/advertise" },
};

export default async function AdvertisePage() {
  const settings = await getPublicSiteSettings();
  const advertisingEmail = settings.advertisingEmail || settings.contactEmail;

  return (
    <>
      <SiteHeader />
      <main className="wrap page-shell trust-page">
        <section className="trust-hero">
          <div className="trust-hero-copy">
            <span className="eyebrow">ADVERTISE WITH MAIN STORY</span>
            <h1>Reach readers around the stories shaping their world.</h1>
            <p>
              Main Story offers space for advertising, sponsorship and selected
              commercial partnerships while keeping editorial decisions
              independent from advertisers.
            </p>
          </div>
          <aside className="trust-hero-card trust-brand-card">
            <span className="trust-card-kicker">COMMERCIAL CONTACT</span>
            {advertisingEmail ? (
              <>
                <strong>{advertisingEmail}</strong>
                <a className="trust-primary-link" href={"mailto:" + advertisingEmail}>
                  Start a conversation →
                </a>
              </>
            ) : (
              <>
                <strong>Advertising email not configured</strong>
                <p>Add it in Sanity → Site Settings before launch.</p>
              </>
            )}
          </aside>
        </section>

        <section className="trust-principles">
          <article>
            <span>01</span>
            <h3>Display advertising</h3>
            <p>
              Standard placements across eligible pages, subject to site design,
              availability and advertising standards.
            </p>
          </article>
          <article>
            <span>02</span>
            <h3>Sponsorships</h3>
            <p>
              Clearly labeled sponsorship opportunities around suitable
              sections, newsletters or special editorial products.
            </p>
          </article>
          <article>
            <span>03</span>
            <h3>Partnerships</h3>
            <p>
              Selected commercial collaborations that are transparently labeled
              and kept separate from independent editorial judgment.
            </p>
          </article>
        </section>

        <section className="trust-split">
          <div className="trust-copy trust-copy--wide">
            <span className="trust-section-number">AD STANDARDS</span>
            <h2>Commercial support does not buy editorial influence.</h2>
            <p>
              Advertisers and sponsors do not control Main Story&apos;s newsroom
              decisions, reporting conclusions, corrections or article
              placement unless a placement is explicitly identified as paid or
              sponsored content.
            </p>
            <p>
              We may reject advertising that is deceptive, unlawful, unsafe,
              misleading, discriminatory or inconsistent with the publication&apos;s
              standards.
            </p>
          </div>
          <div className="trust-info-panel">
            <span className="trust-card-kicker">WHEN YOU CONTACT US</span>
            <p>Include your company name, campaign goal, target markets, dates and approximate budget.</p>
            {advertisingEmail && (
              <a className="trust-text-link" href={"mailto:" + advertisingEmail}>
                Email advertising →
              </a>
            )}
            <Link className="trust-text-link" href="/editorial-policy">
              Editorial Policy →
            </Link>
          </div>
        </section>
      </main>
      <SiteFooter />
    </>
  );
}
