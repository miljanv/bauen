import type { MouseEvent } from "react";

/** Next.js `<Link>` to the current route is a no-op; force a full reload instead. */
export function reloadOnSamePage(
  event: MouseEvent<HTMLAnchorElement>,
  pathname: string,
  href: string,
) {
  if (
    href !== pathname ||
    event.button !== 0 ||
    event.metaKey ||
    event.ctrlKey ||
    event.shiftKey ||
    event.altKey
  ) {
    return;
  }
  event.preventDefault();
  window.scrollTo(0, 0);
  window.location.assign(href);
}
