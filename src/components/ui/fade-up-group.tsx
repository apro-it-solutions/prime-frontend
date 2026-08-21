"use client";

import { motion, useReducedMotion, type Variants } from "framer-motion";
import { useEffect, useState, type ReactNode } from "react";

/** Decelerating ease-out — fast off the mark, settling with no overshoot. */
export const FADE_UP_EASE = [0.16, 1, 0.3, 1] as const;

/** Seconds one element takes to fade and rise. */
export const FADE_UP_DURATION = 0.8;

/** Seconds between consecutive beats. */
export const FADE_UP_STAGGER = 0.12;

const EASE_OUT = FADE_UP_EASE;
const DURATION = FADE_UP_DURATION;
const STAGGER = FADE_UP_STAGGER;

/** How far below its resting place an element starts, in px. */
const TRAVEL = 40;

/** Shorter on phones: the full distance reads as a lurch on a small screen. */
const TRAVEL_MOBILE = 26;

const MOBILE = "(max-width: 767px)";

const groupVariants: Variants = {
  hidden: {},
  show: (stagger: number) => ({ transition: { staggerChildren: stagger } }),
};

/**
 * Every item carries its own `{travel, delay}`: framer does not hand a parent's
 * `custom` down at first render, so a child reading the group's would resolve
 * its hidden state against `undefined` on the server.
 *
 * `delay` holds back any FadeUpItem nested inside this one. Those are
 * grandchildren of the group, so the group's own stagger never reaches them and
 * they would otherwise start on the same frame as the block containing them.
 */
type ItemCustom = { travel: number; delay?: number };

const itemVariants: Variants = {
  hidden: ({ travel }: ItemCustom) => ({ opacity: 0, y: travel }),
  show: ({ delay }: ItemCustom) => ({
    opacity: 1,
    y: 0,
    transition: { duration: DURATION, ease: EASE_OUT, delayChildren: delay },
  }),
};

/**
 * How far a fade-up starts below its resting place, in px. Desktop on the
 * server; corrected on mount when the screen is small.
 *
 * Exported so anything animating outside a FadeUpGroup — a slider's own cards,
 * say — rises exactly as far as the copy above it.
 */
export function useFadeUpTravel() {
  const [travel, setTravel] = useState(TRAVEL);

  useEffect(() => {
    const query = window.matchMedia(MOBILE);
    const apply = () => setTravel(query.matches ? TRAVEL_MOBILE : TRAVEL);
    apply();
    query.addEventListener("change", apply);
    return () => query.removeEventListener("change", apply);
  }, []);

  return travel;
}

interface FadeUpGroupProps {
  children: ReactNode;
  /** Seconds between consecutive FadeUpItems. */
  stagger?: number;
  /** Fraction of the group that must be on screen before it plays. */
  amount?: number;
  className?: string;
}

/**
 * Plays its FadeUpItem children up into place, one after another, the first
 * time the group enters the viewport.
 *
 * The reveal fires **once**: elements are left where they land rather than
 * being reset on exit, so scrolling back never replays it. Items need not be
 * direct descendants — framer propagates variants through React context, so
 * layout wrappers between the group and an item are free, and an item rendered
 * from inside another component still joins the sequence.
 *
 * Honors prefers-reduced-motion by rendering a plain wrapper.
 */
export function FadeUpGroup({
  children,
  stagger = STAGGER,
  amount = 0.2,
  className,
}: FadeUpGroupProps) {
  const shouldReduceMotion = useReducedMotion();

  if (shouldReduceMotion) {
    return <div className={className}>{children}</div>;
  }

  return (
    <motion.div
      className={className}
      variants={groupVariants}
      custom={stagger}
      initial="hidden"
      whileInView="show"
      viewport={{ once: true, amount }}
    >
      {children}
    </motion.div>
  );
}

interface FadeUpItemProps {
  children: ReactNode;
  /**
   * Seconds to hold FadeUpItems nested inside this one after it starts. Set it
   * on a block that renders a further beat of its own; omit it — the common
   * case — and the block is a single beat.
   */
  childDelay?: number;
  className?: string;
}

/** One beat of a FadeUpGroup: fade in while rising into its resting place. */
export function FadeUpItem({
  children,
  childDelay,
  className,
}: FadeUpItemProps) {
  const shouldReduceMotion = useReducedMotion();
  const travel = useFadeUpTravel();

  if (shouldReduceMotion) {
    return <div className={className}>{children}</div>;
  }

  return (
    <motion.div
      className={className}
      variants={itemVariants}
      custom={{ travel, delay: childDelay }}
    >
      {children}
    </motion.div>
  );
}
