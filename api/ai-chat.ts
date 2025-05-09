const HF_API_URL = 'https://api-inference.huggingface.co/models/meta-llama/Llama-3.1-8B-Instruct';
const HF_API_KEY = process.env.HF_API_KEY || process.env.VITE_HF_API_KEY;

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const { question } = req.body;
  if (!question) {
    return res.status(400).json({ error: 'Missing question' });
  }

  // The prompt is constructed by the frontend and should follow Welli's requirements.
  // This backend just forwards the prompt and post-processes the answer.
  const prompt = question;

  try {
    const hfRes = await fetch(HF_API_URL, {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${HF_API_KEY}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        inputs: prompt,
        parameters: { max_new_tokens: 40, temperature: 0.7 },
      }),
    });
    if (!hfRes.ok) {
      const err = await hfRes.text();
      return res.status(500).json({ error: 'Hugging Face API error', details: err });
    }
    const data = await hfRes.json();
    let answer = data?.[0]?.generated_text || 'Sorry, I could not answer that.';
    // Post-process: trim to first 2 sentences
    const sentences = answer.match(/[^.!?]+[.!?]+/g);
    if (sentences && sentences.length > 2) {
      answer = sentences.slice(0, 2).join(' ').trim();
    }
    return res.status(200).json({ answer });
  } catch (err) {
    return res.status(500).json({ error: 'Server error', details: String(err) });
  }
} 