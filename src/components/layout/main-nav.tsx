"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { MAIN_NAV } from "@/lib/navigation";
import { cn } from "@/lib/utils";

/**
 * Sizing for the two places this nav appears. `compact` is the sticky bar's
 * instance in Figma (node 829:792), which is the hero nav at 78% — every value
 * below is that scale applied to the default, which is why they are fractional.
 */
const SIZES = {
  default: {
    shell: "gap-2 border p-2 shadow-[0px_6px_24px_0px_rgba(15,23,18,0.06)]",
    link: "py-2.5 text-[15px]",
    active: "px-5",
    idle: "px-[18px]",
  },
  compact: {
    // No shadow of its own: this instance sits inside the sticky bar's white
    // field, which carries the single shadow for the whole header. Stacking a
    // second one here reads as a seam around the nav rather than depth.
    shell: "gap-[6.237px] border-[0.78px] p-[6.237px]",
    link: "py-[7.797px] text-[11.695px]",
    active: "px-[15.593px]",
    idle: "px-[14.034px]",
  },
} as const;

/**
 * Floating white pill navigation. Active route uses the soft-green pill
 * (green/accent-light @ 25%), matching the Figma "Home" state.
 *
 * `compact` renders the smaller instance the sticky header uses, where the bar
 * has to sit in 70px of height rather than hang off the top of a hero.
 */
export function MainNav({
  className,
  compact = false,
}: {
  className?: string;
  compact?: boolean;
}) {
  const pathname = usePathname();
  const size = compact ? SIZES.compact : SIZES.default;

  return (
    <nav
      aria-label="Primary"
      className={cn(
        "flex items-center rounded-pill border-white/20 bg-white",
        size.shell,
        className,
      )}
    >
      {MAIN_NAV.map((item) => {
        const isActive =
          item.href === "/" ? pathname === "/" : pathname.startsWith(item.href);

        return (
          <Link
            key={item.href}
            href={item.href}
            aria-current={isActive ? "page" : undefined}
            className={cn(
              "rounded-pill font-normal leading-[1.5] transition-colors duration-200",
              size.link,
              isActive
                ? cn("bg-[rgba(88,182,122,0.25)] text-green-primary", size.active)
                : cn("text-[#013714] hover:bg-green-soft", size.idle),
            )}
          >
            {item.label}
          </Link>
        );
      })}
    </nav>
  );
}
