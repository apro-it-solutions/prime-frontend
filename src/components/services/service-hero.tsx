import Image from "next/image";
import { SiteHeader } from "@/components/layout/site-header";
import { Container } from "@/components/layout/container";
import { PillButton } from "@/components/ui/pill-button";
import heroAerial from "../../../public/images/hero-aerial.png";

/**
 * 01 — Services Hero. Fixed-height (720px desktop) aerial banner with the shared
 * header overlaid, headline + CTA on the left and a highlight stat on the right.
 */
export function ServiceHero() {
  return (
    <section className="relative flex min-h-[560px] w-full flex-col overflow-hidden bg-[#111] lg:h-[720px] lg:min-h-0">
      <Image
        src={heroAerial}
        alt="Aerial view of a PrimeNMS galvanized steel manufacturing facility"
        fill
        priority
        sizes="100vw"
        className="object-cover"
      />
      <div
        aria-hidden="true"
        className="absolute inset-0"
        style={{
          backgroundImage:
            "linear-gradient(180deg, rgba(0,0,0,0.72) 0%, rgba(0,0,0,0) 26%), linear-gradient(180deg, rgba(0,0,0,0) 40%, rgba(0,0,0,0.62) 100%)",
        }}
      />

      <SiteHeader />

      <Container className="relative z-10 flex flex-1 flex-col justify-end pb-14 pt-40 lg:pb-[60px]">
        <div className="flex flex-col gap-10 lg:flex-row lg:items-end lg:justify-between lg:gap-12">
          {/* Headline + CTA */}
          <div className="max-w-[680px]">
            <h1 className="font-display text-[2.5rem] font-semibold leading-[1.15] tracking-[-0.72px] text-white sm:text-6xl lg:text-[72px]">
              Engineering steel solutions for every kind of build.
            </h1>
            <p className="mt-6 max-w-[680px] font-body text-lg leading-[1.65] text-white/85">
              From pre-engineered buildings to insulated panels, roofing systems
              and custom fabrication — one manufacturer, end to end.
            </p>
            <div className="mt-8">
              <PillButton label="Request a Quote" href="/contact" />
            </div>
          </div>

          {/* Highlight stat */}
          <div className="w-full max-w-[300px] shrink-0">
            <p className="font-heading text-[28px] font-semibold leading-[1.2] tracking-[-0.28px] text-white">
              11+ product lines
            </p>
            <p className="mt-2 font-body text-base leading-[1.5] text-white/80">
              Delivered across India, engineered in-house.
            </p>
          </div>
        </div>
      </Container>
    </section>
  );
}
