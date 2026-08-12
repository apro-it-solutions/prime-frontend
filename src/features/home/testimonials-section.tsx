"use client";

import Image from "next/image";
import { Quote, AlertTriangle } from "lucide-react";
import { Container } from "@/components/layout/container";
import { cn } from "@/lib/utils";
import { useTestimonials } from "@/hooks/use-testimonials";
import { TestimonialsCarousel } from "./testimonials-carousel";
import testimonialBg from "../../../public/images/testimonial-bg.jpg";

/** Pulse placeholder mirroring the two-column testimonial card layout. */
function TestimonialsSkeleton() {
  return (
    <div
      aria-hidden="true"
      className="grid animate-pulse gap-10 md:grid-cols-[40fr_60fr] md:grid-rows-[auto_1fr] md:gap-x-10 md:gap-y-8 lg:grid-cols-[360px_1fr] lg:gap-x-16"
    >
      <div className="space-y-6 md:col-start-1 md:row-start-1">
        <div className="h-4 w-40 rounded bg-bg-sunken" />
        <div className="space-y-2">
          <div className="h-4 w-full rounded bg-bg-sunken" />
          <div className="h-4 w-11/12 rounded bg-bg-sunken" />
          <div className="h-4 w-2/3 rounded bg-bg-sunken" />
        </div>
      </div>

      <div className="min-w-0 md:col-start-2 md:row-start-1 md:row-span-2 md:border-l md:border-[#e6e8e2] md:pl-10 lg:pl-16">
        <div className="size-12 rounded bg-bg-sunken" />
        <div className="mt-8 space-y-3">
          <div className="h-4 w-full max-w-[720px] rounded bg-bg-sunken" />
          <div className="h-4 w-full max-w-[720px] rounded bg-bg-sunken" />
          <div className="h-4 w-4/5 max-w-[720px] rounded bg-bg-sunken" />
        </div>
        <div className="mt-8 flex items-center gap-4">
          <div className="size-[52px] rounded-full bg-bg-sunken" />
          <div className="space-y-2">
            <div className="h-4 w-32 rounded bg-bg-sunken" />
            <div className="h-4 w-48 rounded bg-bg-sunken" />
          </div>
        </div>
      </div>

      <div className="flex gap-4 md:col-start-1 md:row-start-2 md:self-end">
        <div className="size-12 rounded-full bg-bg-sunken" />
        <div className="size-12 rounded-full bg-bg-sunken" />
      </div>
    </div>
  );
}

/** Shown when the API returns no testimonials. */
function TestimonialsEmpty() {
  return (
    <div className="flex flex-col items-center justify-center py-10 text-center">
      <span className="inline-flex size-14 items-center justify-center rounded-full bg-green-soft text-green-primary">
        <Quote className="size-7" aria-hidden="true" />
      </span>
      <h3 className="mt-5 font-heading text-2xl font-semibold text-text-primary">
        No testimonials yet
      </h3>
      <p className="mt-2 max-w-md font-body text-base text-text-secondary">
        Client stories will appear here soon. Check back shortly.
      </p>
    </div>
  );
}

/** Shown when the testimonials request fails. */
function TestimonialsError({ onRetry }: { onRetry: () => void }) {
  return (
    <div className="flex flex-col items-center justify-center py-10 text-center">
      <span className="inline-flex size-14 items-center justify-center rounded-full bg-red-50 text-red-600">
        <AlertTriangle className="size-7" aria-hidden="true" />
      </span>
      <h3 className="mt-5 font-heading text-2xl font-semibold text-text-primary">
        Couldn&apos;t load testimonials
      </h3>
      <p className="mt-2 max-w-md font-body text-base text-text-secondary">
        Something went wrong while fetching client stories. Please try again.
      </p>
      <button
        type="button"
        onClick={onRetry}
        className="mt-6 inline-flex items-center gap-2 rounded-full border border-border bg-bg-card px-5 py-2.5 font-body text-base text-text-primary transition-colors hover:border-text-secondary/40 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-green-accent focus-visible:ring-offset-2"
      >
        Try again
      </button>
    </div>
  );
}

interface TestimonialsSectionProps {
  /** Green wash over the brushed-metal backdrop. Defaults to the home band. */
  overlayClassName?: string;
  /** The white card holding the carousel. Defaults to the home band. */
  cardClassName?: string;
  /** Bullet beside the "My Clients' Stories" eyebrow. */
  dotClassName?: string;
}

/**
 * Insights & Testimonials — a single client story on a green-washed brushed-
 * metal band, presented as an autoplaying carousel. Data comes from the backend
 * via {@link useTestimonials}; UI branches on loading / error / empty / data.
 *
 * Shared by the home and about pages, which differ only in the wash opacity,
 * card shadow, and eyebrow dot — passed in rather than forked into a second
 * component so both stay on one data source.
 */
export function TestimonialsSection({
  overlayClassName = "bg-[rgba(15,93,70,0.7)]",
  cardClassName = "shadow-[0_18px_50px_-24px_rgba(15,23,18,0.35)] transition-shadow duration-500 hover:shadow-[0_28px_70px_-24px_rgba(15,23,18,0.45)]",
  dotClassName,
}: TestimonialsSectionProps = {}) {
  const { data, isLoading, isError, refetch } = useTestimonials();
  const testimonials = data ?? [];

  let content: React.ReactNode;
  if (isLoading) {
    content = <TestimonialsSkeleton />;
  } else if (isError) {
    content = <TestimonialsError onRetry={() => refetch()} />;
  } else if (testimonials.length === 0) {
    content = <TestimonialsEmpty />;
  } else {
    content = (
      <TestimonialsCarousel
        testimonials={testimonials}
        dotClassName={dotClassName}
      />
    );
  }

  return (
    <section
      aria-labelledby="testimonials-heading"
      className="relative overflow-hidden py-16 lg:py-[100px]"
    >
      <h2 id="testimonials-heading" className="sr-only">
        Client testimonials
      </h2>

      {/* Brushed-metal backdrop with a green wash */}
      <Image
        src={testimonialBg}
        alt=""
        aria-hidden="true"
        fill
        sizes="100vw"
        className="object-cover"
      />
      <div
        aria-hidden="true"
        className={cn("absolute inset-0", overlayClassName)}
      />

      <Container className="relative">
        <div
          className={cn(
            "mx-auto max-w-[1200px] overflow-hidden rounded-[32px] bg-bg-card p-8 sm:p-12 lg:p-16",
            cardClassName,
          )}
        >
          {content}
        </div>
      </Container>
    </section>
  );
}
