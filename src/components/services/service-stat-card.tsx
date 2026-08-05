import { ArrowUpRight } from "lucide-react";
import { cn } from "@/lib/utils";

export interface ServiceStat {
  value: string;
  label: string;
}

/** Metric cell for the "Why Choose" grid (Figma 380×180): big number, label, ↗. */
export function ServiceStatCard({
  stat,
  className,
}: {
  stat: ServiceStat;
  className?: string;
}) {
  return (
    <div
      className={cn(
        "group relative flex flex-col justify-between rounded-[20px] border border-border bg-bg-card px-7 py-6 transition-colors duration-300 hover:border-green-accent-light",
        className,
      )}
    >
      <ArrowUpRight
        aria-hidden="true"
        className="absolute right-6 top-6 size-6 text-text-secondary/40 transition-colors duration-300 group-hover:text-green-accent"
      />
      <span className="mt-6 font-heading text-5xl font-semibold leading-[1.05] tracking-[-0.64px] text-green-primary lg:text-[64px]">
        {stat.value}
      </span>
      <span className="mt-4 font-body text-base leading-[1.5] text-text-secondary">
        {stat.label}
      </span>
    </div>
  );
}
