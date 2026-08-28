"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Menu, X } from "lucide-react";
import { PillButton } from "@/components/ui/pill-button";
import { MAIN_NAV } from "@/lib/navigation";
import { cn } from "@/lib/utils";

/**
 * The hamburger that stands in for the nav below `lg`. Shared by the hero
 * overlay header and the sticky bar, which collapse at the same breakpoint for
 * the same reason — and shared from here rather than from either header so the
 * two can import each other's parts without a cycle.
 */
export function MobileMenuButton({
  open,
  onToggle,
  className,
}: {
  open: boolean;
  onToggle: () => void;
  className?: string;
}) {
  return (
    <button
      type="button"
      aria-label={open ? "Close menu" : "Open menu"}
      aria-expanded={open}
      onClick={onToggle}
      className={cn(
        "inline-flex size-11 items-center justify-center rounded-full bg-white text-text-primary shadow-lg lg:hidden",
        className,
      )}
    >
      {open ? <X className="size-5" /> : <Menu className="size-5" />}
    </button>
  );
}

/**
 * The routes and CTA, as a panel under the bar. Shared by the hero overlay and
 * the sticky bar so there is only ever one mobile menu to maintain.
 */
export function MobileMenuPanel({
  onNavigate,
  className,
}: {
  onNavigate: () => void;
  className?: string;
}) {
  const pathname = usePathname();

  return (
    <div
      className={cn(
        "rounded-2xl bg-white p-4 shadow-xl lg:hidden",
        className,
      )}
    >
      <nav aria-label="Mobile" className="flex flex-col gap-1">
        {MAIN_NAV.map((item) => {
          const isActive =
            item.href === "/"
              ? pathname === "/"
              : pathname.startsWith(item.href);
          return (
            <Link
              key={item.href}
              href={item.href}
              onClick={onNavigate}
              aria-current={isActive ? "page" : undefined}
              className={cn(
                "rounded-xl px-4 py-3 text-sm font-medium transition-colors",
                isActive
                  ? "bg-green-soft text-green-primary"
                  : "text-text-primary hover:bg-bg-sunken",
              )}
            >
              {item.label}
            </Link>
          );
        })}
      </nav>
      <div className="mt-3">
        <PillButton label="Contact" href="/contact" variant="green" />
      </div>
    </div>
  );
}
