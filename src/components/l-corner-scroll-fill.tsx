"use client";

type LCornerScrollFillProps = {
  /** Krake se „sastaju” u čošku: tl = gore levo, br = dole desno. */
  variant: "tl" | "br";
  /** 0–1 iz `useInViewProgress`. */
  progress: number;
  horizontalBarClassName: string;
  verticalBarClassName: string;
};

/**
 * Iste dve `bg-primary` trake kao u dizajnu — scale animacija pri skrolu
 * (obe kraке rastu prema čošku i sastaju se u njemu).
 */
export function LCornerScrollFill({
  variant,
  progress,
  horizontalBarClassName,
  verticalBarClassName,
}: LCornerScrollFillProps) {
  const p = progress;

  const horizontalStyle =
    variant === "tl"
      ? {
          transform: `scaleX(${p})`,
          transformOrigin: "right top",
        }
      : {
          transform: `scaleX(${p})`,
          transformOrigin: "left bottom",
        };

  const verticalStyle =
    variant === "tl"
      ? {
          transform: `scaleY(${p})`,
          transformOrigin: "left bottom",
        }
      : {
          transform: `scaleY(${p})`,
          transformOrigin: "right top",
        };

  return (
    <>
      <div
        className={horizontalBarClassName}
        style={horizontalStyle}
        aria-hidden
      />
      <div className={verticalBarClassName} style={verticalStyle} aria-hidden />
    </>
  );
}
