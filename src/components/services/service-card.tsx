import Image, { type StaticImageData } from "next/image";
import { ArrowCircle } from "@/components/ui/arrow-circle";
import { cn } from "@/lib/utils";

export interface Service {
  title: string;
  description: string;
  image: StaticImageData | string;
  imageAlt: string;
}

/**
 * A single "Our Services" card (Figma 517×455): title + description over a
 * rounded photo. The card lifts and the photo zooms gently on hover.
 */
export function ServiceCard({
  service,
  className,
}: {
  service: Service;
  className?: string;
}) {
  return (
    <article
      className={cn(
        "group flex flex-col rounded-[24px] border border-border bg-bg-card p-7 shadow-[0px_8px_24px_0px_rgba(15,23,18,0.04)] transition-shadow duration-300 hover:shadow-[0px_16px_40px_0px_rgba(15,23,18,0.10)]",
        className,
      )}
    >
      <h3 className="font-heading text-2xl font-semibold leading-[1.2] tracking-[-0.24px] text-text-primary">
        {service.title}
      </h3>
      <p className="mt-3 font-body text-base leading-[1.5] text-text-secondary">
        {service.description}
      </p>
      <div className="relative mt-6 aspect-[461/288] w-full overflow-hidden rounded-[16px]">
        <Image
          src={service.image}
          alt={service.imageAlt}
          className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
          sizes="(max-width: 640px) 100vw, (max-width: 1120px) 50vw, 461px"
        />
        <ArrowCircle
          size={40}
          className="absolute bottom-3 right-3 transition-transform duration-200 group-hover:rotate-45"
        />
      </div>
    </article>
  );
}
