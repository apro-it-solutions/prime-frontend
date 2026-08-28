import Image from "next/image";
import Link from "next/link";
import { cn } from "@/lib/utils";
import primeLogo from "../../../public/images/prime-main-logo.svg";

/**
 * prime NMS brand lockup — the oval mark with "THE STEEL BUILDING SPECIALIST /
 * 100% Galvanized Steel" beneath it, all part of the asset, so the tagline is
 * not rendered as separate markup. The artwork is white and green: it is meant
 * for the dark fields it sits on here (the hero header and the footer).
 * `next/image` serves the SVG unoptimized automatically because the source ends
 * in `.svg`.
 */
export function Logo({ className }: { className?: string }) {
  return (
    <Link
      href="/"
      aria-label="prime NMS — The Steel Building Specialist, home"
      className={cn("inline-flex flex-col items-center", className)}
    >
      <Image
        src={primeLogo}
        alt="prime NMS — The Steel Building Specialist"
        priority
        className="h-[110px] w-auto"
      />
    </Link>
  );
}
