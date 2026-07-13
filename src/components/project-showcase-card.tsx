import Image from "next/image";
import Link from "next/link";
import { ChevronRight } from "lucide-react";
import type { ReactNode } from "react";

import { BauenCtaLink } from "@/components/bauen-cta-button";
import { ProjectSubtractCorners } from "@/components/project-subtract-corners";
import { Reveal } from "@/components/reveal";
import { cn } from "@/lib/utils";

const projectCardGlassStyle = {
  backgroundImage:
    "radial-gradient(70.56% 70.56% at 69.32% 29.44%, rgba(82, 115, 164, 0.30) 0%, rgba(152, 174, 216, 0.03) 100%)",
  boxShadow: "inset 0 205px 82px 1px rgba(125, 109, 162, 0.01)",
} as const;

type ProjectShowcaseCardProps = {
  image: string;
  alt: string;
  title: string;
  description: string;
  href: string;
  reverse?: boolean;
  cta?: ReactNode;
  /** When false, skips own scroll reveal (use when a parent section already reveals). */
  animate?: boolean;
};

export function ProjectShowcaseCard({
  image,
  alt,
  title,
  description,
  href,
  reverse = false,
  cta,
  animate = true,
}: ProjectShowcaseCardProps) {
  const imageClassName =
    "relative w-full overflow-visible max-lg:h-[271px] lg:aspect-705/529 lg:w-[min(705px,48%)] lg:max-w-[705px] lg:shrink-0";
  const bodyClassName =
    "relative z-10 flex w-full flex-col items-start gap-4 rounded-[3px] border border-white/12 px-[33px] pb-[25px] pt-[37px] backdrop-blur-[10.45px] lg:w-[min(518px,42%)] lg:max-w-[518px] lg:shrink-0 lg:px-8 lg:pb-6 lg:pt-9";

  const imageBlock = (
    <Link href={href} className="corner-hover-zone relative block size-full">
      <div className="absolute inset-0 overflow-hidden">
        <Image
          src={image}
          alt={alt}
          fill
          className="corner-hover-zoom-target object-cover"
          sizes="(max-width:1024px) 100vw, 705px"
        />
      </div>
      <ProjectSubtractCorners
        variant={reverse ? "image-right" : "image-left"}
        className="max-lg:size-4"
        hoverFx
      />
    </Link>
  );

  const bodyBlock = (
    <>
      <h3 className="font-heading text-2xl font-normal leading-[1.2] text-primary">
        <Link
          href={href}
          className="transition-colors hover:text-primary-300"
        >
          {title}
        </Link>
      </h3>
      <p className="font-sans text-base leading-[22px] text-neutral-200">
        {description}
      </p>
      {cta ?? (
        <BauenCtaLink href={href} className="w-fit px-4">
          DETALJNIJE
          <ChevronRight className="size-4 shrink-0" aria-hidden />
        </BauenCtaLink>
      )}
    </>
  );

  return (
    <article className="mx-auto w-full max-w-[1280px]">
      <div
        className={cn(
          "flex flex-col gap-8 lg:flex-row lg:items-center lg:justify-center lg:gap-10",
          reverse && "lg:flex-row-reverse",
        )}
      >
        {animate ? (
          <Reveal
            variant={reverse ? "fade-left" : "fade-right"}
            duration={900}
            className={imageClassName}
          >
            {imageBlock}
          </Reveal>
        ) : (
          <div className={imageClassName}>{imageBlock}</div>
        )}

        {animate ? (
          <Reveal
            variant="fade-up"
            delay={200}
            duration={800}
            style={projectCardGlassStyle}
            className={bodyClassName}
          >
            {bodyBlock}
          </Reveal>
        ) : (
          <div style={projectCardGlassStyle} className={bodyClassName}>
            {bodyBlock}
          </div>
        )}
      </div>
    </article>
  );
}
