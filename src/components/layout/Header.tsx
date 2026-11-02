"use client";

import { useEffect, useRef, useState } from "react";
import { Logo } from "@/components/icons";
import { LINKS, NAV_PRIMARY, NAV_SECONDARY } from "@/data/home";
import { useMotion } from "@/components/providers/Providers";

function NavLink({ href, label, external }: { href: string; label: string; external?: boolean }) {
  return (
    <li className="h-full shrink-0">
      <a
        href={href}
        target={external ? "_blank" : undefined}
        rel={external ? "noreferrer" : undefined}
        className="relative flex h-full items-center px-2.5 transition-colors ease-standard-out hover:text-[var(--nav-hover)] after:absolute after:inset-x-2.5 after:bottom-[18px] after:h-[1.5px] after:origin-center after:scale-x-0 after:bg-[var(--nav-hover)] after:transition-transform after:ease-standard-out hover:after:scale-x-100"
      >
        {label}
      </a>
    </li>
  );
}

export function Header() {
  const { getLenis } = useMotion();
  const [atTop, setAtTop] = useState(true);
  const [hidden, setHidden] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const lastY = useRef(0);

  useEffect(() => {
    const onScroll = () => {
      const y = window.scrollY;
      setAtTop(y < 40);
      // Hide while scrolling down, reveal on the way back up.
      if (Math.abs(y - lastY.current) > 6) {
        setHidden(y > lastY.current && y > 120);
        lastY.current = y;
      }
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    if (menuOpen) getLenis()?.stop();
    else getLenis()?.start();
  }, [menuOpen, getLenis]);

  const inverse = atTop && !menuOpen;

  return (
    <div
      className={`pointer-events-none fixed inset-x-0 top-0 z-50 transition-transform ease-emphasized-out ${
        hidden && !menuOpen ? "-translate-y-[120%]" : "translate-y-0"
      } ${atTop ? "pt-0" : "pt-2"}`}
    >
      <header
        className="pointer-events-auto relative mx-auto"
        style={
          {
            "--nav-hover": inverse ? "#fff" : "var(--gp-color-primary)",
            "--logo-ink": inverse ? "#fff" : "#3A3E40",
            "--logo-accent": inverse ? "#fff" : "#096FCA",
          } as React.CSSProperties
        }
      >
        {/* Background — transparent over the hero, a floating rounded bar elsewhere */}
        <div
          className={`absolute inset-y-0 transition-all ease-standard-out ${
            inverse
              ? "inset-x-0 rounded-none bg-transparent"
              : "inset-x-2 rounded-lg bg-surface-muted/95 backdrop-blur-md"
          }`}
        />
        <div
          className={`absolute inset-x-0 bottom-0 h-px bg-white/25 transition-opacity ease-standard-out ${
            inverse ? "opacity-100" : "opacity-0"
          }`}
        />

        <div
          className={`relative flex items-center justify-between gap-8 px-5 transition-[height,color] ease-standard-out lg:px-10 ${
            inverse ? "h-[88px] text-white" : "h-16 text-text"
          }`}
        >
          <div className="flex h-full items-center gap-6 whitespace-nowrap">
            <a href="#top" aria-label="Goodpatch" className="block shrink-0 transition-opacity hover:opacity-70">
              <Logo className="block h-auto w-[120px] lg:w-[153px]" />
            </a>
            <span className={`hidden h-10 w-px shrink-0 lg:block ${inverse ? "bg-white/30" : "bg-text/20"}`} />
            <nav aria-label="主要ナビゲーション" className="hidden h-full font-en text-sm font-semibold lg:block">
              <ul className="-mx-2.5 flex h-full items-stretch">
                {NAV_PRIMARY.map((l) => (
                  <NavLink key={l.label} {...l} />
                ))}
              </ul>
            </nav>
          </div>

          <div className="hidden h-full items-center gap-6 whitespace-nowrap font-en text-sm font-semibold lg:flex">
            <nav aria-label="サブナビゲーション" className="h-full">
              <ul className="-mx-2.5 flex h-full items-stretch">
                {NAV_SECONDARY.map((l) => (
                  <NavLink key={l.label} {...l} />
                ))}
              </ul>
            </nav>
            <span className={`h-10 w-px ${inverse ? "bg-white/30" : "bg-text/20"}`} />
            <div className="flex items-center gap-1.5">
              <a
                href="#top"
                className="relative after:absolute after:inset-x-0 after:-bottom-1.5 after:h-[1.5px] after:bg-current"
              >
                JA
              </a>
              <span className="opacity-40">|</span>
              <a href="https://goodpatch.com/en" className="opacity-50 transition-opacity hover:opacity-100">
                EN
              </a>
            </div>
            <span className={`h-10 w-px ${inverse ? "bg-white/30" : "bg-text/20"}`} />
            <a href={LINKS.downloads} className="transition-colors hover:text-[var(--nav-hover)]">
              Downloads
            </a>
            <a
              href={LINKS.contact}
              className={`inline-flex h-8 items-center rounded-full px-4 transition-colors ease-standard-out ${
                inverse ? "bg-white text-primary hover:bg-white/85" : "bg-primary text-white hover:bg-primary-bright"
              }`}
            >
              Contact
            </a>
          </div>

          {/* Mobile */}
          <div className="flex items-center gap-3 lg:hidden">
            <a
              href={LINKS.contact}
              className={`inline-flex h-8 items-center rounded-full px-4 font-en text-sm font-semibold ${
                inverse ? "bg-white text-primary" : "bg-primary text-white"
              }`}
            >
              Contact
            </a>
            <button
              type="button"
              aria-label={menuOpen ? "メニューを閉じる" : "メニューを開く"}
              aria-expanded={menuOpen}
              onClick={() => setMenuOpen((v) => !v)}
              className="relative size-10"
            >
              <span
                className={`absolute left-2 right-2 h-[1.5px] bg-current transition-transform ease-standard-out ${
                  menuOpen ? "top-1/2 rotate-45" : "top-[15px]"
                }`}
              />
              <span
                className={`absolute left-2 right-2 h-[1.5px] bg-current transition-transform ease-standard-out ${
                  menuOpen ? "top-1/2 -rotate-45" : "top-[24px]"
                }`}
              />
            </button>
          </div>
        </div>
      </header>

      {/* Mobile menu */}
      <div
        className={`pointer-events-auto fixed inset-x-2 top-[72px] bottom-2 overflow-y-auto rounded-lg bg-surface-muted px-6 py-8 transition-[opacity,visibility,transform] ease-emphasized-out lg:hidden ${
          menuOpen ? "visible translate-y-0 opacity-100" : "invisible -translate-y-2 opacity-0"
        }`}
        data-lenis-prevent
      >
        <ul className="grid gap-5 font-en text-3xl font-semibold text-text">
          {[...NAV_PRIMARY, ...NAV_SECONDARY].map((l) => (
            <li key={l.label}>
              <a href={l.href} onClick={() => setMenuOpen(false)}>
                {l.label}
              </a>
            </li>
          ))}
        </ul>
        <div className="mt-10 flex gap-3 font-en text-sm font-semibold">
          <a
            href={LINKS.downloads}
            className="inline-flex h-10 items-center rounded-full border border-primary px-5 text-primary"
          >
            Downloads
          </a>
          <a href={LINKS.contact} className="inline-flex h-10 items-center rounded-full bg-primary px-5 text-white">
            Contact
          </a>
        </div>
      </div>
    </div>
  );
}
