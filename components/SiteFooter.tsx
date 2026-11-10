import Link from "next/link";
import { categories } from "@/lib/mock-data";
import { getPublicSiteSettings } from "@/sanity/lib/siteSettings";
import BrandLogo from "@/components/BrandLogo";
import { siFacebook, siInstagram, siX, siYoutube, siReddit, siSubstack, siMastodon, siBluesky } from "simple-icons";

export default async function SiteFooter() {
  const settings = await getPublicSiteSettings();
  const socialLinks = [
    { label: "Facebook", href: settings.facebookUrl, icon: siFacebook },
    { label: "Instagram", href: settings.instagramUrl, icon: siInstagram },
    { label: "X", href: settings.xUrl, icon: siX },
    { label: "YouTube", href: settings.youtubeUrl, icon: siYoutube },
    { label: "Reddit", href: settings.redditUrl, icon: siReddit },
    { label: "Substack", href: settings.substackUrl, icon: siSubstack },
    { label: "Mastodon", href: settings.mastodonUrl, icon: siMastodon },
    { label: "Bluesky", href: settings.blueskyUrl, icon: siBluesky },
  ];

  return (
    <footer>
      <div className="wrap footer-topline">
        <span className="eyebrow">MAIN STORY</span>
        <p>International reporting, analysis and explainers — built for clarity.</p>
        <Link href="/latest">Read the latest →</Link>
      </div>

      <div className="wrap footer-grid">
        <div>
          <Link className="brand-logo footer-brand-logo" href="/" aria-label="Main Story News home"><BrandLogo /></Link>
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
          <Link href="/privacy">Privacy Policy</Link>
          <Link href="/advertise">Advertise With Us</Link>
          <Link href="/contact">Contact</Link>
        </div>
        <div>
          <h4>Follow</h4>
          <div className="footer-socials" aria-label="Social profiles">
            {socialLinks.map((item) => {
              const icon = <svg viewBox="0 0 24 24" aria-hidden="true" focusable="false"><path d={item.icon.path} /></svg>;
              return item.href ? (
                <a key={item.label} className="footer-social" href={item.href} target="_blank" rel="noopener noreferrer" aria-label={item.label} title={item.label} data-analytics-event="social_click" data-analytics-label={item.label.toLowerCase()}>{icon}</a>
              ) : (
                <span key={item.label} className="footer-social footer-social-pending" role="img" aria-label={`${item.label} (link coming soon)`} title={`${item.label} — link coming soon`}>{icon}</span>
              );
            })}
          </div>
        </div>
      </div>
      <div className="wrap copyright">© 2026 {settings.publicationName}. All rights reserved.</div>
    </footer>
  );
}
