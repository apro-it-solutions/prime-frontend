import type { StaticImageData } from "next/image";
import {
  ArrowLeftRight,
  BadgeCheck,
  Blinds,
  Boxes,
  CloudRain,
  Cog,
  Combine,
  DoorOpen,
  Droplets,
  Factory,
  Fan,
  Flame,
  Forklift,
  Gauge,
  Hammer,
  HardHat,
  Layers,
  LayoutGrid,
  Lightbulb,
  Lock,
  Move3d,
  PanelTop,
  Plane,
  Refrigerator,
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
  Warehouse,
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
import doorsImg from "../../../public/images/service-doors.png";
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
import projectGreenfield from "../../../public/images/project-greenfield-logistics.png";
import projectHighland from "../../../public/images/project-highland-coldstorage.png";
import projectMetro from "../../../public/images/project-metro-distribution.png";
import projectSkyline from "../../../public/images/project-skyline-commercial.png";
import projectCoastal from "../../../public/images/project-coastal-industrial.png";
import projectPrime from "../../../public/images/project-prime-manufacturing.png";
import projectFeatured from "../../../public/images/project-featured.png";

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
 */
export const SERVICES: ServiceDetail[] = [
  {
    slug: "pre-engineered-buildings",
    title: "Pre-Engineered Buildings",
    heroTitle: "Pre-Engineered Buildings.",
    description:
      "Clear-span galvanized steel structures engineered off-site and bolted together on yours — warehouses, factories and commercial builds delivered in months, not years.",
    bannerImage: {
      src: pebImg,
      alt: "Clear-span pre-engineered galvanized steel building frame",
    },
    cardImage: {
      src: pebImg,
      alt: "Pre-engineered galvanized steel building structure",
    },
    cardDescription:
      "Clear-span galvanized steel structures for warehouses, factories and commercial builds.",
    heroStats: [
      { value: "up to 90m", label: "clear span" },
      { value: "50+ yr", label: "design life" },
      { value: "IS 800", label: "compliant" },
    ],
    specsHeading: "Engineered to the detail.",
    tabs: [
      {
        id: "manufacturing",
        title: "Manufacturing Facilities",
        heroImage: {
          src: projectPrime,
          alt: "Manufacturing facility built by PrimeNMS",
        },
        content: {
          overview: {
            heading: "Floor space that\nthe line dictates.",
            lead: {
              icon: Factory,
              title: "Built around the process",
              body: "Bay spacing, crane gantries and service routes are set by your production line, not by a catalogue. Frames are analysed for crane surge and equipment loads before fabrication, so the shell never limits how the plant is laid out.",
            },
          },
          features: [
            {
              icon: Weight,
              title: "Crane ready",
              body: "Gantries designed into the frame.",
            },
            {
              icon: Move3d,
              title: "Service routes",
              body: "Ducting and cable trays planned in.",
            },
            {
              icon: HardHat,
              title: "Live-site erection",
              body: "Phased around running production.",
            },
          ],
          specs: {
            note: "Every plant is designed to order — spans, crane capacity and bay spacing specified to your process.",
            items: [
              {
                label: "CLEAR SPAN",
                value: "up to 60m",
                detail: "Column-free production floor",
              },
              {
                label: "CRANE CAPACITY",
                value: "up to 40T",
                detail: "EOT gantries built into the frame",
              },
              {
                label: "EAVE HEIGHT",
                value: "6–18m",
                detail: "Set by equipment clearance",
              },
              {
                label: "FLOOR LOADING",
                value: "to spec",
                detail: "Plinths designed with your civil team",
              },
            ],
          },
        },
      },
      {
        id: "warehouse",
        title: "Warehouse Buildings",
        heroImage: {
          src: projectGreenfield,
          alt: "Warehouse building constructed by PrimeNMS",
        },
        content: {
          overview: {
            heading: "Racking height,\nnot roof height.",
            lead: {
              icon: Warehouse,
              title: "Storage-first geometry",
              body: "Eave height, bay spacing and column positions are driven by the racking layout, so pallet positions are never lost to a badly placed column. Roof pitch and gutter sizing follow the local rainfall intensity.",
            },
          },
          features: [
            {
              icon: Boxes,
              title: "Racking aligned",
              body: "Columns set to the aisle grid.",
            },
            {
              icon: CloudRain,
              title: "Drained properly",
              body: "Gutters sized to local rainfall.",
            },
            {
              icon: Scaling,
              title: "Expansion bays",
              body: "End bays ready to extend.",
            },
          ],
          specs: {
            note: "Every warehouse is designed to order — clear height, bay spacing and dock count specified to your operation.",
            items: [
              {
                label: "CLEAR SPAN",
                value: "up to 90m",
                detail: "Single-span storage floor",
              },
              {
                label: "CLEAR HEIGHT",
                value: "9–15m",
                detail: "Sized to the racking system",
              },
              {
                label: "BAY SPACING",
                value: "6–12m",
                detail: "Set to the aisle grid",
              },
              {
                label: "DOCK LEVELLERS",
                value: "Integrated",
                detail: "Openings framed at design stage",
              },
            ],
          },
        },
      },
      {
        id: "cold-storage",
        title: "Cold Storage",
        heroImage: {
          src: projectHighland,
          alt: "Cold storage facility built by PrimeNMS",
        },
        content: {
          overview: {
            heading: "A structure that\nholds the cold.",
            lead: {
              icon: Snowflake,
              title: "Envelope and frame as one",
              body: "The steel frame is detailed around the insulated envelope rather than clad after the fact — panel modules, vapour seals and door openings are set out at design stage so there is no thermal bridge where structure meets skin.",
            },
          },
          features: [
            {
              icon: ThermometerSnowflake,
              title: "Down to −40°C",
              body: "Freezer and chiller envelopes.",
            },
            {
              icon: Layers,
              title: "Panel modular",
              body: "Grid set to the panel module.",
            },
            {
              icon: ShieldCheck,
              title: "Vapour sealed",
              body: "Junctions detailed, not improvised.",
            },
          ],
          specs: {
            note: "Every cold store is designed to order — temperature, panel thickness and door count specified to your product.",
            items: [
              {
                label: "TEMPERATURE",
                value: "−40°C to +10°C",
                detail: "Freezer through chiller range",
              },
              {
                label: "PANEL",
                value: "100–200mm",
                detail: "Sized to the temperature drop",
              },
              {
                label: "CLEAR HEIGHT",
                value: "9–14m",
                detail: "Racked or block-stacked",
              },
              {
                label: "FLOOR",
                value: "Insulated",
                detail: "Heated slab for freezer rooms",
              },
            ],
          },
        },
      },
      {
        id: "logistics",
        title: "Logistics Centers",
        heroImage: {
          src: projectMetro,
          alt: "Logistics and distribution centre built by PrimeNMS",
        },
        content: {
          overview: {
            heading: "Built around\nthe dock line.",
            lead: {
              icon: Truck,
              title: "Throughput by design",
              body: "Dock positions, canopy depth and yard circulation are laid out before the frame, so trailers turn cleanly and loading never queues into the building. Cross-dock layouts run doors on both elevations.",
            },
          },
          features: [
            {
              icon: Forklift,
              title: "Cross-dock ready",
              body: "Doors on opposing elevations.",
            },
            {
              icon: PanelTop,
              title: "Loading canopies",
              body: "Cantilevered, no yard columns.",
            },
            {
              icon: Timer,
              title: "Fast to open",
              body: "Shell delivered ahead of fit-out.",
            },
          ],
          specs: {
            note: "Every centre is designed to order — dock count, canopy depth and yard geometry specified to your fleet.",
            items: [
              {
                label: "DOCK DOORS",
                value: "up to 60",
                detail: "Single or cross-dock layout",
              },
              {
                label: "CANOPY",
                value: "3–6m",
                detail: "Cantilevered over the dock line",
              },
              {
                label: "CLEAR SPAN",
                value: "up to 45m",
                detail: "Uninterrupted staging floor",
              },
              {
                label: "YARD",
                value: "35m turning",
                detail: "Set out for articulated trailers",
              },
            ],
          },
        },
      },
      {
        id: "hangars",
        title: "Aircraft Hangars",
        heroImage: {
          src: projectFeatured,
          alt: "Large-span steel hangar structure built by PrimeNMS",
        },
        content: {
          overview: {
            heading: "The whole span,\nno column in it.",
            lead: {
              icon: Plane,
              title: "Door-opening spans",
              body: "A hangar is defined by its opening: the full front elevation carries no column, so the header truss and sliding door tracks are engineered together with the frame rather than hung off it afterwards.",
            },
          },
          features: [
            {
              icon: ArrowLeftRight,
              title: "Full-width doors",
              body: "Sliding leaves across the elevation.",
            },
            {
              icon: Wind,
              title: "Wind engineered",
              body: "Open-door load cases analysed.",
            },
            {
              icon: Lightbulb,
              title: "Daylit interiors",
              body: "Ridge lights across the span.",
            },
          ],
          specs: {
            note: "Every hangar is designed to order — door opening, tail height and wind zone specified to the aircraft.",
            items: [
              {
                label: "CLEAR SPAN",
                value: "up to 90m",
                detail: "Column-free hangar floor",
              },
              {
                label: "DOOR OPENING",
                value: "up to 80m",
                detail: "Sliding or folding leaves",
              },
              {
                label: "TAIL HEIGHT",
                value: "12–24m",
                detail: "Clearance to the aircraft",
              },
              {
                label: "WIND CASE",
                value: "Doors open",
                detail: "Analysed for the worst case",
              },
            ],
          },
        },
      },
    ],
    gallery: [
      { src: projectGreenfield, alt: "Greenfield logistics warehouse" },
      { src: projectPrime, alt: "Prime manufacturing plant" },
      { src: projectCoastal, alt: "Coastal industrial facility" },
      { src: projectFeatured, alt: "Completed clear-span steel structure" },
    ],
    faq: [
      {
        question: "How long does a PEB structure take to deliver?",
        answer:
          "Design and approval typically runs three to four weeks, fabrication four to eight weeks depending on tonnage, and erection begins as soon as the foundation is ready. Most projects are weather-tight within four months of order.",
      },
      {
        question: "Can the building be extended later?",
        answer:
          "Yes. End bays are designed as expansion bays on request, so additional length bolts on without disturbing the existing structure or the roof sheeting already in place.",
      },
      {
        question: "Do you handle foundation design?",
        answer:
          "We supply anchor-bolt layouts, base reactions and foundation loads for your civil consultant. We can also coordinate directly with them through the approval stage.",
      },
      {
        question: "What loads are the frames designed for?",
        answer:
          "Dead, live, wind and seismic loads to IS 875 and IS 1893 for your specific site, plus any crane, mezzanine or equipment loads you share with us at the enquiry stage.",
      },
    ],
    cta: {
      heading: "Start your next build in steel.",
      body: "Send us your span, bay spacing and site location — we'll engineer and quote the right frame.",
      image: {
        src: ctaBuilding,
        alt: "Completed PrimeNMS pre-engineered steel building",
      },
    },
    metaDescription:
      "Clear-span pre-engineered galvanized steel buildings up to 90m — manufacturing plants, warehouses, cold stores, logistics centres and hangars engineered to IS 800.",
  },
  {
    slug: "sandwich-puf-panels",
    title: "Sandwich PUF Panels",
    heroTitle: "Sandwich PUF Panels.",
    description:
      "Insulated roof and wall panels with a rigid polyurethane core — holding temperature, cutting energy load and going up as a single finished skin.",
    bannerImage: {
      src: pufImg,
      alt: "Insulated sandwich PUF wall panels being installed",
    },
    cardImage: { src: pufImg, alt: "Insulated sandwich PUF panels" },
    cardDescription:
      "Insulated roof and wall panels for temperature control and energy efficiency.",
    heroStats: [
      { value: "30–200mm", label: "core thickness" },
      { value: "40 kg/m³", label: "core density" },
      { value: "0.020", label: "W/mK conductivity" },
    ],
    specsHeading: "Engineered to the detail.",
    tabs: [
      {
        id: "roof-panels",
        title: "Roof Panels",
        heroImage: {
          src: pufImg,
          alt: "Insulated roof panel profile",
        },
        content: {
          overview: {
            heading: "One layer, roof\nto ceiling.",
            lead: {
              icon: PanelTop,
              title: "Structure, insulation, finish",
              body: "A five-rib profile spans purlin to purlin and carries its own insulation, so decking, insulation and liner go up in a single pass. Concealed fixings sit under the rib, keeping the weather path clear of fasteners.",
            },
          },
          features: [
            {
              icon: Droplets,
              title: "Sealed laps",
              body: "Gasketed side joint at every rib.",
            },
            {
              icon: Waves,
              title: "Long spans",
              body: "Fewer purlins for the same load.",
            },
            {
              icon: Timer,
              title: "Single-pass fix",
              body: "Roof closed in one operation.",
            },
          ],
          specs: {
            note: "Every roof panel is made to order — thickness, profile and length specified to your span.",
            items: [
              {
                label: "THICKNESS",
                value: "30–150mm",
                detail: "Selected to your thermal load",
              },
              {
                label: "PROFILE",
                value: "5-Rib",
                detail: "1000mm effective cover",
              },
              {
                label: "LENGTH",
                value: "up to 12m",
                detail: "Cut to length, no site joints",
              },
              {
                label: "FIXING",
                value: "Concealed",
                detail: "Fasteners under the rib",
              },
            ],
          },
        },
      },
      {
        id: "wall-panels",
        title: "Wall Panels",
        heroImage: {
          src: bandWarehouse,
          alt: "Building envelope clad in insulated wall panels",
        },
        content: {
          overview: {
            heading: "A flat wall that\nstays flat.",
            lead: {
              icon: LayoutGrid,
              title: "Hidden-fix elevations",
              body: "Wall panels lock together on a tongue-and-groove joint with no fastener showing, so the elevation reads as one plane. Panels run horizontally or vertically, and micro-ribbed faces hide the oil-canning flat sheet shows.",
            },
          },
          features: [
            {
              icon: ShieldCheck,
              title: "No visible fixings",
              body: "Fasteners hidden in the joint.",
            },
            {
              icon: Thermometer,
              title: "Continuous line",
              body: "No thermal bridge at the seam.",
            },
            {
              icon: ArrowLeftRight,
              title: "Either orientation",
              body: "Horizontal or vertical runs.",
            },
          ],
          specs: {
            note: "Every wall panel is made to order — thickness, face profile and colour specified to your elevation.",
            items: [
              {
                label: "THICKNESS",
                value: "30–120mm",
                detail: "Sized to the thermal target",
              },
              {
                label: "FACE",
                value: "Micro-Rib · Flat",
                detail: "Hides surface waviness",
              },
              {
                label: "JOINT",
                value: "Tongue & Groove",
                detail: "Gasketed, hidden fixing",
              },
              {
                label: "FINISH",
                value: "PPGI · PPGL",
                detail: "RAL matched on request",
              },
            ],
          },
        },
      },
      {
        id: "partition-panels",
        title: "Partition Panels",
        heroImage: {
          src: projectSkyline,
          alt: "Internal partitioning within a steel building",
        },
        content: {
          overview: {
            heading: "Rooms inside\nthe building.",
            lead: {
              icon: Combine,
              title: "Free-standing internal walls",
              body: "The same panel used on the envelope divides the interior — offices, plant rooms and process areas — carrying its own structure so no separate stud frame is needed. Layouts can be reconfigured without touching the shell.",
            },
          },
          features: [
            {
              icon: Wrench,
              title: "Self-supporting",
              body: "No stud frame behind it.",
            },
            {
              icon: Move3d,
              title: "Reconfigurable",
              body: "Demountable and re-usable.",
            },
            {
              icon: BadgeCheck,
              title: "Wipe-clean faces",
              body: "Food-grade finish available.",
            },
          ],
          specs: {
            note: "Every partition is made to order — height, thickness and opening positions specified to your layout.",
            items: [
              {
                label: "THICKNESS",
                value: "50–100mm",
                detail: "Acoustic and thermal split",
              },
              {
                label: "HEIGHT",
                value: "up to 8m",
                detail: "Free-standing, braced above",
              },
              {
                label: "OPENINGS",
                value: "Framed",
                detail: "Doors and vision panels",
              },
              {
                label: "FACES",
                value: "Food-Grade",
                detail: "Coved junction detail",
              },
            ],
          },
        },
      },
      {
        id: "pir-panels",
        title: "PIR Fire-Rated Panels",
        heroImage: {
          src: projectCoastal,
          alt: "Industrial facility clad in fire-rated insulated panels",
        },
        content: {
          overview: {
            heading: "The same panel,\na harder core.",
            lead: {
              icon: Flame,
              title: "PIR where fire rating governs",
              body: "A polyisocyanurate core replaces PUF where the fire classification is specified, keeping the same skins, profiles and jointing. Panels char rather than melt, holding the envelope together for the rated period.",
            },
          },
          features: [
            {
              icon: ShieldCheck,
              title: "Rated envelope",
              body: "Classified to project spec.",
            },
            {
              icon: Layers,
              title: "Drop-in swap",
              body: "Same profiles and details.",
            },
            {
              icon: Thermometer,
              title: "Same thermals",
              body: "No loss of insulating value.",
            },
          ],
          specs: {
            note: "Every fire-rated panel is made to order — rating, thickness and profile specified to your approval drawings.",
            items: [
              {
                label: "CORE",
                value: "PIR",
                detail: "Chars rather than melts",
              },
              {
                label: "THICKNESS",
                value: "50–150mm",
                detail: "Rating dependent",
              },
              {
                label: "CONDUCTIVITY",
                value: "0.022 W/mK",
                detail: "Comparable to standard PUF",
              },
              {
                label: "SKINS",
                value: "PPGI · PPGL",
                detail: "0.5–0.6mm pre-coated",
              },
            ],
          },
        },
      },
    ],
    gallery: [
      { src: projectHighland, alt: "Highland cold storage facility" },
      { src: projectGreenfield, alt: "Greenfield logistics warehouse" },
      { src: bandWarehouse, alt: "Insulated warehouse envelope" },
    ],
    faq: [
      {
        question: "What thickness of panel do I need?",
        answer:
          "It follows the temperature difference you're holding. Ambient warehouses usually sit at 50–80mm, air-conditioned spaces at 80–100mm, and freezer rooms at 150–200mm. Share your target internal temperature and we'll size it.",
      },
      {
        question: "Is a PIR core available?",
        answer:
          "Yes. PIR is offered where a higher fire classification is required, with the same skins, profiles and jointing as the standard PUF panel.",
      },
      {
        question: "Can panels be curved?",
        answer:
          "Roof panels can be supplied with a shallow curve on request. Sharper radii are handled with a segmented arrangement engineered to the roof geometry.",
      },
      {
        question: "How are joints sealed?",
        answer:
          "Panels lock with a tongue-and-groove joint and a factory-applied gasket. Wall junctions, corners and openings are closed with matching flashings supplied with the order.",
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
      "Insulated sandwich panels — PUF and PIR roof, wall, partition and fire-rated panels from 30 to 200mm, continuous-line manufactured and cut to length.",
  },
  {
    slug: "roofing-wall-sheets",
    title: "Roofing & Wall Sheets",
    heroTitle: "Roofing & Wall Sheets.",
    description:
      "Aquaproof profiled sheets rolled from galvanized and pre-coated coil — engineered for weather resistance, long spans and a roof that stays sealed.",
    bannerImage: {
      src: roofingDaylight,
      alt: "Daylit steel roof structure over an industrial interior",
    },
    cardImage: { src: roofingImg, alt: "Profiled roofing and wall sheets" },
    cardDescription:
      "Aquaproof profiled sheets engineered for weather resistance and long life.",
    heroStats: [
      { value: "up to 12m", label: "sheet length" },
      { value: "1000mm", label: "cover width" },
      { value: "AZ150", label: "coating mass" },
    ],
    specsHeading: "Engineered to the detail.",
    tabs: [
      {
        id: "trapezoidal",
        title: "Trapezoidal Sheets",
        heroImage: {
          src: roofingImg,
          alt: "Trapezoidal profiled roofing sheets",
        },
        content: {
          overview: {
            heading: "Deep ribs carry\nwater and load.",
            lead: {
              icon: Waves,
              title: "The workhorse profile",
              body: "A deep trapezoidal rib does two jobs at once: it stiffens the sheet so it spans further between purlins, and it moves water off the roof fast. Anti-capillary grooves at the side lap stop driven rain tracking back in.",
            },
          },
          features: [
            {
              icon: Droplets,
              title: "Anti-capillary lap",
              body: "Groove at every side joint.",
            },
            {
              icon: Ruler,
              title: "Fewer purlins",
              body: "Rib depth buys span.",
            },
            {
              icon: ShieldCheck,
              title: "Crest fixed",
              body: "Fasteners above the water line.",
            },
          ],
          specs: {
            note: "Every roof is rolled to order — profile, thickness and length specified to your purlin spacing.",
            items: [
              {
                label: "SHEET LENGTH",
                value: "up to 12m",
                detail: "Continuous eave-to-ridge runs",
              },
              {
                label: "RIB DEPTH",
                value: "28–45mm",
                detail: "Selected to the span",
              },
              {
                label: "COVER",
                value: "1000mm",
                detail: "Effective width per sheet",
              },
              {
                label: "THICKNESS",
                value: "0.40–0.80mm",
                detail: "TCT to span and load",
              },
            ],
          },
        },
      },
      {
        id: "standing-seam",
        title: "Standing Seam",
        heroImage: {
          src: roofingSeam,
          alt: "Standing-seam galvanized roof edge detail",
        },
        content: {
          overview: {
            heading: "A roof with no\nholes in it.",
            lead: {
              icon: Lock,
              title: "Clipped, not screwed",
              body: "Panels clip to concealed sliding clips and the seam is rolled shut on site, so nothing penetrates the weather plane. The clips let the sheet expand and contract with temperature instead of fighting the fixings.",
            },
          },
          features: [
            {
              icon: ShieldCheck,
              title: "No penetrations",
              body: "Weather plane stays unbroken.",
            },
            {
              icon: Move3d,
              title: "Free to move",
              body: "Sliding clips absorb expansion.",
            },
            {
              icon: Scaling,
              title: "Low pitch",
              body: "Works down to shallow falls.",
            },
          ],
          specs: {
            note: "Every seam roof is rolled to order — panel width, clip type and pitch specified to your roof.",
            items: [
              {
                label: "SEAM",
                value: "360° Rolled",
                detail: "Closed on site by machine",
              },
              {
                label: "MIN PITCH",
                value: "1.5°",
                detail: "Suits near-flat roofs",
              },
              {
                label: "CLIPS",
                value: "Sliding",
                detail: "Concealed, thermally broken",
              },
              {
                label: "PANEL WIDTH",
                value: "400–600mm",
                detail: "Set to the roof module",
              },
            ],
          },
        },
      },
      {
        id: "curved",
        title: "Curved Roofing",
        heroImage: {
          src: roofingDaylight,
          alt: "Curved steel roof over an industrial interior",
        },
        content: {
          overview: {
            heading: "The roof follows\nthe radius.",
            lead: {
              icon: Move3d,
              title: "Rolled to your curve",
              body: "Sheets are crimp-curved or smooth-curved to the radius on the drawing, so an arched roof runs continuously from eave to eave without a ridge joint. Tighter radii use crimping; gentle sweeps roll smooth.",
            },
          },
          features: [
            {
              icon: Waves,
              title: "No ridge joint",
              body: "One sheet over the arch.",
            },
            {
              icon: Ruler,
              title: "To drawing",
              body: "Radius set from your geometry.",
            },
            {
              icon: CloudRain,
              title: "Shed by shape",
              body: "Curve keeps water moving.",
            },
          ],
          specs: {
            note: "Every curved roof is rolled to order — radius, arc length and profile specified to your structure.",
            items: [
              {
                label: "MIN RADIUS",
                value: "1.5m",
                detail: "Crimp-curved profiles",
              },
              {
                label: "SMOOTH CURVE",
                value: "from 30m",
                detail: "Rolled without crimping",
              },
              {
                label: "ARC LENGTH",
                value: "up to 12m",
                detail: "Eave to eave in one piece",
              },
              {
                label: "THICKNESS",
                value: "0.50–0.80mm",
                detail: "Heavier gauge for curving",
              },
            ],
          },
        },
      },
      {
        id: "roof-lights",
        title: "Roof Lights & Skylights",
        heroImage: {
          src: roofingInterior,
          alt: "Underside of a roof with daylight panels between purlins",
        },
        content: {
          overview: {
            heading: "Light that works\nfor the building.",
            lead: {
              icon: Sun,
              title: "Daylight in the same profile",
              body: "Translucent panels are rolled to match the metal profile exactly, so they drop into the sheeting run and lap like any other sheet. Daylight replaces lighting load through the working day without breaking the roof line.",
            },
          },
          features: [
            {
              icon: Zap,
              title: "Energy savings",
              body: "Cuts daytime lighting load.",
            },
            {
              icon: ShieldCheck,
              title: "UV stable",
              body: "Polycarbonate that stays clear.",
            },
            {
              icon: Droplets,
              title: "Laps like steel",
              body: "Same profile, same side joint.",
            },
          ],
          specs: {
            note: "Every roof light is made to order — profile, transmission and layout specified to your roof.",
            items: [
              {
                label: "GLAZING",
                value: "UV Polycarbonate",
                detail: "Diffused, impact-resistant",
              },
              {
                label: "PROFILE",
                value: "Matched",
                detail: "Rolled to the metal sheet",
              },
              {
                label: "TRANSMISSION",
                value: "up to 80%",
                detail: "Selected to the interior",
              },
              {
                label: "LENGTH",
                value: "up to 12m",
                detail: "Continuous ridge runs",
              },
            ],
          },
        },
      },
      {
        id: "wall-cladding",
        title: "Wall Cladding",
        heroImage: {
          src: bandWarehouse,
          alt: "Profiled steel wall cladding on an industrial elevation",
        },
        content: {
          overview: {
            heading: "The elevation,\nin one material.",
            lead: {
              icon: LayoutGrid,
              title: "Cladding that matches the roof",
              body: "The same profiles run down the walls in a lighter gauge, vertically or horizontally, in a finish matched to the roof. Corners, cills and openings are closed with flashings folded from the same coil.",
            },
          },
          features: [
            {
              icon: ArrowLeftRight,
              title: "Either direction",
              body: "Vertical or horizontal runs.",
            },
            {
              icon: BadgeCheck,
              title: "Matched flashings",
              body: "Folded from the same coil.",
            },
            {
              icon: ShieldCheck,
              title: "Coastal grades",
              body: "PPGL where salt is a factor.",
            },
          ],
          specs: {
            note: "Every elevation is rolled to order — profile, orientation and colour specified to the facade.",
            items: [
              {
                label: "THICKNESS",
                value: "0.40–0.60mm",
                detail: "Lighter than roof gauge",
              },
              {
                label: "ORIENTATION",
                value: "Vertical · Horizontal",
                detail: "Set by the elevation",
              },
              {
                label: "FINISH",
                value: "PPGI · PPGL",
                detail: "RAL matched to the roof",
              },
              {
                label: "FLASHINGS",
                value: "Folded to Suit",
                detail: "Corners, cills and reveals",
              },
            ],
          },
        },
      },
    ],
    gallery: [
      { src: roofingDaylight, alt: "Daylit steel roof interior" },
      { src: roofingInterior, alt: "Roof purlins and sheeting from below" },
      { src: roofingSeam, alt: "Standing-seam roof detail" },
      { src: projectMetro, alt: "Metro distribution centre roof" },
    ],
    faq: [
      {
        question: "What is the maximum sheet length you can supply?",
        answer:
          "We roll continuous sheets up to 12m for transport by road. Longer roofs are handled by on-site roll forming so the run stays lap-free from eave to ridge.",
      },
      {
        question: "Which coating should I choose?",
        answer:
          "AZ150 galvalume is the default for industrial roofs. Coastal and chemical environments take a pre-coated PPGL sheet, and colour-matched PPGI is used where appearance matters.",
      },
      {
        question: "Do you supply the accessories?",
        answer:
          "Yes — ridge caps, barge boards, gutters, valley and corner flashings, fasteners and sealants are all supplied with the sheets in the matching finish.",
      },
      {
        question: "Can these sheets be used on walls?",
        answer:
          "The same profiles are used for wall cladding, usually in a lighter thickness. Wall sheets can be run vertically or horizontally to match the elevation.",
      },
    ],
    cta: {
      heading: "Sheet your roof properly.",
      body: "Tell us your roof pitch, span and finish — we'll roll and quote the right profile.",
      image: {
        src: roofingSeam,
        alt: "Close-up of a standing-seam galvanized roof edge",
      },
    },
    metaDescription:
      "Aquaproof profiled roofing and wall sheets — trapezoidal, standing seam, curved, roof lights and cladding in AZ150 galvalume, PPGI and PPGL up to 12m.",
  },
  {
    slug: "doors-windows",
    title: "Doors & Windows",
    heroTitle: "Doors & Windows.",
    description:
      "Automated and manual steel doors, windows and rolling shutters — sized to the opening, sealed to the envelope and built for industrial duty cycles.",
    bannerImage: {
      src: doorsImg,
      alt: "Industrial steel doors fitted to a warehouse elevation",
    },
    cardImage: { src: doorsImg, alt: "Industrial steel doors and windows" },
    cardDescription:
      "Automated and manual steel doors, windows and rolling shutters.",
    heroStats: [
      { value: "up to 8m", label: "clear opening" },
      { value: "Motorised", label: "or manual" },
      { value: "IP55", label: "sealed drives" },
    ],
    specsHeading: "Engineered to the detail.",
    tabs: [
      {
        id: "rolling-shutters",
        title: "Rolling Shutters",
        heroImage: {
          src: doorsImg,
          alt: "Industrial rolling shutter fitted to a steel building",
        },
        content: {
          overview: {
            heading: "The opening rolls\nout of the way.",
            lead: {
              icon: Blinds,
              title: "Interlocking slat curtains",
              body: "Roll-formed slats interlock into a curtain that coils above the opening, so nothing swings into the yard or the floor. Guides, barrel and drive are sized together for the opening's weight and its duty cycle.",
            },
          },
          features: [
            {
              icon: Cog,
              title: "Motorised drives",
              body: "Chain, tubular or side motor.",
            },
            {
              icon: Lock,
              title: "Secure by build",
              body: "Interlocked slats, drop bolts.",
            },
            {
              icon: Thermometer,
              title: "Insulated option",
              body: "Foam-filled slats available.",
            },
          ],
          specs: {
            note: "Every shutter is made to order — opening size, slat type and drive specified to the duty cycle.",
            items: [
              {
                label: "CLEAR OPENING",
                value: "up to 8m",
                detail: "Wider spans on twin drives",
              },
              {
                label: "SLATS",
                value: "GI · Insulated",
                detail: "0.8–1.2mm interlocking",
              },
              {
                label: "OPERATION",
                value: "Manual · Motorised",
                detail: "Manual override on all drives",
              },
              {
                label: "FINISH",
                value: "Powder Coated",
                detail: "RAL matched to the cladding",
              },
            ],
          },
        },
      },
      {
        id: "sliding-doors",
        title: "Sliding & Sectional Doors",
        heroImage: {
          src: projectMetro,
          alt: "Loading doors on a distribution centre elevation",
        },
        content: {
          overview: {
            heading: "Big openings,\nfast cycles.",
            lead: {
              icon: ArrowLeftRight,
              title: "Sideways or overhead",
              body: "Sliding leaves run clear of the opening on a top track; sectional doors fold overhead into the roof space. Both keep the full width usable, and both take insulated panels where the door sits on a temperature boundary.",
            },
          },
          features: [
            {
              icon: Timer,
              title: "Fast cycles",
              body: "Sized for repeat traffic.",
            },
            {
              icon: Layers,
              title: "Insulated leaves",
              body: "PUF-cored panel construction.",
            },
            {
              icon: ShieldCheck,
              title: "Sealed all round",
              body: "Brush and gasket perimeter.",
            },
          ],
          specs: {
            note: "Every door is made to order — leaf configuration, insulation and drive specified to the opening.",
            items: [
              {
                label: "CLEAR OPENING",
                value: "up to 12m",
                detail: "Multi-leaf sliding sets",
              },
              {
                label: "LEAF",
                value: "40–80mm",
                detail: "Insulated panel construction",
              },
              {
                label: "DRIVE",
                value: "Motorised",
                detail: "Remote, button or sensor",
              },
              {
                label: "SEALS",
                value: "Perimeter",
                detail: "Brush and gasket, four sides",
              },
            ],
          },
        },
      },
      {
        id: "personnel-doors",
        title: "Personnel Doors",
        heroImage: {
          src: projectSkyline,
          alt: "Steel personnel doors in a building elevation",
        },
        content: {
          overview: {
            heading: "The door people\nactually use.",
            lead: {
              icon: DoorOpen,
              title: "Framed into the cladding",
              body: "Single and double-leaf steel doors are fabricated to the structural opening and framed into the cladding line, so the seal closes on all four sides. Panic hardware, vision panels and closers are fitted in the shop.",
            },
          },
          features: [
            {
              icon: ShieldCheck,
              title: "Fire-rated options",
              body: "Rated leaf and frame sets.",
            },
            {
              icon: Lock,
              title: "Panic hardware",
              body: "Push-bar exits where required.",
            },
            {
              icon: BadgeCheck,
              title: "Shop finished",
              body: "Hardware fitted before dispatch.",
            },
          ],
          specs: {
            note: "Every door set is made to order — leaf size, rating and hardware specified to your compliance drawings.",
            items: [
              {
                label: "LEAVES",
                value: "Single · Double",
                detail: "Handed to your layout",
              },
              {
                label: "LEAF",
                value: "46mm",
                detail: "Steel skinned, insulated core",
              },
              {
                label: "FIRE RATING",
                value: "up to 120 min",
                detail: "Rated leaf and frame set",
              },
              {
                label: "HARDWARE",
                value: "Factory Fitted",
                detail: "Closers, panic bars, vision",
              },
            ],
          },
        },
      },
      {
        id: "windows-louvres",
        title: "Windows & Louvres",
        heroImage: {
          src: whyFacility,
          alt: "Windows and louvres in an industrial facility elevation",
        },
        content: {
          overview: {
            heading: "Light and air,\nwhere you need it.",
            lead: {
              icon: Wind,
              title: "Glazing and ventilation openings",
              body: "Fixed and openable steel windows bring daylight to the working floor, and weather louvres let plant rooms breathe without letting rain in. Both are framed into the sheeting run with matching flashings.",
            },
          },
          features: [
            {
              icon: CloudRain,
              title: "Weather louvres",
              body: "Air in, driven rain out.",
            },
            {
              icon: Lightbulb,
              title: "Daylight openings",
              body: "Fixed or openable glazing.",
            },
            {
              icon: ShieldCheck,
              title: "Insect screened",
              body: "Mesh behind the blade set.",
            },
          ],
          specs: {
            note: "Every opening is made to order — size, blade pitch and glazing specified to the elevation.",
            items: [
              {
                label: "WINDOWS",
                value: "Fixed · Openable",
                detail: "Steel framed, glazed to spec",
              },
              {
                label: "LOUVRES",
                value: "Weather Rated",
                detail: "Chevron blade, rain resistant",
              },
              {
                label: "SCREENS",
                value: "Insect Mesh",
                detail: "Fitted behind the blades",
              },
              {
                label: "FINISH",
                value: "Powder Coated",
                detail: "RAL matched to the cladding",
              },
            ],
          },
        },
      },
    ],
    gallery: [
      { src: projectMetro, alt: "Loading bay shutters" },
      { src: projectSkyline, alt: "Commercial steel glazing" },
      { src: doorsImg, alt: "Industrial door assembly" },
    ],
    faq: [
      {
        question: "Can shutters be automated after installation?",
        answer:
          "Manual shutters can be motorised later provided the barrel and guides were sized for it. Tell us at the enquiry stage and we'll build in the allowance at no extra cost.",
      },
      {
        question: "What happens in a power cut?",
        answer:
          "Every motorised shutter is supplied with a manual override — a chain hoist or crank that releases the drive so the door can be opened by hand.",
      },
      {
        question: "Do you fit doors into existing buildings?",
        answer:
          "Yes. We survey the opening, fabricate the frame to the measured size and fit into masonry, concrete or steel-framed elevations.",
      },
      {
        question: "Are insulated shutters available for cold rooms?",
        answer:
          "Foam-filled slats with brush and gasket seals are used where the door sits on a temperature boundary. For freezer interfaces we pair them with a heated guide.",
      },
    ],
    cta: {
      heading: "Close the openings properly.",
      body: "Send us your opening sizes and duty cycle — we'll specify and quote the right doors.",
      image: {
        src: projectSkyline,
        alt: "Commercial building elevation with steel glazing",
      },
    },
    metaDescription:
      "Industrial steel doors, windows and louvres — rolling shutters, sliding and sectional doors and fire-rated personnel sets up to 12m clear opening.",
  },
  {
    slug: "cold-room-panels",
    title: "Cold Room Panels",
    heroTitle: "Cold Room Panels.",
    description:
      "Insulated panels for cold storage, food processing and controlled environments — sealed, hygienic and specified to hold temperature down to −40°C.",
    bannerImage: {
      src: coldroomImg,
      alt: "Cold room interior built from insulated panels",
    },
    cardImage: { src: coldroomImg, alt: "Cold room insulated panels" },
    cardDescription:
      "Insulated panels for cold storage, food processing and controlled environments.",
    heroStats: [
      { value: "−40°C", label: "to ambient" },
      { value: "60–200mm", label: "panel thickness" },
      { value: "Cam-lock", label: "jointing" },
    ],
    specsHeading: "Engineered to the detail.",
    tabs: [
      {
        id: "freezer-rooms",
        title: "Freezer Rooms",
        heroImage: {
          src: coldroomImg,
          alt: "Freezer room built from insulated cam-lock panels",
        },
        content: {
          overview: {
            heading: "Cold held down\nto minus forty.",
            lead: {
              icon: Snowflake,
              title: "A continuous cold box",
              body: "Walls, ceiling and floor are supplied as one panel system with cam-lock joints pulled tight onto factory gaskets, so the vapour path never opens. Under-floor heating cable stops the ground below from heaving.",
            },
          },
          features: [
            {
              icon: ThermometerSnowflake,
              title: "−25°C holding",
              body: "Long-term frozen storage.",
            },
            {
              icon: Layers,
              title: "Insulated floors",
              body: "Anti-heave heating beneath.",
            },
            {
              icon: ShieldCheck,
              title: "Vapour sealed",
              body: "Gasketed cam-lock joints.",
            },
          ],
          specs: {
            note: "Every freezer is made to order — temperature, panel thickness and door count specified to your product.",
            items: [
              {
                label: "TEMPERATURE",
                value: "−18°C to −25°C",
                detail: "Long-term frozen holding",
              },
              {
                label: "THICKNESS",
                value: "150–200mm",
                detail: "Walls, ceiling and floor",
              },
              {
                label: "FLOOR",
                value: "Insulated + Heated",
                detail: "Anti-heave cable beneath",
              },
              {
                label: "DOORS",
                value: "Sliding · Hinged",
                detail: "Heated frames as standard",
              },
            ],
          },
        },
      },
      {
        id: "chiller-rooms",
        title: "Chiller Rooms",
        heroImage: {
          src: projectHighland,
          alt: "Chilled storage facility built by PrimeNMS",
        },
        content: {
          overview: {
            heading: "Steady degrees,\nall day long.",
            lead: {
              icon: Refrigerator,
              title: "Tight tolerance, high traffic",
              body: "Chillers live or die on door traffic, so panel thickness is matched to how often the room is opened rather than to the set point alone. Air curtains and fast doors hold the temperature band through picking.",
            },
          },
          features: [
            {
              icon: Timer,
              title: "High door traffic",
              body: "Fast doors and air curtains.",
            },
            {
              icon: Gauge,
              title: "Tight band",
              body: "Holds set point through picking.",
            },
            {
              icon: BadgeCheck,
              title: "Food-grade skins",
              body: "Wipe-clean, coved junctions.",
            },
          ],
          specs: {
            note: "Every chiller is made to order — set point, room size and door traffic specified to your operation.",
            items: [
              {
                label: "TEMPERATURE",
                value: "0°C to +5°C",
                detail: "Fresh produce and dairy",
              },
              {
                label: "THICKNESS",
                value: "80–100mm",
                detail: "Sized to door traffic",
              },
              {
                label: "FLOOR",
                value: "Insulated Slab",
                detail: "No heating cable needed",
              },
              {
                label: "DOORS",
                value: "Fast Action",
                detail: "Air curtain on high traffic",
              },
            ],
          },
        },
      },
      {
        id: "blast-freezers",
        title: "Blast Freezers",
        heroImage: {
          src: projectCoastal,
          alt: "Blast freezing facility built by PrimeNMS",
        },
        content: {
          overview: {
            heading: "Core temperature,\nfast.",
            lead: {
              icon: Wind,
              title: "Built for the air blast",
              body: "A blast room runs high air velocity across the product, which loads the panels and the seals far harder than static storage. Panels, doors and ceiling suspension are all specified for that pressure and the thermal cycling.",
            },
          },
          features: [
            {
              icon: Zap,
              title: "Rapid pull-down",
              body: "Core temperature in hours.",
            },
            {
              icon: Weight,
              title: "Braced ceilings",
              body: "Suspended for blast pressure.",
            },
            {
              icon: ShieldCheck,
              title: "Cycled seals",
              body: "Rated for repeated thermal swing.",
            },
          ],
          specs: {
            note: "Every blast room is made to order — pull-down time, batch size and air velocity specified to your product.",
            items: [
              {
                label: "TEMPERATURE",
                value: "−35°C to −40°C",
                detail: "Blast operating range",
              },
              {
                label: "THICKNESS",
                value: "200mm",
                detail: "Full envelope, floor included",
              },
              {
                label: "CEILING",
                value: "Suspended",
                detail: "Braced for air pressure",
              },
              {
                label: "DOORS",
                value: "Heated Frame",
                detail: "Sized for trolley loading",
              },
            ],
          },
        },
      },
      {
        id: "processing-halls",
        title: "Processing Halls",
        heroImage: {
          src: featuredFacility,
          alt: "Food processing hall built from insulated panels",
        },
        content: {
          overview: {
            heading: "A room you can\nwash down.",
            lead: {
              icon: Utensils,
              title: "Hygiene as a structural spec",
              body: "Processing halls are built to be cleaned: food-grade skins, coved wall-to-floor junctions and sealed penetrations, with panel joints laid out so there is no ledge for water or product to sit on.",
            },
          },
          features: [
            {
              icon: Droplets,
              title: "Wash-down rated",
              body: "Sealed joints and coving.",
            },
            {
              icon: BadgeCheck,
              title: "Food-grade faces",
              body: "Stainless available on request.",
            },
            {
              icon: Thermometer,
              title: "Ambient to chilled",
              body: "+2°C through room temperature.",
            },
          ],
          specs: {
            note: "Every hall is made to order — temperature, finish and drainage detail specified to your process.",
            items: [
              {
                label: "TEMPERATURE",
                value: "+2°C to +18°C",
                detail: "Chilled through ambient",
              },
              {
                label: "THICKNESS",
                value: "60–100mm",
                detail: "Walls and ceiling",
              },
              {
                label: "JUNCTIONS",
                value: "Coved",
                detail: "Wall-to-floor, sealed",
              },
              {
                label: "SKINS",
                value: "Food-Grade PPGI",
                detail: "Stainless on request",
              },
            ],
          },
        },
      },
    ],
    gallery: [
      { src: projectHighland, alt: "Highland cold storage facility" },
      { src: coldroomImg, alt: "Cold room panel interior" },
      { src: projectCoastal, alt: "Coastal processing facility" },
    ],
    faq: [
      {
        question: "Do you supply the refrigeration as well?",
        answer:
          "We supply and install the insulated envelope — panels, doors, floors and flashings. We coordinate openings and loads with your refrigeration contractor so the two systems meet cleanly.",
      },
      {
        question: "What thickness does a freezer room need?",
        answer:
          "Freezer rooms holding −18°C to −25°C typically use 150mm panels, and blast freezers 200mm. Chillers at 0°C to +5°C are usually 80–100mm.",
      },
      {
        question: "Can the room be relocated later?",
        answer:
          "Cam-lock panels are demountable. A room can be dismantled and rebuilt on a new site with new gaskets and fixings, provided the panels are handled carefully.",
      },
      {
        question: "How are floors handled?",
        answer:
          "Insulated floor panels are supplied for freezer rooms, with an anti-skid finish or a screed overlay. Chillers often run on an insulated slab instead — we'll advise per room.",
      },
    ],
    cta: {
      heading: "Build the cold chain right.",
      body: "Tell us your room size and holding temperature — we'll specify and quote the full cold box.",
      image: {
        src: projectHighland,
        alt: "Completed cold storage building",
      },
    },
    metaDescription:
      "Insulated cold room panels with cam-lock jointing — freezer rooms, chillers, blast freezers and wash-down processing halls from −40°C to ambient.",
  },
  {
    slug: "custom-fabrication",
    title: "Custom Fabrication",
    heroTitle: "Custom Fabrication.",
    description:
      "Z-purlins, decking sheets, skylights, ventilators and bespoke steel components — rolled, cut and galvanized in-house to your drawings.",
    bannerImage: {
      src: fabricationImg,
      alt: "Custom fabricated galvanized steel components in the plant",
    },
    cardImage: {
      src: fabricationImg,
      alt: "Custom fabricated steel components",
    },
    cardDescription:
      "Z-purlins, decking sheets, skylights, ventilators and bespoke steel components.",
    heroStats: [
      { value: "6,000T", label: "annual capacity" },
      { value: "In-house", label: "galvanizing" },
      { value: "±2mm", label: "roll tolerance" },
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
              title: "Rolled to your section",
              body: "Z and C sections are roll-formed from galvanized coil to the depth and gauge on your drawing, punched in line so holes land where the frame expects them. Z sections lap over the rafter to run continuous across bays.",
            },
          },
          features: [
            {
              icon: Combine,
              title: "Lapped continuity",
              body: "Z sections nest over rafters.",
            },
            {
              icon: Hammer,
              title: "Punched in line",
              body: "Holes formed, not drilled on site.",
            },
            {
              icon: ShieldCheck,
              title: "Pre-galvanized",
              body: "Coated coil, cut ends treated.",
            },
          ],
          specs: {
            note: "Every run is rolled to order — depth, gauge and hole pattern specified to your frame drawings.",
            items: [
              {
                label: "SECTIONS",
                value: "Z · C",
                detail: "Purlins, girts and rails",
              },
              {
                label: "DEPTH",
                value: "150–300mm",
                detail: "Selected to the span",
              },
              {
                label: "GAUGE",
                value: "1.6–3.2mm",
                detail: "Rolled to ±2mm tolerance",
              },
              {
                label: "LENGTH",
                value: "up to 12m",
                detail: "Cut and punched to drawing",
              },
            ],
          },
        },
      },
      {
        id: "decking",
        title: "Decking Sheets",
        heroImage: {
          src: serviceBenefits,
          alt: "Profiled steel decking sheets ready for dispatch",
        },
        content: {
          overview: {
            heading: "Formwork that\nstays in the slab.",
            lead: {
              icon: SquareStack,
              title: "Permanent shuttering",
              body: "Profiled decking spans between beams as formwork and stays put as tensile reinforcement once the concrete cures. Embossed ribs key into the slab, so the deck and the concrete act together rather than separately.",
            },
          },
          features: [
            {
              icon: Weight,
              title: "Composite action",
              body: "Embossments key to the slab.",
            },
            {
              icon: Timer,
              title: "No stripping",
              body: "Formwork never comes down.",
            },
            {
              icon: Move3d,
              title: "Working platform",
              body: "Safe deck from day one.",
            },
          ],
          specs: {
            note: "Every deck is rolled to order — profile, gauge and span specified to your slab design.",
            items: [
              {
                label: "RIB DEPTH",
                value: "50–75mm",
                detail: "Selected to the span",
              },
              {
                label: "THICKNESS",
                value: "0.80–1.20mm",
                detail: "TCT to loading",
              },
              {
                label: "SPAN",
                value: "up to 4m",
                detail: "Unpropped, deck dependent",
              },
              {
                label: "FINISH",
                value: "Galvanized",
                detail: "Embossed for composite action",
              },
            ],
          },
        },
      },
      {
        id: "skylights",
        title: "Skylights",
        heroImage: {
          src: roofingDaylight,
          alt: "Skylights bringing daylight into an industrial interior",
        },
        content: {
          overview: {
            heading: "Light that works\nfor the building.",
            lead: {
              icon: Sun,
              title: "Natural daylighting",
              body: "Fixed directly to the roof, skylights bring daylight and fresh air into interiors — reducing lighting, heating and cooling loads. Ventilating units open to release hot air and draw fresh air in.",
            },
          },
          features: [
            {
              icon: Zap,
              title: "Energy savings",
              body: "Cuts daytime lighting and HVAC costs.",
            },
            {
              icon: Move3d,
              title: "Curved & flat",
              body: "Panels up to 12m, steel or aluminium profiles.",
            },
            {
              icon: ShieldCheck,
              title: "Weather-sealed",
              body: "UV-stable, leak-proof polycarbonate glazing.",
            },
          ],
          specs: {
            note: "Every skylight is made to order — profiles, glazing and curvature specified to your roof.",
            items: [
              {
                label: "PANEL LENGTH",
                value: "up to 12m",
                detail: "Continuous curved or flat spans",
              },
              {
                label: "PROFILES",
                value: "Steel · Aluminium",
                detail: "Multiple standing-seam options",
              },
              {
                label: "GLAZING",
                value: "UV Polycarbonate",
                detail: "Diffused, impact-resistant",
              },
              {
                label: "CURVATURE",
                value: "Curved or Flat",
                detail: "Radius engineered to design",
              },
            ],
          },
        },
      },
      {
        id: "ventilators",
        title: "Ventilators",
        heroImage: {
          src: roofingInterior,
          alt: "Roof ventilation running along a building ridge",
        },
        content: {
          overview: {
            heading: "Heat leaves\nby itself.",
            lead: {
              icon: Fan,
              title: "Air movement without power",
              body: "Turbo ventilators and continuous ridge vents use the stack effect and wind to pull hot air out of the roof space, so the working floor stays cooler with no fan, no ducting and no running cost.",
            },
          },
          features: [
            {
              icon: Wind,
              title: "No running cost",
              body: "Driven by stack and wind.",
            },
            {
              icon: CloudRain,
              title: "Rain excluded",
              body: "Throated and weather-hooded.",
            },
            {
              icon: Combine,
              title: "Ridge or unit",
              body: "Continuous vent or turbo units.",
            },
          ],
          specs: {
            note: "Every ventilation set is made to order — throat size, count and layout specified to your roof volume.",
            items: [
              {
                label: "TURBO THROAT",
                value: "300–900mm",
                detail: "Sized to air changes needed",
              },
              {
                label: "RIDGE VENT",
                value: "Continuous",
                detail: "Runs the length of the ridge",
              },
              {
                label: "MATERIAL",
                value: "GI · Aluminium",
                detail: "Stainless bearings throughout",
              },
              {
                label: "WEATHERING",
                value: "Hooded",
                detail: "Bird and rain protected",
              },
            ],
          },
        },
      },
      {
        id: "bespoke",
        title: "Bespoke Components",
        heroImage: {
          src: whyFacility,
          alt: "PrimeNMS fabrication floor",
        },
        content: {
          overview: {
            heading: "Made to your\ndrawing, not ours.",
            lead: {
              icon: Wrench,
              title: "One plant, every component",
              body: "Roll forming, cutting, welding and galvanizing sit under one roof, so a bracket, a cleat and a bespoke assembly all come off the same line to the same tolerance — and land on site together with the rest of the order.",
            },
          },
          features: [
            {
              icon: Factory,
              title: "6,000T a year",
              body: "Single-plant throughput.",
            },
            {
              icon: Hammer,
              title: "Galvanized in-house",
              body: "No third-party bath, no delay.",
            },
            {
              icon: BadgeCheck,
              title: "Sample matched",
              body: "Rolled from drawing or sample.",
            },
          ],
          specs: {
            note: "Every component is made to order — section, gauge and finish rolled to your drawings.",
            items: [
              {
                label: "INPUT",
                value: "Drawing · Sample",
                detail: "Roll setup confirmed first",
              },
              {
                label: "GAUGE",
                value: "1.2–3.2mm",
                detail: "Rolled to ±2mm tolerance",
              },
              {
                label: "CAPACITY",
                value: "6,000T / yr",
                detail: "Single-plant throughput",
              },
              {
                label: "FINISH",
                value: "Hot-Dip Galvanized",
                detail: "Pre-coated options available",
              },
            ],
          },
        },
      },
    ],
    gallery: [
      { src: fabricationImg, alt: "Fabricated steel components" },
      { src: whyFacility, alt: "PrimeNMS manufacturing facility" },
      { src: projectPrime, alt: "Prime manufacturing plant" },
      { src: featuredFacility, alt: "Fabrication floor" },
    ],
    faq: [
      {
        question: "Do you fabricate from customer drawings?",
        answer:
          "Yes. Send the section drawing or a sample and we'll confirm the roll setup, tolerances and finish before production starts.",
      },
      {
        question: "Is there a minimum order quantity?",
        answer:
          "Standard Z and C sections have no meaningful minimum. A bespoke roll profile carries a setup cost that is easier to justify above roughly five tonnes.",
      },
      {
        question: "Which components do you supply?",
        answer:
          "Z and C purlins, girts, decking sheets, skylights, turbo and ridge ventilators, louvres, brackets, cleats and bespoke assemblies fabricated to drawing.",
      },
      {
        question: "Is galvanizing done in-house?",
        answer:
          "Yes — hot-dip galvanizing is part of the same plant, so components are coated and inspected before dispatch instead of travelling to a third-party bath.",
      },
    ],
    cta: {
      heading: "Send us the drawing.",
      body: "Share your section, gauge and quantity — we'll roll, galvanize and quote the run.",
      image: {
        src: serviceBenefits,
        alt: "Fabricated steel components ready for dispatch",
      },
    },
    metaDescription:
      "Custom steel fabrication — Z and C purlins, composite decking, skylights, ventilators and bespoke components rolled to drawing and hot-dip galvanized in-house.",
  },
];

/** Every slug, for `generateStaticParams` and route validation. */
export const SERVICE_SLUGS = SERVICES.map((service) => service.slug);

/** Lookup used by the detail route. Returns `undefined` for unknown slugs. */
export function getService(slug: string): ServiceDetail | undefined {
  return SERVICES.find((service) => service.slug === slug);
}
