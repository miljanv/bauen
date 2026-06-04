import type { ProjectGalleryItem } from "@/lib/projects";

import { ProjectGalleryImage } from "@/components/project-gallery-image";
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

  return (
    <section className="bg-background py-16 md:py-20" aria-label="Galerija projekta">
      <SiteContainer className="flex flex-col gap-8 px-4 md:gap-8 md:px-8">
        {rows.map((row, rowIndex) => {
          if (row.length === 1 && row[0].layout === "full") {
            const item = row[0];
            return (
              <div
                key={`${item.src}-full-${rowIndex}`}
                className="relative aspect-1440/954 w-full overflow-hidden"
              >
                <ProjectGalleryImage
                  src={item.src}
                  alt={item.alt}
                  sizes="100vw"
                  priority={rowIndex === 0}
                />
              </div>
            );
          }

          return (
            <div
              key={`row-${rowIndex}`}
              className="grid grid-cols-1 gap-8 md:grid-cols-2 md:gap-8"
            >
              {row.map((item) => (
                <div
                  key={`${item.src}-${rowIndex}`}
                  className="relative aspect-673/897 w-full overflow-hidden"
                >
                  <ProjectGalleryImage
                    src={item.src}
                    alt={item.alt}
                    sizes="(max-width: 768px) 100vw, 50vw"
                  />
                </div>
              ))}
            </div>
          );
        })}
      </SiteContainer>
    </section>
  );
}
