import axios from "axios";
import { backendImageUrl } from "@/lib/backend-image";
import type {
  Project,
  ProjectListResponse,
  ProjectQuery,
  ProjectResponse,
} from "@/types/project";

/**
 * Projects API client.
 *
 * Targets the standalone backend at `/api/v1/projects`. The origin comes from
 * `NEXT_PUBLIC_PROJECTS_API_URL`, falling back to the shared backend origin
 * (`NEXT_PUBLIC_BLOG_API_URL`) and finally localhost:5001 for local dev — the
 * same resolution order the testimonials client uses, so a single deployment
 * only has to set one variable.
 */
const client = axios.create({
  baseURL:
    process.env.NEXT_PUBLIC_PROJECTS_API_URL ??
    process.env.NEXT_PUBLIC_BLOG_API_URL ??
    "http://localhost:5001",
  headers: { "Content-Type": "application/json" },
});

/**
 * Corrects the origin on a project's uploaded images. The backend bakes an
 * absolute URL into each row at write time, so rows authored against a
 * developer's machine come back pointing at localhost — a host `next/image`
 * refuses, by throwing. See `backendImageUrl`.
 */
function withResolvedImages(project: Project): Project {
  return {
    ...project,
    featuredImage: backendImageUrl(project.featuredImage),
    gallery: (project.gallery ?? [])
      .map((src) => backendImageUrl(src))
      .filter((src): src is string => Boolean(src)),
  };
}

/** GET /api/v1/projects — paginated, filterable list of published projects. */
export async function getProjects(
  query: ProjectQuery = {},
): Promise<ProjectListResponse> {
  const { data } = await client.get<ProjectListResponse>("/api/v1/projects", {
    params: {
      page: query.page ?? 1,
      limit: query.limit ?? 12,
      ...(query.search ? { search: query.search } : {}),
      // `category` accepts a category _id or slug; "all"/empty means no filter.
      ...(query.category && query.category.toLowerCase() !== "all"
        ? { category: query.category }
        : {}),
      ...(query.featured !== undefined ? { featured: query.featured } : {}),
    },
  });

  return { ...data, data: (data.data ?? []).map(withResolvedImages) };
}

/**
 * GET /api/v1/projects/:slug — a single published project.
 *
 * The route resolves an ObjectId *or* a slug, and unpublished projects 404 for
 * anonymous callers, so a draft is never reachable from the public site.
 */
export async function getProjectBySlug(slug: string): Promise<ProjectResponse> {
  const { data } = await client.get<ProjectResponse>(
    `/api/v1/projects/${encodeURIComponent(slug)}`,
  );
  return { ...data, data: withResolvedImages(data.data) };
}
