import Link from "next/link";
import { cn } from "@/lib/utils";
import { ImageWithFallback } from "@/components/ui/image-with-fallback";
import { projectCategoryName, projectPlace, projectSpec } from "@/lib/project-format";
import type { Project } from "@/types/project";

/**
 * Reusable project card (Figma 517×418): a photo with a kicker, title and
 * location beneath. The whole card is a focusable link to the project's detail
 * page; the photo zooms and the card lifts on hover/focus.
 *
 * Every line is backend data. The kicker's second half and the location line are
 * skipped when the API has nothing for them rather than filled with a stand-in.
 */
export function ProjectCard({
  project,
  className,
  style,
}: {
  project: Project;
  className?: string;
  style?: React.CSSProperties;
}) {
  const category = projectCategoryName(project);
  const spec = projectSpec(project);
  const place = projectPlace(project);

  return (
    <article style={style} className={cn("h-full", className)}>
      <Link
        href={`/projects/${project.slug}`}
        className="group flex h-full flex-col overflow-hidden rounded-[24px] bg-bg-card shadow-[0px_8px_24px_0px_rgba(15,23,18,0.06)] transition-shadow duration-300 hover:shadow-[0px_16px_40px_0px_rgba(15,23,18,0.12)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-green-accent focus-visible:ring-offset-2"
      >
        {/* A project whose cover did not resolve keeps the card's proportions
            and shows the sunken field rather than a broken frame. */}
        <div className="relative aspect-[517/280] w-full overflow-hidden bg-bg-sunken">
          {project.featuredImage && (
            <ImageWithFallback
              src={project.featuredImage}
              alt={place ? `${project.title} — ${place}` : project.title}
              fill
              loading="lazy"
              sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 517px"
              className="object-cover transition-transform duration-500 group-hover:scale-105"
            />
          )}
        </div>
        <div className="flex flex-1 flex-col gap-2 px-7 pb-7 pt-6">
          {(category || spec) && (
            <p className="font-body text-xs font-medium uppercase tracking-[0.5px] text-green-accent">
              {[category, spec].filter(Boolean).join(" · ")}
            </p>
          )}
          <h3 className="font-body text-[28px] font-bold leading-[1.15] tracking-[-0.28px] text-text-primary">
            {project.title}
          </h3>
          {place && (
            <p className="font-body text-base leading-[1.5] text-text-secondary">
              <span aria-hidden="true" className="mr-1.5">
                ◦
              </span>
              {place}
            </p>
          )}
        </div>
      </Link>
    </article>
  );
}
