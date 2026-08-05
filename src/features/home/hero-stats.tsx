import { cn } from "@/lib/utils";

export interface HeroStat {
  value: string;
  line1: string;
  line2: string;
}

/** Hero stats (Figma: Hanken SemiBold 64px + Suisse/Inter 16px labels). */
export const HERO_STATS: HeroStat[] = [
  { value: "500+", line1: "Projects delivered", line2: "across India" },
  { value: "6,000T", line1: "Annual production", line2: "capacity" },
];

export function HeroStats({ className }: { className?: string }) {
  return (
    <div className={cn("flex flex-col gap-12 text-white", className)}>
      {HERO_STATS.map((stat) => (
        <div key={stat.value} className="flex flex-col">
          <span className="font-heading text-5xl font-semibold leading-[1.15] tracking-[-0.64px] lg:text-[64px]">
            {stat.value}
          </span>
          <span className="mt-1 text-base leading-[1.5] text-white/85">
            {stat.line1}
            <br />
            {stat.line2}
          </span>
        </div>
      ))}
    </div>
  );
}
