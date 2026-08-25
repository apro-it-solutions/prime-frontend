import { SiteHeader } from "@/components/layout/site-header";
import { SiteFooter } from "@/components/layout/site-footer";
import { ProjectDetailSkeleton } from "@/components/projects/detail/project-detail-skeleton";

/** Route-level loading UI shown while the project is fetched on the server. */
export default function ProjectDetailLoading() {
  return (
    <>
      <SiteHeader />
      <main className="flex-1 bg-bg-base">
        <ProjectDetailSkeleton />
      </main>
      <SiteFooter />
    </>
  );
}
