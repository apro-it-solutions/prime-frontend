import { Container } from "@/components/layout/container";
import { SectionEyebrow } from "@/components/services/section-eyebrow";
import { FadeHeading } from "@/components/ui/fade-heading";
import { RevealRow, RevealItem } from "@/components/ui/reveal-row";
import type { ServiceSpec } from "../services-data";

/**
 * 04 — Specifications (Figma 155:2): eyebrow + 40px heading on the left, the
 * made-to-order note right-aligned opposite it, and the four spec cards below.
 *
 * The heading is shared across a service's tabs; the note and the cards belong
 * to the selected sub-service.
 */
export function ServiceSpecs({
  heading,
  note,
  items,
}: {
  heading: string;
  note: string;
  items: ServiceSpec[];
}) {
  return (
    <section className="bg-bg-base py-16 lg:py-[70px]">
      <Container>
        <div className="flex flex-col gap-6 lg:flex-row lg:items-start lg:justify-between lg:gap-16">
          <div>
            <SectionEyebrow
              label="Specifications"
              variant="plain"
              className="text-green-accent"
            />
            <FadeHeading
              text={heading}
              className="mt-3.5 whitespace-pre-line font-heading text-[28px] font-semibold leading-[1.18] tracking-[-0.2px] text-text-primary sm:text-[34px] lg:text-[40px]"
            />
          </div>
          <p className="max-w-[480px] font-body text-base leading-[1.5] text-text-secondary lg:pt-[34px] lg:text-right">
            {note}
          </p>
        </div>

        <RevealRow className="mt-10 grid gap-6 sm:grid-cols-2 lg:mt-[62px] lg:grid-cols-4">
          {items.map((spec) => (
            <RevealItem key={spec.label} preset="image">
              <article className="flex h-full min-h-[190px] flex-col gap-2.5 rounded-[24px] border border-green-accent-light/25 bg-bg-card p-7 shadow-[0px_8px_24px_0px_rgba(15,23,18,0.06)]">
                <p className="font-body text-xs font-medium uppercase leading-[1.2] tracking-[0.5px] text-green-accent">
                  {spec.label}
                </p>
                <p className="font-body text-2xl font-bold leading-[1.15] tracking-[-0.28px] text-text-primary lg:text-[28px]">
                  {spec.value}
                </p>
                <p className="font-body text-base leading-[1.5] text-text-secondary">
                  {spec.detail}
                </p>
              </article>
            </RevealItem>
          ))}
        </RevealRow>
      </Container>
    </section>
  );
}
