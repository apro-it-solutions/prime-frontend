import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { Container } from "@/components/layout/container";
import { PillButton } from "@/components/ui/pill-button";

/**
 * Shown when a slug does not resolve to a service. The header and footer come
 * from the segment layout, so only the panel itself is rendered here.
 */
export default function ServiceNotFound() {
  return (
    <Container className="flex min-h-[70vh] flex-col items-center justify-center pt-[132px] text-center lg:pt-[168px]">
      <p className="font-heading text-[13px] font-medium uppercase tracking-[1.2px] text-green-accent">
        404 — Not found
      </p>
      <h1 className="mt-4 max-w-[640px] font-heading text-4xl font-semibold leading-[1.15] tracking-[-0.48px] text-text-primary lg:text-[56px]">
        We couldn&apos;t find that service.
      </h1>
      <p className="mt-5 max-w-[520px] font-body text-lg leading-[1.65] text-text-secondary">
        The page you&apos;re looking for may have been moved or renamed. Browse
        everything PrimeNMS manufactures instead.
      </p>

      <div className="mt-9 flex flex-wrap items-center justify-center gap-4">
        <PillButton label="All Services" href="/services" variant="green" />
        <Link
          href="/"
          className="inline-flex items-center gap-2 font-body text-base leading-[1.5] text-text-primary transition-colors hover:text-green-primary"
        >
          <ArrowLeft aria-hidden="true" className="size-4" />
          Go home
        </Link>
      </div>
    </Container>
  );
}
