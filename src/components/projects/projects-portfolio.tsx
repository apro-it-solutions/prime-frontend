"use client";

import { useMemo, useState } from "react";
import { Container } from "@/components/layout/container";
import { SectionEyebrow } from "@/components/services/section-eyebrow";
import { ProjectTabs } from "./project-tabs";
import { FeaturedProject } from "./featured-project";
import { ProjectCard } from "./project-card";
import { PROJECT_TABS, filterProjects } from "./projects-data";

/**
 * 02 + 03 — Portfolio. Holds the active-tab state so the filter pills instantly
 * update the grid below without a reload. The featured project is always shown.
 */
export function ProjectsPortfolio() {
  const [activeTab, setActiveTab] = useState("all");
  const visibleProjects = useMemo(() => filterProjects(activeTab), [activeTab]);

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
          <ProjectTabs
            tabs={PROJECT_TABS}
            activeId={activeTab}
            onChange={setActiveTab}
            className="lg:justify-end"
          />
        </div>

        {/* Featured project */}
        <div className="mt-12 lg:mt-[52px]">
          <FeaturedProject />
        </div>

        {/* Filtered grid */}
        <div
          key={activeTab}
          id="projects-grid"
          role="region"
          aria-live="polite"
          aria-label="Projects"
          className="mt-6 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3"
        >
          {visibleProjects.map((project, i) => (
            <ProjectCard
              key={project.id}
              project={project}
              className="[animation:fadeInUp_0.3s_ease_both]"
              style={{ animationDelay: `${i * 40}ms` }}
            />
          ))}
        </div>

        {visibleProjects.length === 0 && (
          <p className="mt-10 text-center font-body text-base text-text-secondary">
            No projects in this category yet.
          </p>
        )}
      </Container>
    </section>
  );
}
