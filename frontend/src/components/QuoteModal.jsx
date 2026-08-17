import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import axios from "axios";
import { CheckCircle2, Loader2, Minus, Plus, X } from "lucide-react";
import { toast } from "sonner";
import { useQuote } from "@/context/QuoteContext";
import { FIELD_CLS, LABEL_CLS, PRODUCT_OPTIONS, SITE, TIME_SLOTS, WA_MESSAGES, waChat } from "@/data/site";
import { WhatsAppIcon } from "@/components/icons";

const API = `${process.env.REACT_APP_BACKEND_URL}/api`;

const EMPTY = {
  name: "",
  phone: "",
  email: "",
  address: "",
  postal_code: "",
  customer_type: "Residential",
  product: "",
  quantity: "",
  preferred_date: "",
  preferred_time: "",
  message: "",
};

const TITLES = {
  general: "Request a Delivery",
  business: "Get a Business Quote",
  event: "Request a Bulk Quote",
};

export default function QuoteModal() {
  const { open, context, closeQuote } = useQuote();
  const [form, setForm] = useState(EMPTY);
  const [status, setStatus] = useState("idle");

  useEffect(() => {
    if (open) {
      setStatus("idle");
      setForm((f) => ({
        ...EMPTY,
        customer_type: context === "event" ? "Event" : context === "business" ? "Business" : "Residential",
      }));
    }
  }, [open, context]);

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  const set = (k) => (e) => setForm((f) => ({ ...f, [k]: e.target.value }));

  const bumpQty = (d) =>
    setForm((f) => {
      const next = Math.max(1, (parseInt(f.quantity, 10) || 0) + d);
      return { ...f, quantity: String(next) };
    });

  const waSummary = () => {
    const parts = [
      `Hi Drop2Door, I'm ${form.name}.`,
      `I'd like a quote for ${form.quantity || "10+"} x ${form.product || "bottled water"}.`,
      form.address ? `Delivery to: ${form.address}${form.postal_code ? ", " + form.postal_code : ""}.` : "",
      form.preferred_date ? `Preferred: ${form.preferred_date} ${form.preferred_time}.` : "",
    ].filter(Boolean);
    return waChat(parts.join(" "));
  };

  const submit = async (e) => {
    e.preventDefault();
    if (Number(form.quantity) > 0 && Number(form.quantity) < 10) {
      toast.error("Minimum delivery order is 10 packs/cases.");
      return;
    }
    setStatus("sending");
    try {
      await axios.post(`${API}/quote`, form);
      setStatus("success");
    } catch (err) {
      setStatus("idle");
      toast.error("Something went wrong sending your request. Please try WhatsApp instead.", {
        action: { label: "WhatsApp", onClick: () => window.open(waChat(WA_MESSAGES.general), "_blank") },
      });
    }
  };

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-[70] flex items-end justify-center bg-slate-950/80 p-0 backdrop-blur-md sm:items-center sm:p-6"
          onClick={closeQuote}
          data-testid="quote-modal-backdrop"
        >
          <motion.div
            initial={{ y: 60, opacity: 0, scale: 0.98 }}
            animate={{ y: 0, opacity: 1, scale: 1 }}
            exit={{ y: 40, opacity: 0, scale: 0.98 }}
            transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
            onClick={(e) => e.stopPropagation()}
            data-lenis-prevent
            data-testid="quote-modal"
            className="glow-card relative max-h-[92vh] w-full max-w-2xl overflow-y-auto rounded-t-3xl border border-cyan-400/15 bg-[#081120] p-6 sm:rounded-3xl sm:p-9"
          >
            <button
              onClick={closeQuote}
              aria-label="Close"
              data-testid="quote-modal-close"
              className="absolute right-5 top-5 rounded-full border border-cyan-400/20 p-2 text-slate-400 transition hover:text-white"
            >
              <X className="h-4 w-4" />
            </button>

            {status === "success" ? (
              <div className="py-10 text-center" data-testid="quote-success">
                <CheckCircle2 className="mx-auto h-14 w-14 text-cyan-400" />
                <h3 className="font-display mt-6 text-3xl font-bold text-white">Request received</h3>
                <p className="mx-auto mt-3 max-w-md text-sm leading-relaxed text-slate-400">
                  Thanks {form.name.split(" ")[0] || "there"}. Your request is on its way to our team
                  and we will reach out to confirm details and pricing.
                </p>
                <p className="mt-2 text-sm text-slate-400">
                  For the fastest response, continue on WhatsApp now.
                </p>
                <div className="mt-8 flex flex-col justify-center gap-3 sm:flex-row">
                  <a
                    href={waSummary()}
                    target="_blank"
                    rel="noopener noreferrer"
                    data-testid="quote-success-whatsapp"
                    className="flex items-center justify-center gap-2 rounded-full bg-[#25D366] px-7 py-3.5 text-sm font-bold text-slate-950 transition hover:brightness-110"
                  >
                    <WhatsAppIcon className="h-4 w-4" /> Continue on WhatsApp
                  </a>
                  <button
                    onClick={closeQuote}
                    data-testid="quote-success-done"
                    className="rounded-full border border-cyan-400/25 px-7 py-3.5 text-sm font-semibold text-slate-200 transition hover:border-cyan-300/60"
                  >
                    Done
                  </button>
                </div>
              </div>
            ) : (
              <>
                <p className="font-mono2 text-[10px] uppercase tracking-[0.28em] text-cyan-300/80">
                  {SITE.short} · Quote request
                </p>
                <h3 className="font-display mt-2 text-3xl font-bold tracking-tight text-white">
                  {TITLES[context] || TITLES.general}
                </h3>
                <p className="mt-2 text-sm text-slate-400">
                  For the fastest response,{" "}
                  <a
                    href={waChat("Hi Drop2Door, I'd like to get a quote for a water delivery.")}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="font-semibold text-cyan-300 underline-offset-4 hover:underline"
                    data-testid="quote-modal-whatsapp-link"
                  >
                    contact us on WhatsApp
                  </a>
                  . Otherwise send this form and we will contact you.
                </p>

                <form onSubmit={submit} className="mt-7 grid grid-cols-1 gap-4 sm:grid-cols-2" data-testid="quote-form">
                  <div>
                    <label className={LABEL_CLS} htmlFor="q-name">Name *</label>
                    <input id="q-name" data-testid="quote-name-input" required className={FIELD_CLS} value={form.name} onChange={set("name")} placeholder="Your full name" />
                  </div>
                  <div>
                    <label className={LABEL_CLS} htmlFor="q-phone">Phone *</label>
                    <input id="q-phone" data-testid="quote-phone-input" required type="tel" className={FIELD_CLS} value={form.phone} onChange={set("phone")} placeholder="(647) 000-0000" />
                  </div>
                  <div>
                    <label className={LABEL_CLS} htmlFor="q-email">Email *</label>
                    <input id="q-email" data-testid="quote-email-input" required type="email" className={FIELD_CLS} value={form.email} onChange={set("email")} placeholder="you@email.com" />
                  </div>
                  <div>
                    <label className={LABEL_CLS} htmlFor="q-type">Customer type</label>
                    <select id="q-type" data-testid="quote-type-select" className={FIELD_CLS} value={form.customer_type} onChange={set("customer_type")}>
                      <option>Residential</option>
                      <option>Business</option>
                      <option>Event</option>
                    </select>
                  </div>
                  <div className="sm:col-span-2">
                    <label className={LABEL_CLS} htmlFor="q-address">Delivery address</label>
                    <input id="q-address" data-testid="quote-address-input" className={FIELD_CLS} value={form.address} onChange={set("address")} placeholder="Street, unit, city" />
                  </div>
                  <div>
                    <label className={LABEL_CLS} htmlFor="q-postal">Postal code</label>
                    <input id="q-postal" data-testid="quote-postal-input" className={FIELD_CLS} value={form.postal_code} onChange={set("postal_code")} placeholder="L6Y 1A1" />
                  </div>
                  <div>
                    <label className={LABEL_CLS} htmlFor="q-product">Water / product</label>
                    <select id="q-product" data-testid="quote-product-select" className={FIELD_CLS} value={form.product} onChange={set("product")}>
                      <option value="">Select a product</option>
                      {PRODUCT_OPTIONS.map((p) => (
                        <option key={p}>{p}</option>
                      ))}
                    </select>
                  </div>
                  <div>
                    <label className={LABEL_CLS} htmlFor="q-qty">Quantity (min. 10 cases)</label>
                    <div className="relative">
                      <button
                        type="button"
                        aria-label="Decrease quantity"
                        data-testid="quote-qty-minus"
                        onClick={() => bumpQty(-1)}
                        className="absolute left-2 top-1/2 z-10 flex h-8 w-8 -translate-y-1/2 items-center justify-center rounded-full border border-cyan-400/25 text-cyan-300 transition hover:bg-cyan-400/15"
                      >
                        <Minus className="h-3.5 w-3.5" />
                      </button>
                      <input
                        id="q-qty"
                        data-testid="quote-quantity-input"
                        type="number"
                        min="10"
                        className={`${FIELD_CLS} px-11 text-center [appearance:textfield] [&::-webkit-inner-spin-button]:appearance-none [&::-webkit-outer-spin-button]:appearance-none`}
                        value={form.quantity}
                        onChange={set("quantity")}
                        placeholder="10"
                      />
                      <button
                        type="button"
                        aria-label="Increase quantity"
                        data-testid="quote-qty-plus"
                        onClick={() => bumpQty(1)}
                        className="absolute right-2 top-1/2 z-10 flex h-8 w-8 -translate-y-1/2 items-center justify-center rounded-full border border-cyan-400/25 text-cyan-300 transition hover:bg-cyan-400/15"
                      >
                        <Plus className="h-3.5 w-3.5" />
                      </button>
                    </div>
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className={LABEL_CLS} htmlFor="q-date">Preferred date</label>
                      <input id="q-date" data-testid="quote-date-input" type="date" className={`${FIELD_CLS} [color-scheme:dark]`} value={form.preferred_date} onChange={set("preferred_date")} />
                    </div>
                    <div>
                      <label className={LABEL_CLS} htmlFor="q-time">Preferred time</label>
                      <select id="q-time" data-testid="quote-time-select" className={FIELD_CLS} value={form.preferred_time} onChange={set("preferred_time")}>
                        <option value="">Select</option>
                        {TIME_SLOTS.map((t) => (
                          <option key={t}>{t}</option>
                        ))}
                      </select>
                    </div>
                  </div>
                  <div className="sm:col-span-2">
                    <label className={LABEL_CLS} htmlFor="q-msg">Message / notes</label>
                    <textarea id="q-msg" data-testid="quote-message-input" rows={3} className={`${FIELD_CLS} resize-none`} value={form.message} onChange={set("message")} placeholder="Anything we should know? Access instructions, timing, questions..." />
                  </div>
                  {(form.product || form.quantity || form.preferred_date) && (
                    <motion.div
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.4 }}
                      className="rounded-2xl border border-cyan-400/20 bg-cyan-400/5 p-5 sm:col-span-2"
                      data-testid="quote-order-summary"
                    >
                      <p className="font-mono2 text-[10px] uppercase tracking-[0.24em] text-cyan-300/80">
                        Your request so far
                      </p>
                      <div className="mt-3 grid grid-cols-2 gap-x-6 gap-y-2 text-sm">
                        {form.product && (
                          <>
                            <span className="text-slate-500">Product</span>
                            <span className="text-right font-semibold text-white">{form.product}</span>
                          </>
                        )}
                        {form.quantity && (
                          <>
                            <span className="text-slate-500">Quantity</span>
                            <span className="text-right font-semibold text-white">
                              {form.quantity} packs/cases
                            </span>
                          </>
                        )}
                        <span className="text-slate-500">Customer</span>
                        <span className="text-right font-semibold text-white">{form.customer_type}</span>
                        {(form.preferred_date || form.preferred_time) && (
                          <>
                            <span className="text-slate-500">Preferred</span>
                            <span className="text-right font-semibold text-white">
                              {[form.preferred_date, form.preferred_time].filter(Boolean).join(" · ")}
                            </span>
                          </>
                        )}
                        <span className="text-slate-500">Pricing</span>
                        <span className="text-right font-semibold text-cyan-300">Quote-based</span>
                      </div>
                      {Number(form.quantity) > 0 && Number(form.quantity) < 10 && (
                        <p className="mt-3 text-[11px] font-semibold text-red-300" data-testid="quote-summary-min-warning">
                          Minimum delivery order is 10 packs/cases.
                        </p>
                      )}
                      <p className="mt-2 text-[11px] leading-relaxed text-slate-500">
                        Exact pricing is confirmed with you directly, based on location and order size.
                      </p>
                    </motion.div>
                  )}
                  <div className="sm:col-span-2">
                    <button
                      type="submit"
                      disabled={status === "sending"}
                      data-testid="quote-submit-button"
                      className="flex w-full items-center justify-center gap-2 rounded-full bg-cyan-400 py-4 text-sm font-bold text-slate-950 transition-all duration-300 hover:bg-cyan-300 hover:shadow-[0_0_32px_rgba(56,189,248,0.45)] disabled:opacity-60"
                    >
                      {status === "sending" ? (
                        <>
                          <Loader2 className="h-4 w-4 animate-spin" /> Sending...
                        </>
                      ) : (
                        "Send Request"
                      )}
                    </button>
                    <p className="mt-3 text-center text-[11px] leading-relaxed text-slate-500">
                      Pricing is quote-based and varies by location and order size. Minimum delivery
                      order is 10 packs/cases. Eska available in 35-pack cases only.
                    </p>
                  </div>
                </form>
              </>
            )}
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
