import type { Metadata } from "next";
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

  return (
    <>
      <SiteHeader />
      <main className="wrap page-shell trust-page">
        <div className="page-title">
          <span className="eyebrow">CONTACT</span>
          <h1>Contact Main Story</h1>
          <p>For editorial questions, corrections, partnerships and general inquiries.</p>
        </div>
        <div className="trust-copy">
          {settings.contactEmail ? (
            <>
              <h2>Email</h2>
              <p><a href={"mailto:" + settings.contactEmail}>{settings.contactEmail}</a></p>
            </>
          ) : (
            <p>A public contact email can be configured in Sanity under Site Settings before launch.</p>
          )}
          <h2>Corrections</h2>
          <p>When reporting a possible error, include the article URL and a concise explanation of the issue so it can be reviewed efficiently.</p>
        </div>
      </main>
      <SiteFooter />
    </>
  );
}
