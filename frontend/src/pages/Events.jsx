import { useState } from "react";
import axios from "axios";
import { CheckCircle2, Loader2 } from "lucide-react";
import { toast } from "sonner";
import { EVENT_TYPES, FIELD_CLS, LABEL_CLS, PRODUCT_OPTIONS, WA_MESSAGES, waChat } from "@/data/site";
import PageHeader from "@/components/PageHeader";
import { Kicker, Reveal } from "@/components/Motion";
import { WhatsAppIcon } from "@/components/icons";

const API = `${process.env.REACT_APP_BACKEND_URL}/api`;

const SERVE = [
  "Weddings",
  "Parties",
  "Corporate events",
  "Community events",
  "Restaurants",
  "Hotels",
  "Offices",
  "Large gatherings",
  "Businesses",
  "Organizations",
];

const STEPS = [
  { n: "01", t: "Tell us the plan", d: "Date, venue, headcount and how much water you need." },
  { n: "02", t: "Get your quote", d: "We price it based on volume and delivery location. No surprises." },
  { n: "03", t: "We show up", d: "Scheduled delivery, stacked where you want it. You handle the event, not the cases." },
];

const EMPTY = {
  name: "",
  organization: "",
  email: "",
  phone: "",
  event_type: "",
  event_date: "",
  address: "",
  quantity: "",
  product: "",
  notes: "",
};

function BulkForm() {
  const [form, setForm] = useState(EMPTY);
  const [status, setStatus] = useState("idle");
  const set = (k) => (e) => setForm((f) => ({ ...f, [k]: e.target.value }));

  const waSummary = () =>
    waChat(
      `Hi Drop2Door, I'm ${form.name}${form.organization ? " from " + form.organization : ""}. ` +
        `We need water for a ${form.event_type || "event"}${form.event_date ? " on " + form.event_date : ""}. ` +
        `Estimated quantity: ${form.quantity || "TBD"} cases. ${WA_MESSAGES.event}`,
    );

  const submit = async (e) => {
    e.preventDefault();
    setStatus("sending");
    try {
      await axios.post(`${API}/bulk-quote`, form);
      setStatus("success");
    } catch {
      setStatus("idle");
      toast.error("Could not send your request. Please try WhatsApp instead.");
    }
  };

  if (status === "success") {
    return (
      <div className="glow-card rounded-3xl border border-cyan-400/15 bg-[#081120] p-10 text-center" data-testid="bulk-success">
        <CheckCircle2 className="mx-auto h-14 w-14 text-cyan-400" />
        <h3 className="font-display mt-6 text-2xl font-bold text-white">Bulk request received</h3>
        <p className="mx-auto mt-3 max-w-sm text-sm leading-relaxed text-slate-400">
          Our team will review your event details and get back to you with a quote. For the fastest
          response, continue on WhatsApp.
        </p>
        <a
          href={waSummary()}
          target="_blank"
          rel="noopener noreferrer"
          data-testid="bulk-success-whatsapp"
          className="mt-7 inline-flex items-center gap-2 rounded-full bg-[#25D366] px-7 py-3.5 text-sm font-bold text-slate-950 transition hover:brightness-110"
        >
          <WhatsAppIcon className="h-4 w-4" /> Continue on WhatsApp
        </a>
      </div>
    );
  }

  return (
    <form
      onSubmit={submit}
      className="glow-card rounded-3xl border border-cyan-400/15 bg-[#081120] p-7 sm:p-9"
      data-testid="bulk-quote-form"
    >
      <h3 className="font-display text-2xl font-bold text-white">Request a Bulk Quote</h3>
      <p className="mt-2 text-sm text-slate-400">
        Tell us about your event or business and we will price it out.
      </p>
      <div className="mt-6 grid grid-cols-1 gap-4 sm:grid-cols-2">
        <div>
          <label className={LABEL_CLS} htmlFor="b-name">Name *</label>
          <input id="b-name" data-testid="bulk-name-input" required className={FIELD_CLS} value={form.name} onChange={set("name")} placeholder="Your name" />
        </div>
        <div>
          <label className={LABEL_CLS} htmlFor="b-org">Organization</label>
          <input id="b-org" data-testid="bulk-org-input" className={FIELD_CLS} value={form.organization} onChange={set("organization")} placeholder="Company or event name" />
        </div>
        <div>
          <label className={LABEL_CLS} htmlFor="b-email">Email *</label>
          <input id="b-email" data-testid="bulk-email-input" required type="email" className={FIELD_CLS} value={form.email} onChange={set("email")} placeholder="you@email.com" />
        </div>
        <div>
          <label className={LABEL_CLS} htmlFor="b-phone">Phone *</label>
          <input id="b-phone" data-testid="bulk-phone-input" required type="tel" className={FIELD_CLS} value={form.phone} onChange={set("phone")} placeholder="(647) 000-0000" />
        </div>
        <div>
          <label className={LABEL_CLS} htmlFor="b-type">Event / business type</label>
          <select id="b-type" data-testid="bulk-type-select" className={FIELD_CLS} value={form.event_type} onChange={set("event_type")}>
            <option value="">Select</option>
            {EVENT_TYPES.map((t) => (
              <option key={t}>{t}</option>
            ))}
          </select>
        </div>
        <div>
          <label className={LABEL_CLS} htmlFor="b-date">Event date</label>
          <input id="b-date" data-testid="bulk-date-input" type="date" className={`${FIELD_CLS} [color-scheme:dark]`} value={form.event_date} onChange={set("event_date")} />
        </div>
        <div className="sm:col-span-2">
          <label className={LABEL_CLS} htmlFor="b-address">Delivery address</label>
          <input id="b-address" data-testid="bulk-address-input" className={FIELD_CLS} value={form.address} onChange={set("address")} placeholder="Venue or business address" />
        </div>
        <div>
          <label className={LABEL_CLS} htmlFor="b-qty">Estimated quantity</label>
          <input id="b-qty" data-testid="bulk-quantity-input" className={FIELD_CLS} value={form.quantity} onChange={set("quantity")} placeholder="e.g. 40 cases" />
        </div>
        <div>
          <label className={LABEL_CLS} htmlFor="b-product">Product / brand</label>
          <select id="b-product" data-testid="bulk-product-select" className={FIELD_CLS} value={form.product} onChange={set("product")}>
            <option value="">Select</option>
            {PRODUCT_OPTIONS.map((p) => (
              <option key={p}>{p}</option>
            ))}
          </select>
        </div>
        <div className="sm:col-span-2">
          <label className={LABEL_CLS} htmlFor="b-notes">Additional notes</label>
          <textarea id="b-notes" data-testid="bulk-notes-input" rows={3} className={`${FIELD_CLS} resize-none`} value={form.notes} onChange={set("notes")} placeholder="Guest count, timing, access instructions, recurring needs..." />
        </div>
      </div>
      <button
        type="submit"
        disabled={status === "sending"}
        data-testid="bulk-submit-button"
        className="mt-6 flex w-full items-center justify-center gap-2 rounded-full bg-cyan-400 py-4 text-sm font-bold text-slate-950 transition-all duration-300 hover:bg-cyan-300 hover:shadow-[0_0_32px_rgba(56,189,248,0.45)] disabled:opacity-60"
      >
        {status === "sending" ? (
          <>
            <Loader2 className="h-4 w-4 animate-spin" /> Sending...
          </>
        ) : (
          "Request a Bulk Quote"
        )}
      </button>
      <p className="mt-3 text-center text-[11px] text-slate-500">
        For the fastest response,{" "}
        <a href={waChat(WA_MESSAGES.event)} target="_blank" rel="noopener noreferrer" className="text-cyan-300 underline-offset-4 hover:underline" data-testid="bulk-whatsapp-link">
          message us on WhatsApp
        </a>
        .
      </p>
    </form>
  );
}

export default function Events() {
  return (
    <main>
      <PageHeader
        kicker="Events & bulk orders"
        lines={["Big plans?", "We bring the water."]}
        sub="Weddings, parties, corporate events, restaurants, hotels, offices and large gatherings. Drop2Door handles large-volume orders with staff, vehicles and scheduled delivery, so water is one less thing on your list."
        title="Events & Bulk Water Delivery | Drop2Door GTA"
      />

      <section className="bg-[#030712] py-20 sm:py-28">
        <div className="mx-auto grid max-w-7xl grid-cols-1 gap-12 px-5 sm:px-8 lg:grid-cols-2">
          <div>
            <Reveal>
              <Kicker>Who we supply</Kicker>
              <h2 className="font-display mt-4 text-3xl font-bold tracking-tight text-white sm:text-4xl">
                Volume orders, handled properly
              </h2>
              <p className="mt-5 max-w-lg text-base leading-relaxed text-slate-400">
                When you are responsible for a room full of people, the last thing you need is
                another store run. We deliver by the case, by the skid if needed, on a schedule
                that fits your event.
              </p>
            </Reveal>
            <div className="mt-8 flex flex-wrap gap-2.5">
              {SERVE.map((s, i) => (
                <Reveal key={s} delay={Math.min(i * 0.04, 0.4)} y={12}>
                  <span className="inline-block rounded-full border border-cyan-400/15 bg-[#081120]/70 px-4 py-2 text-sm text-slate-300">
                    {s}
                  </span>
                </Reveal>
              ))}
            </div>
            <div className="mt-12 space-y-6">
              {STEPS.map((s, i) => (
                <Reveal key={s.n} delay={0.08 * i}>
                  <div className="flex items-start gap-5">
                    <span className="font-mono2 text-3xl font-semibold text-cyan-400/25">{s.n}</span>
                    <div>
                      <h3 className="font-display text-lg font-bold text-white">{s.t}</h3>
                      <p className="mt-1 text-sm leading-relaxed text-slate-400">{s.d}</p>
                    </div>
                  </div>
                </Reveal>
              ))}
            </div>
          </div>
          <Reveal delay={0.15}>
            <BulkForm />
          </Reveal>
        </div>
      </section>
    </main>
  );
}
