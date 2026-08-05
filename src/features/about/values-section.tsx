import { Container } from "@/components/layout/container";
import { ValueCard, type ValueItem } from "@/components/ui/value-card";

const VALUES: ValueItem[] = [
  {
    illustration: "/images/value-precision.svg",
    title: "Precision",
    description:
      "Every build engineered to exact PEB design tolerances for load and longevity.",
  },
  {
    illustration: "/images/value-durability.svg",
    title: "Durability",
    description:
      "Galvanized steel that resists corrosion and outlasts conventional builds.",
  },
  {
    illustration: "/images/value-reliability.svg",
    title: "Reliability",
    description:
      "A 100% on-time delivery record, from foundation to commissioning.",
  },
  {
    illustration: "/images/value-partnership.svg",
    title: "Partnership",
    description:
      "A dedicated team supporting each client from first quote to handover.",
  },
];

/** 05 — What Drives Us. */
export function ValuesSection() {
  return (
    <section className="bg-bg-base py-20 lg:py-[100px]">
      <Container>
        <p className="font-body text-[13px] font-medium uppercase tracking-[0.5px] text-green-accent">
          What Drives Us
        </p>
        <h2 className="mt-4 max-w-[640px] font-heading text-4xl font-semibold leading-[1.15] tracking-[-0.56px] text-text-primary sm:text-5xl lg:text-[56px]">
          The principles behind every structure.
        </h2>

        <div className="mt-14 grid grid-cols-1 gap-6 sm:grid-cols-2 xl:grid-cols-4">
          {VALUES.map((value) => (
            <ValueCard key={value.title} value={value} />
          ))}
        </div>
      </Container>
    </section>
  );
}
