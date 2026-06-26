"use client";

import { useState } from "react";
import { ChevronRight } from "lucide-react";

import { BauenCtaButton } from "@/components/bauen-cta-button";
import { ProjectSubtractCorners } from "@/components/project-subtract-corners";

const aboutHeroGlassStyle = {
  backgroundImage:
    "radial-gradient(70.56% 70.56% at 69.32% 29.44%, rgba(82, 115, 164, 0.30) 0%, rgba(152, 174, 216, 0.03) 100%)",
  boxShadow: "inset 0 205px 82px 1px rgba(125, 109, 162, 0.01)",
  backdropFilter: "blur(10.449999809265137px)",
  WebkitBackdropFilter: "blur(10.449999809265137px)",
} as const;

const SHORT_TEXT =
  "Građevinsko preduzeće Bauen pod ovim imenom postoji od 1993. godine ali njegova istorija počinje nekoliko godina ranije kao deo Građevinske zanatske zadruge \u201EBačka\u201C iz Vrbasa. Počeli smo kao porodična firma da bismo se vremenom osamostalili i predanim radom prerasli u lidera industrije na ovim prostorima.";

const FULL_PARAGRAPHS = [
  SHORT_TEXT,
  "Sve ovo je propraćeno i rastom broja zaposlenih koji danas, zajedno sa našim klijentima i partnerima, čine deo Bauen porodice.",
  "Bauen gradnja se kao firma razvila i odvojila od svojih konkurenata stvarajući jedinstveni spoj visoke tehnologije i građevinskog majstorstva usmerenog prvenstveno na želje klijenata. Zato i ne čudi podatak da iz godine u godinu beležimo konstantan rast i vanserijeske rezultate u oblasti građevinarstva.",
  "Želimo da ostvarimo trajne odnose sa našim klijentima i partnerima tako što ćemo premašiti sva njihova očekivanja i steći njihovo poverenje izuzetnim performansama svakog člana našeg tima.",
] as const;

export function AboutHeroGlass() {
  const [expanded, setExpanded] = useState(false);

  return (
    <div
      className="corner-hover-zone relative overflow-visible rounded-[3px] border border-[rgba(255,255,255,0.12)] p-5 sm:p-8 md:p-10"
      style={aboutHeroGlassStyle}
    >
      <ProjectSubtractCorners variant="glass-tl-br" hoverFx />
      <div className="relative z-10 space-y-3 font-sans text-base font-medium leading-[1.25] text-neutral-50 sm:space-y-4 md:text-lg lg:text-xl xl:text-2xl xl:leading-[1.2]">
        {expanded ? (
          FULL_PARAGRAPHS.map((p, i) => <p key={i}>{p}</p>)
        ) : (
          <>
            <p>{SHORT_TEXT}</p>
            <p className="hidden lg:block">{FULL_PARAGRAPHS[1]}</p>
          </>
        )}
        {!expanded ? (
          <BauenCtaButton className="mt-2" onClick={() => setExpanded(true)}>
            DETALJNIJE
            <ChevronRight className="size-4 shrink-0" aria-hidden />
          </BauenCtaButton>
        ) : null}
      </div>
    </div>
  );
}
