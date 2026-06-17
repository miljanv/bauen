import Image from "next/image";
import Link from "next/link";
import { ChevronRight } from "lucide-react";

import { BauenCtaLink } from "@/components/bauen-cta-button";
import { HomePromoVideo } from "@/components/home-promo-video";
import { HomeServices } from "@/components/home-services";
import { ProjectSubtractCorners } from "@/components/project-subtract-corners";
import { Reveal } from "@/components/reveal";
import { SiteContainer } from "@/components/site-container";
import { getProjectPath } from "@/lib/projects";
import { siteImages } from "@/lib/site-images";
import { createPageMetadata } from "@/lib/seo";
import { cn } from "@/lib/utils";

export const metadata = createPageMetadata({
  title: "Početna",
  description:
    "Bauen — gradimo pouzdane temelje za vaše ambicije. Visokogradnja, niskogradnja, restauracija i specijalni projekti.",
  path: "/",
});

const FIGMA_VIDEO_COPY =
  "Pridružite nam se dok putujemo kroz vreme i proslavljamo 30 godina uspešnog poslovanja građevinske kompanije BAUEN! Ovaj uzbudljivi promo video predstavlja našu dugogodišnju posvećenost kvalitetu i izvrsnosti u građevinskoj industriji…";

const PROJECT_BODY =
  "Ovaj projekat je bio od presudnog značaja za našu firmu i sigurno možemo reći da je predstavljao prekretnicu u našem poslovanju i od nas načinio firmu koja smo danas. Bez ikakve sumnje to je bio naš najveći projekat do tada i zbog važnosti objekta koji smo sagradili svakako predstavlja naše nasleđe. Kao porodični ljudi koji neguju tradiciju i porodične vrednosti, biti deo ovog projekta je za nas predstavljalo veliku čast ali i obavezu.. Ovaj hram će biti mesto okupljanja za hiljade vernika vekovima u budućnosti.";

const projectCardGlassStyle = {
  backgroundImage:
    "radial-gradient(70.56% 70.56% at 69.32% 29.44%, rgba(82, 115, 164, 0.30) 0%, rgba(152, 174, 216, 0.03) 100%)",
  boxShadow: "inset 0 205px 82px 1px rgba(125, 109, 162, 0.01)",
} as const;

const homeProjects = [
  {
    slug: "radovi-auto-put-milos-veliki",
    title: "Radovi na auto-putu „Miloš Veliki“",
    description: PROJECT_BODY,
    image: siteImages.home.project1,
    alt: "Radovi na auto-putu",
    reverse: false,
  },
  {
    slug: "asfaltna-baza-extra-auto",
    title: "Asfaltna baza za Extra Auto",
    description: PROJECT_BODY,
    image: siteImages.home.project2,
    alt: "Asfaltna baza",
    reverse: true,
  },
  {
    slug: "sportski-centar-zmajevo",
    title: "Sportski centar „Zmajevo“",
    description: PROJECT_BODY,
    image: siteImages.home.project3,
    alt: "Sportski centar",
    reverse: false,
  },
];

export default function HomePage() {
  return (
    <>
      <section className="relative min-h-screen">
        <Image
          src="/illustrations/home_hero.png"
          alt="Ilustracija gradilišta u stilu tehničkog nacrta"
          fill
          priority
          className="object-cover object-center"
          sizes="100vw"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-[rgba(18,17,32,0)] from-[20%] via-background/20 to-background" />
        <SiteContainer className="relative z-[1] flex min-h-screen flex-col items-center px-4 pb-16 pt-28 text-center md:px-6 md:pb-12 md:pt-32">
          <div className="mt-[10vh] flex w-full flex-col items-center">
            <Reveal
              variant="fade-up"
              duration={900}
              className="max-w-[973px] text-balance"
            >
              <h1 className="font-heading text-[clamp(2rem,6vw,3.875rem)] font-normal leading-[1.1] text-white lg:text-[62px]">
                Gradimo pouzdane temelje
              </h1>
              <p className="mt-0 font-sans text-[clamp(2rem,6vw,3.875rem)] font-semibold leading-[1.1] text-primary lg:text-[62px]">
                za vaše ambicije
              </p>
            </Reveal>
            <Reveal
              variant="fade-up"
              delay={250}
              duration={800}
              className="mt-24 flex justify-center md:mt-32 lg:mt-[50vh]"
            >
              <BauenCtaLink href="/o-nama">
                O NAMA
                <ChevronRight className="size-4 shrink-0" aria-hidden />
              </BauenCtaLink>
            </Reveal>
          </div>
        </SiteContainer>
      </section>

      <section
        id="godine"
        className="relative scroll-mt-24 overflow-hidden bg-background py-24 text-left md:py-32"
      >
        <SiteContainer className="relative z-[1]">
          <Reveal variant="fade-up" duration={800}>
            <h2 className="font-heading text-[clamp(2rem,6vw,3.875rem)] font-normal leading-[1.1] text-primary lg:text-[62px]">
              30 uspešnih godina
            </h2>
          </Reveal>
          <Reveal
            variant="fade-up"
            delay={120}
            duration={800}
            className="relative mt-6 flex w-full flex-col"
          >
            <p className="w-full self-stretch font-sans text-2xl font-medium leading-[1.2] text-neutral-600">
              {FIGMA_VIDEO_COPY}
            </p>
            <div
              className="relative z-1 mt-3 -mb-6 w-full md:mt-4 md:-mb-10"
              aria-hidden
            >
              <div
                className={cn(
                  "relative max-w-full max-md:mx-auto",
                  "h-[clamp(41px,calc(75vw*132/845),132px)]",
                  "w-[clamp(260px,75vw,845px)]",
                  "md:[margin-left:max(0px,calc(100%-clamp(260px,75vw,845px)))]",
                )}
              >
                <Image
                  src="/illustrations/since1993.png"
                  alt=""
                  fill
                  className="object-contain object-center md:object-right"
                  sizes="(max-width: 1024px) 75vw, 845px"
                />
              </div>
            </div>
          </Reveal>

          <Reveal
            variant="zoom"
            delay={200}
            duration={900}
            className="relative z-0 mx-auto mt-8 max-w-[1312px] md:mt-10"
          >
            <HomePromoVideo
              posterSrc={siteImages.home.videoSection}
              posterSizes="(max-width:1024px) 100vw, 1312px"
            />
          </Reveal>
        </SiteContainer>
      </section>

      <HomeServices />

      <section
        id="projekti-pocetna"
        className="relative scroll-mt-24 overflow-x-hidden bg-background py-24 md:py-32"
      >
        <SiteContainer className="relative z-[1]">
          <Reveal variant="fade-up" duration={800}>
            <h2 className="font-heading text-[clamp(2.25rem,5vw,3.875rem)] font-normal leading-[1.1] text-primary">
              Naši Projekti
            </h2>
          </Reveal>
          <Reveal variant="fade-up" delay={120} duration={800}>
            <p className="mt-6 max-w-4xl font-sans text-xl font-medium leading-[1.2] text-muted-foreground md:text-2xl">
              Spisak projekata koje smo uradili je sve veći, a mi smo izdvojili
              samo neke od njih o kojima možete pročitati više informacija
            </p>
          </Reveal>

          <div className="mt-20 flex flex-col gap-24 md:gap-48">
            {homeProjects.map((p) => (
              <article
                key={p.slug}
                className="relative mx-auto w-full max-w-[1280px] max-lg:pb-0 lg:pb-44"
              >
                <div
                  className={cn(
                    "relative flex flex-col gap-8 lg:min-h-[529px] lg:flex-row lg:items-center lg:gap-0",
                    p.reverse ? "lg:flex-row-reverse" : "lg:flex-row",
                  )}
                >
                  <Reveal
                    variant={p.reverse ? "fade-left" : "fade-right"}
                    duration={900}
                    className="relative w-full overflow-visible max-lg:h-[271px] lg:aspect-705/529 lg:max-w-[705px] lg:shrink-0"
                  >
                    <Image
                      src={p.image}
                      alt={p.alt}
                      fill
                      className="object-cover"
                      sizes="(max-width:1024px) 100vw, 705px"
                    />
                    <ProjectSubtractCorners
                      variant={p.reverse ? "image-right" : "image-left"}
                      className="max-lg:size-6"
                    />
                  </Reveal>
                  <Reveal
                    variant="fade-up"
                    delay={200}
                    duration={800}
                    style={projectCardGlassStyle}
                    className={cn(
                      "relative z-10 flex w-full flex-col items-start gap-4 rounded-[3px] border border-white/12 backdrop-blur-[10.45px]",
                      "max-lg:w-full max-lg:px-[33px] max-lg:pb-[25px] max-lg:pt-[37px]",
                      "lg:absolute lg:max-w-[518px] lg:px-8 lg:pb-6 lg:pt-9",
                      p.reverse
                        ? "lg:bottom-[-155px] lg:left-[269px] lg:right-auto lg:top-auto lg:mt-0 lg:w-[518px]"
                        : "lg:bottom-[-155px] lg:right-[269px] lg:top-auto lg:mt-0 lg:w-[518px]",
                    )}
                  >
                    <h3 className="font-heading text-2xl font-normal leading-[1.2] text-primary">
                      {p.title}
                    </h3>
                    <p className="font-sans text-base leading-[22px] text-neutral-200">
                      {p.description}
                    </p>
                    <BauenCtaLink
                      href={getProjectPath(p.slug)}
                      className="w-fit px-4"
                    >
                      DETALJNIJE
                      <ChevronRight className="size-4 shrink-0" aria-hidden />
                    </BauenCtaLink>
                  </Reveal>
                </div>
              </article>
            ))}
          </div>

          <Reveal
            variant="fade-up"
            duration={700}
            className="mt-24 flex justify-center md:mt-32"
          >
            <Link
              href="/projekti"
              className="font-nav inline-flex h-[60px] items-center gap-2 border border-primary px-4 text-base font-medium text-neutral-50 transition-colors hover:bg-primary/10"
            >
              POGLEDAJTE SVE NAŠE PROJEKTE
              <ChevronRight className="size-4 shrink-0" aria-hidden />
            </Link>
          </Reveal>
        </SiteContainer>
      </section>
    </>
  );
}
