import { Container } from "@/components/layout/container";

/**
 * Full-page loading skeleton for the Blog Detail route, mirroring the hero,
 * article body and related-articles layout so the page doesn't shift on load.
 */
export function BlogDetailSkeleton() {
  return (
    <div aria-hidden="true" className="animate-pulse">
      <section className="pt-[132px] lg:pt-[168px]">
        <Container>
          <div className="flex flex-col items-start gap-5">
            <div className="h-4 w-40 rounded bg-bg-sunken" />
            <div className="h-7 w-32 rounded-pill bg-bg-sunken" />
          </div>

          <div className="mt-7 flex max-w-[760px] flex-col gap-3">
            <div className="h-11 w-full rounded bg-bg-sunken" />
            <div className="h-11 w-3/4 rounded bg-bg-sunken" />
          </div>

          <div className="mt-9 flex items-center gap-3.5 lg:mt-[46px]">
            <div className="size-12 rounded-full bg-bg-sunken" />
            <div className="flex flex-col gap-2">
              <div className="h-4 w-36 rounded bg-bg-sunken" />
              <div className="h-4 w-48 rounded bg-bg-sunken" />
            </div>
          </div>

          <div className="mt-8 aspect-[16/10] w-full rounded-[24px] bg-bg-sunken sm:aspect-[2/1] lg:mt-5 lg:aspect-[40/13]" />
        </Container>
      </section>

      <Container>
        <div className="mt-12 flex flex-col gap-4 lg:mt-14">
          {Array.from({ length: 6 }).map((_, i) => (
            <div
              key={i}
              className="h-5 rounded bg-bg-sunken"
              style={{ width: `${[92, 98, 80, 95, 88, 60][i]}%` }}
            />
          ))}
        </div>
      </Container>

      <section className="mt-16 bg-bg-sunken py-16 lg:py-[64px]">
        <Container>
          <div className="h-4 w-28 rounded bg-white/60" />
          <div className="mt-3 h-10 w-64 rounded bg-white/60" />
          <div className="mt-10 grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3">
            {Array.from({ length: 3 }).map((_, i) => (
              <div
                key={i}
                className="flex flex-col overflow-hidden rounded-[24px] bg-bg-card"
              >
                <div className="aspect-[512/170] w-full bg-white/60" />
                <div className="flex flex-col gap-2.5 px-6 pb-[26px] pt-[22px]">
                  <div className="h-3 w-28 rounded bg-white/60" />
                  <div className="h-6 w-4/5 rounded bg-white/60" />
                </div>
              </div>
            ))}
          </div>
        </Container>
      </section>
    </div>
  );
}
