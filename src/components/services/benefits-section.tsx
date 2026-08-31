import Image from "next/image";
import { Check } from "lucide-react";
import { Container } from "@/components/layout/container";
import { FadeHeading } from "@/components/ui/fade-heading";
import { SectionEyebrow } from "./section-eyebrow";
import benefitsImg from "../../../public/images/service-benefits.png";

interface Benefit {
  title: string;
  description: string;
}

const BENEFITS: Benefit[] = [
  {
    title: "Corrosion Resistance",
    description: "Zinc coating protects steel — rust never reaches the core.",
  },
  {
    title: "Longer Service Life",
    description: "50+ year design life, even in humid coastal conditions.",
  },
  {
    title: "Lower Maintenance",
    description: "No repainting or rust treatment — near-zero upkeep.",
  },
  {
    title: "Faster to Build",
    description: "Pre-engineered and fabricated off-site for rapid assembly.",
  },
];

/** 04 — Benefits. */
export function BenefitsSection() {
  return (
    <section className="bg-bg-base py-16 lg:py-[70px]">
      <Container>
        <div className="overflow-hidden rounded-[28px] bg-green-soft p-6 sm:p-8 lg:p-10">
          <div className="flex flex-col gap-8 xl:flex-row xl:items-stretch xl:gap-10">
            {/* Image */}
            <div className="relative aspect-[760/484] w-full shrink-0 overflow-hidden rounded-[20px] xl:aspect-auto xl:w-[540px] 2xl:w-[760px]">
              <Image
                src={benefitsImg}
                alt="Galvanized steel structure showcasing corrosion-resistant finish"
                fill
                sizes="(max-width: 1024px) 100vw, 760px"
                className="object-cover"
              />
            </div>

            {/* Copy */}
            <div className="flex flex-1 flex-col justify-center py-2">
              <SectionEyebrow
                label="Benefits"
                variant="plain"
                className="text-green-accent"
              />
              <FadeHeading className="mt-3 max-w-[280px] font-heading text-3xl font-semibold leading-[1.15] tracking-[-0.32px] text-text-primary lg:text-[32px]">
                Why galvanized steel wins.
              </FadeHeading>

              <ul className="mt-8 flex flex-col gap-6">
                {BENEFITS.map((benefit) => (
                  <li key={benefit.title} className="flex items-start gap-4">
                    <span className="mt-0.5 inline-flex size-8 shrink-0 items-center justify-center rounded-full bg-green-primary text-white">
                      <Check className="size-[18px]" strokeWidth={2.5} />
                    </span>
                    <div>
                      <p className="font-body text-base font-medium leading-[1.5] text-text-primary">
                        {benefit.title}
                      </p>
                      <p className="font-body text-base leading-[1.5] text-text-secondary">
                        {benefit.description}
                      </p>
                    </div>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
}
