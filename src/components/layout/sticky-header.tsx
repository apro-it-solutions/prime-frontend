"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { useMotionValueEvent, useReducedMotion, useScroll } from "framer-motion";
import { useHeroHandoff } from "@/components/ui/hero-handoff";
import { MainNav } from "./main-nav";
import { MobileMenuButton, MobileMenuPanel } from "./site-header";
import { PillButton } from "@/components/ui/pill-button";
import { cn } from "@/lib/utils";
import primeLogo from "../../../public/images/prime-logo.svg";

/**
 * Scroll distance that counts as a deliberate change of direction. Below this
 * the bar ignores the movement entirely — sub-pixel drift, a trackpad settling,
 * and iOS rubber-banding at the ends of the document all produce tiny
 * alternating deltas, and reacting to them is what makes a hide-on-scroll bar
 * flicker.
 */
const DIRECTION_THRESHOLD = 8;

/**
 * The brand lockup as the sticky bar uses it (Figma node 829:789): the mark
 * alone, with the tagline set beside it as text rather than stacked beneath.
 *
 * `prime-logo.svg` is the full lockup — a 210.8×82.6 mark above a 23px tagline
 * pill in a 211×115 canvas. Rendering it at a width that puts the mark at 56px
 * tall and clipping to that height leaves exactly the mark, so the sticky bar
 * and the hero header stay on one asset.
 */
function LogoMark() {
  return (
    <Link
      href="/"
      aria-label="prime — The Galvanized Building Specialist, home"
      className="flex items-center gap-[9px]"
    >
      <span className="block h-[56px] w-[143px] shrink-0 overflow-hidden">
        <Image
          src={primeLogo}
          alt=""
          priority
          className="h-auto w-[143px] max-w-none"
        />
      </span>
      <span className="max-w-[125px] font-body text-[12px] font-semibold leading-[1.2] text-green-primary">
        The Galvanized Building Specialist
      </span>
    </Link>
  );
}

/**
 * The nav for everything below the banner: the Figma sticky bar (node 829:787)
 * — a floating white pill, fixed to the top, that hides on scroll down and
 * returns on scroll up.
 *
 * Why it reads `useHeroHandoff` rather than a scroll offset of its own: the
 * banner does not end where its section ends. The hero runs a 300vh runway and
 * the section after it is pulled back over the last 100vh, so the frame the
 * banner stops owning the screen is a viewport before its bottom edge. The
 * handoff already computes exactly that moment, and flips back on the way up —
 * which is also precisely when this bar should stand down and hand the nav back
 * to the hero's own overlay header.
 *
 * It renders inside the handoff wrapper to read that context, but is `fixed`,
 * so it is out of flow and cannot shift the section it sits in. `visible`
 * deliberately overrides the wrapper's `invisible`: that gate exists to withhold
 * the *section* until it lands, whereas this bar manages its own entrance.
 */
export function StickyHeader() {
  const pastBanner = useHeroHandoff();
  const prefersReducedMotion = useReducedMotion();
  const [open, setOpen] = useState(false);
  const [hidden, setHidden] = useState(false);
  const [wasPastBanner, setWasPastBanner] = useState(pastBanner);
  const { scrollY } = useScroll();

  /** Last position decisive enough to have set a direction. */
  const previous = useRef(0);

  // Seed from wherever the page is actually sitting. A restored scroll position
  // (back button, deep link, refresh mid-page) would otherwise read as one huge
  // downward jump on the first event and hide the bar for no reason.
  useEffect(() => {
    previous.current = scrollY.get();
  }, [scrollY]);

  useMotionValueEvent(scrollY, "change", (value) => {
    const delta = value - previous.current;
    if (Math.abs(delta) < DIRECTION_THRESHOLD) return;
    previous.current = value;
    // An open menu must not slide off under the user's finger.
    setHidden(open ? false : delta > 0);
  });

  // Scrolling back up into the banner hands the nav to the hero's own header.
  // Reset, so the next pass down arrives shown rather than remembering it was
  // mid-hide on the way out.
  //
  // Adjusted during render rather than in an effect: the handoff is React state,
  // not an external system, and an effect would paint the stale value first and
  // then re-render — the cascade `react-hooks/set-state-in-effect` warns about.
  // React discards this render and retries with the new state before committing.
  if (wasPastBanner !== pastBanner) {
    setWasPastBanner(pastBanner);
    if (!pastBanner) {
      setHidden(false);
      setOpen(false);
    }
  }

  // Under reduced motion the hero collapses to a single screen and there is no
  // handoff provider, so this would sit permanently on top of the page's own
  // header. The overlay header alone is the right answer there.
  if (prefersReducedMotion) return null;

  const shown = pastBanner && !hidden;

  return (
    <header
      className={cn(
        // Past 100% because the bar floats: 100% would leave its drop shadow
        // hanging under the top edge of the screen.
        "visible fixed inset-x-0 top-0 z-50 transition-transform duration-300 ease-out will-change-transform",
        shown ? "translate-y-0" : "-translate-y-[140%]",
      )}
      // Off-screen it must leave the accessibility tree and the tab order —
      // otherwise the page carries a second, invisible copy of the whole nav.
      aria-hidden={!shown}
      inert={!shown}
    >
      <div className="mx-auto w-full max-w-[1652px] px-6 pt-4 lg:px-8">
        <div className="flex h-[70px] items-center justify-between gap-4 rounded-[20px] border border-white/10 bg-white pl-6 pr-3.5 shadow-[0px_10px_30px_-6px_rgba(0,0,0,0.35)] backdrop-blur-[12px]">
          <LogoMark />

          <MainNav compact className="hidden lg:flex" />

          <div className="hidden lg:block">
            <PillButton label="Contact" href="/contact" variant="green" />
          </div>

          {/* The overlay header's trigger floats over a photograph and needs
              its own lift; in here it sits on the bar's white field, which
              already carries the header's one shadow. */}
          <MobileMenuButton
            open={open}
            onToggle={() => setOpen((v) => !v)}
            className="shadow-none"
          />
        </div>

        {open && <MobileMenuPanel onNavigate={() => setOpen(false)} className="mt-3" />}
      </div>
    </header>
  );
}
