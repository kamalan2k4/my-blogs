// pages/api/views.ts
import type { NextApiRequest, NextApiResponse } from "next";

const PLAUSIBLE_API_URL = "https://plausible.io/api/v1/stats/aggregate";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const { slug } = req.query;

  if (!slug || typeof slug !== "string") {
    return res.status(400).json({ error: "Missing slug" });
  }

  const siteId = process.env.PLAUSIBLE_SITE_ID;
  const apiKey = process.env.PLAUSIBLE_API_KEY;

  if (!siteId || !apiKey) {
    console.error("Missing PLAUSIBLE_SITE_ID or PLAUSIBLE_API_KEY env vars");
    return res.status(500).json({ error: "Plausible env vars not set" });
  }

  // 🔥 IMPORTANT: this must match your real URL structure
  // Your links are /posts/${slug}, so:
  const pagePath = `/posts/${slug}`;

  const params = new URLSearchParams({
    site_id: siteId,
    period: "all", // or "30d", "6mo", etc.
    metrics: "pageviews",
    filters: `event:page==${pagePath}`,
  });

  try {
    const response = await fetch(`${PLAUSIBLE_API_URL}?${params.toString()}`, {
      headers: {
        Authorization: `Bearer ${apiKey}`,
      },
    });

    if (!response.ok) {
      const text = await response.text();
      console.error("Plausible API error:", text);
      return res.status(500).json({ error: "Failed to fetch from Plausible" });
    }

    const data = await response.json();
    const views = data?.results?.pageviews?.value ?? 0;

    return res.status(200).json({ slug, views });
  } catch (error) {
    console.error("Views API error:", error);
    return res.status(500).json({ error: "Internal server error" });
  }
}
