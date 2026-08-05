import Image, { type StaticImageData } from "next/image";
import { cn } from "@/lib/utils";

/** Overlapping circular avatars (Figma: 40px, -12px overlap). */
export function AvatarStack({
  avatars,
  className,
  size = 40,
}: {
  avatars: { src: StaticImageData | string; alt: string }[];
  className?: string;
  size?: number;
}) {
  return (
    <div className={cn("flex items-center", className)}>
      {avatars.map((a, i) => (
        <span
          key={i}
          className="relative overflow-hidden rounded-full ring-2 ring-bg-base"
          style={{
            width: size,
            height: size,
            marginLeft: i === 0 ? 0 : -12,
            zIndex: avatars.length - i,
          }}
        >
          <Image src={a.src} alt={a.alt} fill sizes={`${size}px`} className="object-cover" />
        </span>
      ))}
    </div>
  );
}
