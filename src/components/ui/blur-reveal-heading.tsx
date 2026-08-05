"use client";

import { Fragment } from "react";
import { motion, useReducedMotion, type Variants } from "framer-motion";

/** Smooth ease-out cubic-bezier shared by every reveal. */
const EASE_OUT = [0.22, 1, 0.36, 1] as const;

/** Premium duration shared by every reveal. */
const DURATION = 1.2;

/** Cinematic gap between consecutive words. */
const STAGGER = 0.07;

/** The word's hidden state. */
const HIDDEN = { blur: 16, y: 50, scale: 0.98 } as const;

/** How long the whole heading takes: last word's delay plus its duration. */
export const blurRevealDuration = (words: number) =>
  Math.max(0, words - 1) * STAGGER + DURATION;

const wordVariants: Variants = {
  hidden: {
    opacity: 0,
    filter: `blur(${HIDDEN.blur}px)`,
    y: HIDDEN.y,
    scale: HIDDEN.scale,
  },
  show: (index: number) => ({
    opacity: 1,
    filter: "blur(0px)",
    y: 0,
    scale: 1,
    transition: {
      duration: DURATION,
      ease: EASE_OUT,
      delay: index * STAGGER,
    },
  }),
};

const MOTION_TAGS = {
  h1: motion.h1,
  h2: motion.h2,
  h3: motion.h3,
  p: motion.p,
} as const;

interface BlurRevealHeadingProps {
  /** Heading copy. A newline forces a line break; words are split on spaces. */
  text: string;
  /** Rendered element. Defaults to `h2`. */
  as?: keyof typeof MOTION_TAGS;
  /**
   * Drive the reveal from a caller-owned flag instead of the viewport. Use it
   * when "in view" is the wrong cue — a heading that is on screen but covered,
   * or one that has to wait its turn behind another animation.
   */
  active?: boolean;
  className?: string;
}

/**
 * Blur-to-sharp staggered heading reveal. Each word resolves from
 * `blur(16px) translateY(50px) scale(0.98)` to a crisp resting state.
 *
 * Words play 1.2s apiece, 70ms apart, triggered either by the heading coming
 * into view (default, and replayed on every re-entry) or by the caller's
 * `active` flag.
 *
 * The words are `aria-hidden` and the full string is exposed via `aria-label`
 * so screen readers announce the heading as one phrase rather than word by
 * word. Honors prefers-reduced-motion by rendering static text.
 */
export function BlurRevealHeading({
  text,
  as = "h2",
  active,
  className,
}: BlurRevealHeadingProps) {
  const shouldReduceMotion = useReducedMotion();
  const Tag = MOTION_TAGS[as];

  const lines = text.split("\n").map((line) => line.trim().split(/\s+/));

  if (shouldReduceMotion) {
    const Static = as;
    return (
      <Static className={className}>
        {lines.map((words, lineIndex) => (
          <span key={lineIndex} className="block">
            {words.join(" ")}
          </span>
        ))}
      </Static>
    );
  }

  // Word offset each line starts at, so the stagger flows continuously across
  // line breaks instead of restarting on every line.
  const lineOffsets = lines.map((_, i) =>
    lines.slice(0, i).reduce((total, words) => total + words.length, 0),
  );

  const driven =
    active === undefined
      ? { whileInView: "show", viewport: { once: false, amount: 0.3 } }
      : { animate: active ? "show" : "hidden" };

  return (
    <Tag
      className={className}
      aria-label={text.replace(/\s+/g, " ").trim()}
      initial="hidden"
      {...driven}
    >
      {lines.map((words, lineIndex) => (
        <span key={lineIndex} className="block" aria-hidden>
          {words.map((word, i) => (
            <Fragment key={`${lineIndex}-${i}`}>
              <motion.span
                className="inline-block will-change-[filter,transform,opacity]"
                variants={wordVariants}
                custom={lineOffsets[lineIndex] + i}
              >
                {word}
              </motion.span>
              {i < words.length - 1 ? " " : null}
            </Fragment>
          ))}
        </span>
      ))}
    </Tag>
  );
}
