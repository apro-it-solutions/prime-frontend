import { Container } from "@/components/layout/container";
import { SectionEyebrow } from "@/components/services/section-eyebrow";
import { FadeHeading } from "@/components/ui/fade-heading";
import { RevealRow, RevealItem } from "@/components/ui/reveal-row";
import { ImageWithFallback } from "@/components/ui/image-with-fallback";
import type { Project } from "@/types/project";

/**
 * Project gallery. Optional: the section is skipped entirely when the API
 * returned no gallery images. Photos use the same 24px radius, scroll reveal and
 * hover zoom as the service gallery.
 */
export function ProjectGallery({ project }: { project: Project }) {
  const gallery = project.gallery ?? [];
  if (gallery.length === 0) return null;

  return (
    <section id="gallery" className="scroll-mt-28 bg-bg-base py-16 lg:py-[70px]">
      <Container>
        <SectionEyebrow
          label="Gallery"
          variant="plain"
          className="text-green-accent"
        />
        <FadeHeading
          text={`${project.title} in the field.`}
          className="mt-3.5 max-w-[735px] whitespace-pre-line font-heading text-[28px] font-semibold leading-[1.18] tracking-[-0.2px] text-text-primary sm:text-[34px] lg:text-[40px]"
        />

        <RevealRow className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {gallery.map((src, i) => (
            <RevealItem key={src} preset="image">
              <figure className="group relative aspect-[4/3] w-full overflow-hidden rounded-[24px] bg-bg-sunken">
                <ImageWithFallback
                  src={src}
                  alt={`${project.title} — photo ${i + 1}`}
                  fill
                  loading="lazy"
                  sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 380px"
                  className="object-cover transition-transform duration-500 group-hover:scale-105"
                />
              </figure>
            </RevealItem>
          ))}
        </RevealRow>
      </Container>
    </section>
  );
}
