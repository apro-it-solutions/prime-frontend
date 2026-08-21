import Image from "next/image";
import { SiteHeader } from "@/components/layout/site-header";
import { Container } from "@/components/layout/container";
import { FadeUpGroup, FadeUpItem } from "@/components/ui/fade-up-group";
import { SELF_REVEAL_ATTR } from "@/lib/reveal";
import heroAerial from "../../../public/images/hero-aerial.png";

/**
 * 00 — Blog Hero. Full-bleed darkened editorial banner with the shared header
 * overlaid, centered title block and an "Updated weekly" chip at the base.
 *
 * The title block arrives in turn — eyebrow, headline, standfirst, then the
 * chip — while the banner and the header over it stay put.
 */
export function BlogHero() {
  return (
    <section
      {...{ [SELF_REVEAL_ATTR]: "" }}
      className="relative flex min-h-[560px] w-full flex-col overflow-hidden bg-[#111] lg:h-[673px] lg:min-h-0"
    >
      <Image
        src={heroAerial}
        alt=""
        aria-hidden="true"
        fill
        priority
        sizes="100vw"
        className="object-cover"
      />
      <div aria-hidden="true" className="absolute inset-0 bg-black/[0.67]" />

      <SiteHeader />

      <FadeUpGroup className="relative z-10 flex flex-1 flex-col">
        <div className="flex flex-1 flex-col items-center justify-center px-6 pb-28 pt-32 text-center">
          <FadeUpItem>
            <p className="font-heading text-[13px] font-medium uppercase tracking-[1.2px] text-white/85">
              Prime NMS Journal
            </p>
          </FadeUpItem>
          <FadeUpItem className="mt-3">
            <h1 className="font-heading text-[32px] font-semibold leading-[1.15] tracking-[-0.64px] text-white sm:text-[44px] lg:text-[56px]">
              News, insights &amp;
              <br />
              build stories.
            </h1>
          </FadeUpItem>
          <FadeUpItem className="mt-5 max-w-[400px]">
            <p className="font-body text-lg leading-[1.65] text-white/90">
              Field notes on steel construction, engineering deep-dives and the
              projects we&apos;re proud of.
            </p>
          </FadeUpItem>
        </div>

        <Container className="pb-8">
          <FadeUpItem>
            <span className="inline-flex items-center gap-2 rounded-full border border-white/25 bg-white/15 px-4 py-2 font-heading text-[13px] font-medium text-white backdrop-blur-sm">
              <span
                aria-hidden="true"
                className="size-2 rounded-full bg-green-accent-light"
              />
              Updated weekly
            </span>
          </FadeUpItem>
        </Container>
      </FadeUpGroup>
    </section>
  );
}
