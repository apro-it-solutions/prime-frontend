import { Hero } from "@/features/home/hero";
import { TestimonialsSection } from "@/features/home/testimonials-section";
import { ExperienceSection } from "@/features/home/experience-section";
import { IndustrialSection } from "@/features/home/industrial-section";
import { ProductsSection } from "@/features/home/products-section";
import { CtaSection } from "@/features/home/cta-section";
import { HeroHandoff } from "@/components/ui/hero-handoff";
import { SiteFooter } from "@/components/layout/site-footer";

export default function HomePage() {
  return (
    <>
      <main className="flex-1">
        <Hero />
        {/* Takes the screen the instant the hero finishes dissolving into it. */}
        <HeroHandoff>
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
