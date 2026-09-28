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
    defineField({ name: "defaultTheme", title: "Default theme", type: "string", initialValue: "light", options: { list: [{ title: "Light", value: "light" }, { title: "Dark", value: "dark" }, { title: "System", value: "system" }] } }),
    defineField({ name: "defaultLayout", title: "Default layout", type: "string", initialValue: "wide", options: { list: [{ title: "Wide", value: "wide" }, { title: "Comfortable", value: "comfortable" }] } }),
    defineField({ name: "contactEmail", title: "General contact email", type: "string" }),
    defineField({ name: "editorialEmail", title: "Editorial email", type: "string" }),
    defineField({ name: "correctionsEmail", title: "Corrections email", type: "string" }),
    defineField({ name: "advertisingEmail", title: "Advertising email", type: "string" }),
    defineField({ name: "publisherName", title: "Publisher / business name", type: "string" }),
    defineField({ name: "publisherCountry", title: "Publisher country", type: "string" }),
    defineField({ name: "xUrl", title: "X", type: "url" }),
    defineField({ name: "instagramUrl", title: "Instagram", type: "url" }),
    defineField({ name: "youtubeUrl", title: "YouTube", type: "url" }),
    defineField({ name: "linkedinUrl", title: "LinkedIn", type: "url" }),
  ],
});
