"use client";

import { motion, useReducedMotion, type Variants } from "framer-motion";
import { createContext, useContext, type ReactNode } from "react";

/** Smooth ease-out cubic-bezier shared by every reveal. */
const EASE_OUT = [0.22, 1, 0.36, 1] as const;

/** Premium duration shared by every reveal. */
const DURATION = 1.2;

/** Default gap between consecutive children. `0` plays the row as one beat. */
const STAGGER = 0.18;

const container: Variants = {
  hidden: {},
  show: ({ delay, stagger }: ContainerCustom) => ({
    transition: { staggerChildren: stagger, delayChildren: delay },
  }),
};

type ContainerCustom = { delay: number; stagger: number };

/** Travel for the `up` preset. Small enough to stay inside a section's padding. */
const RISE = 32;

/**
 * Every `show` takes its duration from the element's `custom`, so a caller can
 * pace one reveal differently without a second set of variants. Callers always
 * pass an explicit number: an unset `custom` falls through to the *parent's*,
 * which here is the container's `{delay, stagger}` object.
 */
const itemVariants: Record<RevealPreset, Variants> = {
  left: {
    hidden: { opacity: 0, x: -80 },
    show: (duration: number = DURATION) => ({
      opacity: 1,
      x: 0,
      transition: { duration, ease: EASE_OUT },
    }),
  },
  // Pure fade + rise, no direction and no scale. Paired with `stagger={0}` it
  // lets a whole group resolve as a single movement rather than a sequence.
  up: {
    hidden: { opacity: 0, y: RISE },
    show: (duration: number = DURATION) => ({
      opacity: 1,
      y: 0,
      transition: { duration, ease: EASE_OUT },
    }),
  },
  image: {
    hidden: { opacity: 0, y: 80, scale: 0.96 },
    show: (duration: number = DURATION) => ({
      opacity: 1,
      y: 0,
      scale: 1,
      transition: { duration, ease: EASE_OUT },
    }),
  },
  right: {
    hidden: { opacity: 0, x: 80 },
    show: (duration: number = DURATION) => ({
      opacity: 1,
      x: 0,
      transition: { duration, ease: EASE_OUT },
    }),
  },
};

type RevealPreset = "left" | "image" | "right" | "up";

/**
 * Orchestration-only variants for a block that cascades its own children rather
 * than travelling as one piece: the block itself has nothing to animate, and
 * the movement lives on the RevealChild elements inside it.
 */
const group: Variants = {
  hidden: {},
  show: (stagger: number) => ({ transition: { staggerChildren: stagger } }),
};

/** The preset a RevealChild inherits from the RevealItem it sits in. */
const ChildPresetContext = createContext<RevealPreset>("up");

interface RevealRowProps {
  children: ReactNode;
  /**
   * Drive the reveal from a caller-owned flag instead of the viewport. Use it
   * when "in view" is the wrong cue — a row that is on screen but covered, or
   * one that has to wait its turn behind another animation.
   */
  active?: boolean;
  /** Seconds to hold before the first child moves. */
  delay?: number;
  /**
   * Seconds between consecutive children. `0` starts every child on the same
   * frame, so the group reads as one element arriving rather than a sequence.
   */
  stagger?: number;
  className?: string;
}

/**
 * Parent stagger container: drives its RevealItem children, either when the row
 * enters the viewport (default, resetting on exit so the reveal replays on each
 * re-entry) or when `active` flips. `delay` holds the whole group back — enough
 * to let a heading above it finish first — and `stagger` sets the gap between
 * children, or collapses it to zero for a single simultaneous beat.
 *
 * Children need not be direct descendants: framer propagates variants through
 * React context, so intermediate layout wrappers are free. That is what lets a
 * heading and the items of a flex row below it animate as one group.
 *
 * Honors prefers-reduced-motion by rendering a plain wrapper.
 */
export function RevealRow({
  children,
  active,
  delay = 0,
  stagger = STAGGER,
  className,
}: RevealRowProps) {
  const shouldReduceMotion = useReducedMotion();

  if (shouldReduceMotion) {
    return <div className={className}>{children}</div>;
  }

  const driven =
    active === undefined
      ? { whileInView: "show", viewport: { once: false, amount: 0.35 } }
      : { animate: active ? "show" : "hidden" };

  return (
    <motion.div
      className={className}
      variants={container}
      custom={{ delay, stagger }}
      initial="hidden"
      {...driven}
    >
      {children}
    </motion.div>
  );
}

interface RevealItemProps {
  preset: RevealPreset;
  children: ReactNode;
  /**
   * Seconds between this block's own RevealChild elements. Omit — the common
   * case — and the block travels as one piece instead.
   */
  stagger?: number;
  /** Seconds the travel takes. Defaults to the shared premium duration. */
  duration?: number;
  className?: string;
}

/**
 * A single animated block within a RevealRow. Its enter animation is selected
 * by `preset` and is driven by the parent's stagger context.
 *
 * With `stagger` set, the block stops moving as a unit: it becomes a container
 * for its own RevealChild elements, which each play `preset` one after another.
 * A column of copy then arrives heading-first rather than as a slab, without
 * the caller having to repeat the preset on every child.
 */
export function RevealItem({
  preset,
  children,
  stagger,
  duration = DURATION,
  className,
}: RevealItemProps) {
  const shouldReduceMotion = useReducedMotion();

  if (shouldReduceMotion) {
    return <div className={className}>{children}</div>;
  }

  if (stagger !== undefined) {
    return (
      <motion.div className={className} variants={group} custom={stagger}>
        <ChildPresetContext.Provider value={preset}>
          {children}
        </ChildPresetContext.Provider>
      </motion.div>
    );
  }

  return (
    <motion.div
      className={className}
      variants={itemVariants[preset]}
      custom={duration}
    >
      {children}
    </motion.div>
  );
}

/**
 * One beat inside a staggered RevealItem. It takes its animation from the
 * enclosing block, so a column's children cannot drift out of sync with it.
 */
export function RevealChild({
  children,
  className,
}: {
  children: ReactNode;
  className?: string;
}) {
  const shouldReduceMotion = useReducedMotion();
  const preset = useContext(ChildPresetContext);

  if (shouldReduceMotion) {
    return <div className={className}>{children}</div>;
  }

  return (
    <motion.div
      className={className}
      variants={itemVariants[preset]}
      // Explicit, so it never inherits the enclosing block's `custom` — which
      // in staggered mode is the stagger, not a duration.
      custom={DURATION}
    >
      {children}
    </motion.div>
  );
}
