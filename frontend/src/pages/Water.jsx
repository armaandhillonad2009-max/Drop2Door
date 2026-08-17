import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";
import { ORDER_RULES, PRODUCTS, WA_MESSAGES, WATER_TYPES } from "@/data/site";
import PageHeader from "@/components/PageHeader";
import CTABand from "@/components/CTABand";
import { Kicker, Reveal } from "@/components/Motion";
import { useQuote } from "@/context/QuoteContext";
import Tilt from "@/components/Tilt";

export default function Water() {
  const { openQuote } = useQuote();

  return (
    <main>
      <PageHeader
        kicker="Water we deliver"
        lines={["Trusted brands.", "Served ice cold."]}
        sub="Spring, distilled and sparkling water from Kirkland, Eska and Compliments. Pricing is quote-based and depends on your location and order size, so message us for exact numbers and current availability."
        image="/images/panel-glacier.webp"
        title="Water We Deliver | Drop2Door Water Delivery GTA"
      />

      <section className="bg-[#030712] py-20 sm:py-28" data-testid="water-products">
        <div className="mx-auto max-w-7xl px-5 sm:px-8">
          <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
            {PRODUCTS.map((p, i) => (
              <Reveal key={p.name} delay={0.08 * i}>
                <Tilt>
                <article
                  className={`glow-card group flex h-full flex-col overflow-hidden rounded-3xl border border-cyan-400/12 bg-[#081120] transition-all duration-500 hover:rotate-0 hover:shadow-[0_24px_60px_rgba(2,132,199,0.22)] ${
                    ["md:-rotate-2", "md:mt-10 md:rotate-1", "md:-rotate-1"][i % 3]
                  }`}
                  data-testid={`product-card-${p.name.toLowerCase().replace(/[^a-z]+/g, "-")}`}
                >
                  <div className="relative aspect-[3/4] overflow-hidden bg-[radial-gradient(ellipse_at_50%_62%,#0e2a47_0%,#04091a_72%)]">
                    <div className="absolute left-1/2 top-[58%] h-44 w-44 -translate-x-1/2 rounded-full bg-cyan-400/20 blur-3xl transition-all duration-700 group-hover:bg-cyan-400/35" aria-hidden="true" />
                    <img
                      src={p.image}
                      alt={p.alt}
                      loading="lazy"
                      className="absolute inset-0 m-auto max-h-[64%] max-w-[86%] object-contain drop-shadow-[0_28px_44px_rgba(2,132,199,0.35)] transition-transform duration-700 group-hover:scale-[1.06]"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-[#081120] via-transparent to-transparent" aria-hidden="true" />
                  </div>
                  <div className="flex flex-1 flex-col p-7">
                    <div className="flex items-center justify-between gap-3">
                      <h2 className="font-display text-2xl font-bold text-white">{p.name}</h2>
                      <span className="shrink-0 rounded-full border border-cyan-400/25 px-3 py-1 font-mono2 text-[9px] uppercase tracking-[0.14em] text-cyan-300">
                        {p.tag}
                      </span>
                    </div>
                    <p className="mt-1 text-xs uppercase tracking-[0.16em] text-slate-500">{p.type}</p>
                    <p className="mt-4 flex-1 text-sm leading-relaxed text-slate-400">{p.note}</p>
                    <button
                      onClick={() => openQuote("general")}
                      data-testid={`product-quote-${p.name.toLowerCase().replace(/[^a-z]+/g, "-")}`}
                      className="group/btn mt-6 flex items-center gap-2 text-sm font-semibold text-cyan-300 transition hover:text-cyan-200"
                    >
                      Get a quote
                      <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover/btn:translate-x-1" />
                    </button>
                  </div>
                </article>
                </Tilt>
              </Reveal>
            ))}
          </div>
          <Reveal delay={0.25}>
            <p className="mt-10 text-center text-sm text-slate-400" data-testid="water-more-note">
              Looking for another brand?{" "}
              <span className="font-semibold text-cyan-300">Other water companies are available on request.</span>{" "}
              Contact us for exact pricing and availability.
            </p>
          </Reveal>
        </div>
      </section>

      <section className="border-y border-cyan-400/10 bg-[#02050d] py-20 sm:py-28" data-testid="water-types">
        <div className="mx-auto max-w-7xl px-5 sm:px-8">
          <Reveal>
            <Kicker>Three ways to hydrate</Kicker>
            <h2 className="font-display mt-4 text-3xl font-bold tracking-tight text-white sm:text-4xl">
              Pick your water
            </h2>
          </Reveal>
          <div className="mt-12 grid grid-cols-1 gap-6 md:grid-cols-3">
            {WATER_TYPES.map((t, i) => (
              <Reveal key={t.name} delay={0.08 * i}>
                <div className="h-full rounded-3xl border border-cyan-400/10 bg-[#081120]/60 p-7">
                  <span className="font-mono2 text-4xl font-semibold text-cyan-400/20">
                    0{i + 1}
                  </span>
                  <h3 className="font-display mt-4 text-xl font-bold text-white">{t.name}</h3>
                  <p className="mt-3 text-sm leading-relaxed text-slate-400">{t.desc}</p>
                </div>
              </Reveal>
            ))}
          </div>
          <Reveal delay={0.2}>
            <p className="mt-8 max-w-2xl text-sm leading-relaxed text-slate-500">
              Variety and brand availability can change week to week. Message us on WhatsApp and we
              will confirm exactly what is in stock before you order.
            </p>
          </Reveal>
        </div>
      </section>

      <section className="bg-[#030712] py-20 sm:py-28" data-testid="order-rules">
        <div className="mx-auto max-w-7xl px-5 sm:px-8">
          <Reveal>
            <Kicker>Good to know</Kicker>
            <h2 className="font-display mt-4 text-3xl font-bold tracking-tight text-white sm:text-4xl">
              How ordering works
            </h2>
          </Reveal>
          <div className="mt-12 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {ORDER_RULES.map((r, i) => (
              <Reveal key={r.k} delay={0.07 * i}>
                <div className="glow-card h-full rounded-3xl border border-cyan-400/12 bg-[#081120] p-7">
                  <p className="font-mono2 text-[10px] uppercase tracking-[0.22em] text-cyan-300/70">
                    {r.k}
                  </p>
                  <p className="font-display mt-3 text-lg font-bold leading-snug text-white">{r.v}</p>
                </div>
              </Reveal>
            ))}
          </div>
          <Reveal delay={0.2}>
            <p className="mt-8 max-w-2xl text-sm leading-relaxed text-slate-500">
              No fixed price list here on purpose. Delivery pricing varies by location and order,
              so every order starts with a quick quote.{" "}
              <Link to="/contact" className="text-cyan-300 underline-offset-4 hover:underline">
                Contact us
              </Link>{" "}
              for exact pricing and availability.
            </p>
          </Reveal>
        </div>
      </section>

      <CTABand
        kicker="Stock up"
        title="Ten cases minimum. Zero effort required."
        sub="Send us your address and quantity on WhatsApp and we will come back with a quote and a delivery window."
        waMessage={WA_MESSAGES.general}
      />
    </main>
  );
}
