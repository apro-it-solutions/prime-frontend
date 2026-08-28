/** Formatting helpers for blog dates and reading time (shared, no duplication). */

import type { BlogCategoryRef } from "@/types/blog";

/**
 * What a card's eyebrow reads when a post has no category. The journal is the
 * news section, so this says what the post is rather than that something is
 * missing — and it keeps the eyebrow's slot filled, so the reading time beside
 * it stays where the design puts it.
 */
export const UNCATEGORIZED_LABEL = "News";

/**
 * A post's category name, or the fallback when the backend left it unset. Also
 * covers a category row that came back without a usable name, which reads to a
 * visitor exactly like no category at all.
 */
export function categoryLabel(
  category: BlogCategoryRef | null | undefined,
): string {
  return category?.name?.trim() || UNCATEGORIZED_LABEL;
}

/** Formats an ISO date as "March 12, 2026". */
export function formatBlogDate(iso: string): string {
  const date = new Date(iso);
  if (Number.isNaN(date.getTime())) return "";
  return new Intl.DateTimeFormat("en-US", {
    month: "long",
    day: "numeric",
    year: "numeric",
  }).format(date);
}

/** Formats reading time in minutes as "5 min read". */
export function formatReadingTime(minutes: number): string {
  const value = Math.max(1, Math.round(minutes || 0));
  return `${value} min read`;
}

/** Compact reading time used on cards, e.g. "6 min". */
export function formatReadingTimeShort(minutes: number): string {
  const value = Math.max(1, Math.round(minutes || 0));
  return `${value} min`;
}
