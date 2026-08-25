/**
 * Loading placeholders shown while project data is fetched. The boxes mirror the
 * featured band and card geometry exactly (same radii, aspect ratios and
 * padding) so the section doesn't shift when the real data lands.
 */

function ProjectCardSkeleton() {
  return (
    <div className="flex flex-col overflow-hidden rounded-[24px] bg-bg-card shadow-[0px_8px_24px_0px_rgba(15,23,18,0.06)]">
      <div className="aspect-[517/280] w-full bg-bg-sunken" />
      <div className="flex flex-col gap-2 px-7 pb-7 pt-6">
        <div className="h-3 w-32 rounded bg-bg-sunken" />
        <div className="h-7 w-4/5 rounded bg-bg-sunken" />
        <div className="h-4 w-2/5 rounded bg-bg-sunken" />
      </div>
    </div>
  );
}

/** Grid-only skeleton, used while a category filter refetches. */
export function ProjectsGridSkeleton({ count = 6 }: { count?: number }) {
  return (
    <div
      aria-hidden="true"
      className="grid animate-pulse grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3"
    >
      {Array.from({ length: count }).map((_, i) => (
        <ProjectCardSkeleton key={i} />
      ))}
    </div>
  );
}

/** Featured band placeholder. */
export function FeaturedProjectSkeleton() {
  return (
    <div
      aria-hidden="true"
      className="aspect-[1600/540] w-full animate-pulse rounded-[24px] bg-bg-sunken"
    />
  );
}
