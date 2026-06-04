import { siteImages } from "@/lib/site-images";

export type ProjectMetaRow = {
  label: string;
  value: string;
};

export type ProjectGalleryItem = {
  src: string;
  alt: string;
  layout: "half" | "full";
};

export type Project = {
  slug: string;
  title: string;
  subtitle: string;
  seoTitle: string;
  seoDescription: string;
  category: string;
  heroImage: string;
  heroImageAlt: string;
  /** Figma hero crop — fokus na gornji deo kadra */
  heroObjectPosition?: string;
  meta: ProjectMetaRow[];
  metaExpanded?: ProjectMetaRow[];
  summaryShort: string;
  summaryParagraphs: string[];
  gallery: ProjectGalleryItem[];
};

const PROJECT_BODY =
  "Ovaj projekat je bio od presudnog značaja za našu firmu i sigurno možemo reći da je predstavljao prekretnicu u našem poslovanju i od nas načinio firmu koja smo danas. Bez ikakve sumnje to je bio naš najveći projekat do tada i zbog važnosti objekta koji smo sagradili svakako predstavlja naše nasleđe. Kao porodični ljudi koji neguju tradiciju i porodične vrednosti, biti deo ovog projekta je za nas predstavljalo veliku čast ali i obavezu.";

function buildGalleryFromHero(
  hero: string,
  alt: string,
): ProjectGalleryItem[] {
  return [
    { src: hero, alt, layout: "half" },
    { src: hero, alt, layout: "half" },
    { src: hero, alt, layout: "full" },
    { src: hero, alt, layout: "half" },
    { src: hero, alt, layout: "half" },
  ];
}

const balkanskiBase = "/images/projekti/balkanski-tok";

export const projects: Project[] = [
  {
    slug: "gradjevinski-radovi-balkanski-tok",
    title: "Građevinski radovi na magistralnom toku gasovoda „Balkanski tok“",
    subtitle:
      "Od porodičnih početaka do savremene građevinske kompanije, naš put obeležavaju posvećenost, stručnost i kontinuiran rast.",
    seoTitle: "Balkanski tok — građevinski radovi",
    seoDescription:
      "Bauen — građevinski radovi na magistralnom gasovodu Balkanski tok: infrastruktura, merne stanice i kompresorska stanica u Srbiji.",
    category: "Energetska infrastruktura / Gasovodi",
    heroImage: `${balkanskiBase}/hero.jpg`,
    heroImageAlt: "Gradilište magistralnog gasovoda Balkanski tok",
    heroObjectPosition: "center 28%",
    meta: [
      { label: "Projekat", value: "Balkanski tok / Turski tok Gasovod" },
      { label: "Kategorija", value: "Energetska infrastruktura / Gasovodi" },
      { label: "Lokacija", value: "Srbija — Zaječar do Horgoša" },
    ],
    metaExpanded: [
      { label: "Period realizacije", value: "2019 — 2021" },
      { label: "Dužina trase", value: "403 km" },
      { label: "Kapacitet gasovoda", value: "13 milijardi m³ godišnje" },
      { label: "Obim projekta", value: "190.000+ tona cevi velikog prečnika" },
    ],
    summaryShort:
      "Zahvaljujući dugogodišnjem iskustvu, stručnom timu i velikim infrastrukturnim projektima iza sebe, kompanija Bauen danas predstavlja jednog od pouzdanih partnera u oblasti energetike i građevine. Posebno mesto u našem poslovanju zauzima projekat magistralnog gasovoda „Balkanski tok“, jednog od najznačajnijih infrastrukturnih projekata u Srbiji i regionu.",
    summaryParagraphs: [
      "Zahvaljujući dugogodišnjem iskustvu, stručnom timu i velikim infrastrukturnim projektima iza sebe, kompanija Bauen danas predstavlja jednog od pouzdanih partnera u oblasti energetike i građevine. Posebno mesto u našem poslovanju zauzima projekat magistralnog gasovoda „Balkanski tok“, jednog od najznačajnijih infrastrukturnih projekata u Srbiji i regionu.",
      "Tokom realizacije projekta, koji je građen u izazovnim uslovima pandemije COVID-19, kompanija je učestvovala u izgradnji više od 20 infrastrukturnih objekata, uključujući glavne merne stanice, blok ventil stanice i jedinstvenu kompresorsku stanicu u Žabarima kod Velike Plane.",
      "Tokom dve godine izgradnje realizovano je više od 20 infrastrukturnih objekata, uključujući jedinstvenu kompresorsku stanicu u Žabarima, uz angažovanje više od 1.500 radnika i rad u otežanim uslovima tokom pandemije korona virusa.",
    ],
    gallery: [
      { src: `${balkanskiBase}/gallery-1.jpg`, alt: "Radovi na trasi gasovoda", layout: "half" },
      { src: `${balkanskiBase}/gallery-2.jpg`, alt: "Montaža cevovoda na terenu", layout: "half" },
      { src: `${balkanskiBase}/hero.jpg`, alt: "Pregled gradilišta Balkanski tok", layout: "full" },
      { src: `${balkanskiBase}/gallery-3.jpg`, alt: "Građevinska mehanizacija na projektu", layout: "half" },
      { src: `${balkanskiBase}/gallery-4.jpg`, alt: "Izgradnja infrastrukturnog objekta", layout: "half" },
      { src: `${balkanskiBase}/hero.jpg`, alt: "Panorama radova na gasovodu", layout: "half" },
      { src: `${balkanskiBase}/gallery-5.jpg`, alt: "Završna faza radova na trasi", layout: "half" },
    ],
  },
  {
    slug: "radovi-auto-put-milos-veliki",
    title: "Radovi na auto-putu „Miloš Veliki“",
    subtitle:
      "Projekat od ključnog značaja koji je predstavljao prekretnicu u razvoju kompanije Bauen.",
    seoTitle: "Auto-put Miloš Veliki",
    seoDescription:
      "Bauen — učešće u izgradnji auto-puta Miloš Veliki: pouzdana realizacija velikih infrastrukturnih radova u Srbiji.",
    category: "Visokogradnja / Infrastruktura",
    heroImage: siteImages.projekti.projectMilos,
    heroImageAlt: "Radovi na auto-putu Miloš Veliki",
    meta: [
      { label: "Projekat", value: "Auto-put „Miloš Veliki“" },
      { label: "Kategorija", value: "Visokogradnja / Infrastruktura" },
      { label: "Lokacija", value: "Srbija" },
    ],
    summaryShort: PROJECT_BODY,
    summaryParagraphs: [PROJECT_BODY],
    gallery: buildGalleryFromHero(
      siteImages.projekti.projectMilos,
      "Radovi na auto-putu Miloš Veliki",
    ),
  },
  {
    slug: "asfaltna-baza-extra-auto",
    title: "Asfaltna baza za Extra Auto",
    subtitle:
      "Izgradnja objekta trajne vrednosti namenjenog budućim generacijama i razvoju regionalne infrastrukture.",
    seoTitle: "Asfaltna baza Extra Auto",
    seoDescription:
      "Bauen — izgradnja asfaltne baze za Extra Auto: kompletna građevinska i zanatska rešenja po najvišim standardima.",
    category: "Visokogradnja / Industrijski objekti",
    heroImage: siteImages.projekti.projectExtraAuto,
    heroImageAlt: "Asfaltna baza Extra Auto",
    meta: [
      { label: "Projekat", value: "Asfaltna baza Extra Auto" },
      { label: "Kategorija", value: "Visokogradnja / Industrijski objekti" },
      { label: "Lokacija", value: "Srbija" },
    ],
    summaryShort: PROJECT_BODY,
    summaryParagraphs: [PROJECT_BODY],
    gallery: buildGalleryFromHero(
      siteImages.projekti.projectExtraAuto,
      "Asfaltna baza Extra Auto",
    ),
  },
  {
    slug: "sportski-centar-zmajevo",
    title: "Sportski centar „Zmajevo“",
    subtitle:
      "Projekat od ključnog značaja koji je predstavljao prekretnicu u razvoju kompanije i našem portfoliju.",
    seoTitle: "Sportski centar Zmajevo",
    seoDescription:
      "Bauen — izgradnja sportskog centra Zmajevo: savremeni objekat za sport i rekreaciju po meri investitora.",
    category: "Visokogradnja / Sportski objekti",
    heroImage: siteImages.projekti.projectZmajevo,
    heroImageAlt: "Sportski centar Zmajevo",
    meta: [
      { label: "Projekat", value: "Sportski centar „Zmajevo“" },
      { label: "Kategorija", value: "Visokogradnja / Sportski objekti" },
      { label: "Lokacija", value: "Zmajevo, Srbija" },
    ],
    summaryShort: PROJECT_BODY,
    summaryParagraphs: [PROJECT_BODY],
    gallery: buildGalleryFromHero(
      siteImages.projekti.projectZmajevo,
      "Sportski centar Zmajevo",
    ),
  },
];

export function getProjectBySlug(slug: string): Project | undefined {
  return projects.find((p) => p.slug === slug);
}

export function getAllProjectSlugs(): string[] {
  return projects.map((p) => p.slug);
}

export function getProjectPath(slug: string): string {
  return `/projekti/${slug}`;
}
