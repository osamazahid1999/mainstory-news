import { articleType } from "./article";
import { authorType } from "./author";
import { breakingNewsType } from "./breakingNews";
import { categoryType } from "./category";
import { homepageSettingsType } from "./homepageSettings";
import { liveStoryType } from "./liveStory";
import { siteSettingsType } from "./siteSettings";
import { topicType } from "./topic";
import { trendingStoryType } from "./trendingStory";
import { editorialImageType } from "./objects/editorialImage";
import { liveUpdateType } from "./objects/liveUpdate";
import { seoType } from "./objects/seo";

export const schemaTypes = [
  editorialImageType,
  seoType,
  liveUpdateType,
  authorType,
  categoryType,
  topicType,
  articleType,
  trendingStoryType,
  breakingNewsType,
  liveStoryType,
  homepageSettingsType,
  siteSettingsType,
];
