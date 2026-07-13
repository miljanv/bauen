"use client";

import Image from "next/image";
import type { StaticImageData } from "next/image";
import {
  useCallback,
  useEffect,
  useLayoutEffect,
  useRef,
  useState,
} from "react";

import { MilestoneImageBrCorner } from "@/components/milestone-image-br-corner";
import { ProjectSubtractCorners } from "@/components/project-subtract-corners";
import { Reveal } from "@/components/reveal";
import { SiteContainer } from "@/components/site-container";
import { cn } from "@/lib/utils";

const SUBTRACT = "/icons/subtract.png";
const SQUARE = "/icons/square.svg";

function clamp01(value: number) {
  return Math.min(1, Math.max(0, value));
}

function smoothstep01(t: number) {
  const x = clamp01(t);
  return x * x * (3 - 2 * x);
}

function defaultMarkerTopPct(n: number) {
  return Array.from({ length: n }, (_, i) =>
    i === 0 ? 0 : (i / Math.max(1, n - 1)) * 100,
  );
}

/** 0→1 oko merenog položaja čvora na šini (usklađeno sa `progress` → `scaleY`). */
function getMilestoneActivation(
  index: number,
  progress: number,
  n: number,
  markerTopPct: readonly number[],
) {
  if (n <= 1) return 1;
  if (index === 0) return 1;
  const pct = markerTopPct[index] ?? (index / Math.max(1, n - 1)) * 100;
  const threshold = clamp01(pct / 100);
  const blendWidth = 0.12;
  const raw = clamp01((progress - (threshold - blendWidth)) / blendWidth);
  return smoothstep01(raw);
}

const RAIL_CORNERS = [
  {
    key: "tl",
    box: "left-[-2px] top-[-2px] items-start justify-start",
    imgClass: "rotate-90 object-contain",
  },
  {
    key: "tr",
    box: "right-[-2px] top-[-2px] items-start justify-end",
    imgClass: "rotate-180 object-contain",
  },
  {
    key: "bl",
    box: "bottom-[-2px] left-[-2px] items-end justify-start",
    imgClass: "object-contain",
  },
  {
    key: "br",
    box: "bottom-[-2px] right-[-2px] items-end justify-end",
    imgClass: "-rotate-90 object-contain",
  },
] as const;

/** Jedan čvor na šini: prvi uvek `square.svg` + 4× subtract; ostali prate `activation` (boja + uglovi). */
function MilestoneRailMarker({
  index,
  activation,
}: {
  index: number;
  activation: number;
}) {
  const isFirst = index === 0;
  const a = isFirst ? 1 : activation;

  const corner =
    "pointer-events-none absolute z-20 flex h-5 w-5 origin-center items-center justify-center sm:h-7 sm:w-7 lg:h-8 lg:w-8";

  const cornerMotion =
    "transition-[opacity,transform] duration-[420ms] ease-out motion-reduce:transition-none";

  const squareFilter =
    isFirst || a >= 0.998
      ? undefined
      : `brightness(${0.45 + 0.55 * a}) contrast(${1.05 - 0.05 * a}) saturate(${a})`;

  return (
    <div className="relative flex size-10 shrink-0 items-center justify-center sm:size-12 lg:size-14">
      {RAIL_CORNERS.map((c) => {
        const cornerA = isFirst ? 1 : a;
        const cornerScale = 0.86 + 0.14 * cornerA;
        return (
          <span
            key={c.key}
            className={cn(corner, c.box, !isFirst && cornerMotion)}
            style={
              isFirst
                ? undefined
                : {
                    opacity: cornerA,
                    transform: `scale(${cornerScale})`,
                  }
            }
            aria-hidden
          >
            <Image
              src={SUBTRACT}
              alt=""
              width={24}
              height={24}
              className={cn(c.imgClass, "max-lg:h-4 max-lg:w-4")}
            />
          </span>
        );
      })}
      <Image
        src={SQUARE}
        alt=""
        width={36}
        height={36}
        className={cn(
          "relative z-10 h-[34px] w-[34px] object-contain sm:h-[42px] sm:w-[42px] lg:h-[46px] lg:w-[46px] transition-[filter,transform] duration-500 ease-out motion-reduce:transition-none",
          !isFirst &&
            a >= 0.998 &&
            "motion-safe:scale-[1.03] motion-reduce:scale-100",
        )}
        style={squareFilter ? { filter: squareFilter } : undefined}
      />
    </div>
  );
}

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
  const railInnerRef = useRef<HTMLDivElement>(null);
  const rowRef = useRef<HTMLDivElement>(null);
  const contentAnchorRefs = useRef<(HTMLDivElement | null)[]>([]);
  const [progress, setProgress] = useState(0);
  const [markerTopPct, setMarkerTopPct] = useState(() =>
    defaultMarkerTopPct(milestones.length),
  );

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

  const n = milestones.length;

  const markerTopsForRender =
    markerTopPct.length === n ? markerTopPct : defaultMarkerTopPct(n);

  const layoutMilestoneNodes = useCallback(() => {
    const rail = railInnerRef.current;
    if (!rail || rail.offsetHeight < 2) return;

    const railRect = rail.getBoundingClientRect();
    const railH = railRect.height;
    const railTop = railRect.top;

    setMarkerTopPct(() =>
      milestones.map((_, i) => {
        if (i === 0) return 0;
        const anchor = contentAnchorRefs.current[i];
        if (!anchor) return defaultMarkerTopPct(n)[i]!;
        const anchorTop = anchor.getBoundingClientRect().top;
        const topPx = anchorTop - railTop;
        return Math.min(100, Math.max(0, (topPx / railH) * 100));
      }),
    );
  }, [milestones, n]);

  useLayoutEffect(() => {
    layoutMilestoneNodes();
    const ro = new ResizeObserver(() => {
      requestAnimationFrame(layoutMilestoneNodes);
    });
    const row = rowRef.current;
    const section = sectionRef.current;
    if (row) ro.observe(row);
    if (section) ro.observe(section);
    window.addEventListener("resize", layoutMilestoneNodes);
    return () => {
      ro.disconnect();
      window.removeEventListener("resize", layoutMilestoneNodes);
    };
  }, [layoutMilestoneNodes]);

  return (
    <section
      ref={sectionRef}
      id="istorija"
      className="relative scroll-mt-24 overflow-x-hidden overflow-y-visible bg-background py-16 md:py-24 lg:py-32"
    >
      <Reveal variant="fade-up" duration={1000}>
        <SiteContainer className="relative z-1 max-lg:px-6 sm:max-lg:px-8">
          <div ref={rowRef} className="flex gap-3 sm:gap-4 lg:gap-10">
            <div className="relative flex w-10 shrink-0 flex-col items-center self-stretch pb-2 pt-1 sm:w-12 lg:w-[54px]">
              <div
                ref={railInnerRef}
                className="relative mx-auto min-h-[120px] w-full flex-1 sm:min-h-[160px]"
              >
                <div
                  className="pointer-events-none absolute left-1/2 top-5 bottom-0 z-0 w-px -translate-x-1/2 overflow-hidden bg-neutral-700 sm:top-6 sm:w-1 lg:top-7"
                  aria-hidden
                >
                  <div
                    className="absolute left-0 top-0 h-full w-full origin-top bg-primary will-change-transform"
                    style={{ transform: `scaleY(${progress})` }}
                  />
                </div>
                {milestones.map((m, i) => (
                  <div
                    key={m.year}
                    className="absolute left-1/2 z-10 -translate-x-1/2"
                    style={{ top: `${markerTopsForRender[i] ?? 0}%` }}
                  >
                    <MilestoneRailMarker
                      index={i}
                      activation={getMilestoneActivation(
                        i,
                        progress,
                        n,
                        markerTopsForRender,
                      )}
                    />
                  </div>
                ))}
              </div>
            </div>

            <ol className="flex min-w-0 flex-1 flex-col gap-24 md:gap-32 lg:gap-44">
              {milestones.map((m, i) => (
                <li key={m.year} className="relative">
                  <div className="corner-hover-row relative flex flex-col lg:grid lg:min-h-[579px] lg:grid-cols-12 lg:items-center">
                    <div
                      ref={(el) => {
                        contentAnchorRefs.current[i] = el;
                      }}
                      className="relative z-10 -mb-6 mx-auto flex w-[65%] max-w-[65%] flex-col items-start gap-3 overflow-visible bg-[rgba(20,11,42,0.6)] px-5 pb-5 pt-6 sm:gap-4 sm:px-6 sm:pb-6 sm:pt-7 lg:col-span-6 lg:col-start-1 lg:row-start-1 lg:mb-0 lg:mx-0 lg:w-[518px] lg:max-w-none lg:self-center lg:px-8 lg:pb-6 lg:pt-8"
                    >
                      <ProjectSubtractCorners
                        variant="milestone-overlay"
                        className="max-lg:size-8"
                        hoverFx
                      />
                      <h2 className="relative z-10 font-heading text-[2.125rem] font-normal leading-[1.1] text-primary sm:text-[2.35rem] lg:text-[clamp(2.5rem,5vw,3.875rem)]">
                        {m.year}
                      </h2>
                      <p className="relative z-10 font-sans text-[0.9375rem] leading-[21px] text-neutral-200 sm:text-base sm:leading-[22px]">
                        {m.text}
                      </p>
                    </div>

                    <div className="corner-hover-zone relative h-[220px] w-full sm:h-[260px] lg:col-span-9 lg:col-start-4 lg:row-start-1 lg:aspect-auto lg:h-[579px]">
                      <div className="relative h-full w-full">
                        <div className="absolute inset-0 overflow-hidden">
                          <Image
                            src={m.image}
                            alt={m.alt}
                            fill
                            className="corner-hover-zoom-target object-cover grayscale"
                            sizes="(max-width:1024px) 100vw, 868px"
                          />
                        </div>
                        <MilestoneImageBrCorner />
                      </div>
                    </div>
                  </div>
                </li>
              ))}
            </ol>
          </div>
        </SiteContainer>
      </Reveal>
    </section>
  );
}
