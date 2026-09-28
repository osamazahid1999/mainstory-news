import fs from "node:fs";
import crypto from "node:crypto";

function loadLocalEnv() {
  if (!fs.existsSync(".env.local")) return;
  const raw = fs.readFileSync(".env.local", "utf8");
  for (const line of raw.split(/\r?\n/)) {
    const trimmed = line.trim();
    if (!trimmed || trimmed.startsWith("#")) continue;
    const idx = trimmed.indexOf("=");
    if (idx === -1) continue;
    const key = trimmed.slice(0, idx).trim();
    let value = trimmed.slice(idx + 1).trim();
    if (
      (value.startsWith('"') && value.endsWith('"')) ||
      (value.startsWith("'") && value.endsWith("'"))
    ) {
      value = value.slice(1, -1);
    }
    if (!process.env[key]) process.env[key] = value;
  }
}

loadLocalEnv();

const projectId = process.env.NEXT_PUBLIC_SANITY_PROJECT_ID;
const dataset = process.env.NEXT_PUBLIC_SANITY_DATASET || "production";
const token = process.env.SANITY_API_WRITE_TOKEN;
const apiVersion = "2026-09-01";

if (!projectId) throw new Error("Missing NEXT_PUBLIC_SANITY_PROJECT_ID");
if (!token) throw new Error("Missing SANITY_API_WRITE_TOKEN");

const trustedPublishers = new Set([
  "Reuters",
  "Associated Press",
  "AP News",
  "BBC",
  "BBC News",
  "CNN",
  "The Guardian",
  "Financial Times",
  "Bloomberg",
  "CNBC",
  "Al Jazeera",
  "TechCrunch",
  "The Verge",
  "Ars Technica",
  "WIRED",
  "Nature",
  "Science",
  "NASA",
  "World Health Organization",
  "WHO",
  "United Nations",
  "UN News",
]);

const categoryDefinitions = [
  { slug: "world", title: "World", sortOrder: 1, description: "Global affairs, diplomacy, conflict, politics and major international developments." },
  { slug: "business", title: "Business", sortOrder: 2, description: "Companies, industries, trade, earnings and the global economy." },
  { slug: "technology", title: "Technology", sortOrder: 3, description: "Technology, software, hardware, cybersecurity, chips and the internet." },
  { slug: "ai", title: "AI", sortOrder: 4, description: "Artificial intelligence, machine learning, models, products and policy." },
  { slug: "markets", title: "Markets", sortOrder: 5, description: "Stocks, bonds, commodities, currencies, rates and market-moving developments." },
  { slug: "science", title: "Science", sortOrder: 6, description: "Science, space, climate, health research and discovery." },
  { slug: "culture", title: "Culture", sortOrder: 7, description: "Film, television, music, books, art and entertainment." },
  { slug: "video", title: "Video", sortOrder: 8, description: "Video-led news, interviews, briefings, footage and visual explainers." },
];

const categoryQueries = {
  world:
    '(world OR international OR diplomacy OR conflict OR election OR government) when:1d',
  business:
    '(business OR companies OR economy OR earnings OR trade OR industry) when:1d',
  technology:
    '(technology OR software OR hardware OR cybersecurity OR chips OR internet) when:1d',
  ai:
    '("artificial intelligence" OR AI OR "machine learning" OR OpenAI OR Anthropic OR Gemini) when:1d',
  markets:
    '(markets OR stocks OR bonds OR commodities OR forex OR inflation OR rates) when:1d',
  science:
    '(science OR space OR climate OR health research OR physics OR biology) when:1d',
  culture:
    '(culture OR film OR music OR television OR books OR art OR entertainment) when:1d',
  video:
    '(video OR interview OR briefing OR livestream OR footage) when:1d',
};

function decodeXml(value = "") {
  return value
    .replace(/<!\[CDATA\[([\s\S]*?)\]\]>/g, "$1")
    .replace(/&amp;/g, "&")
    .replace(/&lt;/g, "<")
    .replace(/&gt;/g, ">")
    .replace(/&quot;/g, '"')
    .replace(/&#39;/g, "'");
}

function getTag(block, tag) {
  const match = block.match(new RegExp(`<${tag}(?:\\s[^>]*)?>([\\s\\S]*?)<\\/${tag}>`, "i"));
  return match ? decodeXml(match[1].trim()) : "";
}

function getSource(block) {
  const match = block.match(/<source(?:\s+url="([^"]*)")?[^>]*>([\s\S]*?)<\/source>/i);
  if (!match) return { name: "", url: "" };
  return { url: decodeXml(match[1] || ""), name: decodeXml(match[2].trim()) };
}

function normalizeHeadline(value) {
  return value
    .toLowerCase()
    .replace(/\s+-\s+[^-]+$/, "")
    .replace(/[^a-z0-9]+/g, " ")
    .trim();
}

function makeDuplicateKey(headline) {
  return crypto
    .createHash("sha256")
    .update(normalizeHeadline(headline))
    .digest("hex")
    .slice(0, 32);
}

function parseFeed(xml) {
  const itemBlocks = xml.match(/<item>[\s\S]*?<\/item>/gi) || [];
  return itemBlocks.map((block) => {
    const source = getSource(block);
    return {
      headline: getTag(block, "title"),
      link: getTag(block, "link"),
      publishedAt: getTag(block, "pubDate"),
      sourceName: source.name,
      sourceHome: source.url,
    };
  });
}

async function sanityQuery(query, params = {}) {
  const url = new URL(
    `https://${projectId}.api.sanity.io/v${apiVersion}/data/query/${dataset}`,
  );
  url.searchParams.set("query", query);
  for (const [key, value] of Object.entries(params)) {
    url.searchParams.set(`$${key}`, JSON.stringify(value));
  }

  const response = await fetch(url, {
    headers: { Authorization: `Bearer ${token}` },
  });

  if (!response.ok) {
    throw new Error(`Sanity query failed: ${response.status} ${await response.text()}`);
  }

  const payload = await response.json();
  return payload.result;
}

async function sanityMutate(mutations) {
  const response = await fetch(
    `https://${projectId}.api.sanity.io/v${apiVersion}/data/mutate/${dataset}?returnIds=true`,
    {
      method: "POST",
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ mutations }),
    },
  );

  if (!response.ok) {
    throw new Error(`Sanity mutation failed: ${response.status} ${await response.text()}`);
  }

  return response.json();
}

async function sanityCreate(document) {
  const response = await fetch(
    `https://${projectId}.api.sanity.io/v${apiVersion}/data/mutate/${dataset}?returnIds=true`,
    {
      method: "POST",
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ mutations: [{ create: document }] }),
    },
  );

  if (!response.ok) {
    throw new Error(`Sanity mutation failed: ${response.status} ${await response.text()}`);
  }

  return response.json();
}

async function fetchCategoryMap() {
  const categories = await sanityQuery(
    '*[_type == "category" && defined(slug.current)]{_id, "slug": slug.current}',
  );
  return new Map(categories.map((item) => [item.slug, item._id]));
}

async function ensureCategories() {
  let categoryMap = await fetchCategoryMap();
  const missing = categoryDefinitions.filter((item) => !categoryMap.has(item.slug));

  if (!missing.length) return categoryMap;

  console.log(`Creating ${missing.length} missing Sanity categor${missing.length === 1 ? "y" : "ies"}...`);

  await sanityMutate(
    missing.map((item) => ({
      createIfNotExists: {
        _id: `category-${item.slug}`,
        _type: "category",
        title: item.title,
        slug: { _type: "slug", current: item.slug },
        description: item.description,
        accentColor: "#D71920",
        showInPrimaryNav: true,
        sortOrder: item.sortOrder,
      },
    })),
  );

  categoryMap = await fetchCategoryMap();

  for (const item of missing) {
    if (categoryMap.has(item.slug)) {
      console.log(`Created category: ${item.title}`);
    } else {
      throw new Error(`Failed to create required category: ${item.title}`);
    }
  }

  return categoryMap;
}

async function fetchTodayState() {
  const start = new Date();
  start.setUTCHours(0, 0, 0, 0);

  const rows = await sanityQuery(
    '*[_type == "trendingStory" && discoveredAt >= $start]{duplicateKey, "categorySlug": category->slug.current}',
    { start: start.toISOString() },
  );

  const counts = new Map();
  const duplicateKeys = new Set();

  for (const row of rows) {
    if (row.categorySlug) {
      counts.set(row.categorySlug, (counts.get(row.categorySlug) || 0) + 1);
    }
    if (row.duplicateKey) duplicateKeys.add(row.duplicateKey);
  }

  return { counts, duplicateKeys };
}

async function fetchCandidates(query) {
  const url = new URL("https://news.google.com/rss/search");
  url.searchParams.set("q", query);
  url.searchParams.set("hl", "en-US");
  url.searchParams.set("gl", "US");
  url.searchParams.set("ceid", "US:en");

  const response = await fetch(url, {
    headers: { "User-Agent": "MainStoryNewsBot/1.0" },
  });

  if (!response.ok) {
    throw new Error(`Google News RSS failed: ${response.status}`);
  }

  return parseFeed(await response.text());
}

async function main() {
  const categoryMap = await ensureCategories();
  const { counts, duplicateKeys } = await fetchTodayState();
  const created = [];

  for (const [slug, query] of Object.entries(categoryQueries)) {
    const categoryId = categoryMap.get(slug);
    if (!categoryId) {
      console.warn(`Skipping ${slug}: category does not exist in Sanity.`);
      continue;
    }

    const currentCount = counts.get(slug) || 0;
    if (currentCount >= 3) {
      console.log(`Skipping ${slug}: daily quota already reached (${currentCount}/3).`);
      continue;
    }

    const candidates = await fetchCandidates(query);
    const candidate = candidates.find((item) => {
      if (!item.headline || !item.link || !item.sourceName) return false;
      if (!trustedPublishers.has(item.sourceName)) return false;
      const key = makeDuplicateKey(item.headline);
      return !duplicateKeys.has(key);
    });

    if (!candidate) {
      console.warn(`No trusted non-duplicate candidate found for ${slug}.`);
      continue;
    }

    const duplicateKey = makeDuplicateKey(candidate.headline);
    const discoveredAt = new Date().toISOString();

    await sanityCreate({
      _type: "trendingStory",
      sourceHeadline: candidate.headline,
      sourceUrl: candidate.link,
      sourceName: candidate.sourceName,
      sourcePublishedAt: candidate.publishedAt
        ? new Date(candidate.publishedAt).toISOString()
        : undefined,
      discoveredAt,
      category: { _type: "reference", _ref: categoryId },
      status: "new",
      priority: "normal",
      duplicateKey,
      editorNotes: candidate.sourceHome
        ? `Publisher homepage: ${candidate.sourceHome}`
        : undefined,
      imageRightsStatus: "unchecked",
    });

    duplicateKeys.add(duplicateKey);
    counts.set(slug, currentCount + 1);
    created.push({ category: slug, source: candidate.sourceName, headline: candidate.headline });

    console.log(`Created ${slug}: ${candidate.headline} (${candidate.sourceName})`);
  }

  console.log(`\nDone. Created ${created.length} Trending Queue item(s).`);
  if (created.length) console.table(created);
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
