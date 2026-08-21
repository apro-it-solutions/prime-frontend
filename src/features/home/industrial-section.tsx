import type { StaticImageData } from "next/image";
import { Container } from "@/components/layout/container";
import { ScrollImageReveal } from "@/components/ui/scroll-image-reveal";
import { RevealRow, RevealItem } from "@/components/ui/reveal-row";
import { cn } from "@/lib/utils";
import warehouse from "../../../public/images/band-warehouse.png";
import industrial from "../../../public/images/band-industrial.png";

interface Band {
  image: StaticImageData;
  alt: string;
  heading: string;
  body: string;
  align: "left" | "right";
}

const WAREHOUSE: Band = {
  image: warehouse,
  alt: "Aerial view of a high-performance warehouse facility",
  heading: "Warehouse",
  body: "High-performance warehouses designed to maximize storage capacity, streamline operations, and support modern supply chain requirements with durable galvanized steel construction.",
  align: "right",
};

const INDUSTRIAL: Band = {
  image: industrial,
  alt: "Custom-built industrial facility at dusk",
  heading: "Industrial Buildings",
  body: "Custom-built industrial facilities that provide large clear spans, structural reliability, and efficient workflows for factories, processing plants, and production units.",
  align: "left",
};

/** Seconds the band copy takes to rise into place. */
const COPY_DURATION = 0.9;

/** Gap between the heading landing and the description following it. */
const COPY_STAGGER = 0.15;

/** Copy laid over a band, plus the gradient that keeps it legible. */
function BandCopy({ band, reveal }: { band: Band; reveal?: boolean }) {
  const copy = (
    <>
      <h2 className="font-heading text-4xl font-semibold leading-[1.1] tracking-[-0.5px] text-white sm:text-5xl lg:text-[56px]">
        {band.heading}
      </h2>
      <p className="mt-5 text-base leading-[1.6] text-bg-base lg:text-lg">
        {band.body}
      </p>
    </>
  );

  const blockClass = cn("max-w-[610px]", band.align === "right" && "lg:ml-auto");

  return (
    <>
      <div
        aria-hidden="true"
        className="absolute inset-0 bg-gradient-to-t from-black/75 via-black/20 to-transparent"
      />
      <Container className="relative flex h-full flex-col justify-end pb-16 lg:pb-24">
        {reveal ? (
          // Viewport-driven and `once: false`, so the copy replays every time
          // the band is scrolled back into view. The heading leads; the
          // description follows a beat later.
          <RevealRow className={blockClass} stagger={COPY_STAGGER}>
            <RevealItem preset="up" duration={COPY_DURATION}>
              <h2 className="font-heading text-4xl font-semibold leading-[1.1] tracking-[-0.5px] text-white sm:text-5xl lg:text-[56px]">
                {band.heading}
              </h2>
            </RevealItem>
            <RevealItem preset="up" duration={COPY_DURATION} className="mt-5">
              <p className="text-base leading-[1.6] text-bg-base lg:text-lg">
                {band.body}
              </p>
            </RevealItem>
          </RevealRow>
        ) : (
          <div className={blockClass}>{copy}</div>
        )}
      </Container>
    </>
  );
}

/**
 * 03 — Warehouse & Industrial Buildings showcase.
 *
 * Two full-bleed bands where the second climbs over the first as the section is
 * scrolled, masked so it is only ever seen from the bottom edge up. The copy is
 * part of its own band rather than a layer that fades in on top, so it arrives
 * composed against its photograph and moves with it.
 *
 * The dark background is what shows in the sliver between `100svh` and the real
 * viewport when a mobile browser's toolbar retracts mid-scroll — matching the
 * bands' own darkness keeps that invisible.
 */
export function IndustrialSection() {
  return (
    <ScrollImageReveal
      className="bg-text-primary"
      base={{
        image: WAREHOUSE.image,
        alt: WAREHOUSE.alt,
        children: <BandCopy band={WAREHOUSE} reveal />,
      }}
      reveal={{
        image: INDUSTRIAL.image,
        alt: INDUSTRIAL.alt,
        children: <BandCopy band={INDUSTRIAL} />,
      }}
    />
  );
}
