import React from 'react';

/**
 * A deliberately small Markdown renderer for blog bodies.
 *
 * It supports the subset used by our posts — paragraphs, headings, lists,
 * blockquotes, figures, and inline emphasis/code/links — and renders through
 * React elements rather than `dangerouslySetInnerHTML`, so post content can
 * never inject raw HTML into the page.
 *
 * Body copy is set in a serif face at a long-form reading size, which is the
 * single biggest difference between "a page with text on it" and something
 * people actually read to the end.
 */

const HEADING = "'Space Grotesk', sans-serif";
const BODY = "'DM Sans', sans-serif";
const READING = "'Source Serif 4', Charter, Georgia, 'Times New Roman', serif";

export interface Heading {
  id: string;
  text: string;
  level: number;
}

/* ------------------------------------------------------------------ */
/* Helpers                                                             */
/* ------------------------------------------------------------------ */

/** Strips inline markup so heading text can be used as a label or anchor. */
const plainText = (value: string): string =>
  value
    .replace(/\[([^\]]+)\]\([^)\s]+\)/g, '$1')
    .replace(/[*_`]/g, '')
    .trim();

export const slugify = (value: string): string =>
  plainText(value)
    .toLowerCase()
    .replace(/[^a-z0-9\s-]/g, '')
    .trim()
    .replace(/\s+/g, '-')
    .slice(0, 60);

const splitBlocks = (source: string): string[] => source.trim().split(/\r?\n\s*\r?\n/);

/** Collects `##`–`####` headings so the article can render a contents rail. */
export const extractHeadings = (source: string): Heading[] =>
  splitBlocks(source)
    .map((block) => /^(#{2,4})\s+(.*)$/.exec(block.trim()))
    .filter((match): match is RegExpExecArray => match !== null)
    .map((match) => ({
      id: slugify(match[2]),
      text: plainText(match[2]),
      level: match[1].length,
    }));

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
            className="text-[#0B0B0B] underline decoration-[#A3E635] decoration-2 underline-offset-[3px] transition-colors hover:decoration-[#0B0B0B]"
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
        <code
          key={key}
          className="rounded bg-[#F0F0F0] px-1.5 py-0.5 text-[0.85em] text-[#0B0B0B]"
          style={{ fontFamily: 'ui-monospace, SFMono-Regular, Menlo, monospace' }}
        >
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

/**
 * `![alt](/path/to.png "Optional caption")` on its own line becomes a figure.
 * The path is matched loosely because several images in `public/` contain
 * spaces and ampersands in their filenames.
 */
const IMAGE_BLOCK = /^!\[([^\]]*)\]\(\s*([^)"]+?)\s*(?:"([^"]*)")?\s*\)$/;

const renderBlock = (block: string, key: string): React.ReactNode => {
  const trimmed = block.trim();
  if (trimmed === '') return null;

  // Figure
  const image = IMAGE_BLOCK.exec(trimmed);
  if (image) {
    const [, alt, src, caption] = image;
    return (
      <figure key={key} className="my-10 -mx-4 sm:mx-0">
        <img
          src={src}
          alt={alt}
          loading="lazy"
          className="w-full rounded-none bg-[#E5E5E5] object-cover sm:rounded-xl"
        />
        {caption && (
          <figcaption
            className="mt-3 px-4 text-center text-sm text-[#9CA3AF] sm:px-0"
            style={{ fontFamily: BODY }}
          >
            {renderInline(caption, `${key}-cap`)}
          </figcaption>
        )}
      </figure>
    );
  }

  // Headings
  const heading = /^(#{2,4})\s+(.*)$/.exec(trimmed);
  if (heading) {
    const level = heading[1].length;
    const id = slugify(heading[2]);
    const className =
      level === 2
        ? 'mt-14 mb-2 scroll-mt-28 text-[1.75rem] font-bold leading-tight tracking-tight sm:text-[2rem]'
        : level === 3
          ? 'mt-10 mb-1 scroll-mt-28 text-xl font-bold leading-snug sm:text-2xl'
          : 'mt-8 mb-1 scroll-mt-28 text-lg font-bold leading-snug';

    return React.createElement(
      `h${level}`,
      { key, id, className, style: { fontFamily: HEADING } },
      renderInline(heading[2], key)
    );
  }

  // Horizontal rule — Medium's section break rather than a hard line.
  if (/^(-{3,}|\*{3,})$/.test(trimmed)) {
    return (
      <div
        key={key}
        aria-hidden="true"
        className="my-12 text-center text-2xl tracking-[0.6em] text-[#D1D5DB]"
      >
        •••
      </div>
    );
  }

  // Pull quote
  if (trimmed.startsWith('>')) {
    const quote = trimmed
      .split(/\r?\n/)
      .map((line) => line.replace(/^\s*>\s?/, ''))
      .join(' ')
      .trim();
    return (
      <blockquote
        key={key}
        className="my-10 border-l-[3px] border-[#A3E635] pl-6 text-[1.375rem] italic leading-[1.5] text-[#0B0B0B] sm:text-[1.5rem]"
        style={{ fontFamily: READING }}
      >
        {renderInline(quote, key)}
      </blockquote>
    );
  }

  // Ordered list
  if (/^\s*\d+\.\s+/.test(trimmed)) {
    return (
      <ol
        key={key}
        className="my-7 list-decimal space-y-3 pl-7 text-[1.1875rem] leading-[1.7] text-[#242424] sm:text-[1.25rem]"
        style={{ fontFamily: READING }}
      >
        {listItems(trimmed, true).map((item, i) => (
          <li key={`${key}-${i}`} className="pl-2">
            {renderInline(item, `${key}-${i}`)}
          </li>
        ))}
      </ol>
    );
  }

  // Unordered list
  if (/^\s*[-*]\s+/.test(trimmed)) {
    return (
      <ul
        key={key}
        className="my-7 space-y-3 text-[1.1875rem] leading-[1.7] text-[#242424] sm:text-[1.25rem]"
        style={{ fontFamily: READING }}
      >
        {listItems(trimmed, false).map((item, i) => (
          <li key={`${key}-${i}`} className="flex items-start gap-4">
            <span className="mt-[0.7em] h-1.5 w-1.5 flex-shrink-0 rounded-full bg-[#A3E635]" aria-hidden="true" />
            <span>{renderInline(item, `${key}-${i}`)}</span>
          </li>
        ))}
      </ul>
    );
  }

  // Paragraph
  return (
    <p
      key={key}
      className="mt-7 text-[1.1875rem] leading-[1.75] tracking-[-0.003em] text-[#242424] sm:text-[1.3125rem] sm:leading-[1.7]"
      style={{ fontFamily: READING }}
    >
      {renderInline(trimmed.replace(/\r?\n/g, ' '), key)}
    </p>
  );
};

const Markdown: React.FC<{ source: string; className?: string }> = ({ source, className = '' }) => (
  <div className={className}>{splitBlocks(source).map((block, i) => renderBlock(block, `b${i}`))}</div>
);

export default Markdown;
