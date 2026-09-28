import type { MetadataRoute } from "next";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: "Main Story",
    short_name: "Main Story",
    description:
      "What matters. Why it matters. International news, business, technology, AI, markets, science and culture.",
    start_url: "/",
    display: "standalone",
    background_color: "#ffffff",
    theme_color: "#d71920",
    icons: [],
  };
}
