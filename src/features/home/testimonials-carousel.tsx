"use client";

import { useCallback, useEffect, useState } from "react";
import Image from "next/image";
import { ArrowLeft, ArrowRight } from "lucide-react";
import useEmblaCarousel from "embla-carousel-react";
import Fade from "embla-carousel-fade";
import type { EmblaCarouselType } from "embla-carousel";
import { motion, type Variants } from "framer-motion";
import { cn } from "@/lib/utils";
import type { Testimonial } from "@/types/testimonials";

/**
 * Right-panel entrance. The whole slide rises 10px and fades as it becomes the
 * selected one; children stagger so the review leads and the footer settles last.
 */
const slideVariants: Variants = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: { staggerChildren: 0.07, delayChildren: 0.05 },
  },
};

const itemVariants: Variants = {
  hidden: { opacity: 0, y: 10 },
  show: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.4, ease: [0.22, 1, 0.36, 1] },
  },
};

/** Five-star rating rendered from a numeric score, with an SR-only label. */
function Stars({ rating }: { rating: number }) {
  const filled = Math.round(rating);
  return (
    <span className="inline-flex items-center leading-none">
      <span aria-hidden="true" className="tracking-[1px]">
        {Array.from({ length: 5 }, (_, i) => (
          <span
            key={i}
            className={i < filled ? "text-green-accent" : "text-border"}
          >
            ★
          </span>
        ))}
      </span>
      <span className="sr-only">Rated {rating.toFixed(1)} out of 5</span>
    </span>
  );
}

/** Avatar with a graceful gradient fallback when the image is missing/broken. */
function Avatar({ src, name }: { src?: string; name: string }) {
  const [failed, setFailed] = useState(false);
  if (!src || failed) {
    return (
      <span
        aria-hidden="true"
        className="size-[52px] shrink-0 rounded-full bg-gradient-to-r from-[#dbdedb] to-[#c7c9c7]"
      />
    );
  }
  return (
    <Image
      src={src}
      alt={name}
      width={52}
      height={52}
      loading="lazy"
      onError={() => setFailed(true)}
      className="size-[52px] shrink-0 rounded-full object-cover"
    />
  );
}

/** Circular 48px prev/next control. */
function NavButton({
  label,
  onClick,
  disabled,
  children,
}: {
  label: string;
  onClick: () => void;
  disabled: boolean;
  children: React.ReactNode;
}) {
  return (
    <button
      type="button"
      aria-label={label}
      onClick={onClick}
      disabled={disabled}
      className={cn(
        "inline-flex size-12 shrink-0 items-center justify-center rounded-full bg-bg-sunken text-text-primary",
        "transition-all duration-300 ease-out",
        "hover:bg-green-soft hover:text-green-primary",
        "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-green-accent focus-visible:ring-offset-2",
        "disabled:pointer-events-none disabled:opacity-40",
      )}
    >
      {children}
    </button>
  );
}

export function TestimonialsCarousel({
  testimonials,
  dotClassName = "bg-green-accent-light",
}: {
  testimonials: Testimonial[];
  /** Bullet beside the "My Clients' Stories" eyebrow. */
  dotClassName?: string;
}) {
  // Fade rather than translate: only the right panel's content changes, so the
  // card never slides sideways. Non-looping so prev/next get real disabled ends.
  const [emblaRef, emblaApi] = useEmblaCarousel({ loop: false, duration: 25 }, [
    Fade(),
  ]);

  const [selected, setSelected] = useState(0);

  // One slide per view and no looping, so the ends are a pure function of the
  // index — no need to mirror Embla's canScrollPrev/Next into state.
  const canPrev = selected > 0;
  const canNext = selected < testimonials.length - 1;

  const onSelect = useCallback((api: EmblaCarouselType) => {
    setSelected(api.selectedScrollSnap());
  }, []);

  useEffect(() => {
    if (!emblaApi) return;
    // State updates happen only in event handlers, never in the effect body.
    emblaApi.on("select", onSelect).on("reInit", onSelect);
    return () => {
      emblaApi.off("select", onSelect).off("reInit", onSelect);
    };
  }, [emblaApi, onSelect]);

  const scrollPrev = useCallback(() => emblaApi?.scrollPrev(), [emblaApi]);
  const scrollNext = useCallback(() => emblaApi?.scrollNext(), [emblaApi]);

  const onKeyDown = useCallback(
    (e: React.KeyboardEvent) => {
      if (e.key === "ArrowLeft") {
        e.preventDefault();
        scrollPrev();
      } else if (e.key === "ArrowRight") {
        e.preventDefault();
        scrollNext();
      }
    },
    [scrollPrev, scrollNext],
  );

  return (
    <div
      role="group"
      aria-roledescription="carousel"
      aria-label="Client testimonials"
      onKeyDown={onKeyDown}
      className={cn(
        "grid gap-10",
        // Tablet splits 40/60; desktop pins the static column to a fixed width.
        "md:grid-cols-[40fr_60fr] md:grid-rows-[auto_1fr] md:gap-x-10 md:gap-y-8",
        "lg:grid-cols-[360px_1fr] lg:gap-x-16",
      )}
    >
      {/* Intro — static, never re-renders between slides */}
      <div className="md:col-start-1 md:row-start-1">
        <div className="flex items-center gap-2.5">
          <span
            aria-hidden="true"
            className={cn("size-2.5 rounded-full", dotClassName)}
          />
          <p className="text-base leading-[1.5] text-text-primary">
            My Clients&apos; Stories
          </p>
        </div>
        <p className="mt-6 max-w-[360px] text-base leading-[1.5] text-text-primary">
          Here&apos;s what people have to say about working with PrimeNMS. Real
          projects, real structures, real results.
        </p>
      </div>

      {/* Slides — the only part that changes */}
      <div
        className={cn(
          "min-w-0",
          "md:col-start-2 md:row-start-1 md:row-span-2",
          "md:border-l md:border-[#e6e8e2] md:pl-10 lg:pl-16",
        )}
      >
        <span
          aria-hidden="true"
          className="block font-display text-[80px] font-bold leading-[0.6] tracking-[-1.6px] text-[#d6dad3]"
        >
          &rdquo;
        </span>

        <div ref={emblaRef} className="mt-8 overflow-hidden">
          <div className="flex touch-pan-y">
            {testimonials.map((t, i) => (
              <motion.figure
                key={t._id}
                role="group"
                aria-roledescription="slide"
                aria-label={`Testimonial ${i + 1} of ${testimonials.length}`}
                variants={slideVariants}
                initial="hidden"
                animate={selected === i ? "show" : "hidden"}
                className="min-w-0 shrink-0 grow-0 basis-full"
              >
                <motion.blockquote variants={itemVariants}>
                  <p className="max-w-[720px] font-body text-base leading-[1.65] text-text-secondary lg:text-lg">
                    {t.review}
                  </p>
                </motion.blockquote>

                <motion.figcaption
                  variants={itemVariants}
                  className="mt-8 flex items-center gap-4"
                >
                  <Avatar src={t.avatar} name={t.name} />
                  <div className="flex flex-col gap-1 text-base leading-[1.5]">
                    <div className="flex items-center gap-2">
                      <span className="text-text-primary">
                        {t.rating.toFixed(1)} / 5
                      </span>
                      <Stars rating={t.rating} />
                    </div>
                    <span className="text-text-secondary">
                      {t.name}
                      {t.designation ? ` · ${t.designation}` : ""}
                      {t.company ? `, ${t.company}` : ""}
                    </span>
                  </div>
                </motion.figcaption>
              </motion.figure>
            ))}
          </div>
        </div>
      </div>

      {/* Navigation — bottom of the static column on md+, below content on mobile.
          Always rendered so the layout is stable; both ends simply sit disabled
          when there is a single testimonial. */}
      <div className="flex items-center gap-4 md:col-start-1 md:row-start-2 md:self-end">
        <NavButton
          label="Previous testimonial"
          onClick={scrollPrev}
          disabled={!canPrev}
        >
          <ArrowLeft className="size-5" aria-hidden="true" />
        </NavButton>
        <NavButton
          label="Next testimonial"
          onClick={scrollNext}
          disabled={!canNext}
        >
          <ArrowRight className="size-5" aria-hidden="true" />
        </NavButton>
      </div>
    </div>
  );
}
