import { cn } from "@/lib/utils";

export interface ValueItem {
  /** Path to the exported line-art illustration (public/images/*.svg). */
  illustration: string;
  title: string;
  description: string;
}

/**
 * A single "What Drives Us" card (Figma 382×340): a soft-mint illustration
 * panel on top and a title + description below. The whole card lifts slightly
 * on hover. Card: white, 24px radius, 0 8 24 rgba(15,23,18,0.06) shadow.
 */
export function ValueCard({
  value,
  className,
}: {
  value: ValueItem;
  className?: string;
}) {
  return (
    <article
      className={cn(
        "group flex flex-col overflow-hidden rounded-[24px] bg-bg-card shadow-[0px_8px_24px_0px_rgba(15,23,18,0.06)] transition-shadow duration-300 hover:shadow-[0px_16px_40px_0px_rgba(15,23,18,0.12)]",
        className,
      )}
    >
      <div className="relative h-[200px] w-full overflow-hidden">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={value.illustration}
          alt=""
          aria-hidden="true"
          className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-[1.03]"
        />
      </div>
      <div className="flex flex-col gap-2 px-7 pb-7 pt-6">
        <h3 className="font-body text-[28px] font-bold leading-[1.15] tracking-[-0.28px] text-text-primary">
          {value.title}
        </h3>
        <p className="font-body text-base leading-[1.5] text-text-secondary">
          {value.description}
        </p>
      </div>
    </article>
  );
}
