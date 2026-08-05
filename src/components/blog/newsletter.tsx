"use client";

import { useState, type FormEvent } from "react";
import { Container } from "@/components/layout/container";

/** Newsletter CTA band (Figma 1600×280, green-primary). */
export function Newsletter() {
  const [email, setEmail] = useState("");
  const [subscribed, setSubscribed] = useState(false);

  function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    if (!email) return;
    setSubscribed(true);
    setEmail("");
  }

  return (
    <section className="bg-bg-base pb-20 lg:pb-[100px]">
      <Container>
        <div className="overflow-hidden rounded-[28px] bg-green-primary px-8 py-12 sm:px-12 lg:px-14 lg:py-16">
          <div className="flex flex-col gap-8 lg:flex-row lg:items-center lg:justify-between lg:gap-12">
            <div className="max-w-[600px]">
              <p className="font-heading text-[13px] font-medium uppercase tracking-[1.2px] text-white/80">
                Stay in the Loop
              </p>
              <h2 className="mt-2 font-heading text-3xl font-semibold leading-[1.18] tracking-[-0.2px] text-white lg:text-[40px]">
                Get build stories in your inbox.
              </h2>
              <p className="mt-4 font-body text-base leading-[1.5] text-white/85">
                Monthly insights on steel construction, projects and industry
                news. No spam.
              </p>
            </div>

            <form
              onSubmit={handleSubmit}
              className="flex w-full flex-col gap-3 sm:flex-row lg:w-auto"
            >
              <label htmlFor="newsletter-email" className="sr-only">
                Email address
              </label>
              <input
                id="newsletter-email"
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="you@company.com"
                className="h-14 w-full rounded-full bg-bg-card px-6 font-body text-base text-text-primary placeholder:text-text-secondary focus:outline-none focus:ring-2 focus:ring-white/40 sm:w-[360px]"
              />
              <button
                type="submit"
                className="inline-flex h-14 shrink-0 items-center justify-center rounded-full bg-text-primary px-7 font-body text-base text-white transition-colors hover:bg-black focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/50"
              >
                Subscribe
              </button>
            </form>
          </div>

          <p aria-live="polite" className="mt-4 min-h-5 font-body text-sm text-white/90">
            {subscribed && "Thanks for subscribing — check your inbox to confirm."}
          </p>
        </div>
      </Container>
    </section>
  );
}
