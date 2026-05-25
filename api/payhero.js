// /api/payhero.js (Vercel Serverless Function)
import fetch from 'node-fetch';

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    res.status(405).json({ error: 'Method not allowed' });
    return;
  }

  const { amount, phone } = req.body;
  try {
    const apiRes = await fetch('https://backend.payhero.co.ke/api/v2/payments', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        // Basic token supplied by the user
        Authorization: 'Basic aFlERUtyU1A3bk9BTU9UYVV4b0E6VE5VRlN5SVFLaUl0Q3E5YTg5N2RrT2JiRWFRNmk2TVNRZnJPTEhtcg=='
      },
      body: JSON.stringify({
        amount,
        phone_number: phone,
        channel_id: 6770,
        provider: 'm-pesa',
        external_reference: `HelaPesa-${Date.now()}`,
        callback_url: `${req.headers.origin || ''}/payhero-callback.html`
      })
    });
    const data = await apiRes.json();
    res.status(apiRes.status).json(data);
  } catch (e) {
    console.error('PayHero proxy error:', e);
    res.status(500).json({ error: 'Internal server error' });
  }
}
