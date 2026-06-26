import Image from "next/image";

import { BauenCtaLink } from "@/components/bauen-cta-button";
import { ProjektiPortfolio } from "@/components/projekti-portfolio";
import { Reveal } from "@/components/reveal";
import { SiteContainer } from "@/components/site-container";
import { siteImages } from "@/lib/site-images";
import { createPageMetadata } from "@/lib/seo";

export const metadata = createPageMetadata({
  title: "Projekti",
  description:
    "Pregled realizovanih i aktivnih projekata Bauen firme — stambeni kompleksi, poslovni objekti i rekonstrukcije širom Srbije.",
  path: "/projekti",
});

export default function ProjectsPage() {
  return (
    <div className="overflow-x-hidden">
      <section className="relative min-h-[min(100vh,1024px)] w-full overflow-hidden">
        <div className="absolute inset-0">
          <Image
            src={siteImages.projekti.hero}
            alt=""
            fill
            priority
            className="object-cover object-center"
            sizes="100vw"
          />
          <div
            className="absolute inset-0 bg-linear-to-b from-transparent from-20% via-[rgba(9,10,15,0.5)] via-75% to-[#12141d]"
            aria-hidden
          />
        </div>
        <SiteContainer className="page-hero-offset relative z-1 flex min-h-[min(100vh,1024px)] flex-col pb-16 md:items-start md:pb-20">
          <div className="w-full max-w-none text-center md:text-left">
            <Reveal variant="fade-up" duration={900}>
              <h1 className="max-w-none font-heading text-[clamp(2.25rem,6vw,3.875rem)] font-normal leading-[1.1] text-white lg:text-[58px]">
                <span className="block">
                  <span className="text-primary">Kompletna rešenja</span> u
                  oblasti visokogradnje,
                </span>
                <span className="block">
                  <span className="text-primary">niskogradnje</span> i
                  specijalizovanih građevinskih
                </span>
                <span className="block">radova.</span>
              </h1>
            </Reveal>
            <Reveal
              variant="fade-up"
              delay={200}
              duration={800}
              className="mt-8 flex justify-center md:mt-10 md:justify-start"
            >
              <BauenCtaLink href="/kontakt" className="px-4">
                KONTAKTIRAJTE NAS
              </BauenCtaLink>
            </Reveal>
          </div>
        </SiteContainer>
      </section>

      <ProjektiPortfolio />
    </div>
  );
}
