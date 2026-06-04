/** Lokalne fotografije u /public/images — ne učitavaju se preko Figma MCP URL-ova. */
export const siteImages = {
  home: {
    videoSection: "/images/home/video-section.png",
    serviceConstruction: "/images/home/service-construction.jpg",
    serviceNiskogradnja: "/images/home/service-niskogradnja.jpg",
    serviceRestauracija: "/images/home/service-restauracija.jpg",
    serviceSpecijalni: "/images/home/service-specijalni.jpg",
    project1: "/images/home/project-1.png",
    project2: "/images/home/project-2.png",
    project3: "/images/home/project-3.png",
  },
  about: {
    hero: "/images/about/hero.jpg",
    construction1: "/images/about/construction-1.jpg",
    construction2: "/images/about/construction-2.jpg",
    construction3: "/images/about/construction-3.jpg",
  },
  projekti: {
    hero: "/images/projekti/hero.jpg",
    projectMilos: "/images/projekti/project-milos.png",
    projectExtraAuto: "/images/projekti/project-extra-auto.png",
    projectZmajevo: "/images/projekti/project-zmajevo.png",
  },
  kontakt: {
    hero: "/images/kontakt/hero.png",
  },
} as const;
