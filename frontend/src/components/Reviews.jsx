import { useEffect, useRef, useState } from "react";
import { motion, useAnimationFrame, useMotionValue, wrap } from "framer-motion";
import { ArrowUpRight, Star } from "lucide-react";
import { REVIEWS, SITE } from "@/data/site";
import { Kicker, Reveal } from "@/components/Motion";
import FaintGlacier from "@/components/FaintGlacier";

export default function Reviews() {
  const x = useMotionValue(0);
  const trackRef = useRef(null);
  const [half, setHalf] = useState(0);
  const dragging = useRef(false);
  const hovering = useRef(false);
  const resumeAt = useRef(0);
  const flingV = useRef(0);
  const reduced =
    typeof window !== "undefined" &&
    window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  useEffect(() => {
    const measure = () => trackRef.current && setHalf(trackRef.current.scrollWidth / 2);
    measure();
    window.addEventListener("resize", measure);
    return () => window.removeEventListener("resize", measure);
  }, []);

  useAnimationFrame((_, delta) => {
    if (!half || dragging.current || reduced) return;
    if (Math.abs(flingV.current) > 6) {
      x.set(wrap(-half, 0, x.get() + flingV.current * (delta / 1000)));
      flingV.current *= Math.pow(0.94, delta / 16.7);
      return;
    }
    flingV.current = 0;
    if (hovering.current) return;
    if (performance.now() < resumeAt.current) return;
    x.set(wrap(-half, 0, x.get() - delta * 0.045));
  });

  const handleDrag = () => {
    if (!half) return;
    const wrapped = wrap(-half, 0, x.get());
    if (wrapped !== x.get()) x.set(wrapped);
  };

  return (
    <section className="relative overflow-hidden bg-[#030712] py-20 sm:py-24" data-testid="reviews-section">
      <FaintGlacier opacity={0.2} testid="reviews-glacier" />
      <div
        className="pointer-events-none absolute left-1/2 top-0 h-[420px] w-[720px] -translate-x-1/2 rounded-full bg-cyan-500/10 blur-[140px]"
        aria-hidden="true"
      />
      <div className="relative mx-auto max-w-5xl px-5 sm:px-8">
        <Reveal className="text-center">
          <Kicker className="justify-center">Google reviews · Manually curated</Kicker>
          <h2 className="font-display mt-4 text-3xl font-bold tracking-tight text-white sm:text-4xl lg:text-5xl">
            What Our <span className="text-gradient-ice">Customers Say</span>
          </h2>
          <a
            href={SITE.googleProfile}
            target="_blank"
            rel="noopener noreferrer"
            data-testid="reviews-google-link"
            className="group mt-6 inline-flex items-center gap-1.5 rounded-full border border-cyan-400/25 px-5 py-2.5 text-sm font-semibold text-cyan-300 transition hover:border-cyan-300/60 hover:bg-cyan-400/10"
          >
            See Us on Google
            <ArrowUpRight className="h-4 w-4 transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
          </a>
        </Reveal>
      </div>

      <Reveal delay={0.12} className="mt-12">
        <div
          className="relative"
          data-testid="reviews-belt"
          onMouseEnter={() => (hovering.current = true)}
          onMouseLeave={() => (hovering.current = false)}
        >
          <div className="pointer-events-none absolute inset-y-0 left-0 z-10 w-14 bg-gradient-to-r from-[#030712] to-transparent sm:w-32" aria-hidden="true" />
          <div className="pointer-events-none absolute inset-y-0 right-0 z-10 w-14 bg-gradient-to-l from-[#030712] to-transparent sm:w-32" aria-hidden="true" />
          <motion.div
            ref={trackRef}
            style={{ x }}
            drag={half ? "x" : false}
            dragMomentum={false}
            dragConstraints={{ left: -half * 1.5, right: 0 }}
            dragElastic={0.12}
            onDragStart={() => {
              dragging.current = true;
              flingV.current = 0;
            }}
            onDrag={handleDrag}
            onDragEnd={(e, info) => {
              dragging.current = false;
              flingV.current = info.velocity.x;
              resumeAt.current = performance.now() + 250;
            }}
            className="flex w-max cursor-grab select-none items-stretch gap-5 px-5 active:cursor-grabbing"
            data-testid="reviews-track"
          >
            {[...REVIEWS, ...REVIEWS].map((r, i) => (
              <figure
                key={i}
                data-testid={`review-card-${i % REVIEWS.length}`}
                className="glow-card flex w-[320px] shrink-0 flex-col rounded-3xl border border-cyan-400/12 bg-[#081120]/85 p-6 sm:w-[400px] sm:p-7"
              >
                <div className="flex items-center gap-1.5" aria-label={`${r.stars} star review`}>
                  {Array.from({ length: r.stars }).map((_, s) => (
                    <Star key={s} className="h-4 w-4 fill-amber-400 text-amber-400" />
                  ))}
                </div>
                <blockquote className="mt-4 flex-1 text-sm leading-relaxed text-slate-200">
                  "{r.text}"
                </blockquote>
                <figcaption className="mt-5 flex items-center gap-3 border-t border-cyan-400/10 pt-4">
                  <span className="font-display flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-cyan-400/15 text-xs font-bold text-cyan-300">
                    {r.name.charAt(0)}
                  </span>
                  <span>
                    <span className="block text-sm font-semibold text-white">{r.name}</span>
                    <span className="block text-[11px] text-slate-500">Google review</span>
                  </span>
                </figcaption>
              </figure>
            ))}
          </motion.div>
          <p className="mt-6 text-center font-mono2 text-[10px] uppercase tracking-[0.24em] text-slate-600">
            Drag or swipe · pauses on hover
          </p>
        </div>
      </Reveal>
    </section>
  );
}
