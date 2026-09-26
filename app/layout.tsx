import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: { default: "Main Story", template: "%s | Main Story" },
  description:
    "What matters. Why it matters. International news, business, technology, AI, markets, science and culture.",
  metadataBase: new URL("https://mainstorynews.com"),
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
