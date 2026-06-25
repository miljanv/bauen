import type { Project } from "@/lib/projects";

import { ProjectDetailHero } from "@/components/project-detail-hero";
import { ProjectDetailInfo } from "@/components/project-detail-info";
import { ProjectGallery } from "@/components/project-gallery";

type ProjectDetailViewProps = {
  project: Project;
};

export function ProjectDetailView({ project }: ProjectDetailViewProps) {
  const heroSlides = [
    { src: project.heroImage, alt: project.heroImageAlt },
    ...project.gallery
      .filter((item) => item.src !== project.heroImage)
      .map((item) => ({ src: item.src, alt: item.alt })),
  ];

  return (
    <article>
      <ProjectDetailHero
        title={project.title}
        subtitle={project.subtitle}
        images={heroSlides}
        heroObjectPosition={project.heroObjectPosition}
      />

      <ProjectDetailInfo
        meta={project.meta}
        metaExpanded={project.metaExpanded}
        summaryShort={project.summaryShort}
        summaryParagraphs={project.summaryParagraphs}
      />

      <ProjectGallery items={project.gallery} />
    </article>
  );
}
