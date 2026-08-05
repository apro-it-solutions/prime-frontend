"use client";

import { Loader2 } from "lucide-react";

interface BlogPaginationProps {
  hasNextPage: boolean;
  isFetchingNextPage: boolean;
  onLoadMore: () => void;
}

/**
 * "Load more" pagination control. Hidden once every page is loaded; shows a
 * spinner while the next page is in flight.
 */
export function BlogPagination({
  hasNextPage,
  isFetchingNextPage,
  onLoadMore,
}: BlogPaginationProps) {
  if (!hasNextPage) return null;

  return (
    <div className="flex justify-center">
      <button
        type="button"
        onClick={onLoadMore}
        disabled={isFetchingNextPage}
        className="inline-flex h-14 items-center justify-center gap-2 rounded-full border border-border bg-bg-card px-8 font-body text-base text-text-primary transition-colors duration-200 hover:border-text-secondary/40 hover:bg-bg-sunken focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-green-accent focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-70"
      >
        {isFetchingNextPage ? (
          <>
            <Loader2 className="size-4 animate-spin" aria-hidden="true" />
            Loading…
          </>
        ) : (
          "Load more articles"
        )}
      </button>
    </div>
  );
}
