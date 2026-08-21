"use client";

import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import Image, { type StaticImageData } from "next/image";
import useEmblaCarousel from "embla-carousel-react";
import Autoplay from "embla-carousel-autoplay";
import type { EmblaCarouselType } from "embla-carousel";
import {
  motion,
  motionValue,
  useAnimationControls,
  useInView,
  useMotionValueEvent,
  useReducedMotion,
  useSpring,
  useTransform,
  type MotionValue,
} from "framer-motion";
import {
  FADE_UP_DURATION,
  FADE_UP_EASE,
  FADE_UP_STAGGER,
  useFadeUpTravel,
} from "@/components/ui/fade-up-group";
import { cn } from "@/lib/utils";

export type RibbonSlide = {
  src: StaticImageData | string;
  alt: string;
};

/* -------------------------------------------------------------------------- *
 * Ribbon geometry — a real cylinder, seen from inside it
 *
 * The cards are laid around a vertical cylinder whose axis sits *in front of*
 * the screen, so the band curves toward the viewer at both ends and away from
 * them in the middle. Looking down on it from above:
 *
 *        ╲                              ╱      ← ends nearer the eye
 *          ╲__________________________╱        ← middle further away
 *                       ▲
 *                      eye
 *
 * Everything the design shows falls out of that one arrangement rather than
 * being drawn on top of it:
 *
 *  - The ends are nearer, so perspective renders them larger. The band is
 *    therefore *pinched* — its top edge dips and its bottom edge rises toward
 *    the centre — without a clip path or a scale ramp doing it by hand.
 *  - Each card is turned to the cylinder's tangent, so its outer edge comes
 *    forward and its inner edge falls back. Projection turns the rectangle
 *    into a trapezoid, taller on the outside, and the band's silhouette is the
 *    chain of those trapezoids.
 *  - The centre card sits at zero depth and zero rotation: dead flat, facing
 *    the viewer, undistorted.
 *
 * Given a signed distance `x` from centre in slide widths, the cylinder puts a
 * card at angle θ = x·ANGLE_PER_SLIDE and depth R(1 − cos θ). Tangency fixes R
 * at one slide pitch per ANGLE_PER_SLIDE of arc, i.e. R = pitch / θ_step.
 * -------------------------------------------------------------------------- */

/** Turn per slide width. At the clamp that is 40° — a firm, readable curve. */
const ANGLE_PER_SLIDE = 20;
/** Slides past this distance hold their transform — they are under the fade. */
const MAX_OFFSET = 2;
const ANGLE_STEP_RAD = (ANGLE_PER_SLIDE * Math.PI) / 180;

/**
 * Viewing distance, in px — a close eye, which is what gives the band its
 * depth. Together with the angle above it renders the outermost card about a
 * third taller than the centre one and tapers each card ~14% across its own
 * width, which is the amount of turn the design shows.
 *
 * The two constants trade against each other: a longer distance flattens the
 * whole thing toward an orthographic row, a shorter one exaggerates the
 * nearest corner until the band fisheyes.
 */
const PERSPECTIVE = 900;

/** Barely off the centre — the ends are carried by the mask, not by dimming. */
const BRIGHTNESS_FALLOFF = 0.04;

/** Gap between neighbouring cards, in px. Split evenly either side of each. */
const CARD_GAP = 24;

/** Landscape, as in the design: a wide band of wide cards. */
const ASPECT_W = 3;
const ASPECT_H = 2;

/** Offset jump that means Embla teleported a slide to the other end. */
const TELEPORT_THRESHOLD = 1.5;

const DOTS_ROW = "mt-8 flex items-center justify-center gap-2";

/**
 * Where a card is in its entrance: `hidden` before the band is on screen,
 * `play` once it is, `none` when the entrance is skipped altogether.
 */
type Entrance = "hidden" | "play" | "none";

/** Fraction of the band on screen that counts as the section having arrived. */
const ENTRANCE_AMOUNT = 0.3;

/**
 * Seconds a card waits before rising, from where it stands on the band.
 *
 * Position rather than index: the track is a loop, so the node order bears no
 * relation to the left-to-right order on screen — index 0 sits in the middle at
 * rest, with the last few nodes wrapped around to its left. Measuring from the
 * left edge of the arc instead sweeps the reveal across the band in the order
 * the eye reads it, and it stays right at any breakpoint. Cards beyond the arc
 * are off screen under the mask, so their clamped delay is never seen.
 */
const cardDelay = (offset: number) =>
  (clamp(offset, -MAX_OFFSET, MAX_OFFSET) + MAX_OFFSET) * FADE_UP_STAGGER;

const clamp = (n: number, min: number, max: number) =>
  Math.min(Math.max(n, min), max);

const cylinderAngle = (x: number) =>
  clamp(x, -MAX_OFFSET, MAX_OFFSET) * ANGLE_PER_SLIDE;

/**
 * How far toward the viewer the cylinder carries a card, in px. Zero at the
 * centre and growing outward, so the ends are the near ones.
 */
const cylinderDepth = (x: number, pitch: number) => {
  const radius = pitch / ANGLE_STEP_RAD;
  return radius * (1 - Math.cos((cylinderAngle(x) * Math.PI) / 180));
};

/**
 * One slide, positioned on the ribbon.
 *
 * Its own hooks derive every visual property from a single MotionValue that the
 * carousel writes on each Embla scroll event, so dragging updates the whole
 * band continuously — nothing is keyed to snap points, and nothing re-renders.
 */
function RibbonSlide({
  slide,
  offset,
  pitch,
  className,
  sizes,
  smooth,
  entrance,
  travel,
}: {
  slide: RibbonSlide;
  /** Signed distance from the centre of the viewport, in slide widths. */
  offset: MotionValue<number>;
  /** Slide pitch in px — depth is a physical distance, so it needs one. */
  pitch: number;
  className?: string;
  sizes: string;
  smooth: boolean;
  entrance: Entrance;
  /** How far below its place on the band the card starts, in px. */
  travel: number;
}) {
  const spring = useSpring(offset, {
    stiffness: 320,
    damping: 38,
    mass: 0.35,
    restDelta: 0.0005,
  });

  // Looping moves a slide from one end of the track to the other in a single
  // frame. Its offset jumps with it, and a spring would answer by sweeping the
  // slide across the whole ribbon. Jumping the spring keeps the teleport
  // instantaneous — which is invisible, because it happens under the edge fade.
  useMotionValueEvent(offset, "change", (value) => {
    if (Math.abs(value - spring.get()) > TELEPORT_THRESHOLD) spring.jump(value);
  });

  const driver = smooth ? spring : offset;
  const position = useTransform(driver, (v) => clamp(v, -MAX_OFFSET, MAX_OFFSET));

  // The entrance is a one-shot on top of the ribbon's own transforms, so it is
  // driven by controls rather than by a variant: its delay is only known on the
  // frame it fires, from where the card is standing on the band by then.
  const entranceControls = useAnimationControls();

  useEffect(() => {
    if (entrance !== "play") return;
    entranceControls.start({
      opacity: 1,
      y: 0,
      transition: {
        duration: FADE_UP_DURATION,
        ease: FADE_UP_EASE,
        delay: cardDelay(offset.get()),
      },
    });
  }, [entrance, entranceControls, offset]);

  // Turned to the cylinder's tangent. Negative for a card on the right, which
  // brings its right-hand edge forward and lets its left-hand edge fall away —
  // the outer edge of the band is always the near one.
  const rotateY = useTransform(position, (x) => -cylinderAngle(x));
  // Carried toward the viewer. This is what makes the ends render larger and
  // the band pinch in the middle; nothing scales the cards by hand.
  const z = useTransform(position, (x) => cylinderDepth(x, pitch));
  const filter = useTransform(
    position,
    (x) => `brightness(${1 - Math.abs(x) * BRIGHTNESS_FALLOFF})`,
  );

  return (
    <div
      className={cn("min-w-0 shrink-0 grow-0", className)}
      // Half the gap either side, so every neighbouring pair is exactly
      // CARD_GAP apart and no card ever reaches into another's slot.
      style={{
        paddingLeft: CARD_GAP / 2,
        paddingRight: CARD_GAP / 2,
        // Depth has to survive the slot, or the card is flattened before the
        // viewport's perspective ever sees it.
        transformStyle: "preserve-3d",
      }}
    >
      <motion.div
        className="relative w-full origin-center will-change-transform"
        style={{
          aspectRatio: `${ASPECT_W} / ${ASPECT_H}`,
          rotateY,
          z,
          filter,
          backfaceVisibility: "hidden",
        }}
        // The rise rides on the same element as the ribbon geometry: framer
        // composes `y` ahead of `rotateY` in the transform, so the card is
        // simply lower on the band — its turn, depth and size are untouched.
        initial={entrance === "none" ? false : { opacity: 0, y: travel }}
        animate={entranceControls}
      >
        <Image
          src={slide.src}
          alt={slide.alt}
          fill
          sizes={sizes}
          className="object-cover"
        />
      </motion.div>
    </div>
  );
}

export type CurvedRibbonCarouselProps = {
  slides: RibbonSlide[];
  /** Autoplay interval in ms. `0` disables it. */
  autoplayDelay?: number;
  className?: string;
};

/**
 * A carousel whose slides are attached to one continuous curved band.
 *
 * Three things together make the ribbon, and all three are driven by the same
 * per-slide offset so the curve holds at every point of a drag rather than
 * only at rest:
 *
 *  1. **Geometry** — each slide is rotated to the arc's tangent and dropped by
 *     the arc's sagitta at its position (see the note above). Because the drop
 *     is derived from the rotation, neighbouring slides meet edge to edge.
 *  2. **Shape** — each image is clipped by a matching arc top and bottom, so
 *     the band's own edges curve rather than stepping between rectangles.
 *  3. **Fade** — a mask dissolves both ends into the page, so the ribbon reads
 *     as continuing past the viewport instead of being cut off.
 *
 * The viewport's vertical padding is computed from the arc, not guessed: it is
 * exactly the room the outermost slide needs once dropped and rotated, so the
 * band is never clipped and never leaves a dead gap under itself.
 */
export function CurvedRibbonCarousel({
  slides,
  autoplayDelay = 3800,
  className,
}: CurvedRibbonCarouselProps) {
  const prefersReducedMotion = useReducedMotion();
  const travel = useFadeUpTravel();

  // A seamless loop needs the track to be a good deal wider than the viewport,
  // so duplicate the source images until there are enough nodes for one.
  const nodes = useMemo(() => {
    const MIN = 12;
    if (slides.length >= MIN) return slides;
    const copies = Math.ceil(MIN / Math.max(slides.length, 1));
    return Array.from({ length: copies }, () => slides).flat();
  }, [slides]);

  // Created once per node, written imperatively on every scroll event. State
  // here would mean a React render per frame for every slide on screen.
  const offsets = useMemo(() => nodes.map(() => motionValue(0)), [nodes]);

  const autoplay = useMemo(
    () =>
      autoplayDelay > 0
        ? [
            Autoplay({
              delay: autoplayDelay,
              stopOnMouseEnter: true,
              stopOnInteraction: false,
            }),
          ]
        : [],
    [autoplayDelay],
  );

  const [emblaRef, emblaApi] = useEmblaCarousel(
    {
      loop: true,
      align: "center",
      containScroll: false,
      duration: 30,
      dragFree: false,
    },
    prefersReducedMotion ? [] : autoplay,
  );

  // `once`: the cards are left where they land, so scrolling back over the
  // section — or the band looping a card back around — never replays it.
  const rootRef = useRef<HTMLDivElement | null>(null);
  const inView = useInView(rootRef, { once: true, amount: ENTRANCE_AMOUNT });
  const entrance: Entrance = prefersReducedMotion
    ? "none"
    : inView
      ? "play"
      : "hidden";

  const [selected, setSelected] = useState(0);
  // The arc is a physical curve, so it needs a physical measurement: the
  // slide's rendered width is what sets its curvature.
  const [pitch, setPitch] = useState(0);
  const viewportRef = useRef<HTMLDivElement | null>(null);

  const setViewport = useCallback(
    (node: HTMLDivElement | null) => {
      viewportRef.current = node;
      emblaRef(node);
    },
    [emblaRef],
  );

  /**
   * Write each slide's signed distance from the centre, in slide widths.
   *
   * `scrollSnapList()` positions and `scrollProgress()` are both in 0–1 track
   * units, so their difference times the snap count converts to slide widths.
   * The loop correction is Embla's own: a slide that has been shifted to the
   * far end of the track has to be measured from there, or it would read as
   * most of a carousel away and flatten to the edge of the arc.
   */
  const applyRibbon = useCallback(
    (api: EmblaCarouselType) => {
      const engine = api.internalEngine();
      const scrollProgress = api.scrollProgress();
      const snapList = api.scrollSnapList();
      const snapCount = snapList.length;

      snapList.forEach((scrollSnap, snapIndex) => {
        let diffToTarget = scrollSnap - scrollProgress;
        const slidesInSnap = engine.slideRegistry[snapIndex];

        slidesInSnap.forEach((slideIndex) => {
          if (engine.options.loop) {
            engine.slideLooper.loopPoints.forEach((loopItem) => {
              const target = loopItem.target();
              if (slideIndex === loopItem.index && target !== 0) {
                const sign = Math.sign(target);
                if (sign === -1)
                  diffToTarget = scrollSnap - (1 + scrollProgress);
                if (sign === 1)
                  diffToTarget = scrollSnap + (1 - scrollProgress);
              }
            });
          }

          offsets[slideIndex]?.set(diffToTarget * snapCount);
        });
      });
    },
    [offsets],
  );

  const onSelect = useCallback((api: EmblaCarouselType) => {
    setSelected(api.selectedScrollSnap());
  }, []);

  useEffect(() => {
    if (!emblaApi) return;

    applyRibbon(emblaApi);

    // Observing rather than reading once keeps the curve correct through
    // breakpoint changes, font swaps and container resizes — including the ones
    // that never reach Embla as a reInit.
    const slideNode = emblaApi.slideNodes()[0];
    const observer = new ResizeObserver(() =>
      setPitch(slideNode?.offsetWidth ?? 0),
    );
    if (slideNode) observer.observe(slideNode);

    const onReInit = (api: EmblaCarouselType) => applyRibbon(api);

    emblaApi
      .on("reInit", onReInit)
      .on("reInit", onSelect)
      .on("select", onSelect)
      .on("scroll", applyRibbon)
      .on("slideFocus", applyRibbon);

    return () => {
      observer.disconnect();
      emblaApi
        .off("reInit", onReInit)
        .off("reInit", onSelect)
        .off("select", onSelect)
        .off("scroll", applyRibbon)
        .off("slideFocus", applyRibbon);
    };
  }, [emblaApi, applyRibbon, onSelect]);

  // Headroom for the projection. The near corner of the outermost card is the
  // deepest point of the whole band: its own rotation carries that edge a half
  // card-width further forward again, and perspective magnifies whatever sits
  // there. Measure that, and the padding is exactly how far the card grows past
  // its own layout box — no guessing, correct at every width.
  const cardWidth = Math.max(pitch - CARD_GAP, 0);
  const cardHeight = (cardWidth * ASPECT_H) / ASPECT_W;
  const nearestZ =
    cylinderDepth(MAX_OFFSET, pitch) +
    (cardWidth / 2) *
      Math.sin((ANGLE_PER_SLIDE * MAX_OFFSET * Math.PI) / 180);
  const magnification =
    nearestZ > 0 ? PERSPECTIVE / Math.max(PERSPECTIVE - nearestZ, 1) : 1;
  const headroom = (cardHeight * (magnification - 1)) / 2;

  /**
   * Horizontal fade for the ends, and a radial one so the corners go too —
   * without the second the band's tips stay visible as hard little wedges above
   * and below the horizontal fade's reach.
   *
   * They are applied to two nested elements rather than as two layers on one.
   * Stacked mask layers need `mask-composite` to multiply instead of paint over
   * each other, and its standard keywords (`intersect`) and the `-webkit-`
   * ones (`source-in`) are not interchangeable — set both and the element
   * disappears. Nesting multiplies them by construction, in every engine.
   *
   * Only the edges are touched: the centre of both masks is fully opaque, so
   * the active slide is never faded, blurred or dimmed.
   */
  const edgeFade =
    "linear-gradient(to right, transparent 0%, rgba(0,0,0,0.4) 6%, #000 12%, #000 88%, rgba(0,0,0,0.4) 94%, transparent 100%)";
  const cornerFade =
    "radial-gradient(130% 108% at 50% 50%, #000 62%, rgba(0,0,0,0.6) 84%, transparent 100%)";

  const dots = slides.map((_, i) => {
    const isActive = selected % slides.length === i;
    return (
      <button
        key={i}
        type="button"
        aria-label={`Go to slide ${i + 1}`}
        aria-current={isActive}
        onClick={() => emblaApi?.scrollTo(i)}
        className={cn(
          "h-2 rounded-full transition-all duration-300 ease-out",
          isActive
            ? "w-6 bg-green-primary"
            : "w-2 bg-text-secondary/30 hover:bg-text-secondary/50",
        )}
      />
    );
  });

  return (
    <div ref={rootRef} className={cn("group relative", className)}>
      <div style={{ maskImage: cornerFade, WebkitMaskImage: cornerFade }}>
        <div
          ref={setViewport}
          className="overflow-hidden"
          style={{
            maskImage: edgeFade,
            WebkitMaskImage: edgeFade,
            paddingTop: headroom,
            paddingBottom: headroom,
            // One vanishing point for the whole band, at its centre. Per-card
            // perspective would give each card its own, and the cylinder would
            // come apart into a row of separately skewed rectangles.
            perspective: PERSPECTIVE,
            perspectiveOrigin: "50% 50%",
          }}
        >
          <div
            className="flex touch-pan-y"
            style={{ transformStyle: "preserve-3d" }}
          >
            {nodes.map((slide, i) => (
              <RibbonSlide
                key={i}
                slide={slide}
                offset={offsets[i]}
                pitch={pitch}
                smooth={!prefersReducedMotion}
                entrance={entrance}
                travel={travel}
                // No gutter at all — each slide is exactly one track slot wide
                // and overhangs it, so the band reads as continuous rather than
                // as a row of separate cards.
                className="basis-[74%] sm:basis-[42%] lg:basis-[23%]"
                sizes="(max-width: 640px) 74vw, (max-width: 1024px) 42vw, 23vw"
              />
            ))}
          </div>
        </div>
      </div>

      <button
        type="button"
        aria-label="Previous slide"
        onClick={() => emblaApi?.scrollPrev()}
        className="absolute left-3 top-1/2 z-10 hidden -translate-y-1/2 items-center justify-center rounded-full bg-white/90 p-3 text-text-primary opacity-0 shadow-[0_6px_24px_rgba(15,23,18,0.14)] backdrop-blur transition-opacity duration-300 hover:bg-white focus-visible:opacity-100 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-green-accent group-hover:opacity-100 lg:flex"
      >
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" aria-hidden="true">
          <path d="M15 6l-6 6 6 6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      </button>
      <button
        type="button"
        aria-label="Next slide"
        onClick={() => emblaApi?.scrollNext()}
        className="absolute right-3 top-1/2 z-10 hidden -translate-y-1/2 items-center justify-center rounded-full bg-white/90 p-3 text-text-primary opacity-0 shadow-[0_6px_24px_rgba(15,23,18,0.14)] backdrop-blur transition-opacity duration-300 hover:bg-white focus-visible:opacity-100 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-green-accent group-hover:opacity-100 lg:flex"
      >
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" aria-hidden="true">
          <path d="M9 6l6 6-6 6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      </button>

      {/* One dot per source image, tracked across the duplicated loop nodes. */}
      <div className={DOTS_ROW}>{dots}</div>
    </div>
  );
}
