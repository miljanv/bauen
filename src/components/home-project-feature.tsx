"use client";

import Link from "next/link";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { useCallback, useEffect, useRef, useState } from "react";
import { createPortal } from "react-dom";

import { iconActionButtonClass } from "@/components/bauen-cta-button";
import {
  ProjectGalleryImageButton,
  ProjectGalleryLightbox,
} from "@/components/project-gallery-lightbox";
import { ProjectMetaRows } from "@/components/project-meta-rows";
import { Reveal } from "@/components/reveal";
import { getProjectPath, type Project } from "@/lib/projects";
import { cn } from "@/lib/utils";

const AUTO_SLIDE_MS = 3000;
const SLIDE_TRANSITION_MS = 700;
const SWIPE_THRESHOLD_PX = 40;

function getCarouselImages(project: Project) {
  const seen = new Set<string>();
  return [
    { src: project.heroImage, alt: project.heroImageAlt },
    ...project.gallery,
  ]
    .filter(({ src }) => {
      if (seen.has(src)) return false;
      seen.add(src);
      return true;
    })
    .map(({ src, alt }) => ({ src, alt }));
}

function photoCountLabel(n: number) {
  const lastTwo = n % 100;
  const last = n % 10;
  const plural =
    last >= 2 && last <= 4 && (lastTwo < 12 || lastTwo > 14)
      ? "fotografije"
      : "fotografija";
  return `${n} ${n === 1 ? "fotografija" : plural}`;
}

const carouselArrowClass = cn(
  iconActionButtonClass,
  "border border-white/15 text-primary hover:border-primary hover:bg-primary hover:text-primary-foreground disabled:pointer-events-none disabled:opacity-30",
);

function prefersReducedMotion() {
  return window.matchMedia("(prefers-reduced-motion: reduce)").matches;
}

export function HomeProjectFeature({
  project,
  index,
}: {
  project: Project;
  index: number;
}) {
  const href = getProjectPath(project.slug);
  const images = getCarouselImages(project);
  const count = images.length;
  const loops = count > 1;
  /** Three copies of the images; `position` lives in the middle copy and is re-centred after each slide so the strip never runs out. */
  const slides = loops ? [...images, ...images, ...images] : images;

  const rootRef = useRef<HTMLDivElement>(null);
  const swipeStartX = useRef<number | null>(null);
  const [position, setPosition] = useState(loops ? count : 0);
  const [animate, setAnimate] = useState(true);
  const [paused, setPaused] = useState(false);
  const [inView, setInView] = useState(false);
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);

  const realIndex = ((position % count) + count) % count;

  const move = useCallback(
    (direction: 1 | -1) => {
      if (!loops) return;
      setAnimate(true);
      setPosition((p) => {
        const next = p + direction;
        if (prefersReducedMotion()) {
          return count + (((next - count) % count) + count) % count;
        }
        return Math.min(Math.max(next, 1), count * 3 - 3);
      });
    },
    [count, loops],
  );

  useEffect(() => {
    if (!loops || (position >= count && position < count * 2)) return;
    const timer = window.setTimeout(() => {
      setAnimate(false);
      setPosition((p) => count + ((p % count) + count) % count);
    }, SLIDE_TRANSITION_MS + 50);
    return () => window.clearTimeout(timer);
  }, [position, count, loops]);

  useEffect(() => {
    if (animate) return;
    let frame = requestAnimationFrame(() => {
      frame = requestAnimationFrame(() => setAnimate(true));
    });
    return () => cancelAnimationFrame(frame);
  }, [animate]);

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
    if (!loops || paused || !inView || lightboxIndex !== null) return;
    if (prefersReducedMotion()) return;
    const timer = window.setTimeout(() => move(1), AUTO_SLIDE_MS);
    return () => window.clearTimeout(timer);
  }, [position, loops, paused, inView, lightboxIndex, move]);

  return (
    <article>
      <Reveal variant="fade-up" duration={900}>
        <div className="flex flex-wrap items-center gap-3 font-sans text-xs font-medium uppercase tracking-[0.2em] md:text-sm">
          <span className="text-primary tabular-nums">
            {String(index + 1).padStart(2, "0")}
          </span>
          <span className="h-px w-10 bg-primary/60" aria-hidden />
          <span className="text-neutral-400">{project.category}</span>
        </div>
        <h3 className="mt-4 max-w-[960px] text-balance font-heading text-[clamp(1.75rem,4vw,3rem)] font-normal leading-[1.1] text-white">
          <Link href={href} className="transition-colors hover:text-primary">
            {project.title}
          </Link>
        </h3>
      </Reveal>

      <Reveal
        variant="fade-up"
        delay={150}
        duration={1000}
        className="mt-8 md:mt-10"
      >
        <div
          ref={rootRef}
          role="region"
          aria-roledescription="karusel"
          aria-label={`Galerija projekta: ${project.title}`}
          tabIndex={0}
          className="overflow-hidden focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary"
          onMouseEnter={() => setPaused(true)}
          onMouseLeave={() => setPaused(false)}
          onFocus={() => setPaused(true)}
          onBlur={() => setPaused(false)}
          onKeyDown={(e) => {
            if (e.key === "ArrowLeft") move(-1);
            if (e.key === "ArrowRight") move(1);
          }}
          onTouchStart={(e) => {
            swipeStartX.current = e.touches[0]?.clientX ?? null;
            setPaused(true);
          }}
          onTouchEnd={(e) => {
            const start = swipeStartX.current;
            const end = e.changedTouches[0]?.clientX;
            swipeStartX.current = null;
            setPaused(false);
            if (start == null || end == null) return;
            const delta = end - start;
            if (Math.abs(delta) >= SWIPE_THRESHOLD_PX) move(delta < 0 ? 1 : -1);
          }}
        >
          <div
            className={cn(
              "flex touch-pan-y gap-(--gap) [--gap:1rem] [--slide:82%] sm:[--slide:calc((100%_-_var(--gap))_/_2)] md:[--gap:1.5rem] lg:[--slide:calc((100%_-_2_*_var(--gap))_/_3)]",
              animate &&
                "transition-transform ease-[cubic-bezier(0.22,1,0.36,1)] motion-reduce:transition-none",
            )}
            style={{
              transform: `translateX(calc(${-position} * (var(--slide) + var(--gap))))`,
              transitionDuration: `${SLIDE_TRANSITION_MS}ms`,
            }}
          >
            {slides.map((image, i) => {
              const imageIndex = i % count;
              return (
                <div
                  key={`${i}-${image.src}`}
                  className="relative aspect-4/5 w-(--slide) shrink-0 overflow-hidden"
                >
                  <ProjectGalleryImageButton
                    src={image.src}
                    alt={image.alt}
                    sizes="(max-width:640px) 82vw, (max-width:1024px) 50vw, 400px"
                    index={imageIndex}
                    onOpen={setLightboxIndex}
                  />
                  <span
                    className="pointer-events-none absolute inset-x-0 top-0 h-20 bg-linear-to-b from-black/45 to-transparent"
                    aria-hidden
                  />
                  <span
                    className="pointer-events-none absolute left-4 top-4 font-sans text-xs font-medium tabular-nums tracking-[0.2em] text-white"
                    aria-hidden
                  >
                    {String(imageIndex + 1).padStart(2, "0")}
                  </span>
                </div>
              );
            })}
          </div>
        </div>

        <div className="mt-6 flex items-center gap-4 md:gap-6">
          <div className="relative h-0.5 flex-1 overflow-hidden bg-white/10">
            <div
              className="absolute inset-y-0 left-0 bg-primary transition-transform duration-500 ease-out motion-reduce:transition-none"
              style={{
                width: `${100 / count}%`,
                transform: `translateX(${realIndex * 100}%)`,
              }}
            />
          </div>
          <span className="hidden font-sans text-sm text-neutral-400 sm:inline">
            {photoCountLabel(images.length)}
          </span>
          <div className="flex gap-2">
            <button
              type="button"
              onClick={() => move(-1)}
              disabled={!loops}
              className={carouselArrowClass}
              aria-label="Prethodne fotografije"
            >
              <ChevronLeft className="size-5" aria-hidden />
            </button>
            <button
              type="button"
              onClick={() => move(1)}
              disabled={!loops}
              className={carouselArrowClass}
              aria-label="Sledeće fotografije"
            >
              <ChevronRight className="size-5" aria-hidden />
            </button>
          </div>
        </div>
      </Reveal>

      <Reveal
        variant="fade-up"
        delay={100}
        duration={1000}
        className="mt-10 md:mt-14"
      >
        <div className="flex flex-col gap-10 lg:flex-row lg:items-start lg:gap-8">
          <ProjectMetaRows rows={project.meta} />
          <div className="min-w-0 flex-1 font-sans text-lg font-normal leading-[1.3] text-neutral-50 md:text-2xl md:leading-[1.2]">
            <p>
              {project.summaryShort}{" "}
              <Link
                href={href}
                className="inline-flex items-center gap-1 whitespace-nowrap text-primary transition-colors hover:text-primary-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary"
              >
                Vidi više
                <ChevronRight className="size-5" aria-hidden />
              </Link>
            </p>
          </div>
        </div>
      </Reveal>

      {lightboxIndex !== null
        ? createPortal(
            <ProjectGalleryLightbox
              images={images}
              initialIndex={lightboxIndex}
              onClose={() => setLightboxIndex(null)}
            />,
            document.body,
          )
        : null}
    </article>
  );
}
