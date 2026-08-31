import Image from "next/image";
import { Container } from "@/components/layout/container";
import { FadeHeading } from "@/components/ui/fade-heading";
import {
  ServiceStatCard,
  type ServiceStat,
} from "./service-stat-card";
import facility from "../../../public/images/service-why-facility.png";

const STATS: ServiceStat[] = [
  { value: "500+", label: "Projects delivered" },
  { value: "6,000T", label: "Annual capacity" },
  { value: "100%", label: "On-time record" },
  { value: "12", label: "States served" },
];

/** 02 — Why Choose Prime NMS. */
export function WhyChooseUs() {
  return (
    <section className="bg-bg-base py-20 lg:py-[90px]">
      <Container>
        <div className="flex flex-col gap-6 xl:flex-row xl:items-start xl:justify-between xl:gap-16">
          <FadeHeading className="max-w-[1085px] font-heading text-4xl font-semibold leading-[1.15] tracking-[-0.56px] text-text-primary sm:text-5xl lg:text-[56px]">
            Build Your Future with Galvanized Steel Strong.
          </FadeHeading>
          <p className="font-body text-lg leading-[1.65] text-text-secondary xl:max-w-[480px] xl:shrink-0 xl:pt-2 2xl:max-w-[580px]">
            Harness the strength of pre-engineered galvanized steel to build
            faster, cut lifetime cost, and structures that last. One
            manufacturer, engineered and delivered end to end.
          </p>
        </div>

        <div className="mt-12 flex flex-col gap-6 xl:mt-[54px] xl:flex-row xl:gap-[60px]">
          {/* Facility / team image */}
          <div className="relative aspect-[760/380] w-full shrink-0 overflow-hidden rounded-[24px] xl:aspect-auto xl:h-[380px] xl:w-[520px] 2xl:w-[760px]">
            <Image
              src={facility}
              alt="Prime NMS facility and engineering team on site"
              fill
              sizes="(max-width: 1024px) 100vw, 760px"
              className="object-cover"
            />
          </div>

          {/* 2×2 metrics */}
          <div className="grid flex-1 grid-cols-1 gap-5 sm:grid-cols-2">
            {STATS.map((stat) => (
              <ServiceStatCard key={stat.label} stat={stat} />
            ))}
          </div>
        </div>
      </Container>
    </section>
  );
}
