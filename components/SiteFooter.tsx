import Link from "next/link";
import { categories } from "@/lib/mock-data";
import { getPublicSiteSettings } from "@/sanity/lib/siteSettings";

export default async function SiteFooter() {
  const settings = await getPublicSiteSettings();
  const socialLinks = [
    { label: "YouTube", href: settings.youtubeUrl },
    { label: "Instagram", href: settings.instagramUrl },
    { label: "X", href: settings.xUrl },
    { label: "LinkedIn", href: settings.linkedinUrl },
  ].filter((item): item is { label: string; href: string } => Boolean(item.href));

  return (
    <footer>
      <div className="wrap footer-topline">
        <span className="eyebrow">MAIN STORY</span>
        <p>International reporting, analysis and explainers — built for clarity.</p>
        <Link href="/latest">Read the latest →</Link>
      </div>

      <div className="wrap footer-grid">
        <div>
          <Link className="logo light" href="/">MAIN <strong>STORY</strong></Link>
          <p>{settings.tagline}</p>
        </div>
        <div>
          <h4>Sections</h4>
          {categories.slice(0,5).map((item) => (
            <Link key={item} href={"/category/" + item}>
              {item[0].toUpperCase()+item.slice(1)}
            </Link>
          ))}
        </div>
        <div>
          <h4>Company</h4>
          <Link href="/about">About</Link>
          <Link href="/editorial-policy">Editorial Policy</Link>
          <Link href="/corrections">Corrections</Link>
          <Link href="/contact">Contact</Link>
        </div>
        <div>
          <h4>Follow</h4>
          {socialLinks.length > 0 ? (
            socialLinks.map((item) => (
              <a
                key={item.label}
                href={item.href}
                target="_blank"
                rel="noreferrer"
                data-analytics-event="social_click"
                data-analytics-label={item.label.toLowerCase()}
              >
                {item.label}
              </a>
            ))
          ) : (
            <span className="footer-muted">Social links are configured in Site Settings.</span>
          )}
        </div>
      </div>
      <div className="wrap copyright">© 2026 {settings.publicationName}. All rights reserved.</div>
    </footer>
  );
}
