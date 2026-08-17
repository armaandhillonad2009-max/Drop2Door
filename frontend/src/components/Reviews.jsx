import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { ArrowUpRight, Star } from "lucide-react";
import { REVIEWS, SITE } from "@/data/site";
import { Kicker, Reveal } from "@/components/Motion";

export default function Reviews() {
  const [index, setIndex] = useState(0);

  useEffect(() => {
    const t = setInterval(() => setIndex((i) => (i + 1) % REVIEWS.length), 5000);
    return () => clearInterval(t);
  }, []);

  const review = REVIEWS[index];

  return (
    <section className="relative overflow-hidden bg-[#030712] py-24 sm:py-32" data-testid="reviews-section">
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
        </Reveal>

        <Reveal delay={0.1} className="mt-14">
          <div className="glow-card relative overflow-hidden rounded-3xl border border-cyan-400/12 bg-[#081120]/80 p-8 sm:p-14">
            <div className="relative min-h-[230px] sm:min-h-[210px]">
              <AnimatePresence mode="wait">
                <motion.figure
                  key={index}
                  initial={{ opacity: 0, y: 24 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -24 }}
                  transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
                  data-testid="review-card"
                  className="flex flex-col items-center text-center"
                >
                  <div className="flex items-center justify-center gap-1.5" aria-label={`${review.stars} star review`}>
                    {Array.from({ length: review.stars }).map((_, i) => (
                      <Star key={i} className="h-5 w-5 fill-amber-400 text-amber-400" />
                    ))}
                  </div>
                  <blockquote className="font-display mx-auto mt-6 max-w-2xl text-2xl font-semibold leading-snug text-white sm:text-3xl">
                    "{review.text}"
                  </blockquote>
                  <figcaption className="mt-7 flex items-center gap-3">
                    <span className="flex h-11 w-11 items-center justify-center rounded-full bg-cyan-400/15 font-display text-sm font-bold text-cyan-300">
                      {review.name.charAt(0)}
                    </span>
                    <span className="text-left">
                      <span className="block text-sm font-semibold text-white">{review.name}</span>
                      <span className="block text-xs text-slate-500">Google review</span>
                    </span>
                  </figcaption>
                </motion.figure>
              </AnimatePresence>
            </div>

            <div className="mt-9 flex items-center justify-between border-t border-cyan-400/10 pt-6">
              <div className="flex gap-2">
                {REVIEWS.map((_, i) => (
                  <button
                    key={i}
                    onClick={() => setIndex(i)}
                    aria-label={`Show review ${i + 1}`}
                    data-testid={`review-dot-${i}`}
                    className={`h-1.5 rounded-full transition-all duration-500 ${
                      i === index ? "w-8 bg-cyan-400" : "w-3 bg-slate-700 hover:bg-slate-500"
                    }`}
                  />
                ))}
              </div>
              <a
                href={SITE.googleProfile}
                target="_blank"
                rel="noopener noreferrer"
                data-testid="reviews-google-link"
                className="group flex items-center gap-1.5 text-sm font-semibold text-cyan-300 transition hover:text-cyan-200"
              >
                See Us on Google
                <ArrowUpRight className="h-4 w-4 transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
              </a>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
