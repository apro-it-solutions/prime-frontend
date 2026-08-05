import DOMPurify from "isomorphic-dompurify";

/**
 * Renders the article's rich HTML (headings, paragraphs, lists, images,
 * blockquotes, tables, code blocks, links) after sanitizing it on the server to
 * strip scripts and unsafe markup. Typography is governed by the `.blog-content`
 * styles in globals.css, mapped to the Figma article styles.
 */
export function BlogContent({ html }: { html: string }) {
  const clean = DOMPurify.sanitize(html ?? "", {
    USE_PROFILES: { html: true },
    ADD_ATTR: ["target"],
  });

  return (
    <div
      className="blog-content"
      // Sanitized above with isomorphic-dompurify.
      dangerouslySetInnerHTML={{ __html: clean }}
    />
  );
}
