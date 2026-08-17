import { ArrowUpRight, Star } from "lucide-react";
import { REVIEWS, SITE } from "@/data/site";
import { Kicker, Reveal } from "@/components/Motion";
import FaintGlacier from "@/components/FaintGlacier";

export default function Reviews() {
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
        <div className="review-belt relative" data-testid="reviews-belt">
          <div className="pointer-events-none absolute inset-y-0 left-0 z-10 w-14 bg-gradient-to-r from-[#030712] to-transparent sm:w-32" aria-hidden="true" />
          <div className="pointer-events-none absolute inset-y-0 right-0 z-10 w-14 bg-gradient-to-l from-[#030712] to-transparent sm:w-32" aria-hidden="true" />
          <div className="animate-marquee-slow flex w-max items-stretch gap-5 px-5">
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
          </div>
        </div>
      </Reveal>
    </section>
  );
}
