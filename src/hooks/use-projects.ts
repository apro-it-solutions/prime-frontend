"use client";

import { useQuery } from "@tanstack/react-query";
import { getProjects } from "@/services/projects";
import { projectCategory } from "@/lib/project-format";
import type { Project, ProjectCategoryRef } from "@/types/project";

/**
 * How many projects the portfolio grid requests.
 *
 * The Figma portfolio has no pagination control, so the grid asks for one large
 * page instead of adding a "Load more" the design does not have. 100 is the
 * backend's hard cap on `?limit`, so this is everything it will serve in one
 * request.
 */
export const PROJECTS_PAGE_SIZE = 100;

/** Sentinel for "no category filter". */
export const ALL_CATEGORIES = "all";

/**
 * One query definition per category, shared by every hook below.
 *
 * The filter pills, the featured band and the unfiltered grid all read the same
 * `category: "all"` entry, so React Query serves the three from a single network
 * request instead of racing three of them on mount.
 */
function projectsQuery(category: string) {
  return {
    queryKey: ["projects", { category }] as const,
    queryFn: async () => {
      const res = await getProjects({ category, limit: PROJECTS_PAGE_SIZE });
      return res.data ?? [];
    },
    staleTime: 5 * 60 * 1000,
  };
}

/**
 * Projects for the portfolio grid, filtered by category id.
 *
 * Returns the flat `Project[]` (unwrapped from the `{ data }` envelope) so the
 * UI can branch on `isLoading` / `isError` / an empty array directly. The query
 * key includes the category, so switching tabs is a cached refetch rather than
 * client-side slicing of a stale list.
 */
export function useProjects(category: string = ALL_CATEGORIES) {
  return useQuery<Project[]>(projectsQuery(category));
}

/**
 * The hero project shown above the grid: the one the dashboard flagged as
 * featured, falling back to the first project in the backend's own order
 * (sortOrder, then newest-first). `null` only when there are no published
 * projects at all, and the caller then skips the band entirely.
 */
export function useFeaturedProject() {
  return useQuery<Project[], Error, Project | null>({
    ...projectsQuery(ALL_CATEGORIES),
    select: (projects) =>
      projects.find((project) => project.featured) ?? projects[0] ?? null,
  });
}

/**
 * Filter pills for the portfolio.
 *
 * The backend's categories endpoint is admin-only, so — exactly as the blog
 * listing does — the options are derived from the categories present on the
 * published projects themselves, deduped and sorted by name. A category with no
 * published project never appears as a dead-end tab.
 */
export function useProjectCategories() {
  return useQuery<Project[], Error, ProjectCategoryRef[]>({
    ...projectsQuery(ALL_CATEGORIES),
    select: (projects) => {
      const byId = new Map<string, ProjectCategoryRef>();
      for (const project of projects) {
        const category = projectCategory(project);
        if (category?._id) byId.set(category._id, category);
      }
      return [...byId.values()].sort((a, b) => a.name.localeCompare(b.name));
    },
  });
}
