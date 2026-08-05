import axios from "axios";
import type {
  TestimonialListResponse,
  TestimonialQuery,
} from "@/types/testimonials";

/**
 * Testimonials API client.
 *
 * Targets the standalone backend at `/api/v1/testimonials`. The origin comes
 * from `NEXT_PUBLIC_TESTIMONIALS_API_URL`, falling back to the shared backend
 * origin (`NEXT_PUBLIC_BLOG_API_URL`) and finally localhost:5001 for local dev.
 */
const client = axios.create({
  baseURL:
    process.env.NEXT_PUBLIC_TESTIMONIALS_API_URL ??
    process.env.NEXT_PUBLIC_BLOG_API_URL ??
    "http://localhost:5001",
  headers: { "Content-Type": "application/json" },
});

/** GET /api/v1/testimonials — list of published testimonials. */
export async function getTestimonials(
  query: TestimonialQuery = {},
): Promise<TestimonialListResponse> {
  const { data } = await client.get<TestimonialListResponse>(
    "/api/v1/testimonials",
    {
      params: {
        page: query.page ?? 1,
        limit: query.limit ?? 12,
      },
    },
  );
  return data;
}
