import Image from "next/image";
import { SiteHeader } from "@/components/layout/site-header";
import { Container } from "@/components/layout/container";
import { FadeUpGroup, FadeUpItem } from "@/components/ui/fade-up-group";
import { SELF_REVEAL_ATTR } from "@/lib/reveal";
import heroAerial from "../../../public/images/hero-aerial.png";

/**
 * 01 — About Hero. A fixed-height (720px on desktop) aerial banner with the
 * shared header overlaid and the page headline anchored bottom-left.
 *
 * The headline fades up on its own; the banner and the header over it stay put.
 */
export function AboutHero() {
  return (
    <section
      {...{ [SELF_REVEAL_ATTR]: "" }}
      className="relative flex min-h-[520px] w-full flex-col overflow-hidden bg-[#111] lg:h-[720px] lg:min-h-0"
    >
      <Image
        src={heroAerial}
        alt="Aerial view of a Prime NMS galvanized steel manufacturing facility"
        fill
        priority
        sizes="100vw"
        className="object-cover"
      />
      {/* Legibility gradients: top fade for the nav, darker weight at the base. */}
      <div
        aria-hidden="true"
        className="absolute inset-0"
        style={{
          backgroundImage:
            "linear-gradient(180deg, rgba(0,0,0,0.72) 0%, rgba(0,0,0,0) 26%), linear-gradient(180deg, rgba(0,0,0,0) 40%, rgba(0,0,0,0.62) 100%)",
        }}
      />

      <SiteHeader />

      <Container className="relative z-10 flex flex-1 flex-col justify-end pb-14 pt-40 lg:pb-[92px]">
        <FadeUpGroup>
          <FadeUpItem>
            <h1 className="max-w-[970px] font-display text-[32px] font-semibold leading-[1.15] tracking-[-0.72px] text-white sm:text-[44px] lg:text-[56px]">
              Building India&apos;s future,
              <br className="hidden sm:block" /> one structure at a time.
            </h1>
          </FadeUpItem>
        </FadeUpGroup>
      </Container>
    </section>
  );
}
