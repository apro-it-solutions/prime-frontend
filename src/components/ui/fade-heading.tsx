"use client";

import { motion, useReducedMotion, type Variants } from "framer-motion";
import {
  FADE_UP_DURATION,
  FADE_UP_EASE,
  useFadeUpTravel,
} from "@/components/ui/fade-up-group";

const MOTION_TAGS = {
  h1: motion.h1,
  h2: motion.h2,
  h3: motion.h3,
  p: motion.p,
} as const;

const headingVariants: Variants = {
  hidden: (travel: number) => ({ opacity: 0, y: travel }),
  show: {
    opacity: 1,
    y: 0,
    transition: { duration: FADE_UP_DURATION, ease: FADE_UP_EASE },
  },
};

interface FadeHeadingProps {
  /** Heading copy. A newline forces a line break. */
  text: string;
  /** Rendered element. Defaults to `h2`. */
  as?: keyof typeof MOTION_TAGS;
  className?: string;
}

/**
 * Plain fade-and-rise heading reveal — the counterpart to BlurRevealHeading for
 * places that want the arrival without the per-word blur resolve.
 *
 * The whole heading travels as one piece: no blur, no scale, no word stagger,
 * so the copy is legible from the first frame. Distance, duration and easing
 * come from the shared fade-up language, keeping it in step with the
 * FadeUpGroup sections elsewhere on the site.
 *
 * The heading tag *is* the animated element rather than sitting inside a
 * wrapper, so margins and grid placement on the caller's className behave
 * exactly as they would on a static heading. Newlines in `text` are preserved
 * via `whitespace-pre-line`. Plays once on entering the viewport, and honors
 * prefers-reduced-motion by rendering static text.
 */
export function FadeHeading({
  text,
  as = "h2",
  className,
}: FadeHeadingProps) {
  const shouldReduceMotion = useReducedMotion();
  const travel = useFadeUpTravel();
  const Tag = MOTION_TAGS[as];

  if (shouldReduceMotion) {
    const Static = as;
    return <Static className={className}>{text}</Static>;
  }

  return (
    <Tag
      className={className}
      variants={headingVariants}
      custom={travel}
      initial="hidden"
      whileInView="show"
      viewport={{ once: true, amount: 0.3 }}
    >
      {text}
    </Tag>
  );
}
