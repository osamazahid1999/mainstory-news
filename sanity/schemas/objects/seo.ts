import { defineField, defineType } from "sanity";

export const seoType = defineType({
  name: "seo",
  title: "SEO",
  type: "object",
  fields: [
    defineField({ name: "title", title: "SEO title", type: "string", validation: (rule) => rule.max(70) }),
    defineField({ name: "description", title: "Meta description", type: "text", rows: 3, validation: (rule) => rule.max(170) }),
    defineField({ name: "socialTitle", title: "Social title", type: "string" }),
    defineField({ name: "socialDescription", title: "Social description", type: "text", rows: 3 }),
    defineField({ name: "socialImage", title: "Social image", type: "image", options: { hotspot: true } }),
    defineField({ name: "canonicalUrl", title: "Canonical URL", type: "url" }),
    defineField({ name: "noIndex", title: "Hide from search engines", type: "boolean", initialValue: false }),
    defineField({ name: "includeInGoogleNews", title: "Include in Google News", type: "boolean", initialValue: true }),
  ],
});
