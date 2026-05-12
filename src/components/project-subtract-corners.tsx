import Image from "next/image";
import { Fragment } from "react";

import { cn } from "@/lib/utils";

const SUB = "/icons/subtract.png";

/** Unutrašnji ugao — mali razmak od ivice slike (px). */
const INSET = "bottom-3 left-3 sm:bottom-2 sm:left-2";
const INSET_BR = "bottom-3 right-3 sm:bottom-2 sm:right-2";

/** Spoljašnji ugao — pomeraj od ivice slike u „tamnu“ pozadinu. */
const OUT_TR =
  "right-0 top-0 translate-x-2 -translate-y-2 sm:translate-x-3 sm:-translate-y-3";
const OUT_TL =
  "left-0 top-0 -translate-x-2 -translate-y-2 sm:-translate-x-3 sm:-translate-y-3";

const CORNER =
  "pointer-events-none absolute z-20 flex size-[64px] items-end justify-start sm:size-[72px]";

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
};

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
            "left-[-1rem] top-[-1rem] items-start justify-start",
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
            "bottom-[-1rem] left-[-1rem] items-end justify-start",
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
          <SubtractAsset />
        </span>
        <span
          className={cn(CORNER, "items-start justify-end", OUT_TR, className)}
          aria-hidden
        >
          <SubtractAsset className="rotate-180" />
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
        <SubtractAsset className="rotate-90" />
      </span>
      <span
        className={cn(CORNER, INSET_BR, "items-end justify-end", className)}
        aria-hidden
      >
        <SubtractAsset className="-rotate-90" />
      </span>
    </Fragment>
  );
}
