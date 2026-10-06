export function HomeHeroVideo() {
  return (
    <div className="absolute inset-0 z-0 overflow-hidden" aria-hidden>
      <video
        className="size-full object-cover object-center"
        src="/videos/home-hero.mp4"
        poster="/videos/home-hero-poster.jpg"
        autoPlay
        muted
        loop
        playsInline
        preload="auto"
      />
    </div>
  );
}
