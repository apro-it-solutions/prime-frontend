import type { Metadata } from "next";
import { ContactHero } from "@/components/contact/contact-hero";
import { GetInTouch } from "@/components/contact/get-in-touch";
import { VisitUs } from "@/components/contact/visit-us";
import { SiteFooter } from "@/components/layout/site-footer";

export const metadata: Metadata = {
  title: "Contact — PrimeNMS | Request a Quote",
  description:
    "Talk to the PrimeNMS team about your pre-engineered galvanized steel building. Tell us your requirements and we'll get back within one business day with a quote and next steps.",
  openGraph: {
    title: "Contact PrimeNMS",
    description:
      "Let's build something that lasts. Request a quote from foundation to commissioning.",
    type: "website",
  },
};

export default function ContactPage() {
  return (
    <>
      <main className="flex-1">
        <ContactHero />
        <GetInTouch />
        <VisitUs />
      </main>
      <SiteFooter />
    </>
  );
}
