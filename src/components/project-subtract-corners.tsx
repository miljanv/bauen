import Image from "next/image";
import { Fragment, type ReactNode } from "react";

import { cn } from "@/lib/utils";

const SUB = "/icons/subtract.png";

/** Unutrašnji ugao — mali razmak od ivice slike (px). */
const INSET = "bottom-2 left-2 sm:bottom-2 sm:left-2 md:bottom-3 md:left-3";
const INSET_BR = "bottom-2 right-2 sm:bottom-2 sm:right-2 md:bottom-3 md:right-3";

/** Spoljašnji ugao — pomeraj od ivice slike u „tamnu“ pozadinu. */
const OUT_TR =
  "right-0 top-0 translate-x-1 -translate-y-1 sm:translate-x-2 sm:-translate-y-2 md:translate-x-3 md:-translate-y-3";
const OUT_TL =
  "left-0 top-0 -translate-x-1 -translate-y-1 sm:-translate-x-2 sm:-translate-y-2 md:-translate-x-3 md:-translate-y-3";

const CORNER =
  "pointer-events-none absolute z-20 flex size-10 items-end justify-start sm:size-12 md:size-[64px] lg:size-[72px]";

/** Glass panel: ugaonik malo veći da L bude čitljiviji na blur panelu. */
const GLASS_CORNER =
  "pointer-events-none absolute z-20 flex size-[52px] items-start justify-start sm:size-14";
const GLASS_CORNER_BR =
  "pointer-events-none absolute z-20 flex size-[52px] items-end justify-end sm:size-14";

/** Milestone tekst panel: subtract u sva četiri ugla, 4px van ivice panela. */
const PANEL_CORNER_BASE =
  "pointer-events-none absolute z-20 flex size-[52px] sm:size-14";

type ProjectSubtractCornersProps = {
  /**
   * Slika levo: BL unutra, TR spolja. Slika desno: TL spolja, BR unutra.
   * Glass hero: TL + BR. Milestone tekst panel: subtract u sva četiri ugla (Figma).
   */
  variant: "image-left" | "image-right" | "glass-tl-br" | "milestone-overlay";
  className?: string;
  /** Zoom na hover — parent `.corner-hover-zone`. */
  hoverFx?: boolean;
};

function CornerZoomInner({
  hoverFx,
  origin,
  delay,
  children,
}: {
  hoverFx: boolean;
  origin: string;
  delay?: string;
  children: ReactNode;
}) {
  if (!hoverFx) {
    return <>{children}</>;
  }

  return (
    <span
      className={cn(
        "corner-hover-fx inline-flex items-[inherit] justify-[inherit]",
        origin,
        delay,
      )}
    >
      {children}
    </span>
  );
}

function SubtractAsset({ className }: { className?: string }) {
  return (
    <Image
      src={SUB}
      alt=""
      width={32}
      height={32}
      className={cn("max-h-full max-w-full object-contain", className)}
    />
  );
}

/**
 * Figma „subtract” — PNG je L u donjem-levom uglu asset-a. Glass panel: gore levo
 * kao spoljašnji ugao (OUT_TL + rotate-90), dole desno van kutije sa malim razmakom
 * od bordera (translate naviše-desno, -rotate-90).
 */
export function ProjectSubtractCorners({
  variant,
  className,
  hoverFx = false,
}: ProjectSubtractCornersProps) {
  if (variant === "glass-tl-br") {
    return (
      <Fragment>
        <span className={cn(GLASS_CORNER, OUT_TL, className)} aria-hidden>
          <SubtractAsset className="rotate-90" />
        </span>
        <span
          className={cn(
            GLASS_CORNER_BR,
            "bottom-0 right-0 translate-x-2 translate-y-2 sm:translate-x-3.5 sm:translate-y-3.5",
            className,
          )}
          aria-hidden
        >
          <SubtractAsset className="-rotate-90" />
        </span>
      </Fragment>
    );
  }

  if (variant === "milestone-overlay") {
    return (
      <Fragment>
        <span
          className={cn(
            PANEL_CORNER_BASE,
            "left-[-0.75rem] top-[-0.75rem] items-start justify-start sm:left-[-1rem] sm:top-[-1rem]",
            className,
          )}
          aria-hidden
        >
          <SubtractAsset className="rotate-90" />
        </span>
        <span
          className={cn(
            PANEL_CORNER_BASE,
            "right-[-1rem] top-[-1rem] items-start justify-end",
            className,
          )}
          aria-hidden
        >
          <SubtractAsset className="rotate-180" />
        </span>
        <span
          className={cn(
            PANEL_CORNER_BASE,
            "bottom-[-0.75rem] left-[-0.75rem] items-end justify-start sm:bottom-[-1rem] sm:left-[-1rem]",
            className,
          )}
          aria-hidden
        >
          <SubtractAsset />
        </span>
        <span
          className={cn(
            PANEL_CORNER_BASE,
            "bottom-[-1rem] right-[-1rem] items-end justify-end",
            className,
          )}
          aria-hidden
        >
          <SubtractAsset className="-rotate-90" />
        </span>
      </Fragment>
    );
  }

  if (variant === "image-left") {
    return (
      <Fragment>
        <span className={cn(CORNER, INSET, className)} aria-hidden>
          <CornerZoomInner hoverFx={hoverFx} origin="origin-bottom-left">
            <SubtractAsset />
          </CornerZoomInner>
        </span>
        <span
          className={cn(CORNER, "items-start justify-end", OUT_TR, className)}
          aria-hidden
        >
          <CornerZoomInner
            hoverFx={hoverFx}
            origin="origin-top-right"
            delay="corner-hover-fx--d1"
          >
            <SubtractAsset className="rotate-180" />
          </CornerZoomInner>
        </span>
      </Fragment>
    );
  }

  return (
    <Fragment>
      <span
        className={cn(CORNER, "items-start justify-start", OUT_TL, className)}
        aria-hidden
      >
        <CornerZoomInner hoverFx={hoverFx} origin="origin-top-left">
          <SubtractAsset className="rotate-90" />
        </CornerZoomInner>
      </span>
      <span
        className={cn(CORNER, INSET_BR, "items-end justify-end", className)}
        aria-hidden
      >
        <CornerZoomInner
          hoverFx={hoverFx}
          origin="origin-bottom-right"
          delay="corner-hover-fx--d1"
        >
          <SubtractAsset className="-rotate-90" />
        </CornerZoomInner>
      </span>
    </Fragment>
  );
}
