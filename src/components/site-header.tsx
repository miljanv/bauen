"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Menu, X } from "lucide-react";
import { useEffect, useState } from "react";

import { BauenLogo } from "@/components/bauen-logo";
import { navItemsAll } from "@/lib/site-config";
import { cn } from "@/lib/utils";

function isActive(pathname: string, href: string, locationHash: string) {
  if (href === "/") {
    return (
      pathname === "/" &&
      (locationHash === "" || locationHash === "#")
    );
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
  /** Empty until mount so SSR and first client paint match; then synced with `window.location.hash`. */
  const [locationHash, setLocationHash] = useState("");

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
          "fixed left-0 right-0 top-0 z-50 h-20 border-transparent bg-transparent transition-colors duration-300",
          open ? "z-[70]" : "z-50",
        )}
      >
        <div className="mx-auto h-full max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="flex h-full w-full items-center justify-between gap-5 lg:justify-center lg:gap-6">
            <Link
              href="/"
              className="shrink-0 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 focus-visible:ring-offset-background"
            >
              <BauenLogo variant="icon" />
            </Link>

            <nav
              className="hidden items-center gap-5 lg:flex lg:gap-6"
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
              className="flex h-11 w-11 shrink-0 items-center justify-center text-primary lg:hidden"
              aria-expanded={open}
              aria-controls="mobile-overlay-nav"
              aria-label={open ? "Zatvori meni" : "Otvori meni"}
              onClick={() => setOpen((v) => !v)}
            >
              {open ? <X className="size-7 stroke-[1.5]" /> : <Menu className="size-6" />}
            </button>
          </div>
        </div>
      </header>

      {open ? (
        <div
          id="mobile-overlay-nav"
          className="fixed inset-0 z-[60] flex flex-col bg-background/98 pt-20 lg:hidden"
          role="dialog"
          aria-modal="true"
          aria-label="Meni"
        >
          <div className="flex flex-1 flex-col px-6 pb-10 pt-6">
            <nav className="flex flex-col gap-6" aria-label="Mobilna navigacija">
              {navItemsAll.map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  className={cn(
                    "font-nav text-lg font-bold tracking-[0.12em] transition-colors",
                    isActive(pathname, item.href, locationHash)
                      ? "text-primary"
                      : "text-white hover:text-primary",
                  )}
                  onClick={() => setOpen(false)}
                >
                  {item.label}
                </Link>
              ))}
            </nav>
            <div className="pointer-events-none mt-auto flex justify-end opacity-[0.08]" aria-hidden>
              <span className="font-heading text-[8rem] font-black leading-none text-primary">B</span>
            </div>
          </div>
        </div>
      ) : null}
    </>
  );
}
