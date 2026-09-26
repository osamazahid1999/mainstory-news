import type { Metadata } from "next";
import Link from "next/link";
import SiteHeader from "@/components/SiteHeader";
import SiteFooter from "@/components/SiteFooter";

export const metadata: Metadata = {
  title: "Corrections",
  description: "How Main Story handles corrections and updates.",
  alternates: { canonical: "https://mainstorynews.com/corrections" },
};

export default function CorrectionsPage() {
  return (
    <>
      <SiteHeader />
      <main className="wrap page-shell trust-page">
        <div className="page-title">
          <span className="eyebrow">TRANSPARENCY</span>
          <h1>Corrections</h1>
          <p>How to report a possible error and how corrections are displayed.</p>
        </div>
        <div className="trust-copy">
          <p>If you believe a Main Story article contains a factual error, send the article URL and a clear description of the issue through the <Link href="/contact">contact page</Link>.</p>
          <h2>What happens next</h2>
          <p>The newsroom can review the cited material and the published article. When a material error is confirmed, the article can be corrected and a correction note can be displayed with the story.</p>
          <h2>Updates versus corrections</h2>
          <p>Routine developments may update an article without implying the earlier version was wrong. A correction note is intended for material factual errors or changes that require explicit reader notice.</p>
        </div>
      </main>
      <SiteFooter />
    </>
  );
}
