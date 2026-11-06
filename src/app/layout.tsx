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
  verification: {
    google: "UhCDRkGWfdHBOL8F-gne58hIB825SRGN-PoAo2SsOxE",
  },
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
        {/* Google Tag Manager */}
        <Script
          id="google-tag-manager"
          strategy="afterInteractive"
        >
          {`
            (function(w,d,s,l,i){
              w[l]=w[l]||[];
              w[l].push({'gtm.start': new Date().getTime(),event:'gtm.js'});
              var f=d.getElementsByTagName(s)[0],
              j=d.createElement(s),
              dl=l!='dataLayer'?'&l='+l:'';
              j.async=true;
              j.src='https://www.googletagmanager.com/gtm.js?id='+i+dl;
              f.parentNode.insertBefore(j,f);
            })(window,document,'script','dataLayer','GTM-5CPSQHNV');
          `}
        </Script>
        <Providers>
          <StickyHeaderSlot />
          {children}
        </Providers>
      </body>
    </html>
  );
}
