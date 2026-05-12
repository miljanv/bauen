import { SiteContainer } from "@/components/site-container";
import { createPageMetadata } from "@/lib/seo";

export const metadata = createPageMetadata({
  title: "Polisa privatnosti",
  description: "Polisa privatnosti veb sajta Bauen građevinske firme.",
  path: "/polisa-privatnosti",
});

export default function PrivacyPage() {
  return (
    <section className="border-b border-white/10 bg-background py-24 pt-32">
      <SiteContainer className="max-w-3xl">
        <h1 className="font-heading text-3xl font-semibold text-primary">Polisa privatnosti</h1>
        <p className="mt-6 text-sm leading-relaxed text-white/70">
          Ovde možete objaviti tekst polise privatnosti prema vašim poslovnim pravilima i zakonu o zaštiti podataka o
          ličnosti.
        </p>
      </SiteContainer>
    </section>
  );
}
