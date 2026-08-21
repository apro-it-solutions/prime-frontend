import axios from "axios";
import { backendImageUrl } from "@/lib/backend-image";
import type {
  Blog,
  BlogListResponse,
  BlogResponse,
  BlogQuery,
} from "@/types/blog";

/**
 * Blog API client.
 *
 * Targets the standalone backend at `/api/v1/blogs`. The origin comes from
 * `NEXT_PUBLIC_BLOG_API_URL` (e.g. "http://localhost:5001"); it defaults to
 * localhost:5001 for local development.
 */
const client = axios.create({
  baseURL: process.env.NEXT_PUBLIC_BLOG_API_URL ?? "http://localhost:5001",
  headers: { "Content-Type": "application/json" },
});

/**
 * Corrects the origin on a blog's uploaded images. The backend bakes an
 * absolute URL into each row at write time, so posts authored against a
 * developer's machine come back pointing at localhost — a host `next/image`
 * refuses, by throwing. See `backendImageUrl`.
 */
function withResolvedImages(blog: Blog): Blog {
  return {
    ...blog,
    featuredImage: backendImageUrl(blog.featuredImage),
    gallery: blog.gallery
      .map((src) => backendImageUrl(src))
      .filter((src): src is string => Boolean(src)),
  };
}

/** GET /api/v1/blogs — paginated, filterable list. */
export async function getBlogs(query: BlogQuery = {}): Promise<BlogListResponse> {
  const { data } = await client.get<BlogListResponse>("/api/v1/blogs", {
    params: {
      page: query.page ?? 1,
      limit: query.limit ?? 7,
      ...(query.search ? { search: query.search } : {}),
      // `category` is the backend category _id; "all"/empty means no filter.
      ...(query.category && query.category.toLowerCase() !== "all"
        ? { category: query.category }
        : {}),
    },
  });
  return { ...data, data: data.data.map(withResolvedImages) };
}

/** GET /api/v1/blogs/:slug — a single blog. */
export async function getBlogBySlug(slug: string): Promise<BlogResponse> {
  const { data } = await client.get<BlogResponse>(`/api/v1/blogs/${slug}`);
  return { ...data, data: withResolvedImages(data.data) };
}

/**
 * Related blogs for the article page.
 *
 * The backend has no dedicated `related`/`recent` endpoint, so we derive them
 * from the list endpoint: prefer posts in the same category, then top up with
 * the most recent posts — always excluding the current article. Still 100%
 * backend data, no mocks.
 */
export async function getRelatedBlogs(
  slug: string,
  categoryId?: string,
  limit = 3,
): Promise<Blog[]> {
  const picked: Blog[] = [];
  const seen = new Set<string>();

  const add = (blogs: Blog[]) => {
    for (const blog of blogs) {
      if (picked.length >= limit) break;
      if (blog.slug === slug || seen.has(blog._id)) continue;
      seen.add(blog._id);
      picked.push(blog);
    }
  };

  if (categoryId) {
    const { data } = await getBlogs({ category: categoryId, limit: limit + 1 });
    add(data);
  }
  if (picked.length < limit) {
    const { data } = await getBlogs({ limit: limit + 4 });
    add(data);
  }

  return picked.slice(0, limit);
}
