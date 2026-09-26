import { defineArrayMember, defineField, defineType } from "sanity";

export const liveUpdateType = defineType({
  name: "liveUpdate",
  title: "Live update",
  type: "object",
  fields: [
    defineField({ name: "publishedAt", title: "Update time", type: "datetime", validation: (rule) => rule.required() }),
    defineField({ name: "headline", title: "Headline", type: "string", validation: (rule) => rule.required() }),
    defineField({
      name: "body",
      title: "Update",
      type: "array",
      of: [
        defineArrayMember({ type: "block" }),
        defineArrayMember({ type: "editorialImage" }),
      ],
    }),
  ],
  preview: {
    select: { title: "headline", subtitle: "publishedAt" },
  },
});
