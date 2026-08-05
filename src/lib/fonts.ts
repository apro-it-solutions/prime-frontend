import localFont from "next/font/local";
import { Hanken_Grotesk, Inter } from "next/font/google";

/**
 * Type system from the Figma "prime NMS" file:
 *  - Switzer        → hero display + 72px section titles
 *  - Hanken Grotesk → stat numbers, section headings (64/48/44/40), CTA labels
 *  - Suisse Int'l   → body text (commercial; substituted with Inter)
 */

export const switzer = localFont({
  src: [
    { path: "../app/fonts/Switzer-Regular.woff2", weight: "400", style: "normal" },
    { path: "../app/fonts/Switzer-Medium.woff2", weight: "500", style: "normal" },
    { path: "../app/fonts/Switzer-Semibold.woff2", weight: "600", style: "normal" },
    { path: "../app/fonts/Switzer-Bold.woff2", weight: "700", style: "normal" },
  ],
  variable: "--font-switzer",
  display: "swap",
});

export const hanken = Hanken_Grotesk({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-hanken",
  display: "swap",
});

export const inter = Inter({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-inter",
  display: "swap",
});

export const fontVariables = `${switzer.variable} ${hanken.variable} ${inter.variable}`;
