import { cn } from "@/lib/utils";

/**
 * Two eyebrow treatments used across the Services page:
 *  - "dot"  → a bordered pill with a green marker dot ("Our Expertise")
 *  - "plain"→ an uppercase, letter-spaced label ("BENEFITS")
 */
export function SectionEyebrow({
  label,
  variant = "dot",
  className,
}: {
  label: string;
  variant?: "dot" | "plain";
  className?: string;
}) {
  if (variant === "plain") {
    return (
      <p
        className={cn(
          "font-body text-[13px] font-medium uppercase tracking-[1.5px]",
          className,
        )}
      >
        {label}
      </p>
    );
  }

  return (
    <span
      className={cn(
        "inline-flex items-center gap-2 rounded-full border border-border bg-bg-card py-1.5 pl-4 pr-5 font-body text-base leading-none text-text-primary",
        className,
      )}
    >
      <span aria-hidden="true" className="size-2 rounded-full bg-green-accent" />
      {label}
    </span>
  );
}
