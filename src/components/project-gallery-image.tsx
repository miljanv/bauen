"use client";

import Image from "next/image";
import { useCallback, useState } from "react";
import { X } from "lucide-react";

import { cn } from "@/lib/utils";

type ProjectGalleryImageProps = {
  src: string;
  alt: string;
  className?: string;
  sizes: string;
  priority?: boolean;
};

export function ProjectGalleryImage({
  src,
  alt,
  className,
  sizes,
  priority,
}: ProjectGalleryImageProps) {
  const [lightboxOpen, setLightboxOpen] = useState(false);

  const close = useCallback(() => setLightboxOpen(false), []);

  return (
    <>
      <button
        type="button"
        onClick={() => setLightboxOpen(true)}
        className={cn(
          "group relative block size-full overflow-hidden bg-background text-left",
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

      {lightboxOpen ? (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/90 p-4 backdrop-blur-sm"
          role="dialog"
          aria-modal="true"
          aria-label={alt}
          onClick={close}
        >
          <button
            type="button"
            onClick={close}
            className="absolute right-4 top-4 z-10 flex size-12 items-center justify-center bg-black/40 text-white transition-colors hover:bg-black/60 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary"
            aria-label="Zatvori"
          >
            <X className="size-6" aria-hidden />
          </button>
          <div
            className="animate-project-lightbox-in relative max-h-[90vh] w-full max-w-6xl"
            onClick={(e) => e.stopPropagation()}
          >
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={src}
              alt={alt}
              className="mx-auto max-h-[90vh] w-auto max-w-full object-contain"
            />
          </div>
        </div>
      ) : null}
    </>
  );
}
