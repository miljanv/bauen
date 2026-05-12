import Link from "next/link";
import type { ComponentProps } from "react";

import { cn } from "@/lib/utils";

const ctaClass =
  "inline-flex min-h-[60px] items-center justify-center gap-2 bg-primary px-8 py-2 text-center text-base font-medium text-primary-foreground transition-colors hover:bg-primary-700 active:bg-primary-900 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 focus-visible:ring-offset-background";

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
