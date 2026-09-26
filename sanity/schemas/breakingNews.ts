import { defineField, defineType } from "sanity";

export const breakingNewsType = defineType({
  name: "breakingNews",
  title: "Breaking News",
  type: "document",
  fields: [
    defineField({ name: "headline", title: "Breaking headline", type: "string", validation: (rule) => rule.required().max(140) }),
    defineField({ name: "article", title: "Linked article", type: "reference", to: [{ type: "article" }] }),
    defineField({ name: "externalUrl", title: "External URL", type: "url" }),
    defineField({ name: "priority", title: "Priority", type: "string", initialValue: "normal", options: { list: [["Normal", "normal"], ["High", "high"], ["Urgent", "urgent"]] } }),
    defineField({ name: "startsAt", title: "Start showing", type: "datetime", validation: (rule) => rule.required() }),
    defineField({ name: "endsAt", title: "Stop showing", type: "datetime" }),
    defineField({ name: "enabled", title: "Enabled", type: "boolean", initialValue: true }),
  ],
});
