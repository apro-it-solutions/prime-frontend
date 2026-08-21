import type { NextConfig } from "next";

/**
 * The blog backend serves uploaded images (featuredImage/gallery) from its own
 * origin, so `next/image` needs that host allowlisted. Derived from the same
 * env the API client uses, defaulting to the local backend.
 */
const blogApiUrl = process.env.NEXT_PUBLIC_BLOG_API_URL ?? "http://localhost:5001";
const { protocol, hostname, port } = new URL(blogApiUrl);

// The backend serves images from localhost during development. Next 16 blocks
// optimizing images that resolve to private/loopback IPs (SSRF protection), so
// opt in — but only when the backend host is actually local, keeping production
// (a real domain) strict automatically.
const isLocalHost =
  hostname === "localhost" ||
  hostname === "127.0.0.1" ||
  hostname === "::1";

const nextConfig: NextConfig = {
  // Next blocks cross-origin access to dev resources (/_next/webpack-hmr) by
  // default. When the dev server is reached over the LAN rather than
  // localhost — testing on a phone, or a browser on another machine — that
  // block stops the HMR client and the app never hydrates. Dev-only setting.
  // DHCP hands this machine a different address from time to time; list every
  // one it has answered on rather than chasing the current lease.
  allowedDevOrigins: [
    "192.168.0.113",
    "192.168.0.118",
    "192.168.0.117",
    "192.168.0.115",
    "192.168.0.104",
  ],
  images: {
    dangerouslyAllowLocalIP: isLocalHost,
    remotePatterns: [
      {
        protocol: protocol.replace(":", "") as "http" | "https",
        hostname,
        port: port || undefined,
        pathname: "/uploads/**",
      },
    ],
  },
};

export default nextConfig;
