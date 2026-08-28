import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { SiteHeader } from "@/components/layout/site-header";
import { SiteFooter } from "@/components/layout/site-footer";
import { Container } from "@/components/layout/container";
import { BlogHero } from "@/components/blog/detail/blog-hero";
import { BlogContent } from "@/components/blog/detail/blog-content";
import { BlogTags } from "@/components/blog/detail/blog-tags";
import { RelatedPosts } from "@/components/blog/detail/related-posts";
import { PageFadeUp } from "@/components/ui/page-fade-up";
import { getBlog } from "@/lib/get-blog";

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3000";

interface BlogDetailPageProps {
  params: Promise<{ slug: string }>;
}

/** Dynamic SEO metadata built from the blog's data and SEO fields. */
export async function generateMetadata({
  params,
}: BlogDetailPageProps): Promise<Metadata> {
  const { slug } = await params;
  const blog = await getBlog(slug);

  if (!blog) {
    return {
      title: "Article not found — Prime NMS Journal",
      robots: { index: false, follow: false },
    };
  }

  const title = blog.seo?.metaTitle?.trim() || blog.title;
  const description = blog.seo?.metaDescription?.trim() || blog.excerpt;
  const url = `${SITE_URL}/blog/${blog.slug}`;
  const images = blog.featuredImage ? [{ url: blog.featuredImage }] : undefined;

  return {
    title,
    description,
    keywords: blog.seo?.metaKeywords?.length
      ? blog.seo.metaKeywords
      : blog.tags,
    alternates: { canonical: url },
    openGraph: {
      type: "article",
      title,
      description,
      url,
      images,
      publishedTime: blog.publishDate,
      modifiedTime: blog.updatedAt,
      authors: blog.author ? [blog.author.name] : undefined,
      tags: blog.tags,
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: blog.featuredImage ? [blog.featuredImage] : undefined,
    },
  };
}

export default async function BlogDetailPage({ params }: BlogDetailPageProps) {
  const { slug } = await params;
  const blog = await getBlog(slug);

  if (!blog) notFound();

  return (
    <>
      <SiteHeader />
      <PageFadeUp className="flex-1 bg-bg-base">
        <BlogHero blog={blog} />

        <Container>
          <article className="pb-16 pt-0 lg:pb-24">
            <BlogContent html={blog.content} />
            <BlogTags tags={blog.tags} />
          </article>
        </Container>

        <RelatedPosts slug={blog.slug} categoryId={blog.category?._id} />
      </PageFadeUp>
      <SiteFooter />
    </>
  );
}
