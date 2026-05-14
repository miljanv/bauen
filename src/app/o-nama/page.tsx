import Image from "next/image";
import Link from "next/link";
import { ChevronRight } from "lucide-react";

import { AboutMilestones } from "@/components/about-milestones";
import { BauenCtaLink } from "@/components/bauen-cta-button";
import { ProjectSubtractCorners } from "@/components/project-subtract-corners";
import { Reveal } from "@/components/reveal";
import {
  SECTION_WATERMARK_STROKE_INLINE_LG,
  SECTION_WATERMARK_STROKE_INLINE_SM,
} from "@/components/section-watermark";
import { SiteContainer } from "@/components/site-container";
import { figmaAbout } from "@/lib/figma-about-assets";
import { createPageMetadata } from "@/lib/seo";

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
    image: figmaAbout.construction1,
    alt: "Bauen tim na gradilištu osamdesetih godina",
  },
  {
    year: "1984. – 1993.",
    text: "Ovaj period tadašnje Jugoslavije odlikuju masovne gradnje infrastrukture pa otuda i velika tražnja za građevinskim uslugama. Naša firma je odgovorila i vrlo brzo se prilagodila zahtevima tržišta što je propraćeno ubrzanim rastom i proširenjem u vidu broja zaposlenih i sredstava za rad.",
    image: figmaAbout.construction2,
    alt: "Izgradnja stambenih blokova devedesetih",
  },
  {
    year: "2023.",
    text: "Bauen je danas jedna od najvećih građevinskih kompanija u Srbiji. Sa dugom tradicijom i velikim iskustvom konstantno beleži rast, napredak i u najkraćem roku odgovara na zahteve tržišta. Ponosni smo na našu veliku porodicu saradnika i klijenata i radujemo se njenom povećanju.",
    image: figmaAbout.construction3,
    alt: "Savremeno gradilište sa kranom",
  },
] as const;

const aboutHeroGlassStyle = {
  backgroundImage:
    "radial-gradient(70.56% 70.56% at 69.32% 29.44%, rgba(82, 115, 164, 0.30) 0%, rgba(152, 174, 216, 0.03) 100%)",
  boxShadow: "inset 0 205px 82px 1px rgba(125, 109, 162, 0.01)",
  backdropFilter: "blur(10.449999809265137px)",
  WebkitBackdropFilter: "blur(10.449999809265137px)",
} as const;

export default function AboutPage() {
  return (
    <>
      <section className="relative overflow-hidden">
        <div className="absolute inset-0 -z-10">
          <Image
            src={figmaAbout.hero}
            alt="Bauen radnici na gradilištu"
            fill
            priority
            className="object-cover object-center"
            sizes="100vw"
          />
          <div className="absolute inset-0 bg-black/55" />
          <div className="absolute inset-x-0 bottom-0 h-1/2 bg-gradient-to-b from-transparent to-background" />
        </div>

        <SiteContainer className="relative pb-20 pt-40 md:pt-52 lg:pb-32 lg:pt-60">
          <div className="grid gap-14 lg:grid-cols-12 lg:gap-x-10 lg:gap-y-10 xl:gap-x-12">
            <Reveal
              variant="fade-up"
              duration={900}
              className="lg:col-span-12 lg:col-start-1 lg:row-start-1"
            >
              <h1 className="max-w-none font-normal leading-[110%] text-[#FFF] text-[clamp(1.75rem,5vw,2.5rem)] lg:text-[62px]">
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
              <p className="font-nav mt-6 max-w-[591px] text-lg font-medium leading-relaxed text-white md:mt-8 md:text-xl lg:mt-10">
                Od porodičnih početaka do savremene građevinske kompanije, naš
                put obeležavaju posvećenost, stručnost i kontinuiran rast.
              </p>
            </Reveal>

            <Reveal
              variant="fade-up"
              delay={200}
              duration={800}
              className="flex flex-wrap items-center gap-4 sm:gap-6 lg:col-span-6 lg:col-start-1 lg:row-start-2 lg:self-start xl:col-span-5"
            >
              <BauenCtaLink href="/projekti" className="px-4">
                REFERENCE
              </BauenCtaLink>
              <Link
                href="/kontakt"
                className="font-nav inline-flex h-[60px] items-center gap-2 border border-white/70 bg-white/15 px-4 text-base font-medium text-neutral-50 backdrop-blur-md transition-colors hover:bg-white/25 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 focus-visible:ring-offset-background"
              >
                KONTAKTIRAJTE NAS
                <ChevronRight className="size-4 shrink-0" aria-hidden />
              </Link>
            </Reveal>

            <Reveal
              variant="fade-left"
              delay={150}
              duration={900}
              className="lg:col-span-6 lg:col-start-7 lg:row-start-2 lg:-mt-8 lg:self-start xl:col-span-7 xl:col-start-6"
            >
              <div
                className="relative overflow-visible rounded-[3px] border border-[rgba(255,255,255,0.12)] p-6 sm:p-8 md:p-10"
                style={aboutHeroGlassStyle}
              >
                <ProjectSubtractCorners variant="glass-tl-br" />
                <div className="relative z-10 space-y-4 font-sans text-base font-medium leading-[1.25] text-neutral-50 md:text-lg lg:text-xl xl:text-2xl xl:leading-[1.2]">
                  <p>
                    Građevinsko preduzeće Bauen pod ovim imenom postoji od 1993.
                    godine ali njegova istorija počinje nekoliko godina ranije
                    kao deo Građevinske zanatske zadruge „Bačka“ iz Vrbasa.
                  </p>
                  <p>
                    Počeli smo kao porodična firma u sastavu već pomenute
                    zanatske zadruge da bismo se vremenom osamostalili i
                    predanim radom i kvalitetnom uslugom prerasli u lidera
                    industrije na ovim prostorima. Sve ovo je propraćeno i
                    rastom broja zaposlenih koji danas, zajedno sa našim
                    klijentima i partnerima, čine deo Bauen porodice.
                  </p>
                  <p>
                    Bauen gradnja se kao firma razvila i odvojila od svojih
                    konkurenata stvarajući jedinstveni spoj visoke tehnologije i
                    građevinskog majstorstva usmerenog prvenstveno na želje
                    klijenata. Zato i ne čudi podatak da iz godine u godinu
                    beležimo konstantan rast i vanserijeske rezultate u oblasti
                    građevinarstva.
                  </p>
                  <p>
                    Želimo da ostvarimo trajne odnose sa našim klijentima i
                    partnerima tako što ćemo premašiti sva njihova očekivanja i
                    steći njihovo poverenje izuzetnim performansama svakog člana
                    našeg tima.
                  </p>
                </div>
              </div>
            </Reveal>
          </div>
        </SiteContainer>
      </section>

      <AboutMilestones milestones={milestones} />

      <section className="relative  bg-background py-24 md:py-32">
        <SiteContainer className="relative">
          <Reveal variant="fade-up" duration={800}>
            <h2 className="font-heading text-[clamp(2.25rem,5vw,3.875rem)] font-normal leading-[1.1] text-primary">
              Priznanja i nagrade
            </h2>
          </Reveal>
          <div className="relative z-10 mt-6 flex w-full max-w-none flex-col gap-6 font-sans text-lg font-medium leading-[1.25] text-neutral-50 md:text-xl lg:text-2xl lg:leading-[1.2]">
            <Reveal variant="fade-up" delay={100} duration={800}>
              <p>
                Zahvaljujući predanom radu i vrhunskoj stručnosti svog kadra ali i
                čestim društveno odgovornim aktivnostima, Bauen je dobitnik
                velikog broja nagrada, priznanja i zahvalnica. Već nekoliko godina
                za redom naša bonitetna ocena je A+, što nas svrstava u grupu
                preduzeća sa najboljom bonitetnom ocenom u Srbiji.
              </p>
            </Reveal>
            <Reveal variant="fade-up" delay={200} duration={800}>
              <p>
                Bauen se može pohvaliti i učestovanjem u dobrotvornim akcijama i
                sponzorisanjem svih događaja humanitarnog karaktera na teritoriji
                svog poslovanja jer smatramo da je to moralna obaveza svakoga ko
                je u mogućnosti da to uradi.
              </p>
            </Reveal>
            <Reveal variant="fade-up" delay={300} duration={800}>
              <p>
                Ponosni smo na činjenicu da je naš rad prepoznat od strane
                renomiranih domaćih i stranih ustanova i sa tim na umu nastavljamo
                da radimo naporno i gradimo kvalitetno kako bi opravdali i
                negovali stečeno poverenje naših klijenata i javnosti.
              </p>
            </Reveal>
          </div>
          <Reveal
            variant="zoom"
            duration={1000}
            delay={150}
            className="pointer-events-none mt-12 flex w-full shrink-0 justify-center md:mt-16 lg:mt-20"
          >
            <span
              className="font-heading whitespace-nowrap text-center text-transparent text-shadow-none text-[clamp(100px,22vw,300px)] font-normal leading-[110%] tracking-[clamp(20px,8vw,100px)] opacity-35 lg:hidden"
              style={{
                WebkitTextStroke: SECTION_WATERMARK_STROKE_INLINE_SM,
              }}
            >
              A+
            </span>
            <span
              className="absolute top-70 right-0 hidden font-heading whitespace-nowrap text-center text-transparent text-shadow-none text-[clamp(100px,22vw,300px)] font-normal leading-[110%] tracking-[100px] opacity-35 lg:inline"
              style={{
                WebkitTextStroke: SECTION_WATERMARK_STROKE_INLINE_LG,
              }}
            >
              A+
            </span>
          </Reveal>
        </SiteContainer>
      </section>
    </>
  );
}
