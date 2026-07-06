import React, { useState } from 'react';

const plannedCapabilities = [
  'Prompt Injection Detection',
  'Sensitive Data Protection',
  'RAG and Document Security',
  'AI Agent Tool Safety',
  'Policy-Based Controls',
  'Shadow Mode Testing',
];

const demoScreenshots = [
  {
    id: 'dashboard',
    label: 'Dashboard',
    title: 'Security Overview Dashboard',
    description: 'Real-time gateway monitoring with threat counts, risk score, activity charts, and security posture.',
    src: '/magnumai-demo/dashboard-overview.png',
    alt: 'MagNum AI security overview dashboard with threat metrics and charts',
  },
  {
    id: 'logs',
    label: 'Logs',
    title: 'Interaction Logs',
    description: 'Review model interactions by status, risk level, detection type, API key, and risk score.',
    src: '/magnumai-demo/interaction-logs.png',
    alt: 'MagNum AI interaction logs table showing allowed, flagged, blocked, and sanitized requests',
  },
  {
    id: 'blocked',
    label: 'Blocked',
    title: 'Blocked Requests',
    description: 'See prompt injection and jailbreak attempts stopped by the AI security gateway.',
    src: '/magnumai-demo/blocked-requests.png',
    alt: 'MagNum AI blocked requests table listing high risk prompt injection attempts',
  },
  {
    id: 'analytics',
    label: 'Analytics',
    title: 'Risk Analytics',
    description: 'Track risk distribution, threat patterns, block rate, latency, and detection performance.',
    src: '/magnumai-demo/risk-analytics.png',
    alt: 'MagNum AI risk analytics dashboard with charts and detection benchmark cards',
  },
  {
    id: 'policies',
    label: 'Policies',
    title: 'Security Policies',
    description: 'Configure gateway rules for blocking, sanitization, PII redaction, and tool-call controls.',
    src: '/magnumai-demo/security-policies.png',
    alt: 'MagNum AI security policies page listing active gateway policies',
  },
];

const MagnumAIPage: React.FC = () => {
  const [selectedDemo, setSelectedDemo] = useState(demoScreenshots[0]);

  return (
    <main className="flex-grow bg-[#FAFAFA] text-[#0B0B0B] pt-24 sm:pt-28 pb-16 sm:pb-24">
      <section className="px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="rounded-2xl bg-[#0B0B0B] text-white p-7 sm:p-10 lg:p-12">
            <p
              className="inline-flex items-center rounded-full border border-white/25 px-3 py-1 text-xs font-semibold tracking-wide text-white/85"
              style={{ fontFamily: "'DM Sans', sans-serif" }}
            >
              Upcoming Product
            </p>
            <h1
              className="mt-4 text-4xl sm:text-5xl lg:text-6xl font-bold leading-tight"
              style={{ fontFamily: "'Space Grotesk', sans-serif" }}
            >
              MagNum AI
            </h1>
            <h2
              className="mt-3 text-xl sm:text-2xl text-white/85 font-medium"
              style={{ fontFamily: "'Space Grotesk', sans-serif" }}
            >
              An AI Security Gateway for Safer LLM Applications
            </h2>
            <p
              className="mt-6 text-base sm:text-lg text-white/80 leading-relaxed max-w-4xl"
              style={{ fontFamily: "'DM Sans', sans-serif" }}
            >
              MagNum AI is an upcoming security product from Timlin Connect, being built to help
              organizations detect and reduce risks in Large Language Model applications, including
              prompt injection, sensitive data leakage, unsafe responses, indirect prompt
              injection, and risky AI agent actions.
            </p>
            <p
              className="mt-6 inline-flex rounded-lg bg-white/10 border border-white/20 px-4 py-2 text-sm sm:text-base text-white/90"
              style={{ fontFamily: "'DM Sans', sans-serif" }}
            >
              Status: Currently in development - early access coming soon.
            </p>
            <div className="mt-8 flex flex-col sm:flex-row gap-4">
              <a
                href="/#contact"
                className="inline-flex items-center justify-center bg-white hover:bg-white/90 text-[#0B0B0B] font-semibold px-6 py-3 rounded-lg transition-all duration-300 focus:outline-none focus-visible:ring-2 focus-visible:ring-[#A3E635]"
                style={{ fontFamily: "'DM Sans', sans-serif" }}
              >
                Join Early Access
              </a>
              <a
                href="/#contact"
                className="inline-flex items-center justify-center border border-white/30 hover:border-white text-white font-semibold px-6 py-3 rounded-lg transition-all duration-300 focus:outline-none focus-visible:ring-2 focus-visible:ring-[#A3E635]"
                style={{ fontFamily: "'DM Sans', sans-serif" }}
              >
                Contact Timlin Connect
              </a>
            </div>
          </div>
        </div>
      </section>

      <section className="mt-14 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto grid lg:grid-cols-2 gap-8">
          <article className="rounded-xl border border-[#E5E7EB] bg-white p-6 sm:p-7">
            <h3 className="text-2xl font-bold" style={{ fontFamily: "'Space Grotesk', sans-serif" }}>
              Why MagNum AI
            </h3>
            <p className="mt-4 text-[#4B5563] leading-relaxed" style={{ fontFamily: "'DM Sans', sans-serif" }}>
              Teams are adopting LLMs quickly, but AI-specific threats are evolving just as fast.
              MagNum AI is being built to give organizations practical controls and visibility
              designed to help reduce AI security risk before incidents scale.
            </p>
          </article>

          <article className="rounded-xl border border-[#E5E7EB] bg-white p-6 sm:p-7">
            <h3 className="text-2xl font-bold" style={{ fontFamily: "'Space Grotesk', sans-serif" }}>
              Planned Capabilities
            </h3>
            <ul className="mt-4 grid sm:grid-cols-2 gap-3">
              {plannedCapabilities.map((capability) => (
                <li
                  key={capability}
                  className="rounded-lg bg-[#F9FAFB] border border-[#E5E7EB] px-4 py-3 text-sm sm:text-base text-[#374151]"
                  style={{ fontFamily: "'DM Sans', sans-serif" }}
                >
                  {capability}
                </li>
              ))}
            </ul>
          </article>

          <article className="rounded-xl border border-[#E5E7EB] bg-white p-6 sm:p-7 lg:col-span-2">
            <div className="flex flex-col lg:flex-row lg:items-end lg:justify-between gap-5">
              <div className="max-w-3xl">
                <p
                  className="inline-flex items-center rounded-full border border-[#D1D5DB] bg-[#F9FAFB] px-3 py-1 text-xs font-semibold tracking-wide text-[#374151]"
                  style={{ fontFamily: "'DM Sans', sans-serif" }}
                >
                  Product Preview
                </p>
                <h3 className="mt-4 text-2xl font-bold" style={{ fontFamily: "'Space Grotesk', sans-serif" }}>
                  See MagNum AI in Action
                </h3>
                <p className="mt-4 text-[#4B5563] leading-relaxed" style={{ fontFamily: "'DM Sans', sans-serif" }}>
                  Explore screenshots from the MagNum AI security platform, including gateway monitoring,
                  request review, blocked threats, risk analytics, and policy controls.
                </p>
              </div>
              <p className="text-sm text-[#6B7280]" style={{ fontFamily: "'DM Sans', sans-serif" }}>
                Showing: <span className="font-semibold text-[#0B0B0B]">{selectedDemo.title}</span>
              </p>
            </div>

            <div className="mt-7 rounded-2xl border border-[#111827] bg-[#0B0B0B] p-3 sm:p-4 shadow-xl">
              <div className="overflow-hidden rounded-xl border border-white/10 bg-[#050A12]">
                <div className="aspect-[4/3]">
                  <img
                    src={selectedDemo.src}
                    alt={selectedDemo.alt}
                    className="h-full w-full object-contain"
                    loading="lazy"
                  />
                </div>
              </div>
              <div className="mt-4 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 px-1">
                <div>
                  <p className="text-lg font-semibold text-white" style={{ fontFamily: "'Space Grotesk', sans-serif" }}>
                    {selectedDemo.title}
                  </p>
                  <p className="mt-1 text-sm text-white/65" style={{ fontFamily: "'DM Sans', sans-serif" }}>
                    {selectedDemo.description}
                  </p>
                </div>
                <span className="inline-flex w-fit rounded-full border border-[#A3E635]/30 bg-[#A3E635]/10 px-3 py-1 text-xs font-semibold text-[#A3E635]">
                  Live demo visuals
                </span>
              </div>
            </div>

            <div className="mt-5 grid grid-cols-2 md:grid-cols-5 gap-3">
              {demoScreenshots.map((screenshot) => {
                const isSelected = screenshot.id === selectedDemo.id;

                return (
                  <button
                    key={screenshot.id}
                    type="button"
                    onClick={() => setSelectedDemo(screenshot)}
                    aria-pressed={isSelected}
                    className={`group rounded-xl border p-2 text-left transition-all duration-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-[#A3E635] ${
                      isSelected
                        ? 'border-[#0B0B0B] bg-[#0B0B0B] text-white shadow-md'
                        : 'border-[#E5E7EB] bg-[#F9FAFB] text-[#374151] hover:border-[#0B0B0B]/30'
                    }`}
                  >
                    <span className="block overflow-hidden rounded-lg border border-black/10 bg-[#0B0B0B]">
                      <img
                        src={screenshot.src}
                        alt=""
                        className="aspect-video w-full object-cover transition-transform duration-300 group-hover:scale-105"
                        loading="lazy"
                      />
                    </span>
                    <span className="mt-2 block text-sm font-semibold" style={{ fontFamily: "'DM Sans', sans-serif" }}>
                      {screenshot.label}
                    </span>
                  </button>
                );
              })}
            </div>
          </article>
          <article className="rounded-xl border border-[#E5E7EB] bg-white p-6 sm:p-7 lg:col-span-2">
            <h3 className="text-2xl font-bold" style={{ fontFamily: "'Space Grotesk', sans-serif" }}>
              How MagNum AI Is Designed to Work
            </h3>
            <div className="mt-4 grid md:grid-cols-3 gap-4">
              <div className="rounded-lg bg-[#F9FAFB] border border-[#E5E7EB] p-4">
                <p className="font-semibold text-[#0B0B0B]" style={{ fontFamily: "'DM Sans', sans-serif" }}>1. Inspect</p>
                <p className="mt-2 text-sm text-[#4B5563]" style={{ fontFamily: "'DM Sans', sans-serif" }}>
                  Analyze prompts, context, retrieval data, and tool calls to surface potential threats.
                </p>
              </div>
              <div className="rounded-lg bg-[#F9FAFB] border border-[#E5E7EB] p-4">
                <p className="font-semibold text-[#0B0B0B]" style={{ fontFamily: "'DM Sans', sans-serif" }}>2. Enforce</p>
                <p className="mt-2 text-sm text-[#4B5563]" style={{ fontFamily: "'DM Sans', sans-serif" }}>
                  Apply policy-based controls designed to help reduce data exposure and unsafe model outputs.
                </p>
              </div>
              <div className="rounded-lg bg-[#F9FAFB] border border-[#E5E7EB] p-4">
                <p className="font-semibold text-[#0B0B0B]" style={{ fontFamily: "'DM Sans', sans-serif" }}>3. Evaluate</p>
                <p className="mt-2 text-sm text-[#4B5563]" style={{ fontFamily: "'DM Sans', sans-serif" }}>
                  Use shadow mode testing and security telemetry to tune controls before full rollout.
                </p>
              </div>
            </div>
          </article>

          <article className="rounded-xl border border-[#E5E7EB] bg-white p-6 sm:p-7">
            <h3 className="text-2xl font-bold" style={{ fontFamily: "'Space Grotesk', sans-serif" }}>
              Who MagNum AI Is For
            </h3>
            <p className="mt-4 text-[#4B5563] leading-relaxed" style={{ fontFamily: "'DM Sans', sans-serif" }}>
              Security teams, AI platform teams, product leaders, and compliance stakeholders building
              or operating internal copilots, customer-facing assistants, and LLM-powered workflows.
            </p>
          </article>

          <article id="request-early-access" className="rounded-xl border border-[#E5E7EB] bg-white p-6 sm:p-7">
            <h3 className="text-2xl font-bold" style={{ fontFamily: "'Space Grotesk', sans-serif" }}>
              Request Early Access
            </h3>
            <p className="mt-4 text-[#4B5563] leading-relaxed" style={{ fontFamily: "'DM Sans', sans-serif" }}>
              Early access is planned for organizations that want to collaborate with Timlin Connect
              as MagNum AI is developed.
            </p>
            <div className="mt-6 flex flex-col sm:flex-row gap-3">
              <a
                href="/#contact"
                className="inline-flex items-center justify-center bg-[#0B0B0B] hover:bg-[#0B0B0B]/90 text-white font-semibold px-5 py-3 rounded-lg transition-all duration-300 focus:outline-none focus-visible:ring-2 focus-visible:ring-[#A3E635]"
                style={{ fontFamily: "'DM Sans', sans-serif" }}
              >
                Join Early Access
              </a>
              <a
                href="/#contact"
                className="inline-flex items-center justify-center border border-[#0B0B0B]/20 hover:border-[#0B0B0B] text-[#0B0B0B] font-semibold px-5 py-3 rounded-lg transition-all duration-300 focus:outline-none focus-visible:ring-2 focus-visible:ring-[#A3E635]"
                style={{ fontFamily: "'DM Sans', sans-serif" }}
              >
                Contact Timlin Connect
              </a>
            </div>
          </article>
        </div>
      </section>
    </main>
  );
};

export default MagnumAIPage;
