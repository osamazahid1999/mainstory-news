import { defineArrayMember, defineField, defineType } from "sanity";

export const liveStoryType = defineType({
  name: "liveStory",
  title: "Live Story",
  type: "document",
  fields: [
    defineField({ name: "title", title: "Live story title", type: "string", validation: (rule) => rule.required() }),
    defineField({ name: "slug", title: "Slug", type: "slug", options: { source: "title", maxLength: 96 }, validation: (rule) => rule.required() }),
    defineField({ name: "summary", title: "Summary", type: "text", rows: 4 }),
    defineField({ name: "featuredImage", title: "Featured image", type: "editorialImage" }),
    defineField({ name: "category", title: "Category", type: "reference", to: [{ type: "category" }] }),
    defineField({ name: "authors", title: "Editor(s)", type: "array", of: [defineArrayMember({ type: "reference", to: [{ type: "author" }] })] }),
    defineField({ name: "status", title: "Live status", type: "string", initialValue: "live", options: { list: [{ title: "Upcoming", value: "upcoming" }, { title: "Live", value: "live" }, { title: "Ended", value: "ended" }] } }),
    defineField({ name: "startedAt", title: "Started at", type: "datetime" }),
    defineField({ name: "endedAt", title: "Ended at", type: "datetime" }),
    defineField({ name: "updates", title: "Live updates", type: "array", of: [defineArrayMember({ type: "liveUpdate" })] }),
    defineField({ name: "seo", title: "SEO & social", type: "seo" }),
  ],
});
