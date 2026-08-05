import { Container } from "@/components/layout/container";
import { SectionEyebrow } from "./section-eyebrow";
import { ServiceCard, type Service } from "./service-card";
import pebImg from "../../../public/images/service-peb.png";
import pufImg from "../../../public/images/service-puf.png";
import roofingImg from "../../../public/images/service-roofing.png";
import doorsImg from "../../../public/images/service-doors.png";
import coldroomImg from "../../../public/images/service-coldroom.png";
import fabricationImg from "../../../public/images/service-fabrication.png";

const SERVICES: Service[] = [
  {
    title: "Pre-Engineered Buildings",
    description:
      "Clear-span galvanized steel structures for warehouses, factories and commercial builds.",
    image: pebImg,
    imageAlt: "Pre-engineered galvanized steel building structure",
  },
  {
    title: "Sandwich PUF Panels",
    description:
      "Insulated roof and wall panels for temperature control and energy efficiency.",
    image: pufImg,
    imageAlt: "Insulated sandwich PUF panels",
  },
  {
    title: "Roofing & Wall Sheets",
    description:
      "Aquaproof profiled sheets engineered for weather resistance and long life.",
    image: roofingImg,
    imageAlt: "Profiled roofing and wall sheets",
  },
  {
    title: "Doors & Windows",
    description:
      "Automated and manual steel doors, windows and rolling shutters.",
    image: doorsImg,
    imageAlt: "Industrial steel doors and windows",
  },
  {
    title: "Cold Room Panels",
    description:
      "Insulated panels for cold storage, food processing and controlled environments.",
    image: coldroomImg,
    imageAlt: "Cold room insulated panels",
  },
  {
    title: "Custom Fabrication",
    description:
      "Z-purlins, decking sheets, skylights, ventilators and bespoke steel components.",
    image: fabricationImg,
    imageAlt: "Custom fabricated steel components",
  },
];

/** 03 — Our Services. */
export function ServicesGrid() {
  return (
    <section className="bg-bg-base py-20 lg:py-[100px]">
      <Container>
        <div className="flex flex-col gap-8 lg:flex-row lg:items-start lg:justify-between lg:gap-16">
          <div>
            <SectionEyebrow label="Our Expertise" />
            <h2 className="mt-6 max-w-[640px] font-heading text-4xl font-semibold leading-[1.15] tracking-[-0.56px] text-text-primary sm:text-5xl lg:text-[56px]">
              Complete steel building solutions, under one roof.
            </h2>
          </div>
          <p className="max-w-[640px] shrink-0 font-body text-lg leading-[1.65] text-text-secondary lg:pt-[52px]">
            From pre-engineered structures to insulated panels, roofing and
            custom fabrication — everything your project needs, manufactured and
            delivered by one team.
          </p>
        </div>

        <div className="mt-14 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {SERVICES.map((service) => (
            <ServiceCard key={service.title} service={service} />
          ))}
        </div>
      </Container>
    </section>
  );
}
