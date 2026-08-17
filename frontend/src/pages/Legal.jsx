import PageHeader from "@/components/PageHeader";
import { Reveal } from "@/components/Motion";
import { SITE } from "@/data/site";

function LegalBody({ sections }) {
  return (
    <section className="bg-[#030712] py-16 sm:py-24">
      <div className="mx-auto max-w-3xl px-5 sm:px-8">
        <Reveal>
          <p className="font-mono2 text-[10px] uppercase tracking-[0.24em] text-slate-500">
            Last updated: July 2026
          </p>
        </Reveal>
        <div className="mt-10 space-y-10">
          {sections.map((s, i) => (
            <Reveal key={s.h} delay={Math.min(i * 0.04, 0.3)}>
              <div>
                <h2 className="font-display text-xl font-bold text-white">{s.h}</h2>
                <p className="mt-3 text-sm leading-relaxed text-slate-400">{s.p}</p>
              </div>
            </Reveal>
          ))}
        </div>
        <Reveal delay={0.2}>
          <p className="mt-14 border-t border-cyan-400/10 pt-8 text-sm text-slate-500">
            Questions about this page? Email{" "}
            <a href={`mailto:${SITE.email}`} className="text-cyan-300 underline-offset-4 hover:underline">
              {SITE.email}
            </a>{" "}
            or call {SITE.phoneDisplay}.
          </p>
        </Reveal>
      </div>
    </section>
  );
}

const PRIVACY = [
  {
    h: "What we collect",
    p: "When you submit a quote or delivery request on this website, we collect the details you provide: your name, phone number, email address, delivery address, postal code, order details and any notes you include. We do not run customer accounts, and we do not collect payment information through this website.",
  },
  {
    h: "How we use it",
    p: "We use your information only to respond to your request, prepare a quote, communicate with you about your order, and schedule and complete your delivery. That is it.",
  },
  {
    h: "What we never do",
    p: "We do not sell, rent or trade your personal information. We do not add you to marketing lists, and we do not share your details with third parties for their own marketing.",
  },
  {
    h: "Third-party services",
    p: "This site links to WhatsApp, Instagram, TikTok and Google. When you use those services, their own privacy policies apply. Form submissions are delivered to our business email through a secure email service provider.",
  },
  {
    h: "Data retention",
    p: "We keep request details only as long as needed to serve you and maintain basic business records, after which they are deleted.",
  },
  {
    h: "Your choices",
    p: "You can ask us at any time to see, correct or delete the personal information we hold about you by emailing us.",
  },
];

const TERMS = [
  {
    h: "Quotes and pricing",
    p: "All pricing is quote-based. Delivery pricing varies by location, quantity and product availability. A price is only confirmed once we provide a quote and you accept it. We do not publish fixed prices on this website.",
  },
  {
    h: "Orders",
    p: "The minimum delivery order is 10 packs or cases. Eska is available in 35-pack cases only. Product and brand availability varies, and specific varieties are confirmed at the time of ordering.",
  },
  {
    h: "Scheduling",
    p: "We are open 24 hours for delivery. Deliveries are scheduled in advance for an agreed date and time window. Placing a request through this website or WhatsApp does not guarantee a specific time until we confirm it with you.",
  },
  {
    h: "Service area",
    p: "We serve the Greater Toronto Area and surrounding GTA communities, including Brampton, Mississauga, Toronto, Caledon, Malton, Milton and Peel Region. Coverage for a specific address is confirmed when you order.",
  },
  {
    h: "Website content",
    p: "We work to keep this website accurate, but product availability, delivery windows and coverage may change. The confirmed details we give you directly always take priority over general website content.",
  },
  {
    h: "Acceptable use",
    p: "You agree to use this website and its forms only for genuine enquiries and orders, and to provide accurate contact and delivery information.",
  },
];

const DELIVERY_POLICY = [
  {
    h: "Scheduled delivery",
    p: "Drop2Door offers 24-hour scheduled delivery across the GTA. Your delivery date and time window are confirmed with you directly before we dispatch.",
  },
  {
    h: "Cancellations",
    p: "To cancel a scheduled delivery, you must give us at least 24 hours notice before your confirmed delivery time. Cancellations can be made by WhatsApp, phone or email.",
  },
  {
    h: "Returns and refunds",
    p: "We do not accept returns and do not offer refunds on delivered water. If something is wrong with your delivery, contact us and we will review the situation.",
  },
  {
    h: "Receiving your delivery",
    p: "Please make sure someone can receive the order, or give us clear drop-off instructions, at the time you schedule. If we cannot complete a delivery because nobody is available and no instructions were provided, redelivery may need to be rescheduled.",
  },
  {
    h: "Questions",
    p: `For any delivery or cancellation question, message us on WhatsApp at ${SITE.phoneDisplay} or email ${SITE.email}.`,
  },
];

export function Privacy() {
  return (
    <main>
      <PageHeader
        kicker="Legal"
        lines={["Privacy Policy"]}
        sub="How Drop2Door Water Delivery Services handles your personal information."
        title="Privacy Policy | Drop2Door Water Delivery Services"
      />
      <LegalBody sections={PRIVACY} />
    </main>
  );
}

export function Terms() {
  return (
    <main>
      <PageHeader
        kicker="Legal"
        lines={["Terms of Service"]}
        sub="The basics of ordering bottled water delivery from Drop2Door."
        title="Terms of Service | Drop2Door Water Delivery Services"
      />
      <LegalBody sections={TERMS} />
    </main>
  );
}

export function DeliveryPolicy() {
  return (
    <main>
      <PageHeader
        kicker="Legal"
        lines={["Delivery &", "Cancellation"]}
        sub="Scheduling, cancellations and our returns position, in plain language."
        title="Delivery & Cancellation Policy | Drop2Door Water Delivery Services"
      />
      <LegalBody sections={DELIVERY_POLICY} />
    </main>
  );
}
