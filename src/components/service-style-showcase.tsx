"use client";

import Image from "next/image";
import type { StaticImageData } from "next/image";

type ServiceStyleShowcaseProps = {
  image: string | StaticImageData;
  imageAlt: string;
  /** Za `key` na `Image` pri promeni izvora (npr. tab usluga). */
  imageKey?: string;
  children: React.ReactNode;
};

/**
 * Isti vizuelni blok kao sekcija „Naše usluge“ na početnoj (#usluge):
 * uokvirena slika + preklopljeni glass panel sa ivicama u `--svc-l` sistemu.
 */
export function ServiceStyleShowcase({
  image,
  imageAlt,
  imageKey,
  children,
}: ServiceStyleShowcaseProps) {
  return (
    <div className="relative w-full overflow-hidden lg:mx-auto lg:w-fit lg:max-w-full">
      <div className="flex w-full flex-col lg:flex-row lg:items-center">
        <div className="relative aspect-1074/706 w-full min-h-[260px] shrink-0 overflow-hidden bg-background [--svc-l:clamp(12px,2.2vw,18px)] lg:aspect-auto lg:h-[min(706px,78vh)] lg:w-[min(705px,48vw)] lg:max-w-[705px]">
          <div
            className="pointer-events-none absolute left-0 top-0 z-0 h-(--svc-l) w-[60%] bg-primary"
            aria-hidden
          />
          <div
            className="pointer-events-none absolute left-0 top-0 z-0 h-[60%] w-(--svc-l) bg-primary"
            aria-hidden
          />
          <div className="absolute top-(--svc-l) left-(--svc-l) right-0 bottom-0 z-10 min-h-0">
            <Image
              src={image}
              alt={imageAlt}
              fill
              className="object-cover"
              sizes="(max-width:1024px) 100vw, 705px"
              key={imageKey ?? imageAlt}
            />
          </div>
        </div>

        <div className="relative z-10 w-full shrink-0 overflow-hidden border-t border-white/10 [--svc-l:clamp(12px,2.2vw,18px)] max-lg:bg-[rgba(20,11,42,0.65)] max-lg:backdrop-blur-[10px] lg:-ml-[min(200px,18vw)] lg:min-h-[min(560px,72vh)] lg:w-[min(518px,42vw)] lg:max-w-[518px] lg:border-t-0">
          <div
            className="pointer-events-none absolute bottom-0 right-0 z-0 hidden h-(--svc-l) w-[40%] bg-primary lg:block"
            aria-hidden
          />
          <div
            className="pointer-events-none absolute bottom-0 right-0 z-0 hidden h-[40%] w-(--svc-l) bg-primary lg:block"
            aria-hidden
          />
          <div className="relative z-10 flex flex-col gap-4 p-6 sm:p-8 lg:absolute lg:inset-0 lg:right-(--svc-l) lg:bottom-(--svc-l) lg:overflow-y-auto lg:border lg:border-white/12 lg:bg-[rgba(20,11,42,0.65)] lg:backdrop-blur-[10px]">
            {children}
          </div>
        </div>
      </div>
    </div>
  );
}
