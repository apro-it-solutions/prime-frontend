import {
  FilterXSS,
  getDefaultWhiteList,
  safeAttrValue,
  type IWhiteList,
} from "xss";

/**
 * Sanitizer for editor-authored HTML — blog articles and project descriptions,
 * both written in the dashboard's rich-text editor and rendered through
 * `dangerouslySetInnerHTML`.
 *
 * Why not DOMPurify: it needs a DOM, so on the server it pulls in jsdom, and
 * jsdom's CommonJS files `require()` an ES-module dependency. Vercel runs its
 * functions with `--no-experimental-require-module`, so that throws
 * `ERR_REQUIRE_ESM` and every server-rendered article 500s — in production only,
 * because a local Node allows the same require. This filter is plain string
 * parsing with no DOM and no ESM-only dependency, so it behaves the same in both
 * places.
 */

/** Allowed on every tag: the editor emits both for alignment and emphasis. */
const SHARED_ATTRS = ["class", "style"];

/** Per-tag additions on top of the library's defaults. */
const EXTRA_ATTRS: Record<string, string[]> = {
  a: ["rel"],
  img: ["srcset", "sizes", "decoding"],
  h1: ["id"],
  h2: ["id"],
  h3: ["id"],
  h4: ["id"],
  h5: ["id"],
  h6: ["id"],
};

const whiteList: IWhiteList = Object.fromEntries(
  Object.entries(getDefaultWhiteList()).map(([tag, attrs]) => [
    tag,
    [...new Set([...(attrs ?? []), ...SHARED_ATTRS, ...(EXTRA_ATTRS[tag] ?? [])])],
  ]),
);

/** A path that cannot carry a scheme, so there is nothing to smuggle in it. */
const RELATIVE_URL = /^(\/|\.{1,2}\/|#|\?)/;

const filter = new FilterXSS({
  whiteList,
  // Drop the tag but keep what it wrapped, which is how DOMPurify behaved: an
  // unknown wrapper must not take a paragraph of copy down with it.
  stripIgnoreTag: true,
  // Except these two, where the content is the payload.
  stripIgnoreTagBody: ["script", "style"],
  // The library's URL check keeps only absolute http(s) and data: values, which
  // would silently drop an image the editor inserted by path. Relative values
  // are let through first; everything else still goes to that check.
  safeAttrValue(tag, name, value, cssFilter) {
    if (
      (name === "src" || name === "href") &&
      RELATIVE_URL.test(value.trim())
    ) {
      return value;
    }
    return safeAttrValue(tag, name, value, cssFilter);
  },
});

/**
 * Strips scripts, event handlers and unsafe URLs from editor HTML, keeping the
 * formatting an article needs: headings, lists, links, images, tables, quotes
 * and code. Style attributes survive, with their declarations filtered.
 */
export function sanitizeRichText(html: string | null | undefined): string {
  if (!html) return "";
  return filter.process(html);
}
