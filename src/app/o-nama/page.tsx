import Image from "next/image";
import Link from "next/link";
import { ChevronRight } from "lucide-react";

import { AboutHeroGlass } from "@/components/about-hero-glass";
import { AboutMilestones } from "@/components/about-milestones";
import { BauenCtaLink, outlineActionButtonClass } from "@/components/bauen-cta-button";
import { Reveal } from "@/components/reveal";
import { SiteContainer } from "@/components/site-container";
import { siteImages } from "@/lib/site-images";
import { createPageMetadata } from "@/lib/seo";
import { cn } from "@/lib/utils";

export const metadata = createPageMetadata({
  title: "O nama",
  description:
    "Više od 30 godina gradimo poverenje kroz kvalitet i iskustvo — od porodičnih početaka do savremene građevinske kompanije Bauen.",
  path: "/o-nama",
});

const milestones = [
  {
    year: "1984.",
    text: "Naši počeci su vezani za 1984. godinu i Građevinsku zanatasku zadrugu „Bačka“ iz Vrbasa čiji smo član bili ali pod imenom Samostalna građevinska radnja. Istrajnošću, upornošću, predanim i posvećenim radom postali smo ono što je GTP Bauen danas.",
    image: siteImages.about.construction1,
    alt: "Bauen tim na gradilištu osamdesetih godina",
  },
  {
    year: "1984. – 1993.",
    text: "Ovaj period tadašnje Jugoslavije odlikuju masovne gradnje infrastrukture pa otuda i velika tražnja za građevinskim uslugama. Naša firma je odgovorila i vrlo brzo se prilagodila zahtevima tržišta što je propraćeno ubrzanim rastom i proširenjem u vidu broja zaposlenih i sredstava za rad.",
    image: siteImages.about.construction2,
    alt: "Izgradnja stambenih blokova devedesetih",
  },
  {
    year: "2023.",
    text: "Bauen je danas jedna od najvećih građevinskih kompanija u Srbiji. Sa dugom tradicijom i velikim iskustvom konstantno beleži rast, napredak i u najkraćem roku odgovara na zahteve tržišta. Ponosni smo na našu veliku porodicu saradnika i klijenata i radujemo se njenom povećanju.",
    image: siteImages.about.construction3,
    alt: "Savremeno gradilište sa kranom",
  },
] as const;

export default function AboutPage() {
  return (
    <>
      <section className="relative overflow-hidden">
        <div className="absolute inset-0 -z-10">
          <Image
            src={siteImages.about.hero}
            alt="Bauen radnici na gradilištu"
            fill
            priority
            className="object-cover object-center"
            sizes="100vw"
          />
          <div className="absolute inset-0 bg-black/55" />
          <div className="absolute inset-x-0 bottom-0 h-1/2 bg-gradient-to-b from-transparent to-background" />
        </div>

        <SiteContainer className="page-hero-offset relative pb-16 md:pb-20 lg:pb-32">
          <div className="grid gap-10 md:gap-14 lg:grid-cols-12 lg:gap-x-10 lg:gap-y-10 xl:gap-x-12">
            <Reveal
              variant="fade-up"
              duration={900}
              className="lg:col-span-12 lg:col-start-1 lg:row-start-1"
            >
              <h1 className="max-w-none text-[clamp(1.75rem,5vw,2.5rem)] font-normal leading-[110%] text-[#FFF] lg:text-[62px]">
                <span className="block font-heading lg:whitespace-nowrap">
                  Više od 30 godina gradimo
                </span>
                <span className="block font-heading lg:whitespace-nowrap">
                  poverenje kroz{" "}
                  <span className="font-sans font-semibold text-primary">
                    kvalitet i iskustvo
                  </span>
                </span>
              </h1>
            </Reveal>

            <Reveal
              variant="fade-up"
              delay={200}
              duration={800}
              className="flex flex-col items-stretch gap-4 sm:gap-6 lg:col-span-5 lg:col-start-1 lg:row-start-2 lg:self-start xl:col-span-5"
            >
              <p className="font-nav max-w-[591px] text-base font-medium leading-relaxed text-white md:text-xl">
                Od porodičnih početaka do savremene građevinske kompanije, naš
                put obeležavaju posvećenost, stručnost i kontinuiran rast.
              </p>
              <div className="flex flex-col items-stretch gap-3 sm:flex-row sm:items-center sm:gap-4 md:gap-6 lg:flex-col lg:items-stretch">
                <BauenCtaLink href="/projekti">PROJEKTI</BauenCtaLink>
                <Link
                  href="/kontakt"
                  className={cn(
                    outlineActionButtonClass,
                    "border border-white/70 bg-white/15 text-neutral-50 backdrop-blur-md hover:bg-white/25",
                  )}
                >
                  KONTAKTIRAJTE NAS
                  <ChevronRight className="size-4 shrink-0" aria-hidden />
                </Link>
              </div>
            </Reveal>

            <Reveal
              variant="fade-left"
              delay={150}
              duration={900}
              className="lg:col-span-6 lg:col-start-7 lg:row-start-2 lg:self-start xl:col-span-7 xl:col-start-6"
            >
              <AboutHeroGlass />
            </Reveal>
          </div>
        </SiteContainer>
      </section>

      <AboutMilestones milestones={milestones} />

      <section className="relative overflow-x-hidden bg-background pb-12 md:pt-24 md:pb-20 lg:pt-32 lg:pb-24">
        <SiteContainer className="relative">
          <Reveal variant="fade-up" duration={800}>
            <h2 className="font-heading text-[clamp(2rem,5vw,3.875rem)] font-normal leading-[1.1] text-primary">
              Priznanja i nagrade
            </h2>
          </Reveal>
          <div className="relative z-10 mt-4 flex w-full max-w-none flex-col gap-4 font-sans text-base font-medium leading-[1.25] text-neutral-50 sm:mt-6 sm:gap-6 md:text-xl lg:text-2xl lg:leading-[1.2]">
            <Reveal variant="fade-up" delay={100} duration={800}>
              <p>
                Zahvaljujući predanom radu i vrhunskoj stručnosti svog kadra ali
                i čestim društveno odgovornim aktivnostima, Bauen je dobitnik
                velikog broja nagrada, priznanja i zahvalnica. Već nekoliko
                godina za redom naša bonitetna ocena je A+, što nas svrstava u
                grupu preduzeća sa najboljom bonitetnom ocenom u Srbiji.
              </p>
            </Reveal>
            <Reveal variant="fade-up" delay={200} duration={800}>
              <p>
                Bauen se može pohvaliti i učestovanjem u dobrotvornim akcijama i
                sponzorisanjem svih događaja humanitarnog karaktera na
                teritoriji svog poslovanja jer smatramo da je to moralna obaveza
                svakoga ko je u mogućnosti da to uradi.
              </p>
            </Reveal>
            <Reveal variant="fade-up" delay={300} duration={800}>
              <div className="relative pb-[72px] md:pb-[140px]">
                <Image
                  src="/illustrations/a-plus.png"
                  alt=""
                  width={449}
                  height={201}
                  className="pointer-events-none absolute right-20 top-[30%] z-0 h-[100px] w-[224px] select-none md:top-[32%] md:h-[201px] md:w-[449px]"
                  aria-hidden
                />
                <p className="relative z-10">
                  Ponosni smo na činjenicu da je naš rad prepoznat od strane
                  renomiranih domaćih i stranih ustanova i sa tim na umu
                  nastavljamo da radimo naporno i gradimo kvalitetno kako bi
                  opravdali i negovali stečeno poverenje naših klijenata i
                  javnosti.
                </p>
              </div>
            </Reveal>
          </div>
        </SiteContainer>
      </section>
    </>
  );
}
