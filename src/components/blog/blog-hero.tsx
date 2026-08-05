import Image from "next/image";
import { SiteHeader } from "@/components/layout/site-header";
import { Container } from "@/components/layout/container";
import heroAerial from "../../../public/images/hero-aerial.png";

/**
 * 00 — Blog Hero. Full-bleed darkened editorial banner with the shared header
 * overlaid, centered title block and an "Updated weekly" chip at the base.
 */
export function BlogHero() {
  return (
    <section className="relative flex min-h-[560px] w-full flex-col overflow-hidden bg-[#111] lg:h-[673px] lg:min-h-0">
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

      <div className="relative z-10 flex flex-1 flex-col items-center justify-center px-6 pb-28 pt-32 text-center">
        <p className="font-heading text-[13px] font-medium uppercase tracking-[1.2px] text-white/85">
          PrimeNMS Journal
        </p>
        <h1 className="mt-3 font-heading text-4xl font-semibold leading-[1.15] tracking-[-0.64px] text-white sm:text-5xl lg:text-[64px]">
          News, insights &amp;
          <br />
          build stories.
        </h1>
        <p className="mt-5 max-w-[400px] font-body text-lg leading-[1.65] text-white/90">
          Field notes on steel construction, engineering deep-dives and the
          projects we&apos;re proud of.
        </p>
      </div>

      <Container className="relative z-10 pb-8">
        <span className="inline-flex items-center gap-2 rounded-full border border-white/25 bg-white/15 px-4 py-2 font-heading text-[13px] font-medium text-white backdrop-blur-sm">
          <span
            aria-hidden="true"
            className="size-2 rounded-full bg-green-accent-light"
          />
          Updated weekly
        </span>
      </Container>
    </section>
  );
}
