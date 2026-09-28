import { defineField, defineType } from "sanity";

export const authorType = defineType({
  name: "author",
  title: "Author",
  type: "document",
  fields: [
    defineField({ name: "name", title: "Name", type: "string", validation: (rule) => rule.required() }),
    defineField({ name: "slug", title: "Slug", type: "slug", options: { source: "name", maxLength: 96 }, validation: (rule) => rule.required() }),
    defineField({ name: "photo", title: "Photo", type: "editorialImage" }),
    defineField({ name: "jobTitle", title: "Job title", type: "string" }),
    defineField({ name: "bio", title: "Bio", type: "text", rows: 5 }),
    defineField({ name: "email", title: "Public email", type: "string" }),
    defineField({ name: "xUrl", title: "X profile", type: "url" }),
    defineField({ name: "linkedinUrl", title: "LinkedIn profile", type: "url" }),
    defineField({ name: "expertise", title: "Expertise", type: "array", of: [{ type: "string" }] }),
  ],
});
