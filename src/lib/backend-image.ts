/**
 * The origin the backend's uploads are actually reachable at — the same one
 * `next.config.ts` derives `images.remotePatterns` from, so anything rebased
 * onto it is a host `next/image` will accept.
 */
const BACKEND_ORIGIN =
  process.env.NEXT_PUBLIC_BLOG_API_URL ?? "http://localhost:5001";

/**
 * Re-points an uploaded image URL at the configured backend origin.
 *
 * The backend writes *absolute* URLs for `/uploads/*`, baking in whichever
 * origin it happened to be running on when the row was created — so rows
 * authored against a developer's machine come back from the deployed API still
 * pointing at `http://localhost:5001`.
 *
 * That is not a cosmetic problem. `next/image` throws on a host outside
 * `images.remotePatterns`, and it throws during render: one stale row does not
 * fail to load a picture, it takes the whole page down with a runtime error
 * before any `onError` handler exists to catch it. Widening `remotePatterns` to
 * match would only trade the crash for an image that can never load in
 * production anyway.
 *
 * So the origin the API sends is never trusted — only the path is. Anything
 * that is not an `/uploads/**` path returns `undefined`, and callers fall back
 * to a placeholder rather than handing `next/image` a src it will reject.
 */
export function backendImageUrl(src?: string | null): string | undefined {
  if (!src) return undefined;

  try {
    // The base makes this work for root-relative paths too, should the backend
    // ever stop sending absolute URLs.
    const { pathname, search } = new URL(src, BACKEND_ORIGIN);
    if (!pathname.startsWith("/uploads/")) return undefined;
    return new URL(`${pathname}${search}`, BACKEND_ORIGIN).toString();
  } catch {
    return undefined;
  }
}
