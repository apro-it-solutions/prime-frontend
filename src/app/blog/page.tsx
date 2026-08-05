import type { Metadata } from "next";
import { BlogHero } from "@/components/blog/blog-hero";
import { BlogListing } from "@/components/blog/blog-listing";
import { Newsletter } from "@/components/blog/newsletter";
import { SiteFooter } from "@/components/layout/site-footer";

export const metadata: Metadata = {
  title: "Blog — PrimeNMS Journal | Steel Construction Insights",
  description:
    "News, insights and build stories from PrimeNMS — field notes on steel construction, engineering deep-dives and the projects we're proud of.",
  openGraph: {
    title: "PrimeNMS Journal",
    description:
      "Field notes on steel construction, engineering deep-dives and the projects we're proud of.",
    type: "website",
  },
};

export default function BlogPage() {
  return (
    <>
      <main className="flex-1">
        <BlogHero />
        <BlogListing />
        <Newsletter />
      </main>
      <SiteFooter />
    </>
  );
}
