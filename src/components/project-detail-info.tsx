"use client";

import { useState } from "react";

import { ProjectMetaRows } from "@/components/project-meta-rows";
import { SiteContainer } from "@/components/site-container";
import type { ProjectMetaRow } from "@/lib/projects";

type ProjectDetailInfoProps = {
  meta: ProjectMetaRow[];
  metaExpanded?: ProjectMetaRow[];
  summaryShort: string;
  summaryParagraphs: string[];
};

export function ProjectDetailInfo({
  meta,
  metaExpanded,
  summaryShort,
  summaryParagraphs,
}: ProjectDetailInfoProps) {
  const [expanded, setExpanded] = useState(false);
  const visibleMeta =
    expanded && metaExpanded ? [...meta, ...metaExpanded] : meta;
  const hasMore =
    summaryParagraphs.length > 1 || summaryShort !== summaryParagraphs[0];

  return (
    <section className="border-b border-white/10 bg-background py-12 md:py-16">
      <SiteContainer className="px-4 md:px-8">
        <div className="flex flex-col gap-10 lg:flex-row lg:items-start lg:gap-8">
          <ProjectMetaRows rows={visibleMeta} />
          <div className="min-w-0 flex-1 font-sans text-xl font-medium leading-[1.2] text-neutral-50 md:text-2xl">
            {!expanded ? (
              <p>
                {summaryShort}{" "}
                {hasMore ? (
                  <button
                    type="button"
                    onClick={() => setExpanded(true)}
                    className="inline cursor-pointer text-primary transition-colors hover:text-primary-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary"
                  >
                    Vidi više &gt;
                  </button>
                ) : null}
              </p>
            ) : (
              <div className="flex flex-col gap-4">
                {summaryParagraphs.map((paragraph, index) => (
                  <p key={index}>{paragraph}</p>
                ))}
                {hasMore ? (
                  <p>
                    <button
                      type="button"
                      onClick={() => setExpanded(false)}
                      className="cursor-pointer text-primary transition-colors hover:text-primary-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary"
                    >
                      Vidi manje &gt;
                    </button>
                  </p>
                ) : null}
              </div>
            )}
          </div>
        </div>
      </SiteContainer>
    </section>
  );
}
