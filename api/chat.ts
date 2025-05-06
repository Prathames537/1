import type { VercelRequest, VercelResponse } from '@vercel/node';

export default async function handler(req: VercelRequest, res: VercelResponse) {
  if (req.method !== 'POST') {
    res.setHeader('Allow', ['POST']);
    return res.status(405).json({ error: 'Method Not Allowed' });
  }

  const { prompt, parameters } = req.body;
  if (!prompt) {
    return res.status(400).json({ error: 'Missing prompt' });
  }

  try {
    const hfRes = await fetch(
      'https://api-inference.huggingface.co/models/google/flan-t5-base',
      {
        method: 'POST',
        headers: {
          Authorization: `Bearer REMOVED`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ inputs: prompt, parameters }),
      }
    );

    const data = await hfRes.json();
    return res.status(hfRes.status).json(data);
  } catch (err) {
    console.error('HF proxy error', err);
    return res.status(500).json({ error: 'Error fetching AI' });
  }
} 