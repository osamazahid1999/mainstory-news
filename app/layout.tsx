import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: { default: "Main Story", template: "%s | Main Story" },
  description:
    "What matters. Why it matters. International news, business, technology, AI, markets, science and culture.",
  metadataBase: new URL("https://mainstorynews.com"),
  alternates: {
    canonical: "/",
    types: {
      "application/rss+xml": "https://mainstorynews.com/rss.xml",
    },
  },
  openGraph: {
    type: "website",
    url: "https://mainstorynews.com",
    siteName: "Main Story",
    title: "Main Story",
    description:
      "What matters. Why it matters. International news, business, technology, AI, markets, science and culture.",
  },
  twitter: {
    card: "summary_large_image",
    title: "Main Story",
    description:
      "What matters. Why it matters. International news, business, technology, AI, markets, science and culture.",
  },
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
