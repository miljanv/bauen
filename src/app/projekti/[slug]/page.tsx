import type { Metadata } from "next";
import { notFound } from "next/navigation";

import { ProjectDetailView } from "@/components/project-detail-view";
import { ProjectJsonLd } from "@/components/project-json-ld";
import {
  getAllProjectSlugs,
  getProjectBySlug,
  getProjectPath,
} from "@/lib/projects";
import { createPageMetadata, getSiteUrl } from "@/lib/seo";

type PageProps = {
  params: Promise<{ slug: string }>;
};

export function generateStaticParams() {
  return getAllProjectSlugs().map((slug) => ({ slug }));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const project = getProjectBySlug(slug);
  if (!project) {
    return { title: "Projekat nije pronađen" };
  }

  const path = getProjectPath(slug);
  const url = `${getSiteUrl()}${path}`;

  return {
    ...createPageMetadata({
      title: project.seoTitle,
      description: project.seoDescription,
      path,
    }),
    openGraph: {
      title: project.seoTitle,
      description: project.seoDescription,
      url,
      siteName: "Bauen",
      locale: "sr_RS",
      type: "article",
      images: [{ url: project.heroImage, alt: project.heroImageAlt }],
    },
  };
}

export default async function ProjectDetailPage({ params }: PageProps) {
  const { slug } = await params;
  const project = getProjectBySlug(slug);

  if (!project) {
    notFound();
  }

  return (
    <>
      <ProjectJsonLd project={project} />
      <ProjectDetailView project={project} />
    </>
  );
}
