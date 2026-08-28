import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { categoryLabel } from "@/lib/blog-format";
import type { Blog } from "@/types/blog";
import { ImageWithFallback } from "@/components/ui/image-with-fallback";

/** Formats an ISO date as "March 2026". */
function formatMonthYear(iso: string): string {
  return new Intl.DateTimeFormat("en-US", {
    month: "long",
    year: "numeric",
  }).format(new Date(iso));
}

/**
 * Featured blog (Figma 1600×460): cover image beside an editorial body with a
 * category badge, meta line, large title, excerpt and a "Read article" link.
 */
export function FeaturedBlog({ blog }: { blog: Blog }) {
  return (
    <Link
      href={`/blog/${blog.slug}`}
      className="group flex flex-col overflow-hidden rounded-[28px] bg-bg-card shadow-[0px_12px_32px_0px_rgba(15,23,18,0.08)] transition-shadow duration-300 hover:shadow-[0px_18px_44px_0px_rgba(15,23,18,0.14)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-green-accent focus-visible:ring-offset-2 lg:flex-row lg:items-stretch"
    >
      <div className="relative aspect-[760/460] w-full shrink-0 overflow-hidden bg-bg-sunken lg:aspect-auto lg:w-[760px]">
        {blog.featuredImage && (
          <ImageWithFallback
            src={blog.featuredImage}
            alt={blog.title}
            fill
            priority
            sizes="(max-width: 1024px) 100vw, 760px"
            className="object-cover transition-transform duration-500 group-hover:scale-[1.03]"
          />
        )}
      </div>

      <div className="flex flex-1 flex-col justify-center gap-5 p-8 sm:p-12 lg:p-14">
        <div className="flex flex-wrap items-center gap-3">
          <span className="inline-flex items-center rounded-full bg-green-soft px-3.5 py-[7px] font-body text-xs font-medium uppercase tracking-[0.5px] text-green-primary">
            {categoryLabel(blog.category)}
          </span>
          <span className="font-body text-base leading-[1.5] text-text-secondary">
            · {blog.readingTime} min read · {formatMonthYear(blog.publishDate)}
          </span>
        </div>

        <h2 className="font-heading text-3xl font-semibold leading-[1.18] tracking-[-0.2px] text-text-primary sm:text-4xl lg:text-[40px]">
          {blog.title}
        </h2>

        <p className="max-w-[728px] font-body text-[17px] leading-[1.6] text-text-secondary">
          {blog.excerpt}
        </p>

        <span className="inline-flex items-center gap-2.5 font-body text-base leading-[1.5] text-green-primary">
          Read article
          <ArrowRight
            aria-hidden="true"
            className="size-4 transition-transform duration-200 group-hover:translate-x-1"
          />
        </span>
      </div>
    </Link>
  );
}
