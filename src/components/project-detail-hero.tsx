"use client";

import Image from "next/image";
import Link from "next/link";
import { ArrowLeft, ChevronLeft, ChevronRight } from "lucide-react";
import { useCallback, useState } from "react";

import { SiteContainer } from "@/components/site-container";
import { cn } from "@/lib/utils";

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

      {hasMultiple ? (
        <>
          <button
            type="button"
            onClick={goPrev}
            className="absolute bottom-[20%] cursor-pointer left-6 z-20 flex size-12 items-center justify-center bg-black/30 text-white transition-colors hover:bg-black/50 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary md:left-12"
            aria-label="Prethodna fotografija"
          >
            <ChevronLeft className="size-6 text-primary" aria-hidden />
          </button>
          <button
            type="button"
            onClick={goNext}
            className="absolute bottom-[20%] cursor-pointer right-6 z-20 flex size-12 items-center justify-center bg-black/30 text-white transition-colors hover:bg-black/50 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary md:right-12"
            aria-label="Sledeća fotografija"
          >
            <ChevronRight className="size-6  text-primary" aria-hidden />
          </button>
        </>
      ) : null}

      <SiteContainer className="relative z-10 flex min-h-[min(100vh,954px)] flex-col justify-end px-4 pb-16 pt-28 md:px-8 md:pb-20 md:pt-32">
        <Link
          href="/projekti"
          className={cn(
            "mb-6 inline-flex h-10 w-fit items-center gap-2 rounded-3xl bg-[#12141d] px-4 py-2",
            "font-sans text-base font-medium text-primary transition-colors hover:text-primary-300",
            "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary",
          )}
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
      </SiteContainer>
    </section>
  );
}
