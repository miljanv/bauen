/**
 * Donji-desni L na milestone slikama — iste dimenzije kao `LCornerFrame` border,
 * na hover slike krake se popunjavaju od suprotnih kraja ka čošku.
 */
export function MilestoneImageBrCorner() {
  return (
    <div
      className="pointer-events-none absolute bottom-[-4px] right-[-4px] z-10 h-14 w-14 sm:bottom-[-6px] sm:right-[-6px] sm:h-20 sm:w-20 lg:bottom-[-6px] lg:right-[-6px] lg:h-[90%] lg:w-[60%]"
      aria-hidden
    >
      <div className="milestone-br-arm-v absolute right-0 top-0 h-full w-[4px] bg-primary sm:w-[6px] lg:w-[8px]" />
      <div className="milestone-br-arm-h absolute bottom-0 left-0 h-[4px] w-full bg-primary sm:h-[6px] lg:h-[8px]" />
    </div>
  );
}
