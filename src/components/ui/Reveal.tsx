"use client";

import { useEffect, useRef, useState, type CSSProperties, type ElementType, type ReactNode } from "react";

/** Adds `data-in` once the element scrolls into view (one-shot). */
function useInView<T extends HTMLElement>(rootMargin = "0px 0px -12% 0px") {
  const ref = useRef<T>(null);
  const [inView, setInView] = useState(false);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const io = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setInView(true);
          io.disconnect();
        }
      },
      { rootMargin },
    );
    io.observe(el);
    return () => io.disconnect();
  }, [rootMargin]);
  return [ref, inView] as const;
}

/** Big display heading whose letters rise in one after another. */
export function RevealLetters({
  text,
  className = "",
  stagger = 0.045,
  delay = 0,
}: {
  text: string;
  className?: string;
  stagger?: number;
  delay?: number;
}) {
  const [ref, inView] = useInView<HTMLSpanElement>();
  return (
    <span ref={ref} className={`inline-block whitespace-nowrap ${className}`} aria-label={text} role="text">
      {[...text].map((ch, i) => (
        <span
          key={i}
          aria-hidden="true"
          className="inline-block transition-[transform,opacity] duration-[900ms] ease-[var(--ease-power3-out)]"
          style={{
            transform: inView ? "translate3d(0,0,0)" : "translate3d(0,0.6em,0) rotate(6deg)",
            opacity: inView ? 1 : 0,
            transitionDelay: `${delay + i * stagger}s`,
          }}
        >
          {ch === " " ? " " : ch}
        </span>
      ))}
    </span>
  );
}

/** Fades + lifts its children in when scrolled into view. */
export function Reveal({
  as: Tag = "div",
  children,
  className = "",
  delay = 0,
  y = 32,
  style,
}: {
  as?: ElementType;
  children: ReactNode;
  className?: string;
  delay?: number;
  y?: number;
  style?: CSSProperties;
}) {
  const [ref, inView] = useInView<HTMLElement>();
  return (
    <Tag
      ref={ref}
      className={`transition-[transform,opacity] duration-[1000ms] ease-[var(--ease-power3-out)] ${className}`}
      style={{
        ...style,
        transform: inView ? "translate3d(0,0,0)" : `translate3d(0,${y}px,0)`,
        opacity: inView ? 1 : 0,
        transitionDelay: `${delay}s`,
      }}
    >
      {children}
    </Tag>
  );
}
