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

/**
 * Use inline transform (not Tailwind translate/scale utilities).
 * Tailwind v4 maps translate-* to the CSS `translate` property, while our
 * transition targeted `transform` — so fade worked but movement never animated.
 */
const VARIANTS: Record<RevealVariant, { from: CSSProperties; to: CSSProperties }> =
  {
    fade: {
      from: { opacity: 0 },
      to: { opacity: 1 },
    },
    "fade-up": {
      from: { opacity: 0, transform: "translate3d(0, 100px, 0)" },
      to: { opacity: 1, transform: "translate3d(0, 0, 0)" },
    },
    "fade-down": {
      from: { opacity: 0, transform: "translate3d(0, -100px, 0)" },
      to: { opacity: 1, transform: "translate3d(0, 0, 0)" },
    },
    "fade-left": {
      from: { opacity: 0, transform: "translate3d(100px, 0, 0)" },
      to: { opacity: 1, transform: "translate3d(0, 0, 0)" },
    },
    "fade-right": {
      from: { opacity: 0, transform: "translate3d(-100px, 0, 0)" },
      to: { opacity: 1, transform: "translate3d(0, 0, 0)" },
    },
    zoom: {
      from: { opacity: 0, transform: "scale(0.9)" },
      to: { opacity: 1, transform: "scale(1)" },
    },
    "zoom-out": {
      from: { opacity: 0, transform: "scale(1.1)" },
      to: { opacity: 1, transform: "scale(1)" },
    },
    rotate: {
      from: { opacity: 0, transform: "rotate(-3deg) scale(0.97)" },
      to: { opacity: 1, transform: "rotate(0deg) scale(1)" },
    },
    blur: {
      from: { opacity: 0, filter: "blur(12px)" },
      to: { opacity: 1, filter: "blur(0px)" },
    },
  };

type RevealProps = {
  children: ReactNode;
  variant?: RevealVariant;
  /** Delay in milliseconds (good for staggering siblings). */
  delay?: number;
  /** Duration in milliseconds. Default 1000 to match Comita/AOS. */
  duration?: number;
  /**
   * How much of the element must be visible before animating.
   * Prefer 0 for tall sections — trigger via rootMargin instead.
   */
  threshold?: number;
  /**
   * Shrinks the bottom of the viewport trigger zone (like AOS offset).
   * Default 120px ≈ Comita/AOS.
   */
  offset?: number;
  /** Run animation only once (default true). When false, reverses when scrolling away. */
  once?: boolean;
  /** Underlying element tag. Defaults to `div`. */
  as?: ElementType;
  className?: string;
  id?: string;
  style?: CSSProperties;
};

/**
 * Scroll-triggered reveal animation. Uses IntersectionObserver and CSS transitions.
 * Respects `prefers-reduced-motion`. Timing/travel tuned to match Comita (AOS fade-up).
 */
export function Reveal({
  children,
  variant = "fade-up",
  delay = 0,
  duration = 1000,
  threshold = 0,
  offset = 120,
  once = true,
  as: Tag = "div",
  className,
  id,
  style,
}: RevealProps) {
  const ref = useRef<HTMLElement | null>(null);
  const [inView, setInView] = useState(false);
  const [reduceMotion, setReduceMotion] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      setReduceMotion(true);
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
      {
        threshold,
        rootMargin: `0px 0px -${offset}px 0px`,
      },
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, [threshold, offset, once]);

  const v = VARIANTS[variant];
  const motionStyle = reduceMotion || inView ? v.to : v.from;

  return (
    <Tag
      ref={ref}
      id={id}
      style={{
        ...style,
        ...motionStyle,
        transitionProperty: reduceMotion
          ? undefined
          : "opacity, transform, filter",
        transitionDuration: reduceMotion ? "0ms" : `${duration}ms`,
        transitionTimingFunction: "ease-out",
        transitionDelay: inView && !reduceMotion ? `${delay}ms` : "0ms",
        willChange: reduceMotion || inView ? undefined : "opacity, transform",
      }}
      className={cn(className)}
    >
      {children}
    </Tag>
  );
}
