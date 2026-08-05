import type { Metadata } from "next";
import "./globals.css";
import { fontVariables } from "@/lib/fonts";
import { Providers } from "./providers";

export const metadata: Metadata = {
  title: "prime NMS — The Galvanized Building Specialist",
  description:
    "Pre-engineered, galvanized, built to last. prime delivers durable steel buildings across India — 500+ projects and 6,000T annual production capacity.",
  keywords: [
    "pre-engineered buildings",
    "galvanized steel",
    "PEB",
    "industrial buildings",
    "prime NMS",
  ],
  openGraph: {
    title: "prime NMS — The Galvanized Building Specialist",
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
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
