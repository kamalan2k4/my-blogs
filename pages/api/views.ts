// pages/api/views.ts
import type { NextApiRequest, NextApiResponse } from "next";

const PLAUSIBLE_API_URL = "https://plausible.io/api/v2/query";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const { slug } = req.query;

  if (!slug || typeof slug !== "string") {
    return res.status(400).json({ error: "Missing slug" });
  }

  const siteId = process.env.PLAUSIBLE_SITE_ID;
  const apiKey = process.env.PLAUSIBLE_API_KEY;

  if (!siteId || !apiKey) {
    console.error("Missing PLAUSIBLE_SITE_ID or PLAUSIBLE_API_KEY env vars");
    return res
      .status(500)
      .json({ error: "Plausible env vars not set on the server" });
  }

  // Your real page paths: /posts/<slug>
  const pagePath = `/posts/${slug}`;

  // 👇 This body follows the docs you pasted.
  // - POST to /api/v2/query
  // - metrics: ["pageviews"]
  // - date_range: "all" (since start of stats)
  // - filters: contains event:page "/posts/<slug>"
  const body = {
    site_id: siteId,
    metrics: ["pageviews"],
    date_range: "all",
    filters: [
      [
        "contains",
        "event:page",
        [pagePath], // match any page containing "/posts/<slug>"
      ],
    ],
  };

  try {
    const response = await fetch(PLAUSIBLE_API_URL, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${apiKey}`, // Stats API key
        "Content-Type": "application/json",
      },
      body: JSON.stringify(body),
    });

    const data = await response.json();

    if (!response.ok) {
      console.error("Plausible API error:", response.status, data);
      return res.status(500).json({
        error: "Failed to fetch from Plausible",
        status: response.status,
        details: data,
      });
    }

    // According to docs:
    // results: [ { metrics: [pageviews], dimensions: [] }, ... ]
    const results = (data as any).results as { metrics: number[] }[] | undefined;
    const views =
      results && results.length > 0 && Array.isArray(results[0].metrics)
        ? results[0].metrics[0] // first metric = pageviews
        : 0;

    return res.status(200).json({ slug, views });
  } catch (error: any) {
    console.error("Views API error:", error);
    return res.status(500).json({
      error: "Internal server error",
      details: error.toString(),
    });
  }
}
