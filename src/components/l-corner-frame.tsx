import { cn } from "@/lib/utils";

/** Podrazumevani donji-desni L (mali, van slike). */
export const LCORNER_DEFAULT_BR_ACCENT =
  "bottom-[-4px] right-[-4px] h-16 w-16 border-b-[6px] border-r-[6px] sm:bottom-[-6px] sm:right-[-6px] sm:h-24 sm:w-24 sm:border-b-[8px] sm:border-r-[8px]";

/** Podrazumevani donji-levi L (veliki, unutra — npr. slike u projektima). */
export const LCORNER_DEFAULT_BL_ACCENT =
  "bottom-3 left-3 h-[80%] w-[60%] border-b-[6px] border-l-[6px] sm:bottom-4 sm:left-4 sm:border-b-[8px] sm:border-l-[8px]";

/**
 * Kontakt — ljubičasta kolona (vanjski BL): deblji L (6px / sm:8px).
 * TR u Figmi — tanak u odnosu na BL kolonu; ovde 1px + kraći ram.
 */
export const LCORNER_CONTACT_OUTSIDE_STROKE_BL =
  "border-b-[6px] border-l-[6px] border-solid sm:border-b-[8px] sm:border-l-[8px]";

/**
 * Kontakt TR: tanka ivica (0.5px = pola od 1px), kraće krake — vizuelno „uža“ od starog w-12/h-12 + border-2.
 */
const LCORNER_FIGMA_CONTACT_STROKE_TR =
  "border-t-[0.5px] border-r-[0.5px] border-solid";
const LCORNER_FIGMA_CONTACT_STROKE_BL_THIN =
  "border-b-2 border-l-2 border-solid sm:border-b-2 sm:border-l-2";

const LCORNER_BL_OUTSIDE_POS =
  "bottom-[-4px] left-[-4px] h-[102px] w-16 sm:bottom-[-6px] sm:left-[-6px] sm:h-[154px] sm:w-24";

/** Donji-levi L van ivice panela (kontakt — ljubičasta kolona). Vertikalna kraka +60% vs h-16/h-24. */
export const LCORNER_DEFAULT_BL_OUTSIDE = cn(
  LCORNER_BL_OUTSIDE_POS,
  LCORNER_CONTACT_OUTSIDE_STROKE_BL,
);

const LCORNER_BL_OUTSIDE_3X_POS =
  "bottom-[-4px] left-[-4px] h-[306px] w-16 sm:bottom-[-6px] sm:left-[-6px] sm:h-[462px] sm:w-24";

/** Isto kao BL_OUTSIDE, vertikalna kraka 3× duža (kontakt — eksplicitna scena). */
export const LCORNER_BL_OUTSIDE_3X_VERTICAL = cn(
  LCORNER_BL_OUTSIDE_3X_POS,
  LCORNER_CONTACT_OUTSIDE_STROKE_BL,
);

/** Ogledalo BL stroke (6px/8px), gore desno; obe krake iste dužine (50% bivše vertikale 306/462 → kvadrat). */
const LCORNER_TR_OUTSIDE_3X_POS =
  "top-[-4px] right-[-4px] size-[153px] sm:top-[-6px] sm:right-[-6px] sm:size-[231px]";

const LCORNER_CONTACT_OUTSIDE_STROKE_TR_THICK =
  "border-t-[6px] border-r-[6px] border-solid sm:border-t-[8px] sm:border-r-[8px]";

export const LCORNER_TR_OUTSIDE_3X_VERTICAL = cn(
  LCORNER_TR_OUTSIDE_3X_POS,
  LCORNER_CONTACT_OUTSIDE_STROKE_TR_THICK,
);

/**
 * Mobilni kontakt: TR / BL van panela, flush uz spoljašnji ugao (bez translate),
 * debljina 6px / sm:8px kao ljubičasta kolona.
 */
export const LCORNER_CONTACT_MOBILE_TR_OUTSIDE = cn(
  "top-[-4px] right-[-4px] h-16 w-16 border-t-[6px] border-r-[6px] border-solid sm:top-[-6px] sm:right-[-6px] sm:h-24 sm:w-24 sm:border-t-[8px] sm:border-r-[8px]",
);

export const LCORNER_CONTACT_MOBILE_BL_OUTSIDE = cn(
  "bottom-[-4px] left-[-4px] h-16 w-16 border-b-[6px] border-l-[6px] border-solid sm:bottom-[-6px] sm:left-[-6px] sm:h-24 sm:w-24 sm:border-b-[8px] sm:border-l-[8px]",
);

const LCORNER_DEFAULT_TL =
  "left-0 top-0 h-12 w-12 border-l-2 border-t-2 sm:h-16 sm:w-16";

const LCORNER_DEFAULT_THIN_BR =
  "bottom-0 right-0 h-12 w-12 border-b-2 border-r-2 sm:h-16 sm:w-16";

/** Kontakt TR: kraći ram (už L), blagi pomak van kutije. */
const LCORNER_TR_POS_FIGMA =
  "right-0 top-0 h-8 w-8 translate-x-1 -translate-y-1 sm:h-10 sm:w-10 sm:translate-x-1.5 sm:-translate-y-1.5";

/** Figma: BL tanki L u paru tr-bl (spoljašnji okvir klastera). */
const LCORNER_TR_BL_BL_POS_FIGMA =
  "bottom-0 left-0 h-12 w-12 -translate-x-2 translate-y-2 sm:h-16 sm:w-16 sm:-translate-x-3 sm:translate-y-3";

/** Kontakt forma / klaster: TR tanki (Figma). */
const LCORNER_TR_BL_TR = cn(
  LCORNER_TR_POS_FIGMA,
  LCORNER_FIGMA_CONTACT_STROKE_TR,
);

/** Par tr-bl: donji-levi tanaki L (kad se koristi ceo par). */
const LCORNER_TR_BL_BL = cn(
  LCORNER_TR_BL_BL_POS_FIGMA,
  LCORNER_FIGMA_CONTACT_STROKE_BL_THIN,
);

/** Eksplicitni TR kao u Figmi — za import na kontaktu (isto što i podrazumevani `corners="tr"`). */
export const LCORNER_CONTACT_TR_FRAME = LCORNER_TR_BL_TR;

export type LCornerFrameProps = {
  className?: string;
  /** Klase za boju ivice (npr. border-primary) */
  colorClassName?: string;
  /**
   * tl-br: tanki L gore levo + tanki dole desno.
   * tr-bl: tanki L gore desno + dole levo (Figma 131:3575, 2px).
   * br: samo donji-desni naglasak.
   * br-bl: donji-desni + donji-levi naglasak.
   * bl: samo donji-levi naglasak van ljubičaste kolone (deblji 6px/8px).
   * tr: samo gornji-desni naglasak na form panelu (0.5px, kraći L od starog).
   */
  corners?: "tl-br" | "tr-bl" | "br" | "br-bl" | "bl" | "tr";

  /** corners br / br-bl — ceo className donjeg-desnog L-a (pozicija, veličina, debljina bordera). */
  bottomRightAccentClassName?: string;
  /** corners br-bl — ceo className donjeg-levog L-a. */
  bottomLeftAccentClassName?: string;

  /** corners tr / tr-bl — ceo className gornjeg-desnog L-a (npr. LCORNER_CONTACT_TR_FRAME). */
  topRightAccentClassName?: string;

  /** corners tl-br — gornji levi */
  topLeftAccentClassName?: string;
  /** corners tl-br — donji desni tanki */
  thinBottomRightAccentClassName?: string;
};

export function LCornerFrame({
  className,
  colorClassName = "border-primary",
  corners = "tl-br",
  bottomRightAccentClassName,
  bottomLeftAccentClassName,
  topRightAccentClassName,
  topLeftAccentClassName,
  thinBottomRightAccentClassName,
}: LCornerFrameProps) {
  if (corners === "tr-bl") {
    const trAccent = topRightAccentClassName ?? LCORNER_TR_BL_TR;
    return (
      <span
        className={cn("pointer-events-none absolute inset-0 z-10", className)}
        aria-hidden
      >
        <span className={cn("absolute", trAccent, colorClassName)} />
        <span className={cn("absolute", LCORNER_TR_BL_BL, colorClassName)} />
      </span>
    );
  }

  if (corners === "tr") {
    const trAccent = topRightAccentClassName ?? LCORNER_TR_BL_TR;
    return (
      <span
        className={cn("pointer-events-none absolute inset-0 z-10", className)}
        aria-hidden
      >
        <span className={cn("absolute", trAccent, colorClassName)} />
      </span>
    );
  }

  if (corners === "bl") {
    const bl = bottomLeftAccentClassName ?? LCORNER_DEFAULT_BL_OUTSIDE;
    return (
      <span
        className={cn("pointer-events-none absolute inset-0 z-10", className)}
        aria-hidden
      >
        <span className={cn("absolute", bl, colorClassName)} />
      </span>
    );
  }

  if (corners === "br" || corners === "br-bl") {
    const br = bottomRightAccentClassName ?? LCORNER_DEFAULT_BR_ACCENT;
    const bl = bottomLeftAccentClassName ?? LCORNER_DEFAULT_BL_ACCENT;

    return (
      <span
        className={cn("pointer-events-none absolute inset-0 z-10", className)}
        aria-hidden
      >
        {corners === "br-bl" ? (
          <span className={cn("absolute", bl, colorClassName)} />
        ) : null}
        <span className={cn("absolute", br, colorClassName)} />
      </span>
    );
  }

  const tl = topLeftAccentClassName ?? LCORNER_DEFAULT_TL;
  const thinBr = thinBottomRightAccentClassName ?? LCORNER_DEFAULT_THIN_BR;

  return (
    <span
      className={cn("pointer-events-none absolute inset-0 z-10", className)}
      aria-hidden
    >
      <span className={cn("absolute", tl, colorClassName)} />
      <span className={cn("absolute", thinBr, colorClassName)} />
    </span>
  );
}
