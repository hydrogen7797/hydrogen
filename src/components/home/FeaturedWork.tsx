"use client";

import { useEffect, useRef, useState, type PointerEvent as ReactPointerEvent } from "react";
import Image from "next/image";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { RevealLetters, Reveal } from "@/components/ui/Reveal";
import { TextLink } from "@/components/ui/ArrowPill";
import { WORK_FILTERS, WORKS } from "@/data/home";

export function FeaturedWork() {
  const sectionRef = useRef<HTMLElement>(null);
  const charaRef = useRef<HTMLDivElement>(null);
  const [filter, setFilter] = useState("all");
  const items = filter === "all" ? WORKS : WORKS.filter((w) => w.category === filter);

  // Patchy drifts down through the section on his balloon and lands on
  // the curved top edge of the next (Client Interview) section.
  useEffect(() => {
    const section = sectionRef.current!;
    const chara = charaRef.current!;
    const ctx = gsap.context(() => {
      gsap.set(chara, { autoAlpha: 1 });
      gsap.fromTo(
        chara,
        { y: () => window.innerHeight * 0.1 },
        {
          y: () => section.offsetHeight - chara.offsetHeight * 0.64,
          ease: "none",
          scrollTrigger: {
            trigger: section,
            start: "top 20%",
            end: "bottom 75%",
            scrub: 1.2,
            invalidateOnRefresh: true,
            onUpdate: (self) => {
              const sway = Math.sin(self.progress * Math.PI * 5) * 3;
              gsap.set(chara, { x: `${sway}vw`, rotate: sway * 1.4 });
            },
          },
        },
      );
    }, section);
    return () => ctx.revert();
  }, []);

  useEffect(() => {
    ScrollTrigger.refresh();
  }, [filter]);

  return (
    <section
      ref={sectionRef}
      id="work"
      className="relative z-[2] bg-surface-muted px-[4.27vw] pt-24 pb-[14vw] lg:px-[2.22vw] lg:pt-[8vw]"
    >
      <div
        ref={charaRef}
        aria-hidden="true"
        className="pointer-events-none invisible absolute top-0 left-1/2 z-[3] aspect-[151/212] w-[18vw] -translate-x-1/2 lg:w-[10.49vw]"
      >
        <Image
          src="/images/patchy/chara-balloon-animated.webp"
          alt=""
          width={640}
          height={640}
          unoptimized
          className="absolute top-[-9.89%] left-[-32.19%] h-[124.44%] w-[175%] max-w-none"
        />
      </div>

      <h2 className="relative z-[1] font-display text-[12.5vw] leading-[0.95] whitespace-nowrap">
        <span className="block text-primary">
          <RevealLetters text="Featured" />
        </span>
        <span className="block">
          <RevealLetters text="Work" delay={0.25} />
        </span>
      </h2>

      <div className="mt-[6vw] grid gap-10 lg:grid-cols-[minmax(0,1fr)_59.3vw] lg:gap-0">
        {/* Filters */}
        <div className="lg:sticky lg:top-28 lg:self-start">
          <ul className="-mx-[4.27vw] flex gap-2 overflow-x-auto px-[4.27vw] pb-2 lg:mx-0 lg:grid lg:gap-[1.1vw] lg:overflow-visible lg:px-0">
            {WORK_FILTERS.map((f) => {
              const active = filter === f.value;
              return (
                <li key={f.value} className="shrink-0">
                  <button
                    type="button"
                    onClick={() => setFilter(f.value)}
                    aria-pressed={active}
                    className={`group relative flex items-center rounded-full border px-4 py-2 text-sm font-medium whitespace-nowrap transition-colors ease-standard-out lg:rounded-none lg:border-0 lg:px-0 lg:py-0 lg:pl-[1.4vw] lg:text-[clamp(15px,1.1vw,21px)] ${
                      active
                        ? "border-primary bg-primary text-white lg:bg-transparent lg:text-primary"
                        : "border-text/15 text-text/80 hover:text-primary"
                    } ${f.value === "all" ? "font-en font-semibold" : ""}`}
                  >
                    <span
                      className={`absolute top-1/2 left-0 hidden size-[5px] -translate-y-1/2 rounded-full bg-primary transition-transform ease-standard-out lg:block ${
                        active ? "scale-100" : "scale-0 group-hover:scale-100"
                      }`}
                    />
                    {f.label}
                  </button>
                </li>
              );
            })}
          </ul>
        </div>

        {/* Cards */}
        <div>
          <ul key={filter} className="grid gap-x-[5.2vw] gap-y-16 sm:grid-cols-2 lg:gap-y-[5.5vw]">
            {items.map((w, i) => (
              <Reveal as="li" key={w.href} delay={(i % 2) * 0.12}>
                <WorkCard work={w} />
              </Reveal>
            ))}
          </ul>
          {items.length === 0 && (
            <p className="rounded-lg bg-white px-8 py-16 text-center text-sm text-text/70">
              このカテゴリの注目事例はWorkページでご覧いただけます。
            </p>
          )}
          <div className="mt-16 flex justify-end lg:mt-[5vw]">
            <TextLink href="https://goodpatch.com/ja/work" className="text-lg">
              All Work
            </TextLink>
          </div>
        </div>
      </div>
    </section>
  );
}

function WorkCard({ work }: { work: (typeof WORKS)[number] }) {
  const mediaRef = useRef<HTMLSpanElement>(null);

  const onMove = (e: ReactPointerEvent) => {
    const el = mediaRef.current!;
    const rect = el.getBoundingClientRect();
    el.style.setProperty("--mx", `${e.clientX - rect.left}px`);
    el.style.setProperty("--my", `${e.clientY - rect.top}px`);
  };

  return (
    <a href={work.href} className="group block" onPointerMove={onMove}>
      <span
        ref={mediaRef}
        className="relative block aspect-[1496/1880] overflow-hidden rounded-lg bg-white [--mx:50%] [--my:50%] [--r:0px] group-hover:[--r:38%]"
      >
        <Image
          src={work.front}
          alt=""
          fill
          sizes="(min-width: 1024px) 27vw, (min-width: 640px) 45vw, 92vw"
          className="object-cover transition-transform duration-700 ease-[var(--ease-power3-out)] group-hover:scale-[1.03]"
        />
        {/* The "back" of the card shows through a lens that follows the cursor */}
        <span
          className="absolute inset-0 transition-[clip-path] duration-500 ease-[var(--ease-power3-out)]"
          style={{ clipPath: "circle(var(--r) at var(--mx) var(--my))" }}
        >
          <Image src={work.back} alt="" fill sizes="27vw" className="object-cover" />
          <span className="absolute inset-0 bg-primary/10" />
        </span>
      </span>
      <span className="mt-4 inline-flex rounded-full border border-primary/40 px-2.5 py-1 font-en text-xs leading-none font-semibold text-primary">
        {work.category}
      </span>
      <span className="mt-3 block text-xl leading-[1.5] font-bold transition-colors ease-standard-out group-hover:text-primary lg:text-[clamp(18px,1.26vw,26px)]">
        {work.client}
      </span>
      <span className="mt-2 block text-sm leading-[1.75] text-text/75 lg:text-[clamp(13px,0.74vw,15px)]">
        {work.description}
      </span>
    </a>
  );
}
