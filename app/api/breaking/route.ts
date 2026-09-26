import { getBreakingNews } from "@/sanity/lib/breaking";

export async function GET() {
  const item = await getBreakingNews();

  return Response.json(item, {
    headers: {
      "Cache-Control": "public, s-maxage=30, stale-while-revalidate=60",
    },
  });
}
