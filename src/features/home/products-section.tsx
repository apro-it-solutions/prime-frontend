import { Container } from "@/components/layout/container";
import { CurvedRibbonCarousel } from "@/components/ui/curved-ribbon-carousel";
import { FadeUpGroup, FadeUpItem } from "@/components/ui/fade-up-group";
import product1 from "../../../public/images/product-1.png";
import product2 from "../../../public/images/product-2.png";
import product3 from "../../../public/images/product-3.png";
import product4 from "../../../public/images/product-4.png";

const PRODUCTS = [
  { src: product1, alt: "Aerial view of a completed warehouse project" },
  { src: product2, alt: "Interior of a pre-engineered steel building" },
  { src: product3, alt: "Galvanized steel roof structure" },
  { src: product4, alt: "Close-up of galvanized steel finish" },
];

/**
 * 05 — Explore Our Product Today.
 *
 * The copy fades up as the section arrives. The band below it does not: its
 * wrapper, track, dots and arrows all stay put, and the reveal happens a level
 * further in, card by card, on the carousel's own in-view trigger.
 */
export function ProductsSection() {
  return (
    <section className="bg-bg-base py-24 lg:py-32">
      <Container>
        <FadeUpGroup>
          <div className="flex flex-col gap-6 md:flex-row md:items-start md:justify-between">
            <FadeUpItem>
              <h2 className="font-heading text-4xl font-semibold leading-[1.15] tracking-[-0.48px] text-text-primary lg:text-[48px]">
                Explore Our
                <br />
                Product Today
              </h2>
            </FadeUpItem>
            <FadeUpItem className="max-w-[570px] md:pt-2">
              <p className="text-lg leading-[1.65] text-text-secondary">
                Explore our latest pre-engineered steel buildings delivered
                across India — from warehouses to industrial plants.
              </p>
            </FadeUpItem>
          </div>
        </FadeUpGroup>

        {/* Full-bleed: the ribbon's ends are meant to run past the container
            and dissolve, not stop at its gutters. */}
        <div className="mt-12 -mx-6 lg:-mx-8">
          <CurvedRibbonCarousel slides={PRODUCTS} />
        </div>
      </Container>
    </section>
  );
}
