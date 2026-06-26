"use client";

import Image from "next/image";
import { useCallback, useEffect, useState } from "react";
import { ChevronLeft, ChevronRight, X } from "lucide-react";

import { cn } from "@/lib/utils";

type GalleryImage = {
  src: string;
  alt: string;
};

type ProjectGalleryLightboxProps = {
  images: GalleryImage[];
  initialIndex: number;
  onClose: () => void;
};

export function ProjectGalleryLightbox({
  images,
  initialIndex,
  onClose,
}: ProjectGalleryLightboxProps) {
  const [index, setIndex] = useState(initialIndex);
  const current = images[index];
  const hasMultiple = images.length > 1;

  const goPrev = useCallback(() => {
    setIndex((i) => (i === 0 ? images.length - 1 : i - 1));
  }, [images.length]);

  const goNext = useCallback(() => {
    setIndex((i) => (i === images.length - 1 ? 0 : i + 1));
  }, [images.length]);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
      if (e.key === "ArrowLeft") goPrev();
      if (e.key === "ArrowRight") goNext();
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [onClose, goPrev, goNext]);

  useEffect(() => {
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = "";
    };
  }, []);

  if (!current) return null;

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/90 p-4 backdrop-blur-sm"
      role="dialog"
      aria-modal="true"
      aria-label={current.alt}
      onClick={onClose}
    >
      <button
        type="button"
        onClick={onClose}
        className="absolute right-4 top-4 z-10 flex size-12 cursor-pointer items-center justify-center bg-primary text-primary-foreground transition-colors hover:bg-primary-700 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary"
        aria-label="Zatvori"
      >
        <X className="size-6" aria-hidden />
      </button>

      {hasMultiple ? (
        <>
          <button
            type="button"
            onClick={(e) => {
              e.stopPropagation();
              goPrev();
            }}
            className="absolute left-4 top-1/2 z-10 flex size-12 -translate-y-1/2 cursor-pointer items-center justify-center bg-black/40 text-primary transition-colors hover:bg-white/25 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary md:left-8"
            aria-label="Prethodna fotografija"
          >
            <ChevronLeft className="size-6" aria-hidden />
          </button>
          <button
            type="button"
            onClick={(e) => {
              e.stopPropagation();
              goNext();
            }}
            className="absolute right-4 top-1/2 z-10 flex size-12 -translate-y-1/2 cursor-pointer items-center justify-center bg-black/40 text-primary transition-colors hover:bg-white/25 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary md:right-8"
            aria-label="Sledeća fotografija"
          >
            <ChevronRight className="size-6" aria-hidden />
          </button>
        </>
      ) : null}

      <div
        className="animate-project-lightbox-in relative max-h-[90vh] w-full max-w-6xl"
        onClick={(e) => e.stopPropagation()}
      >
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={current.src}
          alt={current.alt}
          className="mx-auto max-h-[90vh] w-auto max-w-full object-contain"
        />
        {hasMultiple ? (
          <p className="mt-4 text-center font-sans text-sm text-neutral-400">
            {index + 1} / {images.length}
          </p>
        ) : null}
      </div>
    </div>
  );
}

type ProjectGalleryImageButtonProps = {
  src: string;
  alt: string;
  className?: string;
  sizes: string;
  priority?: boolean;
  index: number;
  onOpen: (index: number) => void;
};

export function ProjectGalleryImageButton({
  src,
  alt,
  className,
  sizes,
  priority,
  index,
  onOpen,
}: ProjectGalleryImageButtonProps) {
  return (
    <button
      type="button"
      onClick={() => onOpen(index)}
      className={cn(
        "group relative block size-full cursor-pointer overflow-hidden bg-background text-left",
        className,
      )}
      aria-label={`Uvećaj fotografiju: ${alt}`}
    >
      <Image
        src={src}
        alt={alt}
        fill
        className="object-cover transition-transform duration-500 group-hover:scale-[1.02]"
        sizes={sizes}
        priority={priority}
      />
      <span
        className="pointer-events-none absolute inset-0 bg-[#00000066] opacity-0 transition-opacity duration-300 ease-out group-hover:opacity-100"
        aria-hidden
      />
      <span
        className="pointer-events-none absolute inset-0 flex items-center justify-center opacity-0 transition-all duration-300 ease-out group-hover:opacity-100"
        aria-hidden
      >
        <span className="scale-75 transition-transform duration-300 ease-out group-hover:scale-100">
          <Image
            src="/icons/zoom-image.png"
            alt=""
            width={59}
            height={63}
            className="h-auto w-[59px] drop-shadow-lg"
          />
        </span>
      </span>
    </button>
  );
}
