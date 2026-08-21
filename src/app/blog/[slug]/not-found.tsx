import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { SiteHeader } from "@/components/layout/site-header";
import { SiteFooter } from "@/components/layout/site-footer";
import { Container } from "@/components/layout/container";
import { PillButton } from "@/components/ui/pill-button";

/** Shown when a blog slug does not resolve to an article. */
export default function BlogNotFound() {
  return (
    <>
      <SiteHeader />
      <main className="flex-1 bg-bg-base">
        <Container className="flex min-h-[70vh] flex-col items-center justify-center pt-[132px] text-center lg:pt-[168px]">
          <p className="font-heading text-[13px] font-medium uppercase tracking-[1.2px] text-green-accent">
            404 — Not found
          </p>
          <h1 className="mt-4 max-w-[640px] font-heading text-4xl font-semibold leading-[1.15] tracking-[-0.48px] text-text-primary lg:text-[56px]">
            We couldn&apos;t find that article.
          </h1>
          <p className="mt-5 max-w-[520px] font-body text-lg leading-[1.65] text-text-secondary">
            The blog post you&apos;re looking for may have been moved or removed.
            Browse the latest stories from the Prime NMS Journal instead.
          </p>

          <div className="mt-9 flex flex-wrap items-center justify-center gap-4">
            <PillButton label="Back to Blog" href="/blog" variant="green" />
            <Link
              href="/"
              className="inline-flex items-center gap-2 font-body text-base leading-[1.5] text-text-primary transition-colors hover:text-green-primary"
            >
              <ArrowLeft aria-hidden="true" className="size-4" />
              Go home
            </Link>
          </div>
        </Container>
      </main>
      <SiteFooter />
    </>
  );
}
