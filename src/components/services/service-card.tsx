import Image from "next/image";
import Link from "next/link";
import { ArrowCircle } from "@/components/ui/arrow-circle";
import { cn } from "@/lib/utils";
import type { ServiceDetail } from "./services-data";

/**
 * A single "Our Services" card (Figma 517×455): title + description over a
 * rounded photo. The card lifts and the photo zooms gently on hover.
 *
 * The title is the card's one link; its `after` pseudo-element covers the whole
 * card so the entire tile is clickable without adding a second tab stop or
 * nesting the photo inside the anchor.
 */
export function ServiceCard({
  service,
  className,
}: {
  service: ServiceDetail;
  className?: string;
}) {
  return (
    <article
      className={cn(
        "group relative flex flex-col rounded-[24px] border border-border bg-bg-card p-7 shadow-[0px_8px_24px_0px_rgba(15,23,18,0.04)] transition-shadow duration-300 hover:shadow-[0px_16px_40px_0px_rgba(15,23,18,0.10)]",
        className,
      )}
    >
      <h3 className="font-heading text-2xl font-semibold leading-[1.2] tracking-[-0.24px] text-text-primary">
        <Link
          href={`/services/${service.slug}`}
          className="rounded-[24px] transition-colors after:absolute after:inset-0 after:rounded-[24px] after:content-[''] group-hover:text-green-primary focus-visible:outline-none focus-visible:after:ring-2 focus-visible:after:ring-green-accent focus-visible:after:ring-offset-2"
        >
          {service.title}
        </Link>
      </h3>
      <p className="mt-3 font-body text-base leading-[1.5] text-text-secondary">
        {service.cardDescription}
      </p>
      <div className="relative mt-6 aspect-[461/288] w-full overflow-hidden rounded-[16px]">
        <Image
          src={service.cardImage.src}
          alt={service.cardImage.alt}
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
