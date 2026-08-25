import { Container } from "@/components/layout/container";
import { FadeHeading } from "@/components/ui/fade-heading";
import { cn } from "@/lib/utils";

const VISION_GRADIENT =
  "linear-gradient(151.74deg, #248759 0%, #4dad78 42.857%, #8ccca3 71.429%)";

/** One Mission/Vision card with its overlapping label chip + square marker. */
function InfoCard({
  label,
  children,
  variant = "mission",
  className,
}: {
  label: string;
  children: React.ReactNode;
  variant?: "mission" | "vision";
  className?: string;
}) {
  const isVision = variant === "vision";
  return (
    <div
      className={cn(
        "relative min-h-[250px] w-full max-w-[620px] rounded-[24px] shadow-[0px_16px_36px_0px_rgba(15,23,18,0.12)]",
        isVision ? "text-white" : "bg-bg-card",
        className,
      )}
      style={isVision ? { backgroundImage: VISION_GRADIENT } : undefined}
    >
      {/* Square marker peeking off the left edge */}
      <span
        aria-hidden="true"
        className="absolute -left-1.5 top-[14px] size-5 rounded-[6px] bg-green-primary"
      />
      {/* Label chip straddling the top edge */}
      <span className="absolute -top-5 left-7 inline-flex items-center rounded-[12px] bg-green-primary px-[22px] py-[9px] text-base leading-[1.5] text-white">
        {label}
      </span>
      <p
        className={cn(
          "max-w-[440px] px-9 pb-9 pt-[52px] text-base leading-[1.5] sm:pt-[72px]",
          isVision ? "text-white" : "text-text-primary",
        )}
      >
        {children}
      </p>
    </div>
  );
}

/** Ghosted outline card used to give the stack depth on wide screens. */
function GhostCard({ className }: { className?: string }) {
  return (
    <div
      aria-hidden="true"
      className={cn(
        "absolute h-[250px] w-[620px] rounded-[24px] border-[1.5px] border-[rgba(88,182,122,0.3)]",
        className,
      )}
    />
  );
}

/** 03 — Vision & Mission. */
export function VisionMission() {
  const missionCopy =
    "To deliver precision-engineered galvanized structures that last longer and arrive on time.";
  const visionCopy =
    "To be India's most trusted name in pre-engineered galvanized steel.";

  return (
    <section className="bg-bg-sunken py-20 lg:py-[100px]">
      <Container>
        <div className="flex flex-col gap-16 xl:flex-row xl:items-center xl:justify-between xl:gap-12">
          {/* Left — copy */}
          <div className="max-w-[560px]">
            <p className="font-body text-[13px] font-medium uppercase tracking-[0.5px] text-green-accent">
              Vision &amp; Mission
            </p>
            <FadeHeading className="mt-4 font-heading text-4xl font-semibold leading-[1.15] tracking-[-0.56px] text-text-primary sm:text-5xl lg:text-[56px]">
              What we&apos;re
              <br />
              building toward.
            </FadeHeading>
            <p className="mt-6 max-w-[520px] font-body text-lg leading-[1.65] text-text-secondary">
              Two commitments guide every structure we manufacture — a clear
              mission for how we build today, and a vision for where Prime NMS is
              headed.
            </p>
            <div className="mt-8 h-1 w-14 rounded-full bg-green-accent-light" />
            <p className="mt-5 font-body text-base leading-[1.5] text-text-primary">
              Engineered in Kerala · Delivered across India
            </p>
          </div>

          {/* Right — cascading cards (xl) */}
          <div className="relative hidden h-[508px] w-[776px] shrink-0 xl:block">
            <GhostCard className="left-[36px] top-[38px]" />
            <GhostCard className="left-[156px] top-[258px]" />
            <div className="absolute left-[6px] top-5 w-[620px]">
              <InfoCard label="Our Mission" className="h-[250px]">
                {missionCopy}
              </InfoCard>
            </div>
            <div className="absolute left-[126px] top-[240px] w-[620px]">
              <InfoCard label="Our Vision" variant="vision" className="h-[250px]">
                {visionCopy}
              </InfoCard>
            </div>
          </div>

          {/* Right — stacked cards (below xl) */}
          <div className="flex flex-col gap-10 pt-5 xl:hidden">
            <InfoCard label="Our Mission">{missionCopy}</InfoCard>
            <InfoCard label="Our Vision" variant="vision">
              {visionCopy}
            </InfoCard>
          </div>
        </div>
      </Container>
    </section>
  );
}
