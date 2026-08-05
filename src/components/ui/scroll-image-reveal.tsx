"use client";

import Image, { type StaticImageData } from "next/image";
import { useRef, type CSSProperties, type ReactNode } from "react";
import {
  motion,
  useMotionTemplate,
  useReducedMotion,
  useScroll,
  useTransform,
} from "framer-motion";
import { cn } from "@/lib/utils";

const clamp01 = (value: number) => Math.min(1, Math.max(0, value));

/**
 * One full-bleed image plus whatever rides on top of it.
 *
 * Overlay content is a child of the pane, not a sibling, so it is masked along
 * with its image. The copy on the incoming pane needs no reveal of its own — it
 * is uncovered already composed against its own photograph, exactly as laid
 * out, and never moves relative to it.
 */
export type RevealPane = {
  image: StaticImageData | string;
  alt: string;
  /** Rendered above the image, inside the pane. */
  children?: ReactNode;
};

export type ScrollImageRevealProps = {
  /** The pane on screen at rest. */
  base: RevealPane;
  /** The pane underneath it, uncovered from the bottom up. */
  reveal: RevealPane;
  /**
   * Total scroll runway. The pane is pinned for `scrollHeight` minus one
   * viewport, so 200vh buys exactly one screen of scroll to play the reveal in.
   */
  scrollHeight?: string;
  /**
   * Scroll progress (0–1 across the runway) at which the mask starts to open,
   * and where it finishes. The lead-in lets the first image be looked at before
   * anything happens; the tail holds the second one fully uncovered before the
   * section releases.
   */
  revealStart?: number;
  revealEnd?: number;
  className?: string;
};

function Pane({ pane }: { pane: RevealPane }) {
  return (
    <>
      <Image
        src={pane.image}
        alt={pane.alt}
        fill
        sizes="100vw"
        className="object-cover"
      />
      {pane.children}
    </>
  );
}

/**
 * Scroll-driven curtain reveal: a second image emerges from underneath the
 * first, tied frame-for-frame to the scrollbar.
 *
 * How it works:
 *  - The section is a tall block of scroll runway. Inside it, a `sticky`,
 *    viewport-sized layer holds both panes stacked in the same box.
 *  - The incoming pane is laid out full-size from the start and *never moves*.
 *    It is masked by `clip-path: inset(N% 0 0 0)`, which hides everything above
 *    N% of its own height. At 100% nothing of it shows; as scroll drives N to
 *    0 the mask's top edge travels upward and hands over pixel by pixel.
 *  - The pane behind it does not move either. Neither image translates: the
 *    only thing that changes is where the boundary between them sits.
 *
 * That is what separates this from a slide. Any given point of the second image
 * is at the same screen position before and after it becomes visible — it is
 * uncovered in place, like a curtain being lifted off it, rather than carried
 * up into view.
 *
 * Nothing here touches opacity either: at any scroll position each pixel
 * belongs to exactly one image, never a blend of the two. There is no cut — the
 * boundary is a pure function of scroll, so it scrubs, reverses and holds
 * wherever the user stops.
 *
 * Cost per frame is one clip region on one already-rasterized layer — no
 * layout, no repaint of the image itself — which is why it stays at 60fps on a
 * phone. Under `prefers-reduced-motion` the mask is dropped and
 * `motion-reduce:` collapses the whole thing back to two plainly stacked
 * full-height bands: the same content, no runway, no movement.
 */
export function ScrollImageReveal({
  base,
  reveal,
  scrollHeight = "200vh",
  revealStart = 0.3,
  revealEnd = 0.9,
  className,
}: ScrollImageRevealProps) {
  const sectionRef = useRef<HTMLElement | null>(null);
  const prefersReducedMotion = useReducedMotion();

  // "start start" → the section's top reaches the viewport top, the frame the
  // layer pins; "end end" → its bottom reaches the viewport bottom, the frame
  // it unpins. Progress is 0..1 across exactly the pinned window, and clamped
  // outside it, so the reveal holds rather than overshooting.
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start start", "end end"],
  });

  // How much of the incoming pane is uncovered, 0 → 1 across the reveal window.
  const revealed = useTransform(scrollYProgress, (value) =>
    clamp01((value - revealStart) / (revealEnd - revealStart)),
  );
  // The mask's top edge, as a share of the pane's own height: 100% (nothing
  // visible) down to 0% (all of it). Composed as a template rather than an
  // interpolated keyframe string so the value framer writes is always a plain
  // `inset()` it never has to parse and re-mix.
  const maskTop = useTransform(revealed, (t) => (1 - t) * 100);
  const clipPath = useMotionTemplate`inset(${maskTop}% 0% 0% 0%)`;

  return (
    <section
      ref={sectionRef}
      // The runway goes through a custom property rather than an inline height
      // so `motion-reduce:` can collapse it in pure CSS. Doing that in JS would
      // render a different height on the server than on the client.
      className={cn(
        "relative w-full h-[var(--reveal-runway)] motion-reduce:h-auto",
        className,
      )}
      style={{ "--reveal-runway": scrollHeight } as CSSProperties}
    >
      <div className="sticky top-0 h-svh w-full overflow-hidden motion-reduce:static motion-reduce:h-auto motion-reduce:overflow-visible">
        <div className="absolute inset-0 motion-reduce:relative motion-reduce:h-svh">
          <Pane pane={base} />
        </div>

        <motion.div
          className="absolute inset-0 will-change-[clip-path] motion-reduce:relative motion-reduce:h-svh"
          style={prefersReducedMotion ? undefined : { clipPath }}
        >
          <Pane pane={reveal} />
        </motion.div>
      </div>
    </section>
  );
}
