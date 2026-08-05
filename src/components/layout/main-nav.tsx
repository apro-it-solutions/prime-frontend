"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { MAIN_NAV } from "@/lib/navigation";
import { cn } from "@/lib/utils";

/**
 * Floating white pill navigation. Active route uses the soft-green pill
 * (green/accent-light @ 25%), matching the Figma "Home" state.
 */
export function MainNav({ className }: { className?: string }) {
  const pathname = usePathname();

  return (
    <nav
      aria-label="Primary"
      className={cn(
        "flex items-center gap-2 rounded-pill border border-white/20 bg-white p-2 shadow-[0px_6px_24px_0px_rgba(15,23,18,0.06)]",
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
              "rounded-pill py-2.5 text-[15px] font-normal leading-[1.5] transition-colors duration-200",
              isActive
                ? "bg-[rgba(88,182,122,0.25)] px-5 text-green-primary"
                : "px-[18px] text-[#013714] hover:bg-green-soft",
            )}
          >
            {item.label}
          </Link>
        );
      })}
    </nav>
  );
}
