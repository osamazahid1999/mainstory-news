import { defineField, defineType } from "sanity";

export const categoryType = defineType({
  name: "category",
  title: "Category",
  type: "document",
  fields: [
    defineField({ name: "title", title: "Title", type: "string", validation: (rule) => rule.required() }),
    defineField({ name: "slug", title: "Slug", type: "slug", options: { source: "title", maxLength: 96 }, validation: (rule) => rule.required() }),
    defineField({ name: "description", title: "Description", type: "text", rows: 4 }),
    defineField({ name: "accentColor", title: "Section accent color", type: "string", description: "Admin-controlled brand accent for this section, e.g. #D71920" }),
    defineField({ name: "showInPrimaryNav", title: "Show in primary navigation", type: "boolean", initialValue: true }),
    defineField({ name: "sortOrder", title: "Navigation order", type: "number" }),
  ],
});
