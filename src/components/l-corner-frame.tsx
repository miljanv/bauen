import { cn } from "@/lib/utils";

/** Podrazumevani donji-desni L (mali, van slike). */
export const LCORNER_DEFAULT_BR_ACCENT =
  "bottom-[-4px] right-[-4px] h-16 w-16 border-b-[6px] border-r-[6px] sm:bottom-[-6px] sm:right-[-6px] sm:h-24 sm:w-24 sm:border-b-[8px] sm:border-r-[8px]";

/** Podrazumevani donji-levi L (veliki, unutra). */
export const LCORNER_DEFAULT_BL_ACCENT =
  "bottom-3 left-3 h-[80%] w-[60%] border-b-[6px] border-l-[6px] sm:bottom-4 sm:left-4 sm:border-b-[8px] sm:border-l-[8px]";

const LCORNER_DEFAULT_TL = "left-0 top-0 h-12 w-12 border-l-2 border-t-2 sm:h-16 sm:w-16";

const LCORNER_DEFAULT_THIN_BR =
  "bottom-0 right-0 h-12 w-12 border-b-2 border-r-2 sm:h-16 sm:w-16";

export type LCornerFrameProps = {
  className?: string;
  /** Klase za boju ivice (npr. border-primary) */
  colorClassName?: string;
  /**
   * tl-br: tanki L gore levo + tanki dole desno.
   * br: samo donji-desni naglasak.
   * br-bl: donji-desni + donji-levi naglasak.
   */
  corners?: "tl-br" | "br" | "br-bl";

  /** corners br / br-bl — ceo className donjeg-desnog L-a (pozicija, veličina, debljina bordera). */
  bottomRightAccentClassName?: string;
  /** corners br-bl — ceo className donjeg-levog L-a. */
  bottomLeftAccentClassName?: string;

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
  topLeftAccentClassName,
  thinBottomRightAccentClassName,
}: LCornerFrameProps) {
  if (corners === "br" || corners === "br-bl") {
    const br = bottomRightAccentClassName ?? LCORNER_DEFAULT_BR_ACCENT;
    const bl = bottomLeftAccentClassName ?? LCORNER_DEFAULT_BL_ACCENT;

    return (
      <span className={cn("pointer-events-none absolute inset-0 z-10", className)} aria-hidden>
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
    <span className={cn("pointer-events-none absolute inset-0 z-10", className)} aria-hidden>
      <span className={cn("absolute", tl, colorClassName)} />
      <span className={cn("absolute", thinBr, colorClassName)} />
    </span>
  );
}
