import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { Instagram, Mail, MapPin } from "lucide-react";
import { SITE, WA_MESSAGES, waChat } from "@/data/site";
import { TikTokIcon, WhatsAppIcon } from "@/components/icons";

const PAGE_LINKS = [
  { label: "Home", to: "/" },
  { label: "Water We Deliver", to: "/water" },
  { label: "Delivery Areas", to: "/delivery-areas" },
  { label: "Events & Bulk Orders", to: "/events-bulk" },
  { label: "Gallery", to: "/gallery" },
  { label: "About", to: "/about" },
  { label: "Contact & FAQ", to: "/contact" },
];

const LEGAL_LINKS = [
  { label: "Privacy Policy", to: "/privacy-policy" },
  { label: "Terms of Service", to: "/terms" },
  { label: "Delivery & Cancellation", to: "/delivery-policy" },
];

export default function Footer() {
  return (
    <footer className="relative border-t border-cyan-400/10 bg-[#02050d]" data-testid="site-footer">
      <div className="mx-auto max-w-7xl px-5 py-12 sm:px-8">
        <div className="grid grid-cols-1 gap-12 md:grid-cols-12">
          <div className="md:col-span-5">
            <img
              src="/images/logo-dark.png"
              alt="Drop2Door Water Delivery Services"
              className="h-12 w-auto rounded-md"
              loading="lazy"
            />
            <p className="mt-5 max-w-sm text-sm leading-relaxed text-slate-400">
              {SITE.tagline} Bottled spring, distilled and sparkling water delivered across the
              Greater Toronto Area since {SITE.since}.
            </p>
            <p className="mt-4 flex items-start gap-2 text-xs text-slate-500">
              <MapPin className="mt-0.5 h-3.5 w-3.5 shrink-0 text-cyan-400" />
              Service-area business · {SITE.areaShort} · No public storefront
            </p>
            <div className="mt-6 flex items-center gap-3">
              <a
                href={SITE.instagram}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Instagram"
                data-testid="footer-instagram"
                className="flex h-10 w-10 items-center justify-center rounded-full border border-cyan-400/20 text-slate-300 transition hover:border-cyan-300/60 hover:text-cyan-300"
              >
                <Instagram className="h-4 w-4" />
              </a>
              <a
                href={SITE.tiktok}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="TikTok"
                data-testid="footer-tiktok"
                className="flex h-10 w-10 items-center justify-center rounded-full border border-cyan-400/20 text-slate-300 transition hover:border-cyan-300/60 hover:text-cyan-300"
              >
                <TikTokIcon className="h-4 w-4" />
              </a>
              <a
                href={waChat(WA_MESSAGES.general)}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="WhatsApp"
                data-testid="footer-whatsapp"
                className="flex h-10 w-10 items-center justify-center rounded-full border border-cyan-400/20 text-slate-300 transition hover:border-cyan-300/60 hover:text-cyan-300"
              >
                <WhatsAppIcon className="h-4 w-4" />
              </a>
              <a
                href={`mailto:${SITE.email}`}
                aria-label="Email"
                data-testid="footer-email"
                className="flex h-10 w-10 items-center justify-center rounded-full border border-cyan-400/20 text-slate-300 transition hover:border-cyan-300/60 hover:text-cyan-300"
              >
                <Mail className="h-4 w-4" />
              </a>
            </div>
          </div>

          <div className="md:col-span-2">
            <p className="font-mono2 text-[10px] uppercase tracking-[0.28em] text-cyan-300/70">Pages</p>
            <ul className="mt-4 space-y-2.5">
              {PAGE_LINKS.map((l) => (
                <li key={l.to}>
                  <Link
                    to={l.to}
                    className="text-sm text-slate-400 transition hover:text-white"
                    data-testid={`footer-link-${l.label.toLowerCase().replace(/[^a-z]+/g, "-")}`}
                  >
                    {l.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div className="md:col-span-2">
            <p className="font-mono2 text-[10px] uppercase tracking-[0.28em] text-cyan-300/70">Legal</p>
            <ul className="mt-4 space-y-2.5">
              {LEGAL_LINKS.map((l) => (
                <li key={l.to}>
                  <Link
                    to={l.to}
                    className="text-sm text-slate-400 transition hover:text-white"
                    data-testid={`footer-link-${l.label.toLowerCase().replace(/[^a-z]+/g, "-")}`}
                  >
                    {l.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div className="md:col-span-3">
            <p className="font-mono2 text-[10px] uppercase tracking-[0.28em] text-cyan-300/70">Contact</p>
            <ul className="mt-4 space-y-2.5 text-sm text-slate-400">
              <li>
                <a href={SITE.phoneHref} className="transition hover:text-white" data-testid="footer-phone">
                  {SITE.phoneDisplay}
                </a>
              </li>
              <li>
                <a href={`mailto:${SITE.email}`} className="break-all transition hover:text-white">
                  {SITE.email}
                </a>
              </li>
              <li className="text-cyan-300/90">Open 24 hours for delivery</li>
              <li>
                <a
                  href={SITE.googleProfile}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="transition hover:text-white"
                  data-testid="footer-google-profile"
                >
                  See Us on Google
                </a>
              </li>
            </ul>
          </div>
        </div>

        {/* Drawn as SVG rather than sized text: a vw-based font-size inside this
            max-width container overflows and clips the outer letters on wide
            screens. The viewBox scales the wordmark to the container instead, so
            it always fits edge to edge, and textLength pins its width exactly. */}
        <motion.svg
          initial={{ opacity: 0.45 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true, margin: "-60px" }}
          transition={{ duration: 1.8, ease: "easeOut" }}
          viewBox="0 0 560 86"
          role="presentation"
          aria-hidden="true"
          data-testid="footer-wordmark"
          className="mx-auto mt-10 w-[84%] select-none overflow-visible"
        >
          <text
            x="280"
            y="78"
            textAnchor="middle"
            textLength="552"
            lengthAdjust="spacingAndGlyphs"
            fontSize="100"
            fontWeight="800"
            fill="none"
            stroke="rgba(163,209,235,0.42)"
            strokeWidth="1.35"
            vectorEffect="non-scaling-stroke"
            className="font-display"
          >
            DROP2DOOR
          </text>
        </motion.svg>

        <div className="mt-14 flex flex-col items-center justify-between gap-4 border-t border-cyan-400/10 pt-7 sm:flex-row">
          <p className="text-xs text-slate-500">
            © 2026 {SITE.name}. All rights reserved.
          </p>
          <p className="font-mono2 text-[10px] uppercase tracking-[0.24em] text-slate-600">
            Pure Water · Delivered to Your Door
          </p>
        </div>
      </div>
    </footer>
  );
}
