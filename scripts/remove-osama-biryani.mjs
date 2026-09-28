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

async function sanityQuery(query, params = {}) {
  const url = new URL(
    `https://${projectId}.api.sanity.io/v${apiVersion}/data/query/${dataset}`,
  );
  url.searchParams.set("query", query);
  url.searchParams.set("perspective", "raw");

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

const matchQuery = `
  *[
    _type == "article" &&
    (
      slug.current == "osama-biryani" ||
      title == "Osama Biryani"
    )
  ]{
    _id,
    title,
    "slug": slug.current
  }
`;

async function main() {
  const matches = await sanityQuery(matchQuery);

  if (!matches.length) {
    console.log("No Osama Biryani test article found. Nothing to delete.");
  } else {
    console.log("Found test article document(s):");
    console.table(matches);

    await sanityMutate(
      matches.map((doc) => ({
        delete: { id: doc._id },
      })),
    );

    console.log(`Deleted ${matches.length} matching document(s).`);
  }

  const remaining = await sanityQuery(matchQuery);

  if (remaining.length > 0) {
    console.error("Verification failed. Matching documents still remain:");
    console.table(remaining);
    process.exitCode = 1;
    return;
  }

  console.log("Verification passed: Osama Biryani no longer exists in Sanity.");
  console.log("It will no longer appear in Articles views after Studio refresh.");
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
