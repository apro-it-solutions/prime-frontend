import { ArrowUpRight } from "lucide-react";
import {
  formatCompletionDateLong,
  projectCategoryName,
} from "@/lib/project-format";
import type { Project } from "@/types/project";

/**
 * The project's factual sidebar — client, location, completion date, category —
 * plus the technologies used and an external link to the live project.
 *
 * Every row is conditional: a field the API did not return is left out entirely
 * rather than shown as "—", and the whole block disappears when the project
 * carries none of them.
 */
export function ProjectFacts({ project }: { project: Project }) {
  const facts = [
    { label: "Client", value: project.client?.trim() },
    { label: "Location", value: project.location?.trim() },
    { label: "Completed", value: formatCompletionDateLong(project.completionDate) },
    { label: "Category", value: projectCategoryName(project) },
  ].filter((fact): fact is { label: string; value: string } =>
    Boolean(fact.value),
  );

  const technologies = (project.technologies ?? []).filter((tech) =>
    tech.trim(),
  );
  const projectUrl = project.projectUrl?.trim();

  if (facts.length === 0 && technologies.length === 0 && !projectUrl) {
    return null;
  }

  return (
    <aside className="rounded-[24px] border border-green-accent-light/25 bg-bg-card p-7 shadow-[0px_8px_24px_0px_rgba(15,23,18,0.06)] lg:sticky lg:top-28">
      {facts.length > 0 && (
        <dl className="flex flex-col gap-5">
          {facts.map((fact) => (
            <div key={fact.label} className="flex flex-col gap-1.5">
              <dt className="font-body text-xs font-medium uppercase leading-[1.2] tracking-[0.5px] text-green-accent">
                {fact.label}
              </dt>
              <dd className="font-body text-lg leading-[1.4] text-text-primary">
                {fact.value}
              </dd>
            </div>
          ))}
        </dl>
      )}

      {technologies.length > 0 && (
        <div className={facts.length > 0 ? "mt-7 border-t border-border pt-7" : ""}>
          <p className="font-body text-xs font-medium uppercase leading-[1.2] tracking-[0.5px] text-green-accent">
            Technologies
          </p>
          <ul className="mt-3 flex flex-wrap gap-2.5">
            {technologies.map((tech) => (
              <li
                key={tech}
                className="rounded-pill bg-bg-sunken px-4 py-[9px] font-body text-base leading-[1.5] text-text-secondary"
              >
                {tech}
              </li>
            ))}
          </ul>
        </div>
      )}

      {projectUrl && (
        <a
          href={projectUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="mt-7 inline-flex items-center gap-2 font-body text-base leading-[1.5] text-text-primary transition-colors hover:text-green-primary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-green-accent focus-visible:ring-offset-2"
        >
          Visit project
          <ArrowUpRight aria-hidden="true" className="size-4" />
        </a>
      )}
    </aside>
  );
}
