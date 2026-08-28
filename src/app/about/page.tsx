import type { Metadata } from "next";
import { AboutHero } from "@/features/about/about-hero";
import { OurStory } from "@/features/about/our-story";
import { VisionMission } from "@/features/about/vision-mission";
import { TestimonialsSection } from "@/features/home/testimonials-section";
import { ValuesSection } from "@/features/about/values-section";
import { AboutLeadership } from "@/features/about/about-leadership";
import { AboutCta } from "@/features/about/about-cta";
import { SiteFooter } from "@/components/layout/site-footer";
import { PageFadeUp } from "@/components/ui/page-fade-up";

export const metadata: Metadata = {
  title: "About — Prime NMS | The Galvanized Building Specialist",
  description:
    "Prime NMS is a joint venture of New Malayalam Steel and Prime Group, manufacturing durable galvanized pre-engineered buildings from a single facility in Karnataka, delivered on time across India.",
  openGraph: {
    title: "About Prime NMS",
    description:
      "Building India's future, one structure at a time. A joint venture of steel and engineering.",
    type: "website",
  },
};

export default function AboutPage() {
  return (
    <>
      <PageFadeUp className="flex-1">
        <AboutHero />
        <OurStory />
        <VisionMission />
        {/* Same backend-driven section as the home page, with the about band's
            lighter wash, flat card, and solid accent dot. */}
        <TestimonialsSection
          overlayClassName="bg-[rgba(15,93,70,0.43)]"
          cardClassName=""
          dotClassName="bg-green-accent"
        />
        <ValuesSection />
        <AboutLeadership />
        <AboutCta />
      </PageFadeUp>
      <SiteFooter />
    </>
  );
}
