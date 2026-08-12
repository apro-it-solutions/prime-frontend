"use client";

import Image from "next/image";
import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useRef,
  useState,
  type CSSProperties,
  type ReactNode,
} from "react";
import {
  motion,
  useMotionValueEvent,
  useReducedMotion,
  useScroll,
  useSpring,
  useTransform,
  type MotionValue,
} from "framer-motion";
import { cn } from "@/lib/utils";

/**
 * Apple-style scroll-driven image sequence.
 *
 * Architecture notes (why a <canvas> and not N <Image> elements):
 *  - A sequence is hundreds of frames. Mounting one DOM node per frame and
 *    toggling opacity costs hundreds of layers, hundreds of optimizer requests
 *    and a guaranteed flash on the first paint of each frame.
 *  - A single canvas + preloaded HTMLImageElements is one DOM node, one paint
 *    per rAF tick, and zero flicker: `drawImage` is synchronous once decoded.
 *  - `next/image` is still used for frame 0. It renders on the server, so the
 *    hero has a real, optimized, `priority` LCP element that is visible before
 *    any JavaScript runs. The canvas sits on top and covers it once the
 *    sequence is ready, so the handover is invisible.
 *
 * Memory: frames are retained as *encoded* bitmaps (~90 KB each). The browser
 * decodes lazily on `drawImage` and manages its own decoded-image cache, so
 * holding 400 elements costs ~38 MB, not 400 full-size RGBA buffers.
 */

export type ScrollImageSequenceProps = {
  /** Total number of frames in the sequence. */
  frameCount: number;
  /** Alt text for the poster frame (the canvas itself is decorative). */
  alt: string;
  /** Directory the frames live in, relative to `/public`. */
  basePath?: string;
  /** Filename prefix, e.g. `hero_` for `hero_00000.webp`. */
  filePrefix?: string;
  /** Filename extension without the dot. */
  fileExtension?: string;
  /** Zero-padding width of the frame number. `5` → `00042`. */
  padding?: number;
  /** Index of the first file on disk (`hero_00000` → 0). */
  startIndex?: number;
  /** Escape hatch: build the URL yourself. Overrides the options above. */
  getFrameSrc?: (frame: number) => string;
  /**
   * Scroll runway for the section. Longer = slower, more granular playback.
   * Keep between 200vh and 300vh so every frame gets a few pixels of scroll.
   */
  scrollHeight?: string;
  /**
   * Frames loaded before playback starts. The rest stream in behind the
   * playhead, so the hero becomes interactive without waiting for all 22 MB.
   */
  eagerFrames?: number;
  /** Parallel requests used while streaming the remaining frames. */
  concurrency?: number;
  /**
   * Adds a spring between scroll position and frame index. Smooths trackpad
   * jitter at the cost of a few frames of lag. Off = 1:1 with the scrollbar.
   */
  smooth?: boolean;
  /**
   * Scroll progress (0–1) at which the sequence starts blurring and dissolving
   * into `fadeToColor`.
   */
  fadeOutStart?: number;
  /**
   * Scroll progress at which the dissolve is fully opaque. The frame index is
   * mapped to finish here too, so the sequence lands on its last frame exactly
   * as the screen goes solid, rather than scrubbing footage nobody can see.
   *
   * Keep it just short of 1: the section that follows takes the screen at
   * exactly 1 (see `HeroHandoff`), and the last few percent of runway is what
   * guarantees the swap happens on a screen that is already one flat colour
   * rather than one still a few percent short of it.
   */
  fadeOutEnd?: number;
  /**
   * Peak blur, in px, applied to the media as it whitens. The last frame goes
   * soft before it goes white, so the sequence reads as dissolving into light
   * rather than being covered by a sheet of paint.
   */
  blurTo?: number;
  /**
   * Colour the sequence dissolves into. Must match the background of whatever
   * follows the hero, or the handoff shows a seam. Defaults to the page
   * surface token (#fafbf8), not pure white.
   */
  fadeToColor?: string;
  /** Classes for the outer (tall) section. */
  className?: string;
  /** Classes for the sticky viewport-sized layer. */
  stickyClassName?: string;
  /** Overlay content rendered inside the sticky layer, above the canvas. */
  children?: ReactNode;
};

/** Cap the backbuffer at 2x — beyond that the GPU cost outweighs the sharpness. */
const MAX_DPR = 2;

/** How far ahead of / behind the playhead we may substitute a not-yet-loaded frame. */
const FRAME_FALLBACK_RADIUS = 12;

const clamp = (value: number, min: number, max: number) =>
  Math.min(max, Math.max(min, value));

const clamp01 = (value: number) => clamp(value, 0, 1);

/**
 * The sequence's live playhead, as a fractional frame index. Provided to
 * `children` so overlay content can be keyed to the footage — copy that changes
 * with the shot, markers that track a moment — without duplicating the scroll
 * maths or re-rendering on every frame.
 */
const FrameContext = createContext<MotionValue<number> | null>(null);

/**
 * Read the playhead from inside a `ScrollImageSequence`'s children. Drive
 * styles from it with `useTransform`; reading it in render would not update.
 * Throws outside a sequence, where there is no frame to track.
 */
export function useSequenceFrame(): MotionValue<number> {
  const frame = useContext(FrameContext);
  if (!frame) {
    throw new Error("useSequenceFrame must be used inside a ScrollImageSequence");
  }
  return frame;
}

export function ScrollImageSequence({
  frameCount,
  alt,
  basePath = "/banner-sequence",
  filePrefix = "hero_",
  fileExtension = "webp",
  padding = 5,
  startIndex = 0,
  getFrameSrc,
  scrollHeight = "300vh",
  eagerFrames = 24,
  concurrency = 6,
  smooth = false,
  fadeOutStart = 0.82,
  fadeOutEnd = 0.96,
  blurTo = 12,
  fadeToColor = "var(--bg-base)",
  className,
  stickyClassName,
  children,
}: ScrollImageSequenceProps) {
  const sectionRef = useRef<HTMLElement | null>(null);
  const stickyRef = useRef<HTMLDivElement | null>(null);
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const ctxRef = useRef<CanvasRenderingContext2D | null>(null);

  /** Loaded frames, indexed 0..frameCount-1. Holes are frames still in flight. */
  const framesRef = useRef<Array<HTMLImageElement | undefined>>([]);
  /** Frame the scroll position currently wants. Written on every scroll event. */
  const targetFrameRef = useRef(0);
  /** Frame actually painted. -1 forces the next tick to repaint. */
  const paintedFrameRef = useRef(-1);
  /** Pending rAF handle, so N scroll events still produce at most 1 paint. */
  const rafRef = useRef<number | null>(null);
  /** Canvas size in CSS pixels (the backbuffer is this times DPR). */
  const sizeRef = useRef({ width: 0, height: 0 });

  const [isReady, setIsReady] = useState(false);
  const prefersReducedMotion = useReducedMotion();

  const frameSrc = useCallback(
    (frame: number) =>
      getFrameSrc
        ? getFrameSrc(frame)
        : `${basePath}/${filePrefix}${String(frame + startIndex).padStart(
            padding,
            "0",
          )}.${fileExtension}`,
    [getFrameSrc, basePath, filePrefix, startIndex, padding, fileExtension],
  );

  const posterSrc = useMemo(() => frameSrc(0), [frameSrc]);

  /* ------------------------------------------------------------------ *
   * Scroll → frame index
   * ------------------------------------------------------------------ */

  // "start start" → the section's top reaches the viewport top (playback begins
  // the moment the banner is pinned); "end end" → its bottom reaches the
  // viewport bottom, which is exactly when the sticky layer unpins. Progress is
  // therefore 0..1 across the whole runway, and clamped outside it — so the
  // last frame holds until the user scrolls out of the section, and scrolling
  // back up replays the sequence in reverse for free.
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start start", "end end"],
  });

  const springProgress = useSpring(scrollYProgress, {
    stiffness: 260,
    damping: 42,
    mass: 0.4,
    restDelta: 0.0005,
  });

  const progress = smooth ? springProgress : scrollYProgress;
  // Playback finishes where the dissolve does: the sequence hits its last frame
  // on the same scroll position that turns the screen solid. Mapping to 1
  // instead would spend the tail of the runway scrubbing frames that are
  // already behind an opaque overlay.
  // Single-argument and hand-clamped for the same reason as the dissolve below:
  // a keyframe range would risk snapping back to frame 0 past `fadeOutEnd`,
  // which is invisible behind the overlay but wrong on the way back up.
  const frameValue = useTransform(
    progress,
    (value) => clamp01(value / fadeOutEnd) * (frameCount - 1),
  );

  /* ------------------------------------------------------------------ *
   * Dissolve into the next section
   * ------------------------------------------------------------------ */

  // These are pure compositor work (opacity + transform) driven by the same
  // MotionValue as the frame index, so the dissolve costs nothing on the
  // frame-by-frame animation and reverses for free when scrolling back up.
  //
  // Every one is a single-argument transform over an explicitly clamped 0–1,
  // never a keyframe range. The keyframe overload does not hold `opacity` past
  // the end of its input range here: scale and blur sit correctly at their end
  // values while opacity snaps back to its *start* value, which drops the white
  // overlay to fully transparent and flashes the hero back into view underneath
  // the section arriving on top of it. Clamping by hand cannot do that.
  const fade = useTransform(progress, (value) =>
    clamp01((value - fadeOutStart) / (fadeOutEnd - fadeOutStart)),
  );

  const fadeOpacity = fade;
  // A touch of scale as it whitens reads as the image blooming into the light
  // rather than simply dimming. Transform-only — no per-frame repaint.
  const mediaScale = useTransform(fade, (t) => 1 + 0.04 * t);
  // Blur leads the whitening (it is done by the time the overlay is half
  // opaque) so the frame goes soft *then* bright, instead of both at once.
  const mediaFilter = useTransform(
    fade,
    (t) => `blur(${blurTo * clamp01(t * 2)}px)`,
  );

  // Once the overlay is effectively opaque the hero is invisible, so its links
  // and buttons must stop taking clicks.
  //
  // This is derived as a MotionValue rather than React state on purpose. The
  // overlay's opacity is written imperatively by framer; re-rendering that same
  // element (to swap a `pointer-events` class) rewrites its `style` attribute
  // from the render-time snapshot and clobbers those writes, freezing the
  // overlay at its initial opacity. Keeping every style on this element under
  // framer's control avoids the clash — and costs no re-renders at all.
  const overlayPointerEvents = useTransform(fadeOpacity, (value) =>
    value > 0.9 ? "auto" : "none",
  );

  /* ------------------------------------------------------------------ *
   * Painting
   * ------------------------------------------------------------------ */

  /**
   * Resolve the best available bitmap for `frame`. While the tail of the
   * sequence is still downloading, we substitute the nearest neighbour rather
   * than painting a hole — the visual difference between adjacent frames is a
   * few pixels, whereas a blank canvas is a flash.
   */
  const resolveFrame = useCallback((frame: number) => {
    const frames = framesRef.current;
    if (frames[frame]) return frames[frame];

    for (let offset = 1; offset <= FRAME_FALLBACK_RADIUS; offset += 1) {
      const before = frames[frame - offset];
      if (before) return before;
      const after = frames[frame + offset];
      if (after) return after;
    }
    return undefined;
  }, []);

  /** Draw one frame with `object-cover` semantics (centre crop, no distortion). */
  const paint = useCallback(
    (frame: number) => {
      const ctx = ctxRef.current;
      const image = resolveFrame(frame);
      const { width, height } = sizeRef.current;
      if (!ctx || !image || !width || !height) return false;

      const scale = Math.max(
        width / image.naturalWidth,
        height / image.naturalHeight,
      );
      const drawWidth = image.naturalWidth * scale;
      const drawHeight = image.naturalHeight * scale;

      ctx.drawImage(
        image,
        (width - drawWidth) / 2,
        (height - drawHeight) / 2,
        drawWidth,
        drawHeight,
      );
      return true;
    },
    [resolveFrame],
  );

  /**
   * Coalesce scroll events into one paint per animation frame. Scroll handlers
   * fire far more often than the display refreshes; painting inline would drop
   * frames and fight the compositor.
   */
  const schedulePaint = useCallback(() => {
    if (rafRef.current !== null) return;
    rafRef.current = requestAnimationFrame(() => {
      rafRef.current = null;
      // Read the target *inside* the rAF so we always paint the newest
      // position, not the one that happened to schedule this tick.
      const frame = targetFrameRef.current;
      if (frame === paintedFrameRef.current) return;
      // A paint can fail because the frame the playhead wants hasn't downloaded
      // yet. Leave paintedFrameRef at its old value so the next attempt retries
      // rather than treating this frame as done.
      if (!paint(frame)) return;
      paintedFrameRef.current = frame;
      // Reveal on the first *successful* paint, wherever it happens. Revealing
      // earlier would fade in an unpainted (opaque black) canvas.
      setIsReady(true);
    });
  }, [paint]);

  useMotionValueEvent(frameValue, "change", (value) => {
    targetFrameRef.current = clamp(Math.round(value), 0, frameCount - 1);
    schedulePaint();
  });

  /* ------------------------------------------------------------------ *
   * Canvas sizing (DPR-aware, no layout shift)
   * ------------------------------------------------------------------ */

  useEffect(() => {
    if (prefersReducedMotion) return;
    const canvas = canvasRef.current;
    const sticky = stickyRef.current;
    if (!canvas || !sticky) return;

    ctxRef.current ??= canvas.getContext("2d", { alpha: false });

    const resize = () => {
      const { width, height } = sticky.getBoundingClientRect();
      if (!width || !height) return;

      const dpr = Math.min(window.devicePixelRatio || 1, MAX_DPR);
      canvas.width = Math.round(width * dpr);
      canvas.height = Math.round(height * dpr);
      sizeRef.current = { width, height };

      // Work in CSS pixels everywhere else.
      ctxRef.current?.setTransform(dpr, 0, 0, dpr, 0, 0);

      // Setting width/height cleared the backbuffer to opaque black. Repaint
      // synchronously — ResizeObserver runs before the browser paints, so this
      // avoids the one-frame flash a rAF-deferred redraw would produce.
      paintedFrameRef.current = -1;
      if (paint(targetFrameRef.current)) {
        paintedFrameRef.current = targetFrameRef.current;
      }
    };

    resize();
    const observer = new ResizeObserver(resize);
    observer.observe(sticky);
    return () => observer.disconnect();
  }, [prefersReducedMotion, paint]);

  /* ------------------------------------------------------------------ *
   * Preloading
   * ------------------------------------------------------------------ */

  useEffect(() => {
    if (prefersReducedMotion) return;
    const section = sectionRef.current;
    if (!section) return;

    const controller = new AbortController();
    const { signal } = controller;
    framesRef.current = new Array(frameCount);

    const loadFrame = (frame: number) =>
      new Promise<void>((resolve) => {
        const image = new window.Image();
        image.decoding = "async";
        image.src = frameSrc(frame);
        const done = () => resolve();
        if (image.complete && image.naturalWidth) {
          framesRef.current[frame] = image;
          done();
          return;
        }
        image.onload = () => {
          framesRef.current[frame] = image;
          // The playhead may already be sitting on (or near) this frame with
          // nothing drawn — e.g. the user scrolled deep into the sequence while
          // it was still downloading. Re-attempt the paint now that a new frame
          // is available; schedulePaint coalesces these to one per rAF.
          schedulePaint();
          done();
        };
        // A missing frame must not stall the queue — resolveFrame() will
        // substitute a neighbour for it.
        image.onerror = done;
      });

    /** Run `frames` through `loadFrame` with a bounded number of sockets in flight. */
    const loadAll = async (frames: number[], workers: number) => {
      let cursor = 0;
      await Promise.all(
        Array.from({ length: Math.min(workers, frames.length) }, async () => {
          while (cursor < frames.length && !signal.aborted) {
            await loadFrame(frames[cursor++]);
          }
        }),
      );
    };

    const run = async () => {
      const head = Math.min(eagerFrames, frameCount);

      // Phase 1 — enough frames to start playing. Decoding these up front means
      // the first scroll never waits on a decode.
      await loadAll(
        Array.from({ length: head }, (_, index) => index),
        concurrency,
      );
      if (signal.aborted) return;

      await Promise.all(
        framesRef.current
          .slice(0, head)
          .map((image) => image?.decode().catch(() => undefined)),
      );
      if (signal.aborted) return;

      // Sync the playhead to wherever the user has scrolled to by now and ask
      // for a paint. schedulePaint reveals the canvas once a paint actually
      // succeeds — which may not be this attempt, if the user already scrolled
      // past the frames loaded so far. In that case the loader retries as the
      // remaining frames arrive.
      targetFrameRef.current = clamp(
        Math.round(frameValue.get()),
        0,
        frameCount - 1,
      );
      paintedFrameRef.current = -1;
      schedulePaint();

      // Phase 2 — stream the tail in order, behind the playhead.
      await loadAll(
        Array.from({ length: frameCount - head }, (_, index) => head + index),
        concurrency,
      );
    };

    // Only spend the bandwidth once the banner is roughly a viewport away.
    // For a hero this fires immediately; for a sequence further down the page
    // it keeps 22 MB off the critical path.
    const observer = new IntersectionObserver(
      (entries) => {
        if (!entries.some((entry) => entry.isIntersecting)) return;
        observer.disconnect();
        void run();
      },
      { rootMargin: "100% 0px" },
    );
    observer.observe(section);

    return () => {
      controller.abort();
      observer.disconnect();
      if (rafRef.current !== null) cancelAnimationFrame(rafRef.current);
      rafRef.current = null;
      framesRef.current = [];
    };
  }, [
    prefersReducedMotion,
    frameCount,
    frameSrc,
    eagerFrames,
    concurrency,
    frameValue,
    schedulePaint,
  ]);

  /* ------------------------------------------------------------------ *
   * Render
   * ------------------------------------------------------------------ */

  return (
    <section
      ref={sectionRef}
      // The runway height goes through a custom property rather than an inline
      // `height`, so `motion-reduce:` can collapse it to a single screen in
      // pure CSS. Doing this in JS would mean rendering a different height on
      // the server than on the client — a hydration mismatch.
      className={cn(
        "relative w-full h-[var(--sequence-height)] motion-reduce:h-screen",
        className,
      )}
      style={{ "--sequence-height": scrollHeight } as CSSProperties}
    >
      <div
        ref={stickyRef}
        className={cn(
          "sticky top-0 h-screen w-full overflow-hidden",
          stickyClassName,
        )}
      >
        {/* Media layer. It exists so the `fill` Image has an `absolute` parent
            — next/image rejects a `sticky` one, even though sticky does
            establish a containing block. */}
        <motion.div
          className="absolute inset-0"
          // Under reduced motion the runway collapses to one screen, which
          // makes every scroll range degenerate — pin the media at rest rather
          // than letting a saturated progress value hold it blurred and zoomed.
          style={
            prefersReducedMotion
              ? undefined
              : { scale: mediaScale, filter: mediaFilter }
          }
        >
          {/* Frame 0 — server-rendered, optimized, and the LCP candidate. Stays
              mounted underneath the canvas as a permanent fallback. */}
          <Image
            src={posterSrc}
            alt={alt}
            fill
            priority
            sizes="100vw"
            className="object-cover"
          />

          {/* Always mounted so server and client render the same tree; under
              reduced motion the effects below never run, so it stays hidden and
              the poster is all the user sees. */}
          <canvas
            ref={canvasRef}
            aria-hidden="true"
            className={cn(
              "absolute inset-0 h-full w-full transition-opacity duration-300",
              // Hidden until the first frames are decoded — an empty canvas is
              // opaque black and would blank out the poster.
              isReady ? "opacity-100" : "opacity-0",
            )}
          />
        </motion.div>

        <FrameContext.Provider value={frameValue}>
          {children}
        </FrameContext.Provider>

        {/* Dissolve. Sits above every layer of the sticky hero — media, the
            legibility gradients, the header and the copy — so the whole banner
            resolves to one flat colour by the time it unpins, and *stays* that
            colour while it scrolls out of view.

            That is the entire handoff: what follows the banner opens on the
            same colour, so the last viewport of this section scrolling away is
            white sliding over white. Nothing to cover, nothing to time.

            Dropped entirely under reduced motion — the runway is a single
            screen there, so the scroll range this reads is degenerate and would
            hold it opaque over a static hero. */}
        {!prefersReducedMotion && (
          <motion.div
            aria-hidden="true"
            className="absolute inset-0 z-40"
            style={{
              opacity: fadeOpacity,
              backgroundColor: fadeToColor,
              pointerEvents: overlayPointerEvents,
            }}
          />
        )}
      </div>
    </section>
  );
}
