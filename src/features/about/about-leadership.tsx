import { Container } from "@/components/layout/container";
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
    <section className="bg-text-primary py-20 lg:py-[100px]">
      <Container>
        <h2 className="font-heading text-4xl font-semibold leading-[1.15] tracking-[-0.56px] text-bg-base sm:text-5xl lg:text-[56px]">
          The people accountable.
        </h2>

        <div className="mt-12 grid grid-cols-1 gap-6 sm:grid-cols-2 xl:grid-cols-4">
          {LEADERS.map((leader) => (
            <LeaderCard key={leader.name} leader={leader} />
          ))}
        </div>
      </Container>
    </section>
  );
}
