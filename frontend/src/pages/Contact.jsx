import { Clock, Instagram, Mail, MapPin, Phone } from "lucide-react";
import { SITE, WA_MESSAGES, waChat } from "@/data/site";
import PageHeader from "@/components/PageHeader";
import { Kicker, Reveal } from "@/components/Motion";
import { TikTokIcon, WhatsAppIcon } from "@/components/icons";
import { useQuote } from "@/context/QuoteContext";

const CONTACT_ROWS = [
  {
    icon: Phone,
    label: "Phone",
    value: SITE.phoneDisplay,
    href: SITE.phoneHref,
    testid: "contact-phone",
  },
  {
    icon: Mail,
    label: "Email",
    value: SITE.email,
    href: `mailto:${SITE.email}`,
    testid: "contact-email",
  },
  {
    icon: Clock,
    label: "Hours",
    value: "Open 24 hours for delivery",
    testid: "contact-hours",
  },
  {
    icon: MapPin,
    label: "Service area",
    value: SITE.areaShort,
    testid: "contact-area",
  },
];

export default function Contact() {
  const { openQuote } = useQuote();

  return (
    <main>
      <PageHeader
        kicker="Contact"
        lines={["Talk to", "a real human."]}
        sub="Questions, quotes, scheduling or big orders. The fastest way to reach us is WhatsApp, and we answer around the clock."
        title="Contact | Drop2Door Water Delivery Services"
      />

      <section className="bg-[#030712] py-20 sm:py-28" data-testid="contact-section">
        <div className="mx-auto grid max-w-7xl grid-cols-1 gap-10 px-5 sm:px-8 lg:grid-cols-2">
          <div className="space-y-4">
            {CONTACT_ROWS.map((r, i) => {
              const inner = (
                <>
                  <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-cyan-400/10 text-cyan-300">
                    <r.icon className="h-5 w-5" />
                  </span>
                  <span>
                    <span className="font-mono2 block text-[10px] uppercase tracking-[0.22em] text-slate-500">
                      {r.label}
                    </span>
                    <span className="font-display mt-1 block text-lg font-bold text-white">
                      {r.value}
                    </span>
                  </span>
                </>
              );
              return (
                <Reveal key={r.label} delay={0.06 * i}>
                  {r.href ? (
                    <a
                      href={r.href}
                      data-testid={r.testid}
                      className="glow-card flex items-center gap-5 rounded-3xl border border-cyan-400/12 bg-[#081120] p-6 transition hover:border-cyan-300/40"
                    >
                      {inner}
                    </a>
                  ) : (
                    <div
                      data-testid={r.testid}
                      className="flex items-center gap-5 rounded-3xl border border-cyan-400/12 bg-[#081120] p-6"
                    >
                      {inner}
                    </div>
                  )}
                </Reveal>
              );
            })}
            <Reveal delay={0.3}>
              <p className="px-1 text-xs leading-relaxed text-slate-500">
                Drop2Door is a service-area business and does not operate a public storefront. All
                deliveries are scheduled in advance.
              </p>
            </Reveal>
          </div>

          <Reveal delay={0.15}>
            <div className="glow-card noise relative flex h-full flex-col justify-between overflow-hidden rounded-3xl border border-cyan-400/15 bg-gradient-to-b from-[#0a1a30] to-[#04091a] p-8 sm:p-10">
              <div>
                <Kicker>Fastest response</Kicker>
                <h2 className="font-display mt-4 text-3xl font-bold tracking-tight text-white">
                  Message us on WhatsApp
                </h2>
                <p className="mt-4 max-w-sm text-sm leading-relaxed text-slate-400">
                  Send one message with your address and what you need. We reply with a quote and a
                  delivery window. Or send a request form and we will contact you.
                </p>
                <div className="mt-8 flex flex-col gap-3">
                  <a
                    href={waChat(WA_MESSAGES.general)}
                    target="_blank"
                    rel="noopener noreferrer"
                    data-testid="contact-whatsapp-cta"
                    className="flex items-center justify-center gap-2 rounded-full bg-[#25D366] px-7 py-4 text-sm font-bold text-slate-950 transition hover:brightness-110"
                  >
                    <WhatsAppIcon className="h-4 w-4" /> Order on WhatsApp
                  </a>
                  <button
                    onClick={() => openQuote("general")}
                    data-testid="contact-quote-cta"
                    className="rounded-full border border-cyan-400/30 px-7 py-4 text-sm font-bold text-cyan-300 transition hover:border-cyan-300/60 hover:bg-cyan-400/10"
                  >
                    Request a Delivery
                  </button>
                </div>
              </div>
              <div className="mt-10 border-t border-cyan-400/10 pt-7">
                <p className="font-mono2 text-[10px] uppercase tracking-[0.24em] text-slate-500">
                  See us on
                </p>
                <div className="mt-4 flex flex-wrap items-center gap-3">
                  <a
                    href={SITE.instagram}
                    target="_blank"
                    rel="noopener noreferrer"
                    data-testid="contact-instagram"
                    className="flex items-center gap-2 rounded-full border border-cyan-400/20 px-4 py-2.5 text-sm font-semibold text-slate-200 transition hover:border-cyan-300/60 hover:text-cyan-300"
                  >
                    <Instagram className="h-4 w-4" /> Instagram
                  </a>
                  <a
                    href={SITE.tiktok}
                    target="_blank"
                    rel="noopener noreferrer"
                    data-testid="contact-tiktok"
                    className="flex items-center gap-2 rounded-full border border-cyan-400/20 px-4 py-2.5 text-sm font-semibold text-slate-200 transition hover:border-cyan-300/60 hover:text-cyan-300"
                  >
                    <TikTokIcon className="h-4 w-4" /> TikTok
                  </a>
                  <a
                    href={SITE.googleProfile}
                    target="_blank"
                    rel="noopener noreferrer"
                    data-testid="contact-google"
                    className="flex items-center gap-2 rounded-full border border-cyan-400/20 px-4 py-2.5 text-sm font-semibold text-slate-200 transition hover:border-cyan-300/60 hover:text-cyan-300"
                  >
                    <MapPin className="h-4 w-4" /> See Us on Google
                  </a>
                </div>
              </div>
            </div>
          </Reveal>
        </div>
      </section>
    </main>
  );
}
