"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { HeroScene } from "./HeroScene";
import { MotionToggle } from "@/components/ui/MotionToggle";
import { ArrowPill } from "@/components/ui/ArrowPill";
import { HERO_HEART_DOT_PATH } from "@/components/icons";
import { BUSINESS, HERO_NEWS, INTRO, type BusinessKey } from "@/data/home";

const clamp01 = (v: number) => Math.min(1, Math.max(0, v));
const range = (v: number, a: number, b: number) => clamp01((v - a) / (b - a));
const lerp = (a: number, b: number, t: number) => a + (b - a) * t;
const easeInOut = (t: number) => (t < 0.5 ? 2 * t * t : 1 - Math.pow(-2 * t + 2, 2) / 2);
const easeOut = (t: number) => 1 - Math.pow(1 - t, 3);

/** Hover scale of the lens while a business column is active. */
const HOVER_SCALE = 1.55;

export function HeroStage() {
  const stageRef = useRef<HTMLElement>(null);
  const stickyRef = useRef<HTMLDivElement>(null);
  const clipRef = useRef<HTMLDivElement>(null);
  const sceneRef = useRef<HTMLDivElement>(null);
  const ringRef = useRef<HTMLDivElement>(null);
  const mediaRef = useRef<HTMLDivElement>(null);
  const overlayRef = useRef<HTMLDivElement>(null);
  const titleRef = useRef<HTMLDivElement>(null);
  const jaRef = useRef<HTMLDivElement>(null);
  const toggleRef = useRef<HTMLDivElement>(null);
  const newsRef = useRef<HTMLAnchorElement>(null);
  const introRef = useRef<HTMLDivElement>(null);
  const bizRef = useRef<HTMLDivElement>(null);
  const mutedBgRef = useRef<HTMLDivElement>(null);
  const dividerRef = useRef<HTMLDivElement>(null);

  const [active, setActive] = useState<BusinessKey | null>(null);
  const activeRef = useRef<BusinessKey | null>(null);
  const [heartLit, setHeartLit] = useState(false);

  // The little "i" dot turns into a glowing pink heart shortly after load.
  useEffect(() => {
    const t = setTimeout(() => setHeartLit(true), 1600);
    return () => clearTimeout(t);
  }, []);

  useEffect(() => {
    const stage = stageRef.current!;
    const sticky = stickyRef.current!;
    const mm = gsap.matchMedia();

    mm.add({ desktop: "(min-width: 1024px)", mobile: "(max-width: 1023px)" }, (ctx) => {
      const desktop = Boolean(ctx.conditions?.desktop);
      let scroll = 0;
      const st = ScrollTrigger.create({
        trigger: stage,
        start: "top top",
        end: "bottom bottom",
        onUpdate: (self) => (scroll = self.scroll() - self.start),
      });

      const lens = { x: window.innerWidth / 2, y: window.innerHeight / 2, s: 1 };
      const pointer = { x: lens.x, y: lens.y };
      let interactive = false;

      const setActiveKey = (k: BusinessKey | null) => {
        if (activeRef.current === k) return;
        activeRef.current = k;
        setActive(k);
      };

      const onMove = (e: PointerEvent) => {
        pointer.x = e.clientX;
        pointer.y = e.clientY;
        if (!desktop || !interactive) return;
        const vh = window.innerHeight;
        const inBand = e.clientY > vh * 0.12 && e.clientY < vh * 0.96;
        setActiveKey(inBand ? (e.clientX < window.innerWidth / 2 ? "partner" : "ai") : null);
      };
      const onLeave = () => setActiveKey(null);
      sticky.addEventListener("pointermove", onMove);
      sticky.addEventListener("pointerleave", onLeave);

      const update = () => {
        const vw = window.innerWidth;
        const vh = window.innerHeight;
        const s = scroll / vh; // stage scroll measured in viewport heights

        const cover = Math.hypot(vw, vh) / 2 + 24;
        const ball = desktop ? Math.max(140, vw * 0.0975) : vw * 0.32;
        const shrink = easeInOut(range(s, 0, desktop ? 0.75 : 0.7));
        const baseR = lerp(cover, ball, shrink);

        // Lens follows the pointer while a business column is hovered.
        interactive = desktop && s > 1.85;
        if (!interactive && activeRef.current) setActiveKey(null);
        const hovering = interactive && activeRef.current !== null;
        const tx = hovering ? pointer.x : vw / 2;
        const ty = hovering ? pointer.y : vh / 2;
        lens.x += (tx - lens.x) * 0.12;
        lens.y += (ty - lens.y) * 0.12;
        lens.s += ((hovering ? HOVER_SCALE : 1) - lens.s) * 0.1;
        const r = baseR * lens.s;

        clipRef.current!.style.clipPath = `circle(${r.toFixed(1)}px at ${lens.x.toFixed(1)}px ${lens.y.toFixed(1)}px)`;
        // Zoom the scene out as the lens closes so the ball holds a miniature of it.
        const scene = sceneRef.current!;
        scene.style.transformOrigin = `${lens.x}px ${lens.y}px`;
        scene.style.transform = `scale(${lerp(1, desktop ? 0.44 : 0.5, shrink)})`;

        const ring = ringRef.current!;
        ring.style.width = ring.style.height = `${ball * 2}px`;
        ring.style.transform = `translate3d(${lens.x - ball}px, ${lens.y - ball}px, 0) scale(${r / ball})`;
        ring.style.opacity = String(range(cover * 0.62 - r, 0, cover * 0.2));

        const maxR = ball * HOVER_SCALE;
        const media = mediaRef.current;
        if (media) {
          media.style.width = media.style.height = `${maxR * 2}px`;
          media.style.transform = `translate3d(${lens.x - maxR}px, ${lens.y - maxR}px, 0)`;
        }
        const overlay = overlayRef.current;
        if (overlay) overlay.style.transform = `translate3d(${lens.x}px, ${lens.y}px, 0)`;

        // Hero copy exits as soon as scrolling starts.
        const titleExit = range(s, 0, 0.3);
        titleRef.current!.style.opacity = String(1 - titleExit);
        titleRef.current!.style.transform = `translate3d(0, ${-titleExit * 10}vh, 0)`;
        const jaExit = range(s, 0, 0.22);
        jaRef.current!.style.opacity = String(1 - jaExit);
        jaRef.current!.style.transform = `translate3d(0, ${-jaExit * 8}vh, 0)`;
        toggleRef.current!.style.opacity = String(1 - titleExit);
        toggleRef.current!.style.pointerEvents = titleExit > 0.5 ? "none" : "auto";
        if (newsRef.current) {
          const newsOut = range(s, desktop ? 1.4 : 0.6, desktop ? 1.6 : 0.8);
          newsRef.current.style.opacity = String(1 - newsOut);
          newsRef.current.style.pointerEvents = newsOut > 0.5 ? "none" : "auto";
        }

        if (!desktop) return;

        // Intro message: rises in around the ball, then lifts away.
        const intro = introRef.current!;
        const enter = easeOut(range(s, 0.45, 0.85));
        const exit = range(s, 1.3, 1.62);
        intro.querySelectorAll<HTMLElement>("[data-line]").forEach((el, i) => {
          const e = easeOut(range(s, 0.45 + i * 0.07, 0.85 + i * 0.07));
          el.style.opacity = String(e * (1 - exit));
          el.style.transform = `translate3d(0, ${(1 - e) * 5 - exit * 18}vh, 0)`;
        });
        intro.style.visibility = enter > 0 && exit < 1 ? "visible" : "hidden";

        // Business columns
        const biz = easeOut(range(s, 1.5, 1.9));
        bizRef.current!.style.opacity = String(biz);
        bizRef.current!.style.transform = `translate3d(0, ${(1 - biz) * 8}vh, 0)`;
        bizRef.current!.style.visibility = biz > 0 ? "visible" : "hidden";
        mutedBgRef.current!.style.opacity = String(range(s, 1.4, 1.8));
        dividerRef.current!.style.transform = `scaleY(${biz})`;
      };

      gsap.ticker.add(update);
      return () => {
        gsap.ticker.remove(update);
        st.kill();
        sticky.removeEventListener("pointermove", onMove);
        sticky.removeEventListener("pointerleave", onLeave);
      };
    });

    return () => mm.revert();
  }, []);

  return (
    <section ref={stageRef} className="relative h-[220svh] bg-surface lg:h-[380svh]" aria-label="Goodpatch">
      <div
        ref={stickyRef}
        data-active={active ?? undefined}
        className="group/stage sticky top-0 h-[100svh] w-full overflow-hidden"
      >
        {/* Background layers: white → muted (business) → primary (hovered) */}
        <div ref={mutedBgRef} className="absolute inset-0 bg-surface-muted opacity-0" />
        <div className="absolute inset-0 bg-primary opacity-0 transition-opacity ease-emphasized-out group-data-[active]/stage:opacity-100" />

        {/* Intro message (desktop) */}
        <div
          ref={introRef}
          className="invisible absolute inset-0 z-[3] hidden items-center justify-between px-[6.39vw] lg:flex"
        >
          <h2 className="w-[30.28vw] shrink-0 text-[3.33vw] leading-[1.4] font-bold tracking-[0.02em]">
            {INTRO.heading.map((line, i) => (
              <span key={i} data-line className="block opacity-0">
                {line.map((part, j) => (
                  <span key={j} className={part.accent ? "text-primary" : undefined}>
                    {part.text}
                  </span>
                ))}
              </span>
            ))}
          </h2>
          <p
            data-line
            className="w-[27.15vw] shrink-0 text-[1.25vw] leading-[2] font-medium tracking-[0.04em] opacity-0"
          >
            {INTRO.body.map((l) => (
              <span key={l} className="block whitespace-nowrap">
                {l}
              </span>
            ))}
          </p>
        </div>

        {/* The lens: a circular window onto the 3D scene */}
        <div ref={clipRef} className="absolute inset-0 z-[1]" style={{ clipPath: "circle(150% at 50% 50%)" }}>
          <div
            ref={sceneRef}
            className="absolute inset-0 transition-opacity ease-emphasized-out group-data-[active]/stage:opacity-0"
          >
            <HeroScene className="absolute inset-0" />
          </div>
          <div ref={mediaRef} className="absolute top-0 left-0 hidden lg:block">
            {BUSINESS.map((b) => (
              <Image
                key={b.key}
                src={b.image}
                alt=""
                fill
                sizes="40vw"
                className={`object-cover transition-opacity ease-emphasized-out ${
                  active === b.key ? "opacity-90" : "opacity-0"
                }`}
              />
            ))}
          </div>
        </div>

        {/* Business columns (desktop) */}
        <div ref={bizRef} className="invisible absolute inset-0 z-[2] hidden lg:block">
          <div
            ref={dividerRef}
            className="absolute top-[16.5vh] bottom-0 left-1/2 w-px origin-top scale-y-0 bg-text/20 transition-colors ease-standard-out group-data-[active]/stage:bg-white/30"
          />
          <div className="grid h-full grid-cols-2">
            {BUSINESS.map((b, i) => (
              <BusinessColumn key={b.key} item={b} align={i === 0 ? "left" : "right"} active={active} />
            ))}
          </div>
        </div>

        {/* Glass rings around the lens */}
        <div
          ref={ringRef}
          className="pointer-events-none absolute top-0 left-0 z-[4] rounded-full opacity-0 will-change-transform"
          style={{
            boxShadow: [
              "0 0 0 1px rgba(46, 72, 128, 0.28)",
              "inset 0 0 0 1.5px rgba(255,255,255,0.9)",
              "inset 0 0 0 9px rgba(255,255,255,0.32)",
              "inset 0 0 0 10.5px rgba(26, 72, 160, 0.45)",
              "inset 0 0 0 18px rgba(255,255,255,0.12)",
              "inset 0 0 46px 8px rgba(255,255,255,0.38)",
            ].join(","),
          }}
        />

        {/* Icon + tooltip riding on the lens while a column is hovered */}
        <div ref={overlayRef} className="pointer-events-none absolute top-0 left-0 z-[5] hidden lg:block">
          {BUSINESS.map((b) => (
            <div
              key={b.key}
              className={`absolute top-0 left-0 transition-[opacity,scale] ease-emphasized-out ${
                active === b.key ? "scale-100 opacity-100" : "scale-50 opacity-0"
              }`}
            >
              <div className="relative -translate-x-1/2 -translate-y-1/2">
                <Image
                  src={b.icon}
                  alt=""
                  width={348}
                  height={364}
                  className="h-auto w-[10vw] max-w-none animate-[float-y_3.2s_ease-in-out_infinite] drop-shadow-[0_18px_30px_rgba(0,40,120,0.25)]"
                />
                <span className="absolute -top-[2.6vw] left-[85%] rounded-md bg-white px-4 py-2.5 font-en text-[15px] font-semibold whitespace-nowrap text-primary shadow-sm after:absolute after:top-full after:left-1/2 after:-translate-x-1/2 after:border-x-[6px] after:border-t-[7px] after:border-x-transparent after:border-t-white">
                  {b.chip}
                </span>
              </div>
            </div>
          ))}
        </div>

        {/* Hero copy */}
        <div ref={titleRef} className="pointer-events-none absolute inset-0 z-[6] text-white">
          <h1 className="absolute top-1/2 left-1/2 w-[85.87vw] -translate-x-1/2 -translate-y-1/2 animate-[hero-in_1.4s_var(--ease-power3-out)_both] lg:w-[95.56vw]">
            <span className="sr-only">Design to envision</span>
            <span className="relative block">
              <Image
                src="/images/hero/hero-title.svg"
                alt=""
                width={1376}
                height={170}
                preload
                className="hidden h-auto w-full lg:block"
              />
              <Image
                src="/images/hero/hero-title-sp.svg"
                alt=""
                width={322}
                height={146}
                className="block h-auto w-full lg:hidden"
              />
              <span className="absolute top-[8.8751%] left-[84.7178%] hidden w-[2.4028%] -translate-x-1/2 -translate-y-1/2 lg:block">
                <svg
                  viewBox="1149.1867 0 33.0635 30.1754"
                  className={`block h-auto w-full transition-opacity duration-700 ${heartLit ? "opacity-0" : "opacity-100"}`}
                  aria-hidden="true"
                >
                  <path d={HERO_HEART_DOT_PATH} fill="white" />
                </svg>
                <Image
                  src="/images/hero/hero-title-heart.png"
                  alt=""
                  width={100}
                  height={91}
                  className={`absolute inset-0 h-auto w-full transition-[opacity,filter] duration-700 ${
                    heartLit ? "opacity-100 drop-shadow-[0_0_8px_var(--gp-color-accent-pink)]" : "opacity-0"
                  }`}
                />
              </span>
            </span>
          </h1>
        </div>

        <div
          ref={jaRef}
          className="pointer-events-none absolute inset-x-0 top-[calc(50%+32vw)] z-[6] text-center text-[4.8vw] leading-[1.8] font-bold tracking-[0.02em] text-white lg:top-auto lg:bottom-[10.74vh] lg:left-[2.22vw] lg:text-left lg:text-[2.22vw] lg:leading-[1.5]"
        >
          <span className="block animate-[rise-in_1s_0.5s_var(--ease-power3-out)_both]">埋もれた価値を</span>
          <span className="block animate-[rise-in_1s_0.65s_var(--ease-power3-out)_both]">
            心揺さぶる未来に変えるデザイン
          </span>
        </div>

        <div ref={toggleRef} className="absolute top-[104px] right-5 z-[7] lg:top-[124px] lg:right-10">
          <MotionToggle />
        </div>

        {/* News ticker with Patchy */}
        <a
          ref={newsRef}
          href={HERO_NEWS.href}
          className="group absolute right-3 bottom-4 z-[7] flex items-end lg:right-2 lg:bottom-3"
        >
          <span className="mr-[-6px] mb-[34px] block max-w-[70vw] rounded-md bg-white px-5 py-3.5 shadow-[0_6px_24px_rgba(9,40,90,0.12)] transition-transform ease-standard-out group-hover:-translate-y-0.5 lg:max-w-none">
            <span className="block truncate text-[13px] font-bold text-primary lg:text-sm">{HERO_NEWS.title}</span>
            <span className="mt-1.5 block font-en text-[11px] font-medium text-primary">{HERO_NEWS.date}</span>
          </span>
          <span className="relative block w-[72px] lg:w-[108px]">
            <Image
              src="/images/patchy/patchy-news.png"
              alt=""
              width={324}
              height={360}
              className="h-auto w-full group-hover:opacity-0"
            />
            <Image
              src="/images/patchy/patchy-news-hover.png"
              alt=""
              width={324}
              height={360}
              className="absolute inset-0 h-auto w-full opacity-0 group-hover:opacity-100"
            />
          </span>
        </a>
      </div>
    </section>
  );
}

function BusinessColumn({
  item,
  align,
  active,
}: {
  item: (typeof BUSINESS)[number];
  align: "left" | "right";
  active: BusinessKey | null;
}) {
  const isActive = active === item.key;
  const dimmed = active !== null && !isActive;
  const right = align === "right";
  return (
    <a
      href={item.href}
      className={`relative flex flex-col px-[2.22vw] pt-[31vh] transition-opacity ease-standard-out ${
        right ? "items-end text-right" : "items-start text-left"
      } ${dimmed ? "opacity-20" : "opacity-100"} group-data-[active]/stage:text-white`}
    >
      <span className="inline-flex items-center rounded-full bg-primary px-3 py-1.5 font-en text-[15px] leading-none font-semibold text-white transition-colors ease-standard-out group-data-[active]/stage:bg-white group-data-[active]/stage:text-primary">
        {item.label}
      </span>
      <span className="mt-[3.2vh] block font-display text-[min(5.27vw,104px)] leading-[0.92]">
        <span className="block whitespace-nowrap">{item.heading[0]}</span>
        <span className="block whitespace-nowrap text-primary transition-colors ease-standard-out group-data-[active]/stage:text-white">
          {item.heading[1]}
        </span>
      </span>
      <span className="mt-[6vh] block text-[min(1.7vw,32px)] leading-[1.6] font-medium tracking-[0.04em]">
        {item.body.map((l) => (
          <span key={l} className="block whitespace-nowrap">
            {l}
          </span>
        ))}
      </span>
      <span className="mt-[7vh] inline-flex items-center gap-3 font-en text-lg font-semibold">
        View Details
        <ArrowPill tone={isActive ? "white" : "primary"} size="lg" className={isActive ? "" : ""} />
      </span>
    </a>
  );
}
