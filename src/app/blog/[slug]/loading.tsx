import { SiteHeader } from "@/components/layout/site-header";
import { SiteFooter } from "@/components/layout/site-footer";
import { BlogDetailSkeleton } from "@/components/blog/detail/blog-detail-skeleton";

/** Route-level loading UI shown while the article is fetched on the server. */
export default function BlogDetailLoading() {
  return (
    <>
      <SiteHeader />
      <main className="flex-1 bg-bg-base">
        <BlogDetailSkeleton />
      </main>
      <SiteFooter />
    </>
  );
}
