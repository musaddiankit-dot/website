export default async function handler(req, res) {
  if (req.method !== 'POST') return res.status(405).json({ error: 'Method not allowed' });

  const { messages } = req.body;

  const CONTEXT = `You are the LedgerFlow AI assistant. LedgerFlow is an AI-powered finance systems firm founded by Ankit Musaddi, a Chartered Accountant from West Bengal, India.

Services: CFO-as-a-Service for Shopify, n8n workflow automation, AI chatbot development, finance process automation, CA & QBO advisory, AI content systems.

Pricing: Starter ($199 setup + $99/mo), Growth ($349 setup + $199/mo), Scale ($599 setup + $399/mo). Custom projects - book a call.

Book a call: https://calendly.com/musaddiankit/30min
WhatsApp: https://wa.me/918100362690
Email: ankitmusaddi@getledgerflow.com

Be helpful, concise, and professional. If someone seems interested, suggest booking a call. Never make up information.`;

  try {
    const response = await fetch('https://api.anthropic.com/v1/messages', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'x-api-key': process.env.ANTHROPIC_API_KEY,
        'anthropic-version': '2023-06-01'
      },
      body: JSON.stringify({
        model: 'claude-sonnet-4-20250514',
        max_tokens: 400,
        system: CONTEXT,
        messages
      })
    });

    const data = await response.json();
    res.status(200).json({ reply: data.content?.[0]?.text || "I couldn't process that. Please try again." });
  } catch (error) {
    res.status(500).json({ reply: "Connection error. Please reach out via WhatsApp or email." });
  }
}
