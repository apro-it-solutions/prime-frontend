import Link from "next/link";
import { ArrowCircle } from "@/components/ui/arrow-circle";
import { ImageWithFallback } from "@/components/ui/image-with-fallback";
import {
  formatCompletionDate,
  projectCategoryName,
} from "@/lib/project-format";
import type { Project } from "@/types/project";

/**
 * The large featured project card (Figma 1600×540): full-bleed photo with a
 * legibility gradient, a kicker badge, title/meta bottom-left and a
 * "View Project" pill bottom-right.
 *
 * Driven by the project the dashboard flags as featured. The meta line is
 * assembled from whichever of short description / location / completion date the
 * API actually returned, so a sparsely-filled project still reads cleanly.
 */
export function FeaturedProject({ project }: { project: Project }) {
  const category = projectCategoryName(project);
  const meta = [
    project.shortDescription?.trim(),
    project.location?.trim(),
    formatCompletionDate(project.completionDate),
  ].filter(Boolean) as string[];

  return (
    <Link
      href={`/projects/${project.slug}`}
      className="group relative block aspect-[1600/540] w-full overflow-hidden rounded-[24px] bg-bg-sunken focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-green-accent focus-visible:ring-offset-2"
    >
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
          className="object-cover transition-transform duration-500 group-hover:scale-[1.03]"
        />
      )}
      <div
        aria-hidden="true"
        className="absolute inset-0"
        style={{
          backgroundImage:
            "linear-gradient(180deg, rgba(0,0,0,0.35) 0%, rgba(0,0,0,0) 35%, rgba(0,0,0,0.75) 100%)",
        }}
      />

      {/* Kicker badge */}
      <span className="absolute left-6 top-6 inline-flex items-center rounded-full border border-white/25 bg-white/10 px-4 py-2 font-body text-[11px] font-medium uppercase tracking-[1px] text-white backdrop-blur-sm lg:left-10 lg:top-10">
        {category ? `Featured · ${category}` : "Featured"}
      </span>

      {/* Copy */}
      <div className="absolute inset-x-6 bottom-6 flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between lg:inset-x-10 lg:bottom-10">
        <div className="max-w-[583px] text-white">
          <h3 className="font-heading text-2xl font-semibold leading-[1.2] tracking-[-0.3px] sm:text-3xl lg:text-[30px]">
            {project.title}
          </h3>
          {meta.length > 0 && (
            <p className="mt-3 font-body text-base leading-[1.5] text-white/80">
              {meta.join(" · ")}
            </p>
          )}
        </div>

        <span className="inline-flex shrink-0 items-center gap-3 rounded-pill bg-white py-2 pl-6 pr-2 font-body text-base text-text-primary shadow-[0px_6px_24px_0px_rgba(15,23,18,0.12)]">
          View Project
          <ArrowCircle
            size={36}
            className="transition-transform duration-200 group-hover:rotate-45"
          />
        </span>
      </div>
    </Link>
  );
}
