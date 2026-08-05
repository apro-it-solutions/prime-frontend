import { cn } from "@/lib/utils";

/**
 * Page container. The Figma canvas is 1920px wide with 160px side gutters,
 * giving a 1600px content column that this reproduces (and pads down on
 * smaller viewports).
 */
export function Container({
  className,
  children,
}: {
  className?: string;
  children: React.ReactNode;
}) {
  return (
    <div className={cn("mx-auto w-full max-w-[1600px] px-6 lg:px-10", className)}>
      {children}
    </div>
  );
}
