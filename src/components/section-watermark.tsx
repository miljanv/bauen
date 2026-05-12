import { cn } from "@/lib/utils";

/** Podrazumevani outline za watermark (isti kao `SectionWatermark` bez props-a). */
export const SECTION_WATERMARK_STROKE_DEFAULT = "1px rgba(255,255,255,0.12)";

/** Kao `SectionWatermark` na početnoj (#godine) — mali ekran. */
export const SECTION_WATERMARK_STROKE_INLINE_SM = "1px rgba(255,255,255,0.16)";

/** Kao `SectionWatermark` na početnoj (#godine) — `lg+`. */
export const SECTION_WATERMARK_STROKE_INLINE_LG = "1.5px rgba(240,89,42,0.26)";

type SectionWatermarkProps = {
  text: string;
  className?: string;
  textClassName?: string;
  /** Classes for the large-breakpoint span when `textStrokeLg` is set (inline layout). */
  textClassNameLg?: string;
  /** Full `-webkit-text-stroke` value (outline only; fill stays transparent). */
  textStroke?: string;
  /** With `layout="inline"`, optional second stroke for `lg` and up (renders one visible line per breakpoint). */
  textStrokeLg?: string;
  placement?: "center" | "bottom-right";
  /** When false, preserves title / mixed case (e.g. "Since 1993"). */
  uppercase?: boolean;
  /** `overlay` fills a positioned ancestor (default). `inline` sits in normal flow (e.g. under body copy). */
  layout?: "overlay" | "inline";
};

export function SectionWatermark({
  text,
  className,
  textClassName,
  textClassNameLg,
  textStroke = SECTION_WATERMARK_STROKE_DEFAULT,
  textStrokeLg,
  placement = "center",
  uppercase = true,
  layout = "overlay",
}: SectionWatermarkProps) {
  const spanTypography = cn(
    "whitespace-nowrap font-heading font-normal leading-none text-transparent text-shadow-none",
    uppercase && "uppercase",
    layout === "inline" || placement === "bottom-right"
      ? "max-w-[min(95vw,56rem)] text-[clamp(3rem,10vw,6.5rem)] lg:text-[clamp(3.75rem,9vw,7.5rem)]"
      : "text-[clamp(3.5rem,14vw,11rem)] sm:text-[clamp(4rem,16vw,12rem)]",
    placement === "bottom-right" && "text-right",
  );

  if (layout === "inline") {
    return (
      <div
        className={cn(
          "pointer-events-none z-0 flex w-full shrink-0 select-none",
          placement === "center" && "justify-center",
          placement === "bottom-right" && "justify-end",
          className,
        )}
        aria-hidden
      >
        {textStrokeLg ? (
          <>
            <span
              className={cn(spanTypography, "lg:hidden", textClassName)}
              style={{ WebkitTextStroke: textStroke }}
            >
              {text}
            </span>
            <span
              className={cn(
                spanTypography,
                "hidden lg:inline",
                textClassNameLg ?? textClassName,
              )}
              style={{ WebkitTextStroke: textStrokeLg }}
            >
              {text}
            </span>
          </>
        ) : (
          <span
            className={cn(spanTypography, textClassName)}
            style={{ WebkitTextStroke: textStroke }}
          >
            {text}
          </span>
        )}
      </div>
    );
  }

  return (
    <div
      className={cn(
        "pointer-events-none absolute inset-0 z-0 flex select-none overflow-hidden",
        placement === "center" && "items-center justify-center",
        placement === "bottom-right" &&
          "items-end justify-end pb-8 pr-5 md:pb-12 md:pr-8 lg:pb-16 lg:pr-12",
        className,
      )}
      aria-hidden
    >
      <span
        className={cn(
          "whitespace-nowrap font-heading font-normal leading-none text-transparent text-shadow-none",
          uppercase && "uppercase",
          "text-[clamp(3.5rem,14vw,11rem)] sm:text-[clamp(4rem,16vw,12rem)]",
          placement === "bottom-right" &&
            "max-w-[min(95vw,56rem)] text-right text-[clamp(3rem,10vw,6.5rem)] lg:text-[clamp(3.75rem,9vw,7.5rem)]",
          textClassName,
        )}
        style={{
          WebkitTextStroke: textStroke,
        }}
      >
        {text}
      </span>
    </div>
  );
}
