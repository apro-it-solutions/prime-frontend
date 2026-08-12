import { ServiceOverview } from "./service-overview";
import { ServiceSpecs } from "./service-specs";
import type { ServiceTab } from "../services-data";

/**
 * Everything one sub-service tab shows: its overview row and its specification
 * cards. Rendered on the server, one per tab, and handed to {@link ServiceTabs}
 * as elements — which is why the icon components and static image imports in
 * `ServiceTab` never have to cross a client boundary.
 */
export function ServiceTabPanel({
  tab,
  specsHeading,
}: {
  tab: ServiceTab;
  /** Shared across a service's tabs — only the note and cards change. */
  specsHeading: string;
}) {
  return (
    <>
      <ServiceOverview
        heading={tab.content.overview.heading}
        lead={tab.content.overview.lead}
        features={tab.content.features}
        image={tab.heroImage}
      />
      <ServiceSpecs
        heading={specsHeading}
        note={tab.content.specs.note}
        items={tab.content.specs.items}
      />
    </>
  );
}
