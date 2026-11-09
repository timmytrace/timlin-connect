import React, { useMemo } from 'react';
import { changelogSorted, lastShipped, type ChangelogEntry } from '../content/changelog';

/**
 * What shipped, as a dated stream.
 *
 * The site previously showed finished states: services offered, a product
 * described, posts published. None of it showed motion, and motion is the
 * thing that distinguishes a practice from a brochure.
 *
 * The page leads with how long ago the last entry landed, and says so in
 * words rather than only as a date. A changelog that has stopped being
 * maintained should read as stopped — the usual failure is that it keeps
 * looking authoritative while going quietly out of date.
 */
const MONTHS = [
  'January', 'February', 'March', 'April', 'May', 'June',
  'July', 'August', 'September', 'October', 'November', 'December',
];

/** Parsed as local midnight, matching how posts.ts decides what is published. */
const toLocalDate = (iso: string): Date => {
  const [y, m, d] = iso.split('-').map(Number);
  return new Date(y, m - 1, d);
};

const formatDate = (iso: string): string => {
  const d = toLocalDate(iso);
  return `${MONTHS[d.getMonth()]} ${d.getDate()}, ${d.getFullYear()}`;
};

const daysSince = (iso: string): number => {
  const then = toLocalDate(iso);
  const now = new Date();
  const today = new Date(now.getFullYear(), now.getMonth(), now.getDate());
  return Math.round((today.getTime() - then.getTime()) / 86_400_000);
};

/** Plain language, because "2026-11-07" does not tell a reader whether this is alive. */
const freshness = (days: number): string => {
  if (days <= 0) return 'Last shipped today.';
  if (days === 1) return 'Last shipped yesterday.';
  if (days < 14) return `Last shipped ${days} days ago.`;
  if (days < 60) return `Last shipped ${Math.floor(days / 7)} weeks ago.`;
  return `Last shipped ${Math.floor(days / 30)} months ago.`;
};

const AREA_STYLES: Record<ChangelogEntry['area'], string> = {
  Gateway: 'bg-[#0B0B0B] text-white',
  Research: 'bg-[#DCFCE7] text-[#166534]',
  'Open source': 'bg-[#E0E7FF] text-[#3730A3]',
  Site: 'bg-[#F3F4F6] text-[#374151]',
};

const isExternal = (href: string) => /^https?:\/\//.test(href);

const Entry: React.FC<{ entry: ChangelogEntry }> = ({ entry }) => (
  <li className="relative border-t border-[#E5E5E5] py-7 sm:grid sm:grid-cols-12 sm:gap-8">
    <div className="sm:col-span-3">
      <time
        dateTime={entry.date}
        className="block text-sm font-semibold tabular-nums text-[#6B7280]"
        style={{ fontFamily: "'DM Sans', sans-serif" }}
      >
        {formatDate(entry.date)}
      </time>
      <span
        className={`mt-2 inline-flex rounded-full px-2.5 py-0.5 text-[0.7rem] font-semibold ${AREA_STYLES[entry.area]}`}
        style={{ fontFamily: "'DM Sans', sans-serif" }}
      >
        {entry.area}
      </span>
    </div>

    <div className="mt-2 sm:col-span-9 sm:mt-0">
      <h2
        className="text-lg font-bold leading-snug text-[#0B0B0B]"
        style={{ fontFamily: "'Space Grotesk', sans-serif" }}
      >
        {entry.title}
      </h2>
      <p
        className="mt-2 leading-relaxed text-[#4B5563]"
        style={{ fontFamily: "'DM Sans', sans-serif" }}
      >
        {entry.detail}
      </p>
      {entry.href && (
        <a
          href={entry.href}
          {...(isExternal(entry.href)
            // rel="noopener" because target="_blank" hands the opened page a
            // reference back to this one unless you say otherwise.
            ? { target: '_blank', rel: 'noopener noreferrer' }
            : {})}
          className="mt-3 inline-flex items-center text-sm font-semibold text-[#0B0B0B] underline underline-offset-4 decoration-[#A3E635] hover:opacity-70 focus:outline-none focus-visible:ring-2 focus-visible:ring-[#A3E635] rounded"
          style={{ fontFamily: "'DM Sans', sans-serif" }}
        >
          {isExternal(entry.href) ? 'View on GitHub' : 'Read it'}
          <span className="ml-1.5" aria-hidden="true">
            {isExternal(entry.href) ? '↗' : '→'}
          </span>
        </a>
      )}
    </div>
  </li>
);

const ChangelogPage: React.FC = () => {
  const days = useMemo(() => (lastShipped ? daysSince(lastShipped) : null), []);

  return (
    <main className="flex-grow bg-white pt-28 pb-20 sm:pt-32">
      <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8">
        <h1
          className="text-3xl font-bold text-[#0B0B0B] sm:text-4xl lg:text-5xl"
          style={{ fontFamily: "'Space Grotesk', sans-serif" }}
        >
          What shipped
        </h1>
        <p
          className="mt-4 max-w-2xl text-base leading-relaxed text-[#6B7280] sm:text-lg"
          style={{ fontFamily: "'DM Sans', sans-serif" }}
        >
          Work that landed, dated. Detection rules, measurements, open-source releases and
          corrections to our own earlier numbers. Not a roadmap — a roadmap is a list of things
          that have not happened.
        </p>

        {days !== null && (
          <p
            className="mt-6 inline-flex items-center gap-2 rounded-full border border-[#E5E5E5] bg-[#FAFAFA] px-4 py-1.5 text-sm font-medium text-[#374151]"
            style={{ fontFamily: "'DM Sans', sans-serif" }}
          >
            <span
              className={`h-2 w-2 rounded-full ${days <= 45 ? 'bg-[#A3E635]' : 'bg-[#D1D5DB]'}`}
              aria-hidden="true"
            />
            {freshness(days)}
          </p>
        )}

        <ul className="mt-12">
          {changelogSorted.map((entry) => (
            <Entry key={`${entry.date}-${entry.title}`} entry={entry} />
          ))}
        </ul>

        <p
          className="mt-12 border-t border-[#E5E5E5] pt-8 text-sm leading-relaxed text-[#6B7280]"
          style={{ fontFamily: "'DM Sans', sans-serif" }}
        >
          Entries are curated rather than generated from commits — not every commit is a
          shipment. Some work lives in a private repository and has no link; it is listed anyway,
          because leaving it out would make the record of what happened less accurate rather than
          more verifiable.
        </p>
      </div>
    </main>
  );
};

export default ChangelogPage;
