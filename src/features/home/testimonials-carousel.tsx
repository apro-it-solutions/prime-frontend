"use client";

import { useCallback, useEffect, useMemo, useState } from "react";
import Image from "next/image";
import { ArrowLeft, ArrowRight } from "lucide-react";
import useEmblaCarousel from "embla-carousel-react";
import Autoplay from "embla-carousel-autoplay";
import type { EmblaCarouselType } from "embla-carousel";
import { cn } from "@/lib/utils";
import type { Testimonial } from "@/types/testimonials";

/** Five-star rating rendered from a numeric score, with an SR-only label. */
function Stars({ rating }: { rating: number }) {
  const filled = Math.round(rating);
  return (
    <span className="inline-flex items-center leading-none">
      <span aria-hidden="true">
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

export function TestimonialsCarousel({
  testimonials,
}: {
  testimonials: Testimonial[];
}) {
  const canLoop = testimonials.length > 1;

  const autoplay = useMemo(
    () =>
      Autoplay({
        delay: 4000,
        stopOnMouseEnter: true,
        stopOnInteraction: false,
      }),
    [],
  );

  const [emblaRef, emblaApi] = useEmblaCarousel(
    {
      loop: canLoop,
      align: "start",
      duration: 30, // ~700–900ms premium ease-out travel
      containScroll: "trimSnaps",
    },
    canLoop ? [autoplay] : [],
  );

  const [selected, setSelected] = useState(0);

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
  const scrollTo = useCallback(
    (i: number) => emblaApi?.scrollTo(i),
    [emblaApi],
  );

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
      className="flex flex-col gap-10 lg:flex-row lg:gap-[100px]"
    >
      {/* Intro + controls */}
      <div className="flex shrink-0 flex-col lg:w-[360px]">
        <div className="flex items-center gap-2.5">
          <span
            aria-hidden="true"
            className="size-2.5 rounded-full bg-green-accent-light"
          />
          <p className="text-base leading-[1.5] text-text-primary">
            My Clients&apos; Stories
          </p>
        </div>
        <p className="mt-6 max-w-[360px] text-base leading-[1.5] text-text-primary">
          Here&apos;s what people have to say about working with PrimeNMS. Real
          projects, real structures, real results.
        </p>

        {canLoop && (
          <div className="mt-10 flex items-center gap-4 lg:mt-auto lg:pt-16">
            <button
              type="button"
              aria-label="Previous testimonial"
              onClick={scrollPrev}
              className="inline-flex size-14 shrink-0 items-center justify-center rounded-full border border-border text-text-primary transition-colors hover:bg-bg-sunken focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-green-accent focus-visible:ring-offset-2"
            >
              <ArrowLeft className="size-5" aria-hidden="true" />
            </button>
            <button
              type="button"
              aria-label="Next testimonial"
              onClick={scrollNext}
              className="inline-flex size-14 shrink-0 items-center justify-center rounded-full bg-bg-sunken text-text-primary transition-colors hover:bg-green-soft focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-green-accent focus-visible:ring-offset-2"
            >
              <ArrowRight className="size-5" aria-hidden="true" />
            </button>

            {/* Pagination dots */}
            <div className="ml-2 flex items-center gap-2">
              {testimonials.map((t, i) => (
                <button
                  key={t._id}
                  type="button"
                  aria-label={`Go to testimonial ${i + 1}`}
                  aria-current={selected === i}
                  onClick={() => scrollTo(i)}
                  className={cn(
                    "h-2 rounded-full transition-all duration-300 ease-out",
                    selected === i
                      ? "w-6 bg-green-accent"
                      : "w-2 bg-text-secondary/30 hover:bg-text-secondary/50",
                  )}
                />
              ))}
            </div>
          </div>
        )}
      </div>

      {/* Divider */}
      <div
        aria-hidden="true"
        className="hidden w-px shrink-0 self-stretch bg-[#e6e8e2] lg:block"
      />

      {/* Quote carousel */}
      <div className="flex min-w-0 flex-1 flex-col">
        <span
          aria-hidden="true"
          className="font-display text-[112px] font-bold leading-[0.6] tracking-[-2.24px] text-[#d6dad3]"
        >
          &rdquo;
        </span>

        <div ref={emblaRef} className="mt-2 overflow-hidden">
          <div className="flex touch-pan-y">
            {testimonials.map((t, i) => (
              <figure
                key={t._id}
                role="group"
                aria-roledescription="slide"
                aria-label={`Testimonial ${i + 1} of ${testimonials.length}`}
                className="min-w-0 shrink-0 grow-0 basis-full"
              >
                <blockquote>
                  <p className="max-w-[720px] font-body text-2xl font-medium leading-[1.15] tracking-[-0.32px] text-text-primary sm:text-[32px]">
                    {t.quote}
                  </p>
                </blockquote>
                {t.review && (
                  <p className="mt-6 max-w-[720px] font-body text-lg leading-[1.65] text-text-secondary">
                    {t.review}
                  </p>
                )}
                <figcaption className="mt-8 flex items-center gap-4">
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
                </figcaption>
              </figure>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
