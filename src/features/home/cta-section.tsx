import Image from "next/image";
import { Container } from "@/components/layout/container";
import { PillButton } from "@/components/ui/pill-button";
import ctaBuilding from "../../../public/images/cta-building.png";

/** 08 — Start Your Project (CTA band). */
export function CtaSection() {
  return (
    <section className="bg-green-soft py-20 lg:py-[86px]">
      <Container>
        <div className="overflow-hidden rounded-[28px] bg-text-primary">
          <div className="flex flex-col lg:flex-row lg:items-stretch">
            {/* Building image */}
            <div className="relative h-64 w-full shrink-0 sm:h-80 lg:h-[633px] lg:w-[800px]">
              <Image
                src={ctaBuilding}
                alt="Aerial view of a completed prime warehouse project"
                fill
                sizes="(max-width: 1024px) 100vw, 800px"
                className="object-cover"
              />
            </div>

            {/* Copy */}
            <div className="flex flex-1 flex-col items-start justify-center gap-5 px-8 py-12 lg:px-[60px]">
              <h2 className="font-heading text-4xl font-semibold leading-[1.15] tracking-[-0.48px] text-white lg:text-[48px]">
                Start Your Project
                <br />
                With PrimeNMS
              </h2>
              <p className="max-w-[560px] text-base leading-[1.5] text-white/75">
                Send us your building requirements and our team will prepare a
                quote — from foundation to commissioning.
              </p>
              <PillButton label="Get Started" href="/contact" />
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
}
