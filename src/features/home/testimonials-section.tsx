"use client";

import Image from "next/image";
import { Quote, AlertTriangle } from "lucide-react";
import { Container } from "@/components/layout/container";
import { useTestimonials } from "@/hooks/use-testimonials";
import { TestimonialsCarousel } from "./testimonials-carousel";
import testimonialBg from "../../../public/images/testimonial-bg.jpg";

/** Pulse placeholder mirroring the two-column testimonial card layout. */
function TestimonialsSkeleton() {
  return (
    <div
      aria-hidden="true"
      className="flex animate-pulse flex-col gap-10 lg:flex-row lg:gap-[100px]"
    >
      <div className="flex shrink-0 flex-col gap-6 lg:w-[360px]">
        <div className="h-4 w-40 rounded bg-bg-sunken" />
        <div className="space-y-2">
          <div className="h-4 w-full rounded bg-bg-sunken" />
          <div className="h-4 w-11/12 rounded bg-bg-sunken" />
          <div className="h-4 w-2/3 rounded bg-bg-sunken" />
        </div>
        <div className="mt-4 flex gap-4 lg:mt-auto lg:pt-16">
          <div className="size-14 rounded-full bg-bg-sunken" />
          <div className="size-14 rounded-full bg-bg-sunken" />
        </div>
      </div>
      <div
        aria-hidden="true"
        className="hidden w-px shrink-0 self-stretch bg-[#e6e8e2] lg:block"
      />
      <div className="flex min-w-0 flex-1 flex-col gap-6">
        <div className="size-16 rounded bg-bg-sunken" />
        <div className="space-y-3">
          <div className="h-7 w-11/12 max-w-[720px] rounded bg-bg-sunken" />
          <div className="h-7 w-3/4 max-w-[720px] rounded bg-bg-sunken" />
        </div>
        <div className="space-y-2">
          <div className="h-4 w-full max-w-[720px] rounded bg-bg-sunken" />
          <div className="h-4 w-5/6 max-w-[720px] rounded bg-bg-sunken" />
        </div>
        <div className="mt-4 flex items-center gap-4">
          <div className="size-[52px] rounded-full bg-bg-sunken" />
          <div className="space-y-2">
            <div className="h-4 w-32 rounded bg-bg-sunken" />
            <div className="h-4 w-48 rounded bg-bg-sunken" />
          </div>
        </div>
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

/**
 * Insights & Testimonials — a single client story on a green-washed brushed-
 * metal band, presented as an autoplaying carousel. Data comes from the backend
 * via {@link useTestimonials}; UI branches on loading / error / empty / data.
 */
export function TestimonialsSection() {
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
    content = <TestimonialsCarousel testimonials={testimonials} />;
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
        className="absolute inset-0 bg-[rgba(15,93,70,0.7)]"
      />

      <Container className="relative">
        <div className="overflow-hidden rounded-[24px] bg-bg-card p-8 shadow-[0_18px_50px_-24px_rgba(15,23,18,0.35)] transition-shadow duration-500 hover:shadow-[0_28px_70px_-24px_rgba(15,23,18,0.45)] sm:p-12 lg:p-[80px]">
          {content}
        </div>
      </Container>
    </section>
  );
}
