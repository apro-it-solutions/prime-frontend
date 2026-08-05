import type { Metadata } from "next";
import { AboutHero } from "@/features/about/about-hero";
import { OurStory } from "@/features/about/our-story";
import { VisionMission } from "@/features/about/vision-mission";
import { Testimonials } from "@/features/about/testimonials";
import { ValuesSection } from "@/features/about/values-section";
import { AboutLeadership } from "@/features/about/about-leadership";
import { AboutCta } from "@/features/about/about-cta";
import { SiteFooter } from "@/components/layout/site-footer";

export const metadata: Metadata = {
  title: "About — PrimeNMS | The Galvanized Building Specialist",
  description:
    "PrimeNMS is a joint venture of New Malayalam Steel and Prime Group, manufacturing durable galvanized pre-engineered buildings from a single facility in Kerala, delivered on time across India.",
  openGraph: {
    title: "About PrimeNMS",
    description:
      "Building India's future, one structure at a time. A joint venture of steel and engineering.",
    type: "website",
  },
};

export default function AboutPage() {
  return (
    <>
      <main className="flex-1">
        <AboutHero />
        <OurStory />
        <VisionMission />
        <Testimonials />
        <ValuesSection />
        <AboutLeadership />
        <AboutCta />
      </main>
      <SiteFooter />
    </>
  );
}
