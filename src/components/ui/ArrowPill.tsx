import type { ReactNode } from "react";

type Tone = "primary" | "white" | "pale";

const toneClass: Record<Tone, string> = {
  primary: "bg-primary text-white",
  white: "bg-white text-primary",
  pale: "bg-primary-pale text-primary",
};

export function Arrow({ className = "" }: { className?: string }) {
  return (
    <svg viewBox="0 0 12 10" fill="none" aria-hidden="true" className={`h-[0.833em] w-[1em] ${className}`}>
      <path d="M5.45312 0.5625L9.99812 4.56257L5.45312 8.56263" stroke="currentColor" strokeWidth="1.5" />
      <path d="M9.99899 4.5625H0" stroke="currentColor" strokeWidth="1.5" />
    </svg>
  );
}

/** Small rounded pill with an arrow — nudges when its `group` parent is hovered. */
export function ArrowPill({
  tone = "primary",
  external = false,
  size = "md",
  className = "",
}: {
  tone?: Tone;
  external?: boolean;
  size?: "sm" | "md" | "lg";
  className?: string;
}) {
  const dims =
    size === "sm" ? "h-[22px] w-[28px] text-[10px]" : size === "lg" ? "h-8 w-10 text-sm" : "h-6 w-[30px] text-xs";
  return (
    <span
      className={`inline-flex shrink-0 items-center justify-center overflow-hidden rounded-full ${dims} ${toneClass[tone]} ${className}`}
    >
      <span className="inline-flex group-hover:animate-[arrow-nudge_0.5s_var(--ease-power2-inOut)]">
        <Arrow className={external ? "-rotate-45" : ""} />
      </span>
    </span>
  );
}

/** "View Details ⟶" style text link. */
export function TextLink({
  href,
  children,
  external,
  tone = "primary",
  className = "",
}: {
  href: string;
  children: ReactNode;
  external?: boolean;
  tone?: Tone;
  className?: string;
}) {
  return (
    <a
      href={href}
      target={external ? "_blank" : undefined}
      rel={external ? "noreferrer" : undefined}
      className={`group inline-flex w-fit items-center gap-3 font-en text-base leading-none font-semibold ${className}`}
    >
      <span>{children}</span>
      <ArrowPill tone={tone} external={external} />
    </a>
  );
}

/** Outlined capsule button ("Company Top →", "Career info ↗"). */
export function OutlineButton({
  href,
  children,
  external,
  className = "",
}: {
  href: string;
  children: ReactNode;
  external?: boolean;
  className?: string;
}) {
  return (
    <a
      href={href}
      target={external ? "_blank" : undefined}
      rel={external ? "noreferrer" : undefined}
      className={`group inline-flex min-h-[78px] items-center justify-between gap-12 rounded-full border border-white/80 px-10 font-en text-xl font-semibold text-white transition-colors ease-standard-out hover:bg-white hover:text-primary ${className}`}
    >
      <span>{children}</span>
      <ArrowPill tone="pale" external={external} />
    </a>
  );
}
