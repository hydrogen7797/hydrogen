"use client";

import { createContext, useCallback, useContext, useEffect, useMemo, useRef, useState, type ReactNode } from "react";
import Lenis from "lenis";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

type MotionContextValue = {
  /** false when the user paused motion with the "モーション" toggle */
  motionOn: boolean;
  toggleMotion: () => void;
  /** The smooth-scroll instance (null before mount or with reduced motion). */
  getLenis: () => Lenis | null;
};

const MotionContext = createContext<MotionContextValue>({
  motionOn: true,
  toggleMotion: () => {},
  getLenis: () => null,
});

export const useMotion = () => useContext(MotionContext);

export function Providers({ children }: { children: ReactNode }) {
  const [motionOn, setMotionOn] = useState(true);
  const lenisRef = useRef<Lenis | null>(null);

  // Smooth scrolling, driven from GSAP's ticker so ScrollTrigger stays in sync.
  useEffect(() => {
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduce) return;

    const instance = new Lenis({ autoRaf: false, lerp: 0.1 });
    instance.on("scroll", ScrollTrigger.update);
    const tick = (time: number) => instance.raf(time * 1000);
    gsap.ticker.add(tick);
    gsap.ticker.lagSmoothing(0);
    lenisRef.current = instance;

    return () => {
      gsap.ticker.remove(tick);
      instance.destroy();
      lenisRef.current = null;
    };
  }, []);

  // Fonts change text metrics, so re-measure triggers once they settle.
  useEffect(() => {
    document.fonts?.ready.then(() => ScrollTrigger.refresh());
  }, []);

  useEffect(() => {
    document.documentElement.dataset.motion = motionOn ? "on" : "off";
  }, [motionOn]);

  const toggleMotion = useCallback(() => setMotionOn((v) => !v), []);

  const getLenis = useCallback(() => lenisRef.current, []);

  const value = useMemo(() => ({ motionOn, toggleMotion, getLenis }), [motionOn, toggleMotion, getLenis]);

  return <MotionContext.Provider value={value}>{children}</MotionContext.Provider>;
}
