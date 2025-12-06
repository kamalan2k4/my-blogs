// app/api/views/route.ts
import { NextRequest, NextResponse } from "next/server";

const PLAUSIBLE_API_URL = "https://plausible.io/api/v1/stats/aggregate";

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const slug = searchParams.get("slug");

  if (!slug) {
    return NextResponse.json({ error: "Missing slug" }, { status: 400 });
  }

  try {
    const siteId = process.env.PLAUSIBLE_SITE_ID;
    const apiKey = process.env.PLAUSIBLE_API_KEY;

    if (!siteId || !apiKey) {
      return NextResponse.json(
        { error: "Plausible env vars not set" },
        { status: 500 }
      );
    }

    // 👇 This must match your actual URL structure
    // Example: /post/my-first-blog
    const pagePath = `/posts/${slug}`;

    const params = new URLSearchParams({
      site_id: siteId,
      period: "all",        // or "30d", "6mo", etc.
      metrics: "pageviews",
      filters: `event:page==${pagePath}`,
    });

    const response = await fetch(`${PLAUSIBLE_API_URL}?${params.toString()}`, {
      headers: {
        Authorization: `Bearer ${apiKey}`,
      },
      // To avoid caching issues:
      next: { revalidate: 60 }, // optional
    });

    if (!response.ok) {
      const text = await response.text();
      console.error("Plausible API error:", text);
      return NextResponse.json(
        { error: "Failed to fetch from Plausible" },
        { status: 500 }
      );
    }

    const data = await response.json();
    const views = data?.results?.pageviews?.value ?? 0;

    return NextResponse.json({ slug, views });
  } catch (error) {
    console.error("Views API error:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
