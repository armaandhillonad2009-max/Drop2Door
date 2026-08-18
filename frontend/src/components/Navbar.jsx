import { useEffect, useState } from "react";
import { Link, NavLink, useLocation } from "react-router-dom";
import { AnimatePresence, motion, useScroll } from "framer-motion";
import { Menu, X } from "lucide-react";
import { NAV_LINKS, WA_MESSAGES, waChat } from "@/data/site";
import { useQuote } from "@/context/QuoteContext";
import { WhatsAppIcon } from "@/components/icons";

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const { openQuote } = useQuote();
  const location = useLocation();
  const { scrollYProgress } = useScroll();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => setOpen(false), [location.pathname]);

  return (
    <>
      <header
        data-testid="main-navbar"
        className={`fixed inset-x-0 top-0 z-50 transition-all duration-500 ${
          scrolled ? "glass border-b border-cyan-400/10 py-3" : "bg-transparent py-5"
        }`}
      >
        <div className="mx-auto flex max-w-7xl items-center justify-between px-5 sm:px-8">
          <Link to="/" data-testid="nav-logo" className="group flex items-center">
            <img
              src="/images/logo-dark.png"
              alt="Drop2Door Water Delivery Services"
              className={`w-auto rounded-md transition-all duration-500 group-hover:scale-[1.04] ${
                scrolled ? "h-9 sm:h-10" : "h-11 sm:h-12"
              }`}
            />
          </Link>

          <nav className="hidden items-center gap-7 lg:flex" data-testid="nav-links">
            {NAV_LINKS.map((l) => (
              <NavLink
                key={l.to}
                to={l.to}
                data-testid={`nav-link-${l.label.toLowerCase().replace(/[^a-z]+/g, "-")}`}
                className={({ isActive }) =>
                  `relative text-[13px] font-medium tracking-wide transition-colors duration-300 ${
                    isActive ? "text-cyan-300" : "text-slate-300 hover:text-white"
                  }`
                }
              >
                {l.label}
              </NavLink>
            ))}
          </nav>

          <div className="hidden items-center gap-3 lg:flex">
            <a
              href={waChat(WA_MESSAGES.general)}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Chat with us on WhatsApp"
              data-testid="nav-whatsapp-button"
              className="flex h-10 w-10 items-center justify-center rounded-full border border-cyan-400/25 text-cyan-300 transition-all duration-300 hover:border-cyan-300/60 hover:bg-cyan-400/10 hover:shadow-[0_0_20px_rgba(56,189,248,0.35)]"
            >
              <WhatsAppIcon className="h-5 w-5" />
            </a>
            <button
              onClick={() => openQuote("general")}
              data-testid="nav-quote-button"
              className="rounded-full bg-cyan-400 px-5 py-2 text-[13px] font-bold text-slate-950 transition-all duration-300 hover:bg-cyan-300 hover:shadow-[0_0_28px_rgba(56,189,248,0.45)]"
            >
              Get a Quote
            </button>
          </div>

          <button
            className="text-white lg:hidden"
            onClick={() => setOpen(!open)}
            data-testid="nav-mobile-toggle"
            aria-label="Toggle menu"
          >
            {open ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </button>
        </div>

        {/* Reading progress hairline along the bottom edge of the header. */}
        <motion.span
          style={{ scaleX: scrollYProgress }}
          className="absolute inset-x-0 bottom-0 h-px origin-left bg-gradient-to-r from-cyan-400/0 via-cyan-400 to-cyan-300"
          data-testid="nav-scroll-progress"
          aria-hidden="true"
        />
      </header>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="noise fixed inset-0 z-40 flex flex-col justify-between bg-[#030712]/97 px-6 pb-10 pt-28 backdrop-blur-xl lg:hidden"
            data-testid="nav-mobile-menu"
          >
            <nav className="flex flex-col gap-1">
              {NAV_LINKS.map((l, i) => (
                <motion.div
                  key={l.to}
                  initial={{ opacity: 0, x: -24 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.05 * i, duration: 0.45 }}
                >
                  <NavLink
                    to={l.to}
                    className={({ isActive }) =>
                      `font-display block border-b border-cyan-400/10 py-4 text-3xl font-bold tracking-tight ${
                        isActive ? "text-cyan-300" : "text-white"
                      }`
                    }
                  >
                    {l.label}
                  </NavLink>
                </motion.div>
              ))}
            </nav>
            <div className="flex flex-col gap-3">
              <button
                onClick={() => {
                  setOpen(false);
                  openQuote("general");
                }}
                data-testid="nav-mobile-quote-button"
                className="w-full rounded-full bg-cyan-400 py-4 text-sm font-bold text-slate-950"
              >
                Get a Quote
              </button>
              <a
                href={waChat(WA_MESSAGES.general)}
                target="_blank"
                rel="noopener noreferrer"
                data-testid="nav-mobile-whatsapp"
                className="flex w-full items-center justify-center gap-2 rounded-full border border-cyan-400/30 py-4 text-sm font-bold text-cyan-300"
              >
                <WhatsAppIcon className="h-4 w-4" /> Order on WhatsApp
              </a>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
