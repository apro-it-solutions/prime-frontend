"use client";

import { cn } from "@/lib/utils";
import { ALL_CATEGORIES } from "@/hooks/use-blogs";
import type { BlogCategoryRef } from "@/types/blog";

interface CategoryFilterProps {
  /** Categories from the backend; an "All" pill is prepended automatically. */
  categories: BlogCategoryRef[];
  /** Active category _id, or `ALL_CATEGORIES`. */
  active: string;
  onChange: (categoryId: string) => void;
  className?: string;
}

/** Category filter pills. Active pill is solid dark; the rest are outlined. */
export function CategoryFilter({
  categories,
  active,
  onChange,
  className,
}: CategoryFilterProps) {
  const pills = [
    { _id: ALL_CATEGORIES, name: "All" },
    ...categories,
  ];

  return (
    <div
      role="tablist"
      aria-label="Filter articles by category"
      className={cn("flex flex-wrap items-center gap-2.5", className)}
    >
      {pills.map((category) => {
        const isActive = category._id === active;
        return (
          <button
            key={category._id}
            type="button"
            role="tab"
            aria-selected={isActive}
            onClick={() => onChange(category._id)}
            className={cn(
              "rounded-full border px-5 py-2.5 font-body text-base leading-none transition-colors duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-green-accent focus-visible:ring-offset-2",
              isActive
                ? "border-text-primary bg-text-primary text-white"
                : "border-border bg-bg-card text-text-secondary hover:border-text-secondary/40 hover:text-text-primary",
            )}
          >
            {category.name}
          </button>
        );
      })}
    </div>
  );
}
