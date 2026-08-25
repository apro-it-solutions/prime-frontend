import "server-only";
import { cache } from "react";
import axios from "axios";
import { getProjectBySlug } from "@/services/projects";
import type { Project } from "@/types/project";

/**
 * Server-side single-project fetch, memoized per request with React `cache()` so
 * `generateMetadata` and the page component share one network call. Returns
 * `null` when the slug doesn't exist (404) so the page can render notFound();
 * other errors propagate to the error boundary.
 */
export const getProject = cache(async (slug: string): Promise<Project | null> => {
  try {
    const { data } = await getProjectBySlug(slug);
    return data;
  } catch (error) {
    if (axios.isAxiosError(error) && error.response?.status === 404) {
      return null;
    }
    throw error;
  }
});
