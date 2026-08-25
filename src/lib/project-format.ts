import type { Project, ProjectCategoryRef } from "@/types/project";

/**
 * Presentation helpers for API-driven projects.
 *
 * The Figma card shows a "Category · spec" kicker and a location line. The
 * backend has no `spec` column, so these helpers map the fields it *does*
 * return onto those slots and return `undefined` when nothing is available —
 * callers skip the element rather than render a placeholder.
 */

/** The populated category, or `undefined` when the backend sent an id/null. */
export function projectCategory(
  project: Project,
): ProjectCategoryRef | undefined {
  const { category } = project;
  return category && typeof category === "object" ? category : undefined;
}

/** Category name for the card kicker and detail badge. */
export function projectCategoryName(project: Project): string | undefined {
  return projectCategory(project)?.name;
}

/** Formats an ISO date as "March 2026" — completion is month-precise at most. */
export function formatCompletionDate(iso?: string): string | undefined {
  if (!iso) return undefined;
  const date = new Date(iso);
  if (Number.isNaN(date.getTime())) return undefined;
  return new Intl.DateTimeFormat("en-US", {
    month: "long",
    year: "numeric",
  }).format(date);
}

/** Full date ("12 March 2026") for the detail page's fact list. */
export function formatCompletionDateLong(iso?: string): string | undefined {
  if (!iso) return undefined;
  const date = new Date(iso);
  if (Number.isNaN(date.getTime())) return undefined;
  return new Intl.DateTimeFormat("en-US", {
    day: "numeric",
    month: "long",
    year: "numeric",
  }).format(date);
}

/**
 * The detail shown after the category in a card's kicker — "60,000 sqft" in the
 * design. Prefers the first technology (where a dashboard author records the
 * build spec), then the client, then the completion date.
 */
export function projectSpec(project: Project): string | undefined {
  return (
    project.technologies?.find((tech) => tech.trim().length > 0)?.trim() ||
    project.client?.trim() ||
    formatCompletionDate(project.completionDate)
  );
}

/** The line under a card's title. Location, or the next-best identifying fact. */
export function projectPlace(project: Project): string | undefined {
  return (
    project.location?.trim() ||
    project.client?.trim() ||
    project.shortDescription?.trim() ||
    undefined
  );
}
