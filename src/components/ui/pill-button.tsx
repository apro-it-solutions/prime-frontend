import Link from "next/link";
import { cn } from "@/lib/utils";
import { ArrowCircle } from "./arrow-circle";

type PillVariant = "light" | "green" | "hero" | "invert";

interface PillButtonProps {
  label: string;
  href: string;
  variant?: PillVariant;
  className?: string;
}

/** Per-variant shell, label and badge styling. */
const VARIANTS: Record<
  PillVariant,
  {
    shell: string;
    label: string;
    badge: number;
    circle: string;
    arrow: string;
  }
> = {
  light: {
    shell:
      "gap-4 bg-white py-2 pl-8 pr-2 text-text-primary shadow-[0px_6px_24px_0px_rgba(15,23,18,0.06)] hover:shadow-[0px_10px_28px_0px_rgba(15,23,18,0.12)]",
    label: "font-body text-base",
    badge: 40,
    circle: "fill-green-primary",
    arrow: "fill-bg-base",
  },
  green: {
    shell:
      "gap-2.5 bg-green-primary py-2 pl-[22px] pr-2 text-white hover:bg-green-primary/90",
    label: "font-heading text-sm font-medium",
    badge: 30,
    circle: "fill-white",
    arrow: "fill-green-primary",
  },
  hero: {
    shell:
      "gap-3 bg-green-primary py-2.5 pl-7 pr-2.5 text-white hover:bg-green-primary/90",
    label: "font-body text-base",
    badge: 40,
    circle: "fill-bg-base",
    arrow: "fill-green-primary",
  },
  invert: {
    shell:
      "gap-3 bg-white py-2.5 pl-7 pr-2.5 text-green-primary shadow-[0px_6px_24px_0px_rgba(0,0,0,0.10)] hover:bg-white/95",
    label: "font-body text-base",
    badge: 36,
    circle: "fill-green-primary",
    arrow: "fill-white",
  },
};

/**
 * The prime CTA pill: a rounded button with a trailing circular "↗" badge.
 * Variants from the design:
 *  - "light"  — white pill, dark label, green arrow badge (Explore, About Us…)
 *  - "green"  — green pill, white label, white arrow badge (header Contact)
 *  - "hero"   — green pill, 16px label, large light badge (service detail hero)
 *  - "invert" — white pill, green label, green badge (on a green CTA band)
 */
export function PillButton({
  label,
  href,
  variant = "light",
  className,
}: PillButtonProps) {
  const styles = VARIANTS[variant];

  return (
    <Link
      href={href}
      className={cn(
        "group inline-flex items-center rounded-pill transition-all duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-green-accent focus-visible:ring-offset-2",
        styles.shell,
        className,
      )}
    >
      <span className={styles.label}>{label}</span>
      <ArrowCircle
        size={styles.badge}
        circleClassName={styles.circle}
        arrowClassName={styles.arrow}
        className="transition-transform duration-200 group-hover:rotate-45"
      />
    </Link>
  );
}
