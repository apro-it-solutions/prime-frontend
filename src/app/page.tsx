import { Hero } from "@/features/home/hero";
import { TestimonialsSection } from "@/features/home/testimonials-section";
import { ExperienceSection } from "@/features/home/experience-section";
import { IndustrialSection } from "@/features/home/industrial-section";
import { ProductsSection } from "@/features/home/products-section";
import { CtaSection } from "@/features/home/cta-section";
import { HeroHandoff } from "@/components/ui/hero-handoff";
import { StickyHeader } from "@/components/layout/sticky-header";
import { SiteFooter } from "@/components/layout/site-footer";

export default function HomePage() {
  return (
    <>
      <main className="flex-1">
        <Hero />
        {/* Takes the screen the instant the hero finishes dissolving into it. */}
        <HeroHandoff>
          {/* Fixed, so it sits inside the handoff only to read the frame the
              banner stops owning the screen — it adds nothing to the flow. */}
          <StickyHeader />
          <ExperienceSection />
        </HeroHandoff>
        <IndustrialSection />
        <ProductsSection />
        <TestimonialsSection />
        <CtaSection />
      </main>
      <SiteFooter />
    </>
  );
}
