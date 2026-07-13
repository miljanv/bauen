import Link from "next/link";
import type { ComponentProps } from "react";

import { cn } from "@/lib/utils";

const ctaClass =
  "font-sans inline-flex min-h-[44px] items-center justify-center gap-2 bg-primary px-4 py-2 text-center text-sm font-medium text-primary-foreground transition-colors hover:bg-primary-700 active:bg-primary-900 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 focus-visible:ring-offset-background md:min-h-[60px] md:px-8 md:text-base";

/** Secondary / outline action buttons (bordered). */
export const outlineActionButtonClass =
  "font-sans inline-flex min-h-[44px] items-center justify-center gap-2 px-4 text-center text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 focus-visible:ring-offset-background md:min-h-[60px] md:text-base";

/** Square icon-only controls (gallery arrows, close, etc.). */
export const iconActionButtonClass =
  "flex size-10 cursor-pointer items-center justify-center transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary md:size-12";

export function BauenCtaLink({
  className,
  href,
  children,
  ...props
}: ComponentProps<typeof Link>) {
  return (
    <Link href={href} className={cn(ctaClass, className)} {...props}>
      {children}
    </Link>
  );
}

export function BauenCtaButton({
  className,
  type = "button",
  ...props
}: ComponentProps<"button">) {
  return <button type={type} className={cn(ctaClass, className)} {...props} />;
}
