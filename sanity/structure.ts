import type { StructureResolver } from "sanity/structure";

const trendingList = (S: Parameters<StructureResolver>[0]) =>
  S.list()
    .title("Trending Queue")
    .items([
      S.listItem()
        .title("New")
        .child(
          S.documentList()
            .title("New")
            .schemaType("trendingStory")
            .filter('_type == "trendingStory" && status == "new"')
            .defaultOrdering([{ field: "discoveredAt", direction: "desc" }]),
        ),
      S.listItem()
        .title("Reviewing")
        .child(
          S.documentList()
            .title("Reviewing")
            .schemaType("trendingStory")
            .filter('_type == "trendingStory" && status == "reviewing"')
            .defaultOrdering([{ field: "discoveredAt", direction: "desc" }]),
        ),
      S.listItem()
        .title("Drafted")
        .child(
          S.documentList()
            .title("Drafted")
            .schemaType("trendingStory")
            .filter('_type == "trendingStory" && status == "drafted"')
            .defaultOrdering([{ field: "discoveredAt", direction: "desc" }]),
        ),
      S.listItem()
        .title("Rejected")
        .child(
          S.documentList()
            .title("Rejected")
            .schemaType("trendingStory")
            .filter('_type == "trendingStory" && status == "rejected"')
            .defaultOrdering([{ field: "discoveredAt", direction: "desc" }]),
        ),
      S.divider(),
      S.documentTypeListItem("trendingStory").title("All Trending Stories"),
    ]);

const articleList = (S: Parameters<StructureResolver>[0]) =>
  S.list()
    .title("Articles")
    .items([
      S.listItem()
        .title("Needs Work")
        .child(
          S.documentList()
            .title("Needs Work")
            .schemaType("article")
            .filter(
              '_type == "article" && _id in path("drafts.**") && readyToPublish != true && workflowStatus != "archived"',
            )
            .defaultOrdering([{ field: "_updatedAt", direction: "desc" }]),
        ),
      S.listItem()
        .title("Ready to Publish")
        .child(
          S.documentList()
            .title("Ready to Publish")
            .schemaType("article")
            .filter(
              '_type == "article" && _id in path("drafts.**") && readyToPublish == true && factChecked == true && sourcesChecked == true && headlineChecked == true && imageRightsChecked == true && seoChecked == true',
            )
            .defaultOrdering([{ field: "_updatedAt", direction: "desc" }]),
        ),
      S.listItem()
        .title("Published")
        .child(
          S.documentList()
            .title("Published")
            .schemaType("article")
            .filter(
              '_type == "article" && workflowStatus == "published"',
            )
            .defaultOrdering([{ field: "publishedAt", direction: "desc" }]),
        ),
      S.divider(),
      S.documentTypeListItem("article").title("All Articles"),
    ]);

export const structure: StructureResolver = (S) =>
  S.list()
    .title("Main Story Newsroom")
    .items([
      S.listItem().title("Content").child(
        S.list()
          .title("Content")
          .items([
            S.listItem().title("Trending Queue").child(trendingList(S)),
            S.listItem().title("Articles").child(articleList(S)),
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
