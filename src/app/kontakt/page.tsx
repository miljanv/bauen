import Image from "next/image";
import Link from "next/link";
import type { ReactNode } from "react";

import { ContactForm } from "@/components/contact-form";
import {
  LCornerFrame,
  LCORNER_BL_OUTSIDE_3X_VERTICAL,
  LCORNER_TR_OUTSIDE_3X_VERTICAL,
} from "@/components/l-corner-frame";
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
  return (
    <Image
      src={src}
      alt=""
      width={24}
      height={24}
      className="size-6 shrink-0 object-contain"
      aria-hidden
    />
  );
}

function ContactRow({
  href,
  iconSrc,
  children,
}: {
  href: string;
  iconSrc: string;
  children: ReactNode;
}) {
  return (
    <div className="flex items-start gap-[49px]">
      <ContactIcon src={iconSrc} />
      <Link
        href={href}
        className="font-sans text-base font-medium leading-6 text-white transition-colors hover:text-primary"
      >
        {children}
      </Link>
    </div>
  );
}

export default function ContactPage() {
  const addressLine = [siteConfig.address.street, siteConfig.address.city]
    .filter(Boolean)
    .join(", ");
  const socialTriple = [
    {
      href: siteConfig.social.twitter,
      src: icons.twitter,
      label: "X (Twitter)",
    },
    {
      href: siteConfig.social.instagram,
      src: icons.instagram,
      label: "Instagram",
    },
    { href: siteConfig.social.discord, src: icons.discord, label: "Discord" },
  ] as const;

  return (
    <section className="relative min-h-dvh overflow-x-clip outline-none">
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
        <div className="relative mx-auto w-full max-w-[1186px] px-5">
          <div className="pointer-events-none absolute left-[clamp(0px,5vw,87px)] top-[clamp(280px,38vw,427px)] z-0 hidden w-[min(55vw,444px)] max-w-[90vw] lg:block">
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

          <div className="relative z-1 mt-3">
            <div className="relative z-2 p-4 sm:p-5">
              <div className="relative lg:grid lg:grid-cols-[minmax(260px,491px)_minmax(0,998px)] lg:items-start lg:gap-0">
                <div className="relative z-[10] order-1 bg-background px-8 py-10 md:px-12 md:py-14 lg:order-2 lg:col-start-2 lg:row-start-1 lg:-ml-[303px] lg:flex lg:min-h-[667px] lg:w-[calc(100%+303px)] lg:max-w-[998px] lg:flex-col lg:justify-center lg:px-10 lg:py-16">
                  <LCornerFrame
                    corners="tr"
                    className="z-[5]"
                    topRightAccentClassName={LCORNER_TR_OUTSIDE_3X_VERTICAL}
                  />
                  <ContactForm />
                </div>

                <aside className="relative z-20 order-2 flex w-full shrink-0 flex-col items-start gap-[148px] bg-[rgba(20,11,42,0.6)] p-10 lg:order-1 lg:col-start-1 lg:row-start-1 lg:mt-[70px] lg:h-[647px] lg:w-[450px] lg:max-w-[491px] lg:self-start">
                  <div
                    className="pointer-events-none absolute left-[239px] top-[344px] z-[1] hidden aspect-[253/259] w-[252px] max-w-[45%] lg:block"
                    aria-hidden
                  >
                    <Image
                      src="/icons/b-contact.svg"
                      alt=""
                      width={253}
                      height={259}
                      className="h-full w-full object-contain"
                      priority={false}
                    />
                  </div>

                  <LCornerFrame
                    corners="bl"
                    bottomLeftAccentClassName={LCORNER_BL_OUTSIDE_3X_VERTICAL}
                    className="z-[5]"
                  />

                  <div className="relative z-10 space-y-4">
                    <h1 className="font-heading text-[32px] font-normal leading-[1.1] text-primary md:text-[32px]">
                      Kontakt informacije
                    </h1>
                    <p className="font-sans text-base font-bold leading-[22px] text-[#c9c9c9]">
                      Pišite nam ili nas pozovite!
                    </p>
                  </div>

                  <div className="relative z-10 flex flex-col gap-6">
                    <ContactRow
                      href={`tel:${siteConfig.phone.replace(/\s/g, "")}`}
                      iconSrc={icons.phone}
                    >
                      {siteConfig.phone}
                    </ContactRow>
                    <ContactRow
                      href={`mailto:${siteConfig.email}`}
                      iconSrc={icons.email}
                    >
                      {siteConfig.email}
                    </ContactRow>
                    <div className="flex items-start gap-[49px]">
                      <ContactIcon src={icons.location} />
                      <p className="font-sans text-base font-medium leading-6 text-white">
                        {addressLine}
                      </p>
                    </div>
                  </div>

                  <div className="relative z-10 flex flex-wrap items-center gap-6">
                    {socialTriple.map((s) => (
                      <Link
                        key={s.label}
                        href={s.href}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="relative size-[30px] shrink-0 transition-opacity hover:opacity-90"
                        aria-label={s.label}
                      >
                        <Image
                          src={s.src}
                          alt=""
                          width={30}
                          height={30}
                          className="size-[30px] object-contain"
                        />
                      </Link>
                    ))}
                  </div>
                </aside>
              </div>
            </div>
          </div>
        </div>
      </SiteContainer>
    </section>
  );
}
