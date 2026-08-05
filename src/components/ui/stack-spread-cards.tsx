"use client";

import { motion, useReducedMotion, type Variants } from "framer-motion";
import { useCallback, useEffect, useRef, useState } from "react";
import { TeamCard, type TeamMember } from "./team-card";

/** Premium ease-out cubic-bezier for the spread. */
const EASE_OUT = [0.22, 1, 0.36, 1] as const;

interface Offset {
  x: number;
  y: number;
}

const container: Variants = {
  hidden: {},
  show: {
    // Deal the cards one at a time from the centre.
    transition: { delayChildren: 0.1, staggerChildren: 0.25 },
  },
};

const cardVariants: Variants = {
  // Spawned in the exact centre of the container: overlapped, shrunk, hidden.
  hidden: (o: Offset) => ({
    opacity: 0,
    scale: 0.8,
    x: o.x,
    y: o.y,
  }),
  // Fade + scale in at the centre, hold briefly, then glide to the final slot.
  show: (o: Offset) => ({
    opacity: [0, 1, 1],
    scale: [0.8, 1, 1],
    x: [o.x, o.x, 0],
    y: [o.y, o.y, 0],
    transition: { duration: 1, ease: EASE_OUT, times: [0, 0.2, 1] },
  }),
};

/** Absolute page offset of an element, immune to CSS transforms. */
function absOffset(el: HTMLElement): Offset {
  let x = 0;
  let y = 0;
  let node: HTMLElement | null = el;
  while (node) {
    x += node.offsetLeft;
    y += node.offsetTop;
    node = node.offsetParent as HTMLElement | null;
  }
  return { x, y };
}

interface StackSpreadCardsProps {
  members: TeamMember[];
  /** Classes for the grid/flex wrapper — the fixed final layout. */
  gridClassName?: string;
  /** Classes controlling each card's footprint within the layout. */
  cardClassName?: string;
}

/**
 * Sequential "deck of cards": when the section enters the viewport each card
 * spawns in the exact centre of the container, fades + scales in, holds
 * briefly, then glides to its real layout slot — one card at a time. Offsets
 * are measured from the true layout (via offset* metrics, so they ignore the
 * animation transform), keeping the effect correct across breakpoints.
 * Replays on every re-entry and honors prefers-reduced-motion.
 */
export function StackSpreadCards({
  members,
  gridClassName,
  cardClassName,
}: StackSpreadCardsProps) {
  const shouldReduceMotion = useReducedMotion();
  const containerRef = useRef<HTMLDivElement>(null);
  const cardRefs = useRef<(HTMLDivElement | null)[]>([]);
  const [offsets, setOffsets] = useState<Offset[]>(() =>
    members.map(() => ({ x: 0, y: 0 })),
  );

  const measure = useCallback(() => {
    const box = containerRef.current;
    if (!box) return;
    const boxPos = absOffset(box);
    const boxCx = boxPos.x + box.offsetWidth / 2;
    const boxCy = boxPos.y + box.offsetHeight / 2;
    setOffsets(
      cardRefs.current.map((el) => {
        if (!el) return { x: 0, y: 0 };
        const pos = absOffset(el);
        const cardCx = pos.x + el.offsetWidth / 2;
        const cardCy = pos.y + el.offsetHeight / 2;
        return { x: boxCx - cardCx, y: boxCy - cardCy };
      }),
    );
  }, []);

  useEffect(() => {
    if (shouldReduceMotion) return;
    measure();
    window.addEventListener("resize", measure);
    return () => window.removeEventListener("resize", measure);
  }, [measure, shouldReduceMotion]);

  if (shouldReduceMotion) {
    return (
      <div className={gridClassName}>
        {members.map((member, i) => (
          <TeamCard key={i} member={member} className={cardClassName} />
        ))}
      </div>
    );
  }

  return (
    <motion.div
      ref={containerRef}
      className={gridClassName}
      variants={container}
      initial="hidden"
      whileInView="show"
      viewport={{ once: false, amount: 0.3 }}
    >
      {members.map((member, i) => (
        <motion.div
          key={i}
          ref={(el) => {
            cardRefs.current[i] = el;
          }}
          className={cardClassName}
          custom={offsets[i]}
          variants={cardVariants}
          style={{ willChange: "transform, opacity" }}
        >
          <TeamCard member={member} className="w-full" />
        </motion.div>
      ))}
    </motion.div>
  );
}
