import { cn } from "@/lib/utils";
import type { ServiceFeature } from "../services-data";

/**
 * The icon + title + body card used twice in the overview section: once as the
 * tall lead card beside the photo (Figma 161:276) and three times as the strip
 * underneath it (Figma 161:283). Same anatomy, two scales.
 */
export function ServiceFeatureCard({
  feature,
  size = "compact",
  className,
}: {
  feature: ServiceFeature;
  /** "lead" is the 620×380 card, "compact" the 220px-tall strip cards. */
  size?: "lead" | "compact";
  className?: string;
}) {
  const isLead = size === "lead";
  const Icon = feature.icon;

  return (
    <article
      className={cn(
        "flex h-full flex-col bg-bg-card",
        isLead
          ? "gap-4 rounded-[24px] border border-border p-8 lg:rounded-[28px] lg:p-10"
          : "gap-3 rounded-[24px] border border-green-accent-light/25 p-7 lg:p-8",
        className,
      )}
    >
      <span
        aria-hidden="true"
        className={cn(
          "inline-flex shrink-0 items-center justify-center rounded-[14px] bg-green-soft text-green-primary",
          isLead ? "size-[52px]" : "size-11",
        )}
      >
        <Icon
          strokeWidth={1.5}
          className={isLead ? "size-[26px]" : "size-[22px]"}
        />
      </span>

      <h3
        className={cn(
          isLead
            ? "font-heading text-[22px] font-semibold leading-[1.2] tracking-[-0.13px] text-text-primary lg:text-[26px]"
            : "font-body text-base leading-[1.5] text-text-primary",
        )}
      >
        {feature.title}
      </h3>

      <p
        className={cn(
          isLead
            ? "font-body text-base leading-[1.6] text-text-secondary lg:text-[17px]"
            : "font-body text-base leading-[1.5] text-text-secondary",
        )}
      >
        {feature.body}
      </p>
    </article>
  );
}
