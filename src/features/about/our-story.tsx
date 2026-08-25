import Image from "next/image";
import { Container } from "@/components/layout/container";
import { FadeHeading } from "@/components/ui/fade-heading";
import primeLogo from "../../../public/images/about-prime-logo.png";

/** 02 — Our Story. The joint-venture narrative with the brand mark alongside. */
export function OurStory() {
  return (
    <section className="bg-bg-base py-20 lg:py-[124px]">
      <Container>
        <div className="flex flex-col gap-12 lg:flex-row lg:items-center lg:justify-between lg:gap-16">
          <div className="flex max-w-[805px] flex-col gap-[26px]">
            <FadeHeading className="font-heading text-4xl font-semibold leading-[1.15] tracking-[-0.56px] text-text-primary sm:text-5xl lg:text-[56px]">
              A joint venture of steel
              <br className="hidden sm:block" /> and engineering.
            </FadeHeading>
            <div className="flex max-w-[620px] flex-col gap-[60px] font-body text-lg leading-[1.65] text-text-secondary">
              <p>
                Prime NMS Private Limited was formed to combine two proven
                strengths — New Malayalam Steel&apos;s material and manufacturing
                scale, and Prime Group&apos;s engineering and project-execution
                expertise.
              </p>
              <p>
                The result is a single, fully operational facility in Kerala
                built to manufacture durable galvanized pre-engineered buildings
                at scale — engineered, fabricated and delivered on time, across
                India.
              </p>
            </div>
          </div>

          <Image
            src={primeLogo}
            alt="Prime NMS — The Steel Building Specialist"
            className="h-auto w-[280px] shrink-0 lg:w-[390px]"
            sizes="390px"
          />
        </div>
      </Container>
    </section>
  );
}
