export const siteConfig = {
  name: "Bauen",
  tagline: "Građevinska firma",
  description:
    "Bauen obavlja građevinske radove, rekonstrukcije i upravljanje projektima uz fokus na kvalitet, rokove i transparentnost.",
  email: "info@bauen.rs",
  phone: "+381 66 604 00 22",
  address: {
    street: "Milivoja Čobanskog 200",
    city: "Vrbas",
    postal: "21460",
    country: "Srbija",
  },
  social: {
    twitter: "https://twitter.com",
    facebook: "https://www.facebook.com",
    discord: "https://discord.com",
    linkedin: "https://www.linkedin.com",
    instagram: "https://www.instagram.com",
    youtube: "https://www.youtube.com",
  },
} as const;

/** Figma 117:371 — prva grupa linkova u hero pill-u */
export const navPrimary = [
  { href: "/", label: "NASLOVNA" },
  { href: "/o-nama", label: "O NAMA" },
] as const;

/** Druga grupa */
export const navSecondary = [
  { href: "/projekti", label: "PROJEKTI" },
  { href: "/kontakt", label: "KONTAKT" },
] as const;

export const navItemsAll = [...navPrimary, ...navSecondary] as const;
