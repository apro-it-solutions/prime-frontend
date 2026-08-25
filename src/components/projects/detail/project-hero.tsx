import { Container } from "@/components/layout/container";
import { ImageWithFallback } from "@/components/ui/image-with-fallback";
import { projectCategoryName } from "@/lib/project-format";
import type { Project } from "@/types/project";

/**
 * Project Detail hero: "Projects / Category" breadcrumb, category badge,
 * headline, short description and the full-width rounded cover image — the same
 * composition and type scale as the Blog Detail hero, so the two detail pages
 * share one language. Sits below the shared site header, so the top padding
 * clears the overlaid nav.
 *
 * Each element renders only when the API returned it.
 */
export function ProjectHero({ project }: { project: Project }) {
  const category = projectCategoryName(project);

  return (
    <section className="pt-[132px] lg:pt-[168px]">
      <Container>
        <div className="flex flex-col items-start">
          <div className="flex flex-col items-start gap-5">
            <p className="font-body text-base leading-[1.5] text-text-secondary">
              Projects
              {category ? <>&nbsp;&nbsp;/&nbsp;&nbsp;{category}</> : null}
            </p>
            {category && (
              <span className="inline-flex items-center rounded-pill bg-green-soft px-3.5 py-[7px] font-body text-xs font-medium uppercase leading-[1.2] tracking-[0.06px] text-green-primary">
                {category}
              </span>
            )}
          </div>

          <h1 className="mt-7 max-w-[760px] font-heading text-[32px] font-semibold leading-[1.15] tracking-[-0.48px] text-text-primary sm:text-[40px] lg:text-[48px]">
            {project.title}
          </h1>

          {project.shortDescription && (
            <p className="mt-6 max-w-[720px] font-body text-lg leading-[1.65] text-text-secondary">
              {project.shortDescription}
            </p>
          )}
        </div>

        <div className="relative mt-8 aspect-[16/10] w-full overflow-hidden rounded-[24px] bg-bg-sunken sm:aspect-[2/1] lg:mt-10 lg:aspect-[40/13]">
          {project.featuredImage && (
            <ImageWithFallback
              src={project.featuredImage}
              alt={
                project.location
                  ? `${project.title} — ${project.location}`
                  : project.title
              }
              fill
              priority
              sizes="(max-width: 1024px) 100vw, 1600px"
              className="object-cover"
            />
          )}
        </div>
      </Container>
    </section>
  );
}
