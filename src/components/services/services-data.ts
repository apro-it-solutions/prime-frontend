import type { StaticImageData } from "next/image";
import {
  ArrowLeftRight,
  BadgeCheck,
  Blinds,
  Building2,
  CloudRain,
  Cog,
  Combine,
  Droplets,
  Factory,
  Fan,
  Flame,
  Forklift,
  Gauge,
  Hammer,
  HardHat,
  Home,
  Layers,
  LayoutGrid,
  Lightbulb,
  Lock,
  Move3d,
  PanelTop,
  Ruler,
  Scaling,
  ShieldCheck,
  Snowflake,
  SquareStack,
  Sun,
  Thermometer,
  ThermometerSnowflake,
  Timer,
  Truck,
  Utensils,
  Waves,
  Weight,
  Wind,
  Wrench,
  Zap,
  type LucideIcon,
} from "lucide-react";

import pebImg from "../../../public/images/service-peb.png";
import pufImg from "../../../public/images/service-puf.png";
import roofingImg from "../../../public/images/service-roofing.png";
import coldroomImg from "../../../public/images/service-coldroom.png";
import fabricationImg from "../../../public/images/service-fabrication.png";
import bandWarehouse from "../../../public/images/band-warehouse.png";
import ctaBuilding from "../../../public/images/cta-building.png";
import projectCtaBuilding from "../../../public/images/project-cta-building.png";
import roofingDaylight from "../../../public/images/service-roofing-daylight.png";
import roofingInterior from "../../../public/images/service-roofing-interior.png";
import roofingSeam from "../../../public/images/service-roofing-seam.png";
import featuredFacility from "../../../public/images/featured-facility.jpg";
import serviceBenefits from "../../../public/images/service-benefits.png";
import whyFacility from "../../../public/images/service-why-facility.png";
import projectHighland from "../../../public/images/project-highland-coldstorage.png";
import projectMetro from "../../../public/images/project-metro-distribution.png";
import projectSkyline from "../../../public/images/project-skyline-commercial.png";
import projectCoastal from "../../../public/images/project-coastal-industrial.png";
import projectPrime from "../../../public/images/project-prime-manufacturing.png";

/* Photographs lifted from the Prime product catalogue. These are the company's
   own project and product shots, so a tab shows the thing it describes rather
   than a stand-in. */
import pebWarehouse from "../../../public/images/catalogue/peb-warehouse.jpg";
import pebIndustrial from "../../../public/images/catalogue/peb-industrial.jpg";
import pebHighriseFrame from "../../../public/images/catalogue/peb-highrise-frame.jpg";
import pebHighriseAerial from "../../../public/images/catalogue/peb-highrise-aerial.jpg";
import pebStructural3d from "../../../public/images/catalogue/peb-structural-3d.jpg";
import pebVillaTwostorey from "../../../public/images/catalogue/peb-villa-twostorey.jpg";
import pebVillaTileroof from "../../../public/images/catalogue/peb-villa-tileroof.jpg";
import pebVillaModern from "../../../public/images/catalogue/peb-villa-modern.jpg";
import pebMezzanineDecking from "../../../public/images/catalogue/peb-mezzanine-decking.jpg";
import pebSnowpark from "../../../public/images/catalogue/peb-snowpark.jpg";
import panelInsulatedBuilding from "../../../public/images/catalogue/panel-insulated-building.jpg";
import panelInsuroofProfiles from "../../../public/images/catalogue/panel-insuroof-profiles.jpg";
import roofAquaproofSolar from "../../../public/images/catalogue/roof-aquaproof-solar.jpg";
import roofStoneColours from "../../../public/images/catalogue/roof-stone-colours.jpg";
import roofStoneLayers from "../../../public/images/catalogue/roof-stone-layers.jpg";
import roofArchpan from "../../../public/images/catalogue/roof-archpan.jpg";
import roofCurvedWalkway from "../../../public/images/catalogue/roof-curved-walkway.jpg";
import roofWallCladding from "../../../public/images/catalogue/roof-wall-cladding.jpg";
import coldroomCorridor from "../../../public/images/catalogue/coldroom-corridor.jpg";
import doorSectionalGlazed from "../../../public/images/catalogue/door-sectional-glazed.jpg";
import doorGarage from "../../../public/images/catalogue/door-garage.jpg";
import doorIndustrialRow from "../../../public/images/catalogue/door-industrial-row.jpg";
import windowAluminiumBifold from "../../../public/images/catalogue/window-aluminium-bifold.jpg";
import windowSlidingView from "../../../public/images/catalogue/window-sliding-view.jpg";
import handrailGlass from "../../../public/images/catalogue/handrail-glass.jpg";
import handrailStairs from "../../../public/images/catalogue/handrail-stairs.jpg";

/** A photo with the alt text that always travels with it. */
export interface ServiceImage {
  src: StaticImageData;
  alt: string;
}

/** One of the three floating chips over the hero photo (Figma 161:305–313). */
export interface ServiceHeroStat {
  value: string;
  label: string;
}

/** An icon + title + body card. Used by the overview lead card and the strip. */
export interface ServiceFeature {
  icon: LucideIcon;
  title: string;
  body: string;
}

/** A single "Engineered to the detail" spec card (Figma 155:6). */
export interface ServiceSpec {
  /** Small green uppercase label, e.g. "CLEAR SPAN". */
  label: string;
  /** The bold headline value, e.g. "up to 90m". */
  value: string;
  /** Supporting line under the value. */
  detail: string;
}

export interface ServiceFaqItem {
  question: string;
  answer: string;
}

/** Everything the tab panel swaps in when a sub-service is selected. */
export interface ServiceTabContent {
  overview: {
    /** Section headline. A newline forces the Figma's two-line break. */
    heading: string;
    /** The large white lead card beside the photo. */
    lead: ServiceFeature;
  };
  /** The three cards under the overview row. */
  features: ServiceFeature[];
  specs: {
    /** Right-aligned note beside the specifications heading. */
    note: string;
    items: ServiceSpec[];
  };
}

/**
 * One sub-service of a service — the tabs on a detail page. These belong to
 * their parent service alone: opening a different service shows a different
 * set. Selecting one never changes the route.
 */
export interface ServiceTab {
  /** Stable id used for the tab's DOM ids and React key. */
  id: string;
  title: string;
  /** The photo shown beside this sub-service's overview card. */
  heroImage: ServiceImage;
  content: ServiceTabContent;
}

/**
 * Everything one Service Detail page renders. The layout is fixed by the Figma
 * template (`Product Detail — Skylights`); only these values change per service,
 * and within a page only `tabs[n].content` changes as tabs are selected.
 */
export interface ServiceDetail {
  /** URL segment — `/services/<slug>`. */
  slug: string;
  /** Full service name, as shown on the Services listing page. */
  title: string;
  /** Hero display headline (the Figma sets it with a trailing period). */
  heroTitle: string;
  /** Hero lead paragraph. */
  description: string;
  /** Hero photo (the 880×520 rounded panel). */
  bannerImage: ServiceImage;
  /** Card photo on the Services listing grid. */
  cardImage: ServiceImage;
  /** One-line summary for the listing card. */
  cardDescription: string;
  /** The three chips floating over the hero photo. */
  heroStats: ServiceHeroStat[];
  /** Shared heading above the per-tab specification cards. */
  specsHeading: string;
  /** This service's sub-services. The first is selected on load. */
  tabs: ServiceTab[];
  /** Optional photo strip; the section is skipped when empty. */
  gallery: ServiceImage[];
  /** Optional questions; the section is skipped when empty. */
  faq: ServiceFaqItem[];
  cta: {
    heading: string;
    body: string;
    image: ServiceImage;
  };
  /** SEO description for the route's metadata. */
  metaDescription: string;
}

/**
 * The single source of truth for services — the listing grid and every detail
 * page read from this array, so adding a service here adds its card and its
 * route in one edit, and adding a tab adds it to that service alone.
 *
 * Content follows the Prime Group product catalogue: figures, profile codes,
 * material grades and test standards are quoted from it rather than estimated.
 */
export const SERVICES: ServiceDetail[] = [
  {
    slug: "pre-engineered-buildings",
    title: "Pre-Engineered Buildings",
    heroTitle: "Pre-Engineered Buildings.",
    description:
      "Rigid frames, endwall columns, purlins and girts engineered and fabricated under one roof — cost-effective in material, quick to erect and finished to look the part.",
    bannerImage: {
      src: pebWarehouse,
      alt: "Large pre-engineered steel warehouse building completed by Prime",
    },
    cardImage: {
      src: pebImg,
      alt: "Pre-engineered galvanized steel building structure",
    },
    cardDescription:
      "Rigid-frame steel buildings for industry, high-rise, mezzanines and villas.",
    heroStats: [
      { value: "up to 30m", label: "eave height" },
      { value: "up to 20", label: "floors" },
      { value: "4 code standards", label: "IS, AISC, AS, EN" },
    ],
    specsHeading: "Engineered to the detail.",
    tabs: [
      {
        id: "industrial",
        title: "Industrial Buildings",
        heroImage: {
          src: pebIndustrial,
          alt: "Pre-engineered industrial building with profiled steel cladding",
        },
        content: {
          overview: {
            heading: "Rigid frames,\nbay by bay.",
            lead: {
              icon: Factory,
              title: "The PEB steel structure",
              body: "Interior rigid frames, endwall bearing or rigid frames and endwall wind columns carry the building, with roof purlins, wall girts and wind bracing tying it together. Roof monitors, mezzanines, canopies, fascias, parapets and framed openings are engineered in as subsystems rather than added afterwards.",
            },
          },
          features: [
            {
              icon: Ruler,
              title: "Economical bays",
              body: "Interior bays at 7.5–8.5m.",
            },
            {
              icon: Scaling,
              title: "Shorter end bays",
              body: "6m or less, by-pass girts.",
            },
            {
              icon: CloudRain,
              title: "1/10 roof slope",
              body: "The ideal pitch; any slope possible.",
            },
          ],
          specs: {
            note: "Building width is measured outside eave strut to outside eave strut; length is the sum of all bay lengths.",
            items: [
              {
                label: "INTERIOR BAY",
                value: "6–10m",
                detail: "Most economical at 7.5–8.5m",
              },
              {
                label: "END BAY",
                value: "6m or less",
                detail: "With by-pass endwall girts",
              },
              {
                label: "EAVE HEIGHT",
                value: "up to 30m",
                detail: "Base plate to eave strut",
              },
              {
                label: "PURLIN SPACING",
                value: "1500mm",
                detail: "600mm at the ridge",
              },
            ],
          },
        },
      },
      {
        id: "high-rise",
        title: "High Rise Steel Buildings",
        heroImage: {
          src: pebHighriseFrame,
          alt: "G+6 factory building under erection — foundation to completion in 100 days",
        },
        content: {
          overview: {
            heading: "Twenty floors,\nin steel.",
            lead: {
              icon: Building2,
              title: "Multistorey, fast",
              body: "Prime offers multistorey steel buildings up to 20 floors, with the flexibility in design and space utilisation architects ask for. A five-floor building of 20,000 sq.ft built-up area completes in under 90 days, and a G+6 factory has gone from foundation to completion in 100 days.",
            },
          },
          features: [
            {
              icon: Timer,
              title: "G+6 in 100 days",
              body: "Foundation to completion.",
            },
            {
              icon: Layers,
              title: "Fast-track walls",
              body: "Sandwich panel, not block work.",
            },
            {
              icon: ShieldCheck,
              title: "Seismic designed",
              body: "For the loads of the region.",
            },
          ],
          specs: {
            note: "Fast-track construction replaces conventional block walls with insulated sandwich panels and floors with deck panel and foam concrete.",
            items: [
              {
                label: "STOREYS",
                value: "up to 20",
                detail: "Multistorey steel framing",
              },
              {
                label: "BUILD TIME",
                value: "under 90 days",
                detail: "20,000 sq.ft over five floors",
              },
              {
                label: "WALLS",
                value: "Sandwich Panel",
                detail: "Replacing block construction",
              },
              {
                label: "FLOOR SYSTEM",
                value: "Deck + Foam",
                detail: "Or normal concrete slab",
              },
            ],
          },
        },
      },
      {
        id: "villas",
        title: "Pre-Engineered Villas",
        heroImage: {
          src: pebVillaTwostorey,
          alt: "Two-storey pre-engineered villa finished in blue and white",
        },
        content: {
          overview: {
            heading: "A house, in\nthirty days.",
            lead: {
              icon: Home,
              title: "An alternative to sand and cement",
              body: "Highly cost-effective, durable, thermally and acoustically insulated residential units built from injected polyurethane sandwich panel, faced inside and out with polyester coated aluminium or galvalume. Electrical and plumbing services run concealed through the panels, and the structure is earthquake resistant.",
            },
          },
          features: [
            {
              icon: Timer,
              title: "1,000 sq.ft",
              body: "A typical unit in under 30 days.",
            },
            {
              icon: ShieldCheck,
              title: "Earthquake resistant",
              body: "Panel structure, not masonry.",
            },
            {
              icon: Thermometer,
              title: "Insulated as built",
              body: "Thermal and acoustic in the panel.",
            },
          ],
          specs: {
            note: "Ideal for housing units and for chalets in tourism resorts on terrain that is difficult to access.",
            items: [
              {
                label: "BUILD TIME",
                value: "under 30 days",
                detail: "A typical 1,000 sq.ft unit",
              },
              {
                label: "COST",
                value: "₹800–1200",
                detail: "Per sq.ft, by specification",
              },
              {
                label: "STRUCTURE",
                value: "PU Sandwich Panel",
                detail: "Injected polyurethane core",
              },
              {
                label: "FACES",
                value: "Aluminium · Galvalume",
                detail: "Polyester coated both sides",
              },
            ],
          },
        },
      },
      {
        id: "mezzanine",
        title: "Mezzanine Floors",
        heroImage: {
          src: pebMezzanineDecking,
          alt: "Steel mezzanine floors with profiled decking under construction",
        },
        content: {
          overview: {
            heading: "A floor inside\nthe building.",
            lead: {
              icon: SquareStack,
              title: "Columns, beams, joists, deck",
              body: "A mezzanine is intermediate support columns, main beams, joists and a deck fastened to the joists with self-drilling fasteners. Clear height below the mezzanine beam runs 3–4m above finished floor level, with joists spaced at roughly 1.75m for a 100mm concrete slab.",
            },
          },
          features: [
            {
              icon: Ruler,
              title: "Joists at 1.75m",
              body: "Spaced for a 100mm slab.",
            },
            {
              icon: Weight,
              title: "2000 kg/sq.m",
              body: "Live load on thick decking.",
            },
            {
              icon: Combine,
              title: "Flush connections",
              body: "Joists frame into the beams.",
            },
          ],
          specs: {
            note: "Beams are built-up I-sections spanning in the direction of the rigid frame rafters; columns are square tube or built-up I as design requires.",
            items: [
              {
                label: "CLEAR HEIGHT",
                value: "3–4m",
                detail: "Below the beam, above FFL",
              },
              {
                label: "JOIST SPACING",
                value: "1.75m",
                detail: "For a 100mm concrete slab",
              },
              {
                label: "COLUMNS",
                value: "Tube · Built-Up I",
                detail: "As required by design",
              },
              {
                label: "DECK",
                value: "0.5–0.9mm",
                detail: "Permanent shuttering",
              },
            ],
          },
        },
      },
      {
        id: "turnkey",
        title: "Turnkey Solutions",
        heroImage: {
          src: pebStructural3d,
          alt: "Structural 3D model of a pre-engineered steel frame",
        },
        content: {
          overview: {
            heading: "One responsibility,\nstart to finish.",
            lead: {
              icon: HardHat,
              title: "Design, fabricate, supply, erect",
              body: "Single responsibility — one stop for the design, fabrication and supply of your pre-engineered steel building, with an in-house erection and supervision division to see the project finished on time. Total solution covers project evaluation, feasibility design and execution of the civil work as well as the steel structure.",
            },
          },
          features: [
            {
              icon: Factory,
              title: "One factory",
              body: "Every component under one roof.",
            },
            {
              icon: BadgeCheck,
              title: "Mill test certificates",
              body: "With all raw materials supplied.",
            },
            {
              icon: Wrench,
              title: "In-house erection",
              body: "Own supervision division.",
            },
          ],
          specs: {
            note: "Strong stock of raw materials and high production capacity give faster and better project cycle times.",
            items: [
              {
                label: "RESPONSIBILITY",
                value: "Single Point",
                detail: "Design, fabrication and supply",
              },
              {
                label: "DESIGN CODES",
                value: "IS · AISC · AS · EN",
                detail: "In-house engineering team",
              },
              {
                label: "MATERIALS",
                value: "Mill Certified",
                detail: "MTC with every consignment",
              },
              {
                label: "ERECTION",
                value: "In-House",
                detail: "Erection and supervision division",
              },
            ],
          },
        },
      },
    ],
    gallery: [
      { src: pebHighriseAerial, alt: "High rise steel frame rising floor by floor over a live site" },
      { src: pebSnowpark, alt: "Snow park at Athirappilly, clad in a patterned steel facade" },
      { src: pebVillaModern, alt: "Contemporary steel-framed residence" },
      { src: projectPrime, alt: "Prime manufacturing plant" },
    ],
    faq: [
      {
        question: "What bay lengths are the most economical?",
        answer:
          "The most common interior bay lengths in the PEB industry are 6, 7.5, 8, 9 and 10m, and the most economical range is 7.5–8.5m. For maximum economy keep the interior bays equal, hold end bays to 6m or less and use by-pass endwall girts.",
      },
      {
        question: "Which design codes do you build to?",
        answer:
          "In-house engineering designs to American, Australian, European and Indian Standard codes. High quality raw materials are supplied complete with mill test certificates, and every product is accompanied by an MTC and packing list.",
      },
      {
        question: "How tall can a Prime steel building go?",
        answer:
          "Eave heights up to 30m are possible on single-storey frames, and the multistorey system goes up to 20 floors. A five-floor building with 20,000 sq.ft of built-up area can be completed in less than 90 days.",
      },
      {
        question: "What is the ideal roof slope?",
        answer:
          "1/10 is the ideal roof slope, though any practical slope is possible. Typical purlin spacing is 1500mm, reducing to 600mm at the ridge to accommodate optional 600mm ridge gravity ventilators.",
      },
    ],
    cta: {
      heading: "Start your next build in steel.",
      body: "Send us your building width, bay spacing and eave height — we'll engineer and quote the frame.",
      image: {
        src: ctaBuilding,
        alt: "Completed Prime NMS pre-engineered steel building",
      },
    },
    metaDescription:
      "Pre-engineered steel buildings from Prime — rigid-frame industrial buildings to 30m eave height, high-rise steel to 20 floors, mezzanines, villas and turnkey execution designed to IS, AISC, AS and EN codes.",
  },
  {
    slug: "sandwich-puf-panels",
    title: "Sandwich PUF Panels",
    heroTitle: "Sandwich PUF Panels.",
    description:
      "Rigid polyurethane foam sandwiched between metal or flexible facings, manufactured from 25mm to 200mm to the highest international standards — a cost-effective system for buildings and energy conservation.",
    bannerImage: {
      src: panelInsulatedBuilding,
      alt: "Building envelope clad entirely in insulated sandwich panels",
    },
    cardImage: { src: pufImg, alt: "Insulated sandwich PUF panels" },
    cardDescription:
      "Insulated roof, wall, polycarbonate and rockwool panels with an engineered core.",
    heroStats: [
      { value: "25–200mm", label: "panel thickness" },
      { value: "0.024 W/mK", label: "K value" },
      { value: "35–40 kg/m³", label: "core density" },
    ],
    specsHeading: "Engineered to the detail.",
    tabs: [
      {
        id: "roof-panels",
        title: "Roof Panels",
        heroImage: {
          src: roofAquaproofSolar,
          alt: "Aquaproof insulated roof carrying solar panels fixed without penetration",
        },
        content: {
          overview: {
            heading: "One layer, roof\nto ceiling.",
            lead: {
              icon: PanelTop,
              title: "Aquaproof sandwich panels",
              body: "Aquaproof roofing sheets are available as insulated panels, with rigid polyurethane foam sandwiched between two metal sheets. Panels run from 30mm to 75mm thick and give a cost-effective route to excellent thermal insulation in steel buildings, for energy conservation.",
            },
          },
          features: [
            {
              icon: Droplets,
              title: "100% leak proof",
              body: "No screw penetrates the sheet.",
            },
            {
              icon: Sun,
              title: "Solar ready",
              body: "Clamps fix without penetration.",
            },
            {
              icon: Zap,
              title: "Energy conservation",
              body: "Insulation cuts the cooling load.",
            },
          ],
          specs: {
            note: "Composite panels are produced with internal and external sheets of aluminium, steel or other architectural materials in different thickness, coating and colour.",
            items: [
              {
                label: "THICKNESS",
                value: "30–75mm",
                detail: "Insulated Aquaproof panels",
              },
              {
                label: "PROFILE",
                value: "6-Rib Aquaproof",
                detail: "Self-locking caps at the ribs",
              },
              {
                label: "CORE",
                value: "Rigid PU Foam",
                detail: "Between two metal sheets",
              },
              {
                label: "INSUROOF TILE",
                value: "1065mm",
                detail: "Nominal width, 195mm tile pitch",
              },
            ],
          },
        },
      },
      {
        id: "wall-panels",
        title: "Wall & Liner Panels",
        heroImage: {
          src: panelInsuroofProfiles,
          alt: "Insuroof insulated tile and Trafford panel profile drawings",
        },
        content: {
          overview: {
            heading: "A wall that\ninsulates itself.",
            lead: {
              icon: LayoutGrid,
              title: "Polyprime liner sandwich panels",
              body: "The ultimate cost-effective solution for insulated roof and wall: a polyprime liner panel starting at 30mm thick, priced around 20% below a metal liner in any colour while performing the same function. Applications run from walls and cabin partitions to mezzanine decks and industrial doors.",
            },
          },
          features: [
            {
              icon: Weight,
              title: "Light, load bearing",
              body: "High capacity at low weight.",
            },
            {
              icon: Timer,
              title: "Rapid erection",
              body: "No lifting equipment needed.",
            },
            {
              icon: BadgeCheck,
              title: "20% cheaper",
              body: "Than an equivalent metal liner.",
            },
          ],
          specs: {
            note: "Excellent water and vapour barrier, good sound insulation, easy repair and replacement, and a green product that is reusable.",
            items: [
              {
                label: "THICKNESS",
                value: "from 30mm",
                detail: "Polyprime liner panels",
              },
              {
                label: "SAVING",
                value: "20% cheaper",
                detail: "Against a metal liner",
              },
              {
                label: "FACINGS",
                value: "Aluminium · Steel",
                detail: "Architectural options available",
              },
              {
                label: "TRAFFORD PANEL",
                value: "1012mm",
                detail: "Cover width, 1092mm overall",
              },
            ],
          },
        },
      },
      {
        id: "polycarbonate-panels",
        title: "Polycarbonate Panels",
        heroImage: {
          src: projectSkyline,
          alt: "Polycarbonate sandwich panel cladding on a building",
        },
        content: {
          overview: {
            heading: "Insulation, where\nsteel corrodes.",
            lead: {
              icon: ShieldCheck,
              title: "Polyurethane between polycarbonate",
              body: "Polycarbonate sandwich panels are produced using polyurethane with internal and external sheets of polycarbonate, from 30mm to 200mm thick. They are used in high-saline corrosion segments — marine industry cold rooms among them — where a metal facing would not hold up.",
            },
          },
          features: [
            {
              icon: Waves,
              title: "Saline resistant",
              body: "Built for marine environments.",
            },
            {
              icon: Layers,
              title: "30–200mm",
              body: "The full thickness range.",
            },
            {
              icon: Snowflake,
              title: "Cold room duty",
              body: "Used on marine cold rooms.",
            },
          ],
          specs: {
            note: "One of a range that also includes bamboo ply wall panels for partition and external walls.",
            items: [
              {
                label: "THICKNESS",
                value: "30–200mm",
                detail: "Polyurethane core",
              },
              {
                label: "FACINGS",
                value: "Polycarbonate",
                detail: "Internal and external sheets",
              },
              {
                label: "APPLICATION",
                value: "High Saline",
                detail: "Marine industry cold rooms",
              },
              {
                label: "CORE",
                value: "Rigid PU Foam",
                detail: "Closed cell content above 90%",
              },
            ],
          },
        },
      },
      {
        id: "rockwool-panels",
        title: "Rockwool Panels",
        heroImage: {
          src: projectCoastal,
          alt: "Industrial facility clad in rockwool sandwich panels",
        },
        content: {
          overview: {
            heading: "The same panel,\na mineral core.",
            lead: {
              icon: Flame,
              title: "Rockwool where fire governs",
              body: "High-density lamellar rockwool replaces the polyurethane core where fire performance is specified. The panel is non-combustible to BS 476 Part 4, holds 30 minutes fire resistance to BS 476 Part 8 and classifies A1/A2 to DIN 4102, while cutting sound transmission by 26 to 30 dB.",
            },
          },
          features: [
            {
              icon: Flame,
              title: "Non-combustible",
              body: "BS 476 Part 4 classified.",
            },
            {
              icon: ShieldCheck,
              title: "30 min resistance",
              body: "BS 476 Part 8 fire rating.",
            },
            {
              icon: Waves,
              title: "26–30 dB",
              body: "Sound transmission loss.",
            },
          ],
          specs: {
            note: "Supplied up to 1m effective width in single lengths up to 12m without joints, depending on site requirements.",
            items: [
              {
                label: "THICKNESS",
                value: "50–120mm",
                detail: "Roof and wall panel profiles",
              },
              {
                label: "DENSITY",
                value: "100 ±15 kg/m³",
                detail: "High density lamellar rockwool",
              },
              {
                label: "K VALUE",
                value: "0.040 W/mK",
                detail: "Maximum at 10°C mean temp",
              },
              {
                label: "MELTING POINT",
                value: "over 1000°C",
                detail: "Application range −30 to 250°C",
              },
            ],
          },
        },
      },
    ],
    gallery: [
      { src: panelInsulatedBuilding, alt: "Insulated panel building envelope" },
      { src: coldroomCorridor, alt: "Cold room corridor built from insulated panels" },
      { src: bandWarehouse, alt: "Insulated warehouse envelope" },
    ],
    faq: [
      {
        question: "What thickness of panel do I need?",
        answer:
          "Panels are manufactured from 25mm to 200mm, with the polyurethane itself available from 15mm. Thickness follows the U-value you need: at 35 kg/m³ density, 25mm gives 0.96 W/m²°C, 35mm gives 0.68 and 50mm gives 0.48. Higher density is available on request.",
      },
      {
        question: "What is the fire classification?",
        answer:
          "The polyurethane foam is equipped with reactive and non-reactive flame retardants and meets DIN 4102 Class B3. Where a higher classification is required, the rockwool panel classifies A1/A2 to DIN 4102 and is non-combustible to BS 476 Part 4.",
      },
      {
        question: "What are the foam properties?",
        answer:
          "Moulded density 35 kg/m³, closed-cell content above 90%, initial thermal conductivity 21 mW/mK at 23°C and compressive strength of 140 kPa perpendicular to the panel. Dimensional change stays within 1% after 48 hours at both −25°C and 70°C.",
      },
      {
        question: "Where are these panels used?",
        answer:
          "Domestic roofs, walls and cabin partitions, cold rooms and storage, industrial and garage doors, and mezzanine decks — as well as chalets for the tourism sector, schools, institutions and specialised food industry applications.",
      },
    ],
    cta: {
      heading: "Insulate the whole envelope.",
      body: "Tell us your span, temperature range and finish — we'll specify and quote the right panel.",
      image: {
        src: projectCtaBuilding,
        alt: "Building clad in insulated sandwich panels",
      },
    },
    metaDescription:
      "Insulated sandwich panels from Prime — polyurethane roof, wall, polycarbonate and rockwool panels from 25 to 200mm, with K values from 0.024 W/mK and DIN 4102 fire classification.",
  },
  {
    slug: "roofing-wall-sheets",
    title: "Roofing & Wall Sheets",
    heroTitle: "Roofing & Wall Sheets.",
    description:
      "Aquaproof, tile, Trafford, Arch Pan and decking profiles rolled in aluminium and steel aluzinc — every colour to the customer's choice, coated to hold it.",
    bannerImage: {
      src: roofingDaylight,
      alt: "Daylit steel roof structure over an industrial interior",
    },
    cardImage: { src: roofingImg, alt: "Profiled roofing and wall sheets" },
    cardDescription:
      "Aquaproof, tile, Trafford and Arch Pan profiles in aluminium and steel aluzinc.",
    heroStats: [
      { value: "0.4–0.9mm", label: "sheet thickness" },
      { value: "340 MPa", label: "aluzinc yield" },
      { value: "AZ150", label: "alloy coating" },
    ],
    specsHeading: "Engineered to the detail.",
    tabs: [
      {
        id: "aquaproof",
        title: "Aquaproof Roofing",
        heroImage: {
          src: roofAquaproofSolar,
          alt: "Aquaproof roof sheeting with solar panels clamped to the ribs",
        },
        content: {
          overview: {
            heading: "A roof with no\nscrews in it.",
            lead: {
              icon: Droplets,
              title: "100% leak proof",
              body: "Aquaproof is a 100% leak-proof profile sheet with self-locking caps at alternate ribs, optional at every rib. Tighten the sheet with screws first, then press the caps on over the ribs and nothing is left exposed to the weather. It lays over Z purlins or box purlins.",
            },
          },
          features: [
            {
              icon: Sun,
              title: "Solar without holes",
              body: "Clamps grip the rib, not the sheet.",
            },
            {
              icon: Lock,
              title: "Self-locking caps",
              body: "Pressed on over every screw.",
            },
            {
              icon: CloudRain,
              title: "No exposed screws",
              body: "Nothing for water to track down.",
            },
          ],
          specs: {
            note: "A complete environment-friendly roofing system that prevents leaks, prevents heat through insulation and takes solar panels without roof penetration.",
            items: [
              {
                label: "ALUZINC",
                value: "0.4–0.9mm",
                detail: "340 MPa yield, AZ150 coating",
              },
              {
                label: "ALUMINIUM",
                value: "0.6–0.9mm",
                detail: "140 MPa minimum yield",
              },
              {
                label: "TOP COAT",
                value: "20 microns",
                detail: "PVDF, HD and RMP finishes",
              },
              {
                label: "BOTTOM COAT",
                value: "8 microns",
                detail: "Minimum, on both materials",
              },
            ],
          },
        },
      },
      {
        id: "profiled-sheets",
        title: "Tile & Trafford Profiles",
        heroImage: {
          src: pebVillaTileroof,
          alt: "House roofed in Prime tile profile sheeting",
        },
        content: {
          overview: {
            heading: "Five profiles,\none coil.",
            lead: {
              icon: Waves,
              title: "The profiles Prime rolls",
              body: "Tile profile 27/195, Bravo tile, Trafford 25/252, the Aquaproof six-rib and the decking profile all come off the same line, in aluminium or steel aluzinc base material. Every colour is available to the customer's choice, with accessories folded from matching coil.",
            },
          },
          features: [
            {
              icon: LayoutGrid,
              title: "Tile 27/195",
              body: "Mangalore and Bravo tile profiles.",
            },
            {
              icon: Ruler,
              title: "Trafford 25/252",
              body: "The classic industrial profile.",
            },
            {
              icon: BadgeCheck,
              title: "Any colour",
              body: "To the customer's choice.",
            },
          ],
          specs: {
            note: "Weights quoted for 0.50mm sheet. Weight and thickness are subject to rolling tolerance as per ASTM standards.",
            items: [
              {
                label: "PROFILES",
                value: "25/252 · 35/207",
                detail: "Plus 38/200, 45/250 and 45/150",
              },
              {
                label: "ALUMINIUM",
                value: "1.52–1.93 kg/m²",
                detail: "At 0.50mm thickness",
              },
              {
                label: "STEEL",
                value: "4.34–5.32 kg/m²",
                detail: "At 0.50mm thickness",
              },
              {
                label: "BASE MATERIAL",
                value: "Aluminium · Aluzinc",
                detail: "ASTM A653, JIS 3302, IS 277",
              },
            ],
          },
        },
      },
      {
        id: "stone-coated",
        title: "Stone Coated Tiles",
        heroImage: {
          src: roofStoneColours,
          alt: "Stone coated roof tile colour range, Jh101 to Jh114",
        },
        content: {
          overview: {
            heading: "Stone on steel,\nfor thirty years.",
            lead: {
              icon: Layers,
              title: "Colourful stone coated metal tile",
              body: "A high-corrosion Al-Zn plate carries natural stone particles bonded with watercraft acrylic resin under a clear acrylic overglaze. It keeps the depth and decorative quality of traditional clay tile with the light weight and durability of modern metal, and suits wood, steel or concrete roof structures.",
            },
          },
          features: [
            {
              icon: Timer,
              title: "30 year life",
              body: "Corrosion resistance 3–6× galvanized.",
            },
            {
              icon: Weight,
              title: "1/6 of cement tile",
              body: "Only the weight of clay tile.",
            },
            {
              icon: Zap,
              title: "1.4–7× reflective",
              body: "Heat reflected, not absorbed.",
            },
          ],
          specs: {
            note: "Shingle tile JH04 and Roman tile JH05, in fifteen colours from natural rock through to black, using non-toxic bonds.",
            items: [
              {
                label: "SHINGLE JH04",
                value: "1340 × 420mm",
                detail: "2.08 sheets/m², 2.8 kg each",
              },
              {
                label: "ROMAN JH05",
                value: "1300 × 420mm",
                detail: "2.16 sheets/m², 3.0 kg each",
              },
              {
                label: "SERVICE LIFE",
                value: "up to 30 yrs",
                detail: "Al-Zn plate with stone facing",
              },
              {
                label: "COLOURS",
                value: "15",
                detail: "Jh101 through Jh115",
              },
            ],
          },
        },
      },
      {
        id: "arch-pan-curved",
        title: "Arch Pan & Curved Roofing",
        heroImage: {
          src: roofArchpan,
          alt: "Arch Pan curved roof spanning a building without interior columns",
        },
        content: {
          overview: {
            heading: "The span, with\nno column in it.",
            lead: {
              icon: Move3d,
              title: "Interlocking arch and curved sheet",
              body: "Arch Pan interlocks free of holes, nuts and bolts, so there is nothing to leak and no column in the middle of the workspace — around 10,000 sq.ft goes up in 12 hours. Curved roof sheets are supplied to various curvature up to a length of 12m in steel or aluminium profile.",
            },
          },
          features: [
            {
              icon: Timer,
              title: "10,000 sq.ft",
              body: "Installed in around 12 hours.",
            },
            {
              icon: Lock,
              title: "Interlocked",
              body: "No holes, nuts or bolts.",
            },
            {
              icon: Waves,
              title: "Curved to 12m",
              body: "Steel or aluminium profile.",
            },
          ],
          specs: {
            note: "Arch Pan uses high-grade pre-coated galvalume with RMP or SMP coating; HILTI is the preferred fastener.",
            items: [
              {
                label: "THICKNESS",
                value: "0.8–1.5mm",
                detail: "Pre-coated galvalume",
              },
              {
                label: "STRENGTH",
                value: "300–350 MPa",
                detail: "High grade material",
              },
              {
                label: "PANEL WIDTH",
                value: "0.61–0.71m",
                detail: "From 0.914m coil width",
              },
              {
                label: "CURVED SHEET",
                value: "up to 12m",
                detail: "Various curvature to drawing",
              },
            ],
          },
        },
      },
      {
        id: "wall-cladding",
        title: "Wall Cladding",
        heroImage: {
          src: roofWallCladding,
          alt: "Building elevation clad in colour-coated profiled steel",
        },
        content: {
          overview: {
            heading: "The elevation,\ncoated to last.",
            lead: {
              icon: ShieldCheck,
              title: "PPGI and PPGL cladding",
              body: "Base material conforms to ASTM A653 or equivalent, hot-dip galvanized at 180–270 g/m² for PPGI or coated with AZ150 alu-zinc for PPGL. The zinc-rich interdendritic portion corrodes preferentially and fills with zinc corrosion products, giving both barrier and galvanic protection to the steel beneath.",
            },
          },
          features: [
            {
              icon: ShieldCheck,
              title: "Barrier + galvanic",
              body: "Two protection mechanisms at once.",
            },
            {
              icon: Sun,
              title: "PVDF or polyester",
              body: "UV and alkali resistance.",
            },
            {
              icon: BadgeCheck,
              title: "ISO 9001",
              body: "MTC and packing list with every order.",
            },
          ],
          specs: {
            note: "Pencil hardness H or harder, gloss 15–80% at 60° to ASTM D 523, flexibility 2T (ECCA) with no adhesion loss.",
            items: [
              {
                label: "PPGI ZINC",
                value: "180–270 g/m²",
                detail: "Hot dipped, to ASTM standard",
              },
              {
                label: "PPGL ALU-ZINC",
                value: "AZ150",
                detail: "Aluminium zinc alloy coating",
              },
              {
                label: "PVDF",
                value: "20–25 microns",
                detail: "Over 5–7 micron epoxy primer",
              },
              {
                label: "POLYESTER",
                value: "20–25 microns",
                detail: "Over 6–10 micron epoxy primer",
              },
            ],
          },
        },
      },
    ],
    gallery: [
      { src: roofArchpan, alt: "Arch Pan curved roof structure" },
      { src: roofCurvedWalkway, alt: "Curved roof cladding over a walkway" },
      { src: roofStoneLayers, alt: "Stone coated tile construction, layer by layer" },
      { src: roofingDaylight, alt: "Daylit steel roof interior" },
    ],
    faq: [
      {
        question: "Which base materials do you roll?",
        answer:
          "Aluminium and steel aluzinc. Base material conforms to ASTM A 653 or other equivalent standards such as JIS 3302, EN 10326/10327 and IS 277, and all colours are available to the customer's choice.",
      },
      {
        question: "What is the difference between PVDF and polyester coating?",
        answer:
          "Polyester (RMP) is an economical long-life coating — 20–25 microns externally over a 6–10 micron epoxy primer. PVDF has high resistance to alkaline atmospheres and excellent UV resistance compared to polyester, at 20–25 microns externally over a 5–7 micron primer.",
      },
      {
        question: "How does Aquaproof take solar panels?",
        answer:
          "Solar panels install above the Aquaproof profile using special clamps that tighten onto the rib without penetrating the roofing sheet. Even after the panels are fixed the roof remains 100% leakproof.",
      },
      {
        question: "How long do stone coated tiles last?",
        answer:
          "Product life is up to 30 years. The aluminium zinc alloy steel plate is 3–6 times more corrosion resistant than galvanized steel, and the heat-reflective rate is 1.4–7 times that of common roofing materials.",
      },
    ],
    cta: {
      heading: "Sheet your roof properly.",
      body: "Tell us your profile, base material and colour — we'll roll and quote it.",
      image: {
        src: roofingSeam,
        alt: "Close-up of a profiled galvanized roof edge",
      },
    },
    metaDescription:
      "Aquaproof, tile, Trafford and Arch Pan roofing from Prime — aluminium and steel aluzinc sheets 0.4–0.9mm with PVDF and polyester coatings, plus stone coated roof tiles and curved cladding to 12m.",
  },
  {
    slug: "doors-windows",
    title: "Doors & Windows",
    heroTitle: "Doors & Windows.",
    description:
      "Zenith doors from Prime Automated Doors — sectional overhead doors, insulated rolling shutters, dock equipment and aluminium and UPVC windows, engineered for industry.",
    bannerImage: {
      src: doorIndustrialRow,
      alt: "Row of insulated sectional doors along an industrial elevation",
    },
    cardImage: {
      src: doorSectionalGlazed,
      alt: "Glazed sectional overhead doors on a building elevation",
    },
    cardDescription:
      "Zenith sectional doors, rolling shutters, dock equipment and windows.",
    heroStats: [
      { value: "6 × 6m", label: "industrial door" },
      { value: "40mm", label: "insulated panel" },
      { value: "25+ yrs", label: "door engineering" },
    ],
    specsHeading: "Engineered to the detail.",
    tabs: [
      {
        id: "sectional-doors",
        title: "Sectional Overhead Doors",
        heroImage: {
          src: doorGarage,
          alt: "Remote-operated sectional garage door on a modern house",
        },
        content: {
          overview: {
            heading: "The door folds\ninto the roof.",
            lead: {
              icon: ArrowLeftRight,
              title: "Garage and industrial sections",
              body: "Sectional overhead doors are fast becoming the most popular and practical choice for safe, secure, easy-to-use openings — operated manually or by remote, with a spring-assisted mechanism for smooth, quiet movement. Against a conventional rolling shutter they are stronger, completely sealed and well insulated with sandwich panels.",
            },
          },
          features: [
            {
              icon: Layers,
              title: "40mm PU panels",
              body: "Injected, monolithically protected.",
            },
            {
              icon: Lock,
              title: "Complete sealing",
              body: "All the way around the door.",
            },
            {
              icon: Cog,
              title: "Remote operated",
              body: "Hi-tech operators, full safety.",
            },
          ],
          specs: {
            note: "Heavy duty anodized steel hardware to suit any site condition, meeting international standards. Other sizes are possible on request.",
            items: [
              {
                label: "GARAGE DOOR",
                value: "5.8 × 2.75m",
                detail: "Maximum width and height",
              },
              {
                label: "INDUSTRIAL",
                value: "6 × 6m",
                detail: "Maximum width and height",
              },
              {
                label: "PANEL",
                value: "40mm PU",
                detail: "Injected polyurethane insulated",
              },
              {
                label: "OPERATION",
                value: "Manual · Electric",
                detail: "Chain hoist or remote control",
              },
            ],
          },
        },
      },
      {
        id: "rolling-shutters",
        title: "Rolling Shutters",
        heroImage: {
          src: projectMetro,
          alt: "Rolling shutters on a distribution centre elevation",
        },
        content: {
          overview: {
            heading: "Strength, with\nsome elegance.",
            lead: {
              icon: Blinds,
              title: "Insulated and perforated shutters",
              body: "Where heat loss is a primary concern the insulated rolling shutter is the obvious choice — polyurethane foam infill minimises energy waste while the shutter design stays aesthetically pleasing. Aluminium perforated shutters cover retail and ventilated openings. Both run on a tubular or side motor with push button or remote.",
            },
          },
          features: [
            {
              icon: Thermometer,
              title: "PU foam infill",
              body: "Minimises energy waste.",
            },
            {
              icon: Cog,
              title: "Tubular or side motor",
              body: "Push button or remote option.",
            },
            {
              icon: LayoutGrid,
              title: "Perforated option",
              body: "Aluminium, for retail fronts.",
            },
          ],
          specs: {
            note: "The ideal solution for any modern architecture — industrial, commercial, retail or domestic.",
            items: [
              {
                label: "SLOTTED SLATS",
                value: "42 · 55mm",
                detail: "Standard slat profiles",
              },
              {
                label: "HEAVY SLATS",
                value: "77 · 98mm",
                detail: "For wider openings",
              },
              {
                label: "INFILL",
                value: "Polyurethane",
                detail: "Insulated slat construction",
              },
              {
                label: "DRIVE",
                value: "Tubular · Side",
                detail: "Push button or remote option",
              },
            ],
          },
        },
      },
      {
        id: "dock-equipment",
        title: "Dock Levellers & Shelters",
        heroImage: {
          src: bandWarehouse,
          alt: "Loading dock equipment at a warehouse elevation",
        },
        content: {
          overview: {
            heading: "A bridge to\nthe trailer bed.",
            lead: {
              icon: Truck,
              title: "Loading and unloading solutions",
              body: "A dock leveller creates a movable bridge between the loading area and the surface of the vehicle, levelling out the difference in heights under hydraulic operation. Dock shelters cover the vehicle while it is loaded from the platform, on strong carrying frames designed to absorb the crashes that come with reversing manoeuvres.",
            },
          },
          features: [
            {
              icon: Gauge,
              title: "Hydraulic operation",
              body: "Levels out height differences.",
            },
            {
              icon: ShieldCheck,
              title: "Crash absorbing",
              body: "Frames built for manoeuvres.",
            },
            {
              icon: Flame,
              title: "Fire retardant",
              body: "Robust polyester and PVC covers.",
            },
          ],
          specs: {
            note: "Dock leveller, dock shelter and dock seal are supplied as one loading solution — installed across food, marine and logistics facilities.",
            items: [
              {
                label: "LEVELLER",
                value: "Hydraulic",
                detail: "Movable bridge to the vehicle",
              },
              {
                label: "SHELTER",
                value: "Framed Cover",
                detail: "Absorbs reversing impacts",
              },
              {
                label: "COVERS",
                value: "Polyester · PVC",
                detail: "Robust and fire retardant",
              },
              {
                label: "SERVICE",
                value: "AMC Available",
                detail: "Any make of sectional door",
              },
            ],
          },
        },
      },
      {
        id: "windows",
        title: "Aluminium & UPVC Windows",
        heroImage: {
          src: windowAluminiumBifold,
          alt: "Aluminium bifold doors opening onto a garden",
        },
        content: {
          overview: {
            heading: "Windows, in two\nmaterials.",
            lead: {
              icon: LayoutGrid,
              title: "Italian design, German technology",
              body: "Aluminium windows and doors are made from high quality virgin aluminium extrusions on specialised Italian punching machines, with European rollers and superior European locks. UPVC systems are manufactured using German technology on state-of-the-art machinery imported from the UK. Sliding and casement options are available in both.",
            },
          },
          features: [
            {
              icon: Waves,
              title: "Noise and heat",
              body: "Double glazed or laminated glass.",
            },
            {
              icon: BadgeCheck,
              title: "Limitless finishes",
              body: "Anodized, PVDF, powder and wood.",
            },
            {
              icon: ShieldCheck,
              title: "Rust free",
              body: "Endlessly recyclable green metal.",
            },
          ],
          specs: {
            note: "UPVC is impact resistant and tested for heat reversion, heat ageing at 150°C, weathering, weldability and Vicat softening.",
            items: [
              {
                label: "SLIDING",
                value: "2–3 Tracks",
                detail: "Up to four shutters",
              },
              {
                label: "CASEMENT",
                value: "Tilt & Turn",
                detail: "Internal and external opening",
              },
              {
                label: "GLAZING",
                value: "Double · Laminated",
                detail: "Noise and heat insulation",
              },
              {
                label: "FINISHES",
                value: "Anodized · PVDF",
                detail: "Powder coated and wood finish",
              },
            ],
          },
        },
      },
    ],
    gallery: [
      { src: doorSectionalGlazed, alt: "Glazed sectional overhead doors" },
      { src: doorIndustrialRow, alt: "Insulated sectional doors along a loading elevation" },
      { src: windowSlidingView, alt: "Aluminium sliding doors framing a sea view" },
    ],
    faq: [
      {
        question: "What sizes do the sectional doors come in?",
        answer:
          "Garage doors go up to 5.8m wide by 2.75m high, and industrial sectional doors up to 6m by 6m. Other sizes are possible on request — the door is built to the measured opening.",
      },
      {
        question: "Which door products does the division make?",
        answer:
          "American automatic garage doors, sectional overhead industrial doors, aluminium perforated window shutters, insulated rolling shutters, dock levellers, shelters and seals, fire rated steel doors, speed roller doors and hangar doors.",
      },
      {
        question: "Do you service doors you did not supply?",
        answer:
          "Yes. The service team attends service calls immediately, offers annual maintenance contracts and can service or repair any make of sectional door.",
      },
      {
        question: "Which industries do you supply?",
        answer:
          "Food and marine processing above all. Sectional overhead doors with 40 or 50mm polyurethane insulated panels, dock levellers, shelters and seals, insulated rolling and window shutters and steel doors are installed across seafood, spice and logistics facilities.",
      },
    ],
    cta: {
      heading: "Close the openings properly.",
      body: "Send us your opening sizes and duty cycle — we'll specify and quote the doors.",
      image: {
        src: windowSlidingView,
        alt: "Aluminium sliding door system framing an open view",
      },
    },
    metaDescription:
      "Zenith doors from Prime Automated Doors — sectional overhead garage and industrial doors to 6 × 6m, insulated rolling shutters, dock levellers and shelters, and aluminium and UPVC windows.",
  },
  {
    slug: "cold-room-panels",
    title: "Cold Room Panels",
    heroTitle: "Cold Room Panels.",
    description:
      "Factory-made insulated panels with a self-bonding polyurethane core and a tongue-and-groove side joint — 1170mm wide, up to 12 metres long, 30 to 200mm thick.",
    bannerImage: {
      src: coldroomCorridor,
      alt: "Cold room corridor lined with insulated panels and cold store doors",
    },
    cardImage: { src: coldroomImg, alt: "Cold room insulated panels" },
    cardDescription:
      "Insulated panels for cold rooms, food processing plants and truck bodies.",
    heroStats: [
      { value: "1170mm", label: "panel width" },
      { value: "up to 12m", label: "panel length" },
      { value: "0.027 W/mK", label: "K value" },
    ],
    specsHeading: "Engineered to the detail.",
    tabs: [
      {
        id: "cold-rooms",
        title: "Cold Rooms",
        heroImage: {
          src: coldroomImg,
          alt: "Cold room built from insulated tongue-and-groove panels",
        },
        content: {
          overview: {
            heading: "Tongue, groove,\nand no gap.",
            lead: {
              icon: Snowflake,
              title: "A factory-made cold box",
              body: "The cold room panel is a factory-made insulated wall panel with a metal facing combined with a polyurethane foam core. Panels are 1170mm wide with lengths up to 12.0 metres, and the side joint is formed with a tongue and groove, so the envelope closes without a site-made seal.",
            },
          },
          features: [
            {
              icon: Layers,
              title: "30–200mm",
              body: "Thickness to the temperature.",
            },
            {
              icon: Combine,
              title: "Tongue and groove",
              body: "Formed into the panel edge.",
            },
            {
              icon: ThermometerSnowflake,
              title: "0.14 U value",
              body: "At 200mm panel thickness.",
            },
          ],
          specs: {
            note: "Density 40 kg/m³ with a K value of 0.027 W/m-K. U values run 0.54 at 50mm, 0.27 at 100mm, 0.20 at 150mm and 0.14 at 200mm.",
            items: [
              {
                label: "WIDTH",
                value: "1170mm",
                detail: "Single panel width",
              },
              {
                label: "LENGTH",
                value: "up to 12m",
                detail: "In one piece, no joints",
              },
              {
                label: "THICKNESS",
                value: "30–200mm",
                detail: "Sized to the U value needed",
              },
              {
                label: "CORE",
                value: "Self-Bonding PU",
                detail: "40 kg/m³, K 0.027 W/m-K",
              },
            ],
          },
        },
      },
      {
        id: "food-processing",
        title: "Food Processing Factories",
        heroImage: {
          src: featuredFacility,
          alt: "Food processing hall built from insulated panels",
        },
        content: {
          overview: {
            heading: "A factory built\nfrom puff panel.",
            lead: {
              icon: Utensils,
              title: "Puff panels through the plant",
              body: "Food processing factories are built out with the same puff panels through walls, partitions and ceilings, with facings chosen for the process: polyester coated aluminium, aluzinc, stainless steel or FRP. Prime has completed installations across seafood, spice and ingredient plants.",
            },
          },
          features: [
            {
              icon: BadgeCheck,
              title: "Stainless facings",
              body: "Where the process demands it.",
            },
            {
              icon: Droplets,
              title: "FRP option",
              body: "For wash-down environments.",
            },
            {
              icon: ShieldCheck,
              title: "Vapour tight",
              body: "Tongue and groove throughout.",
            },
          ],
          specs: {
            note: "Facings are available in polyester coated aluminium, aluzinc, stainless steel or FRP to suit the process.",
            items: [
              {
                label: "FACINGS",
                value: "Aluminium · Aluzinc",
                detail: "Polyester coated both sides",
              },
              {
                label: "HYGIENE",
                value: "Stainless · FRP",
                detail: "Selected to the process",
              },
              {
                label: "THICKNESS",
                value: "30–200mm",
                detail: "Walls, partitions and ceilings",
              },
              {
                label: "JOINT",
                value: "Tongue & Groove",
                detail: "Formed in the panel edge",
              },
            ],
          },
        },
      },
      {
        id: "skid-mounted",
        title: "Skid Mounted Cold Rooms",
        heroImage: {
          src: projectHighland,
          alt: "Skid mounted cold room ready for transport",
        },
        content: {
          overview: {
            heading: "A cold room\nthat travels.",
            lead: {
              icon: Forklift,
              title: "Built on a skid, moved as one",
              body: "The same panel system built onto a steel skid, so the finished cold room can be lifted, transported and set down complete. It suits sites where the room has to be commissioned off-site, relocated later, or dropped into a plant that is already running.",
            },
          },
          features: [
            {
              icon: Move3d,
              title: "Relocatable",
              body: "Lifted and set down complete.",
            },
            {
              icon: Timer,
              title: "Off-site build",
              body: "Commissioned before delivery.",
            },
            {
              icon: Layers,
              title: "Same panel",
              body: "Standard cold room construction.",
            },
          ],
          specs: {
            note: "Built from the standard 1170mm cold room panel on a steel skid, to the room size and holding temperature you specify.",
            items: [
              {
                label: "CONSTRUCTION",
                value: "Skid Mounted",
                detail: "Steel base, panel envelope",
              },
              {
                label: "PANEL",
                value: "1170mm Wide",
                detail: "Up to 12m in one length",
              },
              {
                label: "THICKNESS",
                value: "30–200mm",
                detail: "Sized to the holding temperature",
              },
              {
                label: "FACINGS",
                value: "Aluminium · Aluzinc",
                detail: "Stainless or FRP on request",
              },
            ],
          },
        },
      },
      {
        id: "truck-panels",
        title: "Truck Panels",
        heroImage: {
          src: projectCoastal,
          alt: "Insulated panels for refrigerated vehicle bodies",
        },
        content: {
          overview: {
            heading: "The cold chain,\non the road.",
            lead: {
              icon: Truck,
              title: "Insulated panels for vehicle bodies",
              body: "Truck panels take the cold room system onto refrigerated vehicle bodies — the same self-bonding polyurethane core and metal facings, cut to the body dimensions. Panels come in single lengths, so the body closes without joints running across it.",
            },
          },
          features: [
            {
              icon: Snowflake,
              title: "Cold chain rated",
              body: "The same core as the cold room.",
            },
            {
              icon: Weight,
              title: "Light bodies",
              body: "High insulation at low weight.",
            },
            {
              icon: ShieldCheck,
              title: "Sealed joints",
              body: "Tongue and groove side joint.",
            },
          ],
          specs: {
            note: "Cut to the vehicle body from the same 30–200mm panel range, in the facing the operator specifies.",
            items: [
              {
                label: "THICKNESS",
                value: "30–200mm",
                detail: "To the vehicle's duty",
              },
              {
                label: "LENGTH",
                value: "up to 12m",
                detail: "Cut to the body dimensions",
              },
              {
                label: "CORE",
                value: "Self-Bonding PU",
                detail: "40 kg/m³ density",
              },
              {
                label: "FACINGS",
                value: "Aluminium · FRP",
                detail: "Aluzinc and stainless available",
              },
            ],
          },
        },
      },
    ],
    gallery: [
      { src: coldroomCorridor, alt: "Cold store doors along an insulated corridor" },
      { src: coldroomImg, alt: "Cold room panel interior" },
      { src: projectCoastal, alt: "Coastal processing facility" },
    ],
    faq: [
      {
        question: "What size are the panels?",
        answer:
          "Cold room panels are 1170mm wide with a maximum length of 12 metres, and are available from 30 to 200mm thick. The side joint is formed with a tongue and groove.",
      },
      {
        question: "What insulation value do they give?",
        answer:
          "The core is self-bonding polyurethane foam at 40 kg/m³ with a K value of 0.027 W/m-K. U values run 0.54 W/m²°C at 50mm, 0.27 at 100mm, 0.20 at 150mm and 0.14 at 200mm.",
      },
      {
        question: "Which facings are available?",
        answer:
          "Polyester coated aluminium, aluzinc, stainless steel or FRP — chosen for the process the room serves.",
      },
      {
        question: "Do you supply the doors as well?",
        answer:
          "Yes. Prime Automated Doors supplies sectional overhead doors with 40 or 50mm polyurethane insulated panels, insulated rolling shutters and window shutters, and dock levellers, shelters and seals for the loading bays.",
      },
    ],
    cta: {
      heading: "Build the cold chain right.",
      body: "Tell us your room size and holding temperature — we'll specify and quote the panels.",
      image: {
        src: projectHighland,
        alt: "Completed cold storage building",
      },
    },
    metaDescription:
      "Prime cold room panels — 1170mm wide, up to 12m long and 30 to 200mm thick, with a self-bonding polyurethane core at 40 kg/m³ and a K value of 0.027 W/m-K.",
  },
  {
    slug: "custom-fabrication",
    title: "Custom Fabrication",
    heroTitle: "Custom Fabrication.",
    description:
      "Z and C purlins, decking sheets and foam concrete, turbo ventilators, polycarbonate skylights and handrail systems — rolled, formed and finished to your drawings.",
    bannerImage: {
      src: fabricationImg,
      alt: "Custom fabricated galvanized steel components in the plant",
    },
    cardImage: {
      src: fabricationImg,
      alt: "Custom fabricated steel components",
    },
    cardDescription:
      "Z and C purlins, decking, ventilators, skylights and handrail systems.",
    heroStats: [
      { value: "345 N/mm²", label: "purlin yield" },
      { value: "up to 12m", label: "section length" },
      { value: "10 yr", label: "ventilator warranty" },
    ],
    specsHeading: "Engineered to the detail.",
    tabs: [
      {
        id: "purlins",
        title: "Z & C Purlins",
        heroImage: {
          src: fabricationImg,
          alt: "Roll-formed Z and C section purlins",
        },
        content: {
          overview: {
            heading: "The sections the\nroof sits on.",
            lead: {
              icon: Ruler,
              title: "Secondary supports, rolled to size",
              body: "Z and C sections are structural members designed for use as secondary supports for roof and wall sheeting, manufactured from ASTM A653 structural quality pre-hot-dipped galvanized sheet to G90, with a minimum guaranteed yield strength of 345 N/mm². Length runs up to 12 metres, and any cut length is available.",
            },
          },
          features: [
            {
              icon: ShieldCheck,
              title: "G90 galvanized",
              body: "Pre-hot-dipped, ASTM A653.",
            },
            {
              icon: Hammer,
              title: "Black steel option",
              body: "Also available at 345 N/mm².",
            },
            {
              icon: Ruler,
              title: "Z100 to Z250",
              body: "Four standard section depths.",
            },
          ],
          specs: {
            note: "Black steel with 245 N/mm² yield is also available. Channels come in any length in thicknesses from 0.5 to 1.5mm.",
            items: [
              {
                label: "SECTIONS",
                value: "Z100–Z250",
                detail: "Z100, Z170, Z200 and Z250",
              },
              {
                label: "THICKNESS",
                value: "1.5–2.5mm",
                detail: "Rolled to the span",
              },
              {
                label: "YIELD",
                value: "345 N/mm²",
                detail: "Minimum guaranteed strength",
              },
              {
                label: "LENGTH",
                value: "up to 12m",
                detail: "Or any cut length",
              },
            ],
          },
        },
      },
      {
        id: "decking",
        title: "Decking & Foam Concrete",
        heroImage: {
          src: pebMezzanineDecking,
          alt: "Profiled steel decking spanning mezzanine floor beams",
        },
        content: {
          overview: {
            heading: "Formwork that\nstays in the slab.",
            lead: {
              icon: SquareStack,
              title: "Deck panel and light foam concrete",
              body: "The mezzanine deck panel carries only the dead load of the wet concrete, acting as permanent shuttering; a thick decking system takes live loads up to 2000 kg/sq.mt. Paired with light weight foam concrete at 500–800 kg/m³, the floor carries up to 500 kg/m² live while cutting dead weight by as much as 80%.",
            },
          },
          features: [
            {
              icon: Weight,
              title: "2000 kg/sq.m",
              body: "Live load on thick decking.",
            },
            {
              icon: Zap,
              title: "80% lighter",
              body: "Against conventional concrete.",
            },
            {
              icon: Timer,
              title: "No stripping",
              body: "Shuttering stays in the slab.",
            },
          ],
          specs: {
            note: "Highly cost effective and time saving — suited to car showrooms, commercial buildings and mezzanine offices.",
            items: [
              {
                label: "DECK THICKNESS",
                value: "0.5–0.9mm",
                detail: "For mezzanine and floor slabs",
              },
              {
                label: "LIVE LOAD",
                value: "2000 kg/m²",
                detail: "On the thick decking system",
              },
              {
                label: "FOAM DENSITY",
                value: "500–800 kg/m³",
                detail: "By sand and flash percentage",
              },
              {
                label: "FOAM STRENGTH",
                value: "8–20 kg/cm²",
                detail: "Depending on the mix",
              },
            ],
          },
        },
      },
      {
        id: "ventilators",
        title: "Turbo Ventilators",
        heroImage: {
          src: roofingInterior,
          alt: "Roof ventilation running along a building ridge",
        },
        content: {
          overview: {
            heading: "Heat leaves\nby itself.",
            lead: {
              icon: Fan,
              title: "Centrifugal force, no power",
              body: "The air ventilator works on centrifugal force created by continuously running vanes. Minimum wind pressure rotates it on a self-lubricated Teflon cap; hot and polluted air escapes, pressure drops beneath and fresh cold air is drawn in. The flywheel effect keeps it turning, and it prevents entry of water and dust particles.",
            },
          },
          features: [
            {
              icon: Wind,
              title: "2 mph is enough",
              body: "Wind velocity to start it turning.",
            },
            {
              icon: Zap,
              title: "No operating cost",
              body: "Runs on wind power alone.",
            },
            {
              icon: BadgeCheck,
              title: "10 year warranty",
              body: "On the ventilator head.",
            },
          ],
          specs: {
            note: "A typical 25 × 25 × 5m warehouse at 15 km/h wind, needing eight air exchanges an hour, takes four ventilators.",
            items: [
              {
                label: "THROAT SIZE",
                value: "365 · 610mm",
                detail: "14 inch and 24 inch",
              },
              {
                label: "MATERIAL",
                value: "Aluminium · Steel",
                detail: "Stainless steel option",
              },
              {
                label: "BASE FRAMES",
                value: "4–20 Slope",
                detail: "UV stabilised fibre resin",
              },
              {
                label: "RIDGE VENT",
                value: "Any Roof Type",
                detail: "Metal, asbestos, FRP and more",
              },
            ],
          },
        },
      },
      {
        id: "skylights",
        title: "Skylights & Polycarbonate",
        heroImage: {
          src: roofingDaylight,
          alt: "Skylights bringing daylight into an industrial interior",
        },
        content: {
          overview: {
            heading: "Light that works\nfor the building.",
            lead: {
              icon: Sun,
              title: "Multiwall sheet and FRP",
              body: "Multiwall polycarbonate cladding comes in 5.8m by 2.1m sheets from 4mm to 10mm thick in nine colours. An extremely high thermal insulation value is achieved even with transparency, which makes it the most complete answer where a design has to be both transparent and insulating. FRP translucent sheets are contact-moulded to any profile.",
            },
          },
          features: [
            {
              icon: Zap,
              title: "Insulating and clear",
              body: "Thermal value with transparency.",
            },
            {
              icon: Droplets,
              title: "Waterproof air inlet",
              body: "Skylights with fly mesh.",
            },
            {
              icon: LayoutGrid,
              title: "Moulded to profile",
              body: "FRP matched to the sheet.",
            },
          ],
          specs: {
            note: "Used for skylights, stadium and sports cladding, light boxes, station and bus stop roofing. Colours are subject to availability.",
            items: [
              {
                label: "SHEET SIZE",
                value: "5.8 × 2.1m",
                detail: "Multiwall polycarbonate",
              },
              {
                label: "THICKNESS",
                value: "4–10mm",
                detail: "Selected to the span",
              },
              {
                label: "COLOURS",
                value: "9",
                detail: "Clear, opal, blue, bronze, grey",
              },
              {
                label: "SKYLIGHT",
                value: "Galvalume · Alu",
                detail: "Polyester coated, with fly mesh",
              },
            ],
          },
        },
      },
      {
        id: "handrails",
        title: "Handrail Systems",
        heroImage: {
          src: handrailStairs,
          alt: "Stainless steel and glass handrail on a timber staircase",
        },
        content: {
          overview: {
            heading: "Beauty and\nstrength, joined.",
            lead: {
              icon: Combine,
              title: "Three series of handrail",
              body: "Handrails come in three series — stainless steel, wood and colour coated. The stainless is 304 grade, chosen because it does not rust or get damaged easily, and the wooden range pairs stainless with exotic and natural woods, at its best against stairs made of toughened glass.",
            },
          },
          features: [
            {
              icon: ShieldCheck,
              title: "304 grade steel",
              body: "Does not rust or damage easily.",
            },
            {
              icon: LayoutGrid,
              title: "Wire rope and glass",
              body: "Clamps, posts and balconies.",
            },
            {
              icon: Lightbulb,
              title: "LED light system",
              body: "Integrated into the run.",
            },
          ],
          specs: {
            note: "Wire rope systems, glass clamps, pre-assembled posts and handrails, Juliette glass balconies and LED lighting.",
            items: [
              {
                label: "SERIES",
                value: "Steel · Wood",
                detail: "Plus colour coated finishes",
              },
              {
                label: "STAINLESS",
                value: "304 Grade",
                detail: "Rust and damage resistant",
              },
              {
                label: "FITTINGS",
                value: "Pre-Assembled",
                detail: "Posts and handrail sections",
              },
              {
                label: "OPTIONS",
                value: "Glass · LED",
                detail: "Juliette balcony, light system",
              },
            ],
          },
        },
      },
    ],
    gallery: [
      { src: pebMezzanineDecking, alt: "Decking sheets laid over mezzanine framing" },
      { src: handrailGlass, alt: "Glass balustrade with a stainless handrail" },
      { src: fabricationImg, alt: "Fabricated steel components" },
      { src: whyFacility, alt: "Prime NMS manufacturing facility" },
    ],
    faq: [
      {
        question: "What are the Z and C purlins made from?",
        answer:
          "ASTM A653 structural quality pre-hot-dipped galvanized sheet to G90, with a minimum guaranteed yield strength of 345 N/mm². Z sections are also available in black steel, in thicknesses from 1.5 to 2.5mm and lengths up to 12 metres or any cut length.",
      },
      {
        question: "How many ventilators does a building need?",
        answer:
          "Multiply the shed volume by the air exchanges needed per hour and divide by the ventilator's exhaust capacity. A 25 × 25 × 5m warehouse at 15 km/h wind velocity needing eight air exchanges an hour takes four units.",
      },
      {
        question: "What live load can a decking floor carry?",
        answer:
          "A thick decking system takes live loads up to 2000 kg/sq.mt. Combined with light weight foam concrete the floor carries up to 500 kg/m² while reducing dead weight by as much as 80%.",
      },
      {
        question: "What sizes does polycarbonate come in?",
        answer:
          "Multiwall polycarbonate sheets are 5.8m long by 2.1m wide, from 4mm to 10mm thick, in nine colours including clear, translucent, grass green, opal, blue, lake blue, bronze, green and grey — subject to availability.",
      },
    ],
    cta: {
      heading: "Send us the drawing.",
      body: "Share your section, gauge and quantity — we'll roll, finish and quote the run.",
      image: {
        src: serviceBenefits,
        alt: "Fabricated steel components ready for dispatch",
      },
    },
    metaDescription:
      "Prime roofing accessories and fabrication — Z and C purlins to 345 N/mm², decking sheets and light weight foam concrete, turbo ventilators, multiwall polycarbonate and stainless handrail systems.",
  },
];

/** Every slug, for `generateStaticParams` and route validation. */
export const SERVICE_SLUGS = SERVICES.map((service) => service.slug);

/** Lookup used by the detail route. Returns `undefined` for unknown slugs. */
export function getService(slug: string): ServiceDetail | undefined {
  return SERVICES.find((service) => service.slug === slug);
}
