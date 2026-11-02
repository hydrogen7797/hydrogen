import Image from "next/image";
import { ArrowPill } from "@/components/ui/ArrowPill";
import { BUSINESS, INTRO } from "@/data/home";

/** Stacked intro + business for small screens (the desktop stage animates these instead). */
export function MobileIntroBusiness() {
  return (
    <div className="lg:hidden">
      <section className="bg-surface px-6 pt-10 pb-24">
        <h2 className="text-[7.4vw] leading-[1.5] font-bold tracking-[0.02em]">
          {INTRO.heading.map((line, i) => (
            <span key={i} className="block">
              {line.map((part, j) => (
                <span key={j} className={part.accent ? "text-primary" : undefined}>
                  {part.text}
                </span>
              ))}
            </span>
          ))}
        </h2>
        <p className="mt-8 text-[3.9vw] leading-[2] font-medium tracking-[0.04em]">
          {INTRO.body.map((l) => (
            <span key={l} className="block">
              {l}
            </span>
          ))}
        </p>
      </section>

      <section className="grid gap-20 bg-surface-muted px-6 py-20">
        {BUSINESS.map((b) => (
          <a key={b.key} href={b.href} className="group grid justify-items-center text-center">
            <span className="relative block aspect-square w-[64vw] overflow-hidden rounded-full shadow-[inset_0_0_0_6px_rgba(255,255,255,0.5)]">
              <Image src={b.image} alt="" fill sizes="64vw" className="object-cover" />
              <Image
                src={b.icon}
                alt=""
                width={348}
                height={364}
                className="absolute top-1/2 left-1/2 h-auto w-[34%] -translate-x-1/2 -translate-y-1/2"
              />
            </span>
            <span className="mt-8 inline-flex rounded-full bg-primary px-3 py-1.5 font-en text-[11px] leading-none font-semibold text-white">
              {b.label}
            </span>
            <span className="mt-5 block font-display text-[12vw] leading-[0.95]">
              <span className="block">{b.heading[0]}</span>
              <span className="block text-primary">{b.heading[1]}</span>
            </span>
            <span className="mt-6 block text-[15px] leading-[1.8] font-medium">
              {b.body[0]}
              <br />
              {b.body[1]}
            </span>
            <span className="mt-8 inline-flex items-center gap-3 font-en text-base font-semibold">
              View Details <ArrowPill />
            </span>
          </a>
        ))}
      </section>
    </div>
  );
}
