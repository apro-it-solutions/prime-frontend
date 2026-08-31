import { Container } from "@/components/layout/container";
import { ContactInfo } from "./contact-info";
import { ContactForm } from "./contact-form";

/** 02 — Get in Touch: contact details (left) and the quote form (right). */
export function GetInTouch() {
  return (
    <section className="bg-bg-base py-20 lg:py-[100px]">
      <Container>
        <div className="flex flex-col gap-12 xl:flex-row xl:items-start xl:justify-between xl:gap-16">
          <ContactInfo />
          <div className="w-full xl:w-[560px] xl:shrink-0 2xl:w-[760px]">
            <ContactForm />
          </div>
        </div>
      </Container>
    </section>
  );
}
