"use client";

import Image from "next/image";
import { Container } from "@/components/layout/container";
import { PillButton } from "@/components/ui/pill-button";
import { AvatarStack } from "@/components/ui/avatar-stack";
import { BlurRevealHeading } from "@/components/ui/blur-reveal-heading";
import { RevealRow, RevealItem, RevealChild } from "@/components/ui/reveal-row";
import { useHeroHandoff } from "@/components/ui/hero-handoff";
import facility from "../../../public/images/featured-facility.jpg";
import avatar1 from "../../../public/images/avatar-1.png";
import avatar2 from "../../../public/images/avatar-2.png";
import avatar3 from "../../../public/images/avatar-3.png";
import avatar4 from "../../../public/images/avatar-4.png";

/** A newline forces the Figma line break; words stagger across both lines. */
const HEADING = "Experience Excellence In\nGalvanized Steel Manufacturing";

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

/**
 * Gap between the beats inside a copy column. Small enough that the column
 * still reads as one movement arriving, not a list being typed out.
 */
const CHILD_STAGGER = 0.12;

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
 * The handoff drives the reveal rather than the viewport: these elements are on
 * screen (behind the hero, withheld) well before the swap, so an in-view
 * trigger would fire early and the animation would be over before anyone could
 * see it. `hasLanded` flips on the frame the section actually becomes visible —
 * that *is* this section's viewport entry — and flips back on the way out, so
 * the reveal replays every time the user scrolls into it.
 *
 * Heading and row start on the same frame: both read `hasLanded` directly and
 * neither holds a delay, so the section resolves as one arrival rather than a
 * sequence. The heading keeps its own blur-to-sharp word cadence — that is the
 * animation itself, not a delay in front of the row.
 *
 * The three blocks below start together (`stagger={0}`) but travel differently:
 * the centre image fades up from slightly below, and the copy columns come in
 * from the outside edges toward it — left column from the left, right column
 * from the right — so the row closes inward on the image. Each column cascades
 * its own children a beat apart rather than sliding in as a slab.
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
          stagger={0}
          className="mt-16 flex flex-col items-center gap-12 lg:mt-20 lg:flex-row lg:items-center lg:justify-between lg:gap-10"
        >
          {/* Left — trusted partner. Slides in from the left, heading first. */}
          <RevealItem
            preset="left"
            stagger={CHILD_STAGGER}
            className="order-2 w-full max-w-[360px] lg:order-1"
          >
            <RevealChild>
              <h3 className="font-body text-[28px] font-medium leading-[1.15] tracking-[-0.28px] text-text-primary">
                Your Trusted Partner in Pre-Engineered Building
              </h3>
            </RevealChild>
            <RevealChild className="mt-4">
              <p className="text-base leading-[1.5] text-text-secondary">
                At PrimeNMS, we combine steel manufacturing strength with
                engineering precision to deliver durable, on-time galvanized
                buildings.
              </p>
            </RevealChild>
            <RevealChild className="mt-8">
              <PillButton label="About Us" href="/about" variant="green" />
            </RevealChild>
          </RevealItem>

          {/* Center — featured facility. Fades up from slightly below. */}
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

          {/* Right — feature list. Slides in from the right, feature by feature. */}
          <RevealItem
            preset="right"
            stagger={CHILD_STAGGER}
            className="order-3 w-full max-w-[400px]"
          >
            {FEATURES.map((f) => (
              <RevealChild key={f.title} className="mb-8 last:mb-0">
                <h3 className="font-body text-[28px] font-medium leading-[1.15] tracking-[-0.28px] text-text-primary">
                  {f.title}
                </h3>
                <p className="mt-2 text-base leading-[1.5] text-text-secondary">
                  {f.body}
                </p>
              </RevealChild>
            ))}
            <RevealChild className="mt-8">
              <p className="text-base leading-[1.5] text-text-primary">
                Trusted by 500+ project clients
              </p>
            </RevealChild>
            <RevealChild className="mt-4">
              <AvatarStack avatars={AVATARS} />
            </RevealChild>
          </RevealItem>
        </RevealRow>
      </Container>
    </section>
  );
}
