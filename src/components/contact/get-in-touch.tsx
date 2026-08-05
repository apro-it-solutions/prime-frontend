import { Container } from "@/components/layout/container";
import { ContactInfo } from "./contact-info";
import { ContactForm } from "./contact-form";

/** 02 — Get in Touch: contact details (left) and the quote form (right). */
export function GetInTouch() {
  return (
    <section className="bg-bg-base py-20 lg:py-[100px]">
      <Container>
        <div className="flex flex-col gap-12 lg:flex-row lg:items-start lg:justify-between lg:gap-16">
          <ContactInfo />
          <div className="w-full lg:w-[760px] lg:shrink-0">
            <ContactForm />
          </div>
        </div>
      </Container>
    </section>
  );
}
