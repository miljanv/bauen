"use client";

import {
  useCallback,
  useEffect,
  useState,
  type RefObject,
} from "react";

function clamp01(value: number) {
  return Math.min(1, Math.max(0, value));
}

function smoothstep01(t: number) {
  const x = clamp01(t);
  return x * x * (3 - 2 * x);
}

type UseInViewProgressOptions = {
  /** Viewport visina × start — animacija počinje (element ulazi odozdo). */
  start?: number;
  /** Viewport visina × end — animacija završena. */
  end?: number;
};

/**
 * 0→1 dok element ulazi u viewport pri skrolu (za L-corner progress fill).
 */
export function useInViewProgress(
  ref: RefObject<HTMLElement | null>,
  { start = 0.92, end = 0.38 }: UseInViewProgressOptions = {},
) {
  const [progress, setProgress] = useState(0);

  const measure = useCallback(() => {
    const el = ref.current;
    if (!el) return;

    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      setProgress(1);
      return;
    }

    const rect = el.getBoundingClientRect();
    const vh = window.innerHeight;
    const startPx = vh * start;
    const endPx = vh * end;
    const raw = (startPx - rect.top) / Math.max(1, startPx - endPx);
    setProgress(smoothstep01(raw));
  }, [ref, start, end]);

  useEffect(() => {
    measure();
    window.addEventListener("scroll", measure, { passive: true });
    window.addEventListener("resize", measure);
    return () => {
      window.removeEventListener("scroll", measure);
      window.removeEventListener("resize", measure);
    };
  }, [measure]);

  return progress;
}
