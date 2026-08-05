import Image, { type StaticImageData } from "next/image";
import { cn } from "@/lib/utils";

export interface Leader {
  name: string;
  role: string;
  photo: StaticImageData | string;
}

/**
 * Leadership portrait card for the dark About section (Figma 382×482):
 * a square portrait with a name/role panel below on a translucent white
 * surface. Border and fill are white-alpha to read on the near-black band.
 */
export function LeaderCard({
  leader,
  className,
}: {
  leader: Leader;
  className?: string;
}) {
  return (
    <article
      className={cn(
        "group flex flex-col overflow-hidden rounded-[20px] border border-white/10 bg-white/5 transition-colors duration-300 hover:border-white/20 hover:bg-white/[0.08]",
        className,
      )}
    >
      <div className="relative aspect-square w-full overflow-hidden">
        <Image
          src={leader.photo}
          alt={`Portrait of ${leader.name}`}
          fill
          sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 382px"
          className="object-cover transition-transform duration-500 group-hover:scale-105"
        />
      </div>
      <div className="flex flex-col gap-1 px-[22px] pb-6 pt-[18px] text-base leading-[1.5] text-white">
        <p>{leader.name}</p>
        <p className="opacity-65">{leader.role}</p>
      </div>
    </article>
  );
}
