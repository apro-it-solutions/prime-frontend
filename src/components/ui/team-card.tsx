import Image, { type StaticImageData } from "next/image";
import { cn } from "@/lib/utils";

export interface TeamMember {
  name: string;
  role: string;
  photo: StaticImageData | string;
}

/** Portrait card with a bottom gradient and name/role overlay (Figma 230×300). */
export function TeamCard({
  member,
  className,
}: {
  member: TeamMember;
  className?: string;
}) {
  return (
    <div
      className={cn(
        "relative aspect-[230/300] overflow-hidden rounded-[20px] border border-white/10",
        className,
      )}
    >
      <Image
        src={member.photo}
        alt={member.name}
        fill
        sizes="230px"
        className="object-cover"
      />
      <div
        aria-hidden="true"
        className="absolute inset-0 bg-gradient-to-b from-transparent from-[48%] to-black/[0.66]"
      />
      <div className="absolute inset-x-0 bottom-[19px] px-[19px] text-white">
        <p className="text-base leading-[1.5]">{member.name}</p>
        <p className="text-base leading-[1.5] opacity-70">{member.role}</p>
      </div>
    </div>
  );
}
