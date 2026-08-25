"use client";

import { cn } from "@/lib/utils";
import { ALL_CATEGORIES } from "@/hooks/use-projects";
import type { ProjectCategoryRef } from "@/types/project";

interface ProjectTabsProps {
  /** Categories present on published projects; an "All" pill is prepended. */
  categories: ProjectCategoryRef[];
  /** Active category `_id`, or `ALL_CATEGORIES`. */
  activeId: string;
  onChange: (categoryId: string) => void;
  className?: string;
}

/** Filter pills for the portfolio. Controlled; active pill is a solid dark pill. */
export function ProjectTabs({
  categories,
  activeId,
  onChange,
  className,
}: ProjectTabsProps) {
  const pills = [{ _id: ALL_CATEGORIES, name: "All" }, ...categories];

  return (
    <div
      role="tablist"
      aria-label="Filter projects by category"
      className={cn("flex flex-wrap items-center gap-2.5", className)}
    >
      {pills.map((tab) => {
        const isActive = tab._id === activeId;
        return (
          <button
            key={tab._id}
            type="button"
            role="tab"
            aria-selected={isActive}
            aria-controls="projects-grid"
            onClick={() => onChange(tab._id)}
            className={cn(
              "rounded-full border px-5 py-3 font-body text-base leading-none transition-colors duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-green-accent focus-visible:ring-offset-2",
              isActive
                ? "border-text-primary bg-text-primary text-white"
                : "border-border bg-bg-card text-text-secondary hover:border-text-secondary/40 hover:text-text-primary",
            )}
          >
            {tab.name}
          </button>
        );
      })}
    </div>
  );
}
