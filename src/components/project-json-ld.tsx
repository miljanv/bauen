import type { Project } from "@/lib/projects";
import { getProjectPath } from "@/lib/projects";
import { getSiteUrl } from "@/lib/seo";

type ProjectJsonLdProps = {
  project: Project;
};

export function ProjectJsonLd({ project }: ProjectJsonLdProps) {
  const url = `${getSiteUrl()}${getProjectPath(project.slug)}`;

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "CreativeWork",
    name: project.title,
    description: project.seoDescription,
    url,
    image: `${getSiteUrl()}${project.heroImage}`,
    about: project.category,
    inLanguage: "sr",
    creator: {
      "@type": "Organization",
      name: "Bauen",
    },
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
    />
  );
}
