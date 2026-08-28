"use client";

import { useInfiniteQuery, useQuery } from "@tanstack/react-query";
import { getBlogs, getRelatedBlogs } from "@/services/blog";
import type { Blog, BlogCategoryRef, BlogListResponse } from "@/types/blog";

/** Items fetched per page (page 1 = 1 featured + 6 grid cards). */
export const BLOG_PAGE_SIZE = 7;

/** Sentinel for "no category filter". */
export const ALL_CATEGORIES = "all";

/**
 * The blog list backend has no public categories endpoint, so we derive the
 * filter options from the categories present on the blogs themselves. Fetches a
 * large unfiltered page once and returns the unique categories, sorted by name.
 *
 * Deriving them from `blog.category` is also what keeps blog categories and the
 * product categories apart: these are the rows behind Blogs → Blog Categories in
 * the dashboard, reached through the posts that reference them. The backend's
 * `/api/v1/categories` is the global product list and is auth-gated besides —
 * it must not be wired up here.
 *
 * Posts with no category simply contribute nothing to the filter; they are
 * still listed, under the "News" fallback label.
 */
export function useBlogCategories() {
  return useQuery<BlogCategoryRef[]>({
    queryKey: ["blog-categories"],
    queryFn: async () => {
      const { data } = await getBlogs({ limit: 100 });
      const byId = new Map<string, BlogCategoryRef>();
      for (const blog of data) {
        // A post with no category contributes no filter pill; one with a blank
        // name would contribute an unclickable-looking empty pill, so skip that
        // too. Everything here is a Blog Category, never a product category.
        if (blog.category?._id && blog.category.name?.trim()) {
          byId.set(blog.category._id, blog.category);
        }
      }
      return [...byId.values()].sort((a, b) =>
        (a.name ?? "").localeCompare(b.name ?? ""),
      );
    },
    staleTime: 5 * 60 * 1000,
  });
}

export interface UseBlogsParams {
  search?: string;
  category?: string;
}

/**
 * Related articles for the blog detail page. Cached per (slug, category) and
 * derived from the list endpoint by the service layer.
 */
export function useRelatedBlogs(
  slug: string,
  categoryId?: string,
  limit = 3,
) {
  return useQuery<Blog[]>({
    queryKey: ["related-blogs", slug, categoryId ?? "", limit],
    queryFn: () => getRelatedBlogs(slug, categoryId, limit),
    staleTime: 5 * 60 * 1000,
    enabled: Boolean(slug),
  });
}

/**
 * Infinite (load-more) query for the blog listing. The query key includes the
 * active search + category so changing either transparently resets pagination.
 */
export function useBlogs({ search, category }: UseBlogsParams) {
  return useInfiniteQuery<BlogListResponse>({
    queryKey: ["blogs", { search: search ?? "", category: category ?? "All" }],
    queryFn: ({ pageParam }) =>
      getBlogs({
        page: pageParam as number,
        limit: BLOG_PAGE_SIZE,
        search,
        category,
      }),
    initialPageParam: 1,
    getNextPageParam: (lastPage) => {
      const { page, hasNextPage } = lastPage.meta;
      return hasNextPage ? page + 1 : undefined;
    },
  });
}
