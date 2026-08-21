import Link from "next/link";
import type { Blog } from "@/types/blog";
import { ImageWithFallback } from "@/components/ui/image-with-fallback";

/**
 * Grid blog card (Figma 512×401): cover image, category + reading time,
 * title and excerpt. The whole card links to the article.
 */
export function BlogCard({ blog }: { blog: Blog }) {
  return (
    <article className="h-full">
      <Link
        href={`/blog/${blog.slug}`}
        className="group flex h-full flex-col overflow-hidden rounded-[24px] bg-bg-card shadow-[0px_8px_24px_0px_rgba(15,23,18,0.06)] transition-shadow duration-300 hover:shadow-[0px_16px_40px_0px_rgba(15,23,18,0.12)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-green-accent focus-visible:ring-offset-2"
      >
        {/* A post whose cover did not resolve keeps the card's proportions and
            shows the sunken field rather than a broken frame. */}
        <div className="relative aspect-[512/220] w-full overflow-hidden bg-bg-sunken">
          {blog.featuredImage && (
            <ImageWithFallback
              src={blog.featuredImage}
              alt={blog.title}
              fill
              loading="lazy"
              sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 512px"
              className="object-cover transition-transform duration-500 group-hover:scale-105"
            />
          )}
        </div>
        <div className="flex flex-1 flex-col gap-3 px-7 pb-[30px] pt-[26px]">
          <div className="flex items-center justify-between">
            <span className="font-body text-xs font-medium uppercase tracking-[0.5px] text-green-accent">
              {blog.category.name}
            </span>
            <span className="font-body text-base leading-[1.5] text-text-secondary">
              {blog.readingTime} min read
            </span>
          </div>
          <h3 className="font-heading text-[22px] font-semibold leading-[1.3] tracking-[-0.3px] text-text-primary">
            {blog.title}
          </h3>
          <p className="font-body text-base leading-[1.5] text-text-secondary">
            {blog.excerpt}
          </p>
        </div>
      </Link>
    </article>
  );
}
