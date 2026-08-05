"use client";

import Image from "next/image";
import { Container } from "@/components/layout/container";
import { PillButton } from "@/components/ui/pill-button";
import { AvatarStack } from "@/components/ui/avatar-stack";
import {
  BlurRevealHeading,
  blurRevealDuration,
} from "@/components/ui/blur-reveal-heading";
import { RevealRow, RevealItem } from "@/components/ui/reveal-row";
import { useHeroHandoff } from "@/components/ui/hero-handoff";
import facility from "../../../public/images/featured-facility.jpg";
import avatar1 from "../../../public/images/avatar-1.png";
import avatar2 from "../../../public/images/avatar-2.png";
import avatar3 from "../../../public/images/avatar-3.png";
import avatar4 from "../../../public/images/avatar-4.png";

/** A newline forces the Figma line break; words stagger across both lines. */
const HEADING = "Experience Excellence In\nGalvanized Steel Manufacturing";

/** Wait for the last word to land before the row below starts moving. */
const ROW_DELAY = blurRevealDuration(HEADING.split(/\s+/).length);

const FEATURES = [
  {
    title: "Precision Engineering",
    body: "Every structure engineered to exact PEB tolerances for load and longevity.",
  },
  {
    title: "Galvanized Durability",
    body: "Zinc-coated steel that resists corrosion and outlasts conventional builds.",
  },
];

const AVATARS = [
  { src: avatar1, alt: "Client" },
  { src: avatar2, alt: "Client" },
  { src: avatar3, alt: "Client" },
  { src: avatar4, alt: "Client" },
];

/**
 * 02 — Experience Excellence.
 *
 * This section *is* the hero's white screen. `HeroHandoff` parks it so that it
 * fills the viewport on the exact frame the banner's dissolve completes, which
 * is also the frame `hasLanded` flips — so the reveals below start from a white
 * screen that is already this section, with everything in its final position.
 *
 * The handoff drives them rather than the viewport: these elements are on
 * screen (behind the hero, withheld) well before the swap, so an in-view
 * trigger would fire early and the animation would be over before anyone could
 * see it. The heading goes first, the row follows once the last word lands.
 */
export function ExperienceSection() {
  const hasLanded = useHeroHandoff();

  return (
    <section className="bg-bg-base py-24 lg:py-32">
      <Container>
        <BlurRevealHeading
          text={HEADING}
          active={hasLanded}
          className="mx-auto max-w-[660px] text-center font-heading text-3xl font-semibold leading-[1.15] tracking-[-0.44px] text-text-primary sm:text-4xl lg:text-[44px]"
        />

        <RevealRow
          active={hasLanded}
          delay={ROW_DELAY}
          className="mt-16 flex flex-col items-center gap-12 lg:mt-20 lg:flex-row lg:items-center lg:justify-between lg:gap-10"
        >
          {/* Left — trusted partner */}
          <RevealItem
            preset="left"
            className="order-2 w-full max-w-[360px] lg:order-1"
          >
            <h3 className="font-body text-[28px] font-medium leading-[1.15] tracking-[-0.28px] text-text-primary">
              Your Trusted Partner in Pre-Engineered Building
            </h3>
            <p className="mt-4 text-base leading-[1.5] text-text-secondary">
              At PrimeNMS, we combine steel manufacturing strength with
              engineering precision to deliver durable, on-time galvanized
              buildings.
            </p>
            <div className="mt-8">
              <PillButton label="About Us" href="/about" variant="green" />
            </div>
          </RevealItem>

          {/* Center — featured facility */}
          <RevealItem
            preset="image"
            className="relative order-1 aspect-[536/526] w-full max-w-[536px] shrink-0 overflow-hidden rounded-[24px] lg:order-2"
          >
            <Image
              src={facility}
              alt="Galvanized steel structural framework under construction"
              fill
              sizes="(max-width: 1024px) 100vw, 536px"
              className="object-cover"
            />
          </RevealItem>

          {/* Right — feature list */}
          <RevealItem preset="right" className="order-3 w-full max-w-[400px]">
            {FEATURES.map((f) => (
              <div key={f.title} className="mb-8 last:mb-0">
                <h3 className="font-body text-[28px] font-medium leading-[1.15] tracking-[-0.28px] text-text-primary">
                  {f.title}
                </h3>
                <p className="mt-2 text-base leading-[1.5] text-text-secondary">
                  {f.body}
                </p>
              </div>
            ))}
            <p className="mt-8 text-base leading-[1.5] text-text-primary">
              Trusted by 500+ project clients
            </p>
            <AvatarStack avatars={AVATARS} className="mt-4" />
          </RevealItem>
        </RevealRow>
      </Container>
    </section>
  );
}
