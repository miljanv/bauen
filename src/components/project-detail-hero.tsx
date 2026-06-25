"use client";

import Image from "next/image";
import Link from "next/link";
import { ArrowLeft, ChevronLeft, ChevronRight } from "lucide-react";
import { useCallback, useEffect, useState } from "react";

import { SiteContainer } from "@/components/site-container";

const AUTO_SLIDE_MS = 5000;

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
      <Image
        key={current.src}
        src={current.src}
        alt={current.alt}
        fill
        priority
        className="object-cover transition-opacity duration-500"
        style={{ objectPosition: heroObjectPosition }}
        sizes="100vw"
      />
      <div className="absolute inset-0 bg-black/30" aria-hidden />

      <SiteContainer className="relative z-10 flex flex-col justify-start px-4 pb-16 pt-28 md:px-8 md:pb-20 md:pt-40 lg:pt-48">
        <Link
          href="/projekti"
          className="mb-6 inline-flex min-h-[60px] w-fit items-center gap-2 bg-primary px-4 py-2 font-sans text-base font-medium text-primary-foreground transition-colors hover:bg-primary-700 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary"
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

        {hasMultiple ? (
          <div className="mt-8 flex items-center gap-4">
            <button
              type="button"
              onClick={goPrev}
              className="flex size-12 cursor-pointer items-center justify-center bg-black/30 text-white transition-colors hover:bg-black/50 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary"
              aria-label="Prethodna fotografija"
            >
              <ChevronLeft className="size-6 text-primary" aria-hidden />
            </button>
            <button
              type="button"
              onClick={goNext}
              className="flex size-12 cursor-pointer items-center justify-center bg-black/30 text-white transition-colors hover:bg-black/50 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary"
              aria-label="Sledeća fotografija"
            >
              <ChevronRight className="size-6 text-primary" aria-hidden />
            </button>
          </div>
        ) : null}
      </SiteContainer>
    </section>
  );
}
