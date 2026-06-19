"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";

import { BauenLogo } from "@/components/bauen-logo";
import { navItemsAll } from "@/lib/site-config";
import { cn } from "@/lib/utils";

function isActive(pathname: string, href: string, locationHash: string) {
  if (href === "/") {
    return pathname === "/" && (locationHash === "" || locationHash === "#");
  }
  if (href.startsWith("/#")) {
    const expectedHash = href.slice(1);
    return pathname === "/" && locationHash === expectedHash;
  }
  return pathname === href || pathname.startsWith(`${href}/`);
}

function NavLink({
  item,
  pathname,
  locationHash,
}: {
  item: { readonly href: string; readonly label: string };
  pathname: string;
  locationHash: string;
}) {
  const active = isActive(pathname, item.href, locationHash);
  return (
    <Link
      href={item.href}
      className={cn(
        "font-nav shrink-0 text-base font-bold leading-[22px] tracking-[2px] transition-colors",
        active ? "text-primary" : "text-neutral-500 hover:text-white",
      )}
    >
      {item.label}
    </Link>
  );
}

export function SiteHeader() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  /** Empty until mount so SSR and first client paint match; then synced with `window.location.hash`. */
  const [locationHash, setLocationHash] = useState("");

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    const syncHash = () => setLocationHash(window.location.hash);
    syncHash();
    window.addEventListener("hashchange", syncHash);
    return () => window.removeEventListener("hashchange", syncHash);
  }, [pathname]);

  useEffect(() => {
    if (open) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  return (
    <>
      <header
        className={cn(
          "fixed left-0 right-0 top-0 z-50 h-20 border-b transition-colors duration-300",
          scrolled
            ? "border-white/10 bg-background"
            : "border-transparent bg-transparent",
          open ? "z-[70]" : "z-50",
        )}
      >
        <div className="mx-auto h-full max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="flex h-full w-full items-center justify-between gap-5 sm:justify-center sm:gap-6">
            <Link
              href="/"
              className="shrink-0 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 focus-visible:ring-offset-background"
            >
              <BauenLogo variant="icon" />
            </Link>

            <nav
              className="hidden items-center gap-5 sm:flex sm:gap-6"
              aria-label="Glavna navigacija"
            >
              {navItemsAll.map((item) => (
                <NavLink
                  key={item.href}
                  item={item}
                  pathname={pathname}
                  locationHash={locationHash}
                />
              ))}
            </nav>

            <button
              type="button"
              className="relative z-[80] flex h-11 w-11 shrink-0 items-center justify-center sm:hidden"
              aria-expanded={open}
              aria-controls="mobile-overlay-nav"
              aria-label={open ? "Zatvori meni" : "Otvori meni"}
              onClick={() => setOpen((v) => !v)}
            >
              {open ? (
                <Image
                  src="/icons/menu-closed.png"
                  alt=""
                  width={32}
                  height={32}
                  className="size-8 select-none object-contain"
                  aria-hidden
                  priority
                />
              ) : (
                <Image
                  src="/icons/menu-open.svg"
                  alt=""
                  width={32}
                  height={32}
                  className="size-8 select-none object-contain"
                  aria-hidden
                  priority
                />
              )}
            </button>
          </div>
        </div>
      </header>

      <div
        id="mobile-overlay-nav"
        className={cn(
          "fixed inset-0 z-[60] transition-opacity duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] sm:hidden",
          open ? "opacity-100" : "pointer-events-none opacity-0",
        )}
        role="dialog"
        aria-modal={open}
        aria-hidden={!open}
        aria-label="Meni"
      >
        <button
          type="button"
          className="absolute inset-0 bg-transparent"
          aria-label="Zatvori meni"
          tabIndex={open ? 0 : -1}
          onClick={() => setOpen(false)}
        />

        <div className="pointer-events-none absolute inset-x-0 top-6 flex justify-end px-4 sm:px-6">
          <div
            className={cn(
              "pointer-events-auto relative mr-6 mt-4 aspect-square w-[min(295px,calc((100%-16px)*0.9))] origin-top-right overflow-hidden transition-[transform,opacity,filter] duration-[600ms] ease-[cubic-bezier(0.22,1,0.36,1)] motion-reduce:transition-none",
              open
                ? "translate-y-0 scale-100 opacity-100 blur-0"
                : "-translate-y-1 scale-90 opacity-0 blur-sm",
            )}
          >
            <Image
              src="/illustrations/menu-bg.png"
              alt=""
              fill
              priority
              sizes="(max-width: 640px) 81vw, 295px"
              className="-z-10 object-cover"
              aria-hidden
            />
            <nav
              className="relative flex h-full flex-col justify-center gap-6 px-10"
              aria-label="Mobilna navigacija"
            >
              {navItemsAll.map((item, index) => (
                <Link
                  key={item.href}
                  href={item.href}
                  className={cn(
                    "font-nav text-lg font-bold tracking-[0.12em] transition-[transform,opacity,color] duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] motion-reduce:transition-none",
                    isActive(pathname, item.href, locationHash)
                      ? "text-primary"
                      : "text-white hover:text-primary",
                    open
                      ? "translate-x-0 opacity-100"
                      : "translate-x-3 opacity-0",
                  )}
                  style={{
                    transitionDelay: open
                      ? `${180 + index * 60}ms`
                      : `${(navItemsAll.length - 1 - index) * 30}ms`,
                  }}
                  tabIndex={open ? 0 : -1}
                  onClick={() => setOpen(false)}
                >
                  {item.label}
                </Link>
              ))}
            </nav>
          </div>
        </div>
      </div>
    </>
  );
}
