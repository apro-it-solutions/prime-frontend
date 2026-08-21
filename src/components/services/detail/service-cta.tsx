import Image from "next/image";
import { Container } from "@/components/layout/container";
import { PillButton } from "@/components/ui/pill-button";
import { GhostPill } from "@/components/ui/ghost-pill";
import { FadeHeading } from "@/components/ui/fade-heading";
import { RevealRow, RevealItem } from "@/components/ui/reveal-row";
import type { ServiceDetail } from "../services-data";

/**
 * 07 — CTA band (Figma 155:22): a 1600×420 green panel, copy and two pills on
 * the left, the service photo bleeding to the right edge. The soft circles sit
 * behind everything and are what shows through on mobile, where the photo drops
 * below the copy instead of beside it.
 */
export function ServiceCta({ service }: { service: ServiceDetail }) {
  const hasGallery = service.gallery.length > 0;

  return (
    <section className="bg-bg-base pb-16 lg:pb-[102px] lg:pt-[60px]">
      <Container>
        <div className="relative grid overflow-hidden rounded-[32px] bg-green-primary lg:min-h-[420px] lg:grid-cols-[745fr_855fr]">
          {/* Decorative wash */}
          <span
            aria-hidden="true"
            className="pointer-events-none absolute -top-[33%] left-[77%] size-[35%] rounded-full bg-white/[0.06]"
          />
          <span
            aria-hidden="true"
            className="pointer-events-none absolute left-[88%] top-[14%] size-[23%] rounded-full bg-white/[0.06]"
          />

          <div className="relative z-10 p-8 sm:p-12 lg:py-[72px] lg:pl-16 lg:pr-10">
            <p className="font-body text-[13px] font-medium uppercase leading-[1.2] tracking-[1.2px] text-white/80">
              Ready when you are
            </p>
            <FadeHeading
              text={service.cta.heading}
              className="mt-4 max-w-[560px] whitespace-pre-line font-heading text-[28px] font-semibold leading-[1.15] tracking-[-0.44px] text-white sm:text-[36px] lg:text-[44px]"
            />
            <p className="mt-6 max-w-[560px] font-body text-base leading-[1.6] text-white/85 lg:text-[17px]">
              {service.cta.body}
            </p>
            <div className="mt-8 flex flex-wrap items-center gap-3.5 lg:mt-[34px]">
              <PillButton
                label="Request a Quote"
                href="/contact"
                variant="invert"
              />
              <GhostPill
                label={hasGallery ? "View Gallery" : "View Projects"}
                href={hasGallery ? "#gallery" : "/projects"}
                tone="on-green"
              />
            </div>
          </div>

          <RevealRow className="relative min-h-[240px] sm:min-h-[300px] lg:min-h-0">
            <RevealItem preset="image" className="absolute inset-0">
              <Image
                src={service.cta.image.src}
                alt={service.cta.image.alt}
                fill
                sizes="(max-width: 1024px) 100vw, 855px"
                className="object-cover"
              />
            </RevealItem>
          </RevealRow>
        </div>
      </Container>
    </section>
  );
}
