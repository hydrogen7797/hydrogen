import Image from "next/image";
import type { ReactNode } from "react";
import { Reveal } from "@/components/ui/Reveal";
import { TextLink } from "@/components/ui/ArrowPill";
import { BLOGS, FIFTEENTH, NEWS, SEMINARS, UPDATE_LINKS } from "@/data/home";

function Chip({ children, tone = "outline" }: { children: ReactNode; tone?: "outline" | "solid" | "muted" }) {
  const cls =
    tone === "solid"
      ? "bg-primary text-white"
      : tone === "muted"
        ? "bg-text/10 text-text/60"
        : "border border-primary/40 text-primary";
  return (
    <span className={`inline-flex rounded-full px-2 py-[5px] text-[11px] leading-none font-bold ${cls}`}>
      {children}
    </span>
  );
}

function Card({
  href,
  image,
  external,
  children,
}: {
  href: string;
  image: string;
  external?: boolean;
  children: ReactNode;
}) {
  return (
    <a
      href={href}
      target={external ? "_blank" : undefined}
      rel={external ? "noreferrer" : undefined}
      className="group relative block"
    >
      <span className="absolute -inset-3 rounded-xl bg-primary-pale/45 opacity-0 transition-opacity ease-standard-out group-hover:opacity-100" />
      <span className="relative block aspect-[16/9] overflow-hidden rounded-lg border border-text/5 bg-white">
        <Image
          src={image}
          alt=""
          fill
          sizes="(min-width: 1024px) 332px, 90vw"
          className="object-cover transition-transform duration-700 ease-[var(--ease-power3-out)] group-hover:scale-105"
        />
      </span>
      <span className="relative block">{children}</span>
    </a>
  );
}

function Block({
  title,
  href,
  external,
  children,
}: {
  title: string;
  href: string;
  external?: boolean;
  children: ReactNode;
}) {
  return (
    <Reveal as="section" className="border-t border-text/15 pt-12 pb-[88px]">
      <h3 className="font-en text-[32px] leading-none font-semibold">{title}</h3>
      <ul className="mt-8 grid gap-12 sm:grid-cols-2 lg:grid-cols-3 lg:gap-x-[74px]">{children}</ul>
      <div className="mt-10 flex justify-end">
        <TextLink href={href} external={external} className="text-sm">
          View All
        </TextLink>
      </div>
    </Reveal>
  );
}

const Tags = ({ tags }: { tags: string[] }) => (
  <span className="mt-3 flex flex-wrap gap-x-2 gap-y-0.5 text-[11px] font-bold text-text/55">
    {tags.map((t) => (
      <span key={t}>#{t}</span>
    ))}
  </span>
);

const Title = ({ children }: { children: ReactNode }) => (
  <span className="mt-3 line-clamp-3 block text-[15px] leading-[1.6] font-bold transition-colors ease-standard-out group-hover:text-primary">
    {children}
  </span>
);

export function Updates() {
  return (
    <section className="relative z-[1] bg-surface pt-[4vw] pb-32">
      <div className="content-regular">
        <Block title="News" href={UPDATE_LINKS.news}>
          {NEWS.map((n) => (
            <li key={n.href}>
              <Card href={n.href} image={n.image}>
                <span className="mt-4 block">
                  <Chip>{n.category}</Chip>
                </span>
                <Title>{n.title}</Title>
                <span className="mt-3 block font-en text-xs font-medium text-text/55">{n.date}</span>
              </Card>
            </li>
          ))}
        </Block>

        <Block title="Seminar" href={UPDATE_LINKS.seminar} external>
          {SEMINARS.map((s) => (
            <li key={s.href}>
              <Card href={s.href} image={s.image} external>
                <span className="mt-4 flex flex-wrap items-center gap-2">
                  <Chip tone={s.open ? "solid" : "muted"}>{s.open ? "受付中" : "開催終了"}</Chip>
                  <span className="text-[11px] font-bold text-text/60">
                    {s.place}｜ {s.date}
                  </span>
                </span>
                <Title>{s.title}</Title>
                <Tags tags={s.tags} />
              </Card>
            </li>
          ))}
        </Block>

        <Block title="Blog" href={UPDATE_LINKS.blog} external>
          {BLOGS.map((b) => (
            <li key={b.href}>
              <Card href={b.href} image={b.image} external>
                <span className="mt-4 flex items-center justify-between">
                  <Chip>{b.category}</Chip>
                  <span className="font-en text-xs font-medium text-text/55">{b.date}</span>
                </span>
                <Title>{b.title}</Title>
                <Tags tags={b.tags} />
              </Card>
            </li>
          ))}
        </Block>

        <Fifteenth />
      </div>
    </section>
  );
}

const BALLS = [
  { src: "ball-anywhere.webp", cls: "top-[-7%] left-[44%] w-[11%]", d: "0s" },
  { src: "ball-details.webp", cls: "top-[-4%] left-[87%] w-[8%]", d: "-1.2s" },
  { src: "ball-people.webp", cls: "top-[38%] left-[95%] w-[10.5%]", d: "-2.1s" },
  { src: "ball-re.webp", cls: "top-[78%] left-[84%] w-[14%]", d: "-0.6s" },
  { src: "ball-symbol.webp", cls: "top-[84%] left-[23%] w-[11%]", d: "-1.7s" },
  { src: "ball-muture.webp", cls: "top-[66%] left-[38%] w-[8%]", d: "-2.6s" },
];

function Fifteenth() {
  return (
    <Reveal className="mt-10">
      <a
        href={FIFTEENTH.href}
        target="_blank"
        rel="noreferrer"
        className="group relative grid overflow-visible rounded-2xl bg-primary text-white lg:aspect-[2/1] lg:grid-cols-[1fr_1.1fr]"
      >
        <Image src="/images/fifteenth/card-texture.svg" alt="" fill className="rounded-2xl object-cover" />
        <span className="relative z-[1] flex flex-col justify-center px-8 pt-12 pb-8 lg:px-[60px] lg:py-0">
          <span className="text-[28px] leading-[1.4] font-bold">{FIFTEENTH.title}</span>
          <span className="mt-6 block max-w-[380px] text-[13px] leading-[2] font-bold">{FIFTEENTH.body}</span>
          <span className="mt-8 inline-flex items-center gap-3 font-en text-sm font-semibold">
            View Details
            <span className="inline-flex h-6 w-[30px] items-center justify-center rounded-full bg-white text-xs text-primary">
              <svg viewBox="0 0 12 10" fill="none" className="h-[0.833em] w-[1em] -rotate-45">
                <path d="M5.45312 0.5625L9.99812 4.56257L5.45312 8.56263" stroke="currentColor" strokeWidth="1.5" />
                <path d="M9.99899 4.5625H0" stroke="currentColor" strokeWidth="1.5" />
              </svg>
            </span>
          </span>
        </span>
        <span className="relative z-[1] block aspect-square lg:aspect-auto">
          <span className="absolute top-1/2 left-[52%] block w-[78%] -translate-x-1/2 -translate-y-1/2 transition-transform duration-700 ease-[var(--ease-power3-out)] group-hover:scale-[1.04] lg:w-[84%]">
            <Image
              src="/images/fifteenth/ball-fifteenth.webp"
              alt="Goodpatch 15th"
              width={1240}
              height={1240}
              className="h-auto w-full animate-[float-ball_7s_ease-in-out_infinite]"
            />
          </span>
          {BALLS.map((b) => (
            <span key={b.src} className={`absolute block ${b.cls}`}>
              <Image
                src={`/images/fifteenth/${b.src}`}
                alt=""
                width={300}
                height={300}
                className="h-auto w-full animate-[float-ball_5.5s_ease-in-out_infinite] drop-shadow-[0_10px_18px_rgba(0,30,90,0.25)]"
                style={{ animationDelay: b.d }}
              />
            </span>
          ))}
        </span>
      </a>
    </Reveal>
  );
}
