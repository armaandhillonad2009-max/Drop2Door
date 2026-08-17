import { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import { motion, useScroll, useTransform } from "framer-motion";
import { ArrowRight, ChevronDown, Clock, MapPin, Package } from "lucide-react";
import { MANIFESTO, PRODUCTS, SITE, WA_MESSAGES, waChat } from "@/data/site";
import { Kicker, MaskedLine, Reveal } from "@/components/Motion";
import { WhatsAppIcon } from "@/components/icons";
import Marquee from "@/components/Marquee";
import AreaChecker from "@/components/AreaChecker";
import Reviews from "@/components/Reviews";
import CTABand from "@/components/CTABand";

function Hero() {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end start"] });
  const yImg = useTransform(scrollYProgress, [0, 1], [0, 130]);
  const yText = useTransform(scrollYProgress, [0, 1], [0, -70]);
  const vidFade = useTransform(scrollYProgress, [0, 0.55], [1, 0]);
  const [videoOn, setVideoOn] = useState(true);
  const reducedMotion =
    typeof window !== "undefined" &&
    window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  const scrollToChecker = () => {
    document.getElementById("area-checker")?.scrollIntoView({ behavior: "smooth", block: "center" });
  };

  return (
    <section ref={ref} className="noise relative flex min-h-screen items-center overflow-hidden bg-[#030712]" data-testid="hero-section">
      {!reducedMotion && (
        <motion.div style={{ opacity: vidFade }} className="absolute inset-0" aria-hidden="true">
          <motion.video
            autoPlay
            muted
            playsInline
            preload="auto"
            onEnded={() => setVideoOn(false)}
            initial={{ opacity: 0 }}
            animate={{ opacity: videoOn ? 0.5 : 0 }}
            transition={{ duration: 2.6, ease: "easeOut" }}
            className="h-full w-full object-cover brightness-[0.75] saturate-[1.15]"
            data-testid="hero-glacier-video"
          >
            <source src="/videos/glacier.mp4" type="video/mp4" />
            <source src="/videos/glacier.webm" type="video/webm" />
          </motion.video>
          <div className="absolute inset-0 bg-gradient-to-b from-[#030712]/55 via-[#030712]/30 to-[#030712]" />
        </motion.div>
      )}
      <div className="pointer-events-none absolute inset-0" aria-hidden="true">
        <div className="animate-mist absolute -left-40 top-1/4 h-[480px] w-[480px] rounded-full bg-cyan-500/10 blur-[130px]" />
        <div className="animate-mist absolute -right-32 bottom-0 h-[420px] w-[420px] rounded-full bg-blue-700/12 blur-[120px]" style={{ animationDelay: "-9s" }} />
        <div className="absolute inset-x-0 bottom-0 h-56 bg-gradient-to-t from-[#030712] to-transparent" />
      </div>

      <div className="relative mx-auto grid w-full max-w-7xl grid-cols-1 items-center gap-14 px-5 pb-24 pt-32 sm:px-8 lg:grid-cols-12 lg:gap-8 lg:pt-24">
        <motion.div style={{ y: yText }} className="lg:col-span-7">
          <Reveal y={16}>
            <Kicker>Greater Toronto Area · Open 24 hours</Kicker>
          </Reveal>
          <h1 className="font-display mt-6 text-[13vw] font-extrabold leading-[0.94] tracking-tight text-white sm:text-6xl lg:text-7xl xl:text-[5.2rem]">
            <MaskedLine delay={0.1}>PURE WATER.</MaskedLine>
            <MaskedLine delay={0.22}>
              <span className="text-gradient-ice">DELIVERED TO</span>
            </MaskedLine>
            <MaskedLine delay={0.34}>
              <span className="text-gradient-ice">YOUR DOOR.</span>
            </MaskedLine>
          </h1>
          <Reveal delay={0.5}>
            <p className="mt-7 max-w-xl text-base leading-relaxed text-slate-400 sm:text-lg">
              Bottled water delivery across the GTA for homes, businesses, restaurants, hotels,
              events and more. Spring, distilled and sparkling, from brands you already trust.
            </p>
          </Reveal>
          <Reveal delay={0.62}>
            <div className="mt-9 flex flex-col gap-3 sm:flex-row sm:items-center">
              <a
                href={waChat(WA_MESSAGES.general)}
                target="_blank"
                rel="noopener noreferrer"
                data-testid="hero-whatsapp-cta"
                className="group flex items-center justify-center gap-2.5 rounded-full bg-cyan-400 px-8 py-4 text-sm font-bold text-slate-950 transition-all duration-300 hover:bg-cyan-300 hover:shadow-[0_0_40px_rgba(56,189,248,0.5)]"
              >
                <WhatsAppIcon className="h-5 w-5" /> Order on WhatsApp
              </a>
              <button
                onClick={scrollToChecker}
                data-testid="hero-check-area-cta"
                className="group flex items-center justify-center gap-2 rounded-full border border-cyan-400/25 px-8 py-4 text-sm font-bold text-cyan-200 transition-all duration-300 hover:border-cyan-300/60 hover:bg-cyan-400/10"
              >
                Check Delivery Area
                <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
              </button>
            </div>
          </Reveal>
          <Reveal delay={0.74}>
            <div className="mt-10 flex flex-wrap items-center gap-x-7 gap-y-3 text-xs text-slate-400">
              <span className="flex items-center gap-2">
                <Package className="h-4 w-4 text-cyan-400" /> Min. 10 packs/cases
              </span>
              <span className="flex items-center gap-2">
                <Clock className="h-4 w-4 text-cyan-400" /> 24-hour scheduled delivery
              </span>
              <span className="flex items-center gap-2">
                <MapPin className="h-4 w-4 text-cyan-400" /> Serving since {SITE.since}
              </span>
            </div>
          </Reveal>
        </motion.div>

        <motion.div style={{ y: yImg }} className="relative lg:col-span-5">
          <Reveal delay={0.45} y={40}>
            <div className="relative mx-auto max-w-md lg:max-w-none">
              <div
                className="absolute -inset-3 -rotate-3 rounded-[2.4rem] border border-cyan-400/15"
                aria-hidden="true"
              />
              <div
                className="absolute inset-0 scale-90 rounded-[2.5rem] bg-cyan-400/20 blur-[70px]"
                aria-hidden="true"
              />
              <div className="glow-card animate-float relative rotate-2 overflow-hidden rounded-[2rem] border border-cyan-400/20 transition-transform duration-700 hover:rotate-0">
                <img
                  src="/images/bottles.webp"
                  alt="Ice cold Kirkland, Eska and Compliments water bottles delivered by Drop2Door"
                  className="h-[420px] w-full object-cover sm:h-[500px] lg:h-[560px]"
                  data-testid="hero-bottles-image"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#030712]/60 via-transparent to-transparent" />
                <div className="absolute bottom-5 left-5 right-5 flex items-center justify-between">
                  <span className="font-mono2 text-[10px] uppercase tracking-[0.24em] text-cyan-200/90">
                    Kirkland · Eska · Compliments
                  </span>
                  <span className="rounded-full border border-red-500/40 bg-red-500/15 px-3 py-1 font-mono2 text-[9px] uppercase tracking-[0.2em] text-red-300">
                    Ice cold
                  </span>
                </div>
              </div>
            </div>
          </Reveal>
        </motion.div>
      </div>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.4, duration: 1 }}
        className="absolute bottom-7 left-1/2 hidden -translate-x-1/2 flex-col items-center gap-2 lg:flex"
        aria-hidden="true"
      >
        <span className="font-mono2 text-[9px] uppercase tracking-[0.32em] text-slate-500">Scroll</span>
        <ChevronDown className="h-4 w-4 animate-bounce text-cyan-400/70" />
      </motion.div>
    </section>
  );
}

function Brands() {
  return (
    <section className="relative bg-[#030712] py-24 sm:py-32" data-testid="brands-section">
      <div className="mx-auto max-w-7xl px-5 sm:px-8">
        <div className="flex flex-col justify-between gap-6 sm:flex-row sm:items-end">
          <Reveal>
            <Kicker>The lineup</Kicker>
            <h2 className="font-display mt-4 max-w-xl text-3xl font-bold tracking-tight text-white sm:text-4xl lg:text-5xl">
              Brands you know. <span className="text-gradient-ice">Cold you can taste.</span>
            </h2>
          </Reveal>
          <Reveal delay={0.15}>
            <Link
              to="/water"
              data-testid="brands-see-all-link"
              className="group flex items-center gap-2 text-sm font-semibold text-cyan-300 transition hover:text-cyan-200"
            >
              See the water we deliver
              <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
            </Link>
          </Reveal>
        </div>

        <div className="mt-14 grid grid-cols-1 gap-6 sm:grid-cols-3">
          {PRODUCTS.map((p, i) => (
            <Reveal key={p.name} delay={0.1 * i}>
              <Link
                to="/water"
                data-testid={`brand-card-${p.name.toLowerCase().replace(/[^a-z]+/g, "-")}`}
                className={`group relative block overflow-hidden rounded-3xl border border-cyan-400/15 transition-all duration-500 hover:z-10 hover:rotate-0 hover:shadow-[0_24px_60px_rgba(2,132,199,0.25)] ${
                  ["sm:-rotate-2", "sm:translate-y-6 sm:rotate-1", "sm:-rotate-1"][i % 3]
                }`}
              >
                <div className="relative aspect-[4/5] overflow-hidden bg-[#04091a]">
                  <img
                    src={p.image}
                    alt={p.alt}
                    loading="lazy"
                    style={{ objectPosition: p.pos }}
                    className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-[1.07]"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#02050d] via-[#02050d]/25 to-transparent" aria-hidden="true" />
                  <span className="absolute right-4 top-4 rounded-full border border-cyan-400/30 bg-[#030712]/70 px-3 py-1 font-mono2 text-[9px] uppercase tracking-[0.14em] text-cyan-300 backdrop-blur-sm">
                    {p.tag}
                  </span>
                  <div className="absolute inset-x-0 bottom-0 p-6">
                    <h3 className="font-display text-2xl font-bold text-white">{p.name}</h3>
                    <p className="mt-1 text-xs uppercase tracking-[0.16em] text-slate-400">{p.type}</p>
                  </div>
                </div>
              </Link>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

function Manifesto() {
  return (
    <section className="relative bg-[#02050d] py-24 sm:py-32" data-testid="manifesto-section">
      <div className="mx-auto max-w-7xl px-5 sm:px-8">
        <Reveal>
          <Kicker>Why Drop2Door</Kicker>
          <h2 className="font-display mt-4 max-w-2xl text-3xl font-bold tracking-tight text-white sm:text-4xl lg:text-5xl">
            The heavy cases are <span className="text-gradient-ice">our problem now.</span>
          </h2>
        </Reveal>

        <div className="mt-16 space-y-20">
          {MANIFESTO.map((m, i) => (
            <div
              key={m.n}
              className={`grid grid-cols-1 items-center gap-10 lg:grid-cols-2 ${
                i % 2 === 1 ? "lg:[&>*:first-child]:order-2" : ""
              }`}
            >
              <Reveal>
                <div className="flex items-start gap-6">
                  <span className="font-mono2 text-6xl font-semibold leading-none text-cyan-400/15 sm:text-7xl">
                    {m.n}
                  </span>
                  <div>
                    <h3 className="font-display text-2xl font-bold tracking-tight text-white sm:text-3xl">
                      {m.title}
                    </h3>
                    <p className="mt-4 max-w-md text-base leading-relaxed text-slate-400">{m.body}</p>
                  </div>
                </div>
              </Reveal>
              <Reveal delay={0.12}>
                <div className="glow-card group overflow-hidden rounded-3xl border border-cyan-400/12">
                  <img
                    src={m.image}
                    alt={m.alt}
                    loading="lazy"
                    className="h-72 w-full object-cover transition-transform duration-[1.2s] ease-out group-hover:scale-[1.05] sm:h-80"
                  />
                </div>
              </Reveal>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function FilmStrip() {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end start"] });
  const y = useTransform(scrollYProgress, [0, 1], ["-8%", "8%"]);

  return (
    <section ref={ref} className="relative overflow-hidden bg-[#030712]" data-testid="film-strip">
      <motion.img
        src="/images/hero-strip.webp"
        alt="Cinematic Drop2Door visual: chilled bottles of Eska, Kirkland and Compliments on ice"
        style={{ y, scale: 1.15 }}
        className="h-[55vh] w-full object-cover sm:h-[75vh]"
        loading="lazy"
      />
      <div className="absolute inset-0 bg-gradient-to-b from-[#030712] via-transparent to-[#030712]" aria-hidden="true" />
      <div className="absolute bottom-6 left-1/2 -translate-x-1/2">
        <span className="font-mono2 text-[10px] uppercase tracking-[0.3em] text-cyan-200/70">
          Drop2Door · Ice cold by design
        </span>
      </div>
    </section>
  );
}

function CheckerSection() {
  return (
    <section id="area-checker" className="scroll-mt-24 bg-[#02050d] py-24 sm:py-32" data-testid="home-checker-section">
      <div className="mx-auto grid max-w-7xl grid-cols-1 items-center gap-12 px-5 sm:px-8 lg:grid-cols-2">
        <Reveal>
          <Kicker>Delivery zone</Kicker>
          <h2 className="font-display mt-4 text-3xl font-bold tracking-tight text-white sm:text-4xl lg:text-5xl">
            Brampton to Toronto. <span className="text-gradient-ice">Probably you too.</span>
          </h2>
          <p className="mt-5 max-w-md text-base leading-relaxed text-slate-400">
            We run routes across Brampton, Mississauga, Toronto, Caledon, Malton, Milton, Peel
            Region and the wider GTA. Check your postal code or city in seconds.
          </p>
          <p className="mt-4 max-w-md text-sm leading-relaxed text-slate-500">
            Outside the zone or not sure? Message us anyway. If we can reach you, we will.
          </p>
        </Reveal>
        <Reveal delay={0.15}>
          <AreaChecker compact />
        </Reveal>
      </div>
    </section>
  );
}

export default function Home() {
  useEffect(() => {
    document.title = "Drop2Door Water Delivery Services | Bottled Water Delivery in the GTA";
  }, []);

  return (
    <main>
      <Hero />
      <Marquee />
      <Brands />
      <Manifesto />
      <FilmStrip />
      <CheckerSection />
      <Reviews />
      <CTABand />
    </main>
  );
}
