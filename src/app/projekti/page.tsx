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
    <>
      <section className="relative min-h-[min(100vh,1024px)]">
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
        <SiteContainer className="relative z-1 flex min-h-[min(100vh,1024px)] flex-col items-center px-4 pb-16 pt-28 text-center md:px-6 md:pb-20 md:pt-32">
          <div className="w-full max-w-4xl text-left">
            <Reveal variant="fade-up" duration={900}>
              <h1 className="font-heading text-[clamp(2.25rem,6vw,3.875rem)] font-normal leading-[1.1] text-primary lg:text-[62px]">
                Projekti
              </h1>
            </Reveal>
            <Reveal variant="fade-up" delay={150} duration={800}>
              <p className="mt-4 max-w-[591px] font-sans text-lg font-medium leading-[1.2] text-white md:text-xl">
                Kompletna rešenja u oblasti visokogradnje, niskogradnje i specijalizovanih građevinskih radova.
              </p>
            </Reveal>
            <Reveal variant="fade-up" delay={300} duration={800} className="mt-10">
              <BauenCtaLink href="/kontakt" className="px-4">
                KONTAKTIRAJTE NAS
              </BauenCtaLink>
            </Reveal>
          </div>
        </SiteContainer>
      </section>

      <ProjektiPortfolio />
    </>
  );
}
