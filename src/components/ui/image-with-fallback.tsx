"use client";

import { useState } from "react";
import Image, { type ImageProps } from "next/image";

/**
 * Stand-in for an uploaded cover that the backend could not serve. A real
 * photograph rather than an empty frame, so a post with a missing upload still
 * reads as an article instead of looking broken.
 */
export const BLOG_IMAGE_FALLBACK = "/images/featured-facility.jpg";

type ImageWithFallbackProps = Omit<ImageProps, "src" | "onError"> & {
  src: string;
  /** Local asset shown once `src` fails to load. */
  fallbackSrc?: string;
};

/**
 * `next/image` that swaps to a local placeholder when the remote image fails.
 *
 * Uploaded covers live on the backend's `/uploads` volume while the URL lives in
 * MongoDB, so the two can drift apart — a row can reference a file the deployed
 * backend does not have, and the request 404s at render time. Without this the
 * browser paints its broken-image glyph inside the card.
 *
 * The real URL is still requested first, and the failure is logged: the point is
 * to keep the page presentable, not to paper over a missing file. The 404 stays
 * visible in the network panel and the console, so the backend side of the
 * problem is still diagnosable.
 *
 * This is the only client component in the blog image path — the cards and hero
 * that use it stay server-rendered.
 */
export function ImageWithFallback({
  src,
  fallbackSrc = BLOG_IMAGE_FALLBACK,
  alt,
  ...imageProps
}: ImageWithFallbackProps) {
  // Keyed on the failing URL rather than a boolean, so a new `src` clears the
  // failed state on its own instead of inheriting the previous image's failure.
  const [failedSrc, setFailedSrc] = useState<string | null>(null);
  const hasFailed = failedSrc === src;

  return (
    <Image
      {...imageProps}
      src={hasFailed ? fallbackSrc : src}
      alt={alt}
      onError={() => {
        if (hasFailed) return;
        // Left deliberately loud: a missing upload is a backend/volume problem
        // and should stay findable after the UI has recovered from it.
        console.error(`[blog] cover image failed to load, using placeholder: ${src}`);
        setFailedSrc(src);
      }}
    />
  );
}
