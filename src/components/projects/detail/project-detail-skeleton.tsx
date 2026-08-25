import { Container } from "@/components/layout/container";

/**
 * Full-page loading skeleton for the Project Detail route, mirroring the hero,
 * description body and facts sidebar so the page doesn't shift on load.
 */
export function ProjectDetailSkeleton() {
  return (
    <div aria-hidden="true" className="animate-pulse">
      <section className="pt-[132px] lg:pt-[168px]">
        <Container>
          <div className="flex flex-col items-start gap-5">
            <div className="h-4 w-44 rounded bg-bg-sunken" />
            <div className="h-7 w-32 rounded-pill bg-bg-sunken" />
          </div>

          <div className="mt-7 flex max-w-[760px] flex-col gap-3">
            <div className="h-11 w-full rounded bg-bg-sunken" />
            <div className="h-11 w-3/4 rounded bg-bg-sunken" />
          </div>

          <div className="mt-6 flex max-w-[720px] flex-col gap-2.5">
            <div className="h-5 w-full rounded bg-bg-sunken" />
            <div className="h-5 w-5/6 rounded bg-bg-sunken" />
          </div>

          <div className="mt-8 aspect-[16/10] w-full rounded-[24px] bg-bg-sunken sm:aspect-[2/1] lg:mt-10 lg:aspect-[40/13]" />
        </Container>
      </section>

      <Container>
        <div className="mt-12 grid gap-10 lg:mt-16 lg:grid-cols-[minmax(0,1fr)_360px] lg:gap-16">
          <div className="flex flex-col gap-4">
            {Array.from({ length: 7 }).map((_, i) => (
              <div
                key={i}
                className="h-5 rounded bg-bg-sunken"
                style={{ width: `${[92, 98, 80, 95, 88, 74, 60][i]}%` }}
              />
            ))}
          </div>

          <div className="h-[320px] rounded-[24px] bg-bg-sunken" />
        </div>
      </Container>
    </div>
  );
}
