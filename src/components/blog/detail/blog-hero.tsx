import Image from "next/image";
import { Container } from "@/components/layout/container";
import type { Blog } from "@/types/blog";
import { BlogMeta } from "./blog-meta";
import { BlogAuthor } from "./blog-author";

/**
 * Blog Detail hero (Figma 258:159 → 258:168): breadcrumb + category badge,
 * headline, author byline and the full-width rounded cover image. Sits below the
 * shared site header, so the top padding clears the overlaid nav.
 */
export function BlogHero({ blog }: { blog: Blog }) {
  return (
    <section className="pt-[132px] lg:pt-[168px]">
      <Container>
        <div className="flex flex-col items-start">
          <BlogMeta category={blog.category} />

          <h1 className="mt-7 max-w-[760px] font-heading text-[32px] font-semibold leading-[1.15] tracking-[-0.48px] text-text-primary sm:text-[40px] lg:text-[48px]">
            {blog.title}
          </h1>

          <div className="mt-9 lg:mt-[46px]">
            <BlogAuthor
              author={blog.author}
              date={blog.publishDate}
              readingTime={blog.readingTime}
            />
          </div>
        </div>

        <div className="relative mt-8 aspect-[16/10] w-full overflow-hidden rounded-[24px] bg-bg-sunken sm:aspect-[2/1] lg:mt-5 lg:aspect-[40/13]">
          <Image
            src={blog.featuredImage}
            alt={blog.title}
            fill
            priority
            sizes="(max-width: 1024px) 100vw, 1600px"
            className="object-cover"
          />
        </div>
      </Container>
    </section>
  );
}
