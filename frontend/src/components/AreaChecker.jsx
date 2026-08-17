import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { CheckCircle2, MapPin, ScanSearch, XCircle } from "lucide-react";
import { CITIES, WA_MESSAGES, waChat } from "@/data/site";
import { WhatsAppIcon } from "@/components/icons";

const GTA_L_SECOND = new Set(["1", "3", "4", "5", "6", "7"]);

export function checkArea(raw) {
  const v = raw.trim();
  if (!v) return null;
  const compact = v.toUpperCase().replace(/\s/g, "");
  if (/^[A-Z]\d[A-Z]\d[A-Z]\d$/.test(compact) || /^[A-Z]\d[A-Z]$/.test(compact)) {
    const letter = compact[0];
    if (letter === "M" || (letter === "L" && GTA_L_SECOND.has(compact[1]))) {
      return { ok: true, label: v.toUpperCase() };
    }
    return { ok: false, label: v.toUpperCase() };
  }
  const city = CITIES.find(
    (c) => c.toLowerCase() === v.toLowerCase() || v.toLowerCase().includes(c.toLowerCase()),
  );
  if (city) return { ok: true, label: city };
  return { ok: false, label: v };
}

export default function AreaChecker({ compact = false }) {
  const [value, setValue] = useState("");
  const [result, setResult] = useState(null);
  const [scanning, setScanning] = useState(false);

  const run = (e) => {
    e.preventDefault();
    const r = checkArea(value);
    if (!r) return;
    setResult(null);
    setScanning(true);
    setTimeout(() => {
      setScanning(false);
      setResult(r);
    }, 650);
  };

  return (
    <div
      className={`glow-card relative overflow-hidden rounded-3xl border border-cyan-400/15 bg-[#081120]/85 ${
        compact ? "p-6 sm:p-8" : "p-7 sm:p-12"
      }`}
      data-testid="area-checker"
    >
      <div
        className="pointer-events-none absolute -right-24 -top-24 h-64 w-64 rounded-full bg-cyan-500/12 blur-[90px]"
        aria-hidden="true"
      />
      <div className="relative">
        <p className="font-mono2 text-[10px] uppercase tracking-[0.28em] text-cyan-300/80">
          Service area tool
        </p>
        <h3 className="font-display mt-2 text-2xl font-bold tracking-tight text-white sm:text-3xl">
          Do We Deliver to You?
        </h3>
        <p className="mt-2 max-w-lg text-sm leading-relaxed text-slate-400">
          Enter your postal code or city. We cover Brampton, Mississauga, Toronto, Caledon,
          Milton, Malton, Peel Region and the wider GTA.
        </p>

        <form onSubmit={run} className="mt-6 flex flex-col gap-3 sm:flex-row" data-testid="area-checker-form">
          <div className="relative flex-1">
            <MapPin className="pointer-events-none absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-cyan-400/60" />
            <input
              value={value}
              onChange={(e) => setValue(e.target.value)}
              placeholder="Postal code or city (e.g. L6Y 1A1 or Brampton)"
              aria-label="Postal code or city"
              data-testid="area-checker-input"
              className="w-full rounded-full border border-cyan-400/20 bg-slate-950/70 py-4 pl-11 pr-4 text-sm text-white placeholder:text-slate-500 outline-none transition focus:border-cyan-400/60 focus:ring-2 focus:ring-cyan-400/20"
            />
          </div>
          <button
            type="submit"
            data-testid="area-checker-button"
            className="flex items-center justify-center gap-2 rounded-full bg-cyan-400 px-7 py-4 text-sm font-bold text-slate-950 transition-all duration-300 hover:bg-cyan-300 hover:shadow-[0_0_28px_rgba(56,189,248,0.45)]"
          >
            <ScanSearch className="h-4 w-4" />
            {scanning ? "Checking..." : "Check My Area"}
          </button>
        </form>

        <div className="mt-5 min-h-[12px]">
          <AnimatePresence mode="wait">
            {scanning && (
              <motion.p
                key="scan"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="font-mono2 text-xs uppercase tracking-[0.24em] text-cyan-300/70"
                data-testid="area-checker-scanning"
              >
                Scanning GTA service grid...
              </motion.p>
            )}
            {result && !scanning && (
              <motion.div
                key={result.ok ? "ok" : "no"}
                initial={{ opacity: 0, y: 14 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.45 }}
                className={`rounded-2xl border p-5 ${
                  result.ok
                    ? "border-cyan-400/30 bg-cyan-400/8"
                    : "border-red-400/25 bg-red-400/6"
                }`}
                data-testid="area-checker-result"
              >
                {result.ok ? (
                  <div>
                    <p className="flex items-center gap-2 font-display text-lg font-bold text-cyan-300">
                      <CheckCircle2 className="h-5 w-5" /> Yes, we deliver to your area.
                    </p>
                    <p className="mt-1.5 text-sm text-slate-300">
                      {result.label} is inside our regular delivery zone. Deliveries are scheduled
                      around the clock, usually within 24 hours.
                    </p>
                    <a
                      href={waChat(WA_MESSAGES.areaOk)}
                      target="_blank"
                      rel="noopener noreferrer"
                      data-testid="area-checker-order-whatsapp"
                      className="mt-4 inline-flex items-center gap-2 rounded-full bg-[#25D366] px-6 py-3 text-sm font-bold text-slate-950 transition hover:brightness-110"
                    >
                      <WhatsAppIcon className="h-4 w-4" /> Order on WhatsApp
                    </a>
                  </div>
                ) : (
                  <div>
                    <p className="flex items-center gap-2 font-display text-lg font-bold text-red-300">
                      <XCircle className="h-5 w-5" /> You may be outside our regular service area.
                    </p>
                    <p className="mt-1.5 text-sm text-slate-300">
                      We still might be able to reach {result.label}. Contact us and we will see
                      what we can do.
                    </p>
                    <a
                      href={waChat(WA_MESSAGES.areaOut)}
                      target="_blank"
                      rel="noopener noreferrer"
                      data-testid="area-checker-contact-whatsapp"
                      className="mt-4 inline-flex items-center gap-2 rounded-full border border-cyan-400/40 px-6 py-3 text-sm font-bold text-cyan-300 transition hover:bg-cyan-400/10"
                    >
                      <WhatsAppIcon className="h-4 w-4" /> Chat With Us
                    </a>
                  </div>
                )}
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        <p className="mt-4 text-[11px] leading-relaxed text-slate-500">
          This tool checks general service coverage, not exact street-level boundaries. If you are
          unsure, message us and we will confirm for your address.
        </p>
      </div>
    </div>
  );
}
