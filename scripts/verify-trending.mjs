import fs from "node:fs";

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

const expectedCategories = [
  "world",
  "business",
  "technology",
  "ai",
  "markets",
  "science",
  "culture",
  "video",
];

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
    throw new Error(
      `Sanity query failed: ${response.status} ${await response.text()}`,
    );
  }

  const payload = await response.json();
  return payload.result;
}

async function main() {
  const start = new Date();
  start.setUTCHours(0, 0, 0, 0);

  const rows = await sanityQuery(
    '*[_type == "trendingStory" && discoveredAt >= $start]{_id, sourceHeadline, "categorySlug": category->slug.current}',
    { start: start.toISOString() },
  );

  const counts = Object.fromEntries(
    expectedCategories.map((slug) => [slug, 0]),
  );

  for (const row of rows) {
    if (row.categorySlug && row.categorySlug in counts) {
      counts[row.categorySlug] += 1;
    }
  }

  console.log("Trending Queue verification for current UTC day:");
  console.table(
    expectedCategories.map((slug) => ({
      category: slug,
      count: counts[slug],
      limit: 3,
    })),
  );

  const overLimit = expectedCategories.filter((slug) => counts[slug] > 3);

  if (overLimit.length) {
    throw new Error(
      "Daily quota exceeded for: " + overLimit.join(", "),
    );
  }

  console.log(
    `Verification passed: ${rows.length} queue item(s) today; no category exceeds 3.`,
  );
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
