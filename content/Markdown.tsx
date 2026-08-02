import React from 'react';

/**
 * A deliberately small Markdown renderer for blog bodies.
 *
 * It supports the subset used by our posts — paragraphs, headings, lists,
 * blockquotes, and inline emphasis/code/links — and renders through React
 * elements rather than `dangerouslySetInnerHTML`, so post content can never
 * inject raw HTML into the page.
 */

const HEADING = "'Space Grotesk', sans-serif";
const BODY = "'DM Sans', sans-serif";

/* ------------------------------------------------------------------ */
/* Inline formatting                                                   */
/* ------------------------------------------------------------------ */

// Order matters: bold before italic so `**x**` is not eaten by the italic rule.
const INLINE_PATTERN = /(\[[^\]]+\]\([^)\s]+\))|(\*\*[^*]+\*\*)|(_[^_]+_)|(\*[^*]+\*)|(`[^`]+`)/g;

const renderInline = (text: string, keyPrefix: string): React.ReactNode[] => {
  const nodes: React.ReactNode[] = [];
  let lastIndex = 0;
  let match: RegExpExecArray | null;
  let i = 0;

  INLINE_PATTERN.lastIndex = 0;
  while ((match = INLINE_PATTERN.exec(text)) !== null) {
    if (match.index > lastIndex) {
      nodes.push(text.slice(lastIndex, match.index));
    }

    const token = match[0];
    const key = `${keyPrefix}-i${i++}`;

    if (token.startsWith('[')) {
      const link = /^\[([^\]]+)\]\(([^)\s]+)\)$/.exec(token);
      if (link) {
        const [, label, href] = link;
        const external = /^https?:\/\//.test(href);
        nodes.push(
          <a
            key={key}
            href={href}
            {...(external ? { target: '_blank', rel: 'noopener noreferrer' } : {})}
            className="font-semibold text-[#0B0B0B] underline decoration-[#A3E635] decoration-2 underline-offset-4 transition-colors hover:text-[#0B0B0B]/70"
          >
            {label}
          </a>
        );
      }
    } else if (token.startsWith('**')) {
      nodes.push(
        <strong key={key} className="font-semibold text-[#0B0B0B]">
          {token.slice(2, -2)}
        </strong>
      );
    } else if (token.startsWith('`')) {
      nodes.push(
        <code key={key} className="rounded bg-[#F0F0F0] px-1.5 py-0.5 text-[0.9em] text-[#0B0B0B]">
          {token.slice(1, -1)}
        </code>
      );
    } else {
      nodes.push(<em key={key}>{token.slice(1, -1)}</em>);
    }

    lastIndex = match.index + token.length;
  }

  if (lastIndex < text.length) {
    nodes.push(text.slice(lastIndex));
  }

  return nodes;
};

/* ------------------------------------------------------------------ */
/* Block formatting                                                    */
/* ------------------------------------------------------------------ */

const listItems = (block: string, ordered: boolean): string[] =>
  block
    .split(/\r?\n/)
    .map((line) => line.replace(ordered ? /^\s*\d+\.\s+/ : /^\s*[-*]\s+/, '').trim())
    .filter(Boolean);

const renderBlock = (block: string, key: string): React.ReactNode => {
  const trimmed = block.trim();
  if (trimmed === '') return null;

  // Headings
  const heading = /^(#{2,4})\s+(.*)$/.exec(trimmed);
  if (heading) {
    const level = heading[1].length;
    const content = renderInline(heading[2], key);
    const className =
      level === 2
        ? 'mt-12 text-2xl font-bold leading-tight sm:text-3xl'
        : level === 3
          ? 'mt-10 text-xl font-bold leading-snug sm:text-2xl'
          : 'mt-8 text-lg font-bold leading-snug';

    return React.createElement(
      `h${level}`,
      { key, className, style: { fontFamily: HEADING } },
      content
    );
  }

  // Horizontal rule
  if (/^(-{3,}|\*{3,})$/.test(trimmed)) {
    return <hr key={key} className="my-10 border-t border-[#E5E5E5]" />;
  }

  // Blockquote
  if (trimmed.startsWith('>')) {
    const quote = trimmed
      .split(/\r?\n/)
      .map((line) => line.replace(/^\s*>\s?/, ''))
      .join(' ')
      .trim();
    return (
      <blockquote
        key={key}
        className="my-8 border-l-2 border-[#A3E635] pl-6 text-lg italic leading-relaxed text-[#0B0B0B] sm:text-xl"
        style={{ fontFamily: BODY }}
      >
        {renderInline(quote, key)}
      </blockquote>
    );
  }

  // Ordered list
  if (/^\s*\d+\.\s+/.test(trimmed)) {
    return (
      <ol key={key} className="my-6 list-decimal space-y-2 pl-6 text-[#374151]" style={{ fontFamily: BODY }}>
        {listItems(trimmed, true).map((item, i) => (
          <li key={`${key}-${i}`} className="pl-1 leading-relaxed">
            {renderInline(item, `${key}-${i}`)}
          </li>
        ))}
      </ol>
    );
  }

  // Unordered list
  if (/^\s*[-*]\s+/.test(trimmed)) {
    return (
      <ul key={key} className="my-6 space-y-3 text-[#374151]" style={{ fontFamily: BODY }}>
        {listItems(trimmed, false).map((item, i) => (
          <li key={`${key}-${i}`} className="flex items-start gap-3 leading-relaxed">
            <span className="mt-2.5 h-1.5 w-1.5 flex-shrink-0 rounded-full bg-[#A3E635]" aria-hidden="true" />
            <span>{renderInline(item, `${key}-${i}`)}</span>
          </li>
        ))}
      </ul>
    );
  }

  // Paragraph
  return (
    <p key={key} className="text-[1.0625rem] leading-[1.85] text-[#374151] sm:text-lg" style={{ fontFamily: BODY }}>
      {renderInline(trimmed.replace(/\r?\n/g, ' '), key)}
    </p>
  );
};

const Markdown: React.FC<{ source: string; className?: string }> = ({ source, className = '' }) => {
  const blocks = source.trim().split(/\r?\n\s*\r?\n/);
  return <div className={className}>{blocks.map((block, i) => renderBlock(block, `b${i}`))}</div>;
};

export default Markdown;
