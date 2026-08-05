import { SiteHeader } from "@/components/layout/site-header";
import { Container } from "@/components/layout/container";
import { PillButton } from "@/components/ui/pill-button";
import { ScrollImageSequence } from "@/components/ui/scroll-image-sequence";
import { HeroStats } from "./hero-stats";

/** `/public/banner-sequence/hero_00000.webp` … `hero_00359.webp` */
const HERO_FRAME_COUNT = 360;

/**
 * 01 — Hero. The aerial background is a scroll-driven 360-frame sequence: the
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

      <Container className="relative z-20 flex h-full flex-col justify-end pb-16 pt-40 lg:pb-[13%]">
        <div className="flex flex-col gap-12 lg:flex-row lg:items-end lg:justify-between lg:gap-8">
          {/* Headline */}
          <div className="max-w-[864px]">
            <p className="font-display text-lg leading-[1.65] text-white sm:text-xl">
              PRE-ENGINEERED · GALVANIZED · BUILT TO LAST
            </p>
            <h1 className="mt-3 font-display text-[2.75rem] font-semibold leading-[1.15] tracking-[-0.72px] text-white sm:text-6xl lg:text-[72px]">
              We Don&apos;t Follow the Future. We Build It.
            </h1>
            <div className="mt-6">
              <PillButton label="Explore Our Services" href="/services" />
            </div>
          </div>

          {/* Stats */}
          <HeroStats className="shrink-0" />
        </div>
      </Container>
    </ScrollImageSequence>
  );
}
