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

import { LCornerFrame } from "@/components/l-corner-frame";
import { ProjectSubtractCorners } from "@/components/project-subtract-corners";
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
    "pointer-events-none absolute z-20 flex h-7 w-7 origin-center items-center justify-center sm:h-8 sm:w-8";

  const cornerMotion =
    "transition-[opacity,transform] duration-[420ms] ease-out motion-reduce:transition-none";

  const squareFilter =
    isFirst || a >= 0.998
      ? undefined
      : `brightness(${0.45 + 0.55 * a}) contrast(${1.05 - 0.05 * a}) saturate(${a})`;

  return (
    <div className="relative flex size-[52px] shrink-0 items-center justify-center sm:size-14">
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
              className={c.imgClass}
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
          "relative z-10 h-10 w-10 object-contain transition-[filter,transform] duration-500 ease-out motion-reduce:transition-none",
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
      className="relative scroll-mt-24 overflow-x-hidden overflow-y-visible bg-background py-24 md:py-32"
    >
      <SiteContainer className="relative z-[1]">
        <div ref={rowRef} className="flex gap-6 lg:gap-10">
          <div className="relative hidden w-[54px] shrink-0 flex-col items-center self-stretch pb-2 pt-1 lg:flex">
            {/* Širi wrapper: čvorovi šire od w-1; uska traka sa overflow-hidden samo za narandžastu popunu */}
            <div
              ref={railInnerRef}
              className="relative mx-auto min-h-[160px] w-[54px] flex-1"
            >
              <div
                className="pointer-events-none absolute left-1/2 top-0 bottom-0 z-0 w-1 -translate-x-1/2 overflow-hidden bg-neutral-700"
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

          <ol className="flex flex-1 flex-col gap-20 lg:gap-28">
            {milestones.map((m, i) => (
              <li key={m.year} className="relative">
                <div className="relative grid grid-cols-1 gap-0 ml-10 lg:min-h-[579px] lg:grid-cols-12 lg:items-center">
                  <div className="relative aspect-[868/579] w-full overflow-visible lg:col-span-9 lg:col-start-4 lg:row-start-1 lg:h-[579px] lg:aspect-auto">
                    <div className="absolute inset-x-0 top-30 bottom-0">
                      <div className="relative h-full w-full">
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
                    </div>
                  </div>
                  <div
                    ref={(el) => {
                      contentAnchorRefs.current[i] = el;
                    }}
                    className="relative z-10 -mt-8 mx-4 flex w-full max-w-[518px] flex-col items-start gap-4 overflow-visible bg-[rgba(20,11,42,0.6)] pt-8 px-8 pb-6 sm:mx-8 lg:col-span-6 lg:col-start-1 lg:row-start-1 lg:mx-0 lg:mt-0 lg:w-[518px] lg:max-w-none lg:self-center"
                  >
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
