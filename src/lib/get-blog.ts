import "server-only";
import { cache } from "react";
import axios from "axios";
import { getBlogBySlug } from "@/services/blog";
import type { Blog } from "@/types/blog";

/**
 * Server-side single-blog fetch, memoized per request with React `cache()` so
 * `generateMetadata` and the page component share one network call. Returns
 * `null` when the slug doesn't exist (404) so the page can render notFound();
 * other errors propagate to the error boundary.
 */
export const getBlog = cache(async (slug: string): Promise<Blog | null> => {
  try {
    const { data } = await getBlogBySlug(slug);
    return data;
  } catch (error) {
    if (axios.isAxiosError(error) && error.response?.status === 404) {
      return null;
    }
    throw error;
  }
});
