"use client";

import { useQuery } from "@tanstack/react-query";
import { getTestimonials } from "@/services/testimonials";
import type { Testimonial } from "@/types/testimonials";

/** How many testimonials to request for the homepage carousel. */
export const TESTIMONIALS_LIMIT = 12;

/**
 * Fetch published testimonials for the carousel. Returns the flat
 * `Testimonial[]` (unwrapped from the `{ data }` envelope) so the UI can branch
 * on `isLoading` / `isError` / an empty array directly.
 *
 * The public list route already excludes rows the dashboard has deactivated, so
 * the `isActive` filter here is a second line of defence: a testimonial is only
 * rendered when the backend has not explicitly marked it inactive.
 */
export function useTestimonials(limit = TESTIMONIALS_LIMIT) {
  return useQuery<Testimonial[]>({
    queryKey: ["testimonials", limit],
    queryFn: async () => {
      const res = await getTestimonials({ limit });
      return (res.data ?? []).filter((t) => t.isActive !== false);
    },
    staleTime: 5 * 60 * 1000,
  });
}
