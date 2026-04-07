import React, { useState, useRef, useEffect, useCallback } from 'react';
import { GoogleGenAI } from '@google/genai';
import { ChatMessage } from '../types';

const SYSTEM_PROMPT = `You are the Timlin Connect AI Assistant — a friendly, knowledgeable cybersecurity advisor for a Canadian cybersecurity services company called Timlin Connect.

About Timlin Connect:
- Provides practical cybersecurity services to Canadian organizations
- Services: Cybersecurity Risk Assessments, Vulnerability Assessments, Penetration Testing, Compliance & Privacy Readiness (PIPEDA, PHIPA, SOC 2), Virtual CISO (vCISO), and Incident Response Planning
- Serves: SMBs, Professional Services, Healthcare, Non-Profits, Startups & Scale-Ups
- Based in Canada, operating Mon–Fri 9 AM–6 PM EST (Emergency only on weekends)
- Contact: info@timlinconnect.com | +1 (437) 263-0314
- Engagement models: Fixed-Scope, Project-Based, Monthly Advisory, Recurring Testing
- Approach: Discovery → Assessment → Findings → Roadmap → Support → Retest (6-step process)
- Values: PIPEDA-Aligned, ISO/NIST-Based frameworks, Vendor-Neutral advice

Guidelines for answering:
1. Be clear, concise, and helpful. Avoid jargon when possible; explain technical terms if used.
2. Focus answers on cybersecurity topics and Timlin Connect's services.
3. For questions outside cybersecurity scope, politely redirect to relevant topics or suggest contacting the team.
4. When appropriate, recommend the user reach out via the contact form or email for personalized advice.
5. Keep responses brief — aim for 2–4 sentences unless more detail is specifically requested.
6. Be professional but approachable, matching the brand tone.`;

const WELCOME_MESSAGE: ChatMessage = {
  id: 'welcome',
  role: 'assistant',
  content: "Hello! I'm the Timlin Connect AI Assistant. I can help answer questions about our cybersecurity services, compliance readiness, risk assessments, and more. How can I help you today?",
  timestamp: new Date(),
};

const AiAssistant: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<ChatMessage[]>([WELCOME_MESSAGE]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  const scrollToBottom = useCallback(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, []);

  useEffect(() => {
    scrollToBottom();
  }, [messages, scrollToBottom]);

  useEffect(() => {
    if (isOpen) {
      inputRef.current?.focus();
    }
  }, [isOpen]);

  const sendMessage = async () => {
    const trimmed = input.trim();
    if (!trimmed || isLoading) return;

    const userMessage: ChatMessage = {
      id: `user-${Date.now()}`,
      role: 'user',
      content: trimmed,
      timestamp: new Date(),
    };

    setMessages((prev) => [...prev, userMessage]);
    setInput('');
    setIsLoading(true);

    try {
      const apiKey = process.env.GEMINI_API_KEY ?? '';
      if (!apiKey) {
        throw new Error('API key is not configured');
      }

      const ai = new GoogleGenAI({ apiKey });

      const conversationHistory = messages
        .filter((m) => m.id !== 'welcome')
        .map((m) => ({
          role: m.role === 'assistant' ? ('model' as const) : ('user' as const),
          parts: [{ text: m.content }],
        }));

      conversationHistory.push({
        role: 'user' as const,
        parts: [{ text: trimmed }],
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

      const text = response.text ?? "I'm sorry, I couldn't generate a response. Please try again or contact us at info@timlinconnect.com.";

      const assistantMessage: ChatMessage = {
        id: `assistant-${Date.now()}`,
        role: 'assistant',
        content: text,
        timestamp: new Date(),
      };

      setMessages((prev) => [...prev, assistantMessage]);
    } catch (error) {
      console.error('AI Assistant error:', error);
      const errorMessage: ChatMessage = {
        id: `error-${Date.now()}`,
        role: 'assistant',
        content: "I'm having trouble connecting right now. Please try again shortly, or reach out to us directly at info@timlinconnect.com or +1 (437) 263-0314.",
        timestamp: new Date(),
      };
      setMessages((prev) => [...prev, errorMessage]);
    } finally {
      setIsLoading(false);
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      sendMessage();
    }
  };

  return (
    <>
      {/* Floating Chat Button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="fixed bottom-6 right-6 z-50 w-14 h-14 rounded-full flex items-center justify-center shadow-lg transition-all duration-300 hover:scale-110 focus-visible:ring-2 focus-visible:ring-[#00D1FF] focus-visible:outline-none"
        style={{
          background: 'linear-gradient(135deg, #2E5BFF, #00D1FF)',
          boxShadow: '0 4px 20px rgba(0, 209, 255, 0.4)',
        }}
        aria-label={isOpen ? 'Close AI Assistant' : 'Open AI Assistant'}
      >
        {isOpen ? (
          <svg xmlns="http://www.w3.org/2000/svg" className="w-6 h-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
          </svg>
        ) : (
          <svg xmlns="http://www.w3.org/2000/svg" className="w-6 h-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z" />
          </svg>
        )}
      </button>

      {/* Chat Panel */}
      {isOpen && (
        <div
          className="fixed bottom-24 right-6 z-50 w-[360px] max-w-[calc(100vw-2rem)] flex flex-col rounded-xl overflow-hidden shadow-2xl"
          style={{
            height: '520px',
            background: 'rgba(11, 14, 20, 0.95)',
            backdropFilter: 'blur(16px)',
            border: '1px solid rgba(48, 54, 61, 0.6)',
            boxShadow: '0 8px 32px rgba(0, 0, 0, 0.5), 0 0 40px rgba(46, 91, 255, 0.1)',
          }}
        >
          {/* Header */}
          <div
            className="flex items-center gap-3 px-4 py-3 shrink-0"
            style={{
              background: 'linear-gradient(135deg, rgba(46, 91, 255, 0.15), rgba(0, 209, 255, 0.1))',
              borderBottom: '1px solid rgba(48, 54, 61, 0.5)',
            }}
          >
            <div className="w-8 h-8 rounded-full flex items-center justify-center" style={{ background: 'linear-gradient(135deg, #2E5BFF, #00D1FF)' }}>
              <svg xmlns="http://www.w3.org/2000/svg" className="w-4 h-4 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M9.75 3.104v5.714a2.25 2.25 0 01-.659 1.591L5 14.5M9.75 3.104c-.251.023-.501.05-.75.082m.75-.082a24.301 24.301 0 014.5 0m0 0v5.714a2.25 2.25 0 00.659 1.591L19 14.5M14.25 3.104c.251.023.501.05.75.082M19 14.5l-2.47 4.94a2.25 2.25 0 01-2.013 1.244H9.483a2.25 2.25 0 01-2.013-1.244L5 14.5m14 0H5" />
              </svg>
            </div>
            <div className="flex-1">
              <h3 className="text-sm font-semibold text-[#E6EDF3]">Timlin Connect AI</h3>
              <div className="flex items-center gap-1.5">
                <span className="w-2 h-2 rounded-full bg-green-400 animate-pulse" />
                <span className="text-xs text-[#8B949E]">Online</span>
              </div>
            </div>
            <button
              onClick={() => setIsOpen(false)}
              className="p-1 rounded hover:bg-white/10 transition-colors focus-visible:ring-2 focus-visible:ring-[#00D1FF] focus-visible:outline-none"
              aria-label="Close chat"
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="w-4 h-4 text-[#8B949E]" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>

          {/* Messages */}
          <div className="flex-1 overflow-y-auto px-4 py-3 space-y-3 ai-assistant-messages">
            {messages.map((msg) => (
              <div
                key={msg.id}
                className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}
              >
                <div
                  className={`max-w-[85%] px-3.5 py-2.5 rounded-xl text-sm leading-relaxed ${
                    msg.role === 'user'
                      ? 'rounded-br-sm'
                      : 'rounded-bl-sm'
                  }`}
                  style={
                    msg.role === 'user'
                      ? {
                          background: 'linear-gradient(135deg, #2E5BFF, #1a3fcc)',
                          color: '#FFFFFF',
                        }
                      : {
                          background: 'rgba(22, 27, 34, 0.8)',
                          color: '#E6EDF3',
                          border: '1px solid rgba(48, 54, 61, 0.5)',
                        }
                  }
                >
                  {msg.content}
                </div>
              </div>
            ))}
            {isLoading && (
              <div className="flex justify-start">
                <div
                  className="px-3.5 py-2.5 rounded-xl rounded-bl-sm text-sm"
                  style={{
                    background: 'rgba(22, 27, 34, 0.8)',
                    border: '1px solid rgba(48, 54, 61, 0.5)',
                  }}
                >
                  <div className="flex items-center gap-1.5">
                    <span className="w-2 h-2 rounded-full bg-[#00D1FF] animate-bounce" style={{ animationDelay: '0ms' }} />
                    <span className="w-2 h-2 rounded-full bg-[#00D1FF] animate-bounce" style={{ animationDelay: '150ms' }} />
                    <span className="w-2 h-2 rounded-full bg-[#00D1FF] animate-bounce" style={{ animationDelay: '300ms' }} />
                  </div>
                </div>
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>

          {/* Input */}
          <div
            className="px-3 py-3 shrink-0"
            style={{ borderTop: '1px solid rgba(48, 54, 61, 0.5)' }}
          >
            <div className="flex items-center gap-2">
              <input
                ref={inputRef}
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={handleKeyDown}
                placeholder="Ask about our services..."
                disabled={isLoading}
                className="flex-1 px-3 py-2.5 rounded-lg text-sm text-[#E6EDF3] placeholder-[#8B949E] focus:outline-none focus-visible:ring-2 focus-visible:ring-[#00D1FF] disabled:opacity-50"
                style={{
                  background: 'rgba(22, 27, 34, 0.8)',
                  border: '1px solid rgba(48, 54, 61, 0.5)',
                }}
              />
              <button
                onClick={sendMessage}
                disabled={!input.trim() || isLoading}
                className="p-2.5 rounded-lg transition-all duration-200 hover:opacity-90 disabled:opacity-30 disabled:cursor-not-allowed focus-visible:ring-2 focus-visible:ring-[#00D1FF] focus-visible:outline-none"
                style={{
                  background: 'linear-gradient(135deg, #2E5BFF, #00D1FF)',
                }}
                aria-label="Send message"
              >
                <svg xmlns="http://www.w3.org/2000/svg" className="w-4 h-4 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M6 12L3.269 3.126A59.768 59.768 0 0121.485 12 59.77 59.77 0 013.27 20.876L5.999 12zm0 0h7.5" />
                </svg>
              </button>
            </div>
            <p className="text-[10px] text-[#8B949E] mt-1.5 text-center">
              AI-powered assistant · For detailed guidance, contact our team directly
            </p>
          </div>
        </div>
      )}
    </>
  );
};

export default AiAssistant;
