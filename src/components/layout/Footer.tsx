"use client";

import Image from "next/image";
import { InstagramIcon, Logo, NoteIcon, PawIcon, XIcon, YouTubeIcon } from "@/components/icons";
import { Arrow } from "@/components/ui/ArrowPill";
import { MotionToggle } from "@/components/ui/MotionToggle";
import { useMotion } from "@/components/providers/Providers";
import { FOOTER_COLUMNS, FOOTER_LEGAL, FOOTER_OTHERS, LINKS, SOCIALS } from "@/data/home";

const SOCIAL_ICON = {
  X: <XIcon className="h-[1.375rem] w-[1.375rem]" />,
  note: <NoteIcon className="h-[1.875rem] w-[1.875rem]" />,
  YouTube: <YouTubeIcon className="h-6 w-[2.1875rem]" />,
  Instagram: <InstagramIcon className="h-[1.875rem] w-[1.875rem]" />,
} as const;

function ExtIcon() {
  return <Arrow className="ml-1 inline-block -rotate-45 text-[0.8em]" />;
}

function FooterLink({
  href,
  label,
  external,
  strong,
}: {
  href: string;
  label: string;
  external?: boolean;
  strong?: boolean;
}) {
  return (
    <a
      href={href}
      target={external ? "_blank" : undefined}
      rel={external ? "noreferrer" : undefined}
      className={`inline-flex items-center transition-opacity hover:opacity-60 ${
        strong ? "font-en text-sm font-semibold text-white" : "text-[13px] text-white/60"
      }`}
    >
      {label}
      {external && <ExtIcon />}
    </a>
  );
}

// Paw prints that trot across the empty lower part of the footer.
const PAWS = Array.from({ length: 9 }, (_, i) => ({
  left: 12 + i * 8.5,
  top: i % 2 === 0 ? 0 : 34,
  rot: 82 + (i % 2 === 0 ? -8 : 8),
  delay: i * 0.38,
}));

export function Footer() {
  const { getLenis } = useMotion();
  const toTop = (e: React.MouseEvent) => {
    e.preventDefault();
    const lenis = getLenis();
    if (lenis) lenis.scrollTo(0, { duration: 1.6 });
    else window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <footer
      className="relative bg-footer text-white"
      style={{ "--icon-cut": "var(--gp-color-footer)" } as React.CSSProperties}
    >
      <div className="mx-auto w-[min(1260px,calc(100%-48px))] pt-20 lg:pt-[120px]">
        <div className="flex items-center justify-between gap-6">
          <div className="flex items-center gap-5">
            <a href="#top" onClick={toTop} aria-label="Goodpatch" className="transition-opacity hover:opacity-70">
              <Logo className="h-auto w-[140px] lg:w-[153px]" />
            </a>
            <div className="flex gap-2 font-en text-xs font-semibold">
              <span>JA</span>
              <a href="https://goodpatch.com/en" className="text-white/50 hover:text-white">
                EN
              </a>
            </div>
          </div>
          <a href="#top" onClick={toTop} className="group inline-flex items-center gap-2 font-en text-sm font-semibold">
            Page Top <Arrow className="-rotate-90 transition-transform group-hover:-translate-y-0.5" />
          </a>
        </div>

        <div className="mt-10 h-px bg-white/15" />

        <div className="mt-12 grid gap-12 lg:grid-cols-[1fr_auto]">
          <div className="flex flex-col justify-between gap-12">
            <ul className="flex items-center gap-6">
              {SOCIALS.map((s) => (
                <li key={s.label}>
                  <a
                    href={s.href}
                    target="_blank"
                    rel="noreferrer"
                    aria-label={s.label}
                    className="block transition-opacity hover:opacity-60"
                  >
                    {SOCIAL_ICON[s.label]}
                  </a>
                </li>
              ))}
            </ul>
            <div className="order-last lg:order-none">
              <ul className="grid gap-2">
                {FOOTER_LEGAL.map((l) => (
                  <li key={l.label}>
                    <a href={l.href} className="font-en text-xs text-white/60 hover:text-white">
                      {l.label}
                    </a>
                  </li>
                ))}
              </ul>
              <p className="mt-8 font-en text-xs font-semibold">©2026 Goodpatch Inc. All rights reserved.</p>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-x-14 gap-y-12 sm:grid-cols-3 lg:gap-x-[88px]">
            {FOOTER_COLUMNS.map((col) => (
              <div key={col.heading.label}>
                <FooterLink {...col.heading} strong />
                <ul className="mt-5 grid gap-3">
                  {col.links.map((l) => (
                    <li key={l.label}>
                      <FooterLink {...l} />
                    </li>
                  ))}
                </ul>
                {"extra" in col && col.extra && (
                  <div className="mt-8">
                    <FooterLink {...col.extra} strong />
                  </div>
                )}
              </div>
            ))}
            <div className="sm:col-start-2">
              <p className="font-en text-sm font-semibold">Others</p>
              <ul className="mt-5 grid gap-3">
                {FOOTER_OTHERS.map((l) => (
                  <li key={l.label}>
                    <FooterLink {...l} />
                  </li>
                ))}
              </ul>
            </div>
            <div className="flex flex-col items-start gap-3">
              {[
                { label: "Contact", href: LINKS.contact, icon: "/images/contact/contact-cta-icon.png" },
                { label: "Downloads", href: LINKS.downloads, icon: "/images/contact/downloads-cta-icon.png" },
              ].map((b) => (
                <a
                  key={b.label}
                  href={b.href}
                  className="inline-flex h-10 items-center gap-2 rounded-full bg-primary pr-5 pl-3 font-en text-sm font-semibold transition-colors hover:bg-primary-bright"
                >
                  <Image src={b.icon} alt="" width={64} height={64} className="size-6" />
                  {b.label}
                </a>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Playground: Patchy's paw prints wander across */}
      <div className="relative mt-16 h-[48vh] min-h-[280px] overflow-hidden lg:mt-24">
        <div aria-hidden="true" className="absolute top-[36%] left-0 h-20 w-full">
          {PAWS.map((p, i) => (
            <PawIcon
              key={i}
              className="absolute w-[18px] text-white/70 opacity-0 animate-[paw-step_3.6s_linear_infinite]"
              style={{
                left: `${p.left}%`,
                top: `${p.top}px`,
                rotate: `${p.rot}deg`,
                animationDelay: `${p.delay}s`,
              }}
            />
          ))}
        </div>
        <div className="absolute bottom-8 left-6 lg:left-[max(24px,calc((100%-1260px)/2))]">
          <MotionToggle />
        </div>
      </div>
    </footer>
  );
}
