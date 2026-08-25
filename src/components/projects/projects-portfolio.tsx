"use client";

import { useState } from "react";
import { Container } from "@/components/layout/container";
import { SectionEyebrow } from "@/components/services/section-eyebrow";
import {
  ALL_CATEGORIES,
  useFeaturedProject,
  useProjectCategories,
  useProjects,
} from "@/hooks/use-projects";
import { ProjectTabs } from "./project-tabs";
import { FeaturedProject } from "./featured-project";
import { ProjectCard } from "./project-card";
import {
  FeaturedProjectSkeleton,
  ProjectsGridSkeleton,
} from "./loading-skeleton";
import { ProjectsEmptyState, ProjectsErrorState } from "./states";

/**
 * 02 + 03 — Portfolio. Every project here comes from the backend
 * (`GET /api/v1/projects`); nothing is hardcoded.
 *
 * Holds the active-category state so the filter pills instantly update the grid
 * below without a reload — the change is a keyed refetch, cached per category.
 * The featured band is its own query so it stays put while the grid filters.
 */
export function ProjectsPortfolio() {
  const [activeCategory, setActiveCategory] = useState(ALL_CATEGORIES);

  const { data: categories = [] } = useProjectCategories();
  const featured = useFeaturedProject();
  const {
    data: projects = [],
    isLoading,
    isError,
    refetch,
  } = useProjects(activeCategory);

  const isFiltered = activeCategory !== ALL_CATEGORIES;

  return (
    <section className="bg-bg-base py-20 lg:py-[100px]">
      <Container>
        {/* Header + filter pills */}
        <div className="flex flex-col gap-8 lg:flex-row lg:items-end lg:justify-between lg:gap-12">
          <div>
            <SectionEyebrow label="Our Portfolio" variant="plain" className="text-green-accent" />
            <h2 className="mt-4 font-heading text-4xl font-semibold leading-[1.15] tracking-[-0.56px] text-text-primary sm:text-5xl lg:text-[56px]">
              Selected work.
            </h2>
          </div>
          {categories.length > 0 && (
            <ProjectTabs
              categories={categories}
              activeId={activeCategory}
              onChange={setActiveCategory}
              className="lg:justify-end"
            />
          )}
        </div>

        {/* Featured project — skipped entirely when the API has none. */}
        {(featured.isLoading || featured.data) && (
          <div className="mt-12 lg:mt-[52px]">
            {featured.isLoading ? (
              <FeaturedProjectSkeleton />
            ) : (
              featured.data && <FeaturedProject project={featured.data} />
            )}
          </div>
        )}

        {/* Filtered grid */}
        <div
          id="projects-grid"
          role="region"
          aria-live="polite"
          aria-label="Projects"
          className="mt-6"
        >
          {isLoading ? (
            <ProjectsGridSkeleton />
          ) : isError ? (
            <ProjectsErrorState onRetry={() => refetch()} />
          ) : projects.length === 0 ? (
            <ProjectsEmptyState
              title={isFiltered ? "No projects in this category yet" : undefined}
              message={
                isFiltered
                  ? "Nothing has been published under this category so far."
                  : undefined
              }
              onReset={
                isFiltered ? () => setActiveCategory(ALL_CATEGORIES) : undefined
              }
            />
          ) : (
            <div
              key={activeCategory}
              className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3"
            >
              {projects.map((project, i) => (
                <ProjectCard
                  key={project._id}
                  project={project}
                  className="[animation:fadeInUp_0.3s_ease_both]"
                  style={{ animationDelay: `${i * 40}ms` }}
                />
              ))}
            </div>
          )}
        </div>
      </Container>
    </section>
  );
}
