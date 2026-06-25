"use client";

import { useState } from "react";
import { ChevronRight } from "lucide-react";

import { BauenCtaLink } from "@/components/bauen-cta-button";
import { Reveal } from "@/components/reveal";
import { ServiceStyleShowcase } from "@/components/service-style-showcase";
import { SiteContainer } from "@/components/site-container";
import { SECTION_WATERMARK_STROKE_INLINE_LG } from "@/components/section-watermark";
import { siteImages } from "@/lib/site-images";
import { cn } from "@/lib/utils";

const tabs = [
  {
    id: "visokogradnja",
    label: "Visokogradnja",
    title:
      "Projektujemo i realizujemo stambene, poslovne i industrijske objekte — od temelja do završnih radova.",
    bullets: [
      "Stambene i poslovne zgrade",
      "Industrijski objekti i magacini",
      "Kompletni građevinski i zanatski radovi",
    ],
    paragraphs: [
      "Naš sistem izgradnje ubrzava čitav proces tako da se svi projekti završavaju na vreme a da pritom ostajemo dosledni trajnom kvalitetu što za klijente ima dugoročne prednosti. Operativni troškovi i troškovi održavanja objekata su značajno niži jer je konstrukcija čvrsta i snažna i zadržava svoj prvobitni izgled dugi niz godina.",
    ],
    image: siteImages.home.serviceConstruction,
    imageAlt: "Visokogradnja — objekat u izgradnji",
  },
  {
    id: "niskogradnja",
    label: "Niskogradnja",
    title:
      "Pripremni radovi, infrastruktura i temelji — siguran temelj za svaki objekat.",
    bullets: [
      "Iskop, nasip i stabilizacija tla",
      "Saobraćajnice i platforme",
      "Temeljne konstrukcije i drenaža",
    ],
    paragraphs: [
      "Povezujemo geotehničke analize sa izvođenjem kako bismo obezbedili stabilnost i dugovečnost objekta.",
      "Radove planiramo u fazama uz jasnu dokumentaciju i kontrolu kvaliteta na terenu.",
    ],
    image: siteImages.home.serviceNiskogradnja,
    imageAlt: "Niskogradnja",
  },
  {
    id: "restauracija",
    label: "Restauracija i održavanje",
    title:
      "Sanacija, rekonstrukcija i održavanje postojećih objekata i infrastrukture.",
    bullets: [
      "Sanacija fasada i krovova",
      "Rekonstrukcija enterijera",
      "Održavanje i periodični pregledi",
    ],
    paragraphs: [
      "Pristupamo osetljivim objektima uz minimalan prekid rada korisnika i jasan plan faza.",
      "Koristimo materijale koji se uklapaju u postojeću strukturu i propise o zaštiti objekata.",
    ],
    image: siteImages.home.serviceRestauracija,
    imageAlt: "Restauracija",
  },
  {
    id: "specijalni",
    label: "Specijalni projekti",
    title:
      "Specijalni i nestandardni građevinski zadaci — od logistike do složenih intervencija.",
    bullets: [
      "Specijalni transport i montaža",
      "Rad u urbanom jezgru",
      "Projekti pod posebnim režimima",
    ],
    paragraphs: [
      "Tim inženjera prilagođava tehnologije uslovima terena i rokovima investitora.",
      "Koordinacija sa nadležnim institucijama i podizvođačima ide kroz jednu tačku kontakta.",
    ],
    image: siteImages.home.serviceSpecijalni,
    imageAlt: "Specijalni projekti",
  },
] as const;

export function HomeServices() {
  const [active, setActive] =
    useState<(typeof tabs)[number]["id"]>("visokogradnja");
  const current = tabs.find((t) => t.id === active) ?? tabs[0];

  return (
    <section className="relative scroll-mt-24 overflow-hidden bg-background pt-12 pb-24 md:pt-16 md:pb-32">
      <SiteContainer className="relative z-1">
        <div className="relative mb-10 overflow-hidden md:mb-14 md:min-h-[min(14rem,36vw)]">
          <div
            className="pointer-events-none absolute inset-0 z-0 hidden w-full select-none items-center overflow-hidden md:flex"
            aria-hidden
          >
            <div className="flex w-full translate-x-[-6%] items-center justify-between gap-1 px-0 font-heading text-[clamp(4.5rem,22vw,15rem)] font-normal uppercase leading-none sm:translate-x-0 sm:px-1">
              {(["B", "A", "U", "E", "N"] as const).map((ch) => (
                <span
                  key={ch}
                  className="relative grid min-w-0 flex-[1_1_0%] place-items-center"
                >
                  <span
                    className="col-start-1 row-start-1 text-transparent"
                    style={{
                      WebkitTextStroke: SECTION_WATERMARK_STROKE_INLINE_LG,
                    }}
                  >
                    {ch}
                  </span>
                </span>
              ))}
            </div>
          </div>
          <div className="relative z-10 text-left">
            <Reveal variant="fade-up" duration={800}>
              <h2 className="font-heading text-[clamp(2.25rem,5vw,3.875rem)] font-normal leading-[1.1] text-primary lg:text-[62px]">
                Naše Usluge
              </h2>
            </Reveal>
            <Reveal variant="fade-up" delay={120} duration={800}>
              <p className="mt-4 w-full self-stretch font-sans text-xl font-medium leading-[1.2] text-neutral-600 md:text-2xl">
                Kompletna rešenja u oblasti visokogradnje, niskogradnje i
                specijalizovanih građevinskih radova.
              </p>
            </Reveal>
          </div>
        </div>

        <div
          className="-mx-4 mt-10 flex flex-nowrap gap-0 overflow-x-auto border-b border-white/10 px-4 scrollbar-none [-ms-overflow-style:none] [&::-webkit-scrollbar]:hidden lg:mx-0 lg:w-full lg:justify-between lg:overflow-visible lg:px-0"
          role="tablist"
          aria-label="Kategorije usluga"
        >
          {tabs.map((tab) => (
            <button
              key={tab.id}
              type="button"
              role="tab"
              aria-selected={active === tab.id}
              onClick={() => setActive(tab.id)}
              className={cn(
                "relative shrink-0 whitespace-nowrap border-b-2 border-transparent px-3 py-6 font-sans text-xl font-medium transition-colors md:px-5",
                active === tab.id
                  ? "text-primary after:absolute after:-inset-x-1 after:bottom-0 after:z-1 after:border-b-2 after:border-primary md:after:-inset-x-2"
                  : "text-neutral-600 hover:text-neutral-400",
              )}
            >
              {tab.label}
            </button>
          ))}
        </div>

        <Reveal variant="fade-up" delay={200} duration={900} className="mt-14">
          <ServiceStyleShowcase
            image={current.image}
            imageAlt={current.imageAlt}
            imageKey={current.id}
          >
            <p className="font-heading text-xl font-normal leading-[1.2] text-primary lg:text-2xl">
              {current.title}
            </p>
            <ul className="flex flex-col gap-4">
              {current.bullets.map((item) => (
                <li key={item} className="flex items-center gap-2">
                  <span
                    className="size-1.5 shrink-0 rounded-[1px] bg-primary"
                    aria-hidden
                  />
                  <span className="font-sans text-base leading-[22px] text-neutral-200">
                    {item}
                  </span>
                </li>
              ))}
            </ul>
            <div className="flex flex-col gap-4">
              {current.paragraphs.map((p, i) => (
                <p
                  key={i}
                  className="font-sans text-base leading-[22px] text-neutral-200"
                >
                  {p}
                </p>
              ))}
            </div>
            <div className="pt-2">
              <BauenCtaLink href="/projekti" className="px-4">
                PROJEKTI
                <ChevronRight className="size-4 shrink-0" aria-hidden />
              </BauenCtaLink>
            </div>
          </ServiceStyleShowcase>
        </Reveal>
      </SiteContainer>
    </section>
  );
}
