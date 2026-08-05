import Image from "next/image";
import Link from "next/link";
import { cn } from "@/lib/utils";
import primeLogo from "../../../public/images/prime-logo.svg";

/**
 * prime brand lockup (exported from Figma). The SVG is the whole lockup — brand
 * mark plus the "The Galvanized Building Specialist" tagline pill beneath it —
 * so the tagline is not rendered as separate markup. `next/image` serves it
 * unoptimized automatically because the source ends in `.svg`.
 */
export function Logo({ className }: { className?: string }) {
  return (
    <Link
      href="/"
      aria-label="prime — The Galvanized Building Specialist, home"
      className={cn("inline-flex flex-col items-center", className)}
    >
      <Image
        src={primeLogo}
        alt="prime — The Galvanized Building Specialist"
        priority
        className="h-[110px] w-auto"

      />
    </Link>
  );
}
