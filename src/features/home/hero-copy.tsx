"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { motion, useMotionValueEvent, useReducedMotion } from "framer-motion";
import { BlurRevealHeading } from "@/components/ui/blur-reveal-heading";
import { useSequenceFrame } from "@/components/ui/scroll-image-sequence";

/**
 * Copy states keyed to the banner footage. `from`/`to` is the frame range the
 * group owns; the dead frames between ranges are where one group fades out and
 * the next fades in.
 */
export interface HeroCopyState {
  heading: string;
  body: string;
  from: number;
  to: number;
  /** Where the group sits in the banner while it is the visible one. */
  placement: "bottom" | "bottom-right";
}

/**
 * Each group is absolutely positioned against the padded copy layer, so its
 * anchor is fixed for as long as it is on screen — a group cannot drift while
 * visible, and where one group sits has no bearing on any other.
 *
 * Both sit on the banner's bottom edge, so the copy never changes height as the
 * groups swap. `bottom-right` only pins to the right edge from `lg` up; below
 * that there is no room for a side column, so it spans the content width and
 * reads as an ordinary bottom group.
 */
const PLACEMENT: Record<HeroCopyState["placement"], string> = {
  bottom: "inset-x-0 bottom-0 max-w-[864px]",
  "bottom-right":
    "inset-x-0 bottom-0 lg:left-auto lg:right-0 lg:max-w-[620px]",
};

/**
 * `to: Infinity` holds the last group through the final frame, whatever the
 * sequence length happens to be after a re-export.
 */
export const HERO_COPY: HeroCopyState[] = [
  {
    from: 0,
    to: 110,
    placement: "bottom",
    heading: "From Ground to Greatness.",
    body: "Every PrimeNMS structure begins with a clear vision, precise planning, and a foundation built for what comes next.",
  },
  {
    from: 130,
    to: 310,
    placement: "bottom-right",
    heading: "Strength Takes Shape in Galvanized Steel.",
    body: "Precision-engineered galvanized steel forms the backbone of a structure built for durability, performance, and long-term protection.",
  },
  {
    from: 338,
    to: Infinity,
    placement: "bottom",
    heading: "Galvanized Steel. Built to Last.",
    body: "A complete galvanized steel building engineered for lasting strength, corrosion resistance, and dependable performance.",
  },
];

/** Which group owns this frame, or -1 in the gaps between ranges. */
const groupForFrame = (frame: number) =>
  HERO_COPY.findIndex((state) => frame >= state.from && frame <= state.to);

/**
 * How long to hold the screen clear between groups. Comfortably longer than the
 * exit animation, so the outgoing copy is fully gone before the next one starts
 * — the handover must not depend on how fast the user is scrolling.
 */
const HANDOVER_MS = 450;

/** Shared with the section-2 reveal so the body matches its heading. */
const EASE_OUT = [0.22, 1, 0.36, 1] as const;
const DURATION = 1.2;

const BODY_CLASS =
  "mt-4 max-w-[620px] text-base leading-[1.6] text-white/85 sm:text-lg";

const bodyVariants = {
  hidden: { opacity: 0, filter: "blur(16px)", y: 50, scale: 0.98 },
  show: {
    opacity: 1,
    filter: "blur(0px)",
    y: 0,
    scale: 1,
    transition: { duration: DURATION, ease: EASE_OUT },
  },
};

/**
 * The banner's heading and description, swapped against the image sequence
 * using the same blur-to-sharp reveal as the Experience section's heading.
 *
 * Two separate concerns, deliberately kept apart:
 *
 *  - *Which* group is on screen is a discrete decision keyed to the frame
 *    ranges, held in React state.
 *  - *Whether the previous group has finished leaving* is sequenced in time:
 *    `shown` drops to -1 first, and only after `HANDOVER_MS` does the next
 *    group come up. Scroll speed cannot cause two groups to overlap, because
 *    the incoming group is not activated until the outgoing one is gone. A
 *    scroll-linked crossfade could not promise that — flicking through the
 *    20-frame gap takes less time than any fade worth watching.
 *
 * All three groups stay mounted in one grid cell, pinned with `self-end`, so
 * the block is always as tall as its tallest group and they share one bottom
 * edge. Swapping copy therefore cannot move the text: a heading that wraps to
 * more lines grows upward into space the layout already reserves.
 */
export function HeroCopy({ className }: { className?: string }) {
  const frame = useSequenceFrame();
  const prefersReducedMotion = useReducedMotion();

  /** The group actually allowed on screen. -1 while the screen is clearing. */
  const [shown, setShown] = useState(0);
  /** Group the playhead is over, tracked outside render — it changes far more often. */
  const targetRef = useRef(0);
  const timerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  // Hide first, then show. Driven from the scroll event rather than an effect
  // watching state, so there is no cascading render and — more importantly —
  // the incoming group is only scheduled once the outgoing one has been told to
  // leave, no matter how fast the playhead crossed the gap.
  const requestGroup = useCallback((next: number) => {
    if (next === targetRef.current) return;
    targetRef.current = next;
    if (timerRef.current) clearTimeout(timerRef.current);
    setShown(-1);
    if (next === -1) return;
    timerRef.current = setTimeout(() => setShown(next), HANDOVER_MS);
  }, []);

  // `change` only fires on movement, so a page restored mid-scroll (back
  // button, deep link) would otherwise sit on the first group until the user
  // scrolls. Also clears any pending handover on unmount.
  useEffect(() => {
    requestGroup(groupForFrame(frame.get()));
    return () => {
      if (timerRef.current) clearTimeout(timerRef.current);
    };
  }, [frame, requestGroup]);

  useMotionValueEvent(frame, "change", (value) => {
    requestGroup(groupForFrame(value));
  });

  // Under reduced motion the runway collapses to a single screen and the poster
  // (frame 0) is all that is ever shown, so only the first group can match the
  // image behind it. Rendering just that one also keeps the static fallback
  // from stacking all three on top of each other.
  const states = prefersReducedMotion ? HERO_COPY.slice(0, 1) : HERO_COPY;
  const active = prefersReducedMotion ? 0 : shown;

  return (
    <div className={className}>
      {states.map((state, index) => {
        const isActive = index === active;
        return (
          <div
            key={state.heading}
            className={`absolute ${PLACEMENT[state.placement]}`}
            // Keep the groups that are off screen out of the accessibility
            // tree and unselectable, so only the visible copy is reachable.
            aria-hidden={isActive ? undefined : true}
            style={isActive ? undefined : { pointerEvents: "none" }}
          >
            {/* Only the first group carries the page's h1; the others are
                captions on the footage and must not compete for it. */}
            <BlurRevealHeading
              as={index === 0 ? "h1" : "h2"}
              text={state.heading}
              active={isActive}
              className="font-display text-[2.25rem] font-semibold leading-[1.15] tracking-[-0.72px] text-white sm:text-[42px] lg:text-[50px]"
            />
            {prefersReducedMotion ? (
              <p className={BODY_CLASS}>{state.body}</p>
            ) : (
              <motion.p
                className={`${BODY_CLASS} will-change-[filter,transform,opacity]`}
                variants={bodyVariants}
                initial="hidden"
                animate={isActive ? "show" : "hidden"}
              >
                {state.body}
              </motion.p>
            )}
          </div>
        );
      })}
    </div>
  );
}
