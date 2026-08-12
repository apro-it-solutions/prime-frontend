import { SiteHeader } from "@/components/layout/site-header";
import { SiteFooter } from "@/components/layout/site-footer";

/**
 * Shared chrome for every Service Detail page. Because the header and footer
 * live here rather than in the page, clicking a pill in the service rail swaps
 * only the content between them — no reload, no re-mounted navigation.
 */
export default function ServiceDetailChrome({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <main className="flex-1 bg-bg-base">
        <SiteHeader />
        {children}
      </main>
      <SiteFooter />
    </>
  );
}
