"use client";

import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { Reveal } from "@/components/ui/Reveal";
import { OutlineButton } from "@/components/ui/ArrowPill";
import { COMPANY_HEART_PATH } from "@/components/icons";
import { COMPANY } from "@/data/home";

const RINGS = 9;

export function Company() {
  const sectionRef = useRef<HTMLElement>(null);
  const bgHeadingRef = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(
        bgHeadingRef.current,
        { yPercent: 18 },
        {
          yPercent: -18,
          ease: "none",
          scrollTrigger: { trigger: sectionRef.current, start: "top bottom", end: "bottom top", scrub: true },
        },
      );
    });
    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      className="relative isolate z-[1] overflow-x-clip bg-primary text-white"
      aria-labelledby="company-heading"
    >
      {/* Sticky background lane: faint "Company" + heart rings */}
      <div aria-hidden="true" className="pointer-events-none absolute inset-0">
        <div className="sticky top-0 flex h-[100svh] items-center overflow-hidden">
          <span
            ref={bgHeadingRef}
            className="block pl-[8vw] font-display text-[30vw] leading-none whitespace-nowrap text-white/[0.07] lg:text-[22vw]"
          >
            Company
          </span>
          <svg
            viewBox="0 0 857 743"
            fill="none"
            className="absolute top-1/2 left-1/2 w-[100vw] text-white/30 lg:w-[46vw]"
            style={{ transform: "translate(-50%, -50%) translate(27vw, 5.5vh) rotate(14deg)" }}
          >
            {Array.from({ length: RINGS }, (_, i) => (
              <g
                key={i}
                style={{ transform: `scale(${1 - i * 0.085})`, transformOrigin: "50% 50%", transformBox: "view-box" }}
              >
                <path
                  d={COMPANY_HEART_PATH}
                  stroke="currentColor"
                  strokeWidth={0.75}
                  vectorEffect="non-scaling-stroke"
                  className="animate-[heartbeat_2s_var(--ease-power2-inOut)_infinite]"
                  style={{ transformOrigin: "50% 50%", transformBox: "view-box", animationDelay: `${i * 0.06}s` }}
                />
              </g>
            ))}
          </svg>
        </div>
      </div>

      <div className="relative flex flex-col items-center px-6 pt-32 pb-40 text-center lg:pt-[12vw] lg:pb-[16vw]">
        <h2 id="company-heading" className="sr-only">
          Company
        </h2>
        <Reveal as="p" className="font-en text-base font-semibold">
          Vision
        </Reveal>
        <Reveal
          as="p"
          delay={0.1}
          className="mt-6 text-[6.4vw] leading-[1.6] font-bold tracking-[0.04em] lg:text-[clamp(28px,2.3vw,46px)]"
        >
          {COMPANY.vision.map((l) => (
            <span key={l} className="block">
              {l}
            </span>
          ))}
        </Reveal>

        <Reveal as="p" className="mt-24 font-en text-base font-semibold lg:mt-[7vw]">
          Mission
        </Reveal>
        <Reveal
          as="p"
          delay={0.1}
          className="mt-6 text-[6.4vw] leading-[1.6] font-bold tracking-[0.04em] lg:text-[clamp(28px,2.3vw,46px)]"
        >
          {COMPANY.mission}
        </Reveal>
        <Reveal
          as="p"
          delay={0.2}
          className="mt-10 text-[3.8vw] leading-[2.2] font-bold tracking-[0.04em] lg:text-[clamp(15px,1.1vw,21px)]"
        >
          {COMPANY.body.map((l) => (
            <span key={l} className="block">
              {l}
            </span>
          ))}
        </Reveal>
        <Reveal delay={0.3} className="mt-14 flex w-full flex-col items-center gap-3 sm:w-auto sm:flex-row">
          {COMPANY.links.map((l) => (
            <OutlineButton key={l.label} href={l.href} className="w-full sm:w-auto">
              {l.label}
            </OutlineButton>
          ))}
        </Reveal>
      </div>
    </section>
  );
}
