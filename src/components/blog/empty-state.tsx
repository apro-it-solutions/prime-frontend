import { SearchX, RotateCcw } from "lucide-react";

interface EmptyStateProps {
  title?: string;
  message?: string;
  /** Optional reset action (e.g. clear filters). */
  onReset?: () => void;
  resetLabel?: string;
}

/** Shown when no blogs match the active search/category. */
export function EmptyState({
  title = "No articles found",
  message = "Try a different search term or category.",
  onReset,
  resetLabel = "Clear filters",
}: EmptyStateProps) {
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
