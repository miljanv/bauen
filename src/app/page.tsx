import Image from "next/image";
import Link from "next/link";
import { ChevronRight } from "lucide-react";

import { BauenCtaLink, outlineActionButtonClass } from "@/components/bauen-cta-button";
import { HomeHeroCarousel } from "@/components/home-hero-carousel";
import { HomePromoVideo } from "@/components/home-promo-video";
import { HomeServices } from "@/components/home-services";
import { ProjectShowcaseCard } from "@/components/project-showcase-card";
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
  "Ovaj projekat je bio od presudnog značaja za našu firmu i sigurno možemo reći da je predstavljao prekretnicu u našem poslovanju i od nas načinio firmu koja smo danas. Bez ikakve sumnje to je bio naš najveći projekat do tada i zbog važnosti objekta koji smo sagradili svakako predstavlja naše nasleđe.";

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
        <HomeHeroCarousel />
        <div className="pointer-events-none absolute inset-0 z-[1] bg-gradient-to-b from-[rgba(18,17,32,0)] from-[20%] via-background/20 to-background" />
        <SiteContainer className="page-hero-offset relative z-[2] flex min-h-screen flex-col items-center px-4 pb-16 text-center md:px-6 md:pb-12">
          <div className="flex w-full flex-col items-center">
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
              className="mt-24 flex justify-center md:mt-32 lg:mt-16"
            >
              <BauenCtaLink href="/o-nama">
                O NAMA
                <ChevronRight className="size-4 shrink-0" aria-hidden />
              </BauenCtaLink>
            </Reveal>
          </div>
        </SiteContainer>
      </section>

      <Reveal
        as="section"
        id="godine"
        variant="fade-up"
        duration={1000}
        className="relative scroll-mt-24 overflow-hidden bg-background pt-2 pb-4 text-left md:py-32"
      >
        <SiteContainer className="relative z-[1]">
          <h2 className="font-heading text-[clamp(2rem,6vw,3.875rem)] font-normal leading-[1.1] text-primary lg:text-[62px]">
            30 uspešnih godina
          </h2>
          <div className="relative mt-6 flex w-full flex-col">
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
          </div>

          <div className="relative z-0 mx-auto mt-8 max-w-[1312px] md:mt-10">
            <HomePromoVideo
              posterSrc={siteImages.home.videoSection}
              posterSizes="(max-width:1024px) 100vw, 1312px"
            />
          </div>
        </SiteContainer>
      </Reveal>

      <HomeServices />

      <section
        id="projekti-pocetna"
        className="relative scroll-mt-24 overflow-x-hidden bg-background pb-24 md:pt-16 md:pb-32"
      >
        <SiteContainer className="relative z-[1]">
          <Reveal variant="fade-up" duration={1000}>
            <h2 className="font-heading text-[clamp(2.25rem,5vw,3.875rem)] font-normal leading-[1.1] text-primary">
              Naši Projekti
            </h2>
            <p className="mt-6 max-w-4xl font-sans text-xl font-medium leading-[1.2] text-muted-foreground md:text-2xl">
              Spisak projekata koje smo uradili je sve veći, a mi smo izdvojili
              samo neke od njih o kojima možete pročitati više informacija
            </p>
          </Reveal>

          <div className="mt-20 flex flex-col gap-24 md:gap-32 lg:gap-40">
            {homeProjects.map((p) => (
              <Reveal key={p.slug} variant="fade-up" duration={1000}>
                <ProjectShowcaseCard
                  image={p.image}
                  alt={p.alt}
                  title={p.title}
                  description={p.description}
                  href={getProjectPath(p.slug)}
                  reverse={p.reverse}
                  animate={false}
                />
              </Reveal>
            ))}
          </div>

          <Reveal
            variant="fade-up"
            duration={1000}
            className="mt-24 flex justify-center md:mt-32"
          >
            <Link
              href="/projekti"
              className={cn(
                outlineActionButtonClass,
                "border border-primary text-neutral-50 hover:bg-primary/10",
              )}
            >
              SVI PROJEKTI
              <ChevronRight className="size-4 shrink-0" aria-hidden />
            </Link>
          </Reveal>
        </SiteContainer>
      </section>
    </>
  );
}
