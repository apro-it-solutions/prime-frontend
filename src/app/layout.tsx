import type { Metadata } from "next";
import "./globals.css";
import { fontVariables } from "@/lib/fonts";
import { StickyHeaderSlot } from "@/components/layout/sticky-header-slot";
import { Providers } from "./providers";

export const metadata: Metadata = {
  title: "Prime NMS — The Galvanized Building Specialist",
  description:
    "Pre-engineered, galvanized, built to last. prime delivers durable steel buildings across India — 500+ projects and 6,000T annual production capacity.",
  keywords: [
    "pre-engineered buildings",
    "galvanized steel",
    "PEB",
    "industrial buildings",
    "Prime NMS",
  ],
  openGraph: {
    title: "Prime NMS — The Galvanized Building Specialist",
    description:
      "We Don't Follow the Future. We Build It. Pre-engineered, galvanized, built to last.",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${fontVariables} h-full antialiased`}>
      <body className="min-h-full flex flex-col" suppressHydrationWarning>
        <Providers>
          <StickyHeaderSlot />
          {children}
        </Providers>
      </body>
    </html>
  );
}
