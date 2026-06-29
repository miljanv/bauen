"use client";

import Image from "next/image";
import { useCallback, useEffect, useState } from "react";

import { cn } from "@/lib/utils";

const AUTO_SLIDE_MS = 3000;

const HERO_IMAGES = [
  {
    src: "/illustrations/home_hero.png",
    alt: "Ilustracija gradilišta u stilu tehničkog nacrta",
  },
  {
    src: "/illustrations/home_hero_2.png",
    alt: "Ilustracija gradilišta u stilu tehničkog nacrta",
  },
  {
    src: "/illustrations/home_hero_3.png",
    alt: "Ilustracija gradilišta u stilu tehničkog nacrta",
  },
] as const;

export function HomeHeroCarousel() {
  const [index, setIndex] = useState(0);

  const goNext = useCallback(() => {
    setIndex((i) => (i === HERO_IMAGES.length - 1 ? 0 : i + 1));
  }, []);

  useEffect(() => {
    const timer = window.setInterval(goNext, AUTO_SLIDE_MS);
    return () => window.clearInterval(timer);
  }, [goNext]);

  return (
    <div className="absolute inset-0 z-0" aria-hidden>
      {HERO_IMAGES.map((image, i) => {
        const isActive = i === index;
        return (
          <Image
            key={image.src}
            src={image.src}
            alt=""
            fill
            priority={i === 0}
            className={cn(
              "object-cover object-center transition-opacity duration-700 ease-[cubic-bezier(0.22,1,0.36,1)] motion-reduce:transition-none",
              isActive ? "z-[1] opacity-100" : "z-0 opacity-0",
            )}
            sizes="100vw"
          />
        );
      })}
    </div>
  );
}
