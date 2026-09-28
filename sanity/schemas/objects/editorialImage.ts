import { defineField, defineType } from "sanity";

export const editorialImageType = defineType({
  name: "editorialImage",
  title: "Editorial image",
  type: "image",
  options: { hotspot: true },
  fields: [
    defineField({ name: "alt", title: "Alt text", type: "string", validation: (rule) => rule.required() }),
    defineField({ name: "caption", title: "Caption", type: "string" }),
    defineField({ name: "credit", title: "Credit / photographer", type: "string" }),
    defineField({ name: "source", title: "Source", type: "string" }),
  ],
});
