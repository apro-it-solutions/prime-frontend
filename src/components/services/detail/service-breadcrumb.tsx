import Link from "next/link";
import { ChevronRight } from "lucide-react";
import { cn } from "@/lib/utils";

interface Crumb {
  label: string;
  /** Omitted on the last crumb — the current page is not a link. */
  href?: string;
}

/**
 * Home › Services › <service> trail above the detail hero. The trailing crumb
 * is plain text carrying `aria-current="page"`, so the service name updates
 * with the route without ever linking to itself.
 */
export function ServiceBreadcrumb({
  title,
  className,
}: {
  title: string;
  className?: string;
}) {
  const crumbs: Crumb[] = [
    { label: "Home", href: "/" },
    { label: "Services", href: "/services" },
    { label: title },
  ];

  return (
    <nav aria-label="Breadcrumb" className={className}>
      <ol className="flex flex-wrap items-center gap-x-2 gap-y-1 font-body text-sm leading-[1.5] text-text-secondary">
        {crumbs.map((crumb, i) => {
          const isLast = i === crumbs.length - 1;
          return (
            <li key={crumb.label} className="flex items-center gap-2">
              {crumb.href ? (
                <Link
                  href={crumb.href}
                  className="rounded-sm transition-colors hover:text-green-primary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-green-accent focus-visible:ring-offset-2"
                >
                  {crumb.label}
                </Link>
              ) : (
                <span
                  aria-current="page"
                  className={cn("text-text-primary", isLast && "font-medium")}
                >
                  {crumb.label}
                </span>
              )}
              {!isLast && (
                <ChevronRight
                  aria-hidden="true"
                  className="size-3.5 text-text-secondary/60"
                />
              )}
            </li>
          );
        })}
      </ol>
    </nav>
  );
}
