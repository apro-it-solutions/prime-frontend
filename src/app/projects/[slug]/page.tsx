import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { SiteHeader } from "@/components/layout/site-header";
import { SiteFooter } from "@/components/layout/site-footer";
import { Container } from "@/components/layout/container";
import { PageFadeUp } from "@/components/ui/page-fade-up";
import { ProjectHero } from "@/components/projects/detail/project-hero";
import { ProjectContent } from "@/components/projects/detail/project-content";
import { ProjectFacts } from "@/components/projects/detail/project-facts";
import { ProjectGallery } from "@/components/projects/detail/project-gallery";
import { ProjectsCta } from "@/components/projects/projects-cta";
import { getProject } from "@/lib/get-project";

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3000";

interface ProjectDetailPageProps {
  params: Promise<{ slug: string }>;
}

/** Dynamic SEO metadata built from the project's data and SEO fields. */
export async function generateMetadata({
  params,
}: ProjectDetailPageProps): Promise<Metadata> {
  const { slug } = await params;
  const project = await getProject(slug);

  if (!project) {
    return {
      title: "Project not found — Prime NMS",
      robots: { index: false, follow: false },
    };
  }

  const title = project.seo?.metaTitle?.trim() || project.title;
  const description =
    project.seo?.metaDescription?.trim() || project.shortDescription;
  const url = `${SITE_URL}/projects/${project.slug}`;
  const images = project.featuredImage
    ? [{ url: project.featuredImage }]
    : undefined;

  return {
    title,
    description,
    keywords: project.seo?.metaKeywords?.length
      ? project.seo.metaKeywords
      : project.technologies,
    alternates: { canonical: url },
    openGraph: {
      type: "article",
      title,
      description,
      url,
      images,
      modifiedTime: project.updatedAt,
      tags: project.technologies,
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: project.featuredImage ? [project.featuredImage] : undefined,
    },
  };
}

/**
 * Project Detail — `/projects/:slug`.
 *
 * Fetched on the server from `GET /api/v1/projects/:slug`; an unknown or
 * unpublished slug 404s through `not-found.tsx`. Every section below renders
 * only the fields the API actually returned.
 */
export default async function ProjectDetailPage({
  params,
}: ProjectDetailPageProps) {
  const { slug } = await params;
  const project = await getProject(slug);

  if (!project) notFound();

  return (
    <>
      <SiteHeader />
      <PageFadeUp className="flex-1 bg-bg-base">
        <ProjectHero project={project} />

        <Container>
          <article className="pb-16 pt-12 lg:pb-24 lg:pt-16">
            <div className="grid gap-10 lg:grid-cols-[minmax(0,1fr)_360px] lg:gap-16">
              <ProjectContent html={project.description} />
              <ProjectFacts project={project} />
            </div>
          </article>
        </Container>

        <ProjectGallery project={project} />

        {/* Shared CTA band, identical to the listing page's. */}
        <ProjectsCta />
      </PageFadeUp>
      <SiteFooter />
    </>
  );
}
