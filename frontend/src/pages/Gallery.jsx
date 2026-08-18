import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { ChevronLeft, ChevronRight, X } from "lucide-react";
import { GALLERY } from "@/data/site";
import PageHeader from "@/components/PageHeader";
import CTABand from "@/components/CTABand";
import { Reveal } from "@/components/Motion";

export default function Gallery() {
  const [active, setActive] = useState(null);

  useEffect(() => {
    document.body.style.overflow = active !== null ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [active]);

  useEffect(() => {
    if (active === null) return undefined;
    const onKey = (e) => {
      if (e.key === "Escape") setActive(null);
      if (e.key === "ArrowRight") setActive((a) => (a + 1) % GALLERY.length);
      if (e.key === "ArrowLeft") setActive((a) => (a - 1 + GALLERY.length) % GALLERY.length);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [active]);

  return (
    <main>
      <PageHeader
        kicker="Gallery"
        lines={["Real water.", "Real deliveries."]}
        sub="No stock photography here. This is our stock, our vehicles and our customers' doorsteps across the GTA."
        image="/images/water7.webp"
        title="Gallery | Drop2Door Water Delivery Services"
      />

      <section className="bg-[#030712] py-12 sm:py-20" data-testid="gallery-grid">
        <div className="mx-auto max-w-7xl px-5 sm:px-8">
          <div className="grid auto-rows-auto grid-flow-dense grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {GALLERY.map((g, i) => (
              <Reveal key={g.src} delay={Math.min(i * 0.06, 0.4)} className={g.cls}>
                <figure
                  className="group relative h-full w-full cursor-pointer overflow-hidden rounded-3xl border border-cyan-400/10"
                  data-testid={`gallery-item-${i}`}
                  onClick={() => setActive(i)}
                >
                  {g.type === "video" ? (
                    <video
                      src={g.src}
                      poster={g.poster}
                      muted
                      loop
                      playsInline
                      autoPlay
                      preload="metadata"
                      className="h-full w-full object-cover transition-transform duration-[1.4s] ease-out group-hover:scale-[1.06]"
                      data-testid={`gallery-video-${i}`}
                    />
                  ) : (
                    <img
                      src={g.src}
                      alt={g.alt}
                      loading="lazy"
                      className="h-full w-full object-cover transition-transform duration-[1.4s] ease-out group-hover:scale-[1.06]"
                    />
                  )}
                  {g.type === "video" && (
                    <span className="absolute right-4 top-4 rounded-full border border-cyan-400/30 bg-[#030712]/70 px-3 py-1 font-mono2 text-[9px] uppercase tracking-[0.18em] text-cyan-300 backdrop-blur-sm">
                      Video
                    </span>
                  )}
                  <div className="absolute inset-0 bg-gradient-to-t from-[#030712]/70 via-transparent to-transparent opacity-80 transition-opacity duration-500 group-hover:opacity-100" aria-hidden="true" />
                  {g.cap && (
                    <figcaption className="absolute bottom-5 left-5 right-5">
                      <span className="font-mono2 text-[10px] uppercase tracking-[0.22em] text-cyan-200/90">
                        {g.cap}
                      </span>
                    </figcaption>
                  )}
                </figure>
              </Reveal>
            ))}
          </div>
          <Reveal delay={0.2}>
            <p className="mt-10 max-w-2xl text-sm leading-relaxed text-slate-500">
              Every photo on this site is a real Drop2Door delivery, vehicle or product. What you
              see is what shows up at your door.
            </p>
          </Reveal>
        </div>
      </section>

      <CTABand
        kicker="Your turn"
        title="Next delivery photo could be yours."
        sub="Homes, offices, events. Ten cases minimum, scheduled around your day."
      />

      <AnimatePresence>
        {active !== null && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="fixed inset-0 z-[80] flex items-center justify-center bg-slate-950/92 p-4 backdrop-blur-md"
            onClick={() => setActive(null)}
            data-testid="gallery-lightbox"
          >
            <button
              aria-label="Close photo"
              data-testid="lightbox-close"
              onClick={() => setActive(null)}
              className="absolute right-5 top-5 z-10 rounded-full border border-cyan-400/25 bg-[#081120]/80 p-2.5 text-slate-300 transition hover:text-white"
            >
              <X className="h-5 w-5" />
            </button>
            <button
              aria-label="Previous photo"
              data-testid="lightbox-prev"
              onClick={(e) => {
                e.stopPropagation();
                setActive((a) => (a - 1 + GALLERY.length) % GALLERY.length);
              }}
              className="absolute left-3 top-1/2 z-10 -translate-y-1/2 rounded-full border border-cyan-400/25 bg-[#081120]/80 p-3 text-cyan-300 transition hover:bg-cyan-400/15 sm:left-6"
            >
              <ChevronLeft className="h-5 w-5" />
            </button>
            <motion.figure
              key={active}
              drag="x"
              dragConstraints={{ left: 0, right: 0 }}
              dragElastic={0.25}
              onDragEnd={(e, info) => {
                if (info.offset.x < -80) setActive((a) => (a + 1) % GALLERY.length);
                else if (info.offset.x > 80) setActive((a) => (a - 1 + GALLERY.length) % GALLERY.length);
              }}
              onClick={(e) => e.stopPropagation()}
              initial={{ opacity: 0, scale: 0.96 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
              className="max-w-4xl cursor-grab active:cursor-grabbing"
              data-testid="lightbox-figure"
            >
              {GALLERY[active].type === "video" ? (
                <video
                  src={GALLERY[active].src}
                  poster={GALLERY[active].poster}
                  controls
                  autoPlay
                  playsInline
                  className="max-h-[76vh] w-auto max-w-full rounded-2xl border border-cyan-400/15"
                  data-testid="lightbox-video"
                />
              ) : (
                <img
                  src={GALLERY[active].src}
                  alt={GALLERY[active].alt}
                  draggable="false"
                  className="max-h-[76vh] w-auto max-w-full select-none rounded-2xl border border-cyan-400/15 object-contain"
                />
              )}
              <figcaption className="mt-4 text-center">
                {GALLERY[active].cap && (
                  <span className="font-mono2 text-[10px] uppercase tracking-[0.24em] text-cyan-200/80">
                    {GALLERY[active].cap}
                  </span>
                )}
                <span className="mt-1 block font-mono2 text-[10px] tracking-[0.2em] text-slate-500">
                  {active + 1} / {GALLERY.length} · swipe or use arrows
                </span>
              </figcaption>
            </motion.figure>
            <button
              aria-label="Next photo"
              data-testid="lightbox-next"
              onClick={(e) => {
                e.stopPropagation();
                setActive((a) => (a + 1) % GALLERY.length);
              }}
              className="absolute right-3 top-1/2 z-10 -translate-y-1/2 rounded-full border border-cyan-400/25 bg-[#081120]/80 p-3 text-cyan-300 transition hover:bg-cyan-400/15 sm:right-6"
            >
              <ChevronRight className="h-5 w-5" />
            </button>
          </motion.div>
        )}
      </AnimatePresence>
    </main>
  );
}
