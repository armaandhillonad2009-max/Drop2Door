import { CalendarClock, MapPin, Package, Snowflake, Users } from "lucide-react";
import PageHeader from "@/components/PageHeader";
import CTABand from "@/components/CTABand";
import { Kicker, Reveal } from "@/components/Motion";

const FACTS = [
  { icon: CalendarClock, k: "Operating since", v: "January 2026" },
  { icon: MapPin, k: "Service area", v: "Greater Toronto Area" },
  { icon: Users, k: "Who we serve", v: "Homes, businesses & events" },
  { icon: Package, k: "Order size", v: "10 cases to full loads" },
];

const VALUES = [
  {
    icon: Snowflake,
    t: "Cold and careful",
    d: "Water stored and transported properly, so it arrives as crisp as it left the source.",
  },
  {
    icon: CalendarClock,
    t: "On your schedule",
    d: "Open 24 hours for delivery. You pick the window, we work around your day or your event.",
  },
  {
    icon: Users,
    t: "People first",
    d: "A local team that answers, confirms and shows up. No call centres, no ticket queues.",
  },
];

export default function About() {
  return (
    <main>
      <PageHeader
        kicker="About Drop2Door"
        lines={["Built on a", "simple idea."]}
        sub="Getting enough bottled water should not require a truck, a strong back and three store trips a week. So we made it our job instead."
        image="/images/delivery-stack.webp"
        title="About | Drop2Door Water Delivery Services"
      />

      <section className="bg-[#030712] py-16 sm:py-24" data-testid="about-story">
        <div className="mx-auto grid max-w-7xl grid-cols-1 items-start gap-14 px-5 sm:px-8 lg:grid-cols-2">
          <div>
            <Reveal>
              <Kicker>Our story</Kicker>
              <h2 className="font-display mt-4 text-3xl font-bold tracking-tight text-white sm:text-4xl">
                Why Drop2Door exists
              </h2>
            </Reveal>
            <Reveal delay={0.1}>
              <div className="mt-6 space-y-5 text-base leading-relaxed text-slate-400">
                <p>
                  Drop2Door started with a simple observation: keeping enough bottled water stocked
                  for a household or a business is harder than it should be. Cases are heavy, store
                  trips are frequent, and a reliable local delivery option was not always easy to
                  find. So we built one.
                </p>
                <p>
                  In a Canadian winter, those trips are more than inconvenient, they can be
                  genuinely risky. And when you are planning a wedding, a party or a big event,
                  water is one more heavy detail on an already long list. A delivery service takes
                  it off your plate. That thought became Drop2Door.
                </p>
                <p>
                  Since January 2026 we have delivered spring, distilled and sparkling water to
                  homes, businesses, restaurants, hotels and events across the Greater Toronto
                  Area. Minimum order is 10 packs or cases, and we scale up from there with our own
                  staff and reliable delivery vehicles.
                </p>
              </div>
            </Reveal>
            <div className="mt-10 grid grid-cols-1 gap-4 sm:grid-cols-2">
              {FACTS.map((f, i) => (
                <Reveal key={f.k} delay={0.06 * i}>
                  <div className="rounded-2xl border border-cyan-400/10 bg-[#081120]/60 p-5">
                    <f.icon className="h-5 w-5 text-cyan-400" />
                    <p className="font-mono2 mt-3 text-[10px] uppercase tracking-[0.2em] text-slate-500">
                      {f.k}
                    </p>
                    <p className="font-display mt-1 text-sm font-bold text-white">{f.v}</p>
                  </div>
                </Reveal>
              ))}
            </div>
          </div>

          <Reveal delay={0.15}>
            <div className="lg:sticky lg:top-28">
              <div className="glow-card overflow-hidden rounded-3xl border border-cyan-400/15 bg-white p-2">
                <img
                  src="/images/brand-card.webp"
                  alt="Drop2Door Water Delivery Services brand card with red phoenix logo and tagline Pure Water. Delivered to Your Door."
                  className="w-full rounded-2xl"
                  loading="lazy"
                  data-testid="about-brand-card"
                />
              </div>
              <p className="mt-4 text-center font-mono2 text-[10px] uppercase tracking-[0.26em] text-slate-500">
                Pure Water · Delivered to Your Door
              </p>
            </div>
          </Reveal>
        </div>
      </section>

      <section className="border-t border-cyan-400/10 bg-[#02050d] py-16 sm:py-24">
        <div className="mx-auto max-w-7xl px-5 sm:px-8">
          <Reveal>
            <Kicker>How we work</Kicker>
            <h2 className="font-display mt-4 text-3xl font-bold tracking-tight text-white sm:text-4xl">
              What you can count on
            </h2>
          </Reveal>
          <div className="mt-12 grid grid-cols-1 gap-6 md:grid-cols-3">
            {VALUES.map((v, i) => (
              <Reveal key={v.t} delay={0.08 * i}>
                <div className="glow-card h-full rounded-3xl border border-cyan-400/12 bg-[#081120] p-8">
                  <v.icon className="h-6 w-6 text-cyan-400" />
                  <h3 className="font-display mt-5 text-xl font-bold text-white">{v.t}</h3>
                  <p className="mt-3 text-sm leading-relaxed text-slate-400">{v.d}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <CTABand
        kicker="Join the route"
        title="Never haul a case again."
        sub="One WhatsApp message is all it takes. Tell us what you need and where, and we will handle the rest."
      />
    </main>
  );
}
