import type { Metadata } from "next";
import { BlogHero } from "@/components/blog/blog-hero";
import { BlogListing } from "@/components/blog/blog-listing";
import { Newsletter } from "@/components/blog/newsletter";
import { SiteFooter } from "@/components/layout/site-footer";
import { PageFadeUp } from "@/components/ui/page-fade-up";

export const metadata: Metadata = {
  title: "Blog — Prime NMS Journal | Steel Construction Insights",
  description:
    "News, insights and build stories from Prime NMS — field notes on steel construction, engineering deep-dives and the projects we're proud of.",
  openGraph: {
    title: "Prime NMS Journal",
    description:
      "Field notes on steel construction, engineering deep-dives and the projects we're proud of.",
    type: "website",
  },
};

export default function BlogPage() {
  return (
    <>
      <PageFadeUp className="flex-1">
        <BlogHero />
        <BlogListing />
        <Newsletter />
      </PageFadeUp>
      <SiteFooter />
    </>
  );
}
