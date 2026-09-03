import type { Metadata } from "next";
import { ServiceHero } from "@/components/services/service-hero";
import { WhyChooseUs } from "@/components/services/why-choose-us";
import { ServicesGrid } from "@/components/services/services-grid";
import { BenefitsSection } from "@/components/services/benefits-section";
import { SiteFooter } from "@/components/layout/site-footer";
import { PageFadeUp } from "@/components/ui/page-fade-up";

export const metadata: Metadata = {
  title: "Services — Prime NMS | Steel Building Solutions",
  description:
    "Pre-engineered and high-rise steel buildings, insulated sandwich and rockwool panels, Aquaproof and stone coated roofing, Zenith automated doors, cold room panels and custom fabrication — engineered and manufactured end to end since 1985.",
  openGraph: {
    title: "Prime NMS Services",
    description:
      "Engineering steel solutions for every kind of build — one group, end to end.",
    type: "website",
  },
};

export default function ServicesPage() {
  return (
    <>
      <PageFadeUp className="flex-1">
        <ServiceHero />
        <WhyChooseUs />
        <ServicesGrid />
        <BenefitsSection />
      </PageFadeUp>
      <SiteFooter />
    </>
  );
}
