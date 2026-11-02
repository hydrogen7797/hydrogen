"use client";

import { useEffect, useRef } from "react";
import Image from "next/image";
import { gsap } from "gsap";
import { Contours } from "./Contours";
import { TextLink } from "@/components/ui/ArrowPill";
import { INTERVIEWS, INTERVIEWS_ALL } from "@/data/home";

const OFFSETS = ["lg:mt-0", "lg:mt-20", "lg:mt-[134px]"];

export function ClientInterview() {
  const headingRef = useRef<HTMLHeadingElement>(null);
  const cardsRef = useRef<HTMLDivElement>(null);

  // The giant heading fades back as the cards slide up over it.
  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(
        headingRef.current,
        { color: "rgba(255,255,255,1)" },
        {
          color: "rgba(255,255,255,0.07)",
          ease: "none",
          scrollTrigger: { trigger: cardsRef.current, start: "top 95%", end: "top 45%", scrub: true },
        },
      );
    });
    return () => ctx.revert();
  }, []);

  return (
    <section className="relative z-[1] bg-footer text-white" aria-labelledby="interview-heading">
      {/* convex top edge */}
      <div aria-hidden="true" className="absolute inset-x-[-25vw] -top-[5vw] h-[12vw] rounded-[50%] bg-footer" />
      <Contours className="opacity-50" />

      <div className="sticky top-0 flex h-[100svh] items-center justify-center overflow-hidden">
        <h2 ref={headingRef} id="interview-heading" className="font-display text-[12vw] leading-none whitespace-nowrap">
          Client Interview
        </h2>
      </div>

      <div ref={cardsRef} className="content-regular relative -mt-[38svh] pb-[22vh]">
        <ul className="grid gap-14 sm:grid-cols-2 lg:grid-cols-3 lg:gap-[66px]">
          {INTERVIEWS.map((it, i) => (
            <li key={it.href} className={OFFSETS[i]}>
              <a href={it.href} target="_blank" rel="noreferrer" className="group relative block">
                <span className="absolute -inset-4 rounded-lg bg-white/10 opacity-0 transition-opacity ease-standard-out group-hover:opacity-100" />
                <span className="relative block aspect-[332/202] overflow-hidden rounded-lg">
                  <Image
                    src={it.image}
                    alt=""
                    fill
                    sizes="(min-width: 1024px) 332px, 90vw"
                    className="object-cover transition-transform duration-700 ease-[var(--ease-power3-out)] group-hover:scale-105"
                  />
                </span>
                <span className="relative mt-6 block font-en text-[13px] font-semibold text-white/75">{it.date}</span>
                <span className="relative mt-2.5 line-clamp-3 text-xl leading-[1.55] font-bold">{it.title}</span>
                <span className="relative mt-4 flex flex-wrap gap-x-2.5 gap-y-1 text-[13px] font-bold text-white/70">
                  {it.tags.map((t) => (
                    <span key={t}>#{t}</span>
                  ))}
                </span>
              </a>
            </li>
          ))}
        </ul>
        <TextLink href={INTERVIEWS_ALL} external className="mt-20 text-white">
          View All
        </TextLink>
      </div>
    </section>
  );
}
