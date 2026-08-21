import Image from "next/image";
import { Container } from "@/components/layout/container";
import { PillButton } from "@/components/ui/pill-button";
import { GhostPill } from "@/components/ui/ghost-pill";
import { FadeHeading } from "@/components/ui/fade-heading";
import { RevealRow, RevealItem } from "@/components/ui/reveal-row";
import { ServiceBreadcrumb } from "./service-breadcrumb";
import type { ServiceDetail } from "../services-data";

/**
 * 01 — Service Detail hero (Figma 161:165): breadcrumb, display headline and
 * lead over two CTAs on the left, the 880×520 rounded photo on the right with
 * three spec chips floating over its lower edge.
 *
 * The section carries the top padding that clears the overlaid site header, the
 * same way the blog detail hero does. That header is absolutely positioned and
 * its logo lockup runs to ~148px, so the hero starts below that at every
 * breakpoint rather than only on desktop.
 */
export function ServiceDetailHero({ service }: { service: ServiceDetail }) {
  return (
    <section className="bg-bg-base pb-12 pt-[156px] lg:pb-[75px]">
      <Container>
        <ServiceBreadcrumb title={service.title} className="mb-8 lg:mb-10" />

        <div className="grid gap-10 lg:grid-cols-[36fr_56fr] lg:items-end lg:gap-x-16 xl:gap-x-24">
          {/* Headline, lead and CTAs */}
          <div className="max-w-[564px]">
            <FadeHeading
              as="h1"
              text={service.heroTitle}
              className="whitespace-pre-line font-display text-[32px] font-bold leading-[1.05] tracking-[-0.02em] text-text-primary sm:text-[44px] lg:text-[56px]"
            />
            <p className="mt-8 font-body text-lg leading-[1.65] text-text-secondary lg:mt-10 lg:text-xl">
              {service.description}
            </p>
            <div className="mt-8 flex flex-wrap items-center gap-3.5 lg:mt-[27px]">
              <PillButton
                label="Request a Quote"
                href="/contact"
                variant="hero"
              />
              <GhostPill label="Download Sheet" href="/contact" />
            </div>
          </div>

          {/* Photo + spec chips */}
          <RevealRow>
            <RevealItem preset="image">
              <div className="relative aspect-[880/520] w-full overflow-hidden rounded-[24px] bg-bg-sunken lg:rounded-[32px]">
                <Image
                  src={service.bannerImage.src}
                  alt={service.bannerImage.alt}
                  fill
                  priority
                  sizes="(max-width: 1024px) 100vw, 880px"
                  className="object-cover"
                />

                <ul className="absolute inset-x-4 bottom-4 flex flex-wrap items-center gap-2.5 lg:inset-x-8 lg:bottom-[27px] lg:gap-3.5">
                  {service.heroStats.map((stat) => (
                    <li
                      key={stat.value + stat.label}
                      className="flex flex-col gap-0.5 rounded-[16px] bg-white/[0.92] px-3.5 py-2.5 font-body text-sm leading-[1.5] shadow-[0px_6px_20px_0px_rgba(0,0,0,0.12)] backdrop-blur-sm lg:px-[18px] lg:py-3 lg:text-base"
                    >
                      <span className="text-green-primary">{stat.value}</span>
                      <span className="text-text-secondary">{stat.label}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </RevealItem>
          </RevealRow>
        </div>
      </Container>
    </section>
  );
}
