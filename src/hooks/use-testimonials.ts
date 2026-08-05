"use client";

import { useQuery } from "@tanstack/react-query";
import { getTestimonials } from "@/services/testimonials";
import type { Testimonial } from "@/types/testimonials";

/** How many testimonials to request for the homepage carousel. */
export const TESTIMONIALS_LIMIT = 12;

/**
 * Fetch published testimonials for the homepage carousel. Returns the flat
 * `Testimonial[]` (unwrapped from the `{ data }` envelope) so the UI can branch
 * on `isLoading` / `isError` / an empty array directly.
 */
export function useTestimonials(limit = TESTIMONIALS_LIMIT) {
  return useQuery<Testimonial[]>({
    queryKey: ["testimonials", limit],
    queryFn: async () => {
      const res = await getTestimonials({ limit });
      return res.data ?? [];
    },
    staleTime: 5 * 60 * 1000,
  });
}
