"use client";

import { usePathname } from "next/navigation";
import { StickyHeader } from "./sticky-header";

/**
 * Mounts the sticky bar for every page, from the root layout — outside `<main>`,
 * outside the hero it appears over, and outside the per-section reveal wrappers,
 * so nothing in a page's tree can become its containing block or clip it.
 *
 * The home page is the exception: its banner runs a scroll runway and hands the
 * screen to the section beneath it, and the bar has to arrive on that exact
 * frame, so the page mounts its own copy inside `HeroHandoff` instead.
 */
export function StickyHeaderSlot() {
  const pathname = usePathname();

  if (pathname === "/") return null;

  return <StickyHeader />;
}
