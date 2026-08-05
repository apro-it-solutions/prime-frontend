"use client";

import { cn } from "@/lib/utils";
import type { ProjectTab } from "./projects-data";

interface ProjectTabsProps {
  tabs: ProjectTab[];
  activeId: string;
  onChange: (id: string) => void;
  className?: string;
}

/** Filter pills for the portfolio. Controlled; active pill is a solid green pill. */
export function ProjectTabs({
  tabs,
  activeId,
  onChange,
  className,
}: ProjectTabsProps) {
  return (
    <div
      role="tablist"
      aria-label="Filter projects by category"
      className={cn("flex flex-wrap items-center gap-2.5", className)}
    >
      {tabs.map((tab) => {
        const isActive = tab.id === activeId;
        return (
          <button
            key={tab.id}
            type="button"
            role="tab"
            aria-selected={isActive}
            aria-controls="projects-grid"
            onClick={() => onChange(tab.id)}
            className={cn(
              "rounded-full border px-5 py-3 font-body text-base leading-none transition-colors duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-green-accent focus-visible:ring-offset-2",
              isActive
                ? "border-text-primary bg-text-primary text-white"
                : "border-border bg-bg-card text-text-secondary hover:border-text-secondary/40 hover:text-text-primary",
            )}
          >
            {tab.label}
          </button>
        );
      })}
    </div>
  );
}
