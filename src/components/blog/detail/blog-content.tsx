import { sanitizeRichText } from "@/lib/rich-text";

/**
 * Renders the article's rich HTML (headings, paragraphs, lists, images,
 * blockquotes, tables, code blocks, links) after sanitizing it on the server to
 * strip scripts and unsafe markup. Typography is governed by the `.blog-content`
 * styles in globals.css, mapped to the Figma article styles.
 */
export function BlogContent({ html }: { html: string }) {
  const clean = sanitizeRichText(html);

  return (
    <div
      className="blog-content"
      // Sanitized above — see `sanitizeRichText`.
      dangerouslySetInnerHTML={{ __html: clean }}
    />
  );
}
