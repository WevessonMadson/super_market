import type { VercelRequest, VercelResponse } from '@vercel/node';

export default async function handler(req: VercelRequest, res: VercelResponse) {
  if (req.method !== 'GET') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const id = req.query.id as string | undefined;
  if (!id) {
    return res.status(400).json({ error: 'Missing id' });
  }

  try {
    const response = await fetch(`https://api.jsonbin.io/v3/b/${id}/latest`, {
      headers: {
        'X-Master-Key': process.env.JSONBIN_MASTER_KEY as string,
      },
    });

    const data = await response.json();
    if (!response.ok) {
      return res.status(502).json({ error: 'JSONBin error', details: data });
    }

    return res.status(200).json({ record: data.record });
  } catch (err: any) {
    console.error(err);
    return res.status(500).json({ error: 'Server error', details: err.message });
  }
}
