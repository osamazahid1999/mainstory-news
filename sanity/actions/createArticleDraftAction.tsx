"use client";

import { useState } from "react";
import type { DocumentActionComponent } from "sanity";
import { useClient } from "sanity";
import { apiVersion } from "../env";

type TrendingDocument = {
  sourceHeadline?: string;
  sourceName?: string;
  sourceUrl?: string;
  category?: { _ref?: string };
  articleDraft?: { _ref?: string };
};

function cleanHeadline(headline: string, sourceName?: string) {
  let value = headline.trim();

  if (sourceName) {
    const escaped = sourceName.replace(/[.*+?^\$\{\}()|[\]\\]/g, "\\$&");
    value = value.replace(new RegExp("\\s+-\\s+" + escaped + "\\s*$", "i"), "");
  }

  return value
    .replace(
      /\s+-\s+(Reuters|AP News|Associated Press|BBC|BBC News|CNN|CNBC|Bloomberg|Financial Times|The Guardian|Al Jazeera|TechCrunch|The Verge|Ars Technica|WIRED)\s*$/i,
      "",
    )
    .trim();
}

function slugify(value: string) {
  return value
    .toLowerCase()
    .normalize("NFKD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "")
    .slice(0, 96);
}

export const createArticleDraftAction: DocumentActionComponent = (props) => {
  const client = useClient({ apiVersion });
  const [working, setWorking] = useState(false);

  const source = (props.draft || props.published) as TrendingDocument | null;
  const alreadyLinked = Boolean(source?.articleDraft?._ref);

  return {
    label: alreadyLinked ? "Article Draft Created" : "Create Article Draft",
    tone: alreadyLinked ? "positive" : "primary",
    disabled:
      working ||
      alreadyLinked ||
      !source?.sourceHeadline ||
      !source?.sourceUrl ||
      !source?.category?._ref,
    onHandle: async () => {
      if (!source?.sourceHeadline || !source.sourceUrl || !source.category?._ref) {
        window.alert("Headline, source URL and category are required.");
        props.onComplete();
        return;
      }

      setWorking(true);

      try {
        const sourceId = props.id.replace(/^drafts\./, "");
        const articleId = "drafts.article-from-" + sourceId;
        const articleRefId = "article-from-" + sourceId;
        const title = cleanHeadline(source.sourceHeadline, source.sourceName);
        const slug = slugify(title);

        await client
          .transaction()
          .createIfNotExists({
            _id: articleId,
            _type: "article",
            title,
            slug: { _type: "slug", current: slug },
            category: {
              _type: "reference",
              _ref: source.category._ref,
            },
            sources: [source.sourceUrl],
            workflowStatus: "draft",
            articleType: "news",
            featured: false,
            breaking: false,
            editorsPick: false,
            allowComments: false,
            updatedAt: new Date().toISOString(),
          })
          .patch(props.id, (patch) =>
            patch.set({
              status: "drafted",
              articleDraft: {
                _type: "reference",
                _ref: articleRefId,
                _weak: true,
              },
            }),
          )
          .commit();

        window.alert(
          "Article draft created. Open Content → Articles → Drafts to continue editing.",
        );
      } catch (error) {
        console.error(error);
        window.alert(
          error instanceof Error
            ? "Could not create article draft: " + error.message
            : "Could not create article draft. Please try again.",
        );
      } finally {
        setWorking(false);
        props.onComplete();
      }
    },
  };
};
