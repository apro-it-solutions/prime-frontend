import Image from "next/image";
import { ArrowLeft, ArrowRight } from "lucide-react";
import { Container } from "@/components/layout/container";
import testimonialBg from "../../../public/images/testimonial-bg.jpg";

/** 04 — Insights & Testimonials. A single client story on a green-washed band. */
export function Testimonials() {
  return (
    <section className="relative overflow-hidden py-16 lg:py-[100px]">
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
        className="absolute inset-0 bg-[rgba(15,93,70,0.43)]"
      />

      <Container className="relative">
        <div className="overflow-hidden rounded-[24px] bg-bg-card p-8 sm:p-12 lg:p-[80px]">
          <div className="flex flex-col gap-10 lg:flex-row lg:gap-[100px]">
            {/* Intro + controls */}
            <div className="flex shrink-0 flex-col lg:w-[360px]">
              <div className="flex items-center gap-2.5">
                <span
                  aria-hidden="true"
                  className="size-2.5 rounded-full bg-green-accent"
                />
                <p className="text-base leading-[1.5] text-text-primary">
                  My Clients&apos; Stories
                </p>
              </div>
              <p className="mt-6 max-w-[360px] text-base leading-[1.5] text-text-primary">
                Here&apos;s what people have to say about working with PrimeNMS.
                Real projects, real structures, real results.
              </p>
              <div className="mt-10 flex items-center gap-4 lg:mt-auto lg:pt-16">
                <button
                  type="button"
                  aria-label="Previous testimonial"
                  className="inline-flex size-14 items-center justify-center rounded-full border border-border text-text-primary transition-colors hover:bg-bg-sunken"
                >
                  <ArrowLeft className="size-5" />
                </button>
                <button
                  type="button"
                  aria-label="Next testimonial"
                  className="inline-flex size-14 items-center justify-center rounded-full bg-bg-sunken text-text-primary transition-colors hover:bg-green-soft"
                >
                  <ArrowRight className="size-5" />
                </button>
              </div>
            </div>

            {/* Divider */}
            <div
              aria-hidden="true"
              className="hidden w-px shrink-0 self-stretch bg-[#e6e8e2] lg:block"
            />

            {/* Quote */}
            <figure className="flex flex-1 flex-col">
              <span
                aria-hidden="true"
                className="font-display text-[112px] font-bold leading-[0.6] tracking-[-2.24px] text-[#d6dad3]"
              >
                &rdquo;
              </span>
              <blockquote className="mt-2">
                <p className="max-w-[720px] font-body text-2xl font-medium leading-[1.15] tracking-[-0.32px] text-text-primary sm:text-[32px]">
                  PrimeNMS delivered our 40,000 sq ft warehouse ahead of
                  schedule. Great work!
                </p>
              </blockquote>
              <p className="mt-6 max-w-[720px] font-body text-lg leading-[1.65] text-text-secondary">
                The galvanized structure and finish quality were exactly as
                promised. The team was dependable from quote to commissioning.
              </p>
              <figcaption className="mt-8 flex items-center gap-4">
                <span
                  aria-hidden="true"
                  className="size-[52px] shrink-0 rounded-full bg-gradient-to-r from-[#dbdedb] to-[#c7c9c7]"
                />
                <div className="flex flex-col gap-1 text-base leading-[1.5]">
                  <div className="flex items-center gap-2">
                    <span className="text-text-primary">5.0 / 5</span>
                    <span aria-hidden="true" className="text-green-accent">
                      ★★★★★
                    </span>
                    <span className="sr-only">Rated 5 out of 5</span>
                  </div>
                  <span className="text-text-secondary">
                    Rajesh Menon · Warehouse Developer
                  </span>
                </div>
              </figcaption>
            </figure>
          </div>
        </div>
      </Container>
    </section>
  );
}
