"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { Flip } from "gsap/Flip";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Container } from "@/components/layout/container";
import { PillButton } from "@/components/ui/pill-button";
import { TeamCard, type TeamMember } from "@/components/ui/team-card";
import bindu from "../../../public/images/team-bindu-joseph.jpg";
import josephMathew from "../../../public/images/team-joseph-mathew.jpg";
import jifri from "../../../public/images/team-jifri-ms.jpg";

gsap.registerPlugin(Flip, ScrollTrigger);

const TEAM: TeamMember[] = [
  { name: "Bindu Joseph", role: "Managing Director", photo: bindu },
  { name: "Joseph Mathew", role: "Chairman", photo: josephMathew },
  { name: "Bindu Joseph", role: "Managing Director", photo: bindu },
  { name: "Jifri M. S.", role: "Executive Director", photo: jifri },
];

/** The card the deck fans out from. It never moves. */
const CHAIRMAN = TEAM.findIndex((m) => m.role === "Chairman");

/** Subtle fade for the Chairman — opacity only, no transform. */
const REVEAL = 0.5;
/** Beat between the Chairman settling and the deck spreading. */
const HOLD = 0.3;
/** The fan-out: one duration and one ease for all cards, so they land together. */
const SPREAD = 1.1;
const EASE = "power4.out";

/** 03 — Leadership Team. */
export function LeadershipSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const slotRefs = useRef<(HTMLDivElement | null)[]>([]);
  const cardRefs = useRef<(HTMLDivElement | null)[]>([]);
  const copyRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;
    // Reduced motion: `motion-safe:opacity-0` never hides anything, so bail out
    // and leave the final layout exactly as rendered.
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    // Created inside a ScrollTrigger callback, so gsap.context() can't collect
    // it — killed explicitly on unmount.
    let tl: gsap.core.Timeline | undefined;

    const ctx = gsap.context(() => {
      const slots = slotRefs.current;
      const cards = cardRefs.current;
      const copy = copyRef.current;
      if (slots.length !== TEAM.length || cards.length !== TEAM.length) return;
      if (slots.some((el) => !el) || cards.some((el) => !el) || !copy) return;

      const chairSlot = slots[CHAIRMAN]!;
      const chairCard = cards[CHAIRMAN]!;
      const deckSlots = slots.filter((_, i) => i !== CHAIRMAN) as HTMLElement[];
      const deckCards = cards.filter((_, i) => i !== CHAIRMAN) as HTMLElement[];
      const copyItems = gsap.utils.toArray<HTMLElement>(copy.children);

      // Hold the whole section dark until the trigger fires.
      gsap.set([...(cards as HTMLElement[]), ...copyItems], { opacity: 0 });
      gsap.set(copyItems, { y: 24 });

      /**
       * Measured at trigger time rather than on mount: nothing is visible
       * beforehand, so a resize between mount and entry cannot desync the
       * Flip geometry.
       */
      function play() {
        // Record where the deck belongs, then stack every card onto the
        // Chairman's exact box with a pure transform. The slots stay in the
        // flow, so the row keeps its full footprint and nothing reflows.
        const deckHome = Flip.getState(deckSlots);
        deckSlots.forEach((el) => Flip.fit(el, chairSlot, { scale: false }));

        // Chairman sits on top of the pile, so the deck reads as underneath it
        // and slides out from beneath it.
        gsap.set(chairSlot, { zIndex: 2 });
        gsap.set(deckSlots, { zIndex: 1 });
        gsap.set([...(slots as HTMLElement[]), ...(cards as HTMLElement[])], {
          willChange: "transform, opacity, filter",
        });
        gsap.set(deckCards, {
          opacity: 0,
          scale: 0.95,
          filter: "blur(8px)",
          force3D: true,
        });

        tl = gsap.timeline({ defaults: { force3D: true } });

        // 1 — Chairman fades up in place. No movement, no scale.
        tl.to(chairCard, {
          opacity: 1,
          duration: REVEAL,
          ease: "power2.out",
        });

        // 2 — The deck fans out. Both tweens share the label, duration and
        // ease, and Flip carries all three cards in one tween with no stagger,
        // so every card leaves and lands on the same frame.
        tl.addLabel("spread", `+=${HOLD}`);
        tl.add(
          Flip.to(deckHome, {
            duration: SPREAD,
            ease: EASE,
            stagger: 0,
            force3D: true,
          }),
          "spread",
        );
        tl.to(
          deckCards,
          {
            opacity: 1,
            scale: 1,
            filter: "blur(0px)",
            duration: SPREAD,
            ease: EASE,
          },
          "spread",
        );

        // 3 — Copy follows the settled row.
        tl.to(
          copyItems,
          { opacity: 1, y: 0, duration: 0.7, stagger: 0.08, ease: "power2.out" },
          `spread+=${SPREAD}`,
        );

        // Drop the compositing hints once the section is at rest.
        tl.set([...(slots as HTMLElement[]), ...(cards as HTMLElement[])], {
          clearProps: "willChange,filter,zIndex",
        });
      }

      ScrollTrigger.create({
        trigger: section,
        start: "top 75%",
        once: true,
        onEnter: play,
      });
    }, section);

    return () => {
      tl?.kill();
      ctx.revert();
    };
  }, []);

  return (
    <section ref={sectionRef} className="bg-text-primary py-24 lg:py-32">
      <Container>
        <div className="flex flex-col items-center gap-12 lg:flex-row lg:justify-center lg:gap-[50px]">
          {/* Team photos — outer div is the layout slot (Flip / stacking), inner
              div carries opacity, scale and blur so the two never fight. */}
          <div className="grid w-full grid-cols-2 gap-4 sm:max-w-[500px] lg:flex lg:w-auto lg:max-w-none">
            {TEAM.map((member, i) => (
              <div
                key={i}
                ref={(el) => {
                  slotRefs.current[i] = el;
                }}
                className="w-full lg:w-[230px]"
              >
                <div
                  ref={(el) => {
                    cardRefs.current[i] = el;
                  }}
                  className="motion-safe:opacity-0"
                >
                  <TeamCard member={member} className="w-full" />
                </div>
              </div>
            ))}
          </div>

          {/* Copy */}
          <div ref={copyRef} className="w-full max-w-[560px] shrink-0">
            <h2 className="font-heading text-3xl font-semibold leading-[1.15] tracking-[-0.44px] text-white motion-safe:opacity-0 sm:text-4xl lg:text-[44px]">
              The People
              <br />
              Behind Prime NMS
            </h2>
            <p className="mt-6 max-w-[560px] text-lg leading-[1.65] text-white/80 motion-safe:opacity-0">
              Our leadership brings decades of combined steel manufacturing and
              engineering-execution experience to every project.
            </p>
            <div className="mt-8 motion-safe:opacity-0">
              <PillButton label="View All Leadership" href="/leadership" />
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
}
