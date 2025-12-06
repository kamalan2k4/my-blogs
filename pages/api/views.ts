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

  // 👇 EXACT page path as shown in your Top Pages: /posts/<slug>
  const pagePath = `/posts/${slug}`;

  // Plausible v1 example for "Visitors to /some/path" is:
  // /api/v1/stats/aggregate?site_id=...&period=6mo&filters=event:page==/some/path
  const params = new URLSearchParams({
    site_id: siteId,
    period: "12mo",                    // last 12 months (includes today)
    filters: `event:page==${pagePath}` // strict equality, no regex
    // NOTE: metrics defaults to "visitors" if not specified
  });

  try {
    const response = await fetch(`${PLAUSIBLE_API_URL}?${params.toString()}`, {
      headers: {
        Authorization: `Bearer ${apiKey}`,
      },
    });

    const text = await response.text();

    if (!response.ok) {
      console.error("Plausible API error:", response.status, text);
      return res.status(500).json({
        error: "Failed to fetch from Plausible",
        status: response.status,
        details: text,
      });
    }

    const data = JSON.parse(text);

    // We are now reading "visitors" (same metric you see in Top Pages)
    const views = data?.results?.visitors?.value ?? 0;

    return res.status(200).json({ slug, views });
  } catch (error: any) {
    console.error("Views API error:", error);
    return res.status(500).json({
      error: "Internal server error",
      details: error.toString(),
    });
  }
}
