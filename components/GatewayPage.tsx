import React, { useState } from 'react';

// Measured against garak latent-injection probe families and a 600-prompt
// held-out evaluation set. Restated whenever the numbers change.
const measuredCapabilities: { name: string; measure: string; note: string }[] = [
  {
    name: 'Prompt injection detection',
    measure: '98.7% recall',
    note: '148 of 150 on a held-out set, at a 2.0% false-positive rate.',
  },
  {
    name: 'Encoded and obfuscated payloads',
    measure: '0% to 100%',
    note: 'Base64, hex, ROT13 and tag characters, decoded and re-scanned.',
  },
  {
    name: 'Indirect injection in retrieved documents',
    measure: '16.5% to 57.7%',
    note: 'Retrieved content runs the full detection stack, not a weaker one.',
  },
  {
    name: 'Legal-document turn smuggling',
    measure: '0.4% to 68.6%',
    note: 'Fabricated conversation turns and control tokens buried in dense prose.',
  },
  {
    name: 'False positives on payment language',
    measure: '42.9% to 21.4%',
    note: 'Halved with no loss of recall: 0 of 296 attacks released.',
  },
  {
    name: 'Toxicity inside wrapped tasks',
    measure: '0/8 to 6/8',
    note: 'Scored on embedded spans, not only on the prompt as a whole.',
  },
];

// Published deliberately. A detection rate with no stated failure mode is a
// claim rather than a measurement, and security buyers assume the first list is
// cherry-picked unless they can see the second.
const knownGaps: { measure: string; name: string; note: string }[] = [
  {
    measure: '0.01',
    name: 'Hate stated calmly, in narrative or essay register',
    note: 'Abusive speech scores 0.77 to 0.99. The same content written as measured prose scores near zero. The boundary is register, not meaning.',
  },
  {
    measure: '2.0%',
    name: 'Benign prompts incorrectly blocked',
    note: 'Traced rule by rule across 300 held-out benign prompts, and attributable to the classifier rather than the pattern layer.',
  },
  {
    measure: '0%',
    name: 'Two latent-injection families, on direct chat input',
    note: 'Caught in retrieved content, where an injected instruction is unambiguous. On text a user typed, flagged for review rather than blocked.',
  },
];

const demoScreenshots = [
  {
    id: 'dashboard',
    label: 'Dashboard',
    title: 'Security Overview Dashboard',
    description: 'Real-time gateway monitoring with threat counts, risk score, activity charts, and security posture.',
    src: '/magnumai-demo/dashboard-overview.png',
    alt: 'Timlin Gateway security overview dashboard with threat metrics and charts',
  },
  {
    id: 'logs',
    label: 'Logs',
    title: 'Interaction Logs',
    description: 'Review model interactions by status, risk level, detection type, API key, and risk score.',
    src: '/magnumai-demo/interaction-logs.png',
    alt: 'Timlin Gateway interaction logs table showing allowed, flagged, blocked, and sanitized requests',
  },
  {
    id: 'blocked',
    label: 'Blocked',
    title: 'Blocked Requests',
    description: 'See prompt injection and jailbreak attempts stopped by the AI security gateway.',
    src: '/magnumai-demo/blocked-requests.png',
    alt: 'Timlin Gateway blocked requests table listing high risk prompt injection attempts',
  },
  {
    id: 'analytics',
    label: 'Analytics',
    title: 'Risk Analytics',
    description: 'Track risk distribution, threat patterns, block rate, latency, and detection performance.',
    src: '/magnumai-demo/risk-analytics.png',
    alt: 'Timlin Gateway risk analytics dashboard with charts and detection benchmark cards',
  },
  {
    id: 'policies',
    label: 'Policies',
    title: 'Security Policies',
    description: 'Configure gateway rules for blocking, sanitization, PII redaction, and tool-call controls.',
    src: '/magnumai-demo/security-policies.png',
    alt: 'Timlin Gateway security policies page listing active gateway policies',
  },
];

const GatewayPage: React.FC = () => {
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
              Design-partner preview
            </p>
            <h1
              className="mt-4 text-4xl sm:text-5xl lg:text-6xl font-bold leading-tight"
              style={{ fontFamily: "'Space Grotesk', sans-serif" }}
            >
              Timlin Gateway
            </h1>
            <h2
              className="mt-3 text-xl sm:text-2xl text-white/85 font-medium"
              style={{ fontFamily: "'Space Grotesk', sans-serif" }}
            >
              An AI security gateway for safer LLM applications
            </h2>
            <p
              className="mt-6 text-base sm:text-lg text-white/80 leading-relaxed max-w-4xl"
              style={{ fontFamily: "'DM Sans', sans-serif" }}
            >
              Timlin Gateway is a self-hosted security product from Timlin Connect. It sits between
              your application and the model, inspects traffic in both directions, and blocks prompt
              injection, sensitive data leakage, unsafe responses, indirect injection from retrieved
              documents, and risky AI agent actions.
            </p>
            <p
              className="mt-6 inline-flex rounded-lg bg-white/10 border border-white/20 px-4 py-2 text-sm sm:text-base text-white/90"
              style={{ fontFamily: "'DM Sans', sans-serif" }}
            >
              98.7% injection recall at a 2.0% false-positive rate, measured on a held-out set.
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
              Why Timlin Gateway
            </h3>
            <p className="mt-4 text-[#4B5563] leading-relaxed" style={{ fontFamily: "'DM Sans', sans-serif" }}>
              Teams are adopting LLMs quickly, and AI-specific threats are evolving just as fast.
              Timlin Gateway gives organizations practical controls and visibility in front of the
              model, so a prompt-injection or data-leak incident is stopped rather than
              reconstructed afterwards.
            </p>
            <p className="mt-4 text-[#4B5563] leading-relaxed" style={{ fontFamily: "'DM Sans', sans-serif" }}>
              It runs in your own environment against your own provider keys. Prompts never leave
              your network, and every number below is measured rather than asserted.
            </p>
          </article>

          <article className="rounded-xl border border-[#E5E7EB] bg-white p-6 sm:p-7">
            <h3 className="text-2xl font-bold" style={{ fontFamily: "'Space Grotesk', sans-serif" }}>
              What it catches
            </h3>
            <p className="mt-3 text-sm text-[#6B7280]" style={{ fontFamily: "'DM Sans', sans-serif" }}>
              Measured against garak latent-injection probes and a 600-prompt held-out set.
            </p>
            <ul className="mt-5 flex flex-col gap-4">
              {measuredCapabilities.map((item) => (
                <li key={item.name} className="border-b border-[#F3F4F6] pb-4 last:border-0 last:pb-0">
                  <div className="flex flex-wrap items-baseline justify-between gap-x-4 gap-y-1">
                    <span
                      className="text-sm sm:text-base font-semibold text-[#111827]"
                      style={{ fontFamily: "'DM Sans', sans-serif" }}
                    >
                      {item.name}
                    </span>
                    <span className="text-sm font-semibold tabular-nums text-[#166534]">
                      {item.measure}
                    </span>
                  </div>
                  <p
                    className="mt-1 text-sm text-[#6B7280] leading-relaxed"
                    style={{ fontFamily: "'DM Sans', sans-serif" }}
                  >
                    {item.note}
                  </p>
                </li>
              ))}
            </ul>
          </article>

          <article className="rounded-xl border border-[#E5E7EB] bg-white p-6 sm:p-7 lg:col-span-2">
            <h3 className="text-2xl font-bold" style={{ fontFamily: "'Space Grotesk', sans-serif" }}>
              What it misses
            </h3>
            <p className="mt-3 text-[#4B5563] leading-relaxed" style={{ fontFamily: "'DM Sans', sans-serif" }}>
              Detection products are usually sold on the list above alone. This is the second one,
              current as of the latest evaluation.
            </p>
            <ul className="mt-6 grid gap-5 sm:grid-cols-3">
              {knownGaps.map((gap) => (
                <li key={gap.name} className="rounded-lg bg-[#FDF7F5] border border-[#F0DDD7] p-4">
                  <p className="text-sm font-semibold tabular-nums text-[#9A3412]">{gap.measure}</p>
                  <p
                    className="mt-2 text-sm font-semibold text-[#111827]"
                    style={{ fontFamily: "'DM Sans', sans-serif" }}
                  >
                    {gap.name}
                  </p>
                  <p
                    className="mt-2 text-sm text-[#6B7280] leading-relaxed"
                    style={{ fontFamily: "'DM Sans', sans-serif" }}
                  >
                    {gap.note}
                  </p>
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
                  See Timlin Gateway in action
                </h3>
                <p className="mt-4 text-[#4B5563] leading-relaxed" style={{ fontFamily: "'DM Sans', sans-serif" }}>
                  Explore screenshots from the Timlin Gateway console, including gateway monitoring,
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
              How Timlin Gateway works
            </h3>
            <div className="mt-4 grid md:grid-cols-3 gap-4">
              <div className="rounded-lg bg-[#F9FAFB] border border-[#E5E7EB] p-4">
                <p className="font-semibold text-[#0B0B0B]" style={{ fontFamily: "'DM Sans', sans-serif" }}>1. Inspect</p>
                <p className="mt-2 text-sm text-[#4B5563]" style={{ fontFamily: "'DM Sans', sans-serif" }}>
                  Inspect prompts, retrieved context and tool calls in both directions, decoding what is hidden.
                </p>
              </div>
              <div className="rounded-lg bg-[#F9FAFB] border border-[#E5E7EB] p-4">
                <p className="font-semibold text-[#0B0B0B]" style={{ fontFamily: "'DM Sans', sans-serif" }}>2. Enforce</p>
                <p className="mt-2 text-sm text-[#4B5563]" style={{ fontFamily: "'DM Sans', sans-serif" }}>
                  Apply policy-based controls that block, sanitise or redact before a request reaches the model.
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
              Who Timlin Gateway is for
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
              Timlin Gateway is open to design partners who want to run it against their own
              traffic, in their own environment, with their own provider keys. Timlin Connect works
              alongside you on deployment, tuning and the review of what it flags.
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

export default GatewayPage;
