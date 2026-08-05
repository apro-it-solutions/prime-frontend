import type { StaticImageData } from "next/image";
import coastal from "../../../public/images/project-coastal-industrial.png";
import skyline from "../../../public/images/project-skyline-commercial.png";
import greenfield from "../../../public/images/project-greenfield-logistics.png";
import highland from "../../../public/images/project-highland-coldstorage.png";
import metro from "../../../public/images/project-metro-distribution.png";
import primeUnit from "../../../public/images/project-prime-manufacturing.png";

export interface ProjectTab {
  id: string;
  label: string;
}

export interface Project {
  id: string;
  /** Category name (e.g. "Industrial") shown in the card kicker. */
  category: string;
  /** Spec detail shown after the category (e.g. "60,000 sqft"). */
  spec: string;
  title: string;
  location: string;
  image: StaticImageData | string;
  /** Tab ids this project belongs to — drives filtering (API-ready). */
  tabs: string[];
}

/** Filter tabs shown above the grid (Figma order). */
export const PROJECT_TABS: ProjectTab[] = [
  { id: "all", label: "All" },
  { id: "warehouses", label: "Warehouses" },
  { id: "industrial", label: "Industrial" },
  { id: "commercial", label: "Commercial" },
  { id: "logistics", label: "Logistics" },
];

export const PROJECTS: Project[] = [
  {
    id: "coastal-industrial-plant",
    category: "Industrial",
    spec: "60,000 sqft",
    title: "Coastal Industrial Plant",
    location: "Kochi, Kerala",
    image: coastal,
    tabs: ["industrial"],
  },
  {
    id: "skyline-commercial-block",
    category: "Commercial",
    spec: "3 Floors",
    title: "Skyline Commercial Block",
    location: "Bengaluru, KA",
    image: skyline,
    tabs: ["commercial"],
  },
  {
    id: "greenfield-logistics-park",
    category: "Logistics",
    spec: "Multi-Unit",
    title: "Greenfield Logistics Park",
    location: "Salem, TN",
    image: greenfield,
    tabs: ["logistics"],
  },
  {
    id: "highland-cold-storage",
    category: "Cold Room",
    spec: "Insulated",
    title: "Highland Cold Storage",
    location: "Munnar, Kerala",
    image: highland,
    tabs: [],
  },
  {
    id: "metro-distribution-hub",
    category: "Warehouse",
    spec: "45,000 sqft",
    title: "Metro Distribution Hub",
    location: "Chennai, TN",
    image: metro,
    tabs: ["warehouses"],
  },
  {
    id: "prime-manufacturing-unit",
    category: "Industrial",
    spec: "Custom PEB",
    title: "Prime Manufacturing Unit",
    location: "Coimbatore, TN",
    image: primeUnit,
    tabs: ["industrial"],
  },
];

/** Returns the projects visible for a given tab id ("all" → everything). */
export function filterProjects(tabId: string): Project[] {
  if (tabId === "all") return PROJECTS;
  return PROJECTS.filter((project) => project.tabs.includes(tabId));
}
