import type { Metadata } from "next";
import Link from "next/link";
import SiteHeader from "@/components/SiteHeader";
import SiteFooter from "@/components/SiteFooter";
import { getPublicSiteSettings } from "@/sanity/lib/siteSettings";

export const metadata: Metadata = {
  title: "Privacy Policy",
  description: "How Main Story handles data, analytics, cookies and third-party services.",
  alternates: { canonical: "https://mainstorynews.com/privacy" },
};

export default async function PrivacyPage() {
  const settings = await getPublicSiteSettings();
  const privacyEmail =
    settings.contactEmail || settings.editorialEmail || settings.correctionsEmail;

  return (
    <>
      <SiteHeader />
      <main className="wrap page-shell trust-page">
        <section className="trust-hero">
          <div className="trust-hero-copy">
            <span className="eyebrow">PRIVACY</span>
            <h1>Privacy, explained clearly.</h1>
            <p>
              This policy explains what information Main Story may receive when
              you use the site, why it may be used, and the choices available to
              you.
            </p>
          </div>
          <aside className="trust-hero-card">
            <span className="trust-card-kicker">LAST UPDATED</span>
            <strong>September 28, 2026</strong>
            <p>
              We will update this page when our analytics, advertising or other
              data-processing practices materially change.
            </p>
          </aside>
        </section>

        <section className="policy-layout">
          <aside className="policy-toc">
            <span className="trust-card-kicker">ON THIS PAGE</span>
            <nav>
              <a href="#information"><span>01</span>Information we receive</a>
              <a href="#use"><span>02</span>How we use information</a>
              <a href="#analytics"><span>03</span>Analytics & measurement</a>
              <a href="#cookies"><span>04</span>Cookies & local storage</a>
              <a href="#ads"><span>05</span>Advertising</a>
              <a href="#third-parties"><span>06</span>Third-party services</a>
              <a href="#rights"><span>07</span>Your choices</a>
              <a href="#contact"><span>08</span>Contact</a>
            </nav>
          </aside>

          <div className="policy-content">
            <article id="information">
              <span className="policy-number">01</span>
              <div>
                <h2>Information we receive</h2>
                <p>
                  Main Story may receive technical information such as browser
                  type, device information, IP address, requested pages,
                  referring pages and server logs. If you contact us or join a
                  newsletter, we may also receive the information you choose to
                  submit.
                </p>
              </div>
            </article>

            <article id="use">
              <span className="policy-number">02</span>
              <div>
                <h2>How we use information</h2>
                <p>
                  We may use information to operate and secure the website,
                  understand readership, improve editorial products, respond to
                  inquiries, measure site performance and prevent abuse.
                </p>
              </div>
            </article>

            <article id="analytics">
              <span className="policy-number">03</span>
              <div>
                <h2>Analytics & measurement</h2>
                <p>
                  Main Story may use analytics and tag-management services such
                  as Google Analytics and Google Tag Manager when those services
                  are enabled. These tools may collect usage and device data
                  according to their own terms and settings.
                </p>
              </div>
            </article>

            <article id="cookies">
              <span className="policy-number">04</span>
              <div>
                <h2>Cookies & local storage</h2>
                <p>
                  The site may use cookies or browser storage for preferences,
                  security, analytics and, if enabled later, advertising or
                  consent choices. Main Story also stores appearance preferences
                  such as theme or layout in the browser where applicable.
                </p>
              </div>
            </article>

            <article id="ads">
              <span className="policy-number">05</span>
              <div>
                <h2>Advertising</h2>
                <p>
                  Main Story may display advertising or use advertising partners
                  in the future. If advertising services are enabled, those
                  providers may use cookies or similar technologies subject to
                  applicable consent requirements and their own privacy terms.
                  This policy will be updated when specific advertising partners
                  are introduced.
                </p>
              </div>
            </article>

            <article id="third-parties">
              <span className="policy-number">06</span>
              <div>
                <h2>Third-party services</h2>
                <p>
                  Main Story may rely on service providers for hosting, content
                  management, analytics, email, security and other operations.
                  Links to external websites are governed by those sites&apos;
                  privacy practices, not this policy.
                </p>
              </div>
            </article>

            <article id="rights">
              <span className="policy-number">07</span>
              <div>
                <h2>Your choices</h2>
                <p>
                  You can control many cookies through your browser. Where
                  consent controls are required, Main Story will provide the
                  relevant choices. You may also contact us about privacy-related
                  questions or requests.
                </p>
              </div>
            </article>

            <article id="contact">
              <span className="policy-number">08</span>
              <div>
                <h2>Contact</h2>
                <p>
                  {privacyEmail
                    ? <>Privacy questions can be sent to <a href={"mailto:" + privacyEmail}>{privacyEmail}</a>.</>
                    : <>Add a public contact email in Sanity → Site Settings before launch.</>}
                </p>
                <p>
                  For general newsroom information, see the <Link href="/contact">Contact page</Link>.
                </p>
              </div>
            </article>
          </div>
        </section>
      </main>
      <SiteFooter />
    </>
  );
}
