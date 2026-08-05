"use client";

import { Search } from "lucide-react";
import { cn } from "@/lib/utils";

interface SearchBarProps {
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
  className?: string;
}

/** Controlled search input for filtering articles by title. */
export function SearchBar({
  value,
  onChange,
  placeholder = "Search articles…",
  className,
}: SearchBarProps) {
  return (
    <div className={cn("relative w-full sm:w-[360px]", className)}>
      <Search
        aria-hidden="true"
        className="pointer-events-none absolute left-4 top-1/2 size-[18px] -translate-y-1/2 text-text-secondary"
      />
      <input
        type="search"
        role="searchbox"
        aria-label="Search articles by title"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        className="h-11 w-full rounded-full border border-border bg-bg-card pl-11 pr-4 font-body text-base text-text-primary placeholder:text-text-secondary focus:border-green-accent focus:outline-none focus:ring-2 focus:ring-green-accent/30"
      />
    </div>
  );
}
