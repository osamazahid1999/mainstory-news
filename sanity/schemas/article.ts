import { defineArrayMember, defineField, defineType } from "sanity";

export const articleType = defineType({
  name: "article",
  title: "Article",
  type: "document",
  groups: [
    { name: "content", title: "Content", default: true },
    { name: "publishing", title: "Publishing" },
    { name: "review", title: "Editorial Review" },
    { name: "seo", title: "SEO" },
  ],
  fields: [
    defineField({ name: "title", title: "Headline", type: "string", group: "content", validation: (rule) => rule.required().max(140) }),
    defineField({ name: "slug", title: "Slug", type: "slug", group: "content", options: { source: "title", maxLength: 96 }, validation: (rule) => rule.required() }),
    defineField({ name: "subtitle", title: "Subtitle / deck", type: "text", rows: 3, group: "content" }),
    defineField({ name: "excerpt", title: "Excerpt", type: "text", rows: 3, group: "content", validation: (rule) => rule.max(240) }),
    defineField({ name: "featuredImage", title: "Featured image", type: "editorialImage", group: "content", validation: (rule) => rule.required() }),
    defineField({
      name: "articleType",
      title: "Article type",
      type: "string",
      group: "content",
      initialValue: "news",
      options: {
        list: [
          { title: "News", value: "news" },
          { title: "Breaking", value: "breaking" },
          { title: "Analysis", value: "analysis" },
          { title: "Explainer", value: "explainer" },
          { title: "Opinion", value: "opinion" },
          { title: "Interview", value: "interview" },
          { title: "Investigation", value: "investigation" },
          { title: "Feature", value: "feature" },
          { title: "Review", value: "review" },
          { title: "Video", value: "video" },
          { title: "Gallery", value: "gallery" },
        ],
        layout: "dropdown",
      },
    }),
    defineField({ name: "authors", title: "Author(s)", type: "array", group: "content", of: [defineArrayMember({ type: "reference", to: [{ type: "author" }] })], validation: (rule) => rule.min(1) }),
    defineField({ name: "category", title: "Category", type: "reference", group: "content", to: [{ type: "category" }], validation: (rule) => rule.required() }),
    defineField({ name: "topics", title: "Topics", type: "array", group: "content", of: [defineArrayMember({ type: "reference", to: [{ type: "topic" }] })] }),
    defineField({
      name: "body",
      title: "Story body",
      type: "array",
      group: "content",
      of: [
        defineArrayMember({
          type: "block",
          styles: [
            { title: "Normal", value: "normal" },
            { title: "Heading 2", value: "h2" },
            { title: "Heading 3", value: "h3" },
            { title: "Quote", value: "blockquote" },
          ],
        }),
        defineArrayMember({ type: "editorialImage" }),
      ],
    }),
    defineField({
      name: "workflowStatus",
      title: "Editorial status",
      type: "string",
      group: "publishing",
      initialValue: "draft",
      options: {
        list: [
          { title: "Draft", value: "draft" },
          { title: "In review", value: "review" },
          { title: "Editing", value: "editing" },
          { title: "Approved", value: "approved" },
          { title: "Scheduled", value: "scheduled" },
          { title: "Published", value: "published" },
          { title: "Archived", value: "archived" },
        ],
      },
    }),
    defineField({ name: "publishedAt", title: "Publish date/time", type: "datetime", group: "publishing" }),
    defineField({ name: "updatedAt", title: "Last editorial update", type: "datetime", group: "publishing" }),
    defineField({ name: "featured", title: "Featured story", type: "boolean", group: "publishing", initialValue: false }),
    defineField({ name: "breaking", title: "Breaking news", type: "boolean", group: "publishing", initialValue: false }),
    defineField({ name: "editorsPick", title: "Editor's pick", type: "boolean", group: "publishing", initialValue: false }),
    defineField({ name: "allowComments", title: "Allow comments", type: "boolean", group: "publishing", initialValue: false }),
    defineField({ name: "correctionNote", title: "Correction note", type: "text", rows: 4, group: "publishing" }),
    defineField({ name: "sources", title: "Sources", type: "array", group: "publishing", of: [defineArrayMember({ type: "url" })] }),

    defineField({
      name: "factChecked",
      title: "Fact checked",
      type: "boolean",
      group: "review",
      initialValue: false,
      description: "Key facts, names, dates, figures and claims have been verified.",
    }),
    defineField({
      name: "sourcesChecked",
      title: "Sources checked",
      type: "boolean",
      group: "review",
      initialValue: false,
      description: "Source links are credible, relevant and correctly attributed.",
    }),
    defineField({
      name: "headlineChecked",
      title: "Headline checked",
      type: "boolean",
      group: "review",
      initialValue: false,
      description: "Headline is accurate, clear and not misleading.",
    }),
    defineField({
      name: "imageRightsChecked",
      title: "Image rights checked",
      type: "boolean",
      group: "review",
      initialValue: false,
      description: "Featured image usage rights, credit and alt text have been checked.",
    }),
    defineField({
      name: "seoChecked",
      title: "SEO checked",
      type: "boolean",
      group: "review",
      initialValue: false,
      description: "Slug, excerpt, SEO title/description and metadata have been reviewed.",
    }),
    defineField({
      name: "readyToPublish",
      title: "Ready to publish",
      type: "boolean",
      group: "review",
      initialValue: false,
      description: "Final editorial approval. Only mark this after every review item above is complete.",
      validation: (rule) =>
        rule.custom((value, context) => {
          if (!value) return true;
          const parent = context.parent as {
            factChecked?: boolean;
            sourcesChecked?: boolean;
            headlineChecked?: boolean;
            imageRightsChecked?: boolean;
            seoChecked?: boolean;
          } | undefined;

          return parent?.factChecked &&
            parent?.sourcesChecked &&
            parent?.headlineChecked &&
            parent?.imageRightsChecked &&
            parent?.seoChecked
            ? true
            : "Complete every editorial review check before marking Ready to publish.";
        }),
    }),

    defineField({ name: "seo", title: "SEO & social", type: "seo", group: "seo" }),
  ],
  preview: {
    select: {
      title: "title",
      subtitle: "workflowStatus",
      media: "featuredImage",
    },
  },
});
