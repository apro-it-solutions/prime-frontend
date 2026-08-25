"use client";

import { AlertTriangle, RotateCcw, SearchX } from "lucide-react";

/**
 * Empty and error panels for the portfolio. Same panel treatment as the blog
 * listing's states — 24px radius, bordered card, centred icon — so the two
 * sections read as one system.
 */

interface ProjectsEmptyStateProps {
  title?: string;
  message?: string;
  /** Optional reset action, shown when a category filter is active. */
  onReset?: () => void;
  resetLabel?: string;
}

/** Shown when the API returns no projects for the current filter. */
export function ProjectsEmptyState({
  title = "No projects yet",
  message = "There are no published projects to show right now. Please check back soon.",
  onReset,
  resetLabel = "Show all projects",
}: ProjectsEmptyStateProps) {
  return (
    <div className="flex flex-col items-center justify-center rounded-[24px] border border-border bg-bg-card px-6 py-20 text-center">
      <span className="inline-flex size-14 items-center justify-center rounded-full bg-green-soft text-green-primary">
        <SearchX className="size-7" aria-hidden="true" />
      </span>
      <h3 className="mt-5 font-heading text-2xl font-semibold text-text-primary">
        {title}
      </h3>
      <p className="mt-2 max-w-md font-body text-base text-text-secondary">
        {message}
      </p>
      {onReset && (
        <button
          type="button"
          onClick={onReset}
          className="mt-6 inline-flex items-center gap-2 rounded-full border border-border bg-bg-card px-5 py-2.5 font-body text-base text-text-primary transition-colors hover:border-text-secondary/40 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-green-accent focus-visible:ring-offset-2"
        >
          <RotateCcw className="size-4" aria-hidden="true" />
          {resetLabel}
        </button>
      )}
    </div>
  );
}

/** Shown when the projects request fails. Retries the query in place. */
export function ProjectsErrorState({ onRetry }: { onRetry: () => void }) {
  return (
    <div className="flex flex-col items-center justify-center rounded-[24px] border border-border bg-bg-card px-6 py-20 text-center">
      <span className="inline-flex size-14 items-center justify-center rounded-full bg-red-50 text-red-600">
        <AlertTriangle className="size-7" aria-hidden="true" />
      </span>
      <h3 className="mt-5 font-heading text-2xl font-semibold text-text-primary">
        Couldn&apos;t load projects
      </h3>
      <p className="mt-2 max-w-md font-body text-base text-text-secondary">
        Something went wrong while fetching the portfolio. Please try again.
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
