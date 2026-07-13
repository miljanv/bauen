import type { Metadata } from "next";
import { Manrope } from "next/font/google";

import { OrganizationJsonLd } from "@/components/organization-json-ld";
import { DisableScrollRestoration } from "@/components/disable-scroll-restoration";
import { SiteFooter } from "@/components/site-footer";
import { SiteHeader } from "@/components/site-header";
import { siteConfig } from "@/lib/site-config";
import { getSiteUrl } from "@/lib/seo";

import "./globals.css";

const manrope = Manrope({
  variable: "--font-manrope",
  subsets: ["latin", "latin-ext"],
  display: "swap",
  weight: ["400", "500", "600", "700", "800"],
});

export const metadata: Metadata = {
  metadataBase: new URL(getSiteUrl()),
  title: {
    default: `${siteConfig.name} — ${siteConfig.tagline}`,
    template: `%s | ${siteConfig.name}`,
  },
  description: siteConfig.description,
  keywords: [
    "građevinska firma",
    "gradjevina",
    "Bauen",
    "rekonstrukcija",
    "projektovanje",
    "Beograd",
  ],
  authors: [{ name: siteConfig.name }],
  openGraph: {
    type: "website",
    locale: "sr_RS",
    siteName: siteConfig.name,
    title: `${siteConfig.name} — ${siteConfig.tagline}`,
    description: siteConfig.description,
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="sr"
      className={`${manrope.variable} h-full scroll-smooth`}
    >
      <body className="flex min-h-full flex-col bg-background text-foreground antialiased">
        <DisableScrollRestoration />
        <OrganizationJsonLd />
        <SiteHeader />
        <main className="flex-1 overflow-x-hidden">{children}</main>
        <SiteFooter />
      </body>
    </html>
  );
}
