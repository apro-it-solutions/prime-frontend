import Link from "next/link";
import { cn } from "@/lib/utils";
import { ArrowCircle } from "./arrow-circle";

type PillVariant = "light" | "green";

interface PillButtonProps {
  label: string;
  href: string;
  variant?: PillVariant;
  className?: string;
}

/**
 * The prime CTA pill: a rounded button with a trailing circular "↗" badge.
 * Two variants from the design:
 *  - "light" — white pill, dark label, green arrow badge (Explore, About Us…)
 *  - "green" — green pill, white label, white arrow badge (Contact)
 */
export function PillButton({
  label,
  href,
  variant = "light",
  className,
}: PillButtonProps) {
  const isGreen = variant === "green";

  return (
    <Link
      href={href}
      className={cn(
        "group inline-flex items-center rounded-pill transition-all duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-green-accent focus-visible:ring-offset-2",
        isGreen
          ? "gap-2.5 bg-green-primary py-2 pl-[22px] pr-2 text-white hover:bg-green-primary/90"
          : "gap-4 bg-white py-2 pl-8 pr-2 text-text-primary shadow-[0px_6px_24px_0px_rgba(15,23,18,0.06)] hover:shadow-[0px_10px_28px_0px_rgba(15,23,18,0.12)]",
      )}
    >
      <span
        className={cn(
          isGreen
            ? "font-heading text-sm font-medium"
            : "font-body text-base",
        )}
      >
        {label}
      </span>
      <ArrowCircle
        size={isGreen ? 30 : 40}
        circleClassName={isGreen ? "fill-white" : "fill-green-primary"}
        arrowClassName={isGreen ? "fill-green-primary" : "fill-bg-base"}
        className="transition-transform duration-200 group-hover:rotate-45"
      />
    </Link>
  );
}
