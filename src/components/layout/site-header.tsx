"use client";

import { useState } from "react";
import { Logo } from "./logo";
import { MainNav } from "./main-nav";
import { MobileMenuButton, MobileMenuPanel } from "./mobile-menu";
import { PillButton } from "@/components/ui/pill-button";

/**
 * Transparent header overlaying the hero. Logo left, floating pill nav centered,
 * Contact CTA right (1651px group in Figma). Collapses to a mobile menu below lg.
 *
 * It is absolutely positioned inside whatever hero it is dropped into and
 * scrolls away with it; `StickyHeader` carries the nav for the rest of the page,
 * mounted from the root layout so it is never nested inside a hero.
 */
export function SiteHeader() {
  const [open, setOpen] = useState(false);

  return (
    <header className="absolute inset-x-0 top-0 z-30">
      <div className="mx-auto flex w-full max-w-[1652px] items-start justify-between gap-4 px-6 pt-[38px] lg:px-8">
        <Logo className="shrink-0" />

        <MainNav className="hidden lg:flex" />

        <div className="hidden lg:block">
          <PillButton label="Contact" href="/contact" variant="green" />
        </div>

        <MobileMenuButton open={open} onToggle={() => setOpen((v) => !v)} />
      </div>

      {open && (
        <MobileMenuPanel
          onNavigate={() => setOpen(false)}
          className="mx-6 mt-3"
        />
      )}
    </header>
  );
}
