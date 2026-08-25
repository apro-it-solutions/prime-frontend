import DOMPurify from "isomorphic-dompurify";

/**
 * Renders the project's rich HTML description (the dashboard authors it in a
 * rich-text editor) after sanitizing it on the server to strip scripts and
 * unsafe markup.
 *
 * Typography comes from the shared `.blog-content` rules in globals.css — the
 * site's one rich-text scale, used by every editor-authored body on the site.
 */
export function ProjectContent({ html }: { html: string }) {
  const clean = DOMPurify.sanitize(html ?? "", {
    USE_PROFILES: { html: true },
    ADD_ATTR: ["target"],
  });

  if (!clean.trim()) return null;

  return (
    <div
      className="blog-content"
      // Sanitized above with isomorphic-dompurify.
      dangerouslySetInnerHTML={{ __html: clean }}
    />
  );
}
