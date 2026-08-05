import Image from "next/image";
import Link from "next/link";
import { formatReadingTimeShort } from "@/lib/blog-format";
import type { Blog } from "@/types/blog";

/**
 * Related article card (Figma 259:169): rounded cover image, a
 * "CATEGORY · N min" label and the article title. The whole card links to the
 * post.
 */
export function RelatedCard({ blog }: { blog: Blog }) {
  return (
    <article className="h-full">
      <Link
        href={`/blog/${blog.slug}`}
        className="group flex h-full flex-col overflow-hidden rounded-[24px] bg-bg-card shadow-[0px_8px_24px_0px_rgba(15,23,18,0.06)] transition-shadow duration-300 hover:shadow-[0px_16px_40px_0px_rgba(15,23,18,0.12)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-green-accent focus-visible:ring-offset-2"
      >
        <div className="relative aspect-[512/170] w-full overflow-hidden bg-bg-sunken">
          <Image
            src={blog.featuredImage}
            alt={blog.title}
            fill
            loading="lazy"
            sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 512px"
            className="object-cover transition-transform duration-500 group-hover:scale-105"
          />
        </div>
        <div className="flex flex-1 flex-col gap-2.5 px-6 pb-[26px] pt-[22px]">
          <p className="font-body text-xs font-medium uppercase leading-[1.2] tracking-[0.06px] text-green-accent">
            {blog.category.name} · {formatReadingTimeShort(blog.readingTime)}
          </p>
          <h3 className="font-body text-[28px] font-bold leading-[1.15] tracking-[-0.28px] text-text-primary">
            {blog.title}
          </h3>
        </div>
      </Link>
    </article>
  );
}
