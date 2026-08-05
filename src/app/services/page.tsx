import type { Metadata } from "next";
import { ServiceHero } from "@/components/services/service-hero";
import { WhyChooseUs } from "@/components/services/why-choose-us";
import { ServicesGrid } from "@/components/services/services-grid";
import { BenefitsSection } from "@/components/services/benefits-section";
import { SiteFooter } from "@/components/layout/site-footer";

export const metadata: Metadata = {
  title: "Services — PrimeNMS | Steel Building Solutions",
  description:
    "Pre-engineered buildings, sandwich PUF panels, roofing & wall sheets, doors & windows, cold room panels and custom fabrication — galvanized steel solutions manufactured and delivered end to end across India.",
  openGraph: {
    title: "PrimeNMS Services",
    description:
      "Engineering steel solutions for every kind of build — one manufacturer, end to end.",
    type: "website",
  },
};

export default function ServicesPage() {
  return (
    <>
      <main className="flex-1">
        <ServiceHero />
        <WhyChooseUs />
        <ServicesGrid />
        <BenefitsSection />
      </main>
      <SiteFooter />
    </>
  );
}
