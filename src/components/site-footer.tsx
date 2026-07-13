"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

import { BauenLogo } from "@/components/bauen-logo";
import { Reveal } from "@/components/reveal";
import { SocialIcons } from "@/components/social-icons";
import { SiteContainer } from "@/components/site-container";
import { navItemsAll, siteConfig } from "@/lib/site-config";
import { cn } from "@/lib/utils";

function isActive(pathname: string, href: string) {
  if (href === "/") return pathname === "/";
  if (href.startsWith("/#")) return false;
  return pathname === href || pathname.startsWith(`${href}/`);
}

export function SiteFooter() {
  const pathname = usePathname();
  const year = new Date().getFullYear();
  return (
    <footer className="relative text-white">
      <section className="relative min-h-[280px] overflow-hidden bg-background py-6 md:min-h-[320px] md:py-14">
        <div className="absolute inset-0 bg-gradient-to-b from-background/90 via-background/70 to-background/95" />
        <SiteContainer className="relative z-[1] flex flex-col items-center gap-10 text-center">
          <Reveal
            variant="fade-up"
            duration={1000}
            className="max-w-[806px] font-nav text-balance"
          >
            <p className="text-[clamp(2rem,5vw,3rem)] font-bold leading-[1.1] text-neutral-50">
              Gradimo pouzdane temelje
            </p>
            <p className="text-[clamp(2rem,5vw,3rem)] font-bold leading-[1.1] text-primary">
              za vaše ambicije
            </p>
          </Reveal>
        </SiteContainer>
      </section>

      <div className="border-t border-white/10 bg-background py-12 md:py-14">
        <SiteContainer>
          <div className="flex flex-col items-center gap-10 md:flex-row md:items-center md:justify-between">
            <Link
              href="/"
              className="shrink-0 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary"
            >
              <BauenLogo variant="full" />
            </Link>

            <nav
              className="font-nav flex flex-wrap justify-center gap-8 text-base font-normal tracking-[2px]"
              aria-label="Podnožje navigacija"
            >
              {navItemsAll.map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  className={cn(
                    "transition-colors",
                    isActive(pathname, item.href)
                      ? "text-primary"
                      : "text-neutral-500 hover:text-white",
                  )}
                >
                  {item.label}
                </Link>
              ))}
            </nav>

            <SocialIcons
              twitter={siteConfig.social.twitter}
              facebook={siteConfig.social.facebook}
              linkedin={siteConfig.social.linkedin}
              instagram={siteConfig.social.instagram}
              youtube={siteConfig.social.youtube}
            />
          </div>
        </SiteContainer>
      </div>

      <div className="border-t border-white/10 bg-background py-6">
        <SiteContainer className="flex flex-col gap-4 px-6 font-sans text-base text-muted-foreground sm:flex-row sm:items-center sm:justify-between">
          <p className="leading-[26px]">
            © BAUEN DOO {year}. Sva prava zadržana.
          </p>
          <div className="flex flex-wrap gap-8 leading-[26px]">
            <Link href="/polisa-privatnosti" className="hover:text-white">
              Politika privatnosti
            </Link>
            <Link href="/uslovi-koriscenja" className="hover:text-white">
              Uslovi korišćenja
            </Link>
          </div>
        </SiteContainer>
      </div>
    </footer>
  );
}
