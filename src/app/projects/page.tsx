import type { Metadata } from "next";
import { ProjectsHero } from "@/components/projects/projects-hero";
import { ProjectsPortfolio } from "@/components/projects/projects-portfolio";
import { ProjectsCta } from "@/components/projects/projects-cta";
import { SiteFooter } from "@/components/layout/site-footer";

export const metadata: Metadata = {
  title: "Projects — PrimeNMS | Steel Structures Delivered Across India",
  description:
    "Selected PrimeNMS work — warehouses, industrial plants, commercial blocks, cold storage and logistics parks. Pre-engineered galvanized steel structures delivered on time across India.",
  openGraph: {
    title: "PrimeNMS Projects",
    description:
      "Structures we've delivered across India — selected pre-engineered galvanized steel work.",
    type: "website",
  },
};

export default function ProjectsPage() {
  return (
    <>
      <main className="flex-1">
        <ProjectsHero />
        <ProjectsPortfolio />
        <ProjectsCta />
      </main>
      <SiteFooter />
    </>
  );
}
