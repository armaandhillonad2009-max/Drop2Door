import { WA_MESSAGES, waChat } from "@/data/site";
import { useQuote } from "@/context/QuoteContext";
import { WhatsAppIcon } from "@/components/icons";
import { Kicker, Reveal } from "@/components/Motion";

export default function CTABand({
  kicker = "Ready when you are",
  title = "Cold water. Zero heavy lifting.",
  sub = "Message us on WhatsApp for a fast quote, or send a delivery request and we will contact you to confirm details and pricing.",
  waMessage = WA_MESSAGES.general,
}) {
  const { openQuote } = useQuote();
  return (
    <section className="relative overflow-hidden bg-[#030712] py-24 sm:py-32" data-testid="cta-band">
      <div
        className="pointer-events-none absolute inset-x-0 top-1/2 h-[380px] -translate-y-1/2 bg-gradient-to-r from-transparent via-cyan-500/10 to-transparent blur-2xl"
        aria-hidden="true"
      />
      <div className="relative mx-auto max-w-4xl px-5 text-center sm:px-8">
        <Reveal>
          <Kicker>{kicker}</Kicker>
          <h2 className="font-display mt-5 text-4xl font-extrabold tracking-tight text-white sm:text-5xl">
            {title}
          </h2>
          <p className="mx-auto mt-5 max-w-xl text-base leading-relaxed text-slate-400">{sub}</p>
          <div className="mt-9 flex flex-col items-center justify-center gap-3 sm:flex-row">
            <a
              href={waChat(waMessage)}
              target="_blank"
              rel="noopener noreferrer"
              data-testid="cta-whatsapp-button"
              className="flex items-center gap-2 rounded-full bg-[#25D366] px-8 py-4 text-sm font-bold text-slate-950 transition-all duration-300 hover:brightness-110 hover:shadow-[0_0_36px_rgba(37,211,102,0.4)]"
            >
              <WhatsAppIcon className="h-4 w-4" /> Order on WhatsApp
            </a>
            <button
              onClick={() => openQuote("general")}
              data-testid="cta-quote-button"
              className="rounded-full border border-cyan-400/30 px-8 py-4 text-sm font-bold text-cyan-300 transition-all duration-300 hover:border-cyan-300/70 hover:bg-cyan-400/10"
            >
              Request a Delivery
            </button>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
