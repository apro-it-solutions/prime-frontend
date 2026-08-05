import { cn } from "@/lib/utils";

interface ArrowCircleProps {
  /** Diameter in px (Figma uses 30 in the nav, 40 elsewhere). */
  size?: number;
  /** Tailwind fill-* class for the circle. */
  circleClassName?: string;
  /** Tailwind fill-* class for the arrow glyph. */
  arrowClassName?: string;
  className?: string;
}

/**
 * The circular "↗" badge used across prime's CTAs. The arrow path is the exact
 * glyph exported from the Figma file, so it matches pixel-for-pixel; colors are
 * configurable because the badge inverts between button styles (green pill →
 * white circle, white pill → green circle).
 */
export function ArrowCircle({
  size = 40,
  circleClassName = "fill-green-primary",
  arrowClassName = "fill-bg-base",
  className,
}: ArrowCircleProps) {
  return (
    <span
      aria-hidden="true"
      className={cn("inline-block shrink-0", className)}
      style={{ width: size, height: size }}
    >
      <svg viewBox="0 0 40 40" fill="none" className="block size-full">
        <rect width="40" height="40" rx="20" className={circleClassName} />
        <path
          d="M16.1009 24.9027L15.1037 23.9055L22.5185 16.478H16.7912L16.804 15.0973H24.8963V23.2024H23.5028L23.5156 17.4751L16.1009 24.9027Z"
          className={arrowClassName}
        />
      </svg>
    </span>
  );
}
