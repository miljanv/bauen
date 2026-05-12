"use client";

import Image from "next/image";
import { useState } from "react";

import { cn } from "@/lib/utils";

const YOUTUBE_VIDEO_ID = "EQKvvItGsGI";

const PROMO_VIDEO_EMBED_SRC = `https://www.youtube-nocookie.com/embed/${YOUTUBE_VIDEO_ID}?${new URLSearchParams(
  {
    autoplay: "1",
    rel: "0",
    playsinline: "1",
    modestbranding: "1",
  },
).toString()}`;

type HomePromoVideoProps = {
  posterSrc: string;
  posterSizes: string;
};

export function HomePromoVideo({
  posterSrc,
  posterSizes,
}: HomePromoVideoProps) {
  const [playing, setPlaying] = useState(false);

  return (
    <div
      className={cn(
        "relative w-full overflow-hidden bg-background",
        "aspect-video lg:aspect-1312/908 lg:min-h-[400px]",
        "[--promo-l:clamp(12px,0.3vw,20px)]",
      )}
    >
      {/* L-accent: top bar ~60% width, left bar ~60% height (not full edge length) */}
      <div
        className="pointer-events-none absolute left-0 top-0 z-0 h-(--promo-l) w-[60%] bg-primary"
        aria-hidden
      />
      <div
        className="pointer-events-none absolute left-0 top-0 z-0 h-[60%] w-(--promo-l) bg-primary"
        aria-hidden
      />

      {/* Inset so orange L shows above/left; full-bleed muted would hide z-0 accents */}
      <div className="absolute top-(--promo-l) left-(--promo-l) right-0 bottom-0 z-10 min-h-0 bg-muted">
        {playing ? (
          <iframe
            src={PROMO_VIDEO_EMBED_SRC}
            title="BAUEN — Prvih 30 godina, promo video"
            className="h-full min-h-0 w-full border-0"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
            allowFullScreen
            referrerPolicy="strict-origin-when-cross-origin"
          />
        ) : (
          <div className="relative size-full min-h-0">
            <Image
              src={posterSrc}
              alt="BAUEN — Prvih 30 godina, poster za promo video"
              fill
              className="object-cover"
              sizes={posterSizes}
            />
            <button
              type="button"
              className="absolute inset-0 cursor-pointer bg-transparent focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 focus-visible:ring-offset-muted"
              aria-label="Pusti promo video"
              onClick={() => setPlaying(true)}
            />
          </div>
        )}
      </div>
    </div>
  );
}
