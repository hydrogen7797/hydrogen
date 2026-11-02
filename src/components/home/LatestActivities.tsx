"use client";

import { useEffect, useRef } from "react";
import Image from "next/image";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

const clamp01 = (v: number) => Math.min(1, Math.max(0, v));
const range = (v: number, a: number, b: number) => clamp01((v - a) / (b - a));
const easeInOut = (t: number) => (t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2);

function Words({ outline = false, dotRef }: { outline?: boolean; dotRef?: React.Ref<HTMLSpanElement> }) {
  const stroke = outline ? { color: "transparent", WebkitTextStroke: "1.5px rgba(255,255,255,0.32)" } : undefined;
  return (
    <span
      className="flex items-center font-display text-[19vw] leading-none whitespace-nowrap lg:text-[13.2vw]"
      style={stroke}
    >
      <span className={outline ? "" : "text-primary"}>Goodpatch</span>
      <span className="inline-block w-[0.3em]" />
      <span>Latest</span>
      <span className="inline-block w-[0.3em]" />
      <span>Activities</span>
      <span ref={dotRef} className="ml-[0.1em] inline-block size-[0.62em] translate-y-[-0.08em]" />
    </span>
  );
}

/**
 * The blue of Design Platforms closes into a circle that slides along with the
 * scrolling headline and finally settles as its full stop.
 */
export function LatestActivities() {
  const sectionRef = useRef<HTMLElement>(null);
  const rowARef = useRef<HTMLDivElement>(null);
  const rowBRef = useRef<HTMLDivElement>(null);
  const clipRef = useRef<HTMLDivElement>(null);
  const dotRef = useRef<HTMLSpanElement>(null);
  const charaRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const section = sectionRef.current!;
    let progress = 0;
    const st = ScrollTrigger.create({
      trigger: section,
      start: "top top",
      end: "bottom bottom",
      onUpdate: (self) => (progress = self.progress),
    });

    const update = () => {
      const vw = window.innerWidth;
      const vh = window.innerHeight;
      const rowA = rowARef.current!;
      const rowW = rowA.scrollWidth;

      // Headline travels right → left; ends with its dot at ~80% of the viewport.
      const t = easeInOut(range(progress, 0, 0.82));
      const x0 = vw * 0.62;
      const x1 = vw * 0.86 - rowW;
      const x = x0 + (x1 - x0) * t;
      const transform = `translate3d(${x}px, 0, 0)`;
      rowA.style.transform = transform;
      rowBRef.current!.style.transform = transform;

      // Circle: covers the viewport, then shrinks onto the dot.
      const dot = dotRef.current!.getBoundingClientRect();
      const dx = dot.left + dot.width / 2;
      const dy = dot.top + dot.height / 2;
      const e = easeInOut(range(progress, 0.04, 0.86));
      const cover = Math.hypot(vw, vh) * 1.05;
      const cx = vw / 2 + (dx - vw / 2) * e;
      const cy = vh / 2 + (dy - vh / 2) * e;
      const r = cover + (dot.width / 2 - cover) * e;
      clipRef.current!.style.clipPath = `circle(${r.toFixed(1)}px at ${cx.toFixed(1)}px ${cy.toFixed(1)}px)`;

      // Patchy hurries along above the words.
      const c = charaRef.current!;
      const cxp = -0.15 * vw + progress * 0.95 * vw;
      c.style.transform = `translate3d(${cxp}px, ${Math.sin(progress * 22) * 10}px, 0)`;
    };
    gsap.ticker.add(update);
    return () => {
      gsap.ticker.remove(update);
      st.kill();
    };
  }, []);

  return (
    <section ref={sectionRef} className="relative z-[1] h-[240svh] bg-surface" aria-label="Goodpatch Latest Activities">
      <div className="sticky top-0 h-[100svh] overflow-hidden">
        <div className="absolute inset-0 flex items-center text-text">
          <div ref={rowARef} className="will-change-transform">
            <Words dotRef={dotRef} />
          </div>
        </div>

        <div
          ref={clipRef}
          className="absolute inset-0 flex items-center bg-primary"
          style={{ clipPath: "circle(150% at 50% 50%)" }}
        >
          <div ref={rowBRef} className="will-change-transform" aria-hidden="true">
            <Words outline />
          </div>
        </div>

        <div
          ref={charaRef}
          aria-hidden="true"
          className="pointer-events-none absolute top-[calc(50%-17vw)] left-0 w-[22vw] will-change-transform lg:top-[calc(50%-15vw)] lg:w-[11vw]"
        >
          <Image
            src="/images/patchy/chara-balloon-animated.webp"
            alt=""
            width={640}
            height={640}
            unoptimized
            className="h-auto w-full -scale-x-100"
          />
        </div>
      </div>
    </section>
  );
}
