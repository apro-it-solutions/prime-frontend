import { Container } from "@/components/layout/container";
import { ContactMap } from "./contact-map";

/** 03 — Visit Us: section header + factory map. */
export function VisitUs() {
  return (
    <section className="bg-bg-base pb-20 lg:pb-[100px]">
      <Container>
        <p className="font-body text-[13px] font-medium uppercase tracking-[1.5px] text-green-accent">
          Visit the Factory
        </p>
        <h2 className="mt-3 font-heading text-[28px] font-semibold leading-[1.15] tracking-[-0.32px] text-text-primary sm:text-3xl lg:text-[32px]">
          Find us in Kerala.
        </h2>

        <div className="mt-10">
          <ContactMap />
        </div>
      </Container>
    </section>
  );
}
