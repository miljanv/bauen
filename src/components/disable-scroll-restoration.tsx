"use client";

import { useEffect } from "react";

/**
 * Disables browser scroll restoration so a hard refresh always starts at the top.
 * Hash links (e.g. /#projekti) are preserved.
 */
export function DisableScrollRestoration() {
  useEffect(() => {
    if ("scrollRestoration" in history) {
      history.scrollRestoration = "manual";
    }

    const scrollToTopUnlessHash = () => {
      if (window.location.hash) return;
      window.scrollTo(0, 0);
    };

    scrollToTopUnlessHash();

    const onPageShow = (event: PageTransitionEvent) => {
      if (event.persisted) scrollToTopUnlessHash();
    };

    window.addEventListener("pageshow", onPageShow);
    return () => window.removeEventListener("pageshow", onPageShow);
  }, []);

  return null;
}
