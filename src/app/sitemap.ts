import type { MetadataRoute } from "next";

import { getAllProjectSlugs, getProjectPath } from "@/lib/projects";
import { getSiteUrl } from "@/lib/seo";

export default function sitemap(): MetadataRoute.Sitemap {
  const base = getSiteUrl();
  const lastModified = new Date();
  const staticPaths = [
    "",
    "/o-nama",
    "/projekti",
    "/kontakt",
    "/polisa-privatnosti",
    "/uslovi-koriscenja",
  ];

  const staticEntries = staticPaths.map((path) => ({
    url: `${base}${path}`,
    lastModified,
    changeFrequency: path === "" ? ("weekly" as const) : ("monthly" as const),
    priority: path === "" ? 1 : 0.7,
  }));

  const projectEntries = getAllProjectSlugs().map((slug) => ({
    url: `${base}${getProjectPath(slug)}`,
    lastModified,
    changeFrequency: "monthly" as const,
    priority: 0.8,
  }));

  return [...staticEntries, ...projectEntries];
}
