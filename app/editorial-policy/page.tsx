import type { Metadata } from "next";
import SiteHeader from "@/components/SiteHeader";
import SiteFooter from "@/components/SiteFooter";

export const metadata: Metadata = {
  title: "Editorial Policy",
  description: "Main Story editorial standards and publishing principles.",
  alternates: { canonical: "https://mainstorynews.com/editorial-policy" },
};

export default function EditorialPolicyPage() {
  return (
    <>
      <SiteHeader />
      <main className="wrap page-shell trust-page">
        <div className="page-title">
          <span className="eyebrow">STANDARDS</span>
          <h1>Editorial Policy</h1>
          <p>The standards Main Story is designed to follow when reporting, editing and updating published work.</p>
        </div>
        <div className="trust-copy">
          <h2>Accuracy and verification</h2>
          <p>Newsroom content should be based on verifiable information, clearly sourced where appropriate, and updated when material facts change.</p>
          <h2>Context and clarity</h2>
          <p>Coverage should distinguish confirmed facts from analysis, opinion, projections and claims made by sources. Headlines should accurately reflect the substance of the story.</p>
          <h2>Conflicts and transparency</h2>
          <p>Relevant conflicts of interest, sponsored material or other relationships that could affect a reader’s understanding should be disclosed clearly.</p>
          <h2>Corrections</h2>
          <p>Material errors should be corrected promptly and transparently. See the Corrections page for the public correction process.</p>
        </div>
      </main>
      <SiteFooter />
    </>
  );
}
