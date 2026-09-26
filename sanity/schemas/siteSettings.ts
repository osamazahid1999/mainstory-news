import { defineField, defineType } from "sanity";

export const siteSettingsType = defineType({
  name: "siteSettings",
  title: "Site Settings",
  type: "document",
  fields: [
    defineField({ name: "publicationName", title: "Publication name", type: "string", initialValue: "Main Story" }),
    defineField({ name: "tagline", title: "Tagline", type: "string", initialValue: "What matters. Why it matters." }),
    defineField({ name: "logo", title: "Logo", type: "image", options: { hotspot: true } }),
    defineField({ name: "accentColor", title: "Brand accent color", type: "string", initialValue: "#D71920" }),
    defineField({ name: "defaultTheme", title: "Default theme", type: "string", initialValue: "light", options: { list: [["Light", "light"], ["Dark", "dark"], ["System", "system"]] } }),
    defineField({ name: "defaultLayout", title: "Default layout", type: "string", initialValue: "wide", options: { list: [["Wide", "wide"], ["Comfortable", "comfortable"]] } }),
    defineField({ name: "contactEmail", title: "Contact email", type: "string" }),
    defineField({ name: "xUrl", title: "X", type: "url" }),
    defineField({ name: "instagramUrl", title: "Instagram", type: "url" }),
    defineField({ name: "youtubeUrl", title: "YouTube", type: "url" }),
    defineField({ name: "linkedinUrl", title: "LinkedIn", type: "url" }),
  ],
});
