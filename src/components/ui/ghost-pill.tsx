import Link from "next/link";
import { cn } from "@/lib/utils";

type GhostPillTone = "light" | "on-green";

interface GhostPillProps {
  label: string;
  href: string;
  /** "light" sits on a pale surface, "on-green" on the green CTA band. */
  tone?: GhostPillTone;
  /** Set for links that leave the site (brochures, spec sheets). */
  download?: boolean;
  className?: string;
}

/**
 * The secondary outline pill that pairs with {@link PillButton} — "Download
 * Sheet" beside the hero CTA, "View Gallery" on the CTA band (Figma 149:28 /
 * 155:34). Same 100px radius and 16px label, 1.5px border, no arrow badge.
 */
export function GhostPill({
  label,
  href,
  tone = "light",
  download = false,
  className,
}: GhostPillProps) {
  return (
    <Link
      href={href}
      {...(download ? { download: true, target: "_blank" } : {})}
      className={cn(
        "inline-flex items-center rounded-pill border-[1.5px] px-6 py-[15px] font-body text-base leading-[1.5] transition-colors duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2",
        tone === "on-green"
          ? "border-white/40 text-white hover:border-white hover:bg-white/10 focus-visible:ring-white focus-visible:ring-offset-green-primary"
          : "border-border text-text-primary hover:border-text-secondary/50 hover:bg-bg-sunken focus-visible:ring-green-accent",
        className,
      )}
    >
      {label}
    </Link>
  );
}
