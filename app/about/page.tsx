import type { Metadata } from "next";
import SiteHeader from "@/components/SiteHeader";
import SiteFooter from "@/components/SiteFooter";

export const metadata: Metadata = {
  title: "About",
  description: "Learn about Main Story and its editorial mission.",
  alternates: { canonical: "https://mainstorynews.com/about" },
};

export default function AboutPage() {
  return (
    <>
      <SiteHeader />
      <main className="wrap page-shell trust-page">
        <div className="page-title">
          <span className="eyebrow">ABOUT</span>
          <h1>Main Story</h1>
          <p>What matters. Why it matters.</p>
        </div>
        <div className="trust-copy">
          <p>Main Story is being built as an international news publication focused on clear reporting, useful context, and accessible explanations across world affairs, business, technology, AI, markets, science, culture and video.</p>
          <h2>Our approach</h2>
          <p>Our editorial product is designed to separate headlines from context, make sources and authors visible, support corrections, and help readers understand what changed and why it matters.</p>
          <h2>Our newsroom</h2>
          <p>Published stories identify their authors and sections. Author profile pages provide additional background where available, and editorial updates can be reflected through published and modified timestamps.</p>
        </div>
      </main>
      <SiteFooter />
    </>
  );
}
