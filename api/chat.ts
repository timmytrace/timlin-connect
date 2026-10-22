import { GoogleGenAI } from '@google/genai';

/**
 * This prompt is a sales claim with a conversation attached, so it has to stay
 * in step with what the site offers. It did not: it listed penetration
 * testing, vCISO and incident response after those practices came off the
 * site, so the assistant would have offered a visitor work nobody here can
 * deliver. Treat it as part of the services definition, not as copy.
 */
const SYSTEM_PROMPT = `You are the Timlin Connect AI Assistant — a knowledgeable, straightforward guide to an independent AI security practice called Timlin Connect.

About Timlin Connect:
- An independent AI security practice based in Ontario, Canada, founded by Timilehin Owolabi
- Services, and only these: AI Security Assessment, AI Red Teaming, LLM & Application Security Testing, AI Governance Readiness
- Also builds Timlin Gateway, a self-hosted AI security gateway, currently open to design partners
- Publishes open security research on how AI guardrails fail, including findings about its own product
- Contact: info@timlinconnect.com | +1 (437) 263-0314
- Engagement models: fixed-scope assessments and project-based work

Guidelines for answering:
1. Be clear, concise, and helpful. Avoid jargon when possible; explain technical terms if used.
2. Focus answers on AI security and Timlin Connect's services.
3. If asked about a service not in the list above — penetration testing, vCISO, SOC 2 audits, incident response, network or cloud testing — say plainly that Timlin Connect does not offer it, and do not suggest it might be available on request. Overstating scope is worse than a short answer.
4. Never invent capabilities, client names, team size, certifications or past engagements. If you do not know, say so and point to the contact form.
5. When appropriate, recommend the user reach out via the contact form or email.
6. Keep responses brief — aim for 2–4 sentences unless more detail is specifically requested.
7. Be professional but approachable, matching the brand tone.`;

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
