"use client";

import Image from "next/image";
import Link from "next/link";
import { ArrowLeft, ChevronLeft, ChevronRight } from "lucide-react";
import { useCallback, useEffect, useState } from "react";

import { iconActionButtonClass } from "@/components/bauen-cta-button";
import { Reveal } from "@/components/reveal";
import { SiteContainer } from "@/components/site-container";
import { cn } from "@/lib/utils";

const AUTO_SLIDE_MS = 3000;

type ProjectDetailHeroProps = {
  title: string;
  subtitle: string;
  images: { src: string; alt: string }[];
  heroObjectPosition?: string;
};

export function ProjectDetailHero({
  title,
  subtitle,
  images,
  heroObjectPosition = "center center",
}: ProjectDetailHeroProps) {
  const [index, setIndex] = useState(0);
  const current = images[index] ?? images[0];
  const hasMultiple = images.length > 1;

  const goPrev = useCallback(() => {
    setIndex((i) => (i === 0 ? images.length - 1 : i - 1));
  }, [images.length]);

  const goNext = useCallback(() => {
    setIndex((i) => (i === images.length - 1 ? 0 : i + 1));
  }, [images.length]);

  useEffect(() => {
    if (!hasMultiple) return;
    const timer = window.setInterval(goNext, AUTO_SLIDE_MS);
    return () => window.clearInterval(timer);
  }, [hasMultiple, goNext]);

  if (!current) return null;

  return (
    <section className="relative min-h-[min(100vh,954px)] overflow-hidden">
      <div className="absolute inset-0">
        {images.map((image, i) => {
          const isActive = i === index;
          return (
            <Image
              key={image.src}
              src={image.src}
              alt={isActive ? image.alt : ""}
              aria-hidden={!isActive}
              fill
              priority={i === 0}
              className={cn(
                "object-cover transition-[opacity,transform] duration-700 ease-[cubic-bezier(0.22,1,0.36,1)] motion-reduce:transition-none motion-reduce:transform-none",
                isActive
                  ? "z-[2] scale-100 opacity-100"
                  : "z-[1] scale-[1.03] opacity-0",
              )}
              style={{ objectPosition: heroObjectPosition }}
              sizes="100vw"
            />
          );
        })}
      </div>
      <div className="absolute inset-0 bg-black/30" aria-hidden />

      <SiteContainer className="relative z-10 flex flex-col justify-start px-4 pb-16 pt-28 md:px-8 md:pb-20 md:pt-40 lg:pt-48">
        <Reveal variant="fade-up" duration={900}>
          <Link
            href="/projekti"
            className="mb-6 inline-flex min-h-[44px] w-fit items-center gap-2 bg-primary px-3 py-2 font-sans text-sm font-medium text-primary-foreground transition-colors hover:bg-primary-700 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary md:min-h-[60px] md:px-4 md:text-base"
          >
            <ArrowLeft className="size-4 shrink-0" aria-hidden />
            NAZAD
          </Link>
          <h1 className="max-w-[1036px] font-heading text-[clamp(2rem,5vw,3.875rem)] font-normal leading-[1.1] text-white lg:text-[62px]">
            {title}
          </h1>
          <p className="mt-4 max-w-[591px] font-sans text-lg font-medium leading-[1.2] text-white md:text-xl">
            {subtitle}
          </p>
        </Reveal>

        {hasMultiple ? (
          <Reveal
            variant="fade-up"
            delay={200}
            duration={800}
            className="mt-8 flex items-center gap-4"
          >
            <button
              type="button"
              onClick={goPrev}
              className={cn(
                iconActionButtonClass,
                "bg-black/30 text-white hover:bg-black/50",
              )}
              aria-label="Prethodna fotografija"
            >
              <ChevronLeft className="size-5 text-primary md:size-6" aria-hidden />
            </button>
            <button
              type="button"
              onClick={goNext}
              className={cn(
                iconActionButtonClass,
                "bg-black/30 text-white hover:bg-black/50",
              )}
              aria-label="Sledeća fotografija"
            >
              <ChevronRight className="size-5 text-primary md:size-6" aria-hidden />
            </button>
          </Reveal>
        ) : null}
      </SiteContainer>
    </section>
  );
}
