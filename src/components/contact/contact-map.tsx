import { MapPin } from "lucide-react";
import { cn } from "@/lib/utils";

interface ContactMapProps {
  /** Search query rendered by the Google Maps embed. */
  query?: string;
  title?: string;
  /** Floating location card shown over the map. */
  placeName?: string;
  placeRegion?: string;
  className?: string;
}

/**
 * Reusable Google Map embed. Uses the keyless `output=embed` endpoint as a
 * placeholder — swap `src` for a Maps Embed API URL (with key) when available.
 * A floating location card sits over the map (matching the Figma) and lets
 * pointer events pass through to the map beneath it.
 */
export function ContactMap({
  query = "Prime NMS Private Limited, Aspeen South Gate, NH 66, Hejamady, Udupi, Karnataka 57410",
  title = "Prime NMS factory location on Google Maps",
  placeName = "Prime NMS Factory",
  placeRegion = "Hejamady, Udupi, Karnataka",
  className,
}: ContactMapProps) {
  const src = `https://www.google.com/maps?q=${encodeURIComponent(query)}&output=embed`;

  return (
    <div
      className={cn(
        "relative aspect-[1600/400] w-full overflow-hidden rounded-[24px] border border-border bg-bg-sunken",
        className,
      )}
    >
      <iframe
        title={title}
        src={src}
        loading="lazy"
        referrerPolicy="no-referrer-when-downgrade"
        allowFullScreen
        className="absolute inset-0 h-full w-full border-0"
      />

      <div className="pointer-events-none absolute left-5 top-5 flex items-center gap-3 rounded-[14px] bg-bg-card/95 px-4 py-3 shadow-[0px_8px_24px_0px_rgba(15,23,18,0.12)] backdrop-blur-sm">
        <span
          aria-hidden="true"
          className="inline-flex size-9 shrink-0 items-center justify-center rounded-full bg-green-primary text-white"
        >
          <MapPin className="size-[18px]" />
        </span>
        <span className="font-body leading-tight">
          <span className="block text-sm font-semibold text-text-primary">
            {placeName}
          </span>
          <span className="block text-sm text-text-secondary">{placeRegion}</span>
        </span>
      </div>
    </div>
  );
}
