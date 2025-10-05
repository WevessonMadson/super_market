import type { VercelRequest, VercelResponse } from "@vercel/node";

export default async function handler(req: VercelRequest, res: VercelResponse) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  const payload = req.body;
  if (!payload) {
    return res.status(400).json({ error: "Empty payload" });
  }

  try {
    const response = await fetch("https://api.jsonbin.io/v3/b", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "X-Master-Key": process.env.JSONBIN_MASTER_KEY as string,
      },
      body: JSON.stringify(payload),
    });

    const data = await response.json();

    if (!response.ok) {
      return res.status(502).json({ error: "JSONBin error", details: data });
    }

    return res.status(200).json({ id: data.metadata.id });
  } catch (err: unknown) {
    console.error(err);
    return res.status(500).json({
      error: "Server error",
      details: err instanceof Error ? err.message : String(err),
    });
  }
}
