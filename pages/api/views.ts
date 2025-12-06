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
    return res.status(500).json({ error: "Plausible env vars not set" });
  }

  // 🔥 flexible regex match — matches /posts/<slug>, /posts/<slug>/index, etc.
  const filter = `event:page=~^/posts/${slug}`;

  const params = new URLSearchParams({
    site_id: siteId,
    period: "12mo",
    metrics: "pageviews",
    filters: filter,
  });

  try {
    const response = await fetch(`${PLAUSIBLE_API_URL}?${params.toString()}`, {
      headers: { Authorization: `Bearer ${apiKey}` },
    });

    const text = await response.text();

    if (!response.ok) {
      console.error("Plausible API error:", text);
      return res.status(500).json({
        error: "Failed to fetch from Plausible",
        details: text,
      });
    }

    const data = JSON.parse(text);
    const views = data?.results?.pageviews?.value ?? 0;

    return res.status(200).json({ slug, views });
  } catch (error: any) {
    return res.status(500).json({
      error: "Internal server error",
      details: error.toString(),
    });
  }
}
