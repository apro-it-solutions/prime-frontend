import { SiteHeader } from "@/components/layout/site-header";
import { Container } from "@/components/layout/container";
import { ScrollImageSequence } from "@/components/ui/scroll-image-sequence";
import { HeroCopy } from "./hero-copy";

/** `/public/banner-sequence/hero_00000.webp` … `hero_00623.webp` */
const HERO_FRAME_COUNT = 624;

/**
 * 01 — Hero. The aerial background is a scroll-driven 624-frame sequence: the
 * banner pins for a 300vh runway while scrolling scrubs the footage, then
 * releases into the next section. Copy and header ride along on the sticky
 * layer.
 */
export function Hero() {
  return (
    <ScrollImageSequence
      frameCount={HERO_FRAME_COUNT}
      alt="Aerial view of a prime galvanized steel manufacturing facility"
      basePath="/banner-sequence"
      filePrefix="hero_"
      fileExtension="webp"
      padding={5}
      scrollHeight="300vh"
      className="bg-[#111]"
    >
      {/* Exact Figma legibility gradients (top + bottom fades) */}
      <div
        aria-hidden="true"
        className="absolute inset-0 z-10"
        style={{
          backgroundImage:
            "linear-gradient(180deg, rgba(0,0,0,0.83) 0%, rgba(0,0,0,0) 22.48%), linear-gradient(180deg, rgba(0,0,0,0) 0.54%, rgba(0,0,0,0.54) 99.45%)",
        }}
      />

      <SiteHeader />

      {/* The copy layer fills the banner so each text group can anchor itself —
          bottom-left, or centred against the right edge. The padding here is
          what keeps every group clear of the edges, and `pt-40` reserves the
          band the header floats over. Fixed spacing rather than a percentage:
          a percentage padding resolves against the container's *width*, so the
          copy would sit at a different height on every viewport. */}
      <Container className="relative z-20 h-full pb-16 pt-40 lg:pb-24">
        <HeroCopy className="relative h-full" />
      </Container>
    </ScrollImageSequence>
  );
}
