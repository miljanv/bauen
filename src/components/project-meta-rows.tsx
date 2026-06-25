import type { ProjectMetaRow } from "@/lib/projects";

type ProjectMetaRowsProps = {
  rows: ProjectMetaRow[];
};

export function ProjectMetaRows({ rows }: ProjectMetaRowsProps) {
  return (
    <dl className="flex w-full max-w-[497px] flex-col gap-4">
      {rows.map((row) => (
        <div
          key={row.label}
          className="flex items-start justify-between gap-4 border-b border-primary pb-6"
        >
          <dt className="shrink-0 font-heading text-xl font-normal leading-[1.2] text-primary md:text-2xl">
            {row.label}
          </dt>
          <dd className="max-w-[55%] text-right font-sans text-base leading-[22px] text-neutral-200 break-words">
            {row.value}
          </dd>
        </div>
      ))}
    </dl>
  );
}
