"use client";

import { motion, useReducedMotion, type Variants } from "framer-motion";
import type { ReactNode } from "react";

/** Smooth ease-out cubic-bezier shared by every reveal. */
const EASE_OUT = [0.22, 1, 0.36, 1] as const;

/** Premium duration shared by every reveal. */
const DURATION = 1.2;

const container: Variants = {
  hidden: {},
  show: (delay: number) => ({
    transition: { staggerChildren: 0.18, delayChildren: delay },
  }),
};

const itemVariants: Record<RevealPreset, Variants> = {
  left: {
    hidden: { opacity: 0, x: -80 },
    show: {
      opacity: 1,
      x: 0,
      transition: { duration: DURATION, ease: EASE_OUT },
    },
  },
  image: {
    hidden: { opacity: 0, y: 80, scale: 0.96 },
    show: {
      opacity: 1,
      y: 0,
      scale: 1,
      transition: { duration: DURATION, ease: EASE_OUT },
    },
  },
  right: {
    hidden: { opacity: 0, x: 80 },
    show: {
      opacity: 1,
      x: 0,
      transition: { duration: DURATION, ease: EASE_OUT },
    },
  },
};

type RevealPreset = "left" | "image" | "right";

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
  className?: string;
}

/**
 * Parent stagger container: drives its RevealItem children with a slight
 * stagger, either when the row enters the viewport (default, resetting on exit
 * so the reveal replays on each re-entry) or when `active` flips. `delay` holds
 * the whole group back — enough to let a heading above it finish first.
 * Honors prefers-reduced-motion by rendering a plain wrapper.
 */
export function RevealRow({
  children,
  active,
  delay = 0,
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
      custom={delay}
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
  className?: string;
}

/**
 * A single animated block within a RevealRow. Its enter animation is selected
 * by `preset` and is driven by the parent's stagger context.
 */
export function RevealItem({ preset, children, className }: RevealItemProps) {
  const shouldReduceMotion = useReducedMotion();

  if (shouldReduceMotion) {
    return <div className={className}>{children}</div>;
  }

  return (
    <motion.div className={className} variants={itemVariants[preset]}>
      {children}
    </motion.div>
  );
}
