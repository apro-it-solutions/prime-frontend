import Image, { type StaticImageData } from "next/image";
import { Container } from "@/components/layout/container";
import { cn } from "@/lib/utils";

interface ImageBandProps {
  image: StaticImageData | string;
  alt: string;
  heading: string;
  body: string;
  align?: "left" | "right";
  priority?: boolean;
}

/**
 * Full-bleed image band with a bottom-darkening gradient and a heading/body
 * overlay aligned left or right (Figma section 04).
 */
export function ImageBand({
  image,
  alt,
  heading,
  body,
  align = "left",
  priority,
}: ImageBandProps) {
  return (
    <div className="relative h-[380px] w-full overflow-hidden md:h-[500px] lg:h-[600px]">
      <Image
        src={image}
        alt={alt}
        fill
        priority={priority}
        sizes="100vw"
        className="object-cover"
      />
      <div
        aria-hidden="true"
        className="absolute inset-0 bg-gradient-to-b from-transparent to-black/60"
      />
      <Container className="relative flex h-full flex-col justify-end pb-14 lg:pb-20">
        <div
          className={cn(
            "max-w-[610px]",
            align === "right" && "lg:ml-auto lg:text-left",
          )}
        >
          <h2 className="font-heading text-3xl font-semibold leading-[1.18] tracking-[-0.2px] text-white lg:text-[40px]">
            {heading}
          </h2>
          <p className="mt-3 max-w-[610px] text-base leading-[1.5] text-bg-base">
            {body}
          </p>
        </div>
      </Container>
    </div>
  );
}
