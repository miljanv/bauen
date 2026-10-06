import Image from "next/image";

import { cn } from "@/lib/utils";

type BauenLogoProps = {
  className?: string;
  /** Navbar / compact mark */
  variant?: "icon" | "full";
};

const variantConfig = {
  icon: {
    src: "/logo.png" as const,
    width: 43,
    height: 48,
    className: "h-9 w-auto ",
    sizes: "(max-width: 768px) 40px, 48px",
  },
  full: {
    src: "/logo-with-title-white.png" as const,
    width: 287,
    height: 100,
    className: "h-12 w-auto md:h-14",
    sizes: "(max-width: 768px) 220px, 280px",
  },
} as const;

export function BauenLogo({ className, variant = "icon" }: BauenLogoProps) {
  const cfg = variantConfig[variant];
  return (
    <span
      className={cn("relative inline-flex shrink-0 items-center", className)}
    >
      <Image
        src={cfg.src}
        alt="Bauen Građevinsko Preduzeće"
        width={cfg.width}
        height={cfg.height}
        className={cfg.className}
        sizes={cfg.sizes}
        priority={variant === "icon"}
      />
    </span>
  );
}
