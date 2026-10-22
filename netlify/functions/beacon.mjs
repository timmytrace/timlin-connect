/**
 * The beacon. A hit here is the finding.
 *
 * Reaching this URL means something read a canary page, understood an
 * instruction embedded in its content, and acted on it. That is the line
 * between a crawler and an agent: a scraper ingests text, an agent comprehends
 * and acts.
 *
 * Returns a 1x1 GIF so the same URL works whether it is fetched directly, put
 * in an <img>, or retrieved by a tool call — the response has to be harmless
 * and valid in all three cases.
 */
import { record } from "./canary.mjs";

// Smallest valid transparent GIF, inline so this has no file dependency.
const PIXEL = Uint8Array.from(
  atob("R0lGODlhAQABAIAAAAAAAP///yH5BAEAAAAALAAAAAABAAEAAAIBRAA7"),
  (c) => c.charCodeAt(0)
);

export default async (request, context) => {
  const url = new URL(request.url);
  const token = (url.searchParams.get("t") || "").toLowerCase();
  const variant = token.replace(/-\d+$/, "");

  const headers = {};
  for (const [name, value] of request.headers) {
    if (name.toLowerCase() !== "cookie") headers[name] = value;
  }

  try {
    await record("beacon", {
      at: new Date().toISOString(),
      token,
      variant,
      ip: context?.ip ?? null,
      country: context?.geo?.country?.code ?? null,
      ua: request.headers.get("user-agent") ?? null,
      // Worth keeping separately: an Accept of image/* suggests the URL was
      // loaded as a resource, while text/* or */* suggests a deliberate fetch.
      // That distinguishes "rendered the page" from "decided to follow the
      // instruction", which are different claims.
      accept: request.headers.get("accept") ?? null,
      referer: request.headers.get("referer") ?? null,
      method: request.method,
      headers,
    });
  } catch (error) {
    console.error("beacon log failed", error);
  }

  return new Response(PIXEL, {
    headers: {
      "content-type": "image/gif",
      "cache-control": "no-store, max-age=0",
    },
  });
};
