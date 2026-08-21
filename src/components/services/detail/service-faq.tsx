"use client";

import { useId, useState } from "react";
import { Plus } from "lucide-react";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { Container } from "@/components/layout/container";
import { SectionEyebrow } from "@/components/services/section-eyebrow";
import { FadeHeading } from "@/components/ui/fade-heading";
import { cn } from "@/lib/utils";
import type { ServiceFaqItem } from "../services-data";

/** The site's shared ease-out curve. */
const EASE_OUT = [0.22, 1, 0.36, 1] as const;

/**
 * 06 — FAQ. Optional: the section is skipped when a service has no `faq`
 * entries. One panel open at a time, the first open on load, with the same
 * ease-out curve the rest of the site animates on.
 *
 * Takes the question list rather than the whole service record: this is a
 * Client Component, and a `ServiceDetail` carries icon components that cannot
 * cross the server boundary.
 */
export function ServiceFaq({ faq }: { faq: ServiceFaqItem[] }) {
  const [openIndex, setOpenIndex] = useState(0);
  const shouldReduceMotion = useReducedMotion();
  const baseId = useId();

  if (faq.length === 0) return null;

  return (
    <section className="bg-bg-base py-16 lg:py-[70px]">
      <Container>
        <div className="grid gap-10 lg:grid-cols-[36fr_56fr] lg:gap-x-16 xl:gap-x-24">
          <div>
            <SectionEyebrow
              label="FAQ"
              variant="plain"
              className="text-green-accent"
            />
            <FadeHeading
              text={"Questions we\nget asked."}
              className="mt-3.5 whitespace-pre-line font-heading text-[28px] font-semibold leading-[1.18] tracking-[-0.2px] text-text-primary sm:text-[34px] lg:text-[40px]"
            />
          </div>

          <ul className="flex flex-col gap-4">
            {faq.map((item, i) => {
              const isOpen = i === openIndex;
              const panelId = `${baseId}-panel-${i}`;
              const buttonId = `${baseId}-button-${i}`;

              return (
                <li
                  key={item.question}
                  className="overflow-hidden rounded-[24px] border border-green-accent-light/25 bg-bg-card"
                >
                  <h3>
                    <button
                      type="button"
                      id={buttonId}
                      aria-expanded={isOpen}
                      aria-controls={panelId}
                      onClick={() => setOpenIndex(isOpen ? -1 : i)}
                      className="flex w-full items-center justify-between gap-6 px-7 py-6 text-left font-heading text-lg font-semibold leading-[1.3] tracking-[-0.2px] text-text-primary transition-colors duration-200 hover:text-green-primary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-green-accent lg:text-xl"
                    >
                      {item.question}
                      <Plus
                        aria-hidden="true"
                        strokeWidth={1.5}
                        className={cn(
                          "size-5 shrink-0 text-green-primary transition-transform duration-300 ease-out",
                          isOpen && "rotate-45",
                        )}
                      />
                    </button>
                  </h3>

                  <AnimatePresence initial={false}>
                    {isOpen && (
                      <motion.div
                        key="panel"
                        id={panelId}
                        role="region"
                        aria-labelledby={buttonId}
                        initial={
                          shouldReduceMotion
                            ? { height: "auto", opacity: 1 }
                            : { height: 0, opacity: 0 }
                        }
                        animate={{ height: "auto", opacity: 1 }}
                        exit={
                          shouldReduceMotion
                            ? { height: "auto", opacity: 1 }
                            : { height: 0, opacity: 0 }
                        }
                        transition={{ duration: 0.4, ease: EASE_OUT }}
                        className="overflow-hidden"
                      >
                        <p className="px-7 pb-6 font-body text-base leading-[1.65] text-text-secondary lg:text-[17px]">
                          {item.answer}
                        </p>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </li>
              );
            })}
          </ul>
        </div>
      </Container>
    </section>
  );
}
