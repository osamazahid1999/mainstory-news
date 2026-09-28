import { defineField, defineType } from "sanity";

export const trendingStoryType = defineType({
  name: "trendingStory",
  title: "Trending Story",
  type: "document",
  groups: [
    { name: "source", title: "Source", default: true },
    { name: "workflow", title: "Workflow" },
    { name: "editorial", title: "Editorial Notes" },
  ],
  fields: [
    defineField({
      name: "sourceHeadline",
      title: "Source headline",
      type: "string",
      group: "source",
      validation: (rule) => rule.required().max(220),
    }),
    defineField({
      name: "sourceUrl",
      title: "Source URL",
      type: "url",
      group: "source",
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "sourceName",
      title: "Source",
      type: "string",
      group: "source",
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "sourcePublishedAt",
      title: "Source published at",
      type: "datetime",
      group: "source",
    }),
    defineField({
      name: "discoveredAt",
      title: "Discovered at",
      type: "datetime",
      group: "source",
      initialValue: () => new Date().toISOString(),
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "category",
      title: "Category",
      type: "reference",
      to: [{ type: "category" }],
      group: "workflow",
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "status",
      title: "Status",
      type: "string",
      group: "workflow",
      initialValue: "new",
      options: {
        list: [
          { title: "New", value: "new" },
          { title: "Reviewing", value: "reviewing" },
          { title: "Drafted", value: "drafted" },
          { title: "Rejected", value: "rejected" },
          { title: "Archived", value: "archived" },
        ],
      },
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "priority",
      title: "Priority",
      type: "string",
      group: "workflow",
      initialValue: "normal",
      options: {
        list: [
          { title: "High", value: "high" },
          { title: "Normal", value: "normal" },
          { title: "Low", value: "low" },
        ],
        layout: "radio",
      },
    }),
    defineField({
      name: "duplicateKey",
      title: "Duplicate key",
      type: "string",
      group: "workflow",
      readOnly: true,
      description: "Used by the collector to avoid importing the same source story twice.",
    }),
    defineField({
      name: "articleDraft",
      title: "Linked article draft",
      type: "reference",
      to: [{ type: "article" }],
      group: "workflow",
    }),
    defineField({
      name: "summary",
      title: "Source summary / notes",
      type: "text",
      rows: 4,
      group: "editorial",
      description: "Optional notes for the editor. The free collector does not generate AI summaries.",
    }),
    defineField({
      name: "editorNotes",
      title: "Editor notes",
      type: "text",
      rows: 5,
      group: "editorial",
    }),
    defineField({
      name: "imageSourceUrl",
      title: "Possible image source URL",
      type: "url",
      group: "editorial",
      description: "Use only after checking usage rights/licensing.",
    }),
    defineField({
      name: "imageRightsStatus",
      title: "Image rights status",
      type: "string",
      group: "editorial",
      initialValue: "unchecked",
      options: {
        list: [
          { title: "Unchecked", value: "unchecked" },
          { title: "Allowed / licensed", value: "allowed" },
          { title: "Public domain", value: "public-domain" },
          { title: "Needs replacement", value: "replace" },
        ],
      },
    }),
  ],
  orderings: [
    {
      title: "Newest discovered",
      name: "discoveredDesc",
      by: [{ field: "discoveredAt", direction: "desc" }],
    },
  ],
  preview: {
    select: {
      title: "sourceHeadline",
      source: "sourceName",
      status: "status",
      category: "category.title",
    },
    prepare({ title, source, status, category }) {
      return {
        title,
        subtitle: [category, source, status].filter(Boolean).join(" · "),
      };
    },
  },
});
