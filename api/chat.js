// Dilip Kumar Portfolio - AI Assistant Serverless API
// Powered by Groq Cloud
const MODEL = process.env.GROQ_MODEL || 'qwen/qwen3.8-27b';

export default async function handler(req, res) {
    // CORS headers for preflight and cross-origin requests
    res.setHeader('Access-Control-Allow-Credentials', 'true');
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET,OPTIONS,POST');
    res.setHeader(
        'Access-Control-Allow-Headers',
        'X-CSRF-Token, X-Requested-With, Accept, Accept-Version, Content-Length, Content-MD5, Content-Type, Date, X-Api-Version, Authorization'
    );

    if (req.method === 'OPTIONS') {
        return res.status(200).end();
    }

    if (req.method !== 'POST') {
        return res.status(405).json({ error: 'Method not allowed' });
    }

    const { messages } = req.body || {};
    const apiKey = process.env.GROQ_API_KEY;

    if (!apiKey) {
        return res.status(503).json({ error: 'Server configuration error: Missing GROQ_API_KEY' });
    }
    if (!Array.isArray(messages) || messages.length === 0) {
        return res.status(400).json({ error: 'Messages must be a non-empty array' });
    }

    try {
        const response = await fetch('https://api.groq.com/openai/v1/chat/completions', {
            method: 'POST',
            headers: {
                'Authorization': `Bearer ${apiKey}`,
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                model: MODEL,
                messages,
                temperature: 0.7,
                max_tokens: 350
            })
        });

        const data = await response.json();

        if (!response.ok) {
            console.error('Groq API Error:', data);
            return res.status(response.status).json({
                error: data?.error?.message || 'Failed to fetch from Groq'
            });
        }

        // Normalize response in case the model placed output in reasoning
        if (data?.choices && data.choices[0]?.message) {
            const msg = data.choices[0].message;
            if (!msg.content && msg.reasoning) {
                msg.content = msg.reasoning;
            }
        }

        return res.status(200).json(data);
    } catch (error) {
        console.error('Groq API Error:', error);
        return res.status(500).json({ error: 'Internal Server Error', details: error.message });
    }
}
