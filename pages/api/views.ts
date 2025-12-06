// pages/api/views.ts
import type { NextApiRequest, NextApiResponse } from "next";

const PLAUSIBLE_API_URL = "https://plausible.io/api/v2/query";

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

  // Your real URLs are like: /posts/stack_blog, /posts/05, etc.
  const pagePath = `/posts/${slug}`;

  // v2 Stats API query body
  const body = {
    site_id: siteId,
    metrics: ["pageviews"],       // we want "views"
    date_range: "12mo",           // last 12 months (can change to "all" if you want)
    filters: [
      ["is", "event:page", [pagePath]], // only this page
    ],
  };

  try {
    const response = await fetch(PLAUSIBLE_API_URL, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${apiKey}`,
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

    // v2 response: results is an array, metrics in order of "metrics" array
    // we requested metrics: ["pageviews"], so metrics[0] is pageviews
    const results = (data as any).results as { metrics: number[] }[] | undefined;
    const views =
      results && results.length > 0 && Array.isArray(results[0].metrics)
        ? results[0].metrics[0]
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
