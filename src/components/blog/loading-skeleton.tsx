/** Loading placeholders shown while blog data is fetched. */

function CardSkeleton() {
  return (
    <div className="flex flex-col overflow-hidden rounded-[24px] bg-bg-card shadow-[0px_8px_24px_0px_rgba(15,23,18,0.06)]">
      <div className="aspect-[512/220] w-full bg-bg-sunken" />
      <div className="flex flex-col gap-3 px-7 pb-[30px] pt-[26px]">
        <div className="flex items-center justify-between">
          <div className="h-3 w-24 rounded bg-bg-sunken" />
          <div className="h-3 w-16 rounded bg-bg-sunken" />
        </div>
        <div className="h-5 w-4/5 rounded bg-bg-sunken" />
        <div className="h-4 w-full rounded bg-bg-sunken" />
        <div className="h-4 w-2/3 rounded bg-bg-sunken" />
      </div>
    </div>
  );
}

/** Featured + grid skeletons used for the initial page load. */
export function BlogListingSkeleton() {
  return (
    <div aria-hidden="true" className="animate-pulse">
      {/* Featured */}
      <div className="flex flex-col overflow-hidden rounded-[28px] bg-bg-card shadow-[0px_12px_32px_0px_rgba(15,23,18,0.08)] lg:flex-row">
        <div className="aspect-[760/460] w-full shrink-0 bg-bg-sunken lg:aspect-auto lg:w-[760px]" />
        <div className="flex flex-1 flex-col justify-center gap-5 p-8 sm:p-12 lg:p-14">
          <div className="h-6 w-32 rounded-full bg-bg-sunken" />
          <div className="h-9 w-11/12 rounded bg-bg-sunken" />
          <div className="h-9 w-3/4 rounded bg-bg-sunken" />
          <div className="h-4 w-full rounded bg-bg-sunken" />
          <div className="h-4 w-5/6 rounded bg-bg-sunken" />
        </div>
      </div>

      {/* Grid */}
      <div className="mt-8 grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3">
        {Array.from({ length: 6 }).map((_, i) => (
          <CardSkeleton key={i} />
        ))}
      </div>
    </div>
  );
}

/** Compact grid-only skeleton row appended while loading the next page. */
export function BlogGridSkeleton({ count = 3 }: { count?: number }) {
  return (
    <div
      aria-hidden="true"
      className="grid animate-pulse grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3"
    >
      {Array.from({ length: count }).map((_, i) => (
        <CardSkeleton key={i} />
      ))}
    </div>
  );
}
