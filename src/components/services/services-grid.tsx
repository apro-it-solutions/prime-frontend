import { Container } from "@/components/layout/container";
import { SectionEyebrow } from "./section-eyebrow";
import { ServiceCard } from "./service-card";
import { SERVICES } from "./services-data";

/** 03 — Our Services. Each card links to that service's detail page. */
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
            <ServiceCard key={service.slug} service={service} />
          ))}
        </div>
      </Container>
    </section>
  );
}
