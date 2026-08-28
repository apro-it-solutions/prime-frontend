"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { useMotionValueEvent, useReducedMotion, useScroll } from "framer-motion";
import { useHeroHandoff } from "@/components/ui/hero-handoff";
import { MainNav } from "./main-nav";
import { MobileMenuButton, MobileMenuPanel } from "./mobile-menu";
import { PillButton } from "@/components/ui/pill-button";
import { cn } from "@/lib/utils";
import primeLogo from "../../../public/images/prime-sticky.svg";

/**
 * Scroll distance that counts as a deliberate change of direction. Below this
 * the bar ignores the movement entirely — sub-pixel drift, a trackpad settling,
 * and iOS rubber-banding at the ends of the document all produce tiny
 * alternating deltas, and reacting to them is what makes a hide-on-scroll bar
 * flicker.
 */
const DIRECTION_THRESHOLD = 8;

/**
 * How far the reader has to keep scrolling down, from the point the bar last
 * appeared, before it gets out of the way. Without it the same gesture that
 * brings the bar in would take it straight back out.
 */
const HIDE_TRAVEL = 160;

/**
 * How far down a page's hero the bar waits before it appears, as a fraction of
 * the viewport. Every page opens on a full-bleed hero carrying its own overlay
 * header; the bar is the nav for what comes after, so it stays away until that
 * header has scrolled well out of the way.
 */
const HERO_CLEARANCE = 0.6;

/**
 * The brand lockup as the sticky bar uses it (Figma node 829:789): the tagline
 * beside the mark rather than stacked beneath it.
 *
 * `prime-sticky.svg` is that horizontal lockup — the oval with the tagline set
 * beside it in dark type — so the tagline is part of the asset here rather than
 * separate markup, and the dark type reads on the bar's white field. The stacked
 * lockup on the dark hero and footer is the other asset, `prime-main-logo.svg`.
 */
function LogoMark() {
  return (
    <Link
      href="/"
      aria-label="prime NMS — The Steel Building Specialist, home"
      className="flex items-center"
    >
      <Image
        src={primeLogo}
        alt="prime NMS — The Steel Building Specialist"
        priority
        className="h-[44px] w-auto shrink-0"
      />
    </Link>
  );
}

/**
 * The nav for everything below the banner: the Figma sticky bar (node 829:787)
 * — a floating white pill, fixed to the top, that hides on scroll down and
 * returns on scroll up.
 *
 * Every page mounts one, by way of `SiteHeader`. Two gates decide when it is on
 * screen, and both must be open:
 *
 *  - Past the hero. A plain scroll offset, which is all an ordinary page needs:
 *    its overlay header sits at the top of a hero image and scrolls away with
 *    it, so one clearance below that is where the nav has to come back.
 *  - Past the banner, on the home page only. There the banner does not end
 *    where its section ends: the hero runs a 300vh runway and the section after
 *    it is pulled back over the last 100vh, so the frame the banner stops
 *    owning the screen is a viewport before its bottom edge. `useHeroHandoff`
 *    computes exactly that moment and flips back on the way up — which is also
 *    precisely when this bar should stand down and hand the nav back to the
 *    hero's own overlay header. Outside that handoff the context reads `true`
 *    and the scroll offset alone carries the decision.
 *
 * On the home page it renders inside the handoff wrapper to read that context,
 * but is `fixed`, so it is out of flow and cannot shift the section it sits in.
 * `visible` deliberately overrides the wrapper's `invisible`: that gate exists
 * to withhold the *section* until it lands, whereas this bar manages its own
 * entrance.
 */
export function StickyHeader() {
  const pastBanner = useHeroHandoff();
  const prefersReducedMotion = useReducedMotion();
  const [open, setOpen] = useState(false);
  const [shown, setShown] = useState(false);
  const { scrollY } = useScroll();

  /** Last position the bar reacted to. */
  const previous = useRef(0);
  /** Where the bar last changed state, so a hide can measure travel from it. */
  const anchor = useRef(0);
  const shownRef = useRef(false);
  const eligibleRef = useRef(false);
  const openRef = useRef(false);

  // The gates are React state; the scroll handler runs outside React, so it
  // reads these rather than a stale closure.
  const pastBannerRef = useRef(pastBanner);

  useEffect(() => {
    openRef.current = open;
  }, [open]);

  const setShownState = (next: boolean) => {
    if (next === shownRef.current) return;
    shownRef.current = next;
    setShown(next);
  };

  /**
   * The whole state machine, from a scroll position. Both gates have to be open
   * — the hero is behind us, and on the home page the banner has handed over —
   * and then:
   *
   *  - Arriving past that line shows the bar. You only ever get there scrolling
   *    down, so waiting for an upward flick would mean it never appears at all.
   *  - Scrolling on down hides it again, but only after `HIDE_TRAVEL` of it, so
   *    the arrival is not undone by the same gesture that caused it.
   *  - Any decisive scroll up brings it straight back.
   *  - Dropping back behind the line puts it away, and hands the nav back to the
   *    page's own overlay header.
   */
  const evaluate = (position: number) => {
    const delta = position - previous.current;
    previous.current = position;

    const eligible =
      pastBannerRef.current &&
      position > window.innerHeight * HERO_CLEARANCE;
    const arrived = eligible && !eligibleRef.current;
    eligibleRef.current = eligible;

    if (!eligible) {
      anchor.current = position;
      setOpen(false);
      setShownState(false);
      return;
    }

    // An open menu must not slide off under the user's finger.
    if (arrived || openRef.current || delta < -DIRECTION_THRESHOLD) {
      anchor.current = position;
      setShownState(true);
      return;
    }

    if (
      shownRef.current &&
      delta > 0 &&
      position - anchor.current > HIDE_TRAVEL
    ) {
      anchor.current = position;
      setShownState(false);
    }
  };

  // Seed from wherever the page is actually sitting. A restored scroll position
  // (back button, deep link, refresh mid-page) would otherwise read as one huge
  // downward jump on the first event, and the bar would sit off screen until the
  // reader happened to scroll up.
  useEffect(() => {
    pastBannerRef.current = pastBanner;
    previous.current = scrollY.get();
    anchor.current = scrollY.get();
    evaluate(scrollY.get());
    // `evaluate` is recreated every render and reads everything it needs from
    // refs; re-running this on the banner gate is the point.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [scrollY, pastBanner]);

  useMotionValueEvent(scrollY, "change", evaluate);

  return (
    <header
      className={cn(
        // Past 100% because the bar floats: 100% would leave its drop shadow
        // hanging under the top edge of the screen.
        "visible fixed inset-x-0 top-0 z-50 will-change-transform",
        !prefersReducedMotion &&
          "transition-transform duration-300 ease-out",
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
