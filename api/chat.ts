import { GoogleGenAI } from '@google/genai';

const SYSTEM_PROMPT = `You are the Timlin Connect AI Assistant — a friendly, knowledgeable cybersecurity advisor for a global cybersecurity services company called Timlin Connect.

About Timlin Connect:
- Provides practical cybersecurity services to organizations worldwide
- Services: Cybersecurity Risk Assessments, Vulnerability Assessments, Penetration Testing, Compliance & Privacy Readiness (SOC 2, ISO 27001, GDPR, CCPA, HIPAA), Virtual CISO (vCISO), and Incident Response Planning
- Serves: SMBs, Professional Services, Healthcare, Non-Profits, Startups & Scale-Ups
- Operating Mon–Fri 9 AM–6 PM EST (Emergency only on weekends)
- Contact: info@timlinconnect.com | +1 (437) 263-0314
- Engagement models: Fixed-Scope, Project-Based, Monthly Advisory, Recurring Testing
- Approach: Discovery → Assessment → Findings → Roadmap → Support → Retest (6-step process)
- Values: SOC 2 / ISO 27001 / NIST Aligned, Vendor-Neutral advice, Cross-Border Compliance expertise

Guidelines for answering:
1. Be clear, concise, and helpful. Avoid jargon when possible; explain technical terms if used.
2. Focus answers on cybersecurity topics and Timlin Connect's services.
3. For questions outside cybersecurity scope, politely redirect to relevant topics or suggest contacting the team.
4. When appropriate, recommend the user reach out via the contact form or email for personalized advice.
5. Keep responses brief — aim for 2–4 sentences unless more detail is specifically requested.
6. Be professional but approachable, matching the brand tone.`;

export default async function handler(req: Request): Promise<Response> {
  if (req.method !== 'POST') {
    return new Response(JSON.stringify({ error: 'Method not allowed' }), {
      status: 405,
      headers: { 'Content-Type': 'application/json' },
    });
  }

  let body: { messages?: { role: string; content: string }[]; userMessage?: string };
  try {
    body = await req.json();
  } catch {
    return new Response(JSON.stringify({ error: 'Invalid request body' }), {
      status: 400,
      headers: { 'Content-Type': 'application/json' },
    });
  }

  const { messages = [], userMessage } = body;

  if (!userMessage || typeof userMessage !== 'string' || !userMessage.trim()) {
    return new Response(JSON.stringify({ error: 'userMessage is required' }), {
      status: 400,
      headers: { 'Content-Type': 'application/json' },
    });
  }

  const apiKey = process.env.GEMINI_API_KEY;
  if (!apiKey) {
    return new Response(JSON.stringify({ error: 'Server configuration error' }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' },
    });
  }

  try {
    const ai = new GoogleGenAI({ apiKey });

    const conversationHistory = messages.map((m) => ({
      role: m.role === 'assistant' ? ('model' as const) : ('user' as const),
      parts: [{ text: m.content }],
    }));

    conversationHistory.push({
      role: 'user' as const,
      parts: [{ text: userMessage.trim() }],
    });

    const response = await ai.models.generateContent({
      model: 'gemini-2.0-flash',
      contents: conversationHistory,
      config: {
        systemInstruction: SYSTEM_PROMPT,
        maxOutputTokens: 512,
        temperature: 0.7,
      },
    });

    const text =
      response.text ??
      "I'm sorry, I couldn't generate a response. Please try again or contact us at info@timlinconnect.com.";

    return new Response(JSON.stringify({ text }), {
      status: 200,
      headers: { 'Content-Type': 'application/json' },
    });
  } catch (error) {
    console.error('Gemini API error:', error);
    return new Response(JSON.stringify({ error: 'Failed to generate response' }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' },
    });
  }
}
