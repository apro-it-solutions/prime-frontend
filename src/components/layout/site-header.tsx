"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Menu, X } from "lucide-react";
import { Logo } from "./logo";
import { MainNav } from "./main-nav";
import { PillButton } from "@/components/ui/pill-button";
import { MAIN_NAV } from "@/lib/navigation";
import { cn } from "@/lib/utils";

/**
 * Transparent header overlaying the hero. Logo left, floating pill nav centered,
 * Contact CTA right (1651px group in Figma). Collapses to a mobile menu below lg.
 */
export function SiteHeader() {
  const [open, setOpen] = useState(false);
  const pathname = usePathname();

  return (
    <header className="absolute inset-x-0 top-0 z-30">
      <div className="mx-auto flex w-full max-w-[1652px] items-start justify-between gap-4 px-6 pt-[38px] lg:px-8">
        <Logo className="shrink-0" />

        <MainNav className="hidden lg:flex" />

        <div className="hidden lg:block">
          <PillButton label="Contact" href="/contact" variant="green" />
        </div>

        {/* Mobile trigger */}
        <button
          type="button"
          aria-label={open ? "Close menu" : "Open menu"}
          aria-expanded={open}
          onClick={() => setOpen((v) => !v)}
          className="inline-flex size-11 items-center justify-center rounded-full bg-white text-text-primary shadow-lg lg:hidden"
        >
          {open ? <X className="size-5" /> : <Menu className="size-5" />}
        </button>
      </div>

      {/* Mobile menu panel */}
      {open && (
        <div className="mx-6 mt-3 rounded-2xl bg-white p-4 shadow-xl lg:hidden">
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
                  onClick={() => setOpen(false)}
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
      )}
    </header>
  );
}
