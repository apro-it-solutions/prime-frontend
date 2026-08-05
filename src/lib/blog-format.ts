/** Formatting helpers for blog dates and reading time (shared, no duplication). */

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
