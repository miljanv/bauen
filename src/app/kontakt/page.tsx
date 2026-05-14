import Image from "next/image";
import Link from "next/link";
import type { ReactNode } from "react";

import { ContactForm } from "@/components/contact-form";
import {
  LCornerFrame,
  LCORNER_BL_OUTSIDE_3X_VERTICAL,
  LCORNER_CONTACT_MOBILE_BL_OUTSIDE,
  LCORNER_CONTACT_MOBILE_TR_OUTSIDE,
  LCORNER_TR_OUTSIDE_3X_VERTICAL,
} from "@/components/l-corner-frame";
import { SiteContainer } from "@/components/site-container";
import { figmaKontakt } from "@/lib/figma-kontakt-assets";
import { createPageMetadata } from "@/lib/seo";
import { siteConfig } from "@/lib/site-config";
import { cn } from "@/lib/utils";

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
  className,
}: {
  href: string;
  iconSrc: string;
  children: ReactNode;
  className?: string;
}) {
  return (
    <div
      className={cn(
        "flex flex-col items-center gap-3 text-center lg:flex-row lg:items-start lg:gap-[49px] lg:text-left",
        className,
      )}
    >
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
          <div className="relative z-1 mt-3">
            <div className="relative z-2 p-0 lg:p-5">
              <div className="relative flex flex-col overflow-hidden max-lg:overflow-visible lg:overflow-visible bg-background shadow-[0_0_60px_30px_rgba(0,0,0,0.03)] max-lg:mx-auto max-lg:max-w-[min(100%,393px)] lg:mx-0 lg:max-w-none lg:grid lg:grid-cols-[minmax(260px,491px)_minmax(0,998px)] lg:items-start lg:gap-0 lg:bg-transparent lg:shadow-none">
                <aside className="relative z-20 order-1 flex w-full shrink-0 flex-col items-center gap-10 overflow-visible bg-[rgba(20,11,42,0.72)] px-5 pb-8 pt-8 text-center max-lg:pt-10 lg:order-1 lg:col-start-1 lg:row-start-1 lg:mt-[70px] lg:h-[647px] lg:w-[450px] lg:max-w-[491px] lg:items-start lg:gap-[148px] lg:self-start lg:bg-[rgba(20,11,42,0.6)] lg:p-10 lg:text-left">
                  <div
                    className={cn(
                      "pointer-events-none z-[1] aspect-[253/259]",
                      "max-lg:absolute max-lg:right-0 max-lg:bottom-4 max-lg:w-[min(200px,58vw)] max-lg:max-w-[65%]",
                      "lg:absolute lg:left-[239px] lg:top-[344px] lg:w-[252px] lg:max-w-[45%]",
                    )}
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
                    corners="tr"
                    className="z-[5] lg:hidden"
                    topRightAccentClassName={LCORNER_CONTACT_MOBILE_TR_OUTSIDE}
                  />
                  <LCornerFrame
                    corners="bl"
                    className="z-[5] lg:hidden"
                    bottomLeftAccentClassName={
                      LCORNER_CONTACT_MOBILE_BL_OUTSIDE
                    }
                  />

                  <LCornerFrame
                    corners="bl"
                    bottomLeftAccentClassName={LCORNER_BL_OUTSIDE_3X_VERTICAL}
                    className="z-[5] hidden lg:block"
                  />

                  <div className="relative z-10 space-y-3 lg:space-y-4">
                    <h1 className="font-heading text-2xl font-normal leading-[1.2] text-primary lg:text-[32px] lg:leading-[1.1]">
                      Kontakt informacije
                    </h1>
                    <p className="font-sans text-xs font-bold leading-4 text-[#c9c9c9] lg:text-base lg:leading-[22px]">
                      Pišite nam ili nas pozovite!
                    </p>
                  </div>

                  <div className="relative z-10 flex w-full max-w-[280px] flex-col gap-6 lg:max-w-none">
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
                    <div className="flex flex-col items-center gap-3 text-center lg:flex-row lg:items-start lg:gap-[49px] lg:text-left">
                      <ContactIcon src={icons.location} />
                      <p className="font-sans text-base font-medium leading-6 text-white">
                        {addressLine}
                      </p>
                    </div>
                  </div>

                  <div className="relative z-10 flex flex-wrap items-center justify-center gap-6 lg:justify-start">
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

                <div className="relative z-[10] order-2 bg-background px-5 py-8 max-lg:border-t max-lg:border-white/5 md:px-8 md:py-10 lg:order-2 lg:col-start-2 lg:row-start-1 lg:-ml-[303px] lg:flex lg:min-h-[667px] lg:w-[calc(100%+303px)] lg:max-w-[998px] lg:flex-col lg:justify-center lg:border-t-0 lg:px-10 lg:py-16">
                  <LCornerFrame
                    corners="tr"
                    className="z-[5] hidden lg:block"
                    topRightAccentClassName={LCORNER_TR_OUTSIDE_3X_VERTICAL}
                  />
                  <ContactForm />
                </div>
              </div>
            </div>
          </div>
        </div>
      </SiteContainer>
    </section>
  );
}
