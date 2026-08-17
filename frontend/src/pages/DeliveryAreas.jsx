import { CITIES, WA_MESSAGES, waChat } from "@/data/site";
import PageHeader from "@/components/PageHeader";
import AreaChecker from "@/components/AreaChecker";
import { Kicker, Reveal } from "@/components/Motion";
import { WhatsAppIcon } from "@/components/icons";

export default function DeliveryAreas() {
  return (
    <main>
      <PageHeader
        kicker="Delivery areas"
        lines={["Where the", "water goes."]}
        sub="We deliver across Brampton, Mississauga, Toronto, Caledon, Malton, Milton, Peel Region and the wider Greater Toronto Area. Check your postal code or city below."
        image="/images/vehicle.webp"
        title="Delivery Areas | Water Delivery Brampton, Mississauga, Toronto & GTA"
      />

      <section className="bg-[#030712] py-16 sm:py-24">
        <div className="mx-auto max-w-3xl px-5 sm:px-8">
          <Reveal>
            <AreaChecker />
          </Reveal>
        </div>
      </section>

      <section className="border-t border-cyan-400/10 bg-[#02050d] py-16 sm:py-24" data-testid="city-grid-section">
        <div className="mx-auto max-w-7xl px-5 sm:px-8">
          <Reveal>
            <Kicker>Regular routes</Kicker>
            <h2 className="font-display mt-4 text-3xl font-bold tracking-tight text-white sm:text-4xl">
              Cities and communities we serve
            </h2>
            <p className="mt-4 max-w-2xl text-sm leading-relaxed text-slate-500">
              This is our regular rotation, not a hard boundary. We also run wider GTA deliveries,
              so if your community is not listed, ask us.
            </p>
          </Reveal>
          <div className="mt-10 flex flex-wrap gap-2.5">
            {CITIES.map((c, i) => (
              <Reveal key={c} delay={Math.min(i * 0.03, 0.5)} y={14}>
                <span
                  className="inline-block rounded-full border border-cyan-400/15 bg-[#081120]/70 px-4 py-2 text-sm text-slate-300 transition hover:border-cyan-300/50 hover:text-cyan-200"
                  data-testid={`city-chip-${c.toLowerCase().replace(/[^a-z]+/g, "-")}`}
                >
                  {c}
                </span>
              </Reveal>
            ))}
          </div>

          <Reveal delay={0.2}>
            <div className="glow-card mt-14 flex flex-col items-start justify-between gap-6 rounded-3xl border border-cyan-400/15 bg-[#081120]/80 p-8 sm:flex-row sm:items-center sm:p-10">
              <div>
                <h3 className="font-display text-2xl font-bold text-white">Not sure about your address?</h3>
                <p className="mt-2 max-w-lg text-sm leading-relaxed text-slate-400">
                  Send us your postal code on WhatsApp and we will confirm coverage and a delivery
                  window for your exact address.
                </p>
              </div>
              <a
                href={waChat(WA_MESSAGES.areaOut)}
                target="_blank"
                rel="noopener noreferrer"
                data-testid="areas-ask-whatsapp"
                className="flex shrink-0 items-center gap-2 rounded-full bg-[#25D366] px-7 py-3.5 text-sm font-bold text-slate-950 transition hover:brightness-110"
              >
                <WhatsAppIcon className="h-4 w-4" /> Chat With Us
              </a>
            </div>
          </Reveal>
        </div>
      </section>
    </main>
  );
}
