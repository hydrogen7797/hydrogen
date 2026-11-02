"use client";

import { useMotion } from "@/components/providers/Providers";

/** The "モーション ‖" pause/play switch that appears in the hero and footer. */
export function MotionToggle({ className = "" }: { className?: string }) {
  const { motionOn, toggleMotion } = useMotion();
  return (
    <button
      type="button"
      onClick={toggleMotion}
      aria-pressed={!motionOn}
      aria-label={motionOn ? "モーションを停止" : "モーションを再生"}
      className={`group inline-flex items-center gap-2.5 text-sm font-bold text-white ${className}`}
    >
      <span>モーション</span>
      <span className="inline-flex size-8 items-center justify-center rounded-full bg-white text-primary transition-transform ease-standard-out group-hover:scale-110">
        {motionOn ? (
          <svg width="6" height="10" viewBox="0 0 6 10" fill="none" aria-hidden="true">
            <path d="M1 0V10" stroke="currentColor" strokeWidth="2" />
            <path d="M5 0V10" stroke="currentColor" strokeWidth="2" />
          </svg>
        ) : (
          <svg width="9" height="10" viewBox="0 0 9 10" fill="none" aria-hidden="true">
            <path d="M0.5 0.8L8 5L0.5 9.2V0.8Z" fill="currentColor" />
          </svg>
        )}
      </span>
    </button>
  );
}
