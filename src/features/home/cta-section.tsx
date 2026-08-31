import Image from "next/image";
import { Container } from "@/components/layout/container";
import { PillButton } from "@/components/ui/pill-button";
import { FadeUpGroup, FadeUpItem } from "@/components/ui/fade-up-group";
import ctaBuilding from "../../../public/images/cta-building.png";

/**
 * 08 — Start Your Project (CTA band).
 *
 * The copy column arrives as one staggered fade-up the first time it comes into
 * view — heading, then the paragraph, then the button. Everything around it
 * stays put: the card, its radius and background, and the building image.
 */
export function CtaSection() {
  return (
    <section className="bg-green-soft py-20 lg:py-[86px]">
      <Container>
        <div className="overflow-hidden rounded-[28px] bg-text-primary">
          <div className="flex flex-col xl:flex-row xl:items-stretch">
            {/* Building image — static; only the copy beside it animates. */}
            <div className="relative h-64 w-full shrink-0 sm:h-80 xl:h-[520px] xl:w-[560px] 2xl:h-[633px] 2xl:w-[800px]">
              <Image
                src={ctaBuilding}
                alt="Aerial view of a completed prime warehouse project"
                fill
                sizes="(max-width: 1024px) 100vw, 800px"
                className="object-cover"
              />
            </div>

            {/* Copy */}
            <FadeUpGroup className="flex flex-1 flex-col items-start justify-center gap-5 px-8 py-12 xl:px-[60px]">
              <FadeUpItem>
                <h2 className="font-heading text-4xl font-semibold leading-[1.15] tracking-[-0.48px] text-white lg:text-[48px]">
                  Start Your Project
                  <br />
                  With Prime NMS
                </h2>
              </FadeUpItem>
              <FadeUpItem className="max-w-[560px]">
                <p className="text-base leading-[1.5] text-white/75">
                  Send us your building requirements and our team will prepare a
                  quote — from foundation to commissioning.
                </p>
              </FadeUpItem>
              <FadeUpItem>
                <PillButton label="Get Started" href="/contact" />
              </FadeUpItem>
            </FadeUpGroup>
          </div>
        </div>
      </Container>
    </section>
  );
}
