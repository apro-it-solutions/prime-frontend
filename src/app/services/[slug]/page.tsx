import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { ServiceDetailLayout } from "@/components/services/detail/service-detail-layout";
import { SERVICES, getService } from "@/components/services/services-data";

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3000";

interface ServiceDetailPageProps {
  params: Promise<{ slug: string }>;
}

/** One statically generated route per service in the data source. */
export function generateStaticParams() {
  return SERVICES.map((service) => ({ slug: service.slug }));
}

/** Unknown slugs 404 instead of rendering on demand. */
export const dynamicParams = false;

export async function generateMetadata({
  params,
}: ServiceDetailPageProps): Promise<Metadata> {
  const { slug } = await params;
  const service = getService(slug);

  if (!service) {
    return {
      title: "Service not found — PrimeNMS",
      robots: { index: false, follow: false },
    };
  }

  const title = `${service.title} — PrimeNMS`;
  const url = `${SITE_URL}/services/${service.slug}`;

  return {
    title,
    description: service.metaDescription,
    alternates: { canonical: url },
    openGraph: {
      type: "website",
      title,
      description: service.metaDescription,
      url,
    },
    twitter: {
      card: "summary_large_image",
      title,
      description: service.metaDescription,
    },
  };
}

export default async function ServiceDetailPage({
  params,
}: ServiceDetailPageProps) {
  const { slug } = await params;
  const service = getService(slug);

  if (!service) notFound();

  return <ServiceDetailLayout service={service} />;
}
