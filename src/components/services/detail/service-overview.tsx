import Image from "next/image";
import { Container } from "@/components/layout/container";
import { SectionEyebrow } from "@/components/services/section-eyebrow";
import { BlurRevealHeading } from "@/components/ui/blur-reveal-heading";
import { RevealRow, RevealItem } from "@/components/ui/reveal-row";
import { ServiceFeatureCard } from "./service-feature-card";
import type { ServiceFeature, ServiceImage } from "../services-data";

/**
 * 03 — Overview (Figma 161:268): eyebrow + two-line section heading, then the
 * lead card beside a 1076×380 photo, with the three-card feature strip below.
 *
 * The 620/1076 split from the design is kept as a fractional grid so the row
 * holds its proportions at any width, and stacks below `lg`.
 *
 * Takes the selected tab's content rather than a whole service: this section is
 * re-rendered every time a sub-service tab changes.
 */
export function ServiceOverview({
  heading,
  lead,
  features,
  image,
}: {
  /** A newline forces the Figma's two-line break. */
  heading: string;
  lead: ServiceFeature;
  features: ServiceFeature[];
  image: ServiceImage;
}) {
  return (
    <section className="bg-bg-base pb-16 pt-6 lg:pb-[88px] lg:pt-[30px]">
      <Container>
        <SectionEyebrow
          label="Overview"
          variant="plain"
          className="text-green-accent"
        />
        <BlurRevealHeading
          text={heading}
          className="mt-3.5 max-w-[735px] font-heading text-[34px] font-semibold leading-[1.15] tracking-[-0.56px] text-text-primary sm:text-[44px] lg:text-[56px]"
        />

        <RevealRow className="mt-8 grid gap-6 lg:mt-[30px] lg:grid-cols-[620fr_1076fr] lg:items-stretch">
          <RevealItem preset="left" className="lg:min-h-[380px]">
            <ServiceFeatureCard feature={lead} size="lead" />
          </RevealItem>

          <RevealItem preset="image" className="lg:min-h-[380px]">
            <div className="relative aspect-[1076/380] min-h-[220px] w-full overflow-hidden rounded-[24px] bg-bg-sunken lg:h-full lg:min-h-[380px] lg:aspect-auto">
              <Image
                src={image.src}
                alt={image.alt}
                fill
                sizes="(max-width: 1024px) 100vw, 1076px"
                className="object-cover"
              />
            </div>
          </RevealItem>
        </RevealRow>

        <RevealRow
          className="mt-6 grid gap-6 sm:grid-cols-2 lg:grid-cols-3"
          delay={0.1}
        >
          {features.map((feature) => (
            <RevealItem key={feature.title} preset="image">
              <ServiceFeatureCard
                feature={feature}
                className="lg:min-h-[220px]"
              />
            </RevealItem>
          ))}
        </RevealRow>
      </Container>
    </section>
  );
}
