"use client";

import { useCallback, useState } from "react";

import type { ProjectGalleryItem } from "@/lib/projects";

import {
  ProjectGalleryImageButton,
  ProjectGalleryLightbox,
} from "@/components/project-gallery-lightbox";
import { SiteContainer } from "@/components/site-container";

type ProjectGalleryProps = {
  items: ProjectGalleryItem[];
};

function groupGalleryRows(items: ProjectGalleryItem[]): ProjectGalleryItem[][] {
  const rows: ProjectGalleryItem[][] = [];
  let i = 0;
  while (i < items.length) {
    if (items[i].layout === "full") {
      rows.push([items[i]]);
      i += 1;
    } else {
      const pair = items.slice(i, i + 2);
      rows.push(pair);
      i += pair.length;
    }
  }
  return rows;
}

export function ProjectGallery({ items }: ProjectGalleryProps) {
  const rows = groupGalleryRows(items);
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);

  const imageIndexMap = new Map<string, number>();
  items.forEach((item, i) => {
    imageIndexMap.set(item.src, i);
  });

  const openLightbox = useCallback((index: number) => {
    setLightboxIndex(index);
  }, []);

  const closeLightbox = useCallback(() => {
    setLightboxIndex(null);
  }, []);

  const galleryImages = items.map((item) => ({
    src: item.src,
    alt: item.alt,
  }));

  return (
    <section className="bg-background py-16 md:py-20" aria-label="Galerija projekta">
      <SiteContainer className="flex flex-col gap-8 px-4 md:gap-8 md:px-8">
        {rows.map((row, rowIndex) => {
          if (row.length === 1 && row[0].layout === "full") {
            const item = row[0];
            const index = imageIndexMap.get(item.src) ?? 0;
            return (
              <div
                key={`${item.src}-full-${rowIndex}`}
                className="relative aspect-1440/954 w-full overflow-hidden"
              >
                <ProjectGalleryImageButton
                  src={item.src}
                  alt={item.alt}
                  sizes="100vw"
                  priority={rowIndex === 0}
                  index={index}
                  onOpen={openLightbox}
                />
              </div>
            );
          }

          return (
            <div
              key={`row-${rowIndex}`}
              className="grid grid-cols-1 gap-8 md:grid-cols-2 md:gap-8"
            >
              {row.map((item) => {
                const index = imageIndexMap.get(item.src) ?? 0;
                return (
                  <div
                    key={`${item.src}-${rowIndex}`}
                    className="relative aspect-673/897 w-full overflow-hidden"
                  >
                    <ProjectGalleryImageButton
                      src={item.src}
                      alt={item.alt}
                      sizes="(max-width: 768px) 100vw, 50vw"
                      index={index}
                      onOpen={openLightbox}
                    />
                  </div>
                );
              })}
            </div>
          );
        })}
      </SiteContainer>

      {lightboxIndex !== null ? (
        <ProjectGalleryLightbox
          images={galleryImages}
          initialIndex={lightboxIndex}
          onClose={closeLightbox}
        />
      ) : null}
    </section>
  );
}
