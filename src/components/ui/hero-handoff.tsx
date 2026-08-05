"use client";

import {
  createContext,
  useContext,
  useEffect,
  useRef,
  useState,
  type ReactNode,
} from "react";
import { useMotionValueEvent, useReducedMotion, useScroll } from "framer-motion";
import { cn } from "@/lib/utils";

/**
 * Whether the wrapped section has taken the screen from the hero. Defaults to
 * `true` so a section used outside a handoff simply plays its reveals on mount.
 */
const HandoffContext = createContext(true);

/** Read inside the wrapped section to start its reveals on the handoff. */
export const useHeroHandoff = () => useContext(HandoffContext);

/**
 * Swaps the hero for the section that follows it, on the frame the hero's
 * dissolve finishes.
 *
 * The section is pulled back over the hero's last viewport of runway so that
 * its top edge is flush with the top of the viewport at the exact scroll
 * position where the banner unpins. There is no reveal, no travel and no extra
 * runway to scroll: the screen is solid white, and then that same white *is*
 * this section, already filling the viewport, with its own reveals starting
 * from the handoff frame onward.
 *
 * Two things make the swap invisible:
 *
 *  - The section is withheld (`invisible`) until it lands. Document flow drags
 *    it up through the viewport over the preceding 100vh, and none of that
 *    travel may ever be seen. It is a cut between two off-screen states.
 *  - The hero fades to the same colour this section is painted in, and finishes
 *    just *before* the landing frame — so what is on screen the instant the
 *    swap happens is one flat field of colour either way.
 *
 * The default overlap of 100vh is one viewport, which is exactly the distance
 * between a sticky hero unpinning and the next section's natural top edge.
 * `ScrollImageSequence`'s `fadeOutEnd` must land at or just before 1 for the
 * colours to line up.
 */
export function HeroHandoff({
  children,
  className,
  /** How far the section is pulled up over the hero's runway. */
  overlapVh = 100,
}: {
  children: ReactNode;
  className?: string;
  overlapVh?: number;
}) {
  const ref = useRef<HTMLDivElement | null>(null);
  const prefersReducedMotion = useReducedMotion();

  // 0 when the section's top edge is at the bottom of the viewport, 1 when it
  // reaches the top — the frame the hero releases and this takes over.
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "start start"],
  });

  const [hasLanded, setHasLanded] = useState(false);
  const landedRef = useRef(false);

  const setLanded = (next: boolean) => {
    if (next === landedRef.current) return;
    landedRef.current = next;
    setHasLanded(next);
  };

  // `useMotionValueEvent` only fires on *change*, so a page restored mid-scroll
  // (back button, deep link) would otherwise stay hidden until the user moved.
  useEffect(() => {
    setLanded(scrollYProgress.get() >= 0.999);
  }, [scrollYProgress]);

  useMotionValueEvent(scrollYProgress, "change", (value) => {
    setLanded(value >= 0.999);
  });

  // Reduced motion: no overlap, no withholding, no gating — the section sits in
  // normal flow and its contents render statically. Returning early is safe
  // because the hooks above always run.
  if (prefersReducedMotion) {
    return (
      <div ref={ref} className={className}>
        {children}
      </div>
    );
  }

  return (
    <HandoffContext.Provider value={hasLanded}>
      <div
        ref={ref}
        className={cn(
          // z-10 clears the hero's sticky layer — `position: sticky` is a
          // stacking context at z-auto, so this paints over the banner rather
          // than sliding underneath it.
          "relative z-10",
          hasLanded ? "visible" : "invisible",
          className,
        )}
        style={{ marginTop: `-${overlapVh}vh` }}
      >
        {children}
      </div>
    </HandoffContext.Provider>
  );
}
