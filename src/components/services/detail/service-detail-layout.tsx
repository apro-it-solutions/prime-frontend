import { ServiceDetailHero } from "./service-detail-hero";
import { ServiceTabs } from "./service-tabs";
import { ServiceTabPanel } from "./service-tab-panel";
import { ServiceGallery } from "./service-gallery";
import { ServiceFaq } from "./service-faq";
import { ServiceCta } from "./service-cta";
import type { ServiceDetail } from "../services-data";

/**
 * The one layout every Service Detail page renders, in the order the Figma
 * template lays it out:
 *
 *   Hero        — breadcrumb → headline → CTAs → photo + spec chips
 *   Tab strip   — this service's sub-services
 *   Tab panel   — overview + specifications for the selected sub-service
 *   Gallery     — skipped when the service has no photos
 *   FAQ         — skipped when the service has no questions
 *   CTA band
 *
 * Only the tab panel changes when a tab is clicked; everything above and below
 * it stays mounted. And nothing here branches on which service is being shown —
 * every difference lives in the {@link ServiceDetail} record passed in, so a new
 * service, or a new sub-service, is a data edit rather than a new layout.
 *
 * The panels are rendered here on the server and passed into `ServiceTabs` as
 * elements, so the tab switcher can be a Client Component without the tab data
 * (which holds icon components) ever crossing the boundary.
 */
export function ServiceDetailLayout({ service }: { service: ServiceDetail }) {
  return (
    <>
      <ServiceDetailHero service={service} />

      <ServiceTabs
        eyebrow={`Explore ${service.title}`}
        tabs={service.tabs.map(({ id, title }) => ({ id, title }))}
        panels={service.tabs.map((tab) => (
          <ServiceTabPanel
            key={tab.id}
            tab={tab}
            specsHeading={service.specsHeading}
          />
        ))}
      />

      <ServiceGallery service={service} />
      <ServiceFaq faq={service.faq} />
      <ServiceCta service={service} />
    </>
  );
}
