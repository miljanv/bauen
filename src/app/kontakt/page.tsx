import Image from "next/image";
import Link from "next/link";
import type { ReactNode } from "react";

import { ContactForm } from "@/components/contact-form";
import { LCornerFrame } from "@/components/l-corner-frame";
import { SiteContainer } from "@/components/site-container";
import { figmaKontakt } from "@/lib/figma-kontakt-assets";
import { createPageMetadata } from "@/lib/seo";
import { siteConfig } from "@/lib/site-config";

export const metadata = createPageMetadata({
  title: "Kontakt",
  description:
    "Kontaktirajte Bauen za ponudu, obilazak gradilišta ili tehničko savetovanje. Telefon, e-pošta i adresa u Vrbasu.",
  path: "/kontakt",
});

const icons = {
  phone: "/icons/phone.svg",
  email: "/icons/email.svg",
  location: "/icons/location.svg",
  twitter: "/icons/twitter.svg",
  instagram: "/icons/instagram.svg",
  discord: "/icons/discord.svg",
} as const;

function ContactIcon({ src }: { src: string }) {
  return <Image src={src} alt="" width={24} height={24} className="size-6 shrink-0 object-contain" aria-hidden />;
}

function ContactRow({ href, iconSrc, children }: { href: string; iconSrc: string; children: ReactNode }) {
  return (
    <div className="flex items-start gap-4">
      <ContactIcon src={iconSrc} />
      <Link href={href} className="font-sans text-base font-medium leading-6 text-white transition-colors hover:text-primary">
        {children}
      </Link>
    </div>
  );
}

export default function ContactPage() {
  const addressLine = [siteConfig.address.street, siteConfig.address.city].filter(Boolean).join(", ");
  const socialTriple = [
    { href: siteConfig.social.twitter, src: icons.twitter, label: "X (Twitter)" },
    { href: siteConfig.social.instagram, src: icons.instagram, label: "Instagram" },
    { href: siteConfig.social.discord, src: icons.discord, label: "Discord" },
  ] as const;

  return (
    <section className="relative min-h-dvh">
      <Image
        src={figmaKontakt.hero}
        alt="Tehnički nacrt gradilišta u pozadini"
        fill
        priority
        className="object-cover"
        sizes="100vw"
      />
      <div
        className="pointer-events-none absolute inset-0 bg-linear-to-b from-[rgba(18,20,29,0)] from-55% to-background"
        aria-hidden
      />

      <SiteContainer className="relative z-1 flex min-h-dvh flex-col justify-center py-24 md:py-28">
        <div className="relative mx-auto w-full max-w-[1100px]">
          <div className="pointer-events-none absolute -left-6 bottom-8 z-0 hidden w-[min(55vw,444px)] max-w-[90vw] opacity-90 lg:block">
            <div className="relative aspect-[444.7/215] w-full rotate-90">
              <Image
                src={figmaKontakt.subtractDecoration}
                alt=""
                fill
                className="object-contain"
                sizes="(max-width:1024px) 0px, 50vw"
              />
            </div>
          </div>

          <div className="relative z-1 overflow-hidden border border-white/10 shadow-[0_24px_80px_rgba(0,0,0,0.35)]">
            <div className="relative lg:grid lg:min-h-[min(560px,70vh)] lg:grid-cols-[minmax(0,1fr)_minmax(0,2fr)]">
              <aside className="relative order-2 flex flex-col gap-10 overflow-hidden bg-[rgba(20,11,42,0.6)] p-8 backdrop-blur-md md:p-10 lg:order-1 lg:gap-12 lg:px-10 lg:pb-12 lg:pt-14">
                <p
                  className="pointer-events-none absolute bottom-[-8%] right-[-6%] select-none font-heading text-[clamp(10rem,42vw,14rem)] font-normal leading-none text-white/6"
                  aria-hidden
                >
                  B
                </p>

                <div className="relative z-1 space-y-4">
                  <h1 className="font-heading text-[32px] font-normal leading-[1.1] text-primary md:text-[36px]">
                    Kontakt informacije
                  </h1>
                  <p className="font-sans text-base font-bold leading-[22px] text-[#c9c9c9]">
                    Pišite nam ili nas pozovite!
                  </p>
                </div>

                <div className="relative z-1 flex flex-col gap-6">
                  <ContactRow href={`tel:${siteConfig.phone.replace(/\s/g, "")}`} iconSrc={icons.phone}>
                    {siteConfig.phone}
                  </ContactRow>
                  <ContactRow href={`mailto:${siteConfig.email}`} iconSrc={icons.email}>
                    {siteConfig.email}
                  </ContactRow>
                  <div className="flex items-start gap-4">
                    <ContactIcon src={icons.location} />
                    <p className="font-sans text-base font-medium leading-6 text-white">{addressLine}</p>
                  </div>
                </div>

                <div className="relative z-1 flex flex-wrap items-center gap-4">
                  {socialTriple.map((s) => (
                    <Link
                      key={s.label}
                      href={s.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="relative size-[34px] shrink-0 transition-opacity hover:opacity-90"
                      aria-label={s.label}
                    >
                      <Image src={s.src} alt="" width={34} height={34} className="size-[34px] object-contain" />
                    </Link>
                  ))}
                </div>
              </aside>

            <div className="relative order-1 bg-background px-6 py-10 md:px-12 md:py-14 lg:order-2 lg:flex lg:flex-col lg:justify-center lg:px-14 lg:py-16">
              <ContactForm />
            </div>
            </div>
            <LCornerFrame />
          </div>
        </div>
      </SiteContainer>
    </section>
  );
}
