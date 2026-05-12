"use client";

import Image from "next/image";
import type { StaticImageData } from "next/image";
import { useCallback, useEffect, useRef, useState } from "react";

import { LCornerFrame } from "@/components/l-corner-frame";
import { ProjectSubtractCorners } from "@/components/project-subtract-corners";
import { SiteContainer } from "@/components/site-container";

const SUBTRACT = "/icons/subtract.png";

export type AboutMilestone = {
  year: string;
  text: string;
  image: string | StaticImageData;
  alt: string;
};

export function AboutMilestones({
  milestones,
}: {
  milestones: readonly AboutMilestone[];
}) {
  const sectionRef = useRef<HTMLElement>(null);
  const [progress, setProgress] = useState(0);

  const measure = useCallback(() => {
    const el = sectionRef.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    const scrollY = window.scrollY;
    const top = scrollY + rect.top;
    const h = el.offsetHeight;
    const vh = window.innerHeight;
    const start = top - vh * 0.88;
    const end = top + h - vh * 0.12;
    const raw = (scrollY - start) / Math.max(1, end - start);
    setProgress(Math.min(1, Math.max(0, raw)));
  }, []);

  useEffect(() => {
    measure();
    window.addEventListener("scroll", measure, { passive: true });
    window.addEventListener("resize", measure);
    return () => {
      window.removeEventListener("scroll", measure);
      window.removeEventListener("resize", measure);
    };
  }, [measure]);

  return (
    <section
      ref={sectionRef}
      id="istorija"
      className="relative scroll-mt-24 overflow-x-hidden overflow-y-visible bg-background py-24 md:py-32"
    >
      <SiteContainer className="relative z-[1]">
        <div className="flex gap-6 lg:gap-10">
          <div className="relative hidden w-[54px] shrink-0 flex-col items-center self-stretch lg:flex">
            <div className="relative z-10 mb-2 flex shrink-0 justify-center">
              <Image
                src={SUBTRACT}
                alt=""
                width={32}
                height={32}
                className="object-contain"
              />
            </div>
            <div className="relative mx-auto min-h-[120px] w-1 flex-1 bg-neutral-700">
              <div
                className="absolute left-0 top-0 w-full origin-top bg-primary transition-[height] duration-100 ease-out"
                style={{ height: `${progress * 100}%` }}
              />
            </div>
          </div>

          <ol className="flex flex-1 flex-col gap-20 lg:gap-28">
            {milestones.map((m) => (
              <li key={m.year} className="relative">
                <div className="relative grid grid-cols-1 gap-0 lg:min-h-[579px] lg:grid-cols-12 lg:items-center">
                  <div className="relative aspect-[868/579] w-full overflow-visible lg:col-span-9 lg:col-start-4 lg:row-start-1 lg:h-[579px] lg:aspect-auto">
                    <Image
                      src={m.image}
                      alt={m.alt}
                      fill
                      className="object-cover grayscale"
                      sizes="(max-width:1024px) 100vw, 868px"
                    />
                    <LCornerFrame
                      corners="br"
                      bottomRightAccentClassName="bottom-[-4px] right-[-4px] h-28 w-36 border-b-[6px] border-r-[6px] sm:bottom-[-6px] sm:right-[-6px] sm:h-[90%] sm:w-[60%] sm:border-b-[8px] sm:border-r-[8px]"
                    />
                  </div>
                  <div className="relative z-10 -mt-8 mx-4 flex w-full max-w-[518px] flex-col items-start gap-4 overflow-visible bg-[rgba(20,11,42,0.6)] pt-8 px-8 pb-6 sm:mx-8 lg:col-span-6 lg:col-start-1 lg:row-start-1 lg:mx-0 lg:mt-0 lg:w-[518px] lg:max-w-none lg:self-center">
                    <ProjectSubtractCorners variant="milestone-overlay" />
                    <h2 className="relative z-10 font-heading text-[clamp(2.5rem,5vw,3.875rem)] font-normal leading-[1.1] text-primary">
                      {m.year}
                    </h2>
                    <p className="relative z-10 font-sans text-base leading-[1.25] text-neutral-200">
                      {m.text}
                    </p>
                  </div>
                </div>
              </li>
            ))}
          </ol>
        </div>
      </SiteContainer>
    </section>
  );
}
