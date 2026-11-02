"use client";

import { useEffect, useRef } from "react";
import Image from "next/image";
import { gsap } from "gsap";
import { Contours } from "./Contours";
import { RevealLetters, Reveal } from "@/components/ui/Reveal";
import { Arrow } from "@/components/ui/ArrowPill";
import { CONTACT, LINKS } from "@/data/home";

const BUBBLES = [
  {
    key: "contact",
    href: LINKS.contact,
    label: "Contact",
    title: "お問い合わせ",
    body: "まずはお気軽にご相談ください。",
    pos: "lg:top-0 lg:left-0 lg:size-[26.5vw]",
    look: "bg-bubble-contact/90",
    float: "0s",
  },
  {
    key: "downloads",
    href: LINKS.downloads,
    label: "Downloads",
    title: "資料請求",
    body: "事例など詳しい資料をご用意しています。",
    pos: "lg:top-[7.5vw] lg:left-[27.5vw] lg:size-[20vw]",
    look: "bg-bubble-downloads/90",
    float: "-1.6s",
  },
  {
    key: "career",
    href: LINKS.careers,
    label: "Career",
    title: "採用情報",
    body: "",
    pos: "lg:top-[24vw] lg:left-[21vw] lg:size-[15vw]",
    look: "bg-surface-muted text-text",
    float: "-3s",
  },
];

export function GetInTouch() {
  const sectionRef = useRef<HTMLElement>(null);
  const balloonRef = useRef<HTMLDivElement>(null);
  const handRef = useRef<HTMLDivElement>(null);

  // The blue arm and the hand reach toward each other as the section scrolls in.
  useEffect(() => {
    const ctx = gsap.context(() => {
      const st = { trigger: sectionRef.current, start: "top bottom", end: "center center", scrub: 1 };
      gsap.fromTo(
        balloonRef.current,
        { xPercent: -28, yPercent: 6 },
        { xPercent: -6, yPercent: 0, ease: "none", scrollTrigger: st },
      );
      gsap.fromTo(handRef.current, { xPercent: 30 }, { xPercent: 6, ease: "none", scrollTrigger: { ...st } });
    });
    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      id="contact"
      className="relative isolate z-[1] overflow-hidden bg-primary text-white"
      aria-labelledby="contact-heading"
    >
      <Contours className="opacity-40" />

      <div
        aria-hidden="true"
        className="pointer-events-none absolute top-[2vw] left-1/2 w-[160vw] -translate-x-1/2 lg:top-[-6vw] lg:w-[104vw]"
      >
        <div ref={balloonRef} className="relative aspect-[2882/2282] will-change-transform">
          <Image src="/images/contact/balloon.png" alt="" fill sizes="104vw" className="object-contain" />
        </div>
        <div ref={handRef} className="absolute inset-0 will-change-transform">
          <Image src="/images/contact/hand.png" alt="" fill sizes="104vw" className="object-contain" />
        </div>
      </div>

      <div className="relative px-[4.27vw] pt-[52vw] pb-20 lg:min-h-[max(760px,79vw)] lg:px-[2.22vw] lg:pt-[13.9vw] lg:pb-0">
        <h2
          id="contact-heading"
          className="font-display text-[16vw] leading-none whitespace-nowrap lg:text-[14.58vw] lg:leading-[0.95]"
        >
          <RevealLetters text="Get In Touch" stagger={0.035} />
        </h2>

        <Reveal
          as="p"
          delay={0.2}
          className="mt-8 text-[3.8vw] leading-[1.9] font-bold lg:absolute lg:right-[2.22vw] lg:bottom-[5vw] lg:mt-0 lg:text-[clamp(14px,1vw,19px)]"
        >
          {CONTACT.body.map((l) => (
            <span key={l} className="block">
              {l}
            </span>
          ))}
        </Reveal>

        <ul className="mt-12 grid gap-4 lg:absolute lg:top-[31vw] lg:left-[24vw] lg:mt-0 lg:block lg:h-[40vw] lg:w-[48vw]">
          {BUBBLES.map((b) => (
            <li key={b.key} className={`lg:absolute ${b.pos}`}>
              <a
                href={b.href}
                className={`group flex h-full w-full flex-col items-center justify-center rounded-3xl px-6 py-10 text-center shadow-[inset_0_0_36px_rgba(255,255,255,0.45)] transition-transform duration-500 ease-[var(--ease-power3-out)] hover:scale-[1.05] lg:animate-[float-y_6s_ease-in-out_infinite] lg:rounded-full lg:p-6 ${b.look}`}
                style={{ animationDelay: b.float }}
              >
                <span className="font-en text-[13px] font-semibold">{b.label}</span>
                <span
                  className={`mt-2 font-bold ${b.key === "career" ? "text-[clamp(20px,1.7vw,32px)]" : "text-[clamp(24px,2.1vw,40px)]"}`}
                >
                  {b.title}
                </span>
                {b.body && <span className="mt-3 text-xs leading-[1.8] font-bold">{b.body}</span>}
                <span
                  className={`mt-5 inline-flex size-7 items-center justify-center rounded-full text-xs ${
                    b.key === "career" ? "bg-primary text-white" : "bg-white text-primary"
                  }`}
                >
                  <Arrow className="transition-transform ease-standard-out group-hover:translate-x-0.5" />
                </span>
              </a>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
