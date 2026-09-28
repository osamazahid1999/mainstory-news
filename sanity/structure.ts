import type { StructureResolver } from "sanity/structure";

export const structure: StructureResolver = (S) =>
  S.list()
    .title("Main Story Newsroom")
    .items([
      S.listItem()
        .title("Content")
        .child(
          S.list()
            .title("Content")
            .items([
              S.documentTypeListItem("trendingStory").title("Trending Queue"),
              S.documentTypeListItem("article").title("Articles"),
              S.documentTypeListItem("liveStory").title("Live Coverage"),
              S.documentTypeListItem("breakingNews").title("Breaking News"),
            ]),
        ),

      S.divider(),

      S.listItem()
        .title("People & Taxonomy")
        .child(
          S.list()
            .title("People & Taxonomy")
            .items([
              S.documentTypeListItem("author").title("Authors"),
              S.documentTypeListItem("category").title("Categories"),
              S.documentTypeListItem("topic").title("Topics"),
            ]),
        ),

      S.divider(),

      S.listItem()
        .title("Homepage Manager")
        .child(
          S.document()
            .schemaType("homepageSettings")
            .documentId("homepageSettings")
            .title("Homepage Manager"),
        ),

      S.listItem()
        .title("Site Settings")
        .child(
          S.document()
            .schemaType("siteSettings")
            .documentId("siteSettings")
            .title("Site Settings"),
        ),
    ]);
