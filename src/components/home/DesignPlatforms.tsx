"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import { gsap } from "gsap";
import { RevealLetters, Reveal } from "@/components/ui/Reveal";
import { ArrowPill } from "@/components/ui/ArrowPill";
import { PLATFORMS, PLATFORMS_INTRO } from "@/data/home";

export function DesignPlatforms() {
  const listRef = useRef<HTMLDivElement>(null);
  const highlightRef = useRef<HTMLDivElement>(null);
  const mediaRef = useRef<HTMLDivElement>(null);
  const [active, setActive] = useState<number | null>(null);
  const target = useRef({ x: 0, y: 0 });

  // Media circle eases toward the pointer.
  useEffect(() => {
    const media = mediaRef.current!;
    const pos = { x: 0, y: 0 };
    let first = true;
    const tick = () => {
      if (first && target.current.y) {
        pos.x = target.current.x;
        pos.y = target.current.y;
        first = false;
      }
      pos.x += (target.current.x - pos.x) * 0.1;
      pos.y += (target.current.y - pos.y) * 0.1;
      media.style.transform = `translate3d(${pos.x}px, ${pos.y}px, 0)`;
    };
    gsap.ticker.add(tick);
    return () => gsap.ticker.remove(tick);
  }, []);

  const onMove = (e: React.PointerEvent) => {
    const rect = listRef.current!.getBoundingClientRect();
    const x = e.clientX - rect.left;
    target.current = {
      // stay on the side opposite the long names, nudged by the pointer
      x: Math.min(rect.width * 0.78, Math.max(rect.width * 0.62, x + rect.width * 0.22)),
      y: Math.min(rect.height - 40, Math.max(40, e.clientY - rect.top)),
    };
  };

  const moveHighlight = (i: number, el: HTMLElement) => {
    setActive(i);
    const h = highlightRef.current!;
    h.style.transform = `translateY(${el.offsetTop}px)`;
    h.style.height = `${el.offsetHeight}px`;
  };

  return (
    <section className="relative z-[1] overflow-x-clip bg-primary px-[4.27vw] pt-24 pb-24 text-white lg:px-[2.22vw] lg:pt-[9vw] lg:pb-[8vw]">
      <div className="grid gap-10 lg:grid-cols-[1fr_auto] lg:items-end">
        <h2 className="font-display text-[15vw] leading-[0.95] whitespace-nowrap lg:text-[12.5vw]">
          <span className="block">
            <RevealLetters text="Design" />
          </span>
          <span className="block lg:pl-[8vw]">
            <RevealLetters text="Platforms" delay={0.2} />
          </span>
        </h2>
        <Reveal
          as="p"
          delay={0.3}
          className="text-[4.2vw] leading-[1.75] font-bold tracking-[0.04em] lg:mb-[1.2vw] lg:text-[clamp(16px,1.25vw,24px)]"
        >
          {PLATFORMS_INTRO.map((l) => (
            <span key={l} className="block">
              {l}
            </span>
          ))}
        </Reveal>
      </div>

      <div ref={listRef} className="relative mt-[6vw]" onPointerMove={onMove} onPointerLeave={() => setActive(null)}>
        <div
          ref={highlightRef}
          aria-hidden="true"
          className={`pointer-events-none absolute inset-x-0 top-0 bg-white/[0.07] transition-[transform,height,opacity] ease-emphasized-out ${
            active === null ? "opacity-0" : "opacity-100"
          }`}
        />
        <ul>
          {PLATFORMS.map((p, i) => (
            <li key={p.name} className="relative border-t border-white/20 last:border-b">
              <a
                href={p.href}
                target="_blank"
                rel="noreferrer"
                onPointerEnter={(e) => moveHighlight(i, e.currentTarget.parentElement!)}
                onFocus={(e) => moveHighlight(i, e.currentTarget.parentElement!)}
                className="group grid grid-cols-[auto_1fr] items-start gap-x-[3vw] py-8 lg:py-[2.3vw]"
              >
                <Image
                  src={p.icon}
                  alt=""
                  width={24}
                  height={24}
                  className={`mt-[1.4vw] h-auto w-[5vw] brightness-0 invert transition-transform ease-emphasized-out lg:mt-[1.2vw] lg:w-[1.7vw] ${
                    active === i ? "rotate-[25deg] scale-110" : ""
                  }`}
                />
                <span>
                  <span className="block font-display text-[9vw] leading-[1.1] lg:text-[4.3vw]">{p.name}</span>
                  <span className="mt-3 block text-[3.4vw] leading-[1.6] font-bold lg:mt-[1vw] lg:text-[clamp(14px,0.95vw,19px)]">
                    {p.description}
                  </span>
                  <span className="mt-5 inline-flex items-center gap-2 font-en text-sm font-semibold lg:hidden">
                    View Details <ArrowPill tone="white" external size="sm" />
                  </span>
                </span>
              </a>
            </li>
          ))}
        </ul>

        {/* Media lens */}
        <div
          ref={mediaRef}
          aria-hidden="true"
          className="pointer-events-none absolute top-0 left-0 z-[2] hidden lg:block"
        >
          <div
            className={`relative aspect-square w-[30vw] -translate-x-1/2 -translate-y-1/2 overflow-hidden rounded-full transition-[scale,opacity] ease-emphasized-out ${
              active === null ? "scale-50 opacity-0" : "scale-100 opacity-100"
            }`}
            style={{
              maskImage: "radial-gradient(circle, #000 64%, transparent 71%)",
              WebkitMaskImage: "radial-gradient(circle, #000 64%, transparent 71%)",
            }}
          >
            {PLATFORMS.map((p, i) => (
              <Image
                key={p.name}
                src={p.image}
                alt=""
                fill
                sizes="30vw"
                className={`scale-[1.35] object-cover transition-opacity duration-500 ${active === i ? "opacity-100" : "opacity-0"}`}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
