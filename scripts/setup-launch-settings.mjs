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

async function mutate(mutations) {
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
    throw new Error(
      `Sanity mutation failed: ${response.status} ${await response.text()}`,
    );
  }

  return response.json();
}

async function main() {
  await mutate([
    {
      createIfNotExists: {
        _id: "siteSettings",
        _type: "siteSettings",
        publicationName: "Main Story",
        tagline: "What matters. Why it matters.",
      },
    },
    {
      patch: {
        id: "siteSettings",
        set: {
          publicationName: "Main Story",
          tagline: "What matters. Why it matters.",
          contactEmail: "contact@mainstorynews.com",
          editorialEmail: "editorial@mainstorynews.com",
          correctionsEmail: "corrections@mainstorynews.com",
          advertisingEmail: "advertise@mainstorynews.com",
          publisherName: "Main Story",
          publisherCountry: "Pakistan",
        },
      },
    },
  ]);

  console.log("Main Story launch settings are ready in Sanity.");
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
