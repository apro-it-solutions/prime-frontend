"use client";

import { useEffect, useMemo, useState } from "react";
import { AlertTriangle, RotateCcw } from "lucide-react";
import { Container } from "@/components/layout/container";
import { FadeHeading } from "@/components/ui/fade-heading";
import { ALL_CATEGORIES, useBlogCategories, useBlogs } from "@/hooks/use-blogs";
import { SearchBar } from "./search-bar";
import { CategoryFilter } from "./category-filter";
import { FeaturedBlog } from "./featured-blog";
import { BlogGrid } from "./blog-grid";
import { BlogPagination } from "./blog-pagination";
import { EmptyState } from "./empty-state";
import { BlogListingSkeleton, BlogGridSkeleton } from "./loading-skeleton";

/** Small inline error panel with a retry action. */
function ErrorState({ onRetry }: { onRetry: () => void }) {
  return (
    <div className="flex flex-col items-center justify-center rounded-[24px] border border-border bg-bg-card px-6 py-20 text-center">
      <span className="inline-flex size-14 items-center justify-center rounded-full bg-red-50 text-red-600">
        <AlertTriangle className="size-7" aria-hidden="true" />
      </span>
      <h3 className="mt-5 font-heading text-2xl font-semibold text-text-primary">
        Couldn&apos;t load articles
      </h3>
      <p className="mt-2 max-w-md font-body text-base text-text-secondary">
        Something went wrong while fetching the blog. Please try again.
      </p>
      <button
        type="button"
        onClick={onRetry}
        className="mt-6 inline-flex items-center gap-2 rounded-full bg-green-primary px-5 py-2.5 font-body text-base text-white transition-colors hover:bg-green-primary/90 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-green-accent focus-visible:ring-offset-2"
      >
        <RotateCcw className="size-4" aria-hidden="true" />
        Retry
      </button>
    </div>
  );
}

/**
 * Client island: "Latest articles" header + search + category filter, then the
 * API-driven featured post, grid, and load-more pagination with loading/error/
 * empty states. Search is debounced; changing search or category refetches.
 */
export function BlogListing() {
  const [category, setCategory] = useState<string>(ALL_CATEGORIES);
  const [searchInput, setSearchInput] = useState("");
  const [search, setSearch] = useState("");

  const { data: categories = [] } = useBlogCategories();

  // Debounce the search box so we don't refetch on every keystroke.
  useEffect(() => {
    const timer = setTimeout(() => setSearch(searchInput.trim()), 300);
    return () => clearTimeout(timer);
  }, [searchInput]);

  const {
    data,
    isLoading,
    isError,
    refetch,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
  } = useBlogs({ search, category });

  const blogs = useMemo(
    () => data?.pages.flatMap((page) => page.data) ?? [],
    [data],
  );
  const [featured, ...gridBlogs] = blogs;

  function resetFilters() {
    setCategory(ALL_CATEGORIES);
    setSearchInput("");
    setSearch("");
  }

  return (
    <section className="bg-bg-base py-16 lg:py-20">
      <Container>
        {/* Heading + search */}
        <div className="flex flex-col gap-6 sm:flex-row sm:items-center sm:justify-between">
          <FadeHeading className="font-heading text-3xl font-semibold leading-[1.15] tracking-[-0.4px] text-text-primary lg:text-[40px]">
            Latest articles
          </FadeHeading>
          <SearchBar value={searchInput} onChange={setSearchInput} />
        </div>

        {/* Category filter */}
        <div className="mt-8">
          <CategoryFilter
            categories={categories}
            active={category}
            onChange={setCategory}
          />
        </div>

        {/* Results */}
        <div className="mt-10">
          {isLoading ? (
            <BlogListingSkeleton />
          ) : isError ? (
            <ErrorState onRetry={() => refetch()} />
          ) : blogs.length === 0 ? (
            <EmptyState onReset={resetFilters} />
          ) : (
            <>
              {featured && <FeaturedBlog blog={featured} />}

              {gridBlogs.length > 0 && (
                <div className="mt-12 lg:mt-[60px]">
                  <BlogGrid blogs={gridBlogs} />
                </div>
              )}

              {isFetchingNextPage && (
                <div className="mt-8">
                  <BlogGridSkeleton />
                </div>
              )}

              <div className="mt-12">
                <BlogPagination
                  hasNextPage={!!hasNextPage}
                  isFetchingNextPage={isFetchingNextPage}
                  onLoadMore={() => fetchNextPage()}
                />
              </div>
            </>
          )}
        </div>
      </Container>
    </section>
  );
}
