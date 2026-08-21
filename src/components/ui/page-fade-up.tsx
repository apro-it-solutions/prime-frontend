"use client";

import { motion, useReducedMotion, type Variants } from "framer-motion";
import { usePathname } from "next/navigation";
import { Children, Fragment, isValidElement, type ReactNode } from "react";
import {
  FADE_UP_DURATION,
  FADE_UP_EASE,
  useFadeUpTravel,
} from "@/components/ui/fade-up-group";
import { SELF_REVEAL_ATTR } from "@/lib/reveal";

/** The one route this never touches, whatever it is wrapped around. */
const HOME = "/";

/**
 * Fraction of a section that has to be on screen before it plays. Low, because
 * a section taller than the viewport can never reach a high ratio — it would
 * sit hidden under the fold waiting for a threshold it cannot meet.
 */
const AMOUNT = 0.15;

/** Each block carries its own travel: framer does not hand a parent's down. */
const blockVariants: Variants = {
  hidden: (travel: number) => ({ opacity: 0, y: travel }),
  show: {
    opacity: 1,
    y: 0,
    transition: { duration: FADE_UP_DURATION, ease: FADE_UP_EASE },
  },
};

/**
 * A section marked with SELF_REVEAL_ATTR animates its own parts individually —
 * a hero whose heading, copy and button arrive in turn — so it is handed
 * through untouched. Without the mark it would travel as a slab *and* its parts
 * would travel inside that, doubling every move.
 *
 * The mark is an attribute rather than a wrapper component because what reaches
 * this client component is the section's root element, not the server component
 * that returned it: its props are the only thing left to read.
 */
const revealsItself = (child: ReactNode) =>
  isValidElement<Record<string, unknown>>(child) &&
  child.props[SELF_REVEAL_ATTR] !== undefined;

interface PageFadeUpProps {
  children: ReactNode;
  className?: string;
}

/**
 * The `<main>` of an inner page, whose sections fade up as they are scrolled
 * into view — each on its own trigger, each exactly once.
 *
 * Nothing is played on load beyond what is already on screen: a section below
 * the fold holds its hidden state until the reader reaches it, and once it has
 * arrived it stays put. Scrolling back over a section never replays it.
 *
 * It renders the `<main>` itself rather than a wrapper inside one, so a page
 * gains the behaviour without gaining a layer of markup — the only elements
 * added are the per-section beats, plain static divs in normal flow. Nothing
 * outside the page content moves: the footer is the page's sibling, not a
 * child of this element.
 *
 * Sections carrying SELF_REVEAL_ATTR are passed through untouched, and sections
 * that run their own reveals on scroll keep them — this animates the block, and
 * whatever is inside it is free to animate again on its own cue.
 *
 * The home page is excluded by route, so the component is inert if it is ever
 * placed there. Honors prefers-reduced-motion by rendering a plain `<main>`.
 */
export function PageFadeUp({ children, className }: PageFadeUpProps) {
  const pathname = usePathname();
  const shouldReduceMotion = useReducedMotion();
  const travel = useFadeUpTravel();

  if (pathname === HOME || shouldReduceMotion) {
    return <main className={className}>{children}</main>;
  }

  return (
    <main className={className}>
      {/* toArray drops the holes a conditional section leaves behind, so an
          absent block never costs an empty wrapper. */}
      {Children.toArray(children).map((child, i) =>
        revealsItself(child) ? (
          <Fragment key={i}>{child}</Fragment>
        ) : (
          <motion.div
            key={i}
            variants={blockVariants}
            custom={travel}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, amount: AMOUNT }}
          >
            {child}
          </motion.div>
        ),
      )}
    </main>
  );
}
