"use client";

import Image from "next/image";
import type { StaticImageData } from "next/image";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { useCallback, useEffect, useRef, useState, type ReactNode } from "react";

import { iconActionButtonClass } from "@/components/bauen-cta-button";
import { cn } from "@/lib/utils";

const slideshowArrowClass = cn(
  iconActionButtonClass,
  "size-9 border border-white/25 bg-black/50 text-white backdrop-blur-sm hover:border-primary hover:bg-primary sm:size-10 md:size-11",
);

export type SlideshowImage = {
  src: string | StaticImageData;
  alt: string;
};

type ImageSlideshowProps = {
  images: readonly SlideshowImage[];
  sizes: string;
  /** Klase za svaku `<Image>` (npr. `grayscale`). */
  imageClassName?: string;
  intervalMs?: number;
  /** Renderuje se iznad slika, a ispod kontrola (npr. link preko cele slike). */
  children?: ReactNode;
  className?: string;
};

export function ImageSlideshow({
  images,
  sizes,
  imageClassName,
  intervalMs = 3000,
  children,
  className,
}: ImageSlideshowProps) {
  const rootRef = useRef<HTMLDivElement>(null);
  const [index, setIndex] = useState(0);
  const [paused, setPaused] = useState(false);
  const [inView, setInView] = useState(false);
  const count = images.length;

  const goNext = useCallback(() => {
    setIndex((i) => (i + 1) % count);
  }, [count]);

  const goPrev = useCallback(() => {
    setIndex((i) => (i - 1 + count) % count);
  }, [count]);

  useEffect(() => {
    const el = rootRef.current;
    if (!el) return;
    const io = new IntersectionObserver(
      ([entry]) => setInView(entry?.isIntersecting ?? false),
      { threshold: 0.25 },
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);

  useEffect(() => {
    if (count < 2 || paused || !inView) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const timer = window.setTimeout(goNext, intervalMs);
    return () => window.clearTimeout(timer);
  }, [index, count, paused, inView, goNext, intervalMs]);

  return (
    <div
      ref={rootRef}
      className={cn("absolute inset-0", className)}
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
      onFocus={() => setPaused(true)}
      onBlur={() => setPaused(false)}
    >
      <div className="absolute inset-0 overflow-hidden">
        {images.map((image, i) => {
          const isActive = i === index;
          return (
            <Image
              key={typeof image.src === "string" ? image.src : image.src.src}
              src={image.src}
              alt={image.alt}
              fill
              aria-hidden={!isActive}
              className={cn(
                "object-cover transition-opacity duration-700 ease-[cubic-bezier(0.22,1,0.36,1)] motion-reduce:transition-none",
                isActive ? "z-[1] opacity-100" : "z-0 opacity-0",
                imageClassName,
              )}
              sizes={sizes}
            />
          );
        })}
      </div>

      {children}

      {count > 1 ? (
        <div className="absolute inset-x-0 bottom-4 z-30 flex justify-center gap-2 sm:bottom-5">
          {images.map((image, i) => (
            <button
              key={typeof image.src === "string" ? image.src : image.src.src}
              type="button"
              onClick={() => setIndex(i)}
              aria-label={`Prikaži fotografiju ${i + 1} od ${count}`}
              aria-current={i === index ? "true" : undefined}
              className={cn(
                "h-1.5 cursor-pointer rounded-full transition-all duration-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary",
                i === index
                  ? "w-6 bg-primary"
                  : "w-1.5 bg-white/60 hover:bg-white",
              )}
            />
          ))}
        </div>
      ) : null}

      {count > 1 ? (
        <div className="absolute bottom-3 right-3 z-30 flex gap-2 sm:bottom-5 sm:right-5 lg:bottom-6 lg:right-6">
          <button
            type="button"
            onClick={goPrev}
            className={slideshowArrowClass}
            aria-label="Prethodna fotografija"
          >
            <ChevronLeft className="size-5" aria-hidden />
          </button>
          <button
            type="button"
            onClick={goNext}
            className={slideshowArrowClass}
            aria-label="Sledeća fotografija"
          >
            <ChevronRight className="size-5" aria-hidden />
          </button>
        </div>
      ) : null}
    </div>
  );
}
