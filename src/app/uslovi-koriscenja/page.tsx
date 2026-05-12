import { SiteContainer } from "@/components/site-container";
import { createPageMetadata } from "@/lib/seo";

export const metadata = createPageMetadata({
  title: "Uslovi korišćenja",
  description: "Uslovi korišćenja veb sajta Bauen građevinske firme.",
  path: "/uslovi-koriscenja",
});

export default function TermsPage() {
  return (
    <section className="border-b border-white/10 bg-background py-24 pt-32">
      <SiteContainer className="max-w-3xl">
        <h1 className="font-heading text-3xl font-semibold text-primary">Uslovi korišćenja</h1>
        <p className="mt-6 text-sm leading-relaxed text-white/70">
          Ovde možete objaviti uslove korišćenja sajta, autorska prava i ograničenja odgovornosti u skladu sa vašim
          pravnim savetom.
        </p>
      </SiteContainer>
    </section>
  );
}
