"use client";

import Image from "next/image";
import Link from "next/link";
import { ChevronRight } from "lucide-react";
import { useState } from "react";

import { ProjectSubtractCorners } from "@/components/project-subtract-corners";
import { Reveal } from "@/components/reveal";
import { SiteContainer } from "@/components/site-container";
import { getProjectPath, projects } from "@/lib/projects";
import { cn } from "@/lib/utils";

const CATEGORY_COPY = {
  visokogradnja: {
    label: "Visokogradnja",
    description:
      "Obavljamo sve poslove koji spadaju u domen visoke gradnje kao što su izgradnja stambenih zgrada, poslovnih prostora, kuća, magacina i zgrada drugih tipova i profila. Naš tim stručnjaka je spreman da u svakom trenutku pruži potrebnu ekspertizu bilo da se radi o sopstvenim ili poručenim projektima. Pružamo i komplet usluga od grubih gradjevinskih radova, pa do svih vrsta zanatskih radova.",
  },
  niskogradnja: {
    label: "Niskogradnja",
    description:
      "Realizujemo porodične kuće, poslovne objekte manjeg obima, industrijske hale i prateću infrastrukturu. Planiranje, izvođenje i predaja ključ u ruke uz jasne rokove i transparentan budžet.",
  },
  restauracija: {
    label: "Restauracija i održavanje",
    description:
      "Sanacije fasada, krovova i enterijera, jačanje konstrukcija i adaptacije postojećih objekata u skladu sa propisima. Održavanje nakon predaje produžava vek trajanja i štedi troškove u dugom roku.",
  },
  specijalni: {
    label: "Specijalni projekti",
    description:
      "Kompleksni zahtevi, nestandardne geometrije i logistički zahtevna gradilišta — kombinujemo iskustvo inženjera i izvođača da isporučimo rešenje prilagođeno lokaciji i investitoru.",
  },
} as const;

type CategoryId = keyof typeof CATEGORY_COPY;

const projectCardGlassStyle = {
  backgroundImage:
    "radial-gradient(70.56% 70.56% at 69.32% 29.44%, rgba(82, 115, 164, 0.30) 0%, rgba(152, 174, 216, 0.03) 100%)",
  boxShadow: "inset 0 205px 82px 1px rgba(125, 109, 162, 0.01)",
} as const;

const showcaseSlugs = [
  "gradjevinski-radovi-balkanski-tok",
  "radovi-auto-put-milos-veliki",
  "asfaltna-baza-extra-auto",
  "sportski-centar-zmajevo",
] as const;

const showcaseProjects = showcaseSlugs
  .map((slug) => projects.find((p) => p.slug === slug))
  .filter((p): p is NonNullable<typeof p> => Boolean(p))
  .map((p, index) => ({
    slug: p.slug,
    title: p.title,
    description: p.summaryShort,
    image: p.heroImage,
    alt: p.heroImageAlt,
    reverse: index % 2 === 1,
  }));

export function ProjektiPortfolio() {
  const [active, setActive] = useState<CategoryId>("visokogradnja");
  const activeCopy = CATEGORY_COPY[active];
  const categories = Object.entries(CATEGORY_COPY) as [
    CategoryId,
    (typeof CATEGORY_COPY)[CategoryId],
  ][];

  return (
    <section className="border-b border-white/10 bg-background py-20 md:py-28">
      <SiteContainer>
        <h2 className="font-heading text-[clamp(2.25rem,5vw,3.875rem)] font-normal leading-[1.1] text-primary">
          Projekti
        </h2>

        <div
          className="mt-6 flex flex-col gap-4 border-b border-white/10 md:mt-8 md:flex-row md:flex-wrap md:items-end md:justify-between md:gap-0"
          role="tablist"
          aria-label="Kategorije projekata"
        >
          {categories.map(([id, { label }]) => {
            const selected = active === id;
            return (
              <button
                key={id}
                type="button"
                role="tab"
                aria-selected={selected}
                id={`projekti-tab-${id}`}
                aria-controls={`projekti-panel-${id}`}
                onClick={() => setActive(id)}
                className={cn(
                  "shrink-0 border-b-2 px-4 py-6 text-left font-sans text-2xl font-medium leading-[1.1] transition-colors md:px-4 md:text-[32px]",
                  selected
                    ? "border-primary text-primary"
                    : "border-transparent text-neutral-700 hover:text-neutral-500",
                )}
              >
                {label}
              </button>
            );
          })}
        </div>

        <p
          id={`projekti-panel-${active}`}
          role="tabpanel"
          aria-labelledby={`projekti-tab-${active}`}
          className="font-nav mt-6 text-xl font-medium leading-[1.2] text-neutral-700 md:mt-8 md:text-2xl"
        >
          {activeCopy.description}
        </p>

        <div className="mt-16 flex flex-col gap-32 md:mt-24 md:gap-48">
          {showcaseProjects.map((p) => (
            <article
              key={p.slug}
              className="relative mx-auto w-full max-w-[1280px] pb-36 lg:pb-44"
            >
              <div
                className={cn(
                  "relative min-h-0 lg:min-h-[529px]",
                  p.reverse
                    ? "flex flex-col items-stretch gap-0 lg:flex-row-reverse lg:items-center"
                    : "flex flex-col items-stretch gap-0 lg:flex-row lg:items-center",
                )}
              >
                <Reveal
                  variant={p.reverse ? "fade-left" : "fade-right"}
                  duration={900}
                  className="relative aspect-705/529 w-full overflow-visible lg:max-w-[705px]"
                >
                  <Link href={getProjectPath(p.slug)} className="relative block size-full">
                    <Image
                      src={p.image}
                      alt={p.alt}
                      fill
                      className="object-cover transition-opacity hover:opacity-95"
                      sizes="(max-width:1024px) 100vw, 705px"
                    />
                    <ProjectSubtractCorners
                      variant={p.reverse ? "image-right" : "image-left"}
                    />
                  </Link>
                </Reveal>
                <Reveal
                  variant="fade-up"
                  delay={200}
                  duration={800}
                  style={projectCardGlassStyle}
                  className={cn(
                    "relative z-10 flex w-full max-w-[518px] flex-col items-start gap-4 rounded-[3px] border border-white/12 px-8 pb-6 pt-9 backdrop-blur-[10.45px] max-lg:-mt-6",
                    "max-lg:mx-auto max-lg:max-w-[518px]",
                    p.reverse
                      ? "lg:absolute lg:bottom-[-155px] lg:left-[269px] lg:right-auto lg:top-auto lg:mt-0 lg:w-[518px] lg:max-w-none"
                      : "lg:absolute lg:bottom-[-155px] lg:right-[269px] lg:top-auto lg:mt-0 lg:w-[518px] lg:max-w-none",
                  )}
                >
                  <h3 className="font-heading text-xl font-normal leading-[1.2] text-primary md:text-2xl">
                    <Link
                      href={getProjectPath(p.slug)}
                      className="transition-colors hover:text-primary-300"
                    >
                      {p.title}
                    </Link>
                  </h3>
                  <p className="line-clamp-4 font-sans text-base leading-[22px] text-neutral-200">
                    {p.description}
                  </p>
                  <Link
                    href={getProjectPath(p.slug)}
                    className="inline-flex min-h-[60px] w-fit items-center justify-center gap-2 bg-primary px-4 py-2 text-base font-medium text-primary-foreground transition-colors hover:bg-primary-700 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary"
                  >
                    DETALJNIJE
                    <ChevronRight className="size-4 shrink-0" aria-hidden />
                  </Link>
                </Reveal>
              </div>
            </article>
          ))}
        </div>
      </SiteContainer>
    </section>
  );
}
