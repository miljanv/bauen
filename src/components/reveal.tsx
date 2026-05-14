"use client";

import type { CSSProperties, ElementType, ReactNode } from "react";
import { useEffect, useRef, useState } from "react";

import { cn } from "@/lib/utils";

export type RevealVariant =
  | "fade"
  | "fade-up"
  | "fade-down"
  | "fade-left"
  | "fade-right"
  | "zoom"
  | "zoom-out"
  | "rotate"
  | "blur";

const VARIANTS: Record<RevealVariant, { from: string; to: string }> = {
  fade: { from: "opacity-0", to: "opacity-100" },
  "fade-up": {
    from: "opacity-0 translate-y-10",
    to: "opacity-100 translate-y-0",
  },
  "fade-down": {
    from: "opacity-0 -translate-y-10",
    to: "opacity-100 translate-y-0",
  },
  "fade-left": {
    from: "opacity-0 translate-x-12",
    to: "opacity-100 translate-x-0",
  },
  "fade-right": {
    from: "opacity-0 -translate-x-12",
    to: "opacity-100 translate-x-0",
  },
  zoom: {
    from: "opacity-0 scale-90",
    to: "opacity-100 scale-100",
  },
  "zoom-out": {
    from: "opacity-0 scale-110",
    to: "opacity-100 scale-100",
  },
  rotate: {
    from: "opacity-0 -rotate-3 scale-[0.97]",
    to: "opacity-100 rotate-0 scale-100",
  },
  blur: {
    from: "opacity-0 blur-md",
    to: "opacity-100 blur-0",
  },
};

type RevealProps = {
  children: ReactNode;
  variant?: RevealVariant;
  /** Delay in milliseconds (good for staggering siblings). */
  delay?: number;
  /** Duration in milliseconds. */
  duration?: number;
  /** 0–1, how much of the element must be visible before animating. */
  threshold?: number;
  /** Run animation only once (default true). When false, reverses when scrolling away. */
  once?: boolean;
  /** Underlying element tag. Defaults to `div`. */
  as?: ElementType;
  className?: string;
  id?: string;
  style?: CSSProperties;
};

/**
 * Scroll-triggered reveal animation. Uses IntersectionObserver and pure CSS transitions —
 * no JS animation work per frame. Respects `prefers-reduced-motion`.
 */
export function Reveal({
  children,
  variant = "fade-up",
  delay = 0,
  duration = 800,
  threshold = 0.12,
  once = true,
  as: Tag = "div",
  className,
  id,
  style,
}: RevealProps) {
  const ref = useRef<HTMLElement | null>(null);
  const [inView, setInView] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    if (
      typeof window !== "undefined" &&
      window.matchMedia("(prefers-reduced-motion: reduce)").matches
    ) {
      setInView(true);
      return;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        const entry = entries[0];
        if (!entry) return;
        if (entry.isIntersecting) {
          setInView(true);
          if (once) observer.disconnect();
        } else if (!once) {
          setInView(false);
        }
      },
      { threshold, rootMargin: "0px 0px -8% 0px" },
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, [threshold, once]);

  const v = VARIANTS[variant];

  return (
    <Tag
      ref={ref}
      id={id}
      style={{
        ...style,
        transitionDuration: `${duration}ms`,
        transitionDelay: `${delay}ms`,
      }}
      className={cn(
        "transition-[transform,opacity,filter] ease-[cubic-bezier(0.22,1,0.36,1)] will-change-[transform,opacity] motion-reduce:transition-none",
        inView ? v.to : v.from,
        className,
      )}
    >
      {children}
    </Tag>
  );
}
