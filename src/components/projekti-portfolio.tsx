"use client";

import { useState } from "react";

import { ProjectShowcaseCard } from "@/components/project-showcase-card";
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
    <section className="overflow-x-hidden bg-background py-20 md:py-28">
      <SiteContainer>
        <div
          className="-mx-4 flex flex-nowrap gap-0 overflow-x-auto border-b border-white/10 px-4 scrollbar-none [-ms-overflow-style:none] [&::-webkit-scrollbar]:hidden lg:mx-0 lg:w-full lg:justify-between lg:overflow-visible lg:px-0"
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
                  "relative shrink-0 whitespace-nowrap border-b-2 border-transparent px-3 py-6 font-sans text-xl font-medium transition-colors md:px-5",
                  selected
                    ? "text-primary after:absolute after:-inset-x-1 after:bottom-0 after:z-1 after:border-b-2 after:border-primary md:after:-inset-x-2"
                    : "text-neutral-600 hover:text-neutral-400",
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
          className="font-nav mt-6 text-lg font-medium leading-[1.2] text-neutral-700 md:mt-8 md:text-xl"
        >
          {activeCopy.description}
        </p>

        <div className="mt-16 flex flex-col gap-24 md:mt-24 md:gap-32 lg:gap-40">
          {showcaseProjects.map((p) => (
            <ProjectShowcaseCard
              key={p.slug}
              image={p.image}
              alt={p.alt}
              title={p.title}
              description={p.description}
              href={getProjectPath(p.slug)}
              reverse={p.reverse}
            />
          ))}
        </div>
      </SiteContainer>
    </section>
  );
}
