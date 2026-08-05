import { formatBlogDate, formatReadingTime } from "@/lib/blog-format";
import type { BlogAuthor as BlogAuthorType } from "@/types/blog";

/** Derives up-to-two-letter initials from a name for the avatar fallback. */
function initialsOf(name: string): string {
  return (
    name
      .trim()
      .split(/\s+/)
      .map((part) => part[0] ?? "")
      .slice(0, 2)
      .join("")
      .toUpperCase() || "•"
  );
}

interface BlogAuthorProps {
  author: BlogAuthorType;
  /** ISO publish date. */
  date: string;
  /** Reading time in minutes. */
  readingTime: number;
}

/**
 * Author byline (Figma 258:163): 48px avatar beside the author name and the
 * "March 12, 2026 · 5 min read" meta line. The backend author has no image, so
 * we render an initials avatar.
 */
export function BlogAuthor({ author, date, readingTime }: BlogAuthorProps) {
  return (
    <div className="flex items-center gap-3.5">
      <span
        aria-hidden="true"
        className="flex size-12 shrink-0 items-center justify-center overflow-hidden rounded-full bg-green-soft font-heading text-base font-semibold text-green-primary"
      >
        {initialsOf(author.name)}
      </span>
      <div className="flex flex-col gap-0.5 font-body text-base leading-[1.5]">
        <span className="text-text-primary">{author.name}</span>
        <span className="text-text-secondary">
          {formatBlogDate(date)} · {formatReadingTime(readingTime)}
        </span>
      </div>
    </div>
  );
}
