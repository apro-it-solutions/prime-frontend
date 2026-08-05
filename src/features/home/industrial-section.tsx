import type { StaticImageData } from "next/image";
import { Container } from "@/components/layout/container";
import { ScrollImageReveal } from "@/components/ui/scroll-image-reveal";
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

/** Copy laid over a band, plus the gradient that keeps it legible. */
function BandCopy({ band }: { band: Band }) {
  return (
    <>
      <div
        aria-hidden="true"
        className="absolute inset-0 bg-gradient-to-t from-black/75 via-black/20 to-transparent"
      />
      <Container className="relative flex h-full flex-col justify-end pb-16 lg:pb-24">
        <div className={cn("max-w-[610px]", band.align === "right" && "lg:ml-auto")}>
          <h2 className="font-heading text-4xl font-semibold leading-[1.1] tracking-[-0.5px] text-white sm:text-5xl lg:text-[56px]">
            {band.heading}
          </h2>
          <p className="mt-5 text-base leading-[1.6] text-bg-base lg:text-lg">
            {band.body}
          </p>
        </div>
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
        children: <BandCopy band={WAREHOUSE} />,
      }}
      reveal={{
        image: INDUSTRIAL.image,
        alt: INDUSTRIAL.alt,
        children: <BandCopy band={INDUSTRIAL} />,
      }}
    />
  );
}
