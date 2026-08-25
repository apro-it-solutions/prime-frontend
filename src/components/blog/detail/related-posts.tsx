"use client";

import { Container } from "@/components/layout/container";
import { FadeHeading } from "@/components/ui/fade-heading";
import { useRelatedBlogs } from "@/hooks/use-blogs";
import { RelatedCard } from "./related-card";

/** Placeholder card shown while related posts load. */
function RelatedCardSkeleton() {
  return (
    <div className="flex flex-col overflow-hidden rounded-[24px] bg-bg-card shadow-[0px_8px_24px_0px_rgba(15,23,18,0.06)]">
      <div className="aspect-[512/170] w-full bg-bg-sunken" />
      <div className="flex flex-col gap-2.5 px-6 pb-[26px] pt-[22px]">
        <div className="h-3 w-28 rounded bg-bg-sunken" />
        <div className="h-6 w-4/5 rounded bg-bg-sunken" />
        <div className="h-6 w-2/3 rounded bg-bg-sunken" />
      </div>
    </div>
  );
}

interface RelatedPostsProps {
  slug: string;
  categoryId?: string;
}

/**
 * "Keep reading / Related articles" section (Figma 259:165). Client island
 * backed by React Query so results are cached and can be lazy-loaded. Renders
 * nothing when there are no related posts.
 */
export function RelatedPosts({ slug, categoryId }: RelatedPostsProps) {
  const { data, isLoading, isError } = useRelatedBlogs(slug, categoryId);

  if (isError || (!isLoading && (!data || data.length === 0))) return null;

  return (
    <section className="bg-bg-sunken py-16 lg:py-[64px]">
      <Container>
        <p className="font-heading text-[13px] font-medium uppercase leading-[1.2] tracking-[1.2px] text-green-accent">
          Keep reading
        </p>
        <FadeHeading className="mt-3 font-heading text-3xl font-semibold leading-[1.18] tracking-[-0.2px] text-text-primary lg:text-[40px]">
          Related articles
        </FadeHeading>

        <div className="mt-10 grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3">
          {isLoading
            ? Array.from({ length: 3 }).map((_, i) => (
                <RelatedCardSkeleton key={i} />
              ))
            : data!.map((blog) => <RelatedCard key={blog._id} blog={blog} />)}
        </div>
      </Container>
    </section>
  );
}
