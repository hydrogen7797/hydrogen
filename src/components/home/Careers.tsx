"use client";

import { useEffect, useRef } from "react";
import Image from "next/image";
import { gsap } from "gsap";
import { Reveal } from "@/components/ui/Reveal";
import { ArrowPill } from "@/components/ui/ArrowPill";
import { CAREERS } from "@/data/home";

// Stills taken from the reference recording (the original uses short looping videos).
const MEMBERS = [
  { src: "/images/careers/member-01.jpg", cls: "top-[18%] left-[-1%] w-[18.5vw]", rot: 4, speed: 0.9 },
  { src: "/images/careers/member-02.jpg", cls: "top-[5%] left-[15.3vw] w-[15vw]", rot: 8, speed: 1.35 },
  { src: "/images/careers/member-05.jpg", cls: "top-[60%] left-[20vw] w-[15vw]", rot: -15, speed: 1.1 },
  { src: "/images/careers/member-03.jpg", cls: "top-[8%] left-[71.4vw] w-[14.5vw]", rot: 6, speed: 1.3 },
  { src: "/images/careers/member-04.jpg", cls: "top-[17%] left-[82vw] w-[19vw]", rot: -6, speed: 0.85 },
  { src: "/images/careers/member-06.jpg", cls: "top-[56%] left-[69vw] w-[15.5vw]", rot: 15, speed: 1.2 },
];

export function Careers() {
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.utils.toArray<HTMLElement>("[data-member]").forEach((el) => {
        const speed = Number(el.dataset.speed);
        gsap.fromTo(
          el,
          { y: () => window.innerHeight * 0.18 * speed },
          {
            y: () => -window.innerHeight * 0.22 * speed,
            ease: "none",
            scrollTrigger: { trigger: sectionRef.current, start: "top bottom", end: "bottom top", scrub: true },
          },
        );
      });
    }, sectionRef);
    return () => ctx.revert();
  }, []);

  return (
    <section ref={sectionRef} className="relative z-[2] bg-footer text-white" aria-labelledby="careers-heading">
      <div aria-hidden="true" className="absolute inset-x-[-25vw] -top-[4vw] h-[10vw] rounded-[50%] bg-footer" />
      <div aria-hidden="true" className="pointer-events-none absolute inset-0 overflow-hidden">
        <Image
          src="/images/decor/circle.png"
          alt=""
          width={2048}
          height={2048}
          className="absolute top-1/2 left-1/2 w-[150vw] max-w-none -translate-x-1/2 -translate-y-1/2 opacity-60 lg:w-[100vw]"
        />
      </div>

      <div aria-hidden="true" className="pointer-events-none absolute inset-0 hidden overflow-hidden md:block">
        {MEMBERS.map((m) => (
          <div key={m.src} data-member data-speed={m.speed} className={`absolute ${m.cls}`}>
            <div
              className="relative aspect-[496/580] overflow-hidden rounded-[1.6vw] bg-[#c9ccd2] shadow-[0_20px_50px_rgba(0,0,0,0.25)]"
              style={{ transform: `rotate(${m.rot}deg)` }}
            >
              <Image src={m.src} alt="" fill sizes="20vw" className="scale-105 object-cover object-top" />
            </div>
          </div>
        ))}
      </div>

      <div className="relative flex min-h-[110svh] flex-col items-center justify-center px-6 py-32 text-center">
        <Reveal
          as="h2"
          className="font-en text-[44px] leading-none font-semibold text-white/80 lg:text-[clamp(36px,2.6vw,52px)]"
        >
          <span id="careers-heading">Careers</span>
        </Reveal>
        <Reveal
          as="p"
          delay={0.1}
          className="mt-14 text-[7vw] leading-[1.55] font-bold tracking-[0.04em] lg:mt-[4.5vw] lg:text-[clamp(30px,2.95vw,58px)]"
        >
          {CAREERS.heading.map((l) => (
            <span key={l} className="block">
              {l}
            </span>
          ))}
        </Reveal>
        <Reveal
          as="p"
          delay={0.2}
          className="mt-12 text-[3.6vw] leading-[2.1] font-bold tracking-[0.04em] lg:mt-[5vw] lg:text-[clamp(14px,1vw,19px)]"
        >
          {CAREERS.body.map((l) => (
            <span key={l} className="block">
              {l}
            </span>
          ))}
        </Reveal>
        <Reveal delay={0.3} className="mt-14">
          <a
            href={CAREERS.href}
            target="_blank"
            rel="noreferrer"
            className="group inline-flex h-[60px] items-center gap-14 rounded-full border border-white/70 px-8 font-en text-lg font-semibold transition-colors ease-standard-out hover:bg-white hover:text-footer"
          >
            Career info
            <ArrowPill external />
          </a>
        </Reveal>
      </div>
    </section>
  );
}
