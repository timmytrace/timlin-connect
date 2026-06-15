import React from 'react';

const plannedCapabilities = [
  'Prompt Injection Detection',
  'Sensitive Data Protection',
  'RAG and Document Security',
  'AI Agent Tool Safety',
  'Policy-Based Controls',
  'Shadow Mode Testing',
];

const MagnumAIPage: React.FC = () => {
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
