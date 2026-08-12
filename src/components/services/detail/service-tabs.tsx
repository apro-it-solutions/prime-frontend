"use client";

import { useEffect, useId, useRef, useState, type ReactNode } from "react";
import {
  AnimatePresence,
  motion,
  useReducedMotion,
  LayoutGroup,
} from "framer-motion";
import { Container } from "@/components/layout/container";
import { cn } from "@/lib/utils";

/** The site's shared ease-out curve. */
const EASE_OUT = [0.22, 1, 0.36, 1] as const;

interface ServiceTabsProps {
  /** Uppercase label above the strip (Figma 161:205). */
  eyebrow: string;
  /** Tab id + label only — the panel bodies come in via `panels`. */
  tabs: { id: string; title: string }[];
  /**
   * One rendered panel per tab, in the same order. These are Server Components
   * rendered by the page and handed down as elements, which is what lets the
   * panels keep using icon components and static image imports while this
   * switcher stays a Client Component.
   */
  panels: ReactNode[];
}

/**
 * 02 — Sub-service tabs (Figma 150:3, the pill strip).
 *
 * The tabs are the current service's own sub-services, not links to other
 * services: selecting one swaps the panel below and nothing else. No
 * navigation, no URL change, no reload — the hero, the strip and the sections
 * after the panel all stay exactly as they are.
 *
 * The active pill is a single shared `layoutId` background, so it slides from
 * the old tab to the new one instead of cutting; the panel cross-fades under
 * it. Both collapse to a plain swap under `prefers-reduced-motion`.
 */
export function ServiceTabs({ eyebrow, tabs, panels }: ServiceTabsProps) {
  const [activeIndex, setActiveIndex] = useState(0);
  const shouldReduceMotion = useReducedMotion();
  const baseId = useId();
  const stripRef = useRef<HTMLDivElement | null>(null);
  const activeRef = useRef<HTMLButtonElement | null>(null);

  // Keep the selected pill visible when the strip overflows. Scrolls the strip
  // itself rather than using scrollIntoView, which would also move the page.
  useEffect(() => {
    const strip = stripRef.current;
    const pill = activeRef.current;
    if (!strip || !pill) return;

    strip.scrollLeft =
      pill.offsetLeft - (strip.clientWidth - pill.clientWidth) / 2;
  }, [activeIndex]);

  const tabId = (i: number) => `${baseId}-tab-${tabs[i].id}`;
  const panelId = (i: number) => `${baseId}-panel-${tabs[i].id}`;

  // Left/Right move between tabs, Home/End jump to the ends — the expected
  // keyboard model for a tablist.
  const onKeyDown = (e: React.KeyboardEvent<HTMLDivElement>) => {
    const last = tabs.length - 1;
    let next: number | null = null;

    if (e.key === "ArrowRight") next = activeIndex === last ? 0 : activeIndex + 1;
    else if (e.key === "ArrowLeft") next = activeIndex === 0 ? last : activeIndex - 1;
    else if (e.key === "Home") next = 0;
    else if (e.key === "End") next = last;

    if (next === null) return;
    e.preventDefault();
    setActiveIndex(next);
    // Selection follows focus, so move focus with it.
    stripRef.current
      ?.querySelectorAll<HTMLButtonElement>("[role='tab']")
      [next]?.focus();
  };

  const activeTab = tabs[activeIndex];

  return (
    <>
      <section className="bg-bg-base py-6">
        <Container>
          <p className="font-body text-xs font-medium uppercase leading-[1.2] tracking-[0.5px] text-text-secondary">
            {eyebrow}
          </p>

          <div
            ref={stripRef}
            role="tablist"
            aria-label={`${eyebrow} categories`}
            onKeyDown={onKeyDown}
            className="-mx-6 mt-3 flex w-[calc(100%+3rem)] gap-3 overflow-x-auto px-6 pb-1 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden lg:-mx-10 lg:w-[calc(100%+5rem)] lg:px-10"
          >
            <LayoutGroup id={baseId}>
              {tabs.map((tab, i) => {
                const isActive = i === activeIndex;
                return (
                  <button
                    key={tab.id}
                    ref={isActive ? activeRef : undefined}
                    type="button"
                    role="tab"
                    id={tabId(i)}
                    aria-selected={isActive}
                    aria-controls={panelId(i)}
                    tabIndex={isActive ? 0 : -1}
                    onClick={() => setActiveIndex(i)}
                    className={cn(
                      "relative inline-flex shrink-0 items-center whitespace-nowrap rounded-pill px-[22px] py-3 font-body text-base leading-[1.5] transition-colors duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-green-accent focus-visible:ring-offset-2",
                      isActive
                        ? "text-white"
                        : "border border-border bg-bg-card text-text-primary hover:border-green-accent/40 hover:text-green-primary",
                    )}
                  >
                    {isActive && (
                      <motion.span
                        aria-hidden="true"
                        layoutId="service-tab-pill"
                        transition={
                          shouldReduceMotion
                            ? { duration: 0 }
                            : { duration: 0.45, ease: EASE_OUT }
                        }
                        className="absolute inset-0 rounded-pill bg-green-primary"
                      />
                    )}
                    <span className="relative z-10">{tab.title}</span>
                  </button>
                );
              })}
            </LayoutGroup>
          </div>
        </Container>
      </section>

      <div
        role="tabpanel"
        id={panelId(activeIndex)}
        aria-labelledby={tabId(activeIndex)}
        tabIndex={0}
        className="focus-visible:outline-none"
      >
        <AnimatePresence mode="wait" initial={false}>
          <motion.div
            key={activeTab.id}
            initial={shouldReduceMotion ? false : { opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            exit={shouldReduceMotion ? { opacity: 1 } : { opacity: 0, y: -8 }}
            transition={{ duration: 0.3, ease: EASE_OUT }}
          >
            {panels[activeIndex]}
          </motion.div>
        </AnimatePresence>
      </div>
    </>
  );
}
