import { defineArrayMember, defineField, defineType } from "sanity";

export const homepageSettingsType = defineType({
  name: "homepageSettings",
  title: "Homepage Settings",
  type: "document",
  fields: [
    defineField({ name: "leadStory", title: "Main lead story", type: "reference", to: [{ type: "article" }] }),
    defineField({ name: "secondaryStories", title: "Hero secondary stories", type: "array", validation: (rule) => rule.max(2), of: [defineArrayMember({ type: "reference", to: [{ type: "article" }] })] }),
    defineField({ name: "editorsPicks", title: "Editor's picks", type: "array", of: [defineArrayMember({ type: "reference", to: [{ type: "article" }] })] }),
    defineField({ name: "featuredVideoStories", title: "Featured video stories", type: "array", of: [defineArrayMember({ type: "reference", to: [{ type: "article" }] })] }),
    defineField({ name: "showMostRead", title: "Show Most Read", type: "boolean", initialValue: true }),
    defineField({ name: "showNewsletter", title: "Show newsletter signup", type: "boolean", initialValue: true }),
  ],
});
