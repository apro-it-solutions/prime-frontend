import { Container } from "@/components/layout/container";
import { FadeHeading } from "@/components/ui/fade-heading";
import { LeaderCard, type Leader } from "@/components/ui/leader-card";
import josephMathew from "../../../public/images/about-leader-joseph.jpg";
import binduJoseph from "../../../public/images/about-leader-bindu.jpg";
import jifri from "../../../public/images/about-leader-jifri.jpg";
import davis from "../../../public/images/about-leader-davis.jpg";

const LEADERS: Leader[] = [
  { name: "Joseph Mathew", role: "Chairman · Prime Group", photo: josephMathew },
  { name: "Bindu Joseph", role: "Managing Director", photo: binduJoseph },
  { name: "Jifri M. S.", role: "Executive Director", photo: jifri },
  { name: "Vazhappily Davis Varghese", role: "Director · NMS", photo: davis },
];

/** 06 — Leadership. */
export function AboutLeadership() {
  return (
    // `scroll-mt-28` keeps the heading clear of the sticky header when the
    // footer's Leadership link lands here.
    <section
      id="leadership"
      className="scroll-mt-28 bg-text-primary py-20 lg:py-[100px]"
    >
      <Container>
        <FadeHeading className="font-heading text-4xl font-semibold leading-[1.15] tracking-[-0.56px] text-bg-base sm:text-5xl lg:text-[56px]">
          The people accountable.
        </FadeHeading>

        <div className="mt-12 grid grid-cols-1 gap-6 sm:grid-cols-2 xl:grid-cols-4">
          {LEADERS.map((leader) => (
            <LeaderCard key={leader.name} leader={leader} />
          ))}
        </div>
      </Container>
    </section>
  );
}
