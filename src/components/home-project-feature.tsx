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

type CarouselState = {
  progress: number;
  visibleRatio: number;
  canPrev: boolean;
  canNext: boolean;
};

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

export function HomeProjectFeature({
  project,
  index,
}: {
  project: Project;
  index: number;
}) {
  const href = getProjectPath(project.slug);
  const images = getCarouselImages(project);
  const trackRef = useRef<HTMLDivElement>(null);
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);
  const [carousel, setCarousel] = useState<CarouselState>({
    progress: 0,
    visibleRatio: 1,
    canPrev: false,
    canNext: false,
  });

  const updateCarousel = useCallback(() => {
    const el = trackRef.current;
    if (!el) return;
    const max = el.scrollWidth - el.clientWidth;
    setCarousel({
      progress: max > 0 ? el.scrollLeft / max : 0,
      visibleRatio: el.scrollWidth > 0 ? el.clientWidth / el.scrollWidth : 1,
      canPrev: el.scrollLeft > 4,
      canNext: el.scrollLeft < max - 4,
    });
  }, []);

  useEffect(() => {
    const el = trackRef.current;
    if (!el) return;
    const ro = new ResizeObserver(updateCarousel);
    ro.observe(el);
    el.addEventListener("scroll", updateCarousel, { passive: true });
    return () => {
      ro.disconnect();
      el.removeEventListener("scroll", updateCarousel);
    };
  }, [updateCarousel]);

  const scrollBySlide = (direction: 1 | -1) => {
    const el = trackRef.current;
    if (!el) return;
    const slide = el.firstElementChild as HTMLElement | null;
    const gap = parseFloat(getComputedStyle(el).columnGap) || 0;
    const step = (slide?.offsetWidth ?? el.clientWidth) + gap;
    el.scrollBy({ left: direction * step, behavior: "smooth" });
  };

  const thumbOffset =
    carousel.visibleRatio > 0
      ? (carousel.progress * (1 - carousel.visibleRatio)) /
        carousel.visibleRatio
      : 0;

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
          ref={trackRef}
          role="region"
          aria-label={`Galerija projekta: ${project.title}`}
          tabIndex={0}
          className="flex snap-x snap-mandatory gap-4 overflow-x-auto overscroll-x-contain [scrollbar-width:none] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary md:gap-6 [&::-webkit-scrollbar]:hidden"
        >
          {images.map((image, i) => (
            <div
              key={image.src}
              className="relative aspect-4/5 w-[82%] shrink-0 snap-start overflow-hidden sm:w-[calc((100%-1rem)/2)] md:w-[calc((100%-1.5rem)/2)] lg:w-[calc((100%-3rem)/3)]"
            >
              <ProjectGalleryImageButton
                src={image.src}
                alt={image.alt}
                sizes="(max-width:640px) 82vw, (max-width:1024px) 50vw, 400px"
                index={i}
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
                {String(i + 1).padStart(2, "0")}
              </span>
            </div>
          ))}
        </div>

        <div className="mt-6 flex items-center gap-4 md:gap-6">
          <div className="relative h-0.5 flex-1 overflow-hidden bg-white/10">
            <div
              className="absolute inset-y-0 left-0 bg-primary transition-transform duration-150 ease-out"
              style={{
                width: `${carousel.visibleRatio * 100}%`,
                transform: `translateX(${thumbOffset * 100}%)`,
              }}
            />
          </div>
          <span className="hidden font-sans text-sm text-neutral-400 sm:inline">
            {photoCountLabel(images.length)}
          </span>
          <div className="flex gap-2">
            <button
              type="button"
              onClick={() => scrollBySlide(-1)}
              disabled={!carousel.canPrev}
              className={carouselArrowClass}
              aria-label="Prethodne fotografije"
            >
              <ChevronLeft className="size-5" aria-hidden />
            </button>
            <button
              type="button"
              onClick={() => scrollBySlide(1)}
              disabled={!carousel.canNext}
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
